<template>
  <v-container class="py-10">
    <v-row justify="center" class="text-center mb-8">
      <v-col cols="12">
        <h2 class="text-h5 text-md-h4 font-weight-bold text-blue-lighten-1">
          {{ t('consultasFisioterapeuta.title') }}
        </h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <div v-if="loading">
          <v-row>
            <v-col v-for="n in 12" :key="n" cols="12" md="6" lg="4">
              <v-card class="d-flex items-center px-5" elevation="4" rounded="xl" height="180">
                <v-row class="d-flex items-center" align="center" no-gutters>
                  <v-col cols="2">
                    <v-skeleton-loader class="h-full" type="avatar" width="150" height="150" />
                  </v-col>
                  <v-col cols="auto">
                    <v-skeleton-loader class="h-full" type="paragraph, text, text" width="250" height="150" />
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div v-else>
          <v-row>
            <v-col v-for="(consulta, index) in consultas" :key="index" cols="12" md="6" lg="4">
              <v-card class="pa-5 hover-card d-flex flex-column" elevation="4" rounded="xl" :style="{ borderLeft: `4px solid ${getStatusColor(consulta?.situacao)}` }">
                <v-row align="center" no-gutters class="flex-grow-1">
                  <v-col class="d-flex flex-column justify-center">
                    <div class="text-h6 font-weight-bold text-grey-darken-3 mb-1">
                      {{ consulta?.atleta?.usuario?.nome || t('consultasFisioterapeuta.externalPatient') }}
                    </div>
                    <div v-if="consulta?.atleta?.genero" class="text-body-2 text-grey-darken-1 mb-2">
                      {{ consulta?.atleta?.genero }}
                    </div>

                    <div class="d-flex flex-column gap-1 mb-3">
                      <div class="text-body-2 text-grey-darken-2 d-flex align-center">
                        <v-icon size="16" class="me-2" color="blue">mdi-calendar</v-icon>
                        {{ formatarDataLocal(consulta?.dataConsulta) }}
                      </div>
                      <div class="text-body-2 text-grey-darken-2 d-flex align-center">
                        <v-icon size="16" class="me-2" color="orange">mdi-clock-outline</v-icon>
                        {{ formatarHorarioLocal(consulta?.dataConsulta) }}
                      </div>
                    </div>

                    <div class="d-flex align-center justify-space-between flex-wrap ga-2">
                      <v-chip :color="getStatusColor(consulta?.situacao)" size="small" variant="flat" class="font-weight-medium text-white cursor-pointer" @click="verInfoAtleta(consulta?.atletaId)">
                        {{ t(`agendaFisioterapeutica.status.${consulta?.situacao}`, consulta?.situacao) }}
                      </v-chip>
                      <div class="d-flex gap-2">
                        <v-btn v-if="podeFinalizarConsulta(consulta.situacao)" color="green" variant="outlined" size="small" rounded="xl" prepend-icon="mdi-check" @click="abrirModalFinalizar(consulta.id)">
                          {{ t('consultasFisioterapeuta.finalize') }}
                        </v-btn>
                        <v-btn v-if="consulta.situacao !== 'Concluido'" color="red" variant="outlined" size="small" rounded="xl" :loading="loadingCancelarIds.has(consulta.id)" prepend-icon="mdi-close" @click="abrirModalConfirmacao(consulta.id)" class="ml-1">
                          {{ t('consultasFisioterapeuta.cancel') }}
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
            <p class="text-h6 mt-4 text-grey">{{ t('consultasFisioterapeuta.noAppointments') }}</p>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="modalConfirmacao" max-width="450" persistent>
      <v-card class="modal-confirmacao" rounded="xl">
        <v-card-text class="text-center pa-8">
          <div class="mb-6">
            <v-avatar size="80" color="red-lighten-4" class="mb-4">
              <v-icon size="40" color="red">mdi-alert-circle-outline</v-icon>
            </v-avatar>
          </div>
          <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-3">{{ t('consultasFisioterapeuta.cancelModal.title') }}</h3>
          <p class="text-body-1 text-grey-darken-1 mb-6">{{ t('consultasFisioterapeuta.cancelModal.message') }}</p>
          <div class="d-flex gap-3 justify-center">
            <v-btn color="grey-lighten-1" variant="outlined" size="large" rounded="xl" min-width="120" @click="modalConfirmacao = false">
              <v-icon start>mdi-close</v-icon>
              {{ t('consultasFisioterapeuta.cancelModal.cancel') }}
            </v-btn>
            <v-btn color="red" variant="flat" size="large" rounded="xl" min-width="120" @click="confirmarCancelamento">
              <v-icon start>mdi-check</v-icon>
              {{ t('consultasFisioterapeuta.cancelModal.confirm') }}
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="modalFinalizar" max-width="500" persistent>
      <v-card rounded="xl">
        <v-card-title class="text-h5 font-weight-bold pa-6 pb-0">{{ t('consultasFisioterapeuta.finalizeModal.title') }}</v-card-title>
        <v-card-text class="pa-6">
          <v-form ref="formFinalizar" v-model="formValid">
            <v-textarea v-model="dadosFinalizacao.diagnostico" :label="t('consultasFisioterapeuta.finalizeModal.diagnosis')" variant="outlined" rounded="lg" rows="3" :rules="[v => !!v || t('consultasFisioterapeuta.finalizeModal.diagnosisRequired')]" :placeholder="t('consultasFisioterapeuta.finalizeModal.diagnosisPlaceholder')" class="mb-4" />
            <v-textarea v-model="dadosFinalizacao.medicamentosReceitados" :label="t('consultasFisioterapeuta.finalizeModal.medications')" variant="outlined" rounded="lg" rows="4" :placeholder="t('consultasFisioterapeuta.finalizeModal.medicationsPlaceholder')" />
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn color="grey-lighten-1" variant="outlined" rounded="xl" @click="fecharModalFinalizar">{{ t('consultasFisioterapeuta.finalizeModal.cancel') }}</v-btn>
          <v-btn color="green" variant="flat" rounded="xl" :loading="loadingFinalizar" :disabled="!formValid" @click="confirmarFinalizacao">{{ t('consultasFisioterapeuta.finalizeModal.finalize') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import fisioterapeutaService from '@/services/fisioterapeutas/fisioterapeuta-service'
import { formatarDataLocal, formatarHorarioLocal } from '@/utils/date.utils'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import 'dayjs/locale/en'
import { ref, onMounted, watch } from 'vue'
import { toast } from 'vue3-toastify'
import atletaService from '@/services/atleta/atleta-service'
import { getErrorMessage } from '@/common/error.utils'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

watch(locale, (newLocale) => {
  dayjs.locale(newLocale === 'pt' ? 'pt-br' : 'en')
})

const loading = ref(true)
const consultas = ref([])
const loadingCancelarIds = ref(new Set())
const loadingAceitarIds = ref(new Set())
const infoAtleta = ref(null)
const modalConfirmacao = ref(false)
const consultaParaCancelar = ref(null)
const modalFinalizar = ref(false)
const consultaParaFinalizar = ref(null)
const formValid = ref(false)
const loadingFinalizar = ref(false)
const dadosFinalizacao = ref({ diagnostico: '', medicamentosReceitados: '' })

const buscarConsultas = async () => {
  loading.value = true
  try {
    const inicioAno = dayjs().startOf('year')
    const fimAno = dayjs().endOf('year')
    const dataInicio = inicioAno.format('YYYY-MM-DD') + 'T00:00:00.000Z'
    const dataFim = fimAno.format('YYYY-MM-DD') + 'T23:59:59.999Z'

    const resp = await fisioterapeutaService.findConsultasByFisioterapeuta(dataInicio, dataFim)
    if (Array.isArray(resp.data) && resp.data.length > 0 && resp.data[0].consultas) {
      consultas.value = resp.data.flatMap(item => item.consultas || []).filter(c => c.situacao === 'Marcado' || c.situacao === 'Concluido')
    } else {
      consultas.value = (resp.data || []).filter(c => c.situacao === 'Marcado' || c.situacao === 'Concluido')
    }
  } catch (error) {
    console.error('Erro ao buscar consultas', error)
  } finally {
    loading.value = false
  }
}

const buscarAtletaId = async (atletaId) => {
  try {
    return await atletaService.getAtletaById(atletaId)
  } catch (error) {
    console.error('Erro ao buscar atleta', error)
    return null
  }
}

const getStatusColor = (status) => {
  const cores = { 'Marcado': '#42A5F5', 'Concluido': 'green', 'Pendente': 'orange', 'Recusado': 'red', 'Cancelada': 'red' }
  return cores[status] || 'grey'
}

const podeFinalizarConsulta = (situacao) => {
  return situacao === 'Marcado'
}

const verInfoAtleta = async (atletaId) => {
  const atleta = await buscarAtletaId(atletaId)
  if (atleta) {
    infoAtleta.value = atleta
    console.log('infoAtleta:', atleta)
  }
}

const aceitarConsulta = async (consultaId) => {
  loadingAceitarIds.value.add(consultaId)
  try {
    const data = { situacao: 'Marcado' }
    await fisioterapeutaService.aceitarOrRejeitarConsultaById(consultaId, data)
    toast.success('Consulta aceita com sucesso!')
    await buscarConsultas()
  } catch (error) {
    toast.error(getErrorMessage(error))
  } finally {
    loadingAceitarIds.value.delete(consultaId)
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
    await fisioterapeutaService.aceitarOrRejeitarConsultaById(consultaId, { situacao: 'Cancelada' })
    await buscarConsultas()
    toast.success(t('consultasFisioterapeuta.toast.cancelSuccess'))
  } catch (error) {
    toast.error(t('consultasFisioterapeuta.toast.cancelError') + ' ' + getErrorMessage(error, t('consultasFisioterapeuta.toast.unknownError')))
  } finally {
    loadingCancelarIds.value.delete(consultaId)
    consultaParaCancelar.value = null
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
    const data = { situacao: 'Concluido', diagnostico: dadosFinalizacao.value.diagnostico, medicamentosReceitados: dadosFinalizacao.value.medicamentosReceitados }
    await fisioterapeutaService.aceitarOrRejeitarConsultaById(consultaParaFinalizar.value, data)
    await buscarConsultas()
    toast.success(t('consultasFisioterapeuta.toast.finalizeSuccess'))
    fecharModalFinalizar()
  } catch (error) {
    toast.error(t('consultasFisioterapeuta.toast.finalizeError') + ' ' + getErrorMessage(error, t('consultasFisioterapeuta.toast.unknownError')))
  } finally {
    loadingFinalizar.value = false
  }
}

onMounted(() => {
  dayjs.locale(locale.value === 'pt' ? 'pt-br' : 'en')
  buscarConsultas()
})
</script>

<style scoped>
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

.gap-2 {
  gap: 8px;
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
