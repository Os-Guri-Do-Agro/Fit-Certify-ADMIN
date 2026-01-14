<template>
  <div class="pa-0" fluid>
    <div v-if="loading">
      <div class="hero-section">
        <div class="hero-overlay"></div>
        <div class="position-relative">
          <div class="rating-chips">
            <div class="skeleton-rating-chip"></div>
            <div class="skeleton-rating-chip skeleton-rating-chip-wide"></div>
          </div>
          <v-row align="center" class="min-height-400">
            <v-col cols="12" md="4" class="text-center">
              <div class="skeleton-avatar mx-auto mb-4"></div>
              <div class="skeleton-name mx-auto mb-2"></div>
              <div class="skeleton-specialty mx-auto"></div>
            </v-col>
            <v-col cols="12" md="8">
              <div class="info-chips">
                <div class="skeleton-chip mb-3"></div>
                <div class="skeleton-chip mb-3"></div>
                <div class="skeleton-chip mb-4"></div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="content-section">
        <v-row justify="center">
          <v-col cols="12">
            <v-row class="mb-8 mt-5">
              <v-col cols="12"><v-skeleton-loader type="card" height="150" class="info-card"></v-skeleton-loader></v-col>
              <v-col cols="12"><v-skeleton-loader type="card" height="150" class="info-card"></v-skeleton-loader></v-col>
              <v-col cols="12"><v-skeleton-loader type="card" height="150" class="info-card"></v-skeleton-loader></v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-else>
      <div class="hero-section">
        <div class="hero-overlay"></div>
        <div class="position-relative ma-5">
          <div class="rating-chips">
            <v-chip class="rating-chip" prepend-icon="mdi-star">0</v-chip>
            <v-chip class="rating-chip" prepend-icon="mdi-comment">0 {{ $t('fisioterapeutaDetalhes.reviews') }}</v-chip>
          </div>
          <v-row align="center" class="min-height-400">
            <v-col cols="12" md="4" class="text-center">
              <v-avatar size="160" class="doctor-avatar">
                <v-img v-if="fisioterapeuta?.avatarUrl" :src="fisioterapeuta?.avatarUrl" cover />
                <v-icon v-else size="80" color="white">mdi-account</v-icon>
              </v-avatar>
              <h1 class="doctor-name">{{ fisioterapeuta?.usuario?.nome }}</h1>
              <div class="d-flex align-center justify-center mt-1">
                <v-chip class="info-chip" prepend-icon="mdi-qrcode">{{ fisioterapeuta?.codigoConvite }}</v-chip>
              </div>

            </v-col>
            <v-col cols="12" md="8">
              <div class="doctor-info">
                <div class="info-chips d-flex ga-md-5 flex-column flex-md-row">
                  <v-chip class="info-chip" prepend-icon="mdi-medal">{{ $t('fisioterapeutaDetalhes.yearsExperience', { years: fisioterapeuta?.experiencia }) }}</v-chip>
                  <v-chip class="info-chip" prepend-icon="mdi-clock">{{ fisioterapeuta?.diaFuncionamentoInicio }} - {{ fisioterapeuta?.diaFuncionamentoFim }}</v-chip>
                  <v-chip class="info-chip" prepend-icon="mdi-calendar">{{ formatarHorarioLocal(fisioterapeuta?.horarioInicio) }} - {{ formatarHorarioLocal(fisioterapeuta?.horarioFim) }}</v-chip>
                </div>
                <div v-if="fisioterapeuta?.foco" class="focus-in-header mb-4 d-none d-md-flex flex-column mt-5 rounded-xl">
                  <div class="d-flex align-center mb-2">
                    <v-icon color="white" size="20" class="mr-2">mdi-target</v-icon>
                    <span class="focus-label">{{ $t('fisioterapeutaDetalhes.mainFocus') }}</span>
                  </div>
                  <p class="focus-text">{{ fisioterapeuta?.foco }}</p>
                </div>
                <v-btn
                  class="schedule-btn"
                  size="x-large"
                  prepend-icon="mdi-calendar-plus"
                  @click="ActiveDialog = true"
                  :disabled="fisioterapeutaSemHorario"
                >
                  {{ fisioterapeutaSemHorario ? $t('fisioterapeutaDetalhes.noSchedulesAvailable') : $t('fisioterapeutaDetalhes.scheduleAppointment') }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>

      <div class="content-section">
        <v-row justify="center">
          <v-col cols="12">
            <v-row class="mb-8">
              <v-col class="d-md-none mt-5" cols="12">
                <v-card v-if="fisioterapeuta?.foco" class="info-card-2 focus-card mb-8 rounded-xl" elevation="2">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-3 justify-center">
                      <v-icon color="#00c6fe" size="28" class="mr-3">mdi-target</v-icon>
                      <h3 class="text-h6 font-weight-bold text-light-blue-darken-1">{{ $t('fisioterapeutaDetalhes.mainFocusTitle') }}</h3>
                    </div>
                    <p class="text-body-1 mb-0 text-center">{{ fisioterapeuta?.foco }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col class="mt-md-5" cols="12" v-if="fisioterapeuta?.perfil">
                <v-card class="info-card h-100 rounded-xl" elevation="2">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-3">
                      <v-icon color="#00c6fe" size="24" class="mr-2">mdi-account-circle</v-icon>
                      <h4 class="text-h6 font-weight-bold">{{ $t('fisioterapeutaDetalhes.profile') }}</h4>
                    </div>
                    <p class="text-body-2">{{ fisioterapeuta?.perfil }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" v-if="fisioterapeuta?.carreira">
                <v-card class="info-card h-100 rounded-xl" elevation="2">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-3">
                      <v-icon color="#00c6fe" size="24" class="mr-2">mdi-briefcase</v-icon>
                      <h4 class="text-h6 font-weight-bold">{{ $t('fisioterapeutaDetalhes.career') }}</h4>
                    </div>
                    <p class="text-body-2">{{ fisioterapeuta?.carreira }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" v-if="fisioterapeuta?.destaques">
                <v-card class="info-card h-100 rounded-xl" elevation="2">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-3">
                      <v-icon color="#00c6fe" size="24" class="mr-2">mdi-trophy</v-icon>
                      <h4 class="text-h6 font-weight-bold">{{ $t('fisioterapeutaDetalhes.highlights') }}</h4>
                    </div>
                    <p class="text-body-2">{{ fisioterapeuta?.destaques }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>

  <v-dialog v-model="ActiveDialog" max-width="1000">
    <v-card rounded="xl" elevation="8">
      <v-card-title class="pa-6 dialog-header text-white">
        <div class="d-flex align-center">
          <v-icon class="mr-3" size="28">mdi-calendar-plus</v-icon>
          <span class="text-h5 font-weight-bold">{{ $t('fisioterapeutaDetalhes.scheduleAppointmentTitle') }}</span>
        </div>
      </v-card-title>

      <v-card-text class="pa-6">
        <v-alert
          class="mb-1"
          :text="$t('fisioterapeutaDetalhes.scheduleInfo')"
          :title="$t('fisioterapeutaDetalhes.importantInfo')"
          type="info"
          variant="tonal"
        ></v-alert>

        <v-row v-if="fisioterapeutaSemHorario">
          <v-col cols="12">
            <v-card rounded="lg" variant="outlined" color="grey" class="pa-8">
              <div class="text-center">
                <v-icon size="80" color="grey-lighten-1" class="mb-4">mdi-calendar-remove</v-icon>
                <h3 class="text-h5 mb-3 text-grey-darken-1">{{ $t('fisioterapeutaDetalhes.physioNoSchedules') }}</h3>
                <p class="text-body-1 text-grey">{{ $t('fisioterapeutaDetalhes.physioNoSchedulesDescription') }}</p>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
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
                {{ $t('fisioterapeutaDetalhes.availableSchedules') }}
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
                      {{ formatarHorario(hora.horario) }}
                    </div>
                    <div class="text-caption text-grey">
                      {{ formatarHorario(hora.horarioFim) }}
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
                  {{ datinhas.slotsDisponiveis || 0 }} {{ $t('fisioterapeutaDetalhes.available') }}
                </v-chip>
                <v-chip color="grey" variant="flat" size="small">
                  <v-icon size="12" class="mr-1">mdi-close</v-icon>
                  {{
                    (datinhas.slots?.length || 0) -
                    (datinhas.slotsDisponiveis || 0)
                  }}
                  {{ $t('fisioterapeutaDetalhes.occupied') }}
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
          {{ $t('fisioterapeutaDetalhes.cancel') }}
        </v-btn>
        <v-btn
          v-if="!fisioterapeutaSemHorario"
          color="#00c6fe"
          rounded="lg"
          size="large"
          @click="criarConsulta"
          :disabled="!selectedTimeSlot"
          :loading="loading"
        >
          <v-icon left>mdi-check</v-icon>
          {{ $t('fisioterapeutaDetalhes.confirmSchedule') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import consultasService from '@/services/consultas/consultas-service'
import fisioterapeutaService from '@/services/fisioterapeutas/fisioterapeuta-service'
import { getAtletaId } from '@/utils/auth'
import { formatarHorarioLocal, formatarHorario, removerOffsetTimezone } from '@/utils/date.utils'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import { getErrorMessage } from '@/common/error.utils'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

dayjs.extend(utc)
dayjs.extend(timezone)

const route = useRoute()
const fisioterapeuta = ref(null)
const loading = ref(true)
const ActiveDialog = ref(false)
const fisioterapeutaSemHorario = ref(false)
const dayselect = ref()
const datinhas = ref([])
const selectedTimeSlot = ref(null)
const fisioterapeutaId = ref()

const buscarFisioterapeutaById = async (id) => {
  try {
    const response = await fisioterapeutaService.getFisioterapeutaById(id)
    if (response && response.data) {
      fisioterapeuta.value = response.data
      fisioterapeutaSemHorario.value = response.data.diaFuncionamentoInicio === 'Pend'
    } else {
      fisioterapeuta.value = response
      fisioterapeutaSemHorario.value = response.diaFuncionamentoInicio === 'Pend'
    }
  } catch (error) {
    console.error('Erro ao buscar fisioterapeuta:', error)
  } finally {
    loading.value = false
  }
}

const buscarHorariosDisponiveis = async () => {
  if (!dayselect.value || !fisioterapeutaId.value) return

  const data = {
    fisioterapeutaId: fisioterapeutaId.value,
    data: dayjs(dayselect.value).format('YYYY-MM-DD'),
  }

  try {
    const response = await fisioterapeutaService.findHorariosDisponiveis(data)
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
      fisioterapeutaId: fisioterapeutaId.value,
      atletaId: getAtletaId(),
      diagnostico: '',
      medicamentosReceitados: '',
      situacao: 'Pendente',
      nomePacienteExterno: null,
      consultaExterna: false,
      dataConsulta: removerOffsetTimezone(selectedTimeSlot.value.horario),
    }

    await consultasService.createConsultaByAtleta(data)
    ActiveDialog.value = false
    toast.success(t('fisioterapeutaDetalhes.scheduleSuccess'), {
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_RIGHT,
    })

    selectedTimeSlot.value = null
    dayselect.value = null
    datinhas.value = []
  } catch (error) {
    toast.error(t('fisioterapeutaDetalhes.scheduleError', { error: getErrorMessage(error, t('fisioterapeutaDetalhes.unknownError')) }), {
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_RIGHT,
    })
    console.error('Erro ao criar consulta:', error)
  } finally {
    loading.value = false
  }
}

watch(dayselect, () => {
  if (dayselect.value) {
    buscarHorariosDisponiveis()
  }
})

onMounted(async () => {
  fisioterapeutaId.value = route.query?.id
  if (fisioterapeutaId.value) {
    await buscarFisioterapeutaById(fisioterapeutaId.value)
  } else {
    console.error('ID do fisioterapeuta não encontrado')
  }
})
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);
  position: relative;
  overflow: hidden;
  border-radius: 20px;
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}
.min-height-400 { min-height: 400px; }
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
  border: 1px solid;
}
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
.dialog-header {
  background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%);
}
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
.content-section { background: #f8f9fa; }
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
.skeleton-chip:nth-child(2) { width: 180px; animation-delay: 0.2s; }
.skeleton-chip:nth-child(3) { width: 160px; animation-delay: 0.4s; }
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
.skeleton-rating-chip-wide { width: 120px; animation-delay: 0.2s; }
@keyframes skeleton-pulse {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}
@media (max-width: 960px) {
  .doctor-info { padding-left: 0; margin-top: 32px; text-align: center; }
  .rating-chips { position: static; text-align: center; margin-bottom: 24px; }
  .info-chips { text-align: center; }
  .info-chip { display: block; margin: 8px auto; width: fit-content; }
  .focus-in-header { text-align: left; }
  .skeleton-rating-chip { margin: 4px; }
}
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
