<template>
  <v-container class="py-10">
    <v-row justify="center" class="text-center mb-8">
      <v-col cols="12">
        <h2 class="text-h5 text-md-h4 font-weight-bold" style="color: green">
          Minhas Consultas
        </h2>
      </v-col>
    </v-row>

    <v-row justify="center" class="mb-10">
      <v-btn-toggle v-model="filtro" rounded="pill" group mandatory>
        <v-btn value="todas" color="green" :variant="filtro === 'todas' ? 'flat' : 'outlined'" class="px-8 text-body-1 font-weight-medium">
          Todas as Consultas
        </v-btn>
        <v-btn value="marcado" color="green" :variant="filtro === 'marcado' ? 'flat' : 'outlined'" class="px-8 text-body-1 font-weight-medium">
          Marcadas
        </v-btn>
        <v-btn value="realizadas" color="green" :variant="filtro === 'realizadas' ? 'flat' : 'outlined'" class="px-8 text-body-1 font-weight-medium">
          Realizadas
        </v-btn>
      </v-btn-toggle>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8">
        <div v-if="loading">
          <v-skeleton-loader v-for="n in 3" :key="n" class="mb-6 pa-5" type="list-item-avatar-three-line" elevation="2"
            rounded="xl" height="140" />
        </div>

        <div v-else>
          <v-row>
            <v-col v-for="(consulta, index) in consultasFiltradas" :key="index" cols="12" md="6">
              <v-card class="mb-6 pa-5" elevation="2" rounded="xl" height="100%">
                <v-row align="center">
                  <v-col cols="auto" class="text-center">
                    <v-avatar size="90" color="grey-lighten-3">
                      <v-img v-if="consulta?.medico?.usuario?.avatarUrl" :src="consulta?.medico?.usuario?.avatarUrl" cover></v-img>
                      <v-icon v-else size="50" color="grey-darken-1">mdi-account</v-icon>
                    </v-avatar>
                  </v-col>

                  <v-col>
                    <div class="text-subtitle-1 font-weight-bold" style="color: black">
                      Dr. {{ consulta?.medico?.usuario?.nome }}
                    </div>
                    <div class="text-body-2" style="color: black">
                      {{ consulta?.medico?.especializacao }}
                    </div>
                    <div class="text-body-2" style="color: black">
                      Data: {{ formatarData(consulta?.dataConsulta) }}
                    </div>
                    <div class="text-body-2" style="color: black">
                      Horário: {{ formatarHorario(consulta?.dataConsulta) }}
                    </div>

                    <v-chip
                      :color="getStatusColor(consulta?.situacao)"
                      size="small"
                      class="mt-2"
                    >
                      {{ consulta?.situacao }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <div v-if="consultasFiltradas.length === 0" class="text-center py-8">
            <v-icon size="64" color="grey-lighten-2">mdi-calendar-blank</v-icon>
            <p class="text-h6 mt-4 text-grey">Nenhuma consulta encontrada</p>
          </div>

          <!-- Paginação -->
          <!-- <v-row v-if="!loading && totalPages > 1" justify="center" class="mt-4">
            <v-pagination v-model="page" :length="totalPages" active-color="green" total-visible="4" size="small"
              @update:model-value="mudarPagina" />
          </v-row> -->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import consultasService from '@/services/consultas/consultas-service'
import { getAtletaId } from '@/utils/auth'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

const filtro = ref('todas')
const page = ref(1)
const pageSize = ref(10)
const totalPages = ref(0)
const loading = ref(true)
const consultas = ref([])

const consultasFiltradas = computed(() => {
  if (filtro.value === 'todas') return consultas.value
  if (filtro.value === 'marcado') return consultas.value.filter(c => ['Pendente', 'Marcado'].includes(c.situacao))
  if (filtro.value === 'realizadas') return consultas.value.filter(c => c.situacao === 'Concluido')
  return consultas.value
})

const buscarConsultas = async () => {
  try {
    loading.value = true
    const response = await consultasService.getConsultasByAtletaId(getAtletaId())
    consultas.value = response.data.itens || response.data
    totalPages.value = response.data.totalPages || 1
  } catch (error) {
    console.error('Erro ao buscar consultas:', error)
    consultas.value = []
  } finally {
    loading.value = false
  }
}

const formatarData = (data) => {
  return dayjs(data).format('DD/MM/YYYY')
}

const formatarHorario = (data) => {
  return dayjs(data).format('HH:mm')
}

const getStatusColor = (status) => {
  if (status === 'Pendente') return 'orange'
  if (status === 'Marcado') return 'blue'
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
