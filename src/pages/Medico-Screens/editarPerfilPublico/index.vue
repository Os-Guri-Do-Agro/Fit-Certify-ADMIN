<template>
  <div class="pa-4 bg-grey-lighten-5" style="min-height: 100vh">
    <v-row justify="center">
      <v-col cols="12">

        <!-- Loading Skeleton -->
        <div v-if="loadingData">
          <v-card class="mb-6" elevation="4" rounded="xl">
            <v-card-text class="pa-6">
              <v-row align="center">
                <v-col cols="12" md="4" class="text-center">
                  <div class="skeleton-avatar mx-auto mb-4"></div>
                  <div class="skeleton-text skeleton-title mb-2"></div>
                  <div class="skeleton-text skeleton-subtitle"></div>
                </v-col>
                <v-col cols="12" md="8">
                  <v-row>
                    <v-col cols="12"><div class="skeleton-field"></div></v-col>
                    <v-col cols="6"><div class="skeleton-field"></div></v-col>
                    <v-col cols="6"><div class="skeleton-field"></div></v-col>
                    <v-col cols="6"><div class="skeleton-field"></div></v-col>
                    <v-col cols="6"><div class="skeleton-field"></div></v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card class="mb-6" elevation="4" rounded="xl">
            <v-card-title><div class="skeleton-text skeleton-title"></div></v-card-title>
            <v-card-text class="pa-6">
              <div class="skeleton-text skeleton-paragraph mb-2"></div>
              <div class="skeleton-text skeleton-paragraph mb-2"></div>
              <div class="skeleton-text skeleton-paragraph" style="width: 60%"></div>
            </v-card-text>
          </v-card>

          <v-card elevation="4" rounded="xl">
            <v-card-title><div class="skeleton-text skeleton-title"></div></v-card-title>
            <v-card-text class="pa-6">
              <div class="skeleton-text skeleton-paragraph mb-4"></div>
              <div class="skeleton-text skeleton-paragraph mb-4"></div>
              <div class="skeleton-text skeleton-paragraph"></div>
            </v-card-text>
          </v-card>

          <div class="text-center mt-8 d-flex justify-center ga-4">
            <div class="skeleton-button"></div>
            <div class="skeleton-button"></div>
          </div>
        </div>

        <!-- Formulário -->
        <v-form v-else ref="form" v-model="valid">
          <v-card class="profile-card no-hover mb-6" elevation="8" rounded="xl">
            <div class="profile-header">
              <v-row align="center">
                <v-col cols="12" md="4" class="text-center  d-flex flex-column-reverse flex-md-column">
                  <div class="d-flex flex-column-reverse flex-md-row ga-2 align-center justify-center mt-5 mt-md-0 mb-md-5">
                <v-chip class="info-chip text-center d-flex justify-center text-white" prepend-icon="mdi-account-edit">
                  {{ $t('editarPerfilPublico.editPublicProfile') }}
                </v-chip>
                <v-chip class="info-chip text-center d-flex justify-center text-white">
                  CRM: {{ displayData.crm }}
                </v-chip>
                  </div>
                  <div class="avatar-container">
                    <v-avatar size="190" class="profile-avatar">
                      <img
                        v-if="displayData.avatarUrl"
                        :src="displayData.avatarUrl"
                        style="object-fit: cover; width: 100%; height: 100%"
                      />
                      <v-icon v-else size="60" color="white">mdi-account</v-icon>
                    </v-avatar>
                                      <h2 class="text-h5 font-weight-bold text-white mt-4">{{ displayData.nome }}</h2>
                  <p class="text-subtitle-1 text-blue-darken-4">{{ displayData.especializacao }}</p>
                  </div>
                </v-col>
                <v-col cols="12" md="8">
                  <v-card class="" elevation="0" rounded="lg">
                    <v-card-text class="pa-4">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="formData.experiencia"
                            :label="$t('editarPerfilPublico.yearsExperience')"
                            type="number"
                            variant="outlined"
                            density="comfortable"
                            rounded="lg"
                            prepend-inner-icon="mdi-medal"
                            color="#00c6fe"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="formData.horarioInicio"
                            :label="$t('editarPerfilPublico.startTime')"
                            variant="outlined"
                            density="comfortable"
                            rounded="lg"
                            prepend-inner-icon="mdi-clock-start"
                            placeholder="08:00"
                            maxlength="5"
                            @input="formatarHora('horarioInicio', $event)"
                            :rules="[rules.horaValida, rules.horaInicioMenor]"
                            color="#00c6fe"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="formData.horarioFim"
                            :label="$t('editarPerfilPublico.endTime')"
                            variant="outlined"
                            density="comfortable"
                            rounded="lg"
                            prepend-inner-icon="mdi-clock-end"
                            placeholder="18:00"
                            maxlength="5"
                            @input="formatarHora('horarioFim', $event)"
                            :rules="[rules.horaValida, rules.horaFimMaior]"
                            color="#00c6fe"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="formData.diaFuncionamentoInicio"
                            :label="$t('editarPerfilPublico.startDay')"
                            variant="outlined"
                            density="comfortable"
                            rounded="lg"
                            prepend-inner-icon="mdi-calendar-start"
                            :items="diasSemana"
                            color="#00c6fe"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="formData.diaFuncionamentoFim"
                            :label="$t('editarPerfilPublico.endDay')"
                            variant="outlined"
                            density="comfortable"
                            rounded="lg"
                            prepend-inner-icon="mdi-calendar-end"
                            :items="diasSemana"
                            color="#00c6fe"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-card>


          <v-card class="mb-6" elevation="4" rounded="xl">
            <v-card-title class="section-title">
              <v-icon class="mr-3" color="#00c6fe">mdi-target</v-icon>
              {{ $t('editarPerfilPublico.mainFocus') }}
            </v-card-title>
            <v-card-text class="pa-6">
              <v-textarea
                v-model="formData.foco"
                :label="$t('editarPerfilPublico.mainFocusPlaceholder')"
                variant="outlined"
                rounded="lg"
                rows="3"
                counter="300"
                :rules="[rules.maxLength(300)]"
                color="#00c6fe"
                no-resize
              ></v-textarea>
            </v-card-text>
          </v-card>


          <v-card elevation="4" rounded="xl">
            <v-card-title class="section-title">
              <v-icon class="mr-3" color="#00c6fe">mdi-text-box-multiple</v-icon>
              {{ $t('editarPerfilPublico.professionalInfo') }}
            </v-card-title>
            <v-card-text class="pa-6">
              <v-row>
                <v-col cols="12">
                  <div class="field-label mb-2">
                    <v-icon size="20" color="#00c6fe" class="mr-2">mdi-account-circle</v-icon>
                    {{ $t('editarPerfilPublico.professionalProfile') }}
                  </div>
                  <v-textarea
                    v-model="formData.perfil"
                    :placeholder="$t('editarPerfilPublico.professionalProfilePlaceholder')"
                    variant="outlined"
                    rounded="lg"
                    rows="4"
                    counter="500"
                    :rules="[rules.maxLength(500)]"
                    color="#00c6fe"
                    no-resize
                    class="mb-4"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <div class="field-label mb-2">
                    <v-icon size="20" color="#00c6fe" class="mr-2">mdi-briefcase</v-icon>
                    {{ $t('editarPerfilPublico.professionalCareer') }}
                  </div>
                  <v-textarea
                    v-model="formData.carreira"
                    :placeholder="$t('editarPerfilPublico.professionalCareerPlaceholder')"
                    variant="outlined"
                    rounded="lg"
                    rows="4"
                    counter="500"
                    :rules="[rules.maxLength(500)]"
                    color="#00c6fe"
                    no-resize
                    class="mb-4"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <div class="field-label mb-2">
                    <v-icon size="20" color="#00c6fe" class="mr-2">mdi-star</v-icon>
                    {{ $t('editarPerfilPublico.mainAchievements') }}
                  </div>
                  <v-textarea
                    v-model="formData.destaques"
                    :placeholder="$t('editarPerfilPublico.mainAchievementsPlaceholder')"
                    variant="outlined"
                    rounded="lg"
                    rows="4"
                    counter="500"
                    :rules="[rules.maxLength(500)]"
                    color="#00c6fe"
                    no-resize
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>


          <div class="text-center mt-8 d-flex ga-2 flex-column-reverse flex-md-row items-center justify-center">
            <v-btn
              variant="outlined"
              color="grey-darken-1"
              rounded="xl"
              size="large"
              class="mr-4 px-8"
              @click="cancelar"
              :disabled="loading"
            >
              <v-icon left>mdi-close</v-icon>
              {{ $t('editarPerfilPublico.cancel') }}
            </v-btn>
            <v-btn
              color="#00c6fe"
              rounded="xl"
              size="large"
              class="px-8 save-btn text-white"
              @click="salvar"
              :loading="loading"
              elevation="4"
            >
              <v-icon left>mdi-check</v-icon>
              {{ $t('editarPerfilPublico.saveChanges') }}
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import medicoService from '@/services/medico/medico-service'
import { getPayload } from '@/utils/auth'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { getErrorMessage } from '@/common/error.utils'
import { useI18n } from 'vue-i18n'
import 'vue3-toastify/dist/index.css'

const { t } = useI18n()
const router = useRouter()
const form = ref()
const valid = ref(false)
const loading = ref(false)
const loadingData = ref(true)
const medicoCrm = ref('')

const formData = ref({
  experiencia: '',
  foco: '',
  perfil: '',
  carreira: '',
  destaques: '',
  horarioInicio: '',
  horarioFim: '',
  diaFuncionamentoInicio: '',
  diaFuncionamentoFim: '',
})

const displayData = ref({
  nome: '',
  avatarUrl: '',
  especializacao: '',
  crm: ''
})

const diasSemana = computed(() => [
  { title: t('editarPerfilPublico.daysOfWeek.monday'), value: 'Segunda-Feira' },
  { title: t('editarPerfilPublico.daysOfWeek.tuesday'), value: 'Terça-Feira' },
  { title: t('editarPerfilPublico.daysOfWeek.wednesday'), value: 'Quarta-Feira' },
  { title: t('editarPerfilPublico.daysOfWeek.thursday'), value: 'Quinta-Feira' },
  { title: t('editarPerfilPublico.daysOfWeek.friday'), value: 'Sexta-Feira' },
  { title: t('editarPerfilPublico.daysOfWeek.saturday'), value: 'Sábado' },
  { title: t('editarPerfilPublico.daysOfWeek.sunday'), value: 'Domingo' },
])

const rules = {
  required: (value: any) => !!value || t('editarPerfilPublico.required'),
  maxLength: (max: number) => (value: string) =>
    !value || value.length <= max || t('editarPerfilPublico.maxCharacters', { max }),
  horaValida: (value: string) => {
    if (!value) return true
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    return regex.test(value) || t('editarPerfilPublico.invalidFormat')
  },
  horaInicioMenor: (value: string) => {
    if (!value || !formData.value.horarioFim) return true
    return value < formData.value.horarioFim || t('editarPerfilPublico.startTimeLessThanEnd')
  },
  horaFimMaior: (value: string) => {
    if (!value || !formData.value.horarioInicio) return true
    return value > formData.value.horarioInicio || t('editarPerfilPublico.endTimeGreaterThanStart')
  },
}



const formatarHora = (campo: 'horarioInicio' | 'horarioFim', event: Event) => {
  const input = event.target as HTMLInputElement
  let valor = input.value.replace(/\D/g, '')

  if (valor.length >= 2) {
    valor = valor.substring(0, 2) + ':' + valor.substring(2, 4)
  }

  formData.value[campo] = valor
}

const convertToISOTime = (timeStr: string) => {
  if (!timeStr || timeStr.length < 5) return null
  const [hours, minutes] = timeStr.split(':')
  if (!hours || !minutes) return null

  const today = new Date()
  today.setHours(parseInt(hours), parseInt(minutes), 0, 0)
  return today.toISOString()
}

const salvar = async () => {
  if (!form.value?.validate()) return

  loading.value = true
  try {
    const medicoData = {
      experiencia: parseInt(formData.value.experiencia) || 0,
      foco: formData.value.foco,
      perfil: formData.value.perfil,
      carreira: formData.value.carreira,
      destaques: formData.value.destaques,
      horarioInicio: formData.value.horarioInicio ? convertToISOTime(formData.value.horarioInicio) : null,
      horarioFim: formData.value.horarioFim ? convertToISOTime(formData.value.horarioFim) : null,
      diaFuncionamentoInicio: formData.value.diaFuncionamentoInicio,
      diaFuncionamentoFim: formData.value.diaFuncionamentoFim
    }

    const response = await medicoService.updateMedico(medicoData)
    if (response.success) {
         toast.success(t('editarPerfilPublico.updateSuccess'),{ autoClose: 4000 })
    }

  } catch (error) {
    toast.error(t('editarPerfilPublico.updateError') + ' ' + getErrorMessage(error, t('editarPerfilPublico.unknownError')))
    console.error('Erro ao salvar:', error)
  } finally {
    loading.value = false
  }
}

const cancelar = () => {
  router.push('/medico/perfil')
}


const carregarDados = async () => {
  loadingData.value = true
  try {
    const payload = getPayload()
    const medicoId = payload?.user?.medico?.id
    const response = await medicoService.getMedicoById(medicoId)
    const medicoData = response.data

    if (medicoData) {
      formData.value.experiencia = medicoData.experiencia ? String(medicoData.experiencia) : ''
      formData.value.foco = medicoData.foco || ''
      formData.value.perfil = medicoData.perfil || ''
      formData.value.carreira = medicoData.carreira || ''
      formData.value.destaques = medicoData.destaques || ''
      formData.value.horarioInicio = medicoData.horarioInicio ? new Date(medicoData.horarioInicio).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }) : ''
      formData.value.horarioFim = medicoData.horarioFim ? new Date(medicoData.horarioFim).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }) : ''
      formData.value.diaFuncionamentoInicio = medicoData.diaFuncionamentoInicio || ''
      formData.value.diaFuncionamentoFim = medicoData.diaFuncionamentoFim || ''

      displayData.value.nome = medicoData.usuario?.nome || ''
      displayData.value.avatarUrl = medicoData.avatarUrl || ''
      displayData.value.especializacao = medicoData.especializacao || ''
      displayData.value.crm = medicoData.crm || ''
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
  } finally {
    loadingData.value = false
  }
}

onMounted(() => {
  carregarDados()
})
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #2196F3 0%, #00c6fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.profile-card {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);
  position: relative;
  overflow: hidden;
  border-radius: 20px;
}

.profile-header {
  padding: 2rem;
  position: relative;
}

.profile-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
  opacity: 0.3;
}

.avatar-container {
  position: relative;
  display: inline-block;
}

.profile-avatar {
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.1);
}

.info-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.section-title {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #dee2e6;
  font-weight: 600;
  font-size: 1.2rem;
  color: #495057;
}

.field-label {
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
}

.save-btn {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  box-shadow: 0 4px 20px rgba(0, 198, 254, 0.3) !important;
  transition: all 0.3s ease;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 198, 254, 0.4) !important;
}

.v-card {
  transition: all 0.3s ease;
}

.v-card:hover:not(.no-hover) {
  transform: translateY(-2px);
}

.v-textarea :deep(.v-field__input) {
  line-height: 1.6;
}

.v-text-field :deep(.v-field--focused .v-field__outline) {
  border-color: #42A5F5 !important;
}

.v-select :deep(.v-field--focused .v-field__outline) {
  border-color: #42A5F5 !important;
}

/* Skeleton Styles */
.skeleton-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-text {
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-title {
  height: 24px;
  width: 80%;
  margin: 0 auto;
}

.skeleton-subtitle {
  height: 16px;
  width: 60%;
  margin: 0 auto;
}

.skeleton-paragraph {
  height: 16px;
  width: 100%;
}

.skeleton-field {
  height: 56px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 12px;
}

.skeleton-button {
  width: 120px;
  height: 48px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 24px;
}

.info-chip {
  background: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
