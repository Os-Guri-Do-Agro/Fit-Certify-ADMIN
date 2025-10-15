<template>
  <div class="agenda-container">
    <!-- Header da Agenda -->
    <v-card class="mb-6 mx-4 mt-4" elevation="2" rounded="lg">
      <v-card-title class="bg-gradient-primary text-white pa-6">
        <div class="d-flex align-center justify-space-between w-100">
          <div class="d-flex align-center">
            <v-icon size="32" class="mr-3">mdi-calendar-month</v-icon>
            <div>
              <h1 class="text-h4 font-weight-bold mb-1">Agenda Médica</h1>
              <p class="text-subtitle-1 mb-0 opacity-90">{{ dayjs().utcOffset(0).format('dddd, DD [de] MMMM [de] YYYY')
                }}</p>
            </div>
          </div>
          <v-btn @click="ActiveDialog = true" color="white" variant="flat" size="large" prepend-icon="mdi-plus"
            class="text-blue font-weight-bold">
            Nova Consulta
          </v-btn>
        </div>
      </v-card-title>
    </v-card>

    <!-- Calendário e Consultas -->
    <v-row class="mx-4">
      <v-col cols="8">
        <!-- Calendário Simples -->
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
                  { 'today': day.isToday },
                  { 'other-month': !day.isCurrentMonth },
                  { 'has-appointments': day.hasAppointments },
                  { 'selected': selectedDay === day.date }
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
        <!-- Consultas do Dia Selecionado -->
        <v-card elevation="2" rounded="lg">
          <v-card-title class="pa-4 bg-green-lighten-5">
            <v-icon class="mr-2" color="green">mdi-clock-outline</v-icon>
            {{ selectedDayAppointments.date ? `Consultas - ${selectedDayAppointments.date}` : `Hoje -
            ${dayjs().format('DD/MM')}` }}
          </v-card-title>
          <v-card-text class="pa-4">
            <div class="appointment-list">
              <div v-for="appointment in selectedDayAppointments.appointments" :key="appointment.id"
                class="appointment-item">
                <div class="d-flex align-center mb-2">
                  <v-avatar size="32" :color="appointment.type === 'fitcertify' ? 'blue' : 'orange'" class="mr-3">
                    <v-icon color="white">{{ appointment.type === 'fitcertify' ? 'mdi-dumbbell' : 'mdi-account'
                      }}</v-icon>
                  </v-avatar>
                  <div class="flex-grow-1">
                    <div class="font-weight-medium">{{ appointment.patient }}</div>
                    <div class="text-caption text-grey">{{ appointment.time }}</div>
                    <v-chip size="x-small" :color="appointment.type === 'fitcertify' ? 'blue' : 'orange'"
                      variant="outlined">
                      {{ appointment.type === 'fitcertify' ? 'FitCertify365' : 'Externo' }}
                    </v-chip>
                  </div>
                </div>
                <v-divider
                  v-if="appointment.id !== selectedDayAppointments.appointments[selectedDayAppointments.appointments.length - 1].id"></v-divider>
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
          <!-- caso seja atleta fitCertify -->
          <v-combobox clearable v-if="!ConsultaExterna" label="Nome do Atleta" variant="outlined" :items="atletas"
            item-title="usuario.nome" item-value="id" v-model="atletaSelected"
            prepend-inner-icon="mdi-account"></v-combobox>
          <!-- Caso nao seja atleta fitcertify -->
          <v-text-field v-if="ConsultaExterna" label="Nome do Paciente Externo" variant="outlined"
            prepend-inner-icon="mdi-account"></v-text-field>

          <v-checkbox class="ma-0 pa-0" label="Consulta Externa" v-model="ConsultaExterna" color="blue"></v-checkbox>

          <v-alert class="mb-1"
            text="Você pode deixar marcado aqui tanto para horários anteriores para registro quanto para novos horários. Pacientes Externos e FitCertify365. Caso seja FitCertify, tome cuidado pois é notificado para ele em seu aplicativo."
            title="Informações Importantes" type="info" variant="tonal"></v-alert>

          <div>

          </div>
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
                    hora.disponivel ? 'available' : 'unavailable'
                  ]" :disabled="!hora.disponivel" @click="hora.disponivel && selectTimeSlot(hora)">
                    <v-card-text class="pa-3 text-center">
                      <v-icon :color="hora.disponivel ? 'blue' : 'grey'" class="mb-1">
                        {{ hora.disponivel ? 'mdi-clock-check' : 'mdi-clock-remove' }}
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
                  <v-chip color="success" variant="flat" size="small" class="mr-2">
                    <v-icon size="12" class="mr-1">mdi-check</v-icon>
                    {{ datinhas.slotsDisponiveis }} disponíveis
                  </v-chip>
                  <v-chip color="grey" variant="flat" size="small">
                    <v-icon size="12" class="mr-1">mdi-close</v-icon>
                    {{ datinhas.slots?.length - datinhas.slotsDisponiveis }} Ocupados
                  </v-chip>
                </div>
              </v-card>
            </v-col>

          </v-row>

        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="ActiveDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="blue" variant="flat">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import atletaService from '@/services/atleta/atleta-service';
import consultasService from '@/services/consultas/consultas-service';
import { getMedicoId } from '@/utils/auth';
import { onMounted, ref, watch } from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/pt-br';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('pt-br');
const atletaSelected = ref(null)
const ActiveDialog = ref(false)
const ConsultaExterna = ref(false)
const atletas = ref([])
const dayselect = ref()
const datinhas = ref([])
const currentDate = ref(dayjs())
const currentMonth = ref(dayjs().format('MMMM YYYY'))
const calendarDays = ref([])
const selectedDay = ref(dayjs().format('YYYY-MM-DD'))
const selectedDayAppointments = ref({
  date: dayjs().format('DD/MM'),
  appointments: [
    { id: 1, patient: 'João Silva', time: '09:00', status: 'confirmed', type: 'fitcertify' },
    { id: 2, patient: 'Maria Santos', time: '10:30', status: 'pending', type: 'external' },
    { id: 3, patient: 'Pedro Costa', time: '14:00', status: 'confirmed', type: 'fitcertify' },
    { id: 4, patient: 'Ana Oliveira', time: '15:30', status: 'confirmed', type: 'external' }
  ]
})

const appointmentsByDay = ref({
  // Mês atual
  [dayjs().format('YYYY-MM-DD')]: [
    { id: 1, patient: 'João Silva', time: '09:00', status: 'confirmed', type: 'fitcertify' },
    { id: 2, patient: 'Maria Santos', time: '10:30', status: 'pending', type: 'external' },
    { id: 3, patient: 'Pedro Costa', time: '14:00', status: 'confirmed', type: 'fitcertify' },
    { id: 4, patient: 'Ana Oliveira', time: '15:30', status: 'confirmed', type: 'external' }
  ],
  [dayjs().add(1, 'day').format('YYYY-MM-DD')]: [
    { id: 5, patient: 'Carlos Mendes', time: '08:00', status: 'confirmed', type: 'fitcertify' },
    { id: 6, patient: 'Lucia Ferreira', time: '11:00', status: 'pending', type: 'external' }
  ],
  [dayjs().add(5, 'day').format('YYYY-MM-DD')]: [
    { id: 8, patient: 'Fernanda Costa', time: '09:30', status: 'confirmed', type: 'external' },
    { id: 9, patient: 'Marcos Silva', time: '14:30', status: 'pending', type: 'fitcertify' }
  ],
  // Próximo mês
  [dayjs().add(1, 'month').date(5).format('YYYY-MM-DD')]: [
    { id: 10, patient: 'Ricardo Souza', time: '10:00', status: 'confirmed', type: 'fitcertify' },
    { id: 11, patient: 'Amanda Lima', time: '15:00', status: 'pending', type: 'external' }
  ],
  [dayjs().add(1, 'month').date(12).format('YYYY-MM-DD')]: [
    { id: 12, patient: 'Bruno Santos', time: '09:00', status: 'confirmed', type: 'external' }
  ],
  [dayjs().add(1, 'month').date(20).format('YYYY-MM-DD')]: [
    { id: 13, patient: 'Carla Oliveira', time: '11:30', status: 'confirmed', type: 'fitcertify' },
    { id: 14, patient: 'Diego Ferreira', time: '14:00', status: 'pending', type: 'fitcertify' },
    { id: 15, patient: 'Elena Costa', time: '16:30', status: 'confirmed', type: 'external' }
  ],
  // Segundo mês seguinte
  [dayjs().add(2, 'month').date(8).format('YYYY-MM-DD')]: [
    { id: 16, patient: 'Felipe Alves', time: '08:30', status: 'confirmed', type: 'fitcertify' }
  ],
  [dayjs().add(2, 'month').date(15).format('YYYY-MM-DD')]: [
    { id: 17, patient: 'Gabriela Silva', time: '10:30', status: 'pending', type: 'external' },
    { id: 18, patient: 'Henrique Lima', time: '13:00', status: 'confirmed', type: 'fitcertify' }
  ],
  [dayjs().add(2, 'month').date(25).format('YYYY-MM-DD')]: [
    { id: 19, patient: 'Isabela Santos', time: '09:15', status: 'confirmed', type: 'external' },
    { id: 20, patient: 'João Pedro', time: '11:45', status: 'pending', type: 'fitcertify' },
    { id: 21, patient: 'Larissa Costa', time: '15:15', status: 'confirmed', type: 'external' }
  ]
})

onMounted(async () => {
  buscarAtletas()
  buscarHorariosDisponiveis()
  generateCalendar()
})

watch(dayselect, (newValue) => {
  if (newValue) {
    buscarHorariosDisponiveis()
  }
})


// #todo primeira busca, sempre ser o dia atual. (calendario)
//
const buscarHorariosDisponiveis = async () => {
  const data = {
    medicoId: getMedicoId(),
    data: dayjs(dayselect.value).format('YYYY-MM-DD')
  }
  const response = await consultasService.findHorariosDisponiveis(data)
  datinhas.value = response.data
  console.log(datinhas.value)

}
const buscarAtletas = async () => {
  const response = await atletaService.getAllAtletas()
  atletas.value = response.data
}

// const AgendarConsulta = async (){

// evitar de mandar o atletaId quando for externo
// if(ConsultaExterna){
//   atletaSelected.value = null
// }


// console.log(dayselect.value.toISOString())
// const response = consultasService.criarAgendamento(data)
// console.log(response.data)
// datinhas.value = response.data
// }


const selectTimeSlot = (hora) => {
  console.log('Horário selecionado:', hora)
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
      hasAppointments: appointmentsByDay.value[current.format('YYYY-MM-DD')]?.length > 0
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

const selectDay = (day) => {
  console.log('Dia selecionado:', day)
  selectedDay.value = day.date
  const dayAppointments = appointmentsByDay.value[day.date] || []
  selectedDayAppointments.value = {
    date: dayjs(day.date).format('DD/MM'),
    appointments: dayAppointments
  }
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
