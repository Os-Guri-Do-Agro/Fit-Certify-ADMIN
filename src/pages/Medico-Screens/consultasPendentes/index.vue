<template>
  <v-container class="py-10">
    <v-row justify="center" class="text-center mb-8">
      <v-col cols="12">
        <h2 class="text-h5 text-md-h4 font-weight-bold text-orange-lighten-1">
          Consultas Pendentes
        </h2>
        <p class="text-body-1 text-grey mt-2">{{ consultasPendentes.length }} consultas aguardando aprovação</p>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <div v-if="loading">
          <v-row>
            <v-col v-for="n in 6" :key="n" cols="12" md="6" lg="4">
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
            <v-col v-for="consulta in consultasPendentes" :key="consulta.id" cols="12" md="6" lg="4">
              <v-card class="pa-5 hover-card d-flex flex-column" elevation="4" rounded="xl" :style="{ borderLeft: '4px solid orange' }">
                <v-row align="center" no-gutters class="flex-grow-1">
                  <v-col class="d-flex flex-column justify-center">
                    <div class="text-h6 font-weight-bold text-grey-darken-3 mb-1">
                      {{ consulta.consultaExterna ? consulta.nomePacienteExterno : consulta.atleta?.usuario?.nome }}
                    </div>
                    <div class="text-body-2 text-grey-darken-1 mb-2">
                      {{ consulta.consultaExterna ? 'Paciente Externo' : 'FitCertify365' }}
                    </div>

                    <div class="d-flex flex-column gap-1 mb-3">
                      <div class="text-body-2 text-grey-darken-2 d-flex align-center">
                        <v-icon size="16" class="me-2" color="blue">mdi-calendar</v-icon>
                        {{ formatarDataLocal(consulta.dataConsulta) }}
                      </div>
                      <div class="text-body-2 text-grey-darken-2 d-flex align-center">
                        <v-icon size="16" class="me-2" color="orange">mdi-clock-outline</v-icon>
                        {{ formatarHorarioLocal(consulta.dataConsulta) }}
                      </div>
                    </div>

                    <div class="d-flex align-center justify-space-between flex-wrap ga-2">
                      <v-chip color="orange" size="small" variant="flat" class="font-weight-medium text-white">
                        Pendente
                      </v-chip>
                      <div class="d-flex gap-2">
                        <v-btn color="green" variant="outlined" size="small" rounded="xl" prepend-icon="mdi-check" :loading="loadingAceitar === consulta.id" @click="aceitarConsulta(consulta.id)">
                          Aceitar
                        </v-btn>
                        <v-btn color="red" variant="outlined" size="small" rounded="xl" prepend-icon="mdi-close" :loading="loadingRecusar === consulta.id" @click="recusarConsulta(consulta.id)">
                          Recusar
                        </v-btn>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <div v-if="consultasPendentes.length === 0" class="text-center py-8">
            <v-icon size="64" color="grey-lighten-2">mdi-calendar-check</v-icon>
            <p class="text-h6 mt-4 text-grey">Nenhuma consulta pendente</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { formatarDataLocal, formatarHorarioLocal } from '@/utils/date.utils'
import consultasService from '@/services/consultas/consultas-service';
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/pt-br';
import { toast } from 'vue3-toastify'
import { getErrorMessage } from '@/common/error.utils'

dayjs.extend(utc);
dayjs.locale('pt-br');

const consultasPendentes = ref([])
const loading = ref(true)
const loadingAceitar = ref(null)
const loadingRecusar = ref(null)

onMounted(async () => {
  await buscarConsultasPendentes()
})

const buscarConsultasPendentes = async () => {
  loading.value = true
  try {
    const response = await consultasService.getConsultasPendentesByMedico()
    consultasPendentes.value = response.data
  } catch (error) {
    console.error('Erro ao buscar consultas pendentes:', error)
  } finally {
    loading.value = false
  }
}

const aceitarConsulta = async (consultaId) => {
  loadingAceitar.value = consultaId
  try {
    const data = {
      situacao: 'Marcado'
    }
    await consultasService.aceitarOrRejeitarConsultaById(consultaId, data)
    toast.success('Consulta aceita com sucesso!')
    await buscarConsultasPendentes()
  } catch (error) {
    console.error('Erro ao aceitar consulta:', error)
    toast.error('Erro ao aceitar consulta: ' + getErrorMessage(error, 'Erro desconhecido'))
  } finally {
    loadingAceitar.value = null
  }
}

const recusarConsulta = async (consultaId) => {
  loadingRecusar.value = consultaId
  try {
    const data = {
      situacao: 'Recusado'
    }
    await consultasService.aceitarOrRejeitarConsultaById(consultaId, data)
    toast.success('Consulta recusada com sucesso!')
    await buscarConsultasPendentes()
  } catch (error) {
    console.error('Erro ao recusar consulta:', error)
    toast.error('Erro ao recusar consulta: ' + getErrorMessage(error, 'Erro desconhecido'))
  } finally {
    loadingRecusar.value = null
  }
}
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

.flex-grow-1 {
  flex-grow: 1;
}
</style>
