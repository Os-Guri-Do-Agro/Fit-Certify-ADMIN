<template>
    <div class="pa-0" fluid>
      <v-sheet
        class="header-section"
      >
        <v-container class="position-relative">
          <v-row align="center" class="justify-center">
            <v-col cols="12" class="text-center">
              <div class="header-icon-wrapper-hero">
                <v-icon size="60" color="white">mdi-clipboard-pulse-outline</v-icon>
              </div>
              <h1 class="hero-title">
                {{ $t('registrosMedicos.title') }}
              </h1>
              <p class="hero-subtitle">
                {{ $t('registrosMedicos.subtitle') }}
              </p>
              <v-chip
                prepend-icon="mdi-stethoscope"
                class="chip-badge"
              >
                {{ $t('registrosMedicos.badge') }}
              </v-chip>
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
                <v-avatar size="60" class="elevation-2 me-4 gradient-avatar">
                  <v-icon size="30" color="white">mdi-clipboard-pulse-outline</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="text-h6 font-weight-bold gradient-text">
                    {{ $t('registrosMedicos.medicalHistory') }}
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    {{ consultas.length }} {{ consultas.length === 1 ? $t('registrosMedicos.consultRegistered') : $t('registrosMedicos.consultsRegistered') }}
                  </div>
                </div>
                <v-icon :color="historicoMedicoExpanded ? '#42A5F5' : 'grey'">
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
                        <p class="text-grey">{{ $t('registrosMedicos.noHistory') }}</p>
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
                              {{ item.medico?.usuario?.nome || $t('registrosMedicos.doctorNotInformed') }}
                            </div>
                            <div class="text-body-1 text-grey-darken-1">
                              {{ item.medico?.especializacao || $t('registrosMedicos.specializationNotInformed') }}
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
                              {{ formatDateTime(item.dataConsulta) }}
                            </v-chip>
                          </div>
                          <v-icon :color="expandedItems[index] ? '#42A5F5' : 'grey'">
                            {{ expandedItems[index] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                          </v-icon>
                        </div>
  
                        <v-expand-transition>
                          <div v-if="expandedItems[index]">
                            <v-divider />
                            <div class="pa-4">
                              <div class="mb-3">
                                <div class="text-subtitle-2 mb-1">{{ $t('registrosMedicos.diagnosis') }}</div>
                                <p class="text-body-2">{{ item.diagnostico || $t('registrosMedicos.notInformed') }}</p>
                              </div>
                              <div v-if="item.medicamentosReceitados" class="mb-3">
                                <div class="text-subtitle-2 mb-1">{{ $t('registrosMedicos.prescribedMedications') }}</div>
                                <p class="text-body-2">{{ item.medicamentosReceitados }}</p>
                              </div>
                              <div v-if="item.situacao">
                                <div class="text-subtitle-2 mb-1">{{ $t('registrosMedicos.situation') }}</div>
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
  import { formatarData, formatarDataHoraLocal } from '@/utils/date.utils'
  import consultasService from '@/services/consultas/consultas-service'
  import { getAtletaId } from '@/utils/auth'
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t, locale } = useI18n()
  
  const loading = ref(true)
  const consultas = ref([])
  const historicoMedicoExpanded = ref(false)
  const expandedItems = ref({})
  
  const formatDateTime = (dateTime) => {
    if (!dateTime) return ''
    const d = new Date(dateTime)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    
    const dateStr = locale.value === 'pt' ? `${day}/${month}/${year}` : `${month}/${day}/${year}`
    return `${dateStr} ${hours}:${minutes}`
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
.header-section {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  padding: 48px 24px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;
}

.header-icon-wrapper-hero {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 24px;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 16px 0 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.1rem;
  color: white;
  opacity: 0.95;
  margin-bottom: 24px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.chip-badge {
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.gradient-avatar {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
}

.gradient-text {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

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