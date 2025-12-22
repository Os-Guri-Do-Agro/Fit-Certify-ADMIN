<template>
  <div class="agenda-container">
    <v-card class="mb-6 mx-4 mt-4" elevation="2" rounded="lg">
      <v-card-title class="bg-gradient-primary text-white pa-6">
        <div class="d-flex align-center justify-space-between w-100">
          <div class="d-flex align-center">
            <v-icon size="32" class="mr-3">mdi-calendar-month</v-icon>
            <div>
              <h1 class="text-h4 font-weight-bold mb-1">Agenda Fisioterapêutica</h1>
              <p class="text-subtitle-1 mb-0 opacity-90">
                {{ dayjs().format('dddd, DD [de] MMMM [de] YYYY') }}
              </p>
            </div>
          </div>
          <v-btn @click="ActiveDialog = true" color="white" variant="flat" size="large" prepend-icon="mdi-plus"
            class="text-blue font-weight-bold">
            Nova Consulta
          </v-btn>
        </div>
      </v-card-title>
    </v-card>

    <v-row class="mx-4">
      <v-col cols="8">
        <v-card elevation="2" rounded="lg" class="mb-4">
          <v-card-title class="pa-4 bg-blue-lighten-5">
            <div class="d-flex align-center justify-space-between w-100">
              <div class="d-flex align-center">
                <v-icon class="mr-2" color="blue">mdi-calendar</v-icon>
                <span>Calendário - {{ currentMonth }}</span>
              </div>
              <div class="d-flex align-center">
                <v-btn icon="mdi-chevron-left" size="small" variant="text" color="blue" @click="previousMonth"></v-btn>
                <v-btn icon="mdi-chevron-right" size="small" variant="text" color="blue" @click="nextMonth"></v-btn>
              </div>
            </div>
          </v-card-title>
          <v-card-text class="pa-4">
            <div class="calendar-grid">
              <div class="calendar-header">
                <div v-for="day in ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']" :key="day" class="day-header">
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

      <v-col cols="4">
        <v-card elevation="2" rounded="lg">
          <v-card-title class="pa-4 bg-green-lighten-5 d-flex align-center justify-space-between flex-wrap ga-2">
            <div>
              <v-icon class="mr-2" color="green">mdi-clock-outline</v-icon>
              {{ selectedDayAppointments.date ? `Consultas - ${selectedDayAppointments.date}` : `Hoje - ${dayjs().format('DD/MM')}` }}
            </div>
            <v-btn variant="outline" color="blue" class="text-subtitle-2" @click="router.push('/Fisioterapeuta-Screens/consultas')">
              Ver mais
            </v-btn>
          </v-card-title>

          <v-card-text class="pa-4">
            <div class="appointment-list">
              <div v-for="appointment in selectedDayAppointments.appointments" :key="appointment.id" class="appointment-item">
                <div class="d-flex align-center mb-2">
                  <v-avatar size="32" :color="appointment.type === 'fitcertify' ? 'blue' : 'orange'" class="mr-3">
                    <v-icon color="white">{{ appointment.type === 'fitcertify' ? 'mdi-dumbbell' : 'mdi-account' }}</v-icon>
                  </v-avatar>
                  <div class="flex-grow-1">
                    <div class="font-weight-medium">{{ appointment.patient }}</div>
                    <div class="text-caption text-grey">{{ appointment.time }}</div>
                    <div class="d-flex gap-1 mt-1">
                      <v-chip size="x-small" :color="appointment.type === 'fitcertify' ? 'blue' : 'orange'" variant="outlined">
                        {{ appointment.type === 'fitcertify' ? 'FitCertify365' : 'Externo' }}
                      </v-chip>
                      <v-chip size="x-small" :color="getStatusColor(appointment.status)" variant="flat">
                        {{ formatStatus(appointment.status) }}
                      </v-chip>
                    </div>
                  </div>
                </div>
                <v-divider v-if="appointment.id !== selectedDayAppointments.appointments[selectedDayAppointments.appointments.length - 1].id"></v-divider>
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

    <v-dialog v-model="ActiveDialog" max-width="1000">
      <v-card rounded="lg">
        <v-card-title class="bg-blue text-white pa-4">
          <v-icon class="mr-2">mdi-calendar-plus</v-icon>
          Marcar Consulta
        </v-card-title>

        <v-card-text class="pa-6">
          <v-combobox clearable v-if="!ConsultaExterna" label="Nome do Atleta" variant="outlined" :items="atletas"
            item-title="usuario.nome" item-value="id" v-model="atletaSelected" prepend-inner-icon="mdi-account"></v-combobox>
          <v-text-field v-if="ConsultaExterna" label="Nome do Paciente Externo" variant="outlined"
            prepend-inner-icon="mdi-account" v-model="nomePacienteExterno"></v-text-field>

          <v-checkbox class="ma-0 pa-0" label="Consulta Externa" v-model="ConsultaExterna" color="blue"></v-checkbox>

          <v-alert class="mb-1"
            text="Você pode deixar marcado aqui tanto para horários anteriores para registro quanto para novos horários. Pacientes Externos e FitCertify365. Caso seja FitCertify, tome cuidado pois é notificado para ele em seu aplicativo."
            title="Informações Importantes" type="info" variant="tonal"></v-alert>

          <v-row>
            <v-col cols="6">
              <v-date-picker v-model="dayselect" color="blue" elevation="2" rounded="lg" class="w-100" locale="pt-BR"></v-date-picker>
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
                      <v-icon :color="selectedTimeSlot?.horario === hora.horario ? 'white' : hora.disponivel ? 'blue' : 'grey'" class="mb-1">
                        {{ hora.disponivel ? 'mdi-clock-check' : 'mdi-clock-remove' }}
                      </v-icon>
                      <div class="text-body-2 font-weight-medium">{{ formatarHorarioLocal(hora.horario) }}</div>
                      <div class="text-caption text-grey">{{ formatarHorarioLocal(hora.horarioFim) }}</div>
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
                    {{ (datinhas.slots?.length || 0) - (datinhas.slotsDisponiveis || 0) }} ocupados
                  </v-chip>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="ActiveDialog = false">Cancelar</v-btn>
          <v-btn color="blue" variant="flat" @click="criarConsulta" :loading="loading" :disabled="!selectedTimeSlot || (ConsultaExterna && !nomePacienteExterno) || (!ConsultaExterna && !atletaSelected)">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import atletaService from '@/services/atleta/atleta-service'
import fisioterapeutaService from '@/services/fisioterapeutas/fisioterapeuta-service'
import { getFisioterapeutaId, getRole } from '@/utils/auth'
import { formatarHorarioLocal, removerOffsetTimezone } from '@/utils/date.utils'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { getErrorMessage } from '@/common/error.utils'
import consultasService from '@/services/consultas/consultas-service'

dayjs.extend(utc)
dayjs.extend(timezone)

const loading = ref(false)
const atletaSelected = ref(null)
const ActiveDialog = ref(false)
const ConsultaExterna = ref(false)
const atletas = ref([])
const dayselect = ref()
const datinhas = ref([])
const selectedTimeSlot = ref(null)
const nomePacienteExterno = ref('')
const currentDate = ref(dayjs())
const currentMonth = ref(dayjs().format('MMMM YYYY'))
const calendarDays = ref([])
const selectedDay = ref(dayjs().format('YYYY-MM-DD'))
const selectedDayAppointments = ref({ date: dayjs().format('DD/MM'), appointments: [] })
const router = useRouter()
const appointmentsByDay = ref({})

onMounted(async () => {
  if (getRole() === 'fisioterapeuta') {
    buscarAtletas()
    buscarHorariosDisponiveis()
    generateCalendar()
    await buscarConsultasDoDia(dayjs().format('YYYY-MM-DD'))
  }
})

watch(dayselect, (newValue) => {
  if (newValue) buscarHorariosDisponiveis()
})

const buscarHorariosDisponiveis = async () => {
  if (!dayselect.value) return
  const dataFormatada = dayjs(dayselect.value).format('YYYY-MM-DD') + 'T00:00:00.000Z'
  const data = { fisioterapeutaId: getFisioterapeutaId(), data: dataFormatada }
  const response = await fisioterapeutaService.findHorariosDisponiveis(data)
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
      fisioterapeutaId: getFisioterapeutaId(),
      atletaId: ConsultaExterna.value ? null : atletaSelected.value.id,
      diagnostico: '',
      medicamentosReceitados: '',
      situacao: 'Marcado',
      nomePacienteExterno: ConsultaExterna.value ? nomePacienteExterno.value : null,
      consultaExterna: ConsultaExterna.value,
      dataConsulta: removerOffsetTimezone(selectedTimeSlot.value.horario),
    }

    await consultasService.postConsulta(data)
    ActiveDialog.value = false
    toast.success('Consulta marcada com sucesso!', { position: toast.POSITION.TOP_RIGHT })

    selectedTimeSlot.value = null
    atletaSelected.value = null
    nomePacienteExterno.value = ''
    ConsultaExterna.value = false

    await buscarHorariosDisponiveis()
    await buscarConsultasDoDia(selectedDay.value)
  } catch (error) {
    toast.error('Erro ao marcar consulta: ' + getErrorMessage(error, 'Erro desconhecido'), { position: toast.POSITION.TOP_RIGHT })
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
      hasAppointments: appointmentsByDay.value[current.format('YYYY-MM-DD')]?.length > 0,
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
  const data = { dataInicio: selectedDate + 'T00:00:00.000Z', dataFim: selectedDate + 'T23:59:00.000Z' }

  try {
    const response = await fisioterapeutaService.findConsultasByDayForFisioterapeuta(data)
    console.log('Response buscarConsultasDoDia:', response)
    console.log('Selected date:', selectedDate)

    if (response.success && response.data.length > 0) {
      // Procura por todas as consultas do dia selecionado
      const allAppointments = []

      response.data.forEach(dayData => {
        console.log('dayData.dataConsultas:', dayData.dataConsultas)
        if (dayData.dataConsultas === selectedDate && dayData.consultas) {
          dayData.consultas.forEach(consulta => {
            allAppointments.push({
              id: consulta.id,
              patient: consulta.consultaExterna ? consulta.nomePacienteExterno : consulta.atleta?.usuario?.nome,
              time: dayjs(consulta.dataConsulta).format('HH:mm'),
              status: consulta.situacao.toLowerCase().replace(' ', ''),
              type: consulta.consultaExterna ? 'external' : 'fitcertify',
            })
          })
        }
      })

      console.log('Appointments found:', allAppointments)
      selectedDayAppointments.value = { date: dayjs(selectedDate).format('DD/MM'), appointments: allAppointments }
    } else {
      selectedDayAppointments.value = { date: dayjs(selectedDate).format('DD/MM'), appointments: [] }
    }
  } catch (error) {
    console.error('Erro ao buscar consultas:', error)
    selectedDayAppointments.value = { date: dayjs(selectedDate).format('DD/MM'), appointments: [] }
  }
}

const selectDay = async (day) => {
  selectedDay.value = day.date
  await buscarConsultasDoDia(day.date)
}

const formatStatus = (status) => {
  const statusMap = { cancelada: 'Cancelada', concluido: 'Concluído', marcado: 'Marcado', pendente: 'Pendente', recusado: 'Recusado' }
  return statusMap[status] || status
}

const getStatusColor = (status) => {
  const colorMap = { recusado: 'red', cancelada: 'grey', concluido: 'green', marcado: 'blue', pendente: 'orange' }
  return colorMap[status] || 'grey'
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

.time-slot-card.selected {
  background: #1976d2 !important;
  color: white;
  border-color: #1976d2;
}

.agenda-container {
  padding: 0;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%) !important;
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

.appointment-item {
  padding: 12px 0;
}

.appointment-list {
  max-height: 400px;
  overflow-y: auto;
}
</style>
