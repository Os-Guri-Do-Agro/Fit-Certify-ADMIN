<template>
  <v-container class="py-6" fluid>
    <!-- Header da Agenda -->
    <v-row justify="center" class="mb-6">
      <v-col cols="12">
        <v-card class="hero-card" elevation="0" rounded="lg">
          <div class="hero-overlay"></div>
          <v-card-text class="pa-6 position-relative">
            <v-row align="center">
              <v-col cols="12" md="8">
                <div class="d-flex align-center mb-2">
                  <div class="icon-wrapper-large mr-4">
                    <v-icon size="40" color="white">mdi-calendar-month</v-icon>
                  </div>
                  <div>
                    <h1 class="text-h5 font-weight-bold text-white mb-1" style="letter-spacing: 0.3px;">{{ t('agendaFisioterapeutica.title') }}</h1>
                    <p class="text-subtitle-1 text-white mb-0" style="opacity: 0.9;">
                      {{ dayjs().format(locale === 'pt' ? 'dddd, DD [de] MMMM [de] YYYY' : 'dddd, MMMM DD, YYYY') }}
                    </p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4" class="text-md-right">
                <v-btn @click="ActiveDialog = true" color="white" variant="flat" size="default" rounded="lg"
                  prepend-icon="mdi-plus" class="text-blue font-weight-bold">
                  {{ t('agendaFisioterapeutica.newAppointment') }}
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
        <v-card elevation="2" rounded="lg" class="mb-4 calendar-card">
          <v-card-title class="pa-5 calendar-header-bg">
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
                <div v-for="day in weekDays" :key="day" class="day-header">
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
        <v-card elevation="2" rounded="lg" class="appointments-card">
          <v-card-title class="pa-5 appointments-header-bg">
            <div class="d-flex align-center justify-space-between w-100 flex-wrap ga-2">
              <div class="d-flex align-center">
                <div class="icon-wrapper mr-3">
                  <v-icon color="white">mdi-clock-outline</v-icon>
                </div>
                <span class="text-h6 font-weight-bold text-white">
                  {{ selectedDayAppointments.date ? `${t('agendaFisioterapeutica.appointments')} - ${selectedDayAppointments.date}` : `${t('agendaFisioterapeutica.today')} - ${formatDateDisplay(dayjs().format('YYYY-MM-DD'))}` }}
                </span>
              </div>
              <v-btn variant="flat" color="white" size="small" rounded="lg" class="text-blue font-weight-medium"
                @click="router.push('/Fisioterapeuta-Screens/consultas')">
                {{ t('agendaFisioterapeutica.viewMore') }}
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
                    <v-icon color="white" size="24">{{ appointment.type === 'fitcertify' ? 'mdi-dumbbell' : 'mdi-account' }}</v-icon>
                  </v-avatar>
                  <div class="flex-grow-1">
                    <div class="font-weight-bold text-body-1 mb-1">{{ appointment.patient }}</div>
                    <div class="d-flex align-center mb-2">
                      <v-icon size="14" color="grey" class="mr-1">mdi-clock-outline</v-icon>
                      <span class="text-caption text-grey">{{ appointment.time }}</span>
                    </div>
                    <div class="d-flex gap-1 flex-wrap">
                      <v-chip size="small" :color="appointment.type === 'fitcertify' ? 'blue' : 'orange'"
                        variant="flat" class="text-white">
                        {{ appointment.type === 'fitcertify' ? t('agendaFisioterapeutica.fitcertify') : t('agendaFisioterapeutica.external') }}
                      </v-chip>
                      <v-chip size="small" :color="getStatusColor(appointment.status)" variant="flat" class="text-white">
                        {{ formatStatus(appointment.status) }}
                      </v-chip>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="selectedDayAppointments.appointments.length === 0" class="text-center text-grey py-4">
                <v-icon size="48" color="grey-lighten-2">mdi-calendar-blank</v-icon>
                <p class="mt-2 mb-0">{{ t('agendaFisioterapeutica.noAppointments') }}</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="ActiveDialog" max-width="1000" persistent>
      <v-card rounded="lg" elevation="6" class="dialog-card">
        <div class="dialog-header-bg d-flex align-center justify-space-between px-6 py-4">
          <div class="d-flex align-center ga-3">
            <v-icon color="white" size="20">mdi-calendar-plus</v-icon>
            <span class="text-subtitle-1 font-weight-bold text-white" style="letter-spacing:0.3px">{{ t('agendaFisioterapeutica.scheduleAppointment') }}</span>
          </div>
          <v-btn icon="mdi-close" size="small" color="white" variant="text" @click="ActiveDialog = false"></v-btn>
        </div>

        <v-card-text class="pa-0">
          <div class="dialog-body">
            <div class="dialog-col-left">
              <p class="dialog-section-label">{{ t('agendaFisioterapeutica.athleteName') }}</p>

              <v-combobox clearable v-if="!ConsultaExterna" :label="t('agendaFisioterapeutica.athleteName')" variant="outlined"
                density="compact" :items="atletas" item-title="usuario.nome" item-value="id"
                v-model="atletaSelected" prepend-inner-icon="mdi-account" hide-details class="mb-3"></v-combobox>

              <v-text-field v-if="ConsultaExterna" :label="t('agendaFisioterapeutica.externalPatientName')" variant="outlined"
                density="compact" prepend-inner-icon="mdi-account" v-model="nomePacienteExterno" hide-details class="mb-3"></v-text-field>

              <v-row v-if="ConsultaExterna" dense>
                <v-col cols="12">
                  <v-text-field :label="t('agendaFisioterapeutica.externalPatientCpf')" variant="outlined" density="compact"
                    prepend-inner-icon="mdi-card-account-details" v-model="cpfPacienteExterno"
                    :counter="14" :rules="[validarCPF]" :error-messages="cpfError" @input="formatarCPF"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field :label="t('agendaFisioterapeutica.externalPatientEmail')" variant="outlined" density="compact"
                    prepend-inner-icon="mdi-email" v-model="emailPacienteExterno"
                    :rules="[validarEmail]" :error-messages="emailError"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field :label="t('agendaFisioterapeutica.externalPatientPhone')" variant="outlined" density="compact"
                    prepend-inner-icon="mdi-phone" v-model="telefonePacienteExterno"
                    :counter="15" :rules="[validarTelefone]" :error-messages="telefoneError"
                    @input="formatarTelefone"></v-text-field>
                </v-col>
              </v-row>

              <v-checkbox density="compact" class="mb-2" :label="t('agendaFisioterapeutica.externalAppointment')" v-model="ConsultaExterna" color="blue" hide-details></v-checkbox>

              <v-alert :text="t('agendaFisioterapeutica.scheduleInfo')" :title="t('agendaFisioterapeutica.importantInfo')"
                type="info" variant="tonal" density="compact" class="mt-2"></v-alert>
            </div>

            <v-divider vertical class="dialog-divider"></v-divider>

            <div class="dialog-col-right">
              <p class="dialog-section-label">{{ t('agendaFisioterapeutica.availableSchedules') }}</p>

              <v-date-picker v-model="dayselect" color="blue" elevation="0" rounded="lg" class="w-100 dialog-datepicker"
                locale="pt-BR"></v-date-picker>

              <div class="mt-4">
                <div class="d-flex align-center justify-space-between mb-2">
                  <span class="text-caption font-weight-600 text-medium-emphasis" style="text-transform:uppercase;letter-spacing:0.5px">
                    {{ t('agendaFisioterapeutica.availableSchedules') }}
                  </span>
                  <div class="d-flex ga-1">
                    <v-chip color="success" variant="tonal" size="x-small">
                      {{ datinhas.slotsDisponiveis || 0 }} {{ t('agendaFisioterapeutica.available') }}
                    </v-chip>
                    <v-chip color="grey" variant="tonal" size="x-small">
                      {{ (datinhas.slots?.length || 0) - (datinhas.slotsDisponiveis || 0) }} {{ t('agendaFisioterapeutica.occupied') }}
                    </v-chip>
                  </div>
                </div>

                <div class="time-slots-grid">
                  <div v-for="(hora, index) in datinhas.slots" :key="index"
                    :class="['time-slot', hora.disponivel ? 'available' : 'unavailable', { selected: selectedTimeSlot?.horario === hora.horario }]"
                    @click="hora.disponivel && selectTimeSlot(hora)">
                    <v-icon size="14" class="mb-1" :color="selectedTimeSlot?.horario === hora.horario ? 'white' : hora.disponivel ? '#1565c0' : '#bdbdbd'">
                      {{ hora.disponivel ? 'mdi-clock-check-outline' : 'mdi-clock-remove-outline' }}
                    </v-icon>
                    <span class="slot-time">{{ formatarHorarioLocal(hora.horario) }}</span>
                    <span class="slot-end">{{ formatarHorarioLocal(hora.horarioFim) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions class="px-6 py-4">
          <v-spacer></v-spacer>
          <v-btn variant="text" color="grey-darken-1" @click="ActiveDialog = false">
            {{ t('agendaFisioterapeutica.cancel') }}
          </v-btn>
          <v-btn color="blue-darken-2" variant="flat" rounded="lg" class="px-6" @click="criarConsulta" :loading="loading"
            :disabled="!selectedTimeSlot || (ConsultaExterna && !nomePacienteExterno) || (!ConsultaExterna && !atletaSelected)">
            <v-icon start size="16">mdi-check</v-icon>
            {{ t('agendaFisioterapeutica.confirm') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import atletaService from '@/services/atleta/atleta-service'
import fisioterapeutaService from '@/services/fisioterapeutas/fisioterapeuta-service'
import { getFisioterapeutaId, getRole } from '@/utils/auth'
import { formatarHorarioLocal, removerOffsetTimezone } from '@/utils/date.utils'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import 'dayjs/locale/en'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { onMounted, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { getErrorMessage } from '@/common/error.utils'
import consultasService from '@/services/consultas/consultas-service'
import pacientesService from '@/services/medico/pacientes/pacientes-service'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

dayjs.extend(utc)
dayjs.extend(timezone)

watch(locale, (newLocale) => {
  dayjs.locale(newLocale === 'pt' ? 'pt-br' : 'en')
  currentMonth.value = currentDate.value.format('MMMM YYYY')
  generateCalendar()
})

const loading = ref(false)
const atletaSelected = ref(null)
const ActiveDialog = ref(false)
const ConsultaExterna = ref(false)
const atletas = ref([])
const dayselect = ref()
const datinhas = ref([])
const selectedTimeSlot = ref(null)
const nomePacienteExterno = ref('')
const cpfPacienteExterno = ref('')
const telefonePacienteExterno = ref('')
const emailPacienteExterno = ref('')
const cpfError = ref('')
const telefoneError = ref('')
const emailError = ref('')
const currentDate = ref(dayjs())
const currentMonth = ref('')

const weekDays = computed(() => [
  t('agendaFisioterapeutica.days.sun'),
  t('agendaFisioterapeutica.days.mon'),
  t('agendaFisioterapeutica.days.tue'),
  t('agendaFisioterapeutica.days.wed'),
  t('agendaFisioterapeutica.days.thu'),
  t('agendaFisioterapeutica.days.fri'),
  t('agendaFisioterapeutica.days.sat')
])

const formatDate = (date) => {
  return locale.value === 'pt'
    ? dayjs(date).format('DD/MM/YYYY')
    : dayjs(date).format('MM/DD/YYYY')
}

const formatDateDisplay = (date) => {
  return locale.value === 'pt'
    ? dayjs(date).format('DD/MM')
    : dayjs(date).format('MM/DD')
}
const calendarDays = ref([])
const selectedDay = ref(dayjs().format('YYYY-MM-DD'))
const selectedDayAppointments = ref({ date: dayjs().format('DD/MM'), appointments: [] })
const router = useRouter()
const appointmentsByDay = ref({})

onMounted(async () => {
  dayjs.locale(locale.value === 'pt' ? 'pt-br' : 'en')
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
  const page = 1
  const pageSize = 999
  const response = await pacientesService.getAtletasByMedico(page, pageSize)
  atletas.value = response.data.itens
}

const selectTimeSlot = (hora) => {
  selectedTimeSlot.value = hora
}

const formatarCPF = () => {
  let valor = cpfPacienteExterno.value.replace(/\D/g, '')
  if (valor.length <= 11) {
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    cpfPacienteExterno.value = valor
  }
}

const formatarTelefone = () => {
  let valor = telefonePacienteExterno.value.replace(/\D/g, '')
  if (valor.length <= 11) {
    if (valor.length <= 10) {
      valor = valor.replace(/(\d{2})(\d)/, '($1) $2')
      valor = valor.replace(/(\d{4})(\d)/, '$1-$2')
    } else {
      valor = valor.replace(/(\d{2})(\d)/, '($1) $2')
      valor = valor.replace(/(\d{5})(\d)/, '$1-$2')
    }
    telefonePacienteExterno.value = valor
  }
}

const validarCPF = () => {
  const cpf = cpfPacienteExterno.value.replace(/\D/g, '')
  if (!cpf) {
    cpfError.value = ''
    return true
  }
  if (cpf.length !== 11) {
    cpfError.value = t('agendaFisioterapeutica.invalidCpf') || 'CPF deve ter 11 dígitos'
    return false
  }
  
  if (/^(\d)\1{10}$/.test(cpf)) {
    cpfError.value = t('agendaFisioterapeutica.invalidCpf') || 'CPF inválido'
    return false
  }
  
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.charAt(9))) {
    cpfError.value = t('agendaFisioterapeutica.invalidCpf') || 'CPF inválido'
    return false
  }
  
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.charAt(10))) {
    cpfError.value = t('agendaFisioterapeutica.invalidCpf') || 'CPF inválido'
    return false
  }
  
  cpfError.value = ''
  return true
}

const validarTelefone = () => {
  const telefone = telefonePacienteExterno.value.replace(/\D/g, '')
  if (!telefone) {
    telefoneError.value = ''
    return true
  }
  if (telefone.length < 10 || telefone.length > 11) {
    telefoneError.value = t('agendaFisioterapeutica.invalidPhone') || 'Telefone inválido'
    return false
  }
  telefoneError.value = ''
  return true
}

const validarEmail = () => {
  const email = emailPacienteExterno.value
  if (!email) {
    emailError.value = ''
    return true
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    emailError.value = t('agendaFisioterapeutica.invalidEmail') || 'Email inválido'
    return false
  }
  emailError.value = ''
  return true
}

const criarConsulta = async () => {
  loading.value = true
  
  if (ConsultaExterna.value) {
    const cpfValido = validarCPF()
    const telefoneValido = validarTelefone()
    const emailValido = validarEmail()
    
    if (!cpfValido || !telefoneValido || !emailValido) {
      loading.value = false
      return
    }
  }
  try {
    const data = {
      fisioterapeutaId: getFisioterapeutaId(),
      atletaId: ConsultaExterna.value ? null : atletaSelected.value.id,
      diagnostico: '',
      medicamentosReceitados: '',
      situacao: 'Marcado',
      nomePacienteExterno: ConsultaExterna.value
        ? nomePacienteExterno.value
      : null,
      cpfPacienteExterno: ConsultaExterna.value
      ? cpfPacienteExterno.value.replace(/\D/g, '')
      : null,
      telefonePacienteExterno: ConsultaExterna.value
      ? telefonePacienteExterno.value
      : null,
      emailPacienteExterno: ConsultaExterna.value
      ? emailPacienteExterno.value
      : null,
      consultaExterna: ConsultaExterna.value,
      dataConsulta: removerOffsetTimezone(selectedTimeSlot.value.horario),
    }

    await consultasService.postConsulta(data)
    ActiveDialog.value = false
    toast.success(t('agendaFisioterapeutica.appointmentSuccess'), { position: toast.POSITION.TOP_RIGHT })

    selectedTimeSlot.value = null
    atletaSelected.value = null
    nomePacienteExterno.value = ''
    cpfPacienteExterno.value = ''
    telefonePacienteExterno.value = ''
    emailPacienteExterno.value = ''
    cpfError.value = ''
    telefoneError.value = ''
    emailError.value = ''
    ConsultaExterna.value = false

    await buscarHorariosDisponiveis()
    await buscarConsultasDoDia(selectedDay.value)
  } catch (error) {
    toast.error(t('agendaFisioterapeutica.appointmentError') + ' ' + getErrorMessage(error, t('agendaFisioterapeutica.unknownError')), { position: toast.POSITION.TOP_RIGHT })
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
      selectedDayAppointments.value = { date: formatDateDisplay(selectedDate), appointments: allAppointments }
    } else {
      selectedDayAppointments.value = { date: formatDateDisplay(selectedDate), appointments: [] }
    }
  } catch (error) {
    console.error('Erro ao buscar consultas:', error)
    selectedDayAppointments.value = { date: formatDateDisplay(selectedDate), appointments: [] }
  }
}

const selectDay = async (day) => {
  selectedDay.value = day.date
  await buscarConsultasDoDia(day.date)
}

const formatStatus = (status) => {
  const statusKey = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  return t(`agendaFisioterapeutica.status.${statusKey}`, statusKey)
}

const getStatusColor = (status) => {
  const colorMap = { recusado: 'red', cancelada: 'grey', concluido: 'green', marcado: 'blue', pendente: 'orange' }
  return colorMap[status] || 'grey'
}
</script>

<style scoped>
.time-slots-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  max-height: 220px;
  overflow-y: auto;
}

.time-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  transition: all 0.15s ease;
  background: #fff;
  line-height: 1.3;
}

.time-slot.available {
  border-color: #bbdefb;
  background: #f5f9ff;
  cursor: pointer;
}

.time-slot.available:hover {
  border-color: #1565c0;
  background: #e3f0ff;
}

.time-slot.unavailable {
  opacity: 0.4;
  cursor: not-allowed;
  background: #f5f5f5;
}

.time-slot.selected {
  background: #1565c0 !important;
  border-color: #1565c0;
  box-shadow: 0 2px 8px rgba(21, 101, 192, 0.3);
}

.time-slot.selected .slot-time,
.time-slot.selected .slot-end {
  color: white !important;
}

.slot-time {
  font-size: 0.8rem;
  font-weight: 600;
  color: #263238;
}

.slot-end {
  font-size: 0.7rem;
  color: #90a4ae;
}

.dialog-card {
  overflow: hidden;
}

.dialog-body {
  display: flex;
  min-height: 0;
}

.dialog-col-left {
  flex: 1;
  padding: 24px;
  min-width: 0;
}

.dialog-col-right {
  flex: 1;
  padding: 24px;
  min-width: 0;
  background: #f8fafc;
}

.dialog-divider {
  opacity: 1;
  border-color: #e8edf2;
}

.dialog-section-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #78909c;
  margin-bottom: 12px;
}

.dialog-datepicker {
  border: 1px solid #e8edf2;
  border-radius: 8px;
}

.hero-card {
  background: linear-gradient(135deg, #1E88E5 0%, #1565c0 100%);
  position: relative;
  overflow: hidden;
  border-bottom: 3px solid rgba(255,255,255,0.15);
}

.hero-overlay {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 220px;
  height: 220px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
}

.icon-wrapper-large {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255,255,255,0.2);
}

.icon-wrapper {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255,255,255,0.2);
}

.calendar-card {
  border: 1px solid #e8edf2;
  transition: box-shadow 0.2s ease;
}

.calendar-card:hover {
  box-shadow: 0 6px 24px rgba(30, 136, 229, 0.12) !important;
}

.calendar-header-bg {
  background: linear-gradient(135deg, #1E88E5 0%, #1565c0 100%);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.appointments-card {
  border: 1px solid #e8edf2;
  transition: box-shadow 0.2s ease;
}

.appointments-card:hover {
  box-shadow: 0 6px 24px rgba(56, 142, 60, 0.12) !important;
}

.appointments-header-bg {
  background: linear-gradient(135deg, #43a047 0%, #2e7d32 100%);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.dialog-header-bg {
  background: linear-gradient(135deg, #1E88E5 0%, #1565c0 100%);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.calendar-grid {
  width: 100%;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 6px;
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
}

.day-header {
  text-align: center;
  font-weight: 600;
  padding: 6px 4px;
  color: #546e7a;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
}

.calendar-day {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.15s ease;
  background: #fff;
  border: 1px solid #eceff1;
  font-size: 0.875rem;
}

.calendar-day:hover {
  background: #e3f2fd;
  border-color: #90caf9;
}

.calendar-day.today {
  background: #1565c0;
  color: white;
  font-weight: 700;
  border-color: #1565c0;
  box-shadow: 0 2px 6px rgba(21, 101, 192, 0.35);
}

.calendar-day.other-month {
  color: #cfd8dc;
  background: #fafafa;
  border-color: #f5f5f5;
}

.calendar-day.has-appointments::after {
  content: '';
  position: absolute;
  bottom: 3px;
  right: 3px;
  width: 5px;
  height: 5px;
  background: #43a047;
  border-radius: 50%;
}

.calendar-day.selected {
  background: #e8f5e9 !important;
  border-color: #43a047;
  box-shadow: 0 1px 6px rgba(67, 160, 71, 0.25);
}

.calendar-day.selected.today {
  background: #1565c0 !important;
  border-color: #1565c0;
  box-shadow: 0 2px 6px rgba(21, 101, 192, 0.4);
}

.appointment-item-card {
  padding: 14px 16px;
  margin-bottom: 8px;
  background: white;
  border-radius: 6px;
  border: 1px solid #eceff1;
  border-left: 3px solid #1E88E5;
  transition: all 0.15s ease;
}

.appointment-item-card:hover {
  background: #f8fbff;
  border-left-color: #1565c0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.appointment-list {
  max-height: 500px;
  overflow-y: auto;
  padding: 10px;
  background-color: #f4f6f8;
  border-radius: 8px;
  border: 1px solid #e8edf2;
}

.appointment-list::-webkit-scrollbar {
  width: 4px;
}

.appointment-list::-webkit-scrollbar-track {
  background: transparent;
}

.appointment-list::-webkit-scrollbar-thumb {
  background: #90caf9;
  border-radius: 4px;
}

.appointment-list::-webkit-scrollbar-thumb:hover {
  background: #1E88E5;
}
</style>
