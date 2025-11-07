<template>
  <div class="pa-0" fluid>
    <v-sheet
      color="blue-gradient"
      class="position-relative overflow-hidden"
      style="background: linear-gradient(135deg, #2196F3 0%, #00c6fe 100%); min-height: 200px"
    >
      <v-sheet
        class="position-absolute w-100 h-100"
        style="background: rgba(0, 0, 0, 0.1)"
      ></v-sheet>
      <v-container class="position-relative">
        <v-row align="center" class="d-flex flex-md-column-reverse">
          <v-col cols="12" md="4" class="text-center">
            <div>
              <v-avatar
                size="120"
                class="elevation-8"
                style="border: 4px solid rgba(255, 255, 255, 0.3)"
              >
                <v-icon size="50" color="white">mdi-chart-line</v-icon>
              </v-avatar>
            </div>
            <h1 class="text-h4 font-weight-bold text-white mt-4 mb-2" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)">
              Resumo
            </h1>
            <p class="text-body-1 text-white mb-5" style="opacity: 0.9; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1)">
              Visão geral das suas métricas
            </p>
          </v-col>
          <v-col cols="12">
            <div class="d-flex justify-center ma-5">
              <v-chip
                class="d-none d-md-flex"
                prepend-icon="mdi-account-circle"
                style="background: rgba(255, 255, 255, 0.15); color: white; border: 1px solid rgba(255, 255, 255, 0.3); backdrop-filter: blur(10px)"
              >
                Resumo Médico
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-container class="py-6">
      <v-row class="mb-4">
        <v-col cols="12">
          <v-card class="pa-4" variant="text" rounded="lg">
            <v-row class=" d-flex align-center justify-center">
              <v-col cols="12" md="4">
                <v-select
                  v-model="filtroTempo"
                  :items="opcoesTempoFiltro"
                  item-title="label"
                  item-value="value"
                  label="Período"
                  prepend-inner-icon="mdi-calendar"
                  variant="outlined"
                  density="compact"
                  @update:model-value="atualizarMetricas"
                ></v-select>
              </v-col>
              <v-col cols="12" md="4" v-if="filtroTempo === 'personalizado'">
                <v-text-field
                  v-model="dataPersonalizada"
                  type="date"
                  label="Data específica"
                  prepend-inner-icon="mdi-calendar-range"
                  variant="outlined"
                  density="compact"
                  @update:model-value="atualizarMetricas"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex align-center justify-center" cols="12">
                <div class="text-body-2 text-grey-darken-1">
                  <v-icon size="small" class="me-1">mdi-information</v-icon>
                  Período: {{ obterDescricaoPeriodo() }}
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-card
            class="pa-6"
            elevation="4"
            rounded="xl"
            height="100%"
            hover
            :style="{
              borderLeft: '4px solid #2196F3',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
            }"
          >
            <v-skeleton-loader v-if="loading" type="list-item-avatar-two-line"></v-skeleton-loader>
            <v-row v-else align="center" no-gutters>
              <v-col cols="auto" class="me-4 d-flex align-center justify-center">
                <v-avatar size="80" class="elevation-2" color="blue">
                  <v-icon size="40" color="white">mdi-certificate</v-icon>
                </v-avatar>
              </v-col>
              <v-col>
                <div class="text-h6 font-weight-bold text-grey-darken-3 mb-1">
                  Certificados Emitidos
                </div>
                <div class="text-h4 font-weight-bold text-blue">
                  {{ metricas.certificadosEmitidos }}
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card
            class="pa-6"
            elevation="4"
            rounded="xl"
            height="100%"
            hover
            :style="{
              borderLeft: '4px solid #4CAF50',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
            }"
          >
            <v-skeleton-loader v-if="loading" type="list-item-avatar-two-line"></v-skeleton-loader>
            <v-row v-else align="center" no-gutters>
              <v-col cols="auto" class="me-4 d-flex align-center justify-center">
                <v-avatar size="80" class="elevation-2" color="green">
                  <v-icon size="40" color="white">mdi-account-heart</v-icon>
                </v-avatar>
              </v-col>
              <v-col>
                <div class="text-h6 font-weight-bold text-grey-darken-3 mb-1">
                  Pacientes Atendidos
                </div>
                <div class="text-h4 font-weight-bold text-green">
                  {{ metricas.pacientesAtendidos }}
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card
            class="pa-6"
            elevation="4"
            rounded="xl"
            height="100%"
            hover
            :style="{
              borderLeft: '4px solid #FF9800',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
            }"
          >
            <v-skeleton-loader v-if="loading" type="list-item-avatar-two-line"></v-skeleton-loader>
            <v-row v-else align="center" no-gutters>
              <v-col cols="auto" class="me-4 d-flex align-center justify-center">
                <v-avatar size="80" class="elevation-2" color="orange">
                  <v-icon size="40" color="white">mdi-calendar-check</v-icon>
                </v-avatar>
              </v-col>
              <v-col>
                <div class="text-h6 font-weight-bold text-grey-darken-3 mb-1">
                  Consultas Marcadas
                </div>
                <div class="text-h4 font-weight-bold text-orange">
                  {{ metricas.consultasMarcadas }}
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card
            class="pa-6"
            elevation="4"
            rounded="xl"
            height="100%"
            hover
            :style="{
              borderLeft: '4px solid #9C27B0',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
            }"
          >
            <v-skeleton-loader v-if="loading" type="list-item-avatar-two-line"></v-skeleton-loader>
            <v-row v-else align="center" no-gutters>
              <v-col cols="auto" class="me-4 d-flex align-center justify-center">
                <v-avatar size="80" class="elevation-2" color="purple">
                  <v-icon size="40" color="white">mdi-stethoscope</v-icon>
                </v-avatar>
              </v-col>
              <v-col>
                <div class="text-h6 font-weight-bold text-grey-darken-3 mb-1">
                  Consultas Totais
                </div>
                <div class="text-h4 font-weight-bold text-purple">
                  {{ consultas.length }}
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card
            class="pa-6"
            elevation="4"
            rounded="xl"
            height="100%"
            hover
            :style="{
              borderLeft: '4px solid #F44336',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
            }"
          >
            <v-skeleton-loader v-if="loading" type="list-item-avatar-two-line"></v-skeleton-loader>
            <v-row v-else align="center" no-gutters>
              <v-col cols="auto" class="me-4 d-flex align-center justify-center">
                <v-avatar size="80" class="elevation-2" color="red">
                  <v-icon size="40" color="white">mdi-clock-alert</v-icon>
                </v-avatar>
              </v-col>
              <v-col>
                <div class="text-h6 font-weight-bold text-grey-darken-3 mb-1">
                  Consultas Pendentes
                </div>
                <div class="text-h4 font-weight-bold text-red">
                  {{ consultasPendentes.length }}
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>




  </div>
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
      if (!dataPersonalizada.value) {
        loading.value = false
        return
      }
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
    const inicioAno = dayjs().startOf('year')
    const fimAno = dayjs().endOf('year')
    
    const dataInicio = inicioAno.format('YYYY-MM-DD') + 'T00:00:00.000Z'
    const dataFim = fimAno.format('YYYY-MM-DD') + 'T23:59:59.999Z'

    const resp = await consultasService.findConsultasByMedico(dataInicio, dataFim)
    consultas.value = resp.data || []
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
