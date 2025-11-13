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
                  <v-icon size="50" color="white">mdi-clipboard-pulse-outline</v-icon>
                </v-avatar>
              </div>
              <h1 class="text-h4 font-weight-bold text-white mt-4 mb-2" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)">
                Registros Médicos
              </h1>
              <p class="text-body-1 text-white mb-5" style="opacity: 0.9; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1)">
                Histórico completo de suas consultas concluídas
              </p>
            </v-col>
            <v-col cols="12">
              <div class="d-flex justify-center ma-5">
                <v-chip
                  class="d-none d-md-flex"
                  prepend-icon="mdi-stethoscope"
                  style="background: rgba(255, 255, 255, 0.15); color: white; border: 1px solid rgba(255, 255, 255, 0.3); backdrop-filter: blur(10px)"
                >
                  Histórico Médico
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
  
      <v-container class="py-6">
        <v-row>
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
                @click="toggleHistoricoMedico"
              >
                <v-avatar size="60" class="elevation-2 me-4" color="blue-darken-1">
                  <v-icon size="30" color="white">mdi-clipboard-pulse-outline</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="text-h6 font-weight-bold text-grey-darken-3">
                    Histórico Médico
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    {{ consultas.length }} {{ consultas.length === 1 ? 'consulta registrada' : 'consultas registradas' }}
                  </div>
                </div>
                <v-icon :color="historicoMedicoExpanded ? 'blue-darken-1' : 'grey'">
                  {{ historicoMedicoExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </div>
  
              <v-expand-transition>
                <div v-if="historicoMedicoExpanded">
                  <v-divider />
                  <div class="pa-0 scrollable-content">
                    <template v-if="loading">
                      <div v-for="n in 3" :key="n" class="pa-4">
                        <v-skeleton-loader type="card" />
                      </div>
                    </template>
                    <template v-else-if="consultas.length === 0">
                      <div class="text-center py-8">
                        <p class="text-grey">Nenhum histórico médico encontrado</p>
                      </div>
                    </template>
                    <template v-else>
                      <v-card 
                        v-for="(item, index) in consultas" 
                        :key="index"
                        class="ma-4 expandable-item"
                        elevation="2"
                        rounded="xl"
                      >
                        <div 
                          class="pa-4 cursor-pointer d-flex align-center" 
                          @click="toggleConsulta(index)"
                        >
                          <div class="flex-grow-1">
                            <div class="text-h6 font-weight-medium mb-1">
                              {{ item.medico?.usuario?.nome || 'Médico não informado' }}
                            </div>
                            <div class="text-body-1 text-grey-darken-1">
                              {{ item.medico?.especializacao || 'Especialização não informada' }}
                            </div>
                          </div>
                          <div class="d-flex align-center ga-2 me-2">
                            <v-chip
                              v-if="item?.situacao"
                              size="small"
                              variant="flat"
                              :color="getSituacaoColor(item.situacao)"
                              class="text-white"
                            >
                              {{ item.situacao }}
                            </v-chip>
                            <v-chip size="small" variant="outlined">
                              {{ formatarData(item.createdAt) }}
                            </v-chip>
                          </div>
                          <v-icon :color="expandedItems[index] ? 'blue-darken-1' : 'grey'">
                            {{ expandedItems[index] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                          </v-icon>
                        </div>
  
                        <v-expand-transition>
                          <div v-if="expandedItems[index]">
                            <v-divider />
                            <div class="pa-4">
                              <div class="mb-3">
                                <div class="text-subtitle-2 mb-1">Diagnóstico</div>
                                <p class="text-body-2">{{ item.diagnostico || 'Não informado' }}</p>
                              </div>
                              <div v-if="item.medicamentosReceitados" class="mb-3">
                                <div class="text-subtitle-2 mb-1">Medicamentos Receitados</div>
                                <p class="text-body-2">{{ item.medicamentosReceitados }}</p>
                              </div>
                              <div v-if="item.situacao">
                                <div class="text-subtitle-2 mb-1">Situação</div>
                                <p class="text-body-2">{{ item.situacao }}</p>
                              </div>
                            </div>
                          </div>
                        </v-expand-transition>
                      </v-card>
                    </template>
                  </div>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  
  
    </div>
  </template>
  
  <script setup>
  import consultasService from '@/services/consultas/consultas-service'
  import { getAtletaId } from '@/utils/auth'
  import { onMounted, ref } from 'vue'
  
  const loading = ref(true)
  const consultas = ref([])
  const historicoMedicoExpanded = ref(false)
  const expandedItems = ref({})
  
  const formatarData = (data) => {
    if (!data) return 'N/A'
    return new Date(data).toLocaleDateString('pt-BR')
  }
  
  const getSituacaoColor = (situacao) => {
    if (!situacao) return 'grey'
    const situacaoLower = situacao.toLowerCase()
    if (situacaoLower.includes('concluido') || situacaoLower.includes('concluído')) {
      return 'success'
    } else if (situacaoLower.includes('pendente')) {
      return 'warning'
    } else if (situacaoLower.includes('recusado')) {
      return 'error'
    } else if (situacaoLower.includes('cancelada') || situacaoLower.includes('cancelada')) {
      return 'info'
    } else if (situacaoLower.includes('cancelada')) { 
      return 'grey'
    }
    return 'blue-darken-1'
  }
  
  const toggleHistoricoMedico = () => {
    historicoMedicoExpanded.value = !historicoMedicoExpanded.value
  }
  
  const toggleConsulta = (index) => {
    expandedItems.value[index] = !expandedItems.value[index]
  }
  
  const findAllConsultas = async (id) => {
    try {
      loading.value = true
      const response = await consultasService.getConsultasByAtletaId(id)
      let consultasData = response && response.data ? response.data : response
      
      consultas.value = consultasData.filter(consulta => {
        const situacao = consulta.situacao?.toLowerCase()
        return situacao?.includes('concluido')
      })
    } catch (error) {
      if (error.response?.status === 404) {
        consultas.value = []
      } else {
        console.error('Erro ao buscar consultas:', error)
        consultas.value = []
      }
    } finally {
      loading.value = false
    }
  }
  
  onMounted(async () => {
    const atletaId = getAtletaId()
    if (atletaId) {
      findAllConsultas(atletaId)
    } else {
      console.error('ID do atleta não encontrado')
      loading.value = false
    }
  })
  </script>
  
  <style scoped>
  .cursor-pointer {
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .cursor-pointer:hover {
    opacity: 0.9;
  }
  
  .expandable-card {
    transition: all 0.3s ease;
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
  .expandable-item {
    border: 1px solid #1976D2;
  }
  </style>