<template>
  <v-container class="py-10">
    <div class="header-section">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <v-icon size="40" color="white">mdi-calendar-check</v-icon>
        </div>
        <h1 class="header-title">{{ t('consultasMedico.title') }}</h1>
      </div>
    </div>

    <v-row justify="center" class="mb-10 mt-8">
      <v-btn-toggle v-model="filtroSelecionado" rounded="pill" group mandatory class="filter-toggle">
        <v-btn
          value="Marcado"
          :variant="filtroSelecionado === 'Marcado' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium filter-btn"
          :class="{ 'active-filter': filtroSelecionado === 'Marcado' }"
        >
          {{ t('consultasMedico.filters.scheduled') }}
        </v-btn>
        <v-btn
          value="Concluido"
          :variant="filtroSelecionado === 'Concluido' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium filter-btn"
          :class="{ 'active-filter': filtroSelecionado === 'Concluido' }"
        >
          {{ t('consultasMedico.filters.completed') }}
        </v-btn>
        <v-btn
          value="Externa"
          :variant="filtroSelecionado === 'Externa' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium filter-btn"
          :class="{ 'active-filter': filtroSelecionado === 'Externa' }"
        >
          {{ t('consultasMedico.filters.external') }}
        </v-btn>
      </v-btn-toggle>
    </v-row>



    <v-row justify="center">
      <v-col cols="12">
        <div v-if="loading">
          <v-row>
            <v-col
              v-for="n in 12"
              :key="n"
              cols="12"
              md="6"
              lg="4"
            >
              <v-card
                class="d-flex items-center px-5"
                elevation="4"
                rounded="xl"
                height="180"
              >
                <v-row class="d-flex items-center" align="center" no-gutters>
                  <v-col cols="2">
                    <v-skeleton-loader
                    class="h-full"
                      type="avatar"
                      width="150"
                      height="150"
                    />
                  </v-col>
                  <v-col cols="auto">
                  <v-skeleton-loader
                    class="h-full"
                      type="paragraph, text, text"
                      width="250"
                      height="150"
                    />
                  </v-col>

                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div v-else>
          <v-row>
            <v-col
              v-for="(consulta, index) in consultas"
              :key="index"
              cols="12"
              md="6"
              lg="4"
            >
              <v-card
                class="pa-5 hover-card d-flex flex-column"
                elevation="4"
                rounded="xl"
                :style="{
                  borderLeft: `4px solid ${getStatusColor(consulta?.situacao)}`,
                }"
                @click="abrirModalDetalhes(consulta)"
                style="cursor: pointer;"
              >
                <v-row align="center" no-gutters class="flex-grow-1">

                  <v-col class="d-flex flex-column justify-center">
                    <div
                      class="text-h6 font-weight-bold text-grey-darken-3 mb-1"
                    >
                      {{ consulta?.atleta?.usuario?.nome || consulta?.nomePacienteExterno }}
                    </div>
                    <div
                      v-if="consulta?.atleta?.genero"
                      class="text-body-2 text-grey-darken-1 mb-2"
                    >
                      {{ consulta?.atleta?.genero }}
                    </div>

                    <div class="d-flex flex-column gap-1 mb-3">
                      <div
                        class="text-body-2 text-grey-darken-2 d-flex align-center"
                      >
                        <v-icon size="16" class="me-2" color="blue"
                          >mdi-calendar</v-icon
                        >
                        {{ formatarDataLocal(consulta?.dataConsulta) }}
                      </div>
                      <div
                        class="text-body-2 text-grey-darken-2 d-flex align-center"
                      >
                        <v-icon size="16" class="me-2" color="orange"
                          >mdi-clock-outline</v-icon
                        >
                        {{ formatarHorarioLocal(consulta?.dataConsulta) }}
                      </div>
                    </div>

                    <div class="d-flex align-center justify-space-between flex-wrap ga-2">
                      <v-chip
                        :color="getStatusColor(consulta?.situacao)"
                        size="small"
                        variant="flat"
                        class="font-weight-medium text-white"
                      >
                        {{ t(`consultasMedico.status.${consulta?.situacao}`) }}
                      </v-chip>
                      <div class="d-flex gap-2">
                        <v-btn
                        v-if="consulta?.situacao === 'Marcado'"
                          color="green"
                          variant="outlined"
                          size="small"
                          rounded="xl"
                          prepend-icon="mdi-check"
                          @click.stop="abrirModalFinalizar(consulta.id)"
                        >
                          {{ t('consultasMedico.finalize') }}
                        </v-btn>
                        <v-btn
                        v-if="consulta?.situacao === 'Marcado'"
                          color="red"
                          variant="outlined"
                          size="small"
                          rounded="xl"
                          :loading="loadingCancelarIds.has(consulta.id)"
                          prepend-icon="mdi-close"
                          @click.stop="abrirModalConfirmacao(consulta.id)"
                          class="ml-1"
                        >
                          {{ t('consultasMedico.cancel') }}
                        </v-btn>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <div v-if="consultas.length === 0" class="text-center py-8">
            <v-icon size="64" color="grey-lighten-2">mdi-calendar-blank</v-icon>
            <p class="text-h6 mt-4 text-grey">{{ t('consultasMedico.noAppointments') }}</p>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Modal de Confirmação -->
    <v-dialog v-model="modalConfirmacao" max-width="450" persistent>
      <v-card class="modal-confirmacao" rounded="xl">
        <v-card-text class="text-center pa-8">
          <div class="mb-6">
            <v-avatar size="80" color="red-lighten-4" class="mb-4">
              <v-icon size="40" color="red">mdi-alert-circle-outline</v-icon>
            </v-avatar>
          </div>

          <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-3">
            {{ t('consultasMedico.cancelModal.title') }}
          </h3>

          <p class="text-body-1 text-grey-darken-1 mb-6">
            {{ t('consultasMedico.cancelModal.message') }}
          </p>

          <div class="d-flex gap-3 justify-center">
            <v-btn
              color="grey-lighten-1"
              variant="outlined"
              size="large"
              rounded="xl"
              min-width="120"
              @click="modalConfirmacao = false"
            >
              <v-icon start>mdi-close</v-icon>
              {{ t('consultasMedico.cancelModal.cancel') }}
            </v-btn>

            <v-btn
              color="red"
              variant="flat"
              size="large"
              rounded="xl"
              min-width="120"
              @click="confirmarCancelamento"
            >
              <v-icon start>mdi-check</v-icon>
              {{ t('consultasMedico.cancelModal.confirm') }}
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Modal de Detalhes da Consulta -->
    <v-dialog v-model="modalDetalhes" max-width="700" persistent>
      <v-card rounded="xl">
        <v-card-title class="d-flex align-center justify-space-between pa-6 pb-4">
          <span class="text-h5 font-weight-bold">{{ t('consultasMedico.detailsModal.title') }}</span>
          <v-btn icon="mdi-close" variant="text" @click="modalDetalhes = false" />
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-6" v-if="consultaSelecionada">
          <div class="mb-4">
            <div class="text-subtitle-2 text-grey-darken-1 mb-1">{{ t('consultasMedico.detailsModal.patient') }}</div>
            <div class="text-h6 font-weight-medium">{{ consultaSelecionada.atleta?.usuario?.nome || consultaSelecionada.nomePacienteExterno || 'N/A' }}</div>
          </div>

          <v-row>
            <v-col cols="6">
              <div class="text-subtitle-2 text-grey-darken-1 mb-1">{{ t('consultasMedico.detailsModal.date') }}</div>
              <div class="text-body-1">{{ formatarDataLocal(consultaSelecionada.dataConsulta) }}</div>
            </v-col>
            <v-col cols="6">
              <div class="text-subtitle-2 text-grey-darken-1 mb-1">{{ t('consultasMedico.detailsModal.time') }}</div>
              <div class="text-body-1">{{ formatarHorarioLocal(consultaSelecionada.dataConsulta) }}</div>
            </v-col>
          </v-row>

          <v-row class="mt-2">
            <v-col cols="6">
              <div class="text-subtitle-2 text-grey-darken-1 mb-1">{{ t('consultasMedico.detailsModal.status') }}</div>
              <v-chip :color="getStatusColor(consultaSelecionada.situacao)" size="small" variant="flat">
                {{ t(`consultasMedico.status.${consultaSelecionada.situacao}`) }}
              </v-chip>
            </v-col>
            <v-col cols="6" v-if="consultaSelecionada.atleta?.telefone">
              <div class="text-subtitle-2 text-grey-darken-1 mb-1">{{ t('consultasMedico.detailsModal.phone') }}</div>
              <div class="text-body-1">{{ consultaSelecionada.atleta.telefone }}</div>
            </v-col>
          </v-row>

          <div class="mt-4" v-if="consultaSelecionada.diagnostico">
            <div class="text-subtitle-2 text-grey-darken-1 mb-1">{{ t('consultasMedico.finalizeModal.diagnosis') }}</div>
            <div class="text-body-1">{{ consultaSelecionada.diagnostico }}</div>
          </div>

          <div class="mt-4" v-if="consultaSelecionada.medicamentosReceitados">
            <div class="text-subtitle-2 text-grey-darken-1 mb-1">{{ t('consultasMedico.finalizeModal.medications') }}</div>
            <div class="text-body-1">{{ consultaSelecionada.medicamentosReceitados }}</div>
          </div>

          <div class="mt-6" v-if="consultaSelecionada.situacao === 'Concluido' && consultaSelecionada.consultaExterna === true">
            <v-divider class="mb-4" />
            <v-btn
              color="primary"
              variant="flat"
              rounded="xl"
              block
              size="large"
              prepend-icon="mdi-certificate"
              @click="certificarAtleta()"
            >
              {{ t('consultasMedico.detailsModal.certifyAthlete') }}
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Modal de Certificar Atleta -->
    <v-dialog v-model="modalCertificar" max-width="600" persistent>
      <v-card rounded="xl">
        <v-card-title class="text-h5 font-weight-bold pa-6 pb-0">
          {{ t('consultasMedico.certificationModal.title') }}
        </v-card-title>

        <v-card-text class="pa-6" v-if="consultaSelecionada">
          <div class="mb-4">
            <div class="text-subtitle-2 text-grey-darken-1 mb-1">{{ t('consultasMedico.certificationModal.patient') }}</div>
            <div class="text-h6 font-weight-medium">{{ consultaSelecionada.atleta?.usuario?.nome || consultaSelecionada.nomePacienteExterno }}</div>
          </div>

          <v-row class="mb-4">
            <v-col cols="6">
              <div class="text-subtitle-2 text-grey-darken-1 mb-1">{{ t('consultasMedico.certificationModal.appointmentDate') }}</div>
              <div class="text-body-1">{{ formatarDataLocal(consultaSelecionada.dataConsulta) }}</div>
            </v-col>
            <v-col cols="6" v-if="consultaSelecionada.atleta?.telefone || consultaSelecionada?.telefonePacienteExterno">
              <div class="text-subtitle-2 text-grey-darken-1 mb-1">{{ t('consultasMedico.certificationModal.phone') }}</div>
              <div class="text-body-1">{{ consultaSelecionada.atleta?.telefone || consultaSelecionada?.telefonePacienteExterno }}</div>
            </v-col>
          </v-row>

          <v-select
            v-model="validadeCertificado"
            :items="opcoesMeses"
            item-title="text"
            item-value="value"
            :label="t('consultasMedico.certificationModal.validityMonths')"
            variant="outlined"
            rounded="lg"
            :rules="[v => !!v || t('consultasMedico.certificationModal.validationRule')]"
          />

          <v-text-field
            v-if="validadeCertificado === 'outro'"
            v-model.number="mesesPersonalizado"
            :label="t('consultasMedico.certificationModal.customMonths')"
            type="number"
            variant="outlined"
            rounded="lg"
            :rules="[v => !!v || t('consultasMedico.certificationModal.validationRule'), v => v > 0 || t('consultasMedico.certificationModal.validationRule')]"
            class="mt-4"
          />
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn
            color="grey-lighten-1"
            variant="outlined"
            rounded="xl"
            @click="fecharModalCertificar"
          >
            {{ t('consultasMedico.certificationModal.cancel') }}
          </v-btn>

          <v-btn
            color="primary"
            variant="flat"
            rounded="xl"
            :loading="loadingCertificar"
            :disabled="!validadeCertificado || (validadeCertificado === 'outro' && !mesesPersonalizado)"
            @click="confirmarCertificacao"
          >
            {{ t('consultasMedico.certificationModal.certify') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de Finalizar Consulta -->
    <v-dialog v-model="modalFinalizar" max-width="500" persistent>
      <v-card rounded="xl">
        <v-card-title class="text-h5 font-weight-bold pa-6 pb-0">
          {{ t('consultasMedico.finalizeModal.title') }}
        </v-card-title>

        <v-card-text class="pa-6">
          <v-form ref="formFinalizar" v-model="formValid">
            <v-textarea
              v-model="dadosFinalizacao.diagnostico"
              :label="t('consultasMedico.finalizeModal.diagnosis')"
              variant="outlined"
              rounded="lg"
              rows="3"
              :rules="[v => !!v || t('consultasMedico.finalizeModal.diagnosisRequired')]"
              :placeholder="t('consultasMedico.finalizeModal.diagnosisPlaceholder')"
              class="mb-4"
            />

            <v-textarea
              v-model="dadosFinalizacao.medicamentosReceitados"
              :label="t('consultasMedico.finalizeModal.medications')"
              variant="outlined"
              rounded="lg"
              rows="4"
              :placeholder="t('consultasMedico.finalizeModal.medicationsPlaceholder')"
            />
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn
            color="grey-lighten-1"
            variant="outlined"
            rounded="xl"
            @click="fecharModalFinalizar"
          >
            {{ t('consultasMedico.finalizeModal.cancel') }}
          </v-btn>

          <v-btn
            color="green"
            variant="flat"
            rounded="xl"
            :loading="loadingFinalizar"
            :disabled="!formValid"
            @click="confirmarFinalizacao"
          >
            {{ t('consultasMedico.finalizeModal.finalize') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import consultasService from '@/services/consultas/consultas-service'
import { formatarDataLocal, formatarHorarioLocal } from '@/utils/date.utils'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import 'dayjs/locale/en'
import { ref, computed, onMounted, watch } from 'vue'
import { toast } from 'vue3-toastify'
import atletaService from '@/services/atleta/atleta-service'
import { getErrorMessage } from '@/common/error.utils'
import { useI18n } from 'vue-i18n'
import licencaCertificadoService from '@/services/licenca-certificado/licenca-certificado-service'

const { t, locale } = useI18n()

// Configurar locale do dayjs
const currentLocale = computed(() => locale.value === 'pt' ? 'pt-br' : 'en')
dayjs.locale(currentLocale.value)

watch(locale, (newLocale) => {
  dayjs.locale(newLocale === 'pt' ? 'pt-br' : 'en')
})

const loading = ref(true)
const loadingCancelarIds = ref(new Set())
const infoAtleta = ref(null)
const modalConfirmacao = ref(false)
const consultaParaCancelar = ref(null)
const modalFinalizar = ref(false)
const consultaParaFinalizar = ref(null)
const formValid = ref(false)
const loadingFinalizar = ref(false)
const dadosFinalizacao = ref({
  diagnostico: '',
  medicamentosReceitados: ''
})
const modalDetalhes = ref(false)
const consultaSelecionada = ref(null)
const filtroSelecionado = ref('Marcado')
const todasConsultas = ref([])
const modalCertificar = ref(false)
const validadeCertificado = ref(null)
const mesesPersonalizado = ref(null)
const loadingCertificar = ref(false)

const opcoesMeses = computed(() => [
  { text: t('consultasMedico.certificationModal.monthOptions.1'), value: 1 },
  { text: t('consultasMedico.certificationModal.monthOptions.3'), value: 3 },
  { text: t('consultasMedico.certificationModal.monthOptions.6'), value: 6 },
  { text: t('consultasMedico.certificationModal.monthOptions.9'), value: 9 },
  { text: t('consultasMedico.certificationModal.monthOptions.12'), value: 12 },
  { text: t('consultasMedico.certificationModal.monthOptions.other'), value: 'outro' }
])

const consultas = computed(() => {
  if (filtroSelecionado.value === 'Externa') {
    const externas = todasConsultas.value.filter(c => c.consultaExterna === true)
    return externas.sort((a, b) => {
      if (a.situacao === 'Marcado' && b.situacao !== 'Marcado') return -1
      if (a.situacao !== 'Marcado' && b.situacao === 'Marcado') return 1
      return 0
    })
  }
  return todasConsultas.value.filter(c => c.situacao === filtroSelecionado.value)
})


const buscarConsultas = async () => {
  loading.value = true
  try {
    const inicioAno = dayjs().startOf('year')
    const fimAno = dayjs().endOf('year')

    const dataInicio = inicioAno.format('YYYY-MM-DD') + 'T00:00:00.000Z'
    const dataFim = fimAno.format('YYYY-MM-DD') + 'T23:59:59.999Z'

    const resp = await consultasService.findConsultasByMedico(dataInicio, dataFim)
    if (Array.isArray(resp.data) && resp.data.length > 0 && resp.data[0].consultas) {
      todasConsultas.value = resp.data.flatMap(item => item.consultas || [])
    } else {
      todasConsultas.value = resp.data || []
    }
  } catch (error) {
    console.error('Erro ao buscar consultas', error)
  } finally {
    loading.value = false
  }
}

const buscarAtletaId = async (atletaId) => {
  try {
    const resp = await atletaService.getAtletaById(atletaId)
    return resp
  } catch (error) {
    console.error('Erro ao buscar atleta', error)
    return null
  }
}


const getStatusColor = (status) => {
  const cores = {
    'Marcado': '#42A5F5',
    'Concluido': 'green',
    'Pendente': 'orange',
    'Recusado': 'red',
    'Cancelada': 'red'
  }
  return cores[status] || 'grey'
}

const verInfoAtleta = async (atletaId) => {
  const atleta = await buscarAtletaId(atletaId)
  if (atleta) {
    infoAtleta.value = atleta
  } else {
    console.log('Nenhum atleta encontrado')
  }
}

const abrirModalConfirmacao = (consultaId) => {
  consultaParaCancelar.value = consultaId
  modalConfirmacao.value = true
}

const confirmarCancelamento = async () => {
  modalConfirmacao.value = false
  const consultaId = consultaParaCancelar.value
  loadingCancelarIds.value.add(consultaId)
  try {
    const data = {
      situacao: 'Cancelada'
    }
    await consultasService.aceitarOrRejeitarConsultaById(consultaId, data)
    await buscarConsultas()
    toast.success(t('consultasMedico.toast.cancelSuccess'))
  } catch (error) {
    toast.error(t('consultasMedico.toast.cancelError') + ' ' + getErrorMessage(error, t('consultasMedico.toast.unknownError')))
    console.error('Erro ao cancelar consulta:', error)
  } finally {
    loadingCancelarIds.value.delete(consultaId)
    consultaParaCancelar.value = null
  }
}

const abrirModalFinalizar = (consultaId) => {
  consultaParaFinalizar.value = consultaId
  dadosFinalizacao.value = {
    diagnostico: '',
    medicamentosReceitados: ''
  }
  modalFinalizar.value = true
}

const fecharModalFinalizar = () => {
  modalFinalizar.value = false
  consultaParaFinalizar.value = null
  dadosFinalizacao.value = {
    diagnostico: '',
    medicamentosReceitados: ''
  }
}

const confirmarFinalizacao = async () => {
  loadingFinalizar.value = true
  try {
    const data = {
      situacao: 'Concluido',
      diagnostico: dadosFinalizacao.value.diagnostico,
      medicamentosReceitados: dadosFinalizacao.value.medicamentosReceitados
    }
    await consultasService.aceitarOrRejeitarConsultaById(consultaParaFinalizar.value, data)
    await buscarConsultas()
    toast.success(t('consultasMedico.toast.finalizeSuccess'))
    fecharModalFinalizar()
  } catch (error) {
    toast.error(t('consultasMedico.toast.finalizeError') + ' ' + getErrorMessage(error, t('consultasMedico.toast.unknownError')))
    console.error('Erro ao finalizar consulta:', error)
  } finally {
    loadingFinalizar.value = false
  }
}

const abrirModalDetalhes = (consulta) => {
  consultaSelecionada.value = consulta
  modalDetalhes.value = true
}

const certificarAtleta = () => {
  modalCertificar.value = true
}

const fecharModalCertificar = () => {
  modalCertificar.value = false
  validadeCertificado.value = null
  mesesPersonalizado.value = null
}

const confirmarCertificacao = async () => {
  loadingCertificar.value = true
  try {
    const meses = validadeCertificado.value === 'outro' ? mesesPersonalizado.value : validadeCertificado.value
    const data = {
      medicoId: consultaSelecionada.value?.medicoId,
      validade: dayjs().add(meses, 'month').toISOString(),
      ativo: true,
      consultaId: consultaSelecionada.value.id
    }
    await licencaCertificadoService.postLicencaCertificado(data)
    toast.success(t('consultasMedico.toast.certificateSuccess'))
    fecharModalCertificar()
    modalDetalhes.value = false
  } catch (error) {
    console.error('Erro ao gerar certificado:', error)
    toast.error(t('consultasMedico.toast.certificateError') + ' ' + getErrorMessage(error, t('consultasMedico.toast.unknownError')))
  } finally {
    loadingCertificar.value = false
  }
}

onMounted(() => {
  buscarConsultas()
})
</script>

<style scoped>
.header-section {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  padding: 48px 24px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.header-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.header-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.filter-toggle {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 50px;
}

.filter-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-btn.active-filter {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  color: white !important;
}

.statusColor {
  border-left: 4px solid var();
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.hover-card {
  transition: all 0.3s ease;
  min-height: 200px;
}

.hover-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.gap-1 {
  gap: 4px;
}

.gap-3 {
  gap: 12px;
}

.modal-confirmacao {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15) !important;
}

.flex-grow-1 {
  flex-grow: 1;
}
</style>
