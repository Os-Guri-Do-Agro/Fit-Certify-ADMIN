<template>
  <div class="pa-0 h-100" fluid>
    <div v-if="loading">
      <v-card flat class="pa-0" tile>
        <v-sheet color="blue" class="pa-6 position-relative" rounded="0">
          <div class="position-absolute" style="top: 16px; right: 16px">
            <v-skeleton-loader
              type="chip"
              width="100"
              height="auto"
              class="me-2 d-inline-block"
              color="transparent"
            ></v-skeleton-loader>
            <v-skeleton-loader
              type="chip"
              width="100"
              height="auto"
              class="d-inline-block"
              color="transparent"
            ></v-skeleton-loader>
          </div>

          <v-row align="center">
            <v-col cols="auto">
              <v-skeleton-loader
                type="avatar"
                width="120"
                height="120"
                color="transparent"
                boilerplate
              ></v-skeleton-loader>
            </v-col>
            <v-col>
              <v-skeleton-loader
                type="heading"
                width="300"
                height="32"
                class="mb-2"
                color="transparent"
              ></v-skeleton-loader>
              <v-skeleton-loader
                type="subtitle"
                width="250"
                height="20"
                class="mb-4"
                color="transparent"
              ></v-skeleton-loader>

              <div class="mt-4 mb-4">
                <v-skeleton-loader
                  type="chip"
                  width="140"
                  height="28"
                  class="me-2 d-inline-block"
                  color="transparent"
                ></v-skeleton-loader>
                <v-skeleton-loader
                  type="chip"
                  width="180"
                  height="28"
                  class="d-inline-block"
                  color="transparent"
                ></v-skeleton-loader>
              </div>

              <div class="mt-6">
                <v-skeleton-loader
                  type="button"
                  width="160"
                  height="40"
                  color="transparent"
                ></v-skeleton-loader>
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-card>
      <div class="mt-6">
        <v-row>
          <v-col cols="12" md="8" offset-md="2">
            <v-skeleton-loader
              type="card"
              class="mb-4"
              color="transparent"
            ></v-skeleton-loader>
            <v-skeleton-loader
              type="article"
              color="transparent"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-else>
      <v-card flat class="pa-0" tile>
        <v-sheet color="blue" class="pa-6 position-relative" rounded="0">
          <div class="position-absolute" style="top: 16px; right: 16px">
            <v-chip
              color="white"
              text-color="black"
              small
              class="me-2"
              style="border: 2px solid rgba(255, 255, 255, 0.9)"
            >
              <v-icon left class="mr-1">mdi-star</v-icon> 5
            </v-chip>
            <v-chip
              color="white"
              text-color="black"
              small
              style="border: 2px solid rgba(255, 255, 255, 0.9)"
            >
              <v-icon left class="mr-1">mdi-comment</v-icon> 40
            </v-chip>
          </div>

          <v-row align="center">
            <v-col cols="auto">
              <v-avatar size="120" color="white">
                <img
                  v-if="medico?.usuario?.avatarUrl"
                  :src="medico?.usuario?.avatarUrl"
                  style="object-fit: cover; width: 100%; height: 100%"
                />
                <v-icon v-else size="60" color="blue">mdi-account</v-icon>
              </v-avatar>
            </v-col>

            <v-col>
              <div class="text-h5 font-weight-bold white--text">
                {{ medico?.usuario?.nome }}
              </div>
              <div class="subtitle-1 white--text">
                {{ medico?.especializacao }}
              </div>

              <v-row class="mt-4" dense>
                <v-col cols="auto">
                  <v-chip
                    color="blue"
                    small
                    style="border: 2px solid white; color: white !important"
                  >
                    <v-icon left color="white" class="mr-1">mdi-medal</v-icon>
                    {{ medico?.experiencia }}
                    anos experiência
                  </v-chip>
                </v-col>
                <v-col cols="auto">
                  <v-chip
                    color="blue-lighten-2"
                    small
                    style="border: 2px solid white; color: white !important"
                  >
                    <v-icon left color="white" class="mr-1"
                      >mdi-calendar</v-icon
                    >
                    {{ medico?.diaFuncionamentoInicio }} -
                    {{ medico?.diaFuncionamentoFim }}

                    {{ formatarHorarioLocal(medico?.horarioInicio) }} -
                    {{ formatarHorarioLocal(medico?.horarioFim) }}
                  </v-chip>
                </v-col>
              </v-row>

              <v-row class="mt-6">
                <v-col>
                  <v-btn
                    color="white"
                    size="large"
                    class="text-blue font-weight-bold px-6 marcar-consulta-btn"
                    prepend-icon="mdi-calendar-plus"
                    rounded="lg"
                    elevation="4"
                    @click="ActiveDialog = true"
                  >
                    Marcar Consulta
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-card>

      <div class="mt-6">
        <v-row>
          <v-col cols="12" md="8" offset-md="2">
            <v-card class="bg-transparent" flat>
              <v-card
                color="grey-lighten-4"
                class="pa-4 mb-4"
                tile
                rounded="lg"
              >
                <strong>Foco:</strong> {{ medico?.foco }}
              </v-card>

              <div class="text-h6 font-weight-bold mb-2">Perfil</div>
              <p>
                {{ medico?.perfil }}
              </p>

              <div class="text-h6 font-weight-bold mt-4 mb-2">Carreira</div>
              <p>
                {{ medico?.carreira }}
              </p>

              <div class="text-h6 font-weight-bold mt-4 mb-2">Destaques</div>
              <p>
                {{ medico?.destaques }}
              </p>

              <div class="text-h6 font-weight-bold mt-6 mb-4">
                <v-icon class="mr-2" color="blue">mdi-calendar-clock</v-icon>
                Suas Consultas com este Médico
              </div>

              <v-card
                v-if="loadingConsultas"
                class="mb-4 pa-6 text-center"
                variant="outlined"
              >
                <v-progress-circular
                  indeterminate
                  color="blue"
                  class="mb-3"
                ></v-progress-circular>
                <div class="text-body-2 text-grey">Carregando consultas...</div>
              </v-card>

              <v-card
                v-else-if="consultasMedicoAtleta?.length > 0"
                class="mb-4"
                variant="outlined"
              >
                <v-list>
                  <v-list-item
                    v-for="consulta in consultasMedicoAtleta"
                    :key="consulta.id"
                    class="px-4 py-3"
                  >
                    <template v-slot:prepend>
                      <v-avatar
                        :color="getStatusColor(consulta.situacao)"
                        size="40"
                      >
                        <v-icon color="white">
                          {{ getStatusIcon(consulta.situacao) }}
                        </v-icon>
                      </v-avatar>
                    </template>

                    <v-list-item-title class="font-weight-medium">
                      {{ formatarDataHora(consulta.dataConsulta) }}
                    </v-list-item-title>

                    <v-list-item-subtitle class="mt-1">
                      <v-chip
                        :color="getStatusColor(consulta.situacao)"
                        size="small"
                        variant="flat"
                        class="mr-2"
                      >
                        {{ situacoes[consulta.situacao] }}
                      </v-chip>
                      <span
                        v-if="consulta.diagnostico"
                        class="text-grey-darken-1"
                      >
                        Diagnóstico: {{ consulta.diagnostico }}
                      </span>
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card v-else class="pa-6 text-center" variant="outlined">
                <v-icon size="48" color="grey-lighten-1" class="mb-3"
                  >mdi-calendar-remove</v-icon
                >
                <div class="text-h6 text-grey-darken-1 mb-2">
                  Nenhuma consulta encontrada
                </div>
                <div class="text-body-2 text-grey">
                  Você ainda não possui consultas com este médico.
                </div>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
  <v-dialog v-model="ActiveDialog" max-width="1000">
    <v-card rounded="lg">
      <v-card-title class="bg-blue text-white pa-4">
        <v-icon class="mr-2">mdi-calendar-plus</v-icon>
        Marcar Consulta
      </v-card-title>

      <v-card-text class="pa-6">
        <!-- Caso nao seja atleta fitcertify -->

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
                      {{ formatarHorarioLocal(hora.horario) }}
                    </div>
                    <div class="text-caption text-grey">
                      {{ formatarHorarioLocal(hora.horarioFim) }}
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

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn color="grey" variant="text" @click="ActiveDialog = false">
          Cancelar
        </v-btn>
        <v-btn
          color="blue"
          variant="flat"
          @click="criarConsulta"
          :disabled="!selectedTimeSlot"
          :loading="loading"
        >
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import medicoService from '@/services/medico/medico-service'
import { useRouter, useRoute } from 'vue-router'
import { formatarHorario, formatarDataHora, formatarHorarioLocal } from '@/utils/date.utils'
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


const getStatusColor = (situacao) => {
  const cores = {
    Pendente: 'orange',
    Marcado: 'blue',
    Cancelada: 'grey',
    Recusado: 'red',
    Concluido: 'green',
  }
  return cores[situacao] || 'grey'
}

const situacoes = {
  Pendente: 'Pendente',
  Marcado: 'Marcado',
  Cancelada: 'Canceclada',
  Recusado: 'Recusada',
  Concluido: 'Concluido',
}

const getStatusIcon = (situacao) => {
  const icones = {
    Pendente: 'mdi-clock-outline',
    Marcado: 'mdi-check-all',
    Cancelada: 'mdi-account-clock',
    Recusado: 'mdi-close-circle',
    Concluido: 'mdi-check-circle',
  }
  return icones[situacao] || 'mdi-help-circle'
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
.marcar-consulta-btn {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  border: 2px solid rgba(255, 255, 255, 0.9) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.3s ease !important;
}

.marcar-consulta-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2) !important;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%) !important;
}

.time-slots-grid {
  display: grid;
  grid-template-columns: repeat(2, 2fr);
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
</style>
