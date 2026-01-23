<template>
  <v-container class="py-10">
    <div class="header-section">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <v-icon size="40" color="white">mdi-calendar-check</v-icon>
        </div>
        <h1 class="header-title">{{ t('consultas.title') }}</h1>
      </div>
    </div>

    <v-row justify="center" class="mb-10 mt-8">
      <v-btn-toggle v-model="filtro" rounded="pill" group mandatory class="filter-toggle">
        <v-btn
          value="todas"
          :variant="filtro === 'todas' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium filter-btn"
          :class="{ 'active-filter': filtro === 'todas' }"
        >
          {{ t('consultas.filters.all') }}
        </v-btn>
        <v-btn
          value="marcado"
          :variant="filtro === 'marcado' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium filter-btn"
          :class="{ 'active-filter': filtro === 'marcado' }"
        >
          {{ t('consultas.filters.scheduled') }}
        </v-btn>
        <v-btn
          value="realizadas"
          :variant="filtro === 'realizadas' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium filter-btn"
          :class="{ 'active-filter': filtro === 'realizadas' }"
        >
          {{ t('consultas.filters.completed') }}
        </v-btn>
        <v-btn
          value="pendente"
          :variant="filtro === 'pendente' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium filter-btn"
          :class="{ 'active-filter': filtro === 'pendente' }"
        >
          {{ t('consultas.filters.pending') }}
        </v-btn>
        <v-btn
          value="recusadas"
          :variant="filtro === 'recusadas' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium filter-btn"
          :class="{ 'active-filter': filtro === 'recusadas' }"
        >
          {{ t('consultas.filters.refused') }}
        </v-btn>
        <v-btn
          value="canceladas"
          :variant="filtro === 'canceladas' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium filter-btn"
          :class="{ 'active-filter': filtro === 'canceladas' }"
        >
          {{ t('consultas.filters.cancelled') }}
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
              >
                <div class="card-status-bar" :style="{ backgroundColor: getStatusColor(consulta?.situacao) }" />
                
                <v-card-text class="pa-6">
                  <div class="d-flex align-center justify-space-between mb-4">
                    <div class="d-flex align-center">
                      <v-avatar size="50" class="me-3">
                        <v-img v-if="consulta?.medico?.avatarUrl" :src="consulta?.medico?.avatarUrl" cover />
                        <v-icon v-else color="primary" size="28">mdi-doctor</v-icon>
                      </v-avatar>
                      <div>
                        <div class="text-subtitle-1 font-weight-bold text-grey-darken-4">
                          Dr. {{ consulta?.medico?.usuario?.nome }}
                        </div>
                        <div class="text-caption text-grey-darken-1">
                          {{ consulta?.medico?.especializacao }}
                        </div>
                      </div>
                    </div>
                    <v-chip
                      :color="getStatusColor(consulta?.situacao)"
                      size="small"
                      variant="tonal"
                      class="font-weight-medium"
                    >
                      {{ t(`consultas.status.${consulta?.situacao}`) }}
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
                      color="error"
                      variant="flat"
                      size="small"
                      rounded="lg"
                      prepend-icon="mdi-close-circle"
                      class="flex-grow-1"
                      :loading="loadingCancelarIds.has(consulta?.id)"
                      @click="abrirModalConfirmacao(consulta?.id)"
                    >
                      {{ t('consultas.cancelButton') }}
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <div v-if="consultasFiltradas.length === 0" class="text-center py-8">
            <v-icon size="64" color="grey-lighten-2">mdi-calendar-blank</v-icon>
            <p class="text-h6 mt-4 text-grey">{{ t('consultas.noConsultations') }}</p>
          </div>

          <!-- Paginação -->
          <!-- <v-row v-if="!loading && totalPages > 1" justify="center" class="mt-4">
            <v-pagination v-model="page" :length="totalPages" active-color="green" total-visible="4" size="small"
              @update:model-value="mudarPagina" />
          </v-row> -->
        </div>
      </v-col>
    </v-row>

    <!-- Modal de Confirmação -->
    <v-dialog v-model="modalConfirmacao" max-width="450" persistent>
      <v-card rounded="lg" class="modal-card">
        <v-card-text class="text-center pa-8">
          <v-avatar size="80" color="error" variant="tonal" class="mb-4">
            <v-icon size="48" color="error">mdi-alert-circle-outline</v-icon>
          </v-avatar>
          <h3 class="text-h5 font-weight-bold text-grey-darken-4 mb-3">{{ t('consultas.modal.title') }}</h3>
          <p class="text-body-1 text-grey-darken-1 mb-6">{{ t('consultas.modal.message') }}</p>
          <div class="d-flex gap-3 justify-center">
            <v-btn color="grey" variant="outlined" rounded="lg" class="text-none px-6" @click="modalConfirmacao = false">{{ t('consultas.modal.cancel') }}</v-btn>
            <v-btn color="error" variant="flat" rounded="lg" class="text-none font-weight-medium px-6" @click="confirmarCancelamento">{{ t('consultas.modal.confirm') }}</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import consultasService from '@/services/consultas/consultas-service'
import { getAtletaId } from '@/utils/auth'
import { formatarDataComLocale, formatarHorarioLocal } from '@/utils/date.utils'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { computed, onMounted, ref, watch } from 'vue'
import { toast } from 'vue3-toastify'
import { getErrorMessage } from '@/common/error.utils'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
dayjs.locale('pt-br')

const filtro = ref('todas')
const page = ref(1)
const pageSize = ref(10)
const totalPages = ref(0)
const loading = ref(true)
const consultas = ref([])
const loadingCancelarIds = ref(new Set())
const modalConfirmacao = ref(false)
const consultaParaCancelar = ref(null)

const consultasFiltradas = computed(() => {
  if (filtro.value === 'todas') return consultas.value
  if (filtro.value === 'marcado')
    return consultas.value.filter((c) => c.situacao === 'Marcado')
  if (filtro.value === 'pendente')
    return consultas.value.filter((c) => c.situacao === 'Pendente')
  if (filtro.value === 'realizadas')
    return consultas.value.filter((c) => c.situacao === 'Concluido')
    if (filtro.value === 'recusadas')
    return consultas.value.filter((c) => c.situacao === 'Recusado')
    if (filtro.value === 'canceladas')
    return consultas.value.filter((c) => c.situacao === 'Cancelada')

  return consultas.value
})

const buscarConsultas = async () => {
  try {
    loading.value = true
    const response =
      await consultasService.getConsultasByAtletaId(getAtletaId())
    // Handle nested structure: response.data[0].consultas
    const data = response.data
    if (Array.isArray(data) && data.length > 0 && data[0].consultas) {
      consultas.value = data[0].consultas
    } else {
      consultas.value = response.data.itens || response.data || []
    }
    totalPages.value = response.data.totalPages || 1
  } catch (error) {
    console.error('Erro ao buscar consultas:', error)
    consultas.value = []
  } finally {
    loading.value = false
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
    toast.success('Consulta cancelada com sucesso!')
    await buscarConsultas()
  } catch (error) {
    toast.error('Erro ao cancelar consulta: ' + getErrorMessage(error, 'Erro desconhecido'))
    console.error('Erro ao cancelar consulta:', error)
  } finally {
    loadingCancelarIds.value.delete(consultaId)
    consultaParaCancelar.value = null
  }
}


const getStatusColor = (status) => {
  if (status === 'Pendente') return 'orange'
  if (status === 'Marcado') return '#42A5F5'
  if (status === 'Concluido') return 'green'
  if (status === 'Recusado') return 'red'
  return 'grey'
}

const mudarPagina = (novaPagina) => {
  page.value = novaPagina
  buscarConsultas()
}

watch(filtro, () => {
  page.value = 1
})

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

.gradient-icon {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.statusColor {
  border-left: 4px solid var();
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.hover-card {
  transition: all 0.3s ease;
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

.gap-1 {
  gap: 4px;
}

.modal-confirmacao {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15) !important;
}

.gap-3 {
  gap: 12px;
}
</style>
