<template>
  <v-container class="pa-0" fluid>
    <div v-if="loading">
      <div class="hero-section">
        <div class="hero-overlay"></div>
        <v-container class="position-relative">
          <div class="rating-chips">
            <div class="skeleton-rating-chip"></div>
            <div class="skeleton-rating-chip skeleton-rating-chip-wide"></div>
          </div>

          <v-row align="center" class="min-height-400">
            <v-col cols="12" md="4" class="text-center">
              <div class="doctor-avatar-container">
                <div class="skeleton-avatar mx-auto mb-4"></div>
              </div>
              <div class="skeleton-name mx-auto mb-2"></div>
              <div class="skeleton-specialty mx-auto"></div>
            </v-col>
            <v-col cols="12" md="8">
              <div class="doctor-info">
                <div class="info-chips">
                  <div class="skeleton-chip mb-3"></div>
                  <div class="skeleton-chip mb-3"></div>
                  <div class="skeleton-chip mb-4"></div>
                </div>

                <div class="skeleton-focus-container mb-4 d-none d-md-block">
                  <div class="skeleton-focus-label mb-2"></div>
                  <div class="skeleton-focus-text mb-1"></div>
                  <div class="skeleton-focus-text skeleton-focus-text-short"></div>
                </div>
                
                <div class="skeleton-button"></div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <v-container class="content-section">
        <v-row justify="center">
          <v-col cols="12" lg="10">
            <div class="d-flex d-md-none mb-8">
              <v-skeleton-loader
                type="card"
                width="100%"
                height="120"
                class="focus-card"
              ></v-skeleton-loader>
            </div>

            <v-row class="mb-8">
              <v-col cols="12">
                <v-skeleton-loader
                  type="card"
                  height="150"
                  class="info-card"
                ></v-skeleton-loader>
              </v-col>
              <v-col cols="12">
                <v-skeleton-loader
                  type="card"
                  height="150"
                  class="info-card"
                ></v-skeleton-loader>
              </v-col>
              <v-col cols="12">
                <v-skeleton-loader
                  type="card"
                  height="150"
                  class="info-card"
                ></v-skeleton-loader>
              </v-col>
            </v-row>

            <v-skeleton-loader
              type="card"
              height="200"
              class="consultations-card"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div v-else>
      <div class="hero-section">
        <div class="hero-overlay"></div>
        <v-container class="position-relative">
          <div class="rating-chips">
            <v-chip class="rating-chip" prepend-icon="mdi-star">
              5.0
            </v-chip>
            <v-chip class="rating-chip" prepend-icon="mdi-comment">
              40 avaliações
            </v-chip>
          </div>

          <v-row align="center" class="min-height-400">
            <v-col cols="12" md="4" class="text-center">
              <div class="doctor-avatar-container">
                <v-avatar size="160" class="doctor-avatar">
                  <img
                    v-if="medico?.usuario?.avatarUrl"
                    :src="medico?.usuario?.avatarUrl"
                    alt="Foto do médico"
                  />
                  <v-icon v-else size="80" color="white">mdi-account</v-icon>
                </v-avatar>
              </div>
              <h1 class="doctor-name">{{ medico?.usuario?.nome }}</h1>
              <p class="doctor-specialty">{{ medico?.especializacao }}</p>
            </v-col>

            <v-col cols="12" md="8">
              <div class="doctor-info">
                <div class="info-chips d-flex ga-md-5 flex-column flex-md-row">
                  <v-chip class="info-chip" prepend-icon="mdi-medal">
                    {{ medico?.experiencia }} anos de experiência
                  </v-chip>
                  <v-chip class="info-chip" prepend-icon="mdi-clock">
                    {{ medico?.diaFuncionamentoInicio }} - {{ medico?.diaFuncionamentoFim }}
                  </v-chip>
                  <v-chip class="info-chip" prepend-icon="mdi-calendar">
                    {{ formatarHorario(medico?.horarioInicio) }} - {{ formatarHorario(medico?.horarioFim) }}
                  </v-chip>
                </div>

                <div v-if="medico?.foco" class="focus-in-header mb-4 d-none d-md-flex flex-column mt-5 rounded-xl">
                  <div class="d-flex align-center mb-2">
                    <v-icon color="white" size="20" class="mr-2">mdi-target</v-icon>
                    <span class="focus-label">Foco Principal:</span>
                  </div>
                  <p class="focus-text">{{ medico?.foco }}</p>
                </div>
                
                <v-btn
                  class="schedule-btn"
                  size="x-large"
                  prepend-icon="mdi-calendar-plus"
                  @click="ActiveDialog = true"
                >
                  Marcar Consulta
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <v-container class="content-section">
        <v-row justify="center">
          <v-col cols="12" lg="10">


            <v-row class="mb-8">

              <v-col class="d-flex d-md-none" cols="12">
            <v-card v-if="medico?.foco" class="info-card-2 focus-card mb-8 rounded-xl" elevation="2">
              <v-card-text class="pa-6">
                <div class="d-flex align-center mb-3 justify-center">
                  <v-icon color="#00c6fe" size="28" class="mr-3">mdi-target</v-icon>
                  <h3 class="text-h6 font-weight-bold text-light-blue-darken-1">Foco Principal</h3>
                </div>
                <p class="text-body-1 mb-0 text-center">{{ medico?.foco }}</p>
              </v-card-text>
            </v-card>

              </v-col>
              <v-col cols="12" v-if="medico?.perfil">
                <v-card class="info-card h-100 rounded-xl" elevation="2">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-3">
                      <v-icon color="#00c6fe" size="24" class="mr-2">mdi-account-circle</v-icon>
                      <h4 class="text-h6 font-weight-bold">Perfil</h4>
                    </div>
                    <p class="text-body-2">{{ medico?.perfil }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
              
              <v-col cols="12" v-if="medico?.carreira">
                <v-card class="info-card h-100 rounded-xl" elevation="2">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-3">
                      <v-icon color="#00c6fe" size="24" class="mr-2">mdi-briefcase</v-icon>
                      <h4 class="text-h6 font-weight-bold">Carreira</h4>
                    </div>
                    <p class="text-body-2">{{ medico?.carreira }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
              
              <v-col cols="12" v-if="medico?.destaques">
                <v-card class="info-card h-100 rounded-xl" elevation="2">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-3">
                      <v-icon color="#00c6fe" size="24" class="mr-2">mdi-trophy</v-icon>
                      <h4 class="text-h6 font-weight-bold">Destaques</h4>
                    </div>
                    <p class="text-body-2">{{ medico?.destaques }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-card class="consultations-card rounded-xl info-card-2" elevation="2">
              <v-card-title class="pa-6 pb-0">
                <div class="d-flex align-center">
                  <v-icon color="#00c6fe" size="28" class="mr-3">mdi-calendar-clock</v-icon>
                  <h3 class="text-h6 font-weight-bold ">Suas Consultas</h3>
                </div>
              </v-card-title>
              
              <v-card-text class="pa-6">
                <div v-if="loadingConsultas" class="text-center py-8">
                  <v-progress-circular color="#00c6fe" indeterminate class="mb-4"></v-progress-circular>
                  <p class="text-body-2 text-grey">Carregando consultas...</p>
                </div>

                <div v-else-if="consultasMedicoAtleta?.length > 0">
                  <v-card
                    v-for="consulta in consultasMedicoAtleta"
                    :key="consulta.id"
                    class="consultation-item mb-3 rounded-xl"
                    variant="outlined"
                    color="blue"
                  >
                    <v-card-text class="pa-4">
                      <div class="d-flex align-center">
                        <v-avatar :color="getStatusColor(consulta.situacao)" size="48" class="mr-4">
                          <v-icon color="white" size="24">
                            {{ getStatusIcon(consulta.situacao) }}
                          </v-icon>
                        </v-avatar>
                        
                        <div class="flex-grow-1">
                          <h4 class="text-subtitle-1 font-weight-medium mb-1">
                            {{ formatarDataHora(consulta.dataConsulta) }}
                          </h4>
                          <div class="d-flex align-center">
                            <v-chip
                              :color="getStatusColor(consulta.situacao)"
                              size="small"
                              class="mr-2"
                            >
                              {{ situacoes[consulta.situacao] }}
                            </v-chip>
                            <span v-if="consulta.diagnostico" class="text-body-2 text-grey-darken-1">
                              Diagnóstico: {{ consulta.diagnostico }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>

                <div v-else class="text-center py-8">
                  <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-calendar-remove</v-icon>
                  <h4 class="text-h6 text-grey-darken-1 mb-2">Nenhuma consulta encontrada</h4>
                  <p class="text-body-2 text-grey">Você ainda não possui consultas com este médico.</p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
  <v-dialog v-model="ActiveDialog" max-width="1000">
    <v-card rounded="xl" elevation="8">
      <v-card-title class="pa-6 dialog-header text-white">
        <div class="d-flex align-center">
          <v-icon class="mr-3" size="28">mdi-calendar-plus</v-icon>
          <span class="text-h5 font-weight-bold">Marcar Consulta</span>
        </div>
      </v-card-title>

      <v-card-text class="pa-6">
        <v-alert
          class="mb-1"
          text="Você pode agendar consultas mas tem que aguardar o médico aprovar, assim que fizer o agendamento será encaminhado notificação para ele."
          title="Informações Importantes"
          type="info"
          variant="tonal"
        ></v-alert>

        <div></div>
        <v-row>
          <v-col cols="6">
            <v-date-picker
              v-model="dayselect"
              color="blue"
              elevation="2"
              rounded="lg"
              class="w-100"
              locale="pt-BR"
            ></v-date-picker>
          </v-col>
          <v-col cols="6">
            <v-card rounded="lg" variant="outlined" color="blue" class="pa-4">
              <v-card-title class="text-h6 font-weight-bold mb-4 pa-0">
                <v-icon class="mr-2" color="blue">mdi-clock-outline</v-icon>
                Horários Disponíveis
              </v-card-title>

              <div class="time-slots-grid">
                <v-card
                  v-for="(hora, index) in datinhas.slots"
                  :key="index"
                  :class="[
                    'time-slot-card',
                    hora.disponivel ? 'available' : 'unavailable',
                    { selected: selectedTimeSlot?.horario === hora.horario },
                  ]"
                  :disabled="!hora.disponivel"
                  @click="hora.disponivel && selectTimeSlot(hora)"
                >
                  <v-card-text class="pa-3 text-center">
                    <v-icon
                      :color="
                        selectedTimeSlot?.horario === hora.horario
                          ? 'white'
                          : hora.disponivel
                            ? 'blue'
                            : 'grey'
                      "
                      class="mb-1"
                    >
                      {{
                        hora.disponivel ? 'mdi-clock-check' : 'mdi-clock-remove'
                      }}
                    </v-icon>
                    <div class="text-body-2 font-weight-medium">
                      {{ dayjs(hora.horario).utcOffset(0).format('HH:mm') }}
                    </div>
                    <div class="text-caption text-grey">
                      {{ dayjs(hora.horarioFim).utcOffset(0).format('HH:mm') }}
                    </div>
                  </v-card-text>
                </v-card>
              </div>

              <div class="mt-4 text-center">
                <v-chip
                  color="success"
                  variant="flat"
                  size="small"
                  class="mr-2"
                >
                  <v-icon size="12" class="mr-1">mdi-check</v-icon>
                  {{ datinhas.slotsDisponiveis || 0 }} disponíveis
                </v-chip>
                <v-chip color="grey" variant="flat" size="small">
                  <v-icon size="12" class="mr-1">mdi-close</v-icon>
                  {{
                    (datinhas.slots?.length || 0) -
                    (datinhas.slotsDisponiveis || 0)
                  }}
                  ocupados
                </v-chip>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="pa-6 justify-center gap-3">
        <v-btn
          variant="outlined"
          color="grey"
          rounded="lg"
          size="large"
          @click="ActiveDialog = false"
        >
          <v-icon left>mdi-close</v-icon>
          Cancelar
        </v-btn>
        <v-btn
          color="#00c6fe"
          rounded="lg"
          size="large"
          @click="criarConsulta"
          :disabled="!selectedTimeSlot"
          :loading="loading"
        >
          <v-icon left>mdi-check</v-icon>
          Confirmar Agendamento
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import medicoService from '@/services/medico/medico-service'
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/pt-br'
import { getAtletaId } from '@/utils/auth'
import consultasService from '@/services/consultas/consultas-service'
import { watch } from 'vue'
import atletaService from '@/services/atleta/atleta-service'
import { toast } from 'vue3-toastify'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('pt-br')

// const router = useRouter()
const route = useRoute()
const medico = ref(null)
const loading = ref(true)
const atletaSelected = ref(null)
const ActiveDialog = ref(false)
const ConsultaExterna = ref(false)
const atletas = ref([])
const dayselect = ref()
const datinhas = ref([])
const selectedTimeSlot = ref(null)
const nomePacienteExterno = ref('')
const selectedDay = ref(dayjs().format('YYYY-MM-DD'))
const consultasMedicoAtleta = ref([])
const loadingConsultas = ref(false)

const formatarHorario = (horario) => {
  if (!horario) return ''
  const hora = horario.substring(11, 16)
  return hora.replace(/^0/, '')
}

const formatarDataHora = (dataHora) => {
  if (!dataHora) return ''
  return dayjs(dataHora).format('DD/MM/YYYY [às] HH:mm')
}

const getStatusColor = (situacao) => {
  if (situacao === 'Pendente') return 'orange'
  if (situacao === 'Marcado') return '#00C6FE'
  if (situacao === 'Concluido') return 'green'
  if (situacao === 'Recusado' || situacao === 'Recusada') return 'red'
  if (situacao === 'EmAtendimento') return 'purple'
  return 'grey'
}

const situacoes = {
  Pendente: 'Pendente',
  Marcado: 'Marcado',
  EmAtendimento: 'Em Atendimento',
  Recusada: 'Recusada',
  Recusado: 'Recusado',
  Concluido: 'Concluído',
}

const getStatusIcon = (situacao) => {
  if (situacao === 'Pendente') return 'mdi-clock-outline'
  if (situacao === 'Marcado') return 'mdi-calendar-check'
  if (situacao === 'Concluido') return 'mdi-check-circle'
  if (situacao === 'Recusado' || situacao === 'Recusada') return 'mdi-close-circle'
  if (situacao === 'EmAtendimento') return 'mdi-account-clock'
  return 'mdi-help-circle'
}

const buscarConsultasAtleta = async () => {
  if (!medicoId.value) return

  loadingConsultas.value = true
  try {
    const response = await atletaService.getConsultasByAtletaIdAndMedicoId(
      getAtletaId(),
      medicoId.value
    )
    if (response && response.success) {
      consultasMedicoAtleta.value = response.data
    }
  } catch (error) {
    consultasMedicoAtleta.value = []
  } finally {
    loadingConsultas.value = false
  }
}

const buscarMedicoById = async (id) => {
  try {
    const response = await medicoService.getMedicoById(id)

    if (response && response.data) {
      medico.value = response.data
    } else {
      medico.value = response
    }
  } catch (error) {
    console.error('Erro ao buscar medicoId:', error)
  } finally {
    loading.value = false
  }
}
const buscarHorariosDisponiveis = async () => {
  if (!dayselect.value || !medicoId.value) return

  const data = {
    medicoId: medicoId.value,
    data: dayjs(dayselect.value).format('YYYY-MM-DD'),
  }

  try {
    const response = await consultasService.findHorariosDisponiveis(data)
    datinhas.value = response.data
  } catch (error) {
    console.error('Erro ao buscar horários:', error)
  }
}

const selectTimeSlot = (hora) => {
  selectedTimeSlot.value = hora
}

const criarConsulta = async () => {
  loading.value = true
  try {
    const data = {
      medicoId: medicoId.value,
      atletaId: getAtletaId(),
      diagnostico: '',
      medicamentosReceitados: '',
      situacao: 'Pendente',
      nomePacienteExterno: null,
      consultaExterna: false,
      dataConsulta: selectedTimeSlot.value.horario,
    }

    await consultasService.createConsultaByAtleta(data)
    ActiveDialog.value = false
    ;(toast.success('Consulta marcada com sucesso!'),
      {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_RIGHT,
      })

    // Reset form
    selectedTimeSlot.value = null
    dayselect.value = null
    datinhas.value = []
  } catch (error) {
    ;(toast.error('Erro ao marcar consulta!'),
      {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    console.error('Erro ao criar consulta:', error)
  } finally {
    loading.value = false
  }
}
const medicoId = ref()
// Watch para mudanças na data
watch(dayselect, () => {
  if (dayselect.value) {
    buscarHorariosDisponiveis()
  }
})

onMounted(async () => {
  medicoId.value = route.query?.id

  if (medicoId.value) {
    await buscarMedicoById(medicoId.value)
    await buscarConsultasAtleta()
  } else {
    console.error('ID do médico não encontrado')
  }
})
</script>

<style scoped>
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #2196F3 0%, #00c6fe 100%);
  position: relative;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}

.min-height-400 {
  min-height: 400px;
}

/* Rating Chips */
.rating-chips {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 2;
}

.rating-chip {
  background: #fff !important;
  color: #00c6fe !important;
  margin-left: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid
}

/* Doctor Avatar */
.doctor-avatar {
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.doctor-name {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.doctor-specialty {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
}

/* Doctor Info */
.info-chip {
  background: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-header {
  background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%);
}

/* Schedule Button */
.schedule-btn {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  color: #2196F3 !important;
  font-weight: 700 !important;
  border-radius: 50px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.3s ease !important;
  text-transform: none !important;
  letter-spacing: 0.5px !important;
}

.schedule-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2) !important;
}

/* Content Section */
.content-section {
  background: #f8f9fa;
}

/* Focus in Header */
.focus-in-header {
  background: rgba(255, 255, 255, 0.1);
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.focus-label {
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
}

.focus-text {
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Cards */
.info-card {
  transition: all 0.3s ease;
  border-left: 3px solid #2196F3;
}

.info-card-2 {
    transition: all 0.3s ease;
  border-top: 3px solid #2196F3;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 198, 254, 0.15) !important;
}

.consultation-item {
  transition: all 0.2s ease;
}

.consultation-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
}

/* Loading Skeletons */
.skeleton-avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
}

.skeleton-name {
  width: 200px;
  height: 32px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.25);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
}

.skeleton-specialty {
  width: 150px;
  height: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
}

.skeleton-chip {
  width: 200px;
  height: 36px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
}

.skeleton-chip:nth-child(2) {
  width: 180px;
  animation-delay: 0.2s;
}

.skeleton-chip:nth-child(3) {
  width: 160px;
  animation-delay: 0.4s;
}

.skeleton-focus-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.skeleton-focus-label {
  width: 140px;
  height: 16px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.3);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
}

.skeleton-focus-text {
  width: 100%;
  height: 14px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.25);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
  animation-delay: 0.3s;
}

.skeleton-focus-text-short {
  width: 80%;
}

.skeleton-button {
  width: 180px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
  animation-delay: 0.6s;
}

.skeleton-rating-chip {
  width: 60px;
  height: 32px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  margin-left: 8px;
  backdrop-filter: blur(10px);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
  display: inline-block;
}

.skeleton-rating-chip-wide {
  width: 120px;
  animation-delay: 0.2s;
}

@keyframes skeleton-pulse {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 960px) {
  .doctor-info {
    padding-left: 0;
    margin-top: 32px;
    text-align: center;
  }
  
  .rating-chips {
    position: static;
    text-align: center;
    margin-bottom: 24px;
  }
  
  .info-chips {
    text-align: center;
  }
  
  .info-chip {
    display: block;
    margin: 8px auto;
    width: fit-content;
  }
  
  .focus-in-header {
    text-align: left;
  }
  
  .skeleton-focus-container {
    display: none !important;
  }
  
  .rating-chips {
    position: static;
    text-align: center;
    margin-bottom: 24px;
  }
  
  .skeleton-rating-chip {
    margin: 4px;
  }
}

/* Time Slots */
.time-slots-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  max-height: 340px;
  overflow-y: auto;
}

.time-slot-card {
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  border-radius: 12px !important;
}

.time-slot-card.available {
  border-color: #e3f2fd;
  background: #fafafa;
}

.time-slot-card.available:hover {
  border-color: #2196F3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 198, 254, 0.2);
  background: white;
}

.time-slot-card.unavailable {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f5f5f5;
}

.time-slot-card.unavailable:hover {
  transform: none;
  box-shadow: none;
}

.time-slot-card.selected {
  background: #2196F3 !important;
  color: white;
  border-color: #2196F3;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 198, 254, 0.3);
}
</style>
