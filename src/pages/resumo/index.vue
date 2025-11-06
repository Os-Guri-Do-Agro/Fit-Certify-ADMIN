<template>
  <v-container fluid class="pa-6">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="position-relative">
        <v-row align="center" class="min-height-300">
          <v-col cols="12" md="6">
            <div class="text-center text-md-left">
              <h1 class="profile-name mb-3">Resumo Médico</h1>
              <p class="profile-subtitle mb-4">Acompanhe suas métricas e atividades em tempo real</p>
              <div class="d-flex flex-column flex-md-row gap-3 justify-center justify-md-start">
                <v-chip class="info-chip" prepend-icon="mdi-chart-line">
                  Análise em Tempo Real
                </v-chip>
                <v-chip class="info-chip" prepend-icon="mdi-shield-check">
                  Sistema Ativo
                </v-chip>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="control-card" elevation="8" rounded="xl">
              <v-card-text class="pa-4">
                <div class="d-flex flex-column gap-3">
                  <v-select
                    v-model="filtroTempo"
                    :items="opcoesTempoFiltro"
                    item-title="label"
                    item-value="value"
                    label="Período de Análise"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    @update:model-value="atualizarMetricas"
                    prepend-inner-icon="mdi-calendar"
                    color="#00c6fe"
                  ></v-select>

                  <v-text-field
                  class="mt-5"
                    v-if="filtroTempo === 'personalizado'"
                    v-model="dataPersonalizada"
                    type="date"
                    label="Data específica"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    @change="atualizarMetricas"
                    color="#00c6fe"
                  ></v-text-field>

                  <v-btn
                    color="#00c6fe"
                    variant="flat"
                    @click="atualizarMetricas"
                    :loading="loading"
                    prepend-icon="mdi-refresh"
                    size="large"
                    rounded="xl"
                    class="font-weight-bold text-white mt-5"
                    block
                  >
                    Atualizar Dados
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="content-section">
      <v-row class="mb-6">
      <v-col cols="12" md="4">
        <v-card
          elevation="3"
          :loading="loading"
          class="h-100 position-relative overflow-hidden"
          rounded="xl"
        >
          <div class="bg-success position-absolute" style="top: 0; left: 0; right: 0; height: 4px;"></div>
          <v-card-title class="d-flex align-center pb-3 pt-6">
            <v-avatar color="success" variant="tonal" size="48" class="mr-4">
              <v-icon size="24">mdi-certificate</v-icon>
            </v-avatar>
            <div>
              <div class="text-h6 font-weight-bold">Certificados Emitidos</div>
              <div class="text-caption text-grey-darken-1">{{ obterDescricaoPeriodo() }}</div>
            </div>
          </v-card-title>
          <v-card-text class="pt-0">
            <div class="text-center mb-4">
              <h2 class="text-h1 font-weight-bold text-success mb-2">
                {{ metricas.certificadosEmitidos }}
              </h2>
            </div>
            <v-divider class="mb-4"></v-divider>
            <div class="d-flex align-center justify-space-between">
              <div class="text-body-2 text-grey-darken-1">Comparado ao período anterior</div>
              <v-chip
                :color="calcularVariacao('certificadosEmitidos') >= 0 ? 'success' : 'error'"
                variant="tonal"
                size="small"
                :prepend-icon="calcularVariacao('certificadosEmitidos') >= 0 ? 'mdi-trending-up' : 'mdi-trending-down'"
              >
                {{ calcularVariacao('certificadosEmitidos') >= 0 ? '+' : '' }}{{ calcularVariacao('certificadosEmitidos') }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          elevation="3"
          :loading="loading"
          class="h-100 position-relative overflow-hidden"
          rounded="xl"
        >
          <div class="bg-primary position-absolute" style="top: 0; left: 0; right: 0; height: 4px;"></div>
          <v-card-title class="d-flex align-center pb-3 pt-6">
            <v-avatar color="primary" variant="tonal" size="48" class="mr-4">
              <v-icon size="24">mdi-calendar-check</v-icon>
            </v-avatar>
            <div>
              <div class="text-h6 font-weight-bold">Consultas Marcadas</div>
              <div class="text-caption text-grey-darken-1">{{ obterDescricaoPeriodo() }}</div>
            </div>
          </v-card-title>
          <v-card-text class="pt-0">
            <div class="text-center mb-4">
              <h2 class="text-h1 font-weight-bold text-primary mb-2">
                {{ metricas.consultasMarcadas }}
              </h2>
            </div>
            <v-divider class="mb-4"></v-divider>
            <div class="d-flex align-center justify-space-between">
              <div class="text-body-2 text-grey-darken-1">Comparado ao período anterior</div>
              <v-chip
                :color="calcularVariacao('consultasMarcadas') >= 0 ? 'success' : 'error'"
                variant="tonal"
                size="small"
                :prepend-icon="calcularVariacao('consultasMarcadas') >= 0 ? 'mdi-trending-up' : 'mdi-trending-down'"
              >
                {{ calcularVariacao('consultasMarcadas') >= 0 ? '+' : '' }}{{ calcularVariacao('consultasMarcadas') }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          elevation="3"
          :loading="loading"
          class="h-100 position-relative overflow-hidden"
          rounded="xl"
        >
          <div class="bg-info position-absolute" style="top: 0; left: 0; right: 0; height: 4px;"></div>
          <v-card-title class="d-flex align-center pb-3 pt-6">
            <v-avatar color="info" variant="tonal" size="48" class="mr-4">
              <v-icon size="24">mdi-account-heart</v-icon>
            </v-avatar>
            <div>
              <div class="text-h6 font-weight-bold">Pacientes Atendidos</div>
              <div class="text-caption text-grey-darken-1">{{ obterDescricaoPeriodo() }}</div>
            </div>
          </v-card-title>
          <v-card-text class="pt-0">
            <div class="text-center mb-4">
              <h2 class="text-h1 font-weight-bold text-info mb-2">
                {{ metricas.pacientesAtendidos }}
              </h2>
            </div>
            <v-divider class="mb-4"></v-divider>
            <div class="d-flex align-center justify-space-between">
              <div class="text-body-2 text-grey-darken-1">Comparado ao período anterior</div>
              <v-chip
                :color="calcularVariacao('pacientesAtendidos') >= 0 ? 'success' : 'error'"
                variant="tonal"
                size="small"
                :prepend-icon="calcularVariacao('pacientesAtendidos') >= 0 ? 'mdi-trending-up' : 'mdi-trending-down'"
              >
                {{ calcularVariacao('pacientesAtendidos') >= 0 ? '+' : '' }}{{ calcularVariacao('pacientesAtendidos') }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      </v-row>

      <!-- Secondary Metrics -->
      <v-row>
      <v-col cols="12" md="6">
        <v-card
          elevation="3"
          :loading="loading"
          class="h-100 position-relative overflow-hidden"
          rounded="xl"
        >
          <div class="bg-teal position-absolute" style="top: 0; left: 0; right: 0; height: 4px;"></div>
          <v-card-title class="d-flex align-center pb-3 pt-6">
            <v-avatar color="teal" variant="tonal" size="48" class="mr-4">
              <v-icon size="24">mdi-calendar-multiple</v-icon>
            </v-avatar>
            <div>
              <div class="text-h6 font-weight-bold">Consultas Totais</div>
              <div class="text-caption text-grey-darken-1">Histórico completo</div>
            </div>
          </v-card-title>
          <v-card-text class="pt-0">
            <div class="text-center">
              <h2 class="text-h1 font-weight-bold text-teal">
                {{ consultas?.length || 0 }}
              </h2>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card
          elevation="3"
          :loading="loading"
          class="h-100 position-relative overflow-hidden"
          rounded="xl"
        >
          <div class="bg-orange position-absolute" style="top: 0; left: 0; right: 0; height: 4px;"></div>
          <v-card-title class="d-flex align-center pb-3 pt-6">
            <v-avatar color="orange" variant="tonal" size="48" class="mr-4">
              <v-icon size="24">mdi-clock-outline</v-icon>
            </v-avatar>
            <div>
              <div class="text-h6 font-weight-bold">Consultas Pendentes</div>
              <div class="text-caption text-grey-darken-1">Aguardando atendimento</div>
            </div>
          </v-card-title>
          <v-card-text class="pt-0">
            <div class="text-center">
              <h2 class="text-h1 font-weight-bold text-orange">
                {{ consultasPendentes?.length || 0 }}
              </h2>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import consultasService from '@/services/consultas/consultas-service'
import medicoService from '@/services/medico/medico-service'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'

const loading = ref(false)
const filtroTempo = ref('hoje')
const dataPersonalizada = ref('')
const consultas = ref([])
const consultasPendentes = ref([])

const opcoesTempoFiltro = [
  { label: 'Hoje', value: 'hoje' },
  { label: 'Este mês', value: 'mes' },
  { label: 'Data específica', value: 'personalizado' }
]

const metricas = ref({
  certificadosEmitidos: 0,
  pacientesAtendidos: 0,
  consultasMarcadas: 0
})

const metricasAnterior = ref({
  certificadosEmitidos: 0,
  pacientesAtendidos: 0,
  consultasMarcadas: 0
})

const obterDescricaoPeriodo = () => {
  const opcoes: Record<string, string> = {
    'hoje': 'Hoje',
    'mes': 'Este mês',
    'personalizado': dataPersonalizada.value ? new Date(dataPersonalizada.value).toLocaleDateString('pt-BR') : 'Data específica'
  }
  return opcoes[filtroTempo.value] || 'Período selecionado'
}

const calcularVariacao = (metrica: string) => {
  const atual = metricas.value[metrica as keyof typeof metricas.value]
  const anterior = metricasAnterior.value[metrica as keyof typeof metricasAnterior.value]
  return atual - anterior
}

const buscarMetricas = async () => {
  loading.value = true

  try {
    const diaAtual = dayjs().format('YYYY-MM-DD') + 'T00:00:00.000Z'
    const diaAnterior = dayjs().subtract(1, 'day').format('YYYY-MM-DD') + 'T00:00:00.000Z'

    let response, responseAnterior

    if (filtroTempo.value === 'hoje') {
      response = await medicoService.getMetricsById(diaAtual)
      responseAnterior = await medicoService.getMetricsById(diaAnterior)
    } else if (filtroTempo.value === 'mes') {
      response = await medicoService.getMonthlyMetricsById(diaAtual)
      responseAnterior = await medicoService.getMonthlyMetricsById(dayjs().subtract(1, 'month').format('YYYY-MM-DD') + 'T00:00:00.000Z')
    } else {
      response = await medicoService.getMetricsById(dataPersonalizada.value + 'T00:00:00.000Z')
      responseAnterior = await medicoService.getMetricsById(dayjs(dataPersonalizada.value).subtract(1, 'day').format('YYYY-MM-DD') + 'T00:00:00.000Z')
    }

    metricas.value = {
      certificadosEmitidos: response.data?.certificadosEmitidos ?? 0,
      consultasMarcadas: response.data?.consultasMarcadas ?? 0,
      pacientesAtendidos: response.data?.pacientesAtendidos ?? 0,
    }

    metricasAnterior.value = {
      certificadosEmitidos: responseAnterior.data?.certificadosEmitidos ?? 0,
      consultasMarcadas: responseAnterior.data?.consultasMarcadas ?? 0,
      pacientesAtendidos: responseAnterior.data?.pacientesAtendidos ?? 0,
    }

  } catch (error) {
    console.error('Erro ao buscar métricas:', error)
  } finally {
    loading.value = false
  }
}

const atualizarMetricas = () => {
  buscarMetricas()
}

const buscarConsultas = async () => {
  try {
    const dataInicio = dayjs().startOf('year').format('YYYY-MM-DD') + 'T00:00:00.000Z'
    const dataFim = dayjs().endOf('year').format('YYYY-MM-DD') + 'T23:59:59.999Z'

    const resp = await consultasService.findConsultasByMedico(dataInicio, dataFim)
    consultas.value = resp.data || []
    console.log(consultas.value)
  } catch (error) {
    console.error('Erro ao buscar consultas', error)
  }
}

const buscarConsultasPendentes = async () => {
  try {
    const response = await consultasService.getConsultasPendentesByMedico()
    consultasPendentes.value = response.data || []
  } catch (error) {
    console.error('Erro ao buscar consultas pendentes:', error)
  }
}

onMounted(() => {
  buscarMetricas()
  buscarConsultas()
  buscarConsultasPendentes()
})
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #2196F3 0%, #00c6fe 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem 1.5rem;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}

.min-height-300 {
  min-height: 300px;
}

.profile-name {
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.profile-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  font-weight: 400;
}

.info-chip {
  background: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
}

.control-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.content-section {
  background: #f8f9fa;
  padding: 3rem 1.5rem;
}

.metrics-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 198, 254, 0.1);
}

.metrics-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 198, 254, 0.15) !important;
}

@media (max-width: 960px) {
  .profile-name {
    font-size: 2rem;
  }

  .profile-subtitle {
    font-size: 1rem;
  }

  .hero-section {
    padding: 1.5rem 1rem;
  }

  .content-section {
    padding: 2rem 1rem;
  }
}
</style>
