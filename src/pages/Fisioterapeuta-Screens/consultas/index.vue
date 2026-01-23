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
              <v-card class="consulta-card" elevation="2" rounded="lg">
                <div class="card-status-bar" :style="{ backgroundColor: getStatusColor(consulta?.situacao) }" />
                
                <v-card-text class="pa-6">
                  <div class="d-flex align-center justify-space-between mb-4">
                    <div class="d-flex align-center">
                      <v-avatar color="primary" size="40" class="me-3">
                        <v-icon color="white">mdi-account</v-icon>
                      </v-avatar>
                      <div>
                        <div class="text-subtitle-1 font-weight-bold text-grey-darken-4">
                          {{ consulta?.atleta?.usuario?.nome || t('consultasFisioterapeuta.externalPatient') }}
                        </div>
                        <div class="text-caption text-grey-darken-1">
                          {{ consulta?.atleta?.genero ? t(`consultasFisioterapeuta.gender.${consulta.atleta.genero}`, consulta.atleta.genero) : 'Paciente' }}
                        </div>
                      </div>
                    </div>
                    <v-chip
                      :color="getStatusColor(consulta?.situacao)"
                      size="small"
                      variant="tonal"
                      class="font-weight-medium"
                    >
                      {{ t(`consultasFisioterapeuta.status.${consulta?.situacao}`, consulta?.situacao) }}
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

                  <div v-if="podeFinalizarConsulta(consulta.situacao) || consulta.situacao !== 'Concluido'" class="action-buttons mt-5">
                    <v-btn
                      v-if="podeFinalizarConsulta(consulta.situacao)"
                      color="success"
                      variant="flat"
                      size="small"
                      rounded="lg"
                      prepend-icon="mdi-check-circle"
                      class="flex-grow-1"
                      @click="abrirModalFinalizar(consulta.id)"
                    >
                      {{ t('consultasFisioterapeuta.finalize') }}
                    </v-btn>
                    <v-btn
                      v-if="consulta.situacao !== 'Concluido'"
                      color="error"
                      variant="outlined"
                      size="small"
                      rounded="lg"
                      prepend-icon="mdi-close-circle"
                      class="flex-grow-1"
                      :loading="loadingCancelarIds.has(consulta.id)"
                      @click="abrirModalConfirmacao(consulta.id)"
                    >
                      {{ t('consultasFisioterapeuta.cancel') }}
                    </v-btn>
                  </div>
                </v-card-text>
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
      <v-card rounded="lg" class="modal-card">
        <v-card-text class="text-center pa-8">
          <v-avatar size="80" color="error" variant="tonal" class="mb-4">
            <v-icon size="48" color="error">mdi-alert-circle-outline</v-icon>
          </v-avatar>
          <h3 class="text-h5 font-weight-bold text-grey-darken-4 mb-3">{{ t('consultasFisioterapeuta.cancelModal.title') }}</h3>
          <p class="text-body-1 text-grey-darken-1 mb-6">{{ t('consultasFisioterapeuta.cancelModal.message') }}</p>
          <div class="d-flex gap-3 justify-center">
            <v-btn color="grey" variant="outlined" rounded="lg" class="text-none px-6" @click="modalConfirmacao = false">{{ t('consultasFisioterapeuta.cancelModal.cancel') }}</v-btn>
            <v-btn color="error" variant="flat" rounded="lg" class="text-none font-weight-medium px-6" @click="confirmarCancelamento">{{ t('consultasFisioterapeuta.cancelModal.confirm') }}</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="modalFinalizar" max-width="550" persistent>
      <v-card rounded="lg" class="modal-card">
        <div class="modal-header">
          <div class="d-flex align-center">
            <v-avatar color="success" size="48" class="me-3">
              <v-icon color="white" size="28">mdi-check-circle</v-icon>
            </v-avatar>
            <div>
              <div class="text-h5 font-weight-bold text-grey-darken-4">{{ t('consultasFisioterapeuta.finalizeModal.title') }}</div>
              <div class="text-caption text-grey-darken-1">Adicione as informações finais</div>
            </div>
          </div>
          <v-btn icon="mdi-close" variant="text" size="small" @click="fecharModalFinalizar" />
        </div>

        <v-divider />

        <v-card-text class="pa-6">
          <v-form ref="formFinalizar" v-model="formValid">
            <v-textarea v-model="dadosFinalizacao.diagnostico" :label="t('consultasFisioterapeuta.finalizeModal.diagnosis')" variant="outlined" rounded="lg" rows="3" :rules="[v => !!v || t('consultasFisioterapeuta.finalizeModal.diagnosisRequired')]" :placeholder="t('consultasFisioterapeuta.finalizeModal.diagnosisPlaceholder')" class="mb-4" />
            <v-textarea v-model="dadosFinalizacao.medicamentosReceitados" :label="t('consultasFisioterapeuta.finalizeModal.medications')" variant="outlined" rounded="lg" rows="4" :placeholder="t('consultasFisioterapeuta.finalizeModal.medicationsPlaceholder')" />
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn color="grey" variant="outlined" rounded="lg" class="text-none" @click="fecharModalFinalizar">{{ t('consultasFisioterapeuta.finalizeModal.cancel') }}</v-btn>
          <v-btn color="success" variant="flat" rounded="lg" class="text-none font-weight-medium" :loading="loadingFinalizar" :disabled="!formValid" @click="confirmarFinalizacao">{{ t('consultasFisioterapeuta.finalizeModal.finalize') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import fisioterapeutaService from '@/services/fisioterapeutas/fisioterapeuta-service'
import { formatarDataComLocale, formatarHorarioLocal } from '@/utils/date.utils'
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
      consultas.value = resp.data.flatMap(item => item.consultas || []).filter(c => (c.situacao === 'Marcado' || c.situacao === 'Concluido') && c.consultaExterna === false)
    } else {
      consultas.value = (resp.data || []).filter(c => (c.situacao === 'Marcado' || c.situacao === 'Concluido') && c.consultaExterna === false)
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

.gap-1 {
  gap: 4px;
}

.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}

.flex-grow-1 {
  flex-grow: 1;
}
</style>
