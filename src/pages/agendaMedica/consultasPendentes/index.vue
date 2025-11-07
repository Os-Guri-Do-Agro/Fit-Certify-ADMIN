<template>
  <div class="consultas-pendentes-container">
    <v-card class="mb-6 mx-4 mt-4" elevation="2" rounded="lg">
      <v-card-title class="bg-warning text-white pa-6">
        <div class="d-flex align-center">
          <v-icon size="32" class="mr-3">mdi-clock-alert-outline</v-icon>
          <div>
            <h1 class="text-h4 font-weight-bold mb-1">Consultas Pendentes</h1>
            <p class="text-subtitle-1 mb-0 opacity-90">{{ consultasPendentes.length }} consultas aguardando aprovação
            </p>
          </div>
        </div>
      </v-card-title>
    </v-card>

    <div class="mx-4">
      <v-card elevation="2" rounded="lg">
        <v-list>
          <!-- Skeleton Loading -->
          <template v-if="loading">
            <v-list-item v-for="n in 3" :key="n">
              <template v-slot:prepend>
                <v-skeleton-loader type="avatar"></v-skeleton-loader>
              </template>
              <v-list-item-title>
                <v-skeleton-loader type="text"></v-skeleton-loader>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-skeleton-loader type="text@2"></v-skeleton-loader>
              </v-list-item-subtitle>
              <template v-slot:append>
                <v-skeleton-loader type="button, button"></v-skeleton-loader>
              </template>
            </v-list-item>
          </template>

          <!-- Consultas List -->
          <template v-else>
            <v-list-item v-for="consulta in consultasPendentes" :key="consulta.id" class="py-3">
              <template v-slot:prepend>
                <v-avatar size="48" :color="consulta.consultaExterna ? 'orange' : 'blue'">
                  <v-icon color="white">{{ consulta.consultaExterna ? 'mdi-account' : 'mdi-dumbbell' }}</v-icon>
                </v-avatar>
              </template>

              <v-list-item-title class="font-weight-bold">
                {{ consulta.consultaExterna ? consulta.nomePacienteExterno : consulta.atleta.usuario.nome }}
              </v-list-item-title>

              <v-list-item-subtitle>
                <div class="d-flex align-center mt-1">
                  <v-chip size="x-small" :color="consulta.consultaExterna ? 'orange' : 'blue'" variant="outlined"
                    class="mr-2">
                    {{ consulta.consultaExterna ? 'Externo' : 'FitCertify365' }}
                  </v-chip>
                  <span>{{ dayjs(consulta.dataConsulta).utc().format('DD/MM/YYYY - HH:mm') }}</span>
                </div>
              </v-list-item-subtitle>

              <template v-slot:append>
                <div class="gap-4 ">
                  <v-btn 
                    color="green" 
                    variant="flat" 
                    size="small" 
                    class="mr-2" 
                    :loading="loadingAceitar === consulta.id"
                    :disabled="loadingAceitar === consulta.id || loadingRecusar === consulta.id"
                    @click="aceitarConsulta(consulta.id)"
                  >
                    <v-icon class="mr-1">mdi-check</v-icon>
                    Aceitar
                  </v-btn>
                  <v-btn 
                    color="red" 
                    variant="flat" 
                    size="small" 
                    :loading="loadingRecusar === consulta.id"
                    :disabled="loadingAceitar === consulta.id || loadingRecusar === consulta.id"
                    @click="recusarConsulta(consulta.id)"
                  >
                    <v-icon class="mr-1">mdi-close</v-icon>
                    Recusar
                  </v-btn>
                </div>
              </template>
            </v-list-item>
          </template>
        </v-list>

        <div v-if="!loading && consultasPendentes.length === 0" class="text-center py-8">
          <v-icon size="64" color="grey-lighten-2">mdi-calendar-check</v-icon>
          <h3 class="text-h5 mt-4 mb-2 text-grey">Nenhuma consulta pendente</h3>
          <p class="text-body-1 text-grey">Todas as consultas estão aprovadas!</p>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import consultasService from '@/services/consultas/consultas-service';
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/pt-br';
import { toast } from 'vue3-toastify'

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
    toast.error('Erro ao aceitar consulta')
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
    toast.error('Erro ao recusar consulta')
  } finally {
    loadingRecusar.value = null
  }
}
</script>

<style scoped>
.consultas-pendentes-container {
  padding: 0;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.consultation-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.consultation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}
</style>
