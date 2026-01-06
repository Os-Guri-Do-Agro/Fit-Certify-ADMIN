<template>
  <v-container class="py-8" fluid>
    <!-- Header da Agenda -->
    <v-row justify="center" class="mb-6">
      <v-col cols="12">
        <v-card class="hero-card" elevation="0" rounded="xl">
          <div class="hero-overlay"></div>
          <v-card-text class="pa-8 position-relative">
            <v-row align="center">
              <v-col cols="12" md="8">
                <div class="d-flex align-center mb-2">
                  <div class="icon-wrapper-large mr-4">
                    <v-icon size="40" color="white">mdi-calendar-month</v-icon>
                  </div>
                  <div>
                    <h1 class="text-h4 font-weight-bold text-white mb-1">Agenda Médica</h1>
                    <p class="text-subtitle-1 text-white mb-0" style="opacity: 0.9;">
                      {{ dayjs().format('dddd, DD [de] MMMM [de] YYYY') }}
                    </p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4" class="text-md-right">
                <v-btn @click="ActiveDialog = true" color="white" variant="flat" size="large" rounded="xl"
                  prepend-icon="mdi-plus" class="text-blue font-weight-bold elevation-4">
                  Nova Consulta
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Calendário e Consultas -->
    <v-row justify="center">
      <v-col cols="12" lg="8">
        <!-- Calendário Simples -->
        <v-card elevation="4" rounded="xl" class="mb-4 calendar-card">
          <v-card-title class="pa-6 calendar-header-bg">
            <div class="d-flex align-center justify-space-between w-100">
              <div class="d-flex align-center">
                <div class="icon-wrapper mr-3">
                  <v-icon color="white">mdi-calendar</v-icon>
                </div>
                <span class="text-h6 font-weight-bold text-white">{{ currentMonth }}</span>
              </div>
              <div class="d-flex align-center ga-2">
                <v-btn icon="mdi-chevron-left" size="small" variant="flat" color="white" @click="previousMonth"></v-btn>
                <v-btn icon="mdi-chevron-right" size="small" variant="flat" color="white" @click="nextMonth"></v-btn>
              </div>
            </div>
          </v-card-title>
          <v-card-text class="pa-4">
            <div class="calendar-grid">
              <div class="calendar-header">
                <div v-for="day in [
                  'Dom',
                  'Seg',
                  'Ter',
                  'Qua',
                  'Qui',
                  'Sex',
                  'Sáb',
                ]" :key="day" class="day-header">
                  {{ day }}
                </div>
              </div>
              <div class="calendar-body">
                <div v-for="day in calendarDays" :key="day.date" :class="[
                  'calendar-day',
                  { today: day.isToday },
                  { 'other-month': !day.isCurrentMonth },
                  { 'has-appointments': day.hasAppointments },
                  { selected: selectedDay === day.date },
                ]" @click="selectDay(day)">
                  <span class="day-number">{{ day.day }}</span>
                  <div v-if="day.hasAppointments" class="appointment-indicator"></div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <!-- Consultas do Dia Selecionado -->
        <v-card elevation="4" rounded="xl" class="appointments-card">
          <v-card-title class="pa-6 appointments-header-bg">
            <div class="d-flex align-center justify-space-between w-100 flex-wrap ga-2">
              <div class="d-flex align-center">
                <div class="icon-wrapper mr-3">
                  <v-icon color="white">mdi-clock-outline</v-icon>
                </div>
                <span class="text-h6 font-weight-bold text-white">
                  {{
                    selectedDayAppointments.date
                      ? `Consultas - ${selectedDayAppointments.date}`
                      : `Hoje - ${dayjs().format('DD/MM')}`
                  }}
                </span>
              </div>
              <v-btn variant="flat" color="white" size="small" rounded="xl" class="text-blue font-weight-medium"
                @click="router.push('/Medico-Screens/consultas')">
                Ver mais
              </v-btn>
            </div>
          </v-card-title>

          <v-card-text class="pa-4">
            <div class="appointment-list">
              <div v-for="appointment in selectedDayAppointments.appointments" :key="appointment.id"
                class="appointment-item-card">
                <div class="d-flex align-center">
                  <v-avatar size="48" :color="appointment.type === 'fitcertify' ? '#1976d2' : '#fb8c00'"
                    class="mr-3 elevation-2">
                    <v-icon color="white" size="24">{{
                      appointment.type === 'fitcertify'
                        ? 'mdi-dumbbell'
                        : 'mdi-account'
                    }}</v-icon>
                  </v-avatar>
                  <div class="flex-grow-1">
                    <div class="font-weight-bold text-body-1 mb-1">
                      {{ appointment.patient }}
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-icon size="14" color="grey" class="mr-1">mdi-clock-outline</v-icon>
                      <span class="text-caption text-grey">{{ appointment.time }}</span>
                    </div>
                    <div class="d-flex gap-1 flex-wrap">
                      <v-chip size="small" :color="appointment.type === 'fitcertify' ? 'blue' : 'orange'"
                        variant="flat" class="text-white">
                        {{
                          appointment.type === 'fitcertify'
                            ? 'FitCertify365'
                            : 'Externo'
                        }}
                      </v-chip>
                      <v-chip size="small" :color="getStatusColor(appointment.status)" variant="flat" class="text-white">
                        {{ formatStatus(appointment.status) }}
                      </v-chip>
                    </div>
                  </div>
                </div>
                <v-divider v-if="
                  appointment.id !==
                  selectedDayAppointments.appointments[
                    selectedDayAppointments.appointments.length - 1
                  ].id
                "></v-divider>
              </div>
              <div v-if="selectedDayAppointments.appointments.length === 0" class="text-center text-grey py-4">
                <v-icon size="48" color="grey-lighten-2">mdi-calendar-blank</v-icon>
                <p class="mt-2 mb-0">Nenhuma consulta neste dia</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="ActiveDialog" max-width="1000" persistent>
      <v-card rounded="xl" elevation="8">
        <v-card-title class="dialog-header-bg text-white pa-6">
          <div class="d-flex align-center">
            <div class="icon-wrapper mr-3">
              <v-icon color="white">mdi-calendar-plus</v-icon>
            </div>
            <span class="text-h5 font-weight-bold">Marcar Consulta</span>
          </div>
        </v-card-title>

        <v-card-text class="pa-6">
          <!-- caso seja atleta fitCertify -->
          <v-combobox clearable v-if="!ConsultaExterna" label="Nome do Atleta" variant="outlined" :items="atletas"
            item-title="usuario.nome" item-value="id" v-model="atletaSelected"
            prepend-inner-icon="mdi-account"></v-combobox>
          <!-- Caso nao seja atleta fitcertify -->
          <v-text-field v-if="ConsultaExterna" label="Nome do Paciente Externo" variant="outlined"
            prepend-inner-icon="mdi-account" v-model="nomePacienteExterno"></v-text-field>

          <v-checkbox class="ma-0 pa-0" label="Consulta Externa" v-model="ConsultaExterna" color="blue"></v-checkbox>

          <v-alert class="mb-1"
            text="Você pode deixar marcado aqui tanto para horários anteriores para registro quanto para novos horários. Pacientes Externos e FitCertify365. Caso seja FitCertify, tome cuidado pois é notificado para ele em seu aplicativo."
            title="Informações Importantes" type="info" variant="tonal"></v-alert>

          <div></div>
          <v-row>
            <v-col cols="6">
              <v-date-picker v-model="dayselect" color="blue" elevation="2" rounded="lg" class="w-100"
                locale="pt-BR"></v-date-picker>
            </v-col>
            <v-col cols="6">
              <v-card rounded="lg" variant="outlined" color="blue" class="pa-4">
                <v-card-title class="text-h6 font-weight-bold mb-4 pa-0">
                  <v-icon class="mr-2" color="blue">mdi-clock-outline</v-icon>
                  Horários Disponíveis
                </v-card-title>

                <div class="time-slots-grid">
                  <v-card v-for="(hora, index) in datinhas.slots" :key="index" :class="[
                    'time-slot-card',
                    hora.disponivel ? 'available' : 'unavailable',
                    { selected: selectedTimeSlot?.horario === hora.horario },
                  ]" :disabled="!hora.disponivel" @click="hora.disponivel && selectTimeSlot(hora)">
                    <v-card-text class="pa-3 text-center">
                      <v-icon :color="selectedTimeSlot?.horario === hora.horario
                          ? 'white'
                          : hora.disponivel
                            ? 'blue'
                            : 'grey'
                        " class="mb-1">
                        {{
                          hora.disponivel
                            ? 'mdi-clock-check'
                            : 'mdi-clock-remove'
                        }}
                      </v-icon>
                      <div class="text-body-2 font-weight-medium">
                        {{ formatarHorarioLocal(hora.horario) }}
                      </div>
                      <div class="text-caption text-grey">
                        {{
                          formatarHorarioLocal(hora.horarioFim)
                        }}
                      </div>
                    </v-card-text>
                  </v-card>
                </div>

                <div class="mt-4 text-center">
                  <v-chip color="success" variant="flat" size="small" class="mr-2">
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

        <v-card-actions class="pa-6">
          <v-spacer></v-spacer>
          <v-btn color="grey-lighten-1" variant="outlined" size="large" rounded="xl" @click="ActiveDialog = false">
            <v-icon start>mdi-close</v-icon>
            Cancelar
          </v-btn>
          <v-btn color="blue" variant="flat" size="large" rounded="xl" @click="criarConsulta" :loading="loading" :disabled="!selectedTimeSlot ||
            (ConsultaExterna && !nomePacienteExterno) ||
            (!ConsultaExterna && !atletaSelected)
            ">
            <v-icon start>mdi-check</v-icon>
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import atletaService from '@/services/atleta/atleta-service'
import consultasService from '@/services/consultas/consultas-service'
import { getMedicoId, getRole } from '@/utils/auth'
import { formatarDataHoraLocal, formatarHorarioLocal, formatarDataLocal, removerOffsetTimezone } from '@/utils/date.utils'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { getErrorMessage } from '@/common/error.utils'
dayjs.extend(utc)
dayjs.extend(timezone)
const loading = ref(false)
const atletaSelected = ref(null)
const ActiveDialog = ref(false)
const ConsultaExterna = ref(false)
const atletas = ref([])
const dayselect = ref()
const datinhas = ref([])
// const consultasPendentes = ref([])
const selectedTimeSlot = ref(null)
const nomePacienteExterno = ref('')
const currentDate = ref(dayjs())
const currentMonth = ref(dayjs().format('MMMM YYYY'))
const calendarDays = ref([])
const selectedDay = ref(dayjs().format('YYYY-MM-DD'))
const selectedDayAppointments = ref({
  date: dayjs().format('DD/MM'),
  appointments: [],
})

const router = useRouter()
const appointmentsByDay = ref({})

onMounted(async () => {
  if (getRole() === 'medico') {
    buscarAtletas()
    buscarHorariosDisponiveis()
    // buscarConsultasPendentes()
    generateCalendar()
    await buscarConsultasDoDia(dayjs().format('YYYY-MM-DD'))
  }

})

watch(dayselect, (newValue) => {
  if (newValue) {
    buscarHorariosDisponiveis()
  }
})

const buscarHorariosDisponiveis = async () => {
  const data = {
    medicoId: getMedicoId(),
    data: dayjs(dayselect.value).format('YYYY-MM-DD'),
  }
  const response = await consultasService.findHorariosDisponiveis(data)
  datinhas.value = response.data
}

const buscarAtletas = async () => {
  const response = await atletaService.getAllAtletas()
  atletas.value = response.data
}

const selectTimeSlot = (hora) => {
  selectedTimeSlot.value = hora
}

const criarConsulta = async () => {
  loading.value = true
  try {
    const data = {
      medicoId: getMedicoId(),
      atletaId: ConsultaExterna.value ? null : atletaSelected.value.id,
      diagnostico: '',
      medicamentosReceitados: '',
      situacao: 'Marcado',
      nomePacienteExterno: ConsultaExterna.value
        ? nomePacienteExterno.value
        : null,
      consultaExterna: ConsultaExterna.value,
      dataConsulta: removerOffsetTimezone(selectedTimeSlot.value.horario),
    }

    await consultasService.createConsultaByMedico(data)
    ActiveDialog.value = false
    toast.success('Consulta marcada com sucesso!', {
      position: toast.POSITION.TOP_RIGHT,
    })

    // Reset form
    selectedTimeSlot.value = null
    atletaSelected.value = null
    nomePacienteExterno.value = ''
    ConsultaExterna.value = false

    // Refresh data
    await buscarHorariosDisponiveis()
    await buscarConsultasDoDia(selectedDay.value)
  } catch (error) {
    toast.error('Erro ao marcar consulta: ' + getErrorMessage(error, 'Erro desconhecido'), {
      position: toast.POSITION.TOP_RIGHT,
    })
    console.error('Erro ao criar consulta:', error)
  } finally {
    loading.value = false
  }
}

const generateCalendar = () => {
  const today = dayjs()
  const startOfMonth = currentDate.value.startOf('month')
  const endOfMonth = currentDate.value.endOf('month')
  const startDate = startOfMonth.startOf('week')
  const endDate = endOfMonth.endOf('week')
  const days = []
  let current = startDate

  while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
    days.push({
      date: current.format('YYYY-MM-DD'),
      day: current.date(),
      isToday: current.format('YYYY-MM-DD') === today.format('YYYY-MM-DD'),
      isCurrentMonth: current.isSame(currentDate.value, 'month'),
      hasAppointments:
        appointmentsByDay.value[current.format('YYYY-MM-DD')]?.length > 0,
    })
    current = current.add(1, 'day')
  }
  calendarDays.value = days
  currentMonth.value = currentDate.value.format('MMMM YYYY')
}

const nextMonth = () => {
  currentDate.value = currentDate.value.add(1, 'month')
  generateCalendar()
}

const previousMonth = () => {
  currentDate.value = currentDate.value.subtract(1, 'month')
  generateCalendar()
}

const buscarConsultasDoDia = async (selectedDate) => {
  const dataInicio = selectedDate + 'T00:00:00.000Z'
  const dataFim = selectedDate + 'T23:59:00.000Z'

  const data = {
    dataInicio,
    dataFim,
  }

  try {
    const response = await consultasService.findConsultasByDayForMedico(data)
    if (response.success && response.data.length > 0) {
      const dayData = response.data[0]
      const appointments = dayData.consultas.map((consulta) => ({
        id: consulta.id,
        patient: consulta.consultaExterna
          ? consulta.nomePacienteExterno
          : consulta.atleta.usuario.nome,
        time: dayjs(consulta.dataConsulta).utc().format('HH:mm'),
        status: consulta.situacao.toLowerCase().replace(' ', ''),
        type: consulta.consultaExterna ? 'external' : 'fitcertify',
      }))
      selectedDayAppointments.value = {
        date: dayjs(selectedDate).format('DD/MM'),
        appointments,
      }
    } else {
      selectedDayAppointments.value = {
        date: dayjs(selectedDate).format('DD/MM'),
        appointments: [],
      }
    }
  } catch (error) {
    console.error('Erro ao buscar consultas:', error)
    selectedDayAppointments.value = {
      date: dayjs(selectedDate).format('DD/MM'),
      appointments: [],
    }
  }
}

const selectDay = async (day) => {
  selectedDay.value = day.date
  await buscarConsultasDoDia(day.date)
}

const formatStatus = (status) => {
  if (status === 'cancelada') return 'Cancelada'
  if (status === 'concluido') return 'Concluído'
  if (status === 'marcado') return 'Marcado'
  if (status === 'pendente') return 'Pendente'
  if (status === 'recusado') return 'Recusado'
  return status
}

const getStatusColor = (status) => {
  if (status === 'recusado') return 'red'
  if (status === 'cancelada') return 'grey'
  if (status === 'concluido') return 'green'
  if (status === 'marcado') return 'blue'
  if (status === 'pendente') return 'orange'
  return 'grey'
}
</script>

<style scoped>
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
}

.time-slot-card.available {
  border-color: #e3f2fd;
}

.time-slot-card.available:hover {
  border-color: #1976d2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.2);
}

.time-slot-card.unavailable {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #fafafa;
}

.time-slot-card.unavailable:hover {
  transform: none;
  box-shadow: none;
}

.time-slot-card.selected {
  background: #1976d2 !important;
  color: white;
  border-color: #1976d2;
}

.hero-card {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
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

.icon-wrapper-large {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}



.calendar-card:hover {
  box-shadow: 0 12px 40px rgba(30, 136, 229, 0.15) !important;
}

.calendar-header-bg {
  background: linear-gradient(135deg, #2196F3 0%, #1E88E5 100%);
}

.appointments-card {
  transition: all 0.3s ease;
}

.appointments-card:hover {
  box-shadow: 0 12px 40px rgba(76, 175, 80, 0.15) !important;
}

.appointments-header-bg {
  background: linear-gradient(135deg, #66bb6a 0%, #4caf50 100%);
}

.dialog-header-bg {
  background: linear-gradient(135deg, #2196F3 0%, #1E88E5 100%);
}

.calendar-grid {
  width: 100%;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  margin-bottom: 8px;
}

.day-header {
  text-align: center;
  font-weight: bold;
  padding: 8px;
  color: #666;
  font-size: 0.875rem;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.calendar-day {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: white;
  border: 1px solid #e0e0e0;
}

.calendar-day:hover {
  background: #e3f2fd;
  transform: scale(1.05);
}

.calendar-day.today {
  background: #1976d2;
  color: white;
  font-weight: bold;
}

.calendar-day.other-month {
  color: #bbb;
  background: #f9f9f9;
}

.calendar-day.has-appointments::after {
  content: '';
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 6px;
  height: 6px;
  background: #4caf50;
  border-radius: 50%;
}

.calendar-day.selected {
  background: #e8f5e8 !important;
  border-color: #4caf50;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.calendar-day.selected.today {
  background: #1976d2 !important;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.5);
}

.appointment-item-card {
  padding: 16px;
  margin-bottom: 12px;
  background: white;
  border-radius: 12px;
  border-left: 4px solid #1E88E5;
  transition: all 0.3s ease;
}

.appointment-item-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.appointment-list {
  max-height: 500px;
  overflow-y: auto;
  padding: 4px;
}

.appointment-list::-webkit-scrollbar {
  width: 6px;
}

.appointment-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.appointment-list::-webkit-scrollbar-thumb {
  background: #1E88E5;
  border-radius: 10px;
}

.appointment-list::-webkit-scrollbar-thumb:hover {
  background: #1565c0;
}
</style>
