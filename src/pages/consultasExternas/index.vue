<template>
  <v-container class="py-10">
    <div class="header-section">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <v-icon size="40" color="white">mdi-calendar-check</v-icon>
        </div>
        <h1 class="header-title">{{ t('consultasExternas.title') }}</h1>
      </div>
    </div>

    <v-row justify="center" class="mb-6 mt-8">
      <v-btn-toggle v-model="filtroStatus" rounded="pill" group mandatory class="filter-toggle">
        <v-btn
          value="Marcado"
          :variant="filtroStatus === 'Marcado' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium filter-btn"
          :class="{ 'active-filter': filtroStatus === 'Marcado' }"
        >
          {{ t('consultasExternas.filters.scheduled') }}
        </v-btn>
        <v-btn
          value="Concluido"
          :variant="filtroStatus === 'Concluido' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium filter-btn"
          :class="{ 'active-filter': filtroStatus === 'Concluido' }"
        >
          {{ t('consultasExternas.filters.completed') }}
        </v-btn>
        <v-btn
          value="Cancelada"
          :variant="filtroStatus === 'Cancelada' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium filter-btn"
          :class="{ 'active-filter': filtroStatus === 'Cancelada' }"
        >
          {{ t('consultasExternas.filters.cancelled') }}
        </v-btn>
      </v-btn-toggle>
    </v-row>

    <v-row justify="center" class="mb-6">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="valorBusca"
          :label="tipoBusca === 'nome' ? t('consultasExternas.searchByName') : t('consultasExternas.searchByCpf')"
          variant="outlined"
          rounded="lg"
          clearable
          @keyup.enter="buscarConsultas"
        >
          <template v-slot:prepend-inner>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon
                  variant="tonal"
                  color="primary"
                  size="small"
                >
                  <v-icon>{{ tipoBusca === 'nome' ? 'mdi-account' : 'mdi-card-account-details' }}</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="tipoBusca = 'nome'">
                  <template v-slot:prepend>
                    <v-icon>mdi-account</v-icon>
                  </template>
                  <v-list-item-title>{{ t('consultasExternas.name') }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="tipoBusca = 'cpf'">
                  <template v-slot:prepend>
                    <v-icon>mdi-card-account-details</v-icon>
                  </template>
                  <v-list-item-title>{{ t('consultasExternas.cpf') }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template v-slot:append-inner>
            <v-btn
              icon="mdi-magnify"
              color="primary"
              variant="flat"
              size="small"
              @click="buscarConsultas"
            />
          </template>
        </v-text-field>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <div v-if="loading" class="text-center py-8">
          <v-progress-circular indeterminate color="blue-lighten-1" size="64" />
        </div>

        <div v-else>
          <v-row>
          <v-col
            v-for="(consulta, index) in consultasFiltradas"
            :key="index"
            cols="12"
            md="6"
            lg="4"
          >
            <v-card
              class="consulta-card"
              elevation="2"
              rounded="lg"
              @click="abrirModalDetalhes(consulta)"
            >
              <div class="card-status-bar" :style="{ backgroundColor: getStatusColor(consulta?.situacao) }" />

              <v-card-text class="pa-6">
                <div class="d-flex align-center justify-space-between mb-4">
                  <div class="d-flex align-center">
                    <v-avatar color="primary" size="40" class="me-3">
                      <v-icon color="white">mdi-account</v-icon>
                    </v-avatar>
                    <div>
                      <div class="text-subtitle-1 font-weight-bold text-grey-darken-4">
                        {{ consulta?.nomePacienteExterno || 'N/A' }}
                      </div>
                      <div class="text-caption text-grey-darken-1">{{ t('consultasExternas.patient') }}</div>
                    </div>
                  </div>
                  <v-chip
                    :color="getStatusColor(consulta?.situacao)"
                    size="small"
                    variant="tonal"
                    class="font-weight-medium"
                  >
                    {{ t(`consultasExternas.status.${consulta?.situacao}`) }}
                  </v-chip>
                </div>

                <v-divider class="mb-4" />

                <div class="info-section">
                  <div class="info-item">
                    <v-icon size="18" color="primary" class="me-2">mdi-calendar</v-icon>
                    <span class="text-body-2 text-grey-darken-2">{{ formatarDataComLocale(consulta?.dataConsulta, locale) }}</span>
                  </div>
                  <div class="info-item mt-2">
                    <v-icon size="18" color="primary" class="me-2">mdi-clock-outline</v-icon>
                    <span class="text-body-2 text-grey-darken-2">{{ formatarHorarioLocal(consulta?.dataConsulta) }}</span>
                  </div>
                </div>

                <div v-if="consulta?.situacao === 'Marcado'" class="action-buttons mt-5">
                  <v-btn
                    color="success"
                    variant="flat"
                    size="small"
                    rounded="lg"
                    prepend-icon="mdi-check-circle"
                    class="flex-grow-1"
                    @click.stop="abrirModalFinalizar(consulta.id)"
                  >
                    {{ t('consultasExternas.finalize') }}
                  </v-btn>
                  <v-btn
                    color="error"
                    variant="outlined"
                    size="small"
                    rounded="lg"
                    prepend-icon="mdi-close-circle"
                    class="flex-grow-1"
                    @click.stop="abrirModalCancelar(consulta.id)"
                  >
                    {{ t('consultasExternas.cancel') }}
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          </v-row>

          <div v-if="consultasFiltradas.length === 0" class="text-center py-8">
            <v-icon size="64" color="grey-lighten-2">mdi-calendar-blank</v-icon>
            <p class="text-h6 mt-4 text-grey">{{ t('consultasExternas.noAppointments') }}</p>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Modal de Detalhes da Consulta -->
    <v-dialog v-model="modalDetalhes" max-width="700" persistent>
      <v-card rounded="lg" class="modal-card">
        <div class="modal-header">
          <div class="d-flex align-center">
            <v-avatar color="primary" size="48" class="me-3">
              <v-icon color="white" size="28">mdi-file-document-outline</v-icon>
            </v-avatar>
            <div>
              <div class="text-h5 font-weight-bold text-grey-darken-4">{{ t('consultasExternas.detailsModal.title') }}</div>
              <div class="text-caption text-grey-darken-1">{{ t('consultasExternas.finalizeModal.subtitle') }}</div>
            </div>
          </div>
          <v-btn icon="mdi-close" variant="text" size="small" @click="modalDetalhes = false" />
        </div>

        <v-divider />

        <v-card-text class="pa-6" v-if="consultaSelecionada">
          <div class="detail-section mb-4">
            <div class="d-flex align-center mb-3">
              <v-icon color="primary" class="me-2">mdi-account</v-icon>
              <span class="text-subtitle-2 text-grey-darken-1">{{ t('consultasExternas.detailsModal.patient') }}</span>
            </div>
            <div class="text-h6 font-weight-medium">{{ consultaSelecionada.nomePacienteExterno || 'N/A' }}</div>
          </div>

          <v-row>
            <v-col cols="6">
              <div class="detail-box">
                <v-icon size="20" color="primary" class="mb-2">mdi-calendar</v-icon>
                <div class="text-caption text-grey-darken-1 mb-1">{{ t('consultasExternas.detailsModal.date') }}</div>
                <div class="text-body-1 font-weight-medium">{{ formatarDataComLocale(consultaSelecionada.dataConsulta, locale) }}</div>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="detail-box">
                <v-icon size="20" color="primary" class="mb-2">mdi-clock-outline</v-icon>
                <div class="text-caption text-grey-darken-1 mb-1">{{ t('consultasExternas.detailsModal.time') }}</div>
                <div class="text-body-1 font-weight-medium">{{ formatarHorarioLocal(consultaSelecionada.dataConsulta) }}</div>
              </div>
            </v-col>
          </v-row>

          <v-row class="mt-2">
            <v-col cols="6">
              <div class="detail-box">
                <v-icon size="20" color="primary" class="mb-2">mdi-information-outline</v-icon>
                <div class="text-caption text-grey-darken-1 mb-2">{{ t('consultasExternas.detailsModal.status') }}</div>
                <v-chip :color="getStatusColor(consultaSelecionada.situacao)" size="small" variant="tonal" class="font-weight-medium">
                  {{ t(`consultasExternas.status.${consultaSelecionada.situacao}`) }}
                </v-chip>
              </div>
            </v-col>
            <v-col cols="6" v-if="consultaSelecionada.telefonePacienteExterno">
              <div class="detail-box">
                <v-icon size="20" color="primary" class="mb-2">mdi-phone</v-icon>
                <div class="text-caption text-grey-darken-1 mb-1">{{ t('consultasExternas.detailsModal.phone') }}</div>
                <div class="text-body-1 font-weight-medium">{{ consultaSelecionada.telefonePacienteExterno }}</div>
              </div>
            </v-col>
          </v-row>

          <div class="detail-section mt-4" v-if="consultaSelecionada.diagnostico">
            <div class="d-flex align-center mb-2">
              <v-icon color="primary" class="me-2">mdi-stethoscope</v-icon>
              <span class="text-subtitle-2 text-grey-darken-1">{{ t('consultasExternas.detailsModal.diagnosis') }}</span>
            </div>
            <div class="text-body-1">{{ consultaSelecionada.diagnostico }}</div>
          </div>

          <div class="detail-section mt-4" v-if="consultaSelecionada.medicamentosReceitados">
            <div class="d-flex align-center mb-2">
              <v-icon color="primary" class="me-2">mdi-pill</v-icon>
              <span class="text-subtitle-2 text-grey-darken-1">{{ t('consultasExternas.detailsModal.medications') }}</span>
            </div>
            <div class="text-body-1">{{ consultaSelecionada.medicamentosReceitados }}</div>
          </div>

          <div class="mt-6" v-if="consultaSelecionada.situacao === 'Concluido' && getMedicoId()">
            <v-divider class="mb-4" />
            <v-btn
              color="primary"
              variant="flat"
              rounded="lg"
              block
              size="large"
              prepend-icon="mdi-certificate"
              class="text-none font-weight-medium"
              @click="certificarAtleta()"
            >
              {{ t('consultasExternas.detailsModal.certifyAthlete') }}
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Modal de Certificar Atleta -->
    <v-dialog v-model="modalCertificar" max-width="600" persistent>
      <v-card rounded="lg" class="modal-card">
        <div class="modal-header">
          <div class="d-flex align-center">
            <v-avatar color="primary" size="48" class="me-3">
              <v-icon color="white" size="28">mdi-certificate</v-icon>
            </v-avatar>
            <div>
              <div class="text-h5 font-weight-bold text-grey-darken-4">{{ t('consultasExternas.certificationModal.title') }}</div>
              <div class="text-caption text-grey-darken-1">{{ t('consultasExternas.certificationModal.subtitle') }}</div>
            </div>
          </div>
          <v-btn icon="mdi-close" variant="text" size="small" @click="fecharModalCertificar" />
        </div>

        <v-divider />

        <v-card-text class="pa-6" v-if="consultaSelecionada">
          <div class="detail-section mb-4">
            <div class="d-flex align-center mb-2">
              <v-icon color="primary" class="me-2">mdi-account</v-icon>
              <span class="text-subtitle-2 text-grey-darken-1">{{ t('consultasExternas.certificationModal.patient') }}</span>
            </div>
            <div class="text-h6 font-weight-medium">{{ consultaSelecionada.nomePacienteExterno }}</div>
          </div>

          <v-row class="mb-4">
            <v-col cols="6">
              <div class="detail-box">
                <v-icon size="20" color="primary" class="mb-2">mdi-calendar</v-icon>
                <div class="text-caption text-grey-darken-1 mb-1">{{ t('consultasExternas.certificationModal.appointmentDate') }}</div>
                <div class="text-body-1 font-weight-medium">{{ formatarDataComLocale(consultaSelecionada.dataConsulta, locale) }}</div>
              </div>
            </v-col>
            <v-col cols="6" v-if="consultaSelecionada.telefonePacienteExterno">
              <div class="detail-box">
                <v-icon size="20" color="primary" class="mb-2">mdi-phone</v-icon>
                <div class="text-caption text-grey-darken-1 mb-1">{{ t('consultasExternas.certificationModal.phone') }}</div>
                <div class="text-body-1 font-weight-medium">{{ consultaSelecionada.telefonePacienteExterno }}</div>
              </div>
            </v-col>
          </v-row>

          <v-select
            v-model="validadeCertificado"
            :items="opcoesMeses"
            item-title="text"
            item-value="value"
            :label="t('consultasExternas.certificationModal.validityMonths')"
            variant="outlined"
            rounded="lg"
            :rules="[v => !!v || t('consultasExternas.certificationModal.required')]"
          />

          <v-text-field
            v-if="validadeCertificado === 'outro'"
            v-model.number="mesesPersonalizado"
            :label="t('consultasExternas.certificationModal.customMonths')"
            type="number"
            variant="outlined"
            rounded="lg"
            :rules="[v => !!v || t('consultasExternas.certificationModal.required'), v => v > 0 || t('consultasExternas.certificationModal.validationRule')]"
            class="mt-4"
          />
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn
            color="grey"
            variant="outlined"
            rounded="lg"
            class="text-none"
            @click="fecharModalCertificar"
          >
            {{ t('consultasExternas.certificationModal.cancel') }}
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            rounded="lg"
            class="text-none font-weight-medium"
            :loading="loadingCertificar"
            :disabled="!validadeCertificado || (validadeCertificado === 'outro' && !mesesPersonalizado)"
            @click="confirmarCertificacao"
          >
            {{ t('consultasExternas.certificationModal.certify') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de Cancelar Consulta -->
    <v-dialog v-model="modalCancelar" max-width="450" persistent>
      <v-card rounded="lg" class="modal-card">
        <v-card-text class="text-center pa-8">
          <v-avatar size="80" color="error" variant="tonal" class="mb-4">
            <v-icon size="48" color="error">mdi-alert-circle-outline</v-icon>
          </v-avatar>
          <h3 class="text-h5 font-weight-bold text-grey-darken-4 mb-3">{{ t('consultasExternas.cancelModal.title') }}</h3>
          <p class="text-body-1 text-grey-darken-1 mb-6">{{ t('consultasExternas.cancelModal.message') }}</p>
          <div class="d-flex gap-3 justify-center">
            <v-btn color="grey" variant="outlined" rounded="lg" class="text-none px-6" @click="modalCancelar = false">{{ t('consultasExternas.cancelModal.no') }}</v-btn>
            <v-btn color="error" variant="flat" rounded="lg" class="text-none font-weight-medium px-6" :loading="loadingCancelar" @click="confirmarCancelamento">{{ t('consultasExternas.cancelModal.yesCancel') }}</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Modal de Finalizar Consulta -->
    <v-dialog v-model="modalFinalizar" max-width="550" persistent>
      <v-card rounded="lg" class="modal-card">
        <div class="modal-header">
          <div class="d-flex align-center">
            <v-avatar color="success" size="48" class="me-3">
              <v-icon color="white" size="28">mdi-check-circle</v-icon>
            </v-avatar>
            <div>
              <div class="text-h5 font-weight-bold text-grey-darken-4">{{ t('consultasExternas.finalizeModal.title') }}</div>
              <div class="text-caption text-grey-darken-1">{{ t('consultasExternas.finalizeModal.subtitle') }}</div>
            </div>
          </div>
          <v-btn icon="mdi-close" variant="text" size="small" @click="fecharModalFinalizar" />
        </div>

        <v-divider />

        <v-card-text class="pa-6">
          <v-textarea
            v-model="dadosFinalizacao.diagnostico"
            :label="t('consultasExternas.finalizeModal.diagnosis')"
            variant="outlined"
            rounded="lg"
            rows="3"
            :placeholder="t('consultasExternas.finalizeModal.diagnosisPlaceholder')"
            class="mb-4"
          />
          <v-textarea
            v-model="dadosFinalizacao.medicamentosReceitados"
            :label="t('consultasExternas.finalizeModal.medications')"
            variant="outlined"
            rounded="lg"
            rows="4"
            :placeholder="t('consultasExternas.finalizeModal.medicationsPlaceholder')"
          />
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn color="grey" variant="outlined" rounded="lg" class="text-none" @click="fecharModalFinalizar">{{ t('consultasExternas.finalizeModal.cancel') }}</v-btn>
          <v-btn color="success" variant="flat" rounded="lg" class="text-none font-weight-medium" :loading="loadingFinalizar" @click="confirmarFinalizacao">{{ t('consultasExternas.finalizeModal.finalize') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import consultasService from '@/services/consultas/consultas-service'
import { formatarDataComLocale, formatarHorarioLocal } from '@/utils/date.utils'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import 'dayjs/locale/en'
import { toast } from 'vue3-toastify'
import licencaCertificadoService from '@/services/licenca-certificado/licenca-certificado-service'
import { getErrorMessage } from '@/common/error.utils'
import { getMedicoId } from '@/utils/auth'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

watch(locale, (newLocale) => {
  dayjs.locale(newLocale === 'pt' ? 'pt-br' : 'en')
})

const consultas = ref([])
const valorBusca = ref('')
const tipoBusca = ref('nome')
const filtroStatus = ref('Marcado')
const modalDetalhes = ref(false)
const consultaSelecionada = ref(null)
const modalCertificar = ref(false)
const validadeCertificado = ref(null)
const mesesPersonalizado = ref(null)
const loadingCertificar = ref(false)
const loading = ref(false)
const modalCancelar = ref(false)
const modalFinalizar = ref(false)
const consultaParaCancelar = ref(null)
const consultaParaFinalizar = ref(null)
const loadingFinalizar = ref(false)
const loadingCancelar = ref(false)
const dadosFinalizacao = ref({ diagnostico: '', medicamentosReceitados: '' })
let searchTimeout = null

const opcoesMeses = computed(() => [
  { text: t('consultasExternas.certificationModal.monthOptions.1'), value: 1 },
  { text: t('consultasExternas.certificationModal.monthOptions.3'), value: 3 },
  { text: t('consultasExternas.certificationModal.monthOptions.6'), value: 6 },
  { text: t('consultasExternas.certificationModal.monthOptions.9'), value: 9 },
  { text: t('consultasExternas.certificationModal.monthOptions.12'), value: 12 },
  { text: t('consultasExternas.certificationModal.monthOptions.other'), value: 'outro' }
])

const consultasFiltradas = computed(() => {
  return consultas.value.filter(c => c.situacao === filtroStatus.value)
})

const buscarConsultas = async () => {
  loading.value = true
  try {
    const mesInicio = dayjs().startOf('month')
    const mesFim = dayjs().endOf('month')

    const data = {
      dataInicio: mesInicio.format('YYYY-MM-DD'),
      dataFim: mesFim.format('YYYY-MM-DD'),
      nome: tipoBusca.value === 'nome' ? (valorBusca.value || null) : null,
      cpf: tipoBusca.value === 'cpf' ? (valorBusca.value || null) : null
    }
    const response = await consultasService.findConsultasExternas(data)
    consultas.value = response.data.flatMap(item => item.consultas || [])
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const getStatusColor = (status) => {
  const cores = {
    'Marcado': '#42A5F5',
    'Concluido': 'green',
    'Cancelada': 'red'
  }
  return cores[status] || 'grey'
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
    toast.success(t('consultasExternas.toast.certificateSuccess'))
    fecharModalCertificar()
    modalDetalhes.value = false
  } catch (error) {
    console.error('Erro ao gerar certificado:', error)
    toast.error(t('consultasExternas.toast.certificateError'))
  } finally {
    loadingCertificar.value = false
  }
}

const abrirModalCancelar = (consultaId) => {
  consultaParaCancelar.value = consultaId
  modalCancelar.value = true
}

const confirmarCancelamento = async () => {
  loadingCancelar.value = true
  try {
    await consultasService.aceitarOrRejeitarConsultaById(consultaParaCancelar.value, { situacao: 'Cancelada' })
    toast.success(t('consultasExternas.toast.cancelSuccess'))
    modalCancelar.value = false
    await buscarConsultas()
  } catch (error) {
    toast.error(t('consultasExternas.toast.cancelError'))
  } finally {
    loadingCancelar.value = false
  }
}

const abrirModalFinalizar = (consultaId) => {
  consultaParaFinalizar.value = consultaId
  dadosFinalizacao.value = { diagnostico: '', medicamentosReceitados: '' }
  modalFinalizar.value = true
}

const fecharModalFinalizar = () => {
  modalFinalizar.value = false
  consultaParaFinalizar.value = null
  dadosFinalizacao.value = { diagnostico: '', medicamentosReceitados: '' }
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
    toast.success(t('consultasExternas.toast.finalizeSuccess'))
    fecharModalFinalizar()
    await buscarConsultas()
  } catch (error) {
    toast.error(t('consultasExternas.toast.finalizeError'))
  } finally {
    loadingFinalizar.value = false
  }
}

onMounted(async () => {
  dayjs.locale(locale.value === 'pt' ? 'pt-br' : 'en')
  await buscarConsultas()
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

.consulta-card {
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.consulta-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12) !important;
}

.card-status-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  transition: height 0.3s ease;
}

.consulta-card:hover .card-status-bar {
  height: 6px;
}

.info-section {
  background: rgba(66, 165, 245, 0.04);
  padding: 12px;
  border-radius: 8px;
}

.info-item {
  display: flex;
  align-items: center;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.modal-card {
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  background: linear-gradient(135deg, rgba(66, 165, 245, 0.05) 0%, rgba(30, 136, 229, 0.05) 100%);
}

.detail-section {
  padding: 16px;
  background: rgba(66, 165, 245, 0.04);
  border-radius: 8px;
  border-left: 3px solid rgb(var(--v-theme-primary));
}

.detail-box {
  padding: 16px;
  background: rgba(66, 165, 245, 0.04);
  border-radius: 8px;
  height: 100%;
  transition: all 0.2s ease;
}

.detail-box:hover {
  background: rgba(66, 165, 245, 0.08);
  transform: translateY(-2px);
}
</style>
