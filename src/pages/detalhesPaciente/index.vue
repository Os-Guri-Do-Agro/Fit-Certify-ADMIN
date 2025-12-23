<template>
  <div class="w-100 h-100 ma-0">
    <v-container class="py-6">
      <v-row v-if="loading">
        <v-col cols="12">
          <v-skeleton-loader type="card" height="500" />
        </v-col>
        <v-col cols="12">
          <v-skeleton-loader type="card" height="300" />
        </v-col>
      </v-row>

      <template v-else-if="paciente">
        <v-row>
          <v-col cols="12">
            <v-card
              class="info-card"
              elevation="4"
              rounded="xl"
              :style="{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
              }"
            >
              <div
                class="text-center pa-5 mb-5 position-relative"
                style="background: linear-gradient(135deg, #2196F3 0%, #00c6fe 100%); border-radius: 12px 12px 0 0;"
              >
                <v-btn
                  icon="mdi-arrow-left"
                  color="white"
                  variant="outlined"
                  class="btn-top-left"
                  @click="voltarParaLista"
                />
                <v-btn
                  color="white"
                  variant="outlined"
                  rounded="xl"
                  prepend-icon="mdi-dumbbell"
                  class="btn-top-right"
                >
                  Criar Treino
                </v-btn>
                <v-avatar
                  size="160"
                  class="elevation-3 mb-3"
                  style="background: linear-gradient(135deg, #2196F3 0%, #00c6fe 100%); border: 4px solid rgba(255, 255, 255, 0.3);"
                >
                  <v-img
                    v-if="paciente.usuario?.avatarUrl"
                    :src="paciente.usuario.avatarUrl"
                    :alt="paciente.usuario?.nome"
                    cover
                  />
                  <v-icon v-else size="80" color="white">mdi-account-circle</v-icon>
                </v-avatar>
                <div class="text-h6 font-weight-bold text-white mb-1">
                  {{ paciente.usuario?.nome || 'N/A' }}
                </div>
                <div class="text-body-2 text-white mb-3" style="opacity: 0.9;">
                  {{ paciente.usuario?.email || 'N/A' }}
                </div>
              </div>

              <div class="pa-5">
              <v-row>
                <v-col cols="12" md="4">
                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-1">Idade</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ calcularIdade(paciente.dataNascimento) }} anos
                    </div>
                  </div>

                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-1">Data de Nascimento</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ formatarData(paciente.dataNascimento) }}
                    </div>
                  </div>

                  <div>
                    <div class="text-caption text-grey-darken-1 mb-1">Gênero</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ paciente.genero || 'N/A' }}
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="4">
                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-1">Altura</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ paciente.altura ? `${paciente.altura} cm` : 'N/A' }}
                    </div>
                  </div>

                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-1">Peso</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ paciente.peso ? `${paciente.peso} kg` : 'N/A' }}
                    </div>
                  </div>

                  <div>
                    <div class="text-caption text-grey-darken-1 mb-1">Tipo Sanguíneo</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ paciente.tipoSanguineo || 'N/A' }}
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="4">
                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-1">Telefone</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ formatarTelefone(paciente.telefone) || 'N/A' }}
                    </div>
                  </div>

                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-1">Atividade Física Regular</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ paciente.praticaAtividadeFisicaRegularmente ? 'Sim' : 'Não' }}
                    </div>
                  </div>

                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-1">Checkup Recente</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ paciente.fezCheckupUltimosMeses ? 'Sim' : 'Não' }}
                    </div>
                  </div>

                  <div>
                    <div class="text-caption text-grey-darken-1 mb-1">Possui Smartwatch</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ paciente.possuiSmartwatch ? 'Sim' : 'Não' }}
                    </div>
                  </div>
                </v-col>
              </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12">
            <v-card
              class="expandable-card"
              elevation="4"
              rounded="xl"
              :style="{
                borderLeft: '4px solid #1E88E5',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
              }"
            >
              <div
                class="pa-6 cursor-pointer d-flex align-center"
                @click="toggleAlergias"
              >
                <v-avatar size="60" class="elevation-2 me-4" color="blue-darken-1">
                  <v-icon size="30" color="white">mdi-alert-circle-outline</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="text-h6 font-weight-bold text-grey-darken-3">
                    Alergias
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    {{ alergias.length }} {{ alergias.length === 1 ? 'alergia registrada' : 'alergias registradas' }}
                  </div>
                </div>
                <v-icon :color="alergiasExpanded ? 'blue-darken-1' : 'grey'">
                  {{ alergiasExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </div>

              <v-expand-transition>
                <div v-if="alergiasExpanded">
                  <v-divider />
                  <v-list class="pa-0 scrollable-content">
                    <template v-if="loadingAlergias">
                      <v-list-item v-for="n in 3" :key="n" class="px-6 py-3">
                        <v-skeleton-loader type="list-item-avatar-two-line" />
                      </v-list-item>
                    </template>
                    <template v-else-if="alergias.length === 0">
                      <v-list-item class="text-center py-8">
                        <v-list-item-title class="text-grey">
                          Nenhuma alergia registrada
                        </v-list-item-title>
                      </v-list-item>
                    </template>
                    <template v-else>
                      <v-list-item
                        v-for="(alergia, index) in alergias"
                        :key="index"
                        class="px-6 py-3"
                      >
                        <template #prepend>
                          <v-avatar size="40" color="red-darken-1" class="me-3">
                            <v-icon color="white" size="20">mdi-alert-circle</v-icon>
                          </v-avatar>
                        </template>

                        <v-list-item-title class="font-weight-medium text-grey-darken-3 mb-1">
                          {{ alergia.titulo || 'Alergia sem título' }}
                        </v-list-item-title>

                        <v-list-item-subtitle class="text-grey-darken-1">
                          {{ alergia.descricao || 'Sem descrição' }}
                        </v-list-item-subtitle>

                        <template #append>
                          <v-chip size="small" variant="outlined">
                            {{ formatarDataLocal(alergia.createdAt) }}
                          </v-chip>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12">
            <v-card
              class="expandable-card"
              elevation="4"
              rounded="xl"
              :style="{
                borderLeft: '4px solid #4CAF50',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
              }"
            >
              <div
                class="pa-6 cursor-pointer d-flex align-center"
                @click="toggleConsultas"
              >
                <v-avatar size="60" class="elevation-2 me-4" color="green-darken-1">
                  <v-icon size="30" color="white">mdi-stethoscope</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="text-h6 font-weight-bold text-grey-darken-3">
                    Consultas Concluídas
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    {{ consultasConcluidas.length }} {{ consultasConcluidas.length === 1 ? 'consulta concluída' : 'consultas concluídas' }}
                  </div>
                </div>
                <v-icon :color="consultasExpanded ? 'green-darken-1' : 'grey'">
                  {{ consultasExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </div>

              <v-expand-transition>
                <div v-if="consultasExpanded">
                  <v-divider />
                  <v-list class="pa-0 scrollable-content">
                    <template v-if="loadingConsultas">
                      <v-list-item v-for="n in 3" :key="n" class="px-6 py-3">
                        <v-skeleton-loader type="list-item-avatar-two-line" />
                      </v-list-item>
                    </template>
                    <template v-else-if="consultasConcluidas.length === 0">
                      <v-list-item class="text-center py-8">
                        <v-list-item-title class="text-grey">
                          Nenhuma consulta concluída
                        </v-list-item-title>
                      </v-list-item>
                    </template>
                    <template v-else>
                      <v-list-item
                        v-for="consulta in consultasConcluidas"
                        :key="consulta.id"
                        class="px-6 py-3 list-item-hover"
                        @click="abrirDetalhesConsulta(consulta)"
                      >
                        <template #prepend>
                          <v-avatar size="40" color="green-darken-1" class="me-3">
                            <v-icon color="white" size="20">mdi-check-circle</v-icon>
                          </v-avatar>
                        </template>

                        <v-list-item-title class="font-weight-medium text-grey-darken-3 mb-1">
                          {{ getNomeProfissional(consulta) }}
                        </v-list-item-title>

                        <v-list-item-subtitle class="text-grey-darken-1">
                          Data: {{ formatarDataLocal(consulta.updatedAt) }}
                        </v-list-item-subtitle>

                        <template #append>
                          <v-icon color="grey">mdi-chevron-right</v-icon>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-container>

    <v-dialog v-model="dialogConsulta" max-width="700">
      <v-card>
        <v-card-title class="d-flex align-center pa-6" style="background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)">
          <v-icon color="white" size="30" class="me-3">mdi-stethoscope</v-icon>
          <span class="text-h5 font-weight-bold text-white">Detalhes da Consulta</span>
          <v-spacer />
          <v-btn icon="mdi-close" variant="text" color="white" @click="dialogConsulta = false" />
        </v-card-title>

        <v-card-text class="pa-6" v-if="consultaSelecionada">
          <v-row>
            <v-col cols="12" md="6">
              <div class="mb-4">
                <div class="text-caption text-grey-darken-1 mb-1">Profissional</div>
                <div class="text-body-1 font-weight-medium text-grey-darken-3">
                  {{ getNomeProfissional(consultaSelecionada) }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="mb-4">
                <div class="text-caption text-grey-darken-1 mb-1">Data da Consulta</div>
                <div class="text-body-1 font-weight-medium text-grey-darken-3">
                  {{ formatarDataLocal(consultaSelecionada.dataConsulta) }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="mb-4">
                <div class="text-caption text-grey-darken-1 mb-1">Atualizado em</div>
                <div class="text-body-1 font-weight-medium text-grey-darken-3">
                  {{ formatarDataLocal(consultaSelecionada.updatedAt) }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="mb-4">
                <div class="text-caption text-grey-darken-1 mb-1">Atualizado por</div>
                <div class="text-body-1 font-weight-medium text-grey-darken-3">
                  {{ consultaSelecionada.updatedBy || 'N/A' }}
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="mb-4">
                <div class="text-caption text-grey-darken-1 mb-1">Diagnóstico</div>
                <div class="text-body-1 text-grey-darken-3">
                  {{ consultaSelecionada.diagnostico || 'Sem diagnóstico' }}
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="mb-4">
                <div class="text-caption text-grey-darken-1 mb-1">Medicamentos Receitados</div>
                <div class="text-body-1 text-grey-darken-3">
                  {{ consultaSelecionada.medicamentosReceitados || 'Sem medicamentos' }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="mb-4">
                <div class="text-caption text-grey-darken-1 mb-1">Situação</div>
                <v-chip color="green" size="small">
                  {{ consultaSelecionada.situacao }}
                </v-chip>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="mb-4">
                <div class="text-caption text-grey-darken-1 mb-1">Consulta Externa</div>
                <v-chip :color="consultaSelecionada.consultaExterna ? 'blue' : 'grey'" size="small">
                  {{ consultaSelecionada.consultaExterna ? 'Sim' : 'Não' }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>


  </div>
</template>

<script setup>
import { formatarData, formatarDataLocal } from '@/utils/date.utils'
import alergiasService from '@/services/alergias/alergias-service'
import atletaService from '@/services/atleta/atleta-service'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import consultasService from '@/services/consultas/consultas-service'

const router = useRouter()
const route = useRoute()

const paciente = ref(null)
const loading = ref(true)
const alergiasExpanded = ref(true)
const alergias = ref([])
const loadingAlergias = ref(true)
const consultas = ref([])
const consultasExpanded = ref(true)
const loadingConsultas = ref(true)
const dialogConsulta = ref(false)
const consultaSelecionada = ref(null)

const calcularIdade = (dataNascimento) => {
  if (!dataNascimento) return 'N/A'
  const hoje = new Date()
  const nascimento = new Date(dataNascimento)
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const mes = hoje.getMonth() - nascimento.getMonth()
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--
  }
  return idade
}

const formatarTelefone = (telefone) => {
  if (!telefone) return null
  const numero = telefone.replace(/\D/g, '')
  if (numero.length === 11) {
    return numero.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (numero.length === 10) {
    return numero.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  return telefone
}

const voltarParaLista = () => {
  router.back()
}

const toggleAlergias = () => {
  alergiasExpanded.value = !alergiasExpanded.value
}

const toggleConsultas = () => {
  consultasExpanded.value = !consultasExpanded.value
}

const consultasConcluidas = computed(() => {
  return consultas.value.filter(c => c.situacao === 'Concluido')
})

const getNomeProfissional = (consulta) => {
  if (consulta.medico?.usuario?.nome) {
    return consulta.medico.usuario.nome
  }
  if (consulta.fisioterapeuta?.usuario?.nome) {
    return consulta.fisioterapeuta.usuario.nome
  }
  return 'Profissional não identificado'
}

const abrirDetalhesConsulta = (consulta) => {
  consultaSelecionada.value = consulta
  dialogConsulta.value = true
}

const findAllAlergias = async (id) => {
  try {
    loadingAlergias.value = true
    const response = await alergiasService.getAlergiaAtletaId(id)
    if (response && response.data) {
      alergias.value = response.data
    } else {
      alergias.value = response
    }
  } catch (error) {
    if (error.response?.status === 404) {
      alergias.value = []
    } else {
      console.error('Erro ao buscar alergias:', error)
      alergias.value = []
    }
  } finally {
    loadingAlergias.value = false
  }
}

const buscarConsultas = async () => {
  try {
    loadingConsultas.value = true
    const atletaId = route.params.id || route.query.id
    const response = await consultasService.getConsultaByAtletaId(atletaId)
    consultas.value = response.data || []
  } catch (error) {
    console.error('Erro ao buscar consultas:', error)
    consultas.value = []
  } finally {
    loadingConsultas.value = false
  }
}

const buscarPaciente = async (id) => {
  try {
    loading.value = true
    const response = await atletaService.getAtletaById(id)

    if (response && response.data) {
      paciente.value = response.data
    } else {
      paciente.value = response
    }
  } catch (error) {
    console.error('Erro ao buscar paciente:', error)
    paciente.value = null
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const pacienteId = route.params.id || route.query.id
  if (pacienteId) {
    buscarPaciente(pacienteId)
    findAllAlergias(pacienteId)
    buscarConsultas()
  } else {
    console.error('ID do paciente não encontrado na rota')
    loading.value = false
  }
})
</script>

<style scoped>
.btn-top-left {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  border-color: rgba(255, 255, 255, 0.6);
  color: white;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
}

.btn-top-left:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-top-right {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  border-color: rgba(255, 255, 255, 0.6);
  color: white;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
}

.btn-top-right:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.cursor-pointer {
  cursor: pointer;
  transition: all 0.3s ease;
}

.cursor-pointer:hover {
  opacity: 0.9;
}

.info-card {
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.expandable-card {
  transition: all 0.3s ease;
}

.expandable-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.list-item-hover {
  transition: all 0.3s ease;
  border-radius: 8px;
}

.list-item-hover:hover {
  background-color: rgba(33, 150, 243, 0.08) !important;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.border-b {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.ga-2 {
  gap: 8px;
}

.scrollable-content {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}

.scrollable-content::-webkit-scrollbar {
  width: 8px;
}

.scrollable-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.scrollable-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
