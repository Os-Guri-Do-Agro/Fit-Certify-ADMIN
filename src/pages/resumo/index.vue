<template>
  <div class="pa-0" fluid>
    <v-sheet
      color="blue-gradient"
      class="position-relative overflow-hidden"
      style="background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%); min-height: 200px; border-radius: 20px; box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);"
    >
      <v-sheet
        class="position-absolute w-100 h-100"
        style="background: rgba(0, 0, 0, 0.1)"
      ></v-sheet>
      <v-container class="position-relative">
        <v-row align="center" class="d-flex flex-md-column-reverse mt-5">
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

      <!-- Seção de Gráficos -->
      <v-row class="mt-6">
        <v-col cols="12">
          <h2 class="text-h5 font-weight-bold text-grey-darken-3 mb-4">Análise Gráfica</h2>
        </v-col>

        <v-col cols="12" md="6">
          <v-card
            class="pa-6"
            elevation="4"
            rounded="xl"
            height="400"
            hover
            :style="{
              borderLeft: '4px solid #2196F3',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
            }"
          >
            <div class="text-h6 font-weight-bold text-grey-darken-3 mb-4">
              Consultas por Período
            </div>
            <v-chart
              :option="lineChartOption"
              style="height: 300px;"
            />
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card
            class="pa-6"
            elevation="4"
            rounded="xl"
            height="400"
            hover
            :style="{
              borderLeft: '4px solid #FF5722',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
            }"
          >
            <div class="text-h6 font-weight-bold text-grey-darken-3 mb-4">
              Distribuição de Métricas
            </div>
            <v-chart
              :option="pieChartOption"
              style="height: 300px;"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>




  </div>
</template>

<script setup lang="ts">
import consultasService from '@/services/consultas/consultas-service'
import medicoService from '@/services/medico/medico-service'
import fisioterapeutaService from '@/services/fisioterapeutas/fisioterapeuta-service'
import { getRole } from '@/utils/auth'
import dayjs from 'dayjs'
import { onMounted, ref, computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const loading = ref(false)
const filtroTempo = ref('hoje')
const dataPersonalizada = ref('')
const consultas = ref([])
const consultasPendentes = ref([])
const userRole = ref(getRole())

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
    const service = userRole.value === 'medico' ? medicoService : fisioterapeutaService

    if (filtroTempo.value === 'hoje') {
      response = await service.getMetricsById(diaAtual)
      responseAnterior = await service.getMetricsById(diaAnterior)
    } else if (filtroTempo.value === 'mes') {
      response = await service.getMonthlyMetricsById(diaAtual)
      responseAnterior = await service.getMonthlyMetricsById(dayjs().subtract(1, 'month').format('YYYY-MM-DD') + 'T00:00:00.000Z')
    } else {
      if (!dataPersonalizada.value) {
        loading.value = false
        return
      }
      response = await service.getMetricsById(dataPersonalizada.value + 'T00:00:00.000Z')
      responseAnterior = await service.getMetricsById(dayjs(dataPersonalizada.value).subtract(1, 'day').format('YYYY-MM-DD') + 'T00:00:00.000Z')
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

    const resp = userRole.value === 'medico'
      ? await consultasService.findConsultasByMedico(dataInicio, dataFim)
      : await fisioterapeutaService.findConsultasByFisioterapeuta(dataInicio, dataFim)
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

const consultasPorMes = computed(() => {
  const meses = Array(12).fill(0)
  consultas.value.forEach((consulta: any) => {
    const mes = dayjs(consulta.dataConsulta).month()
    meses[mes]++
  })
  return meses
})

const lineChartOption = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    name: 'Consultas',
    type: 'line',
    data: consultasPorMes.value,
    smooth: true,
    lineStyle: {
      color: '#2196F3'
    },
    itemStyle: {
      color: '#2196F3'
    }
  }]
}))

const pieChartOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    bottom: '5%',
    left: 'center'
  },
  series: [{
    name: 'Métricas',
    type: 'pie',
    radius: ['40%', '70%'],
    center: ['50%', '45%'],
    data: [
      { value: metricas.value.certificadosEmitidos, name: 'Certificados', itemStyle: { color: '#2196F3' } },
      { value: metricas.value.pacientesAtendidos, name: 'Pacientes', itemStyle: { color: '#4CAF50' } },
      { value: metricas.value.consultasMarcadas, name: 'Consultas', itemStyle: { color: '#FF9800' } },
      { value: consultasPendentes.value.length, name: 'Pendentes', itemStyle: { color: '#F44336' } }
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
}))

onMounted(() => {
  buscarMetricas()
  buscarConsultas()
  buscarConsultasPendentes()
})
</script>
