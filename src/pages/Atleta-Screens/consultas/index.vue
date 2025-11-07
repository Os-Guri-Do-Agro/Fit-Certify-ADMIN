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
        <v-btn
          value="todas"
          color="green"
          :variant="filtro === 'todas' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium"
        >
          Todas as Consultas
        </v-btn>
        <v-btn
          value="marcado"
          color="blue"
          :variant="filtro === 'marcado' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium focus:text-white"
        >
          Marcadas
        </v-btn>
        <v-btn
          value="realizadas"
          color="green"
          :variant="filtro === 'realizadas' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium"
        >
          Realizadas
        </v-btn>
        <v-btn
          value="pendente"
          color="orange"
          :variant="filtro === 'pendente' ? 'flat' : 'outlined'"
          :class="[
            'px-8 text-body-1 font-weight-medium',
            { 'text-white': filtro === 'pendente' },
          ]"
        >
          Pendentes
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
                class="pa-6 hover-card"
                elevation="4"
                rounded="xl"
                height="100%"
                :style="{
                  borderLeft: `4px solid ${getStatusColor(consulta?.situacao)}`,
                  background:
                    'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                }"
              >
                <v-row  no-gutters>
                  <v-col cols="3" class="me-4 d-flex align-center justify-center">
                    <v-avatar size="120" class="elevation-2">
                      <v-img
                        v-if="consulta?.medico?.usuario?.avatarUrl"
                        :src="consulta?.medico?.usuario?.avatarUrl"
                        cover
                      ></v-img>
                      <v-icon v-else size="40" color="green">mdi-doctor</v-icon>
                    </v-avatar>
                  </v-col>

                  <v-col cols="8" class="d-flex flex-column align-center align-sm-start justify-center">
                    <div
                      class="text-h6 font-weight-bold text-grey-darken-3 mb-1"
                    >
                      Dr. {{ consulta?.medico?.usuario?.nome }}
                    </div>
                    <div
                      class="text-body-2 text-grey-darken-1 mb-3 d-flex align-center"
                    >
                      <v-icon size="16" class="me-1" color="green"
                        >mdi-stethoscope</v-icon
                      >
                      {{ consulta?.medico?.especializacao }}
                    </div>

                    <div class="d-flex flex-column gap-1 mb-3">
                      <div
                        class="text-body-2 text-grey-darken-2 d-flex align-center"
                      >
                        <v-icon size="16" class="me-2" color="blue"
                          >mdi-calendar</v-icon
                        >
                        {{ formatarData(consulta?.dataConsulta) }}
                      </div>
                      <div
                        class="text-body-2 text-grey-darken-2 d-flex align-center"
                      >
                        <v-icon size="16" class="me-2" color="orange"
                          >mdi-clock-outline</v-icon
                        >
                        {{ formatarHorario(consulta?.dataConsulta) }}
                      </div>
                    </div>

                    <div class="d-flex align-center justify-space-between w-100">
                                         <v-chip
                      :color="getStatusColor(consulta?.situacao)"
                      size="small"
                      variant="flat"
                      class="font-weight-medium text-white"
                    >
                      {{ consulta?.situacao }}
                    </v-chip> 
                    <v-btn :loading="loadingCancelarIds.has(consulta?.id)" @click="cancelarConsulta(consulta?.id)" v-if="consulta?.situacao === 'Marcado'" rounded="xl" color="red" variant="outlined" size="small">
                      <v-icon>mdi-cancel</v-icon>
                      Cancelar
                    </v-btn>
                    </div>


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
import consultasService from '@/services/consultas/consultas-service'
import { getAtletaId } from '@/utils/auth'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { computed, onMounted, ref, watch } from 'vue'
import { toast } from 'vue3-toastify'
dayjs.locale('pt-br')

const filtro = ref('todas')
const page = ref(1)
const pageSize = ref(10)
const totalPages = ref(0)
const loading = ref(true)
const consultas = ref([])
const loadingCancelarIds = ref(new Set())

const consultasFiltradas = computed(() => {
  if (filtro.value === 'todas') return consultas.value
  if (filtro.value === 'marcado')
    return consultas.value.filter((c) => c.situacao === 'Marcado')
  if (filtro.value === 'pendente')
    return consultas.value.filter((c) => c.situacao === 'Pendente')
  if (filtro.value === 'realizadas')
    return consultas.value.filter((c) => c.situacao === 'Concluido')
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

const cancelarConsulta = async (consultaId) => {
  loadingCancelarIds.value.add(consultaId)
  try {
    const data = {
      situacao: 'Cancelada'
    }
    await consultasService.aceitarOrRejeitarConsultaById(consultaId, data)
    toast.success('Consulta cancelada com sucesso!')
    await buscarConsultas()
  } catch (error) {
    toast.error('Erro ao cancelar consulta!')
    console.error('Erro ao cancelar consulta:', error)
  } finally {
    loadingCancelarIds.value.delete(consultaId)
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
  if (status === 'Marcado') return '#00C6FE'
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

.gap-1 {
  gap: 4px;
}
</style>
