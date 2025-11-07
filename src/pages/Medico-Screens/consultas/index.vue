<template>
  <v-container class="py-10">
    <v-row justify="center" class="text-center mb-8">
      <v-col cols="12">
        <h2 class="text-h5 text-md-h4 font-weight-bold text-blue-lighten-1" >
          Minhas Consultas
        </h2>
      </v-col>
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
              >
                <v-row align="center" no-gutters class="flex-grow-1">
                  <v-col cols="auto" class="me-4 d-flex align-center justify-center">
                    <v-avatar size="100" class="elevation-2">
                      <v-img
                        v-if="consulta?.atleta?.avatarUrl"
                        :src="consulta?.atleta?.avatarUrl"
                        cover
                      ></v-img>
                      <v-icon v-else size="40" color="green">mdi-account</v-icon>
                    </v-avatar>
                  </v-col>

                  <v-col class="d-flex flex-column justify-center">
                    <div
                      class="text-h6 font-weight-bold text-grey-darken-3 mb-1"
                    >
                      {{ consulta?.atleta?.usuario?.nome || 'Paciente Externo' }}
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

                    <div class="d-flex align-center justify-space-between flex-wrap ga-2">
                      <v-chip
                        :color="getStatusColor(consulta?.situacao)"
                        size="small"
                        variant="flat"
                        class="font-weight-medium text-white"
                      >
                        {{ consulta?.situacao }}
                      </v-chip>
                      <v-btn
                        color="red"
                        variant="outlined"
                        size="small"
                        rounded="xl"
                        :loading="loadingCancelarIds.has(consulta.id)"
                        prepend-icon="mdi-close"
                        @click="cancelarConsulta(consulta.id)"
                      >
                        Cancelar
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <div v-if="consultas.length === 0" class="text-center py-8">
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
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { ref, computed, onMounted } from 'vue'
import { toast } from 'vue3-toastify'

dayjs.locale('pt-br')

const loading = ref(true)
const consultas = ref([])
const loadingCancelarIds = ref(new Set())

const buscarConsultas = async () => {
  loading.value = true
  try {
    const inicioAno = dayjs().startOf('year')
    const fimAno = dayjs().endOf('year')
    
    const dataInicio = inicioAno.format('YYYY-MM-DD') + 'T00:00:00.000Z'
    const dataFim = fimAno.format('YYYY-MM-DD') + 'T23:59:59.999Z'

    const resp = await consultasService.findConsultasByMedico(dataInicio, dataFim)

    if (Array.isArray(resp.data) && resp.data.length > 0 && resp.data[0].consultas) {
      consultas.value = resp.data.flatMap(item => item.consultas || []).filter(c => c.situacao === 'Marcado')
    } else {
      consultas.value = (resp.data || []).filter(c => c.situacao === 'Marcado')
    }
  } catch (error) {
    console.error('Erro ao buscar consultas', error)
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
  const cores = {
    'Marcado': '#42A5F5',
    'Concluido': 'green',
    'Pendente': 'orange',
    'Recusado': 'red',
    'Cancelada': 'red'
  }
  return cores[status] || 'grey'
}

const cancelarConsulta = async (consultaId) => {
  loadingCancelarIds.value.add(consultaId)
  try {
    const data = {
      situacao: 'Cancelada'
    }
    await consultasService.aceitarOrRejeitarConsultaById(consultaId, data)
    await buscarConsultas()
    toast.success('Consulta cancelada com sucesso!')
  } catch (error) {
    toast.error('Erro ao cancelar consulta!')
    console.error('Erro ao cancelar consulta:', error)
  } finally {
    loadingCancelarIds.value.delete(consultaId)
  }
}

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

.flex-grow-1 {
  flex-grow: 1;
}
</style>
