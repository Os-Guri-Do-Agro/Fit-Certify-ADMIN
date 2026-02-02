<template>
  <v-container class="py-8">
    <v-card elevation="4" rounded="xl" class="mx-auto" max-width="1200">
      <div class="header-section">
        <div class="d-flex align-center justify-space-between mb-2">
          <div class="d-flex align-center ga-3">
            <div class="icon-container">
              <v-icon color="white" size="24">mdi-clipboard-pulse</v-icon>
            </div>
            <h1 class="header-title">{{ $t('preRaceHealthCheck.title') }}</h1>
          </div>
          <img src="/favicon.png" alt="Logo" class="header-logo" />
        </div>
        <p class="header-subtitle">
          {{ $t('preRaceHealthCheck.subtitle') }}
        </p>
      </div>

      <v-card-text class="pa-6 pa-md-8">
        <div v-if="loadingFormularios" class="d-flex justify-center align-center" style="min-height: 400px;">
          <v-progress-circular indeterminate color="#42A5F5" size="64"></v-progress-circular>
        </div>
        <v-stepper v-else v-model="currentStep" elevation="0" class="custom-stepper">
          <v-stepper-header>
            <template v-for="(grupo, index) in perguntasPorPagina" :key="index">
              <v-stepper-item :complete="currentStep > index + 1" :value="index + 1" :title="`${$t('preRaceHealthCheck.page')} ${index + 1}`" />
              <v-divider v-if="index < perguntasPorPagina.length - 1" />
            </template>
          </v-stepper-header>

          <v-stepper-window>
            <v-stepper-window-item v-for="(grupo, index) in perguntasPorPagina" :key="index" :value="index + 1">
              <div class="section-card">
                <div class="section-header">
                  <div class="section-icon-wrapper">
                    <v-icon color="white" size="20">mdi-clipboard-text</v-icon>
                  </div>
                  <h2 class="section-title">{{ $t('preRaceHealthCheck.healthQuestionnaire') }}</h2>
                </div>

                <v-row class="mt-4">
                  <v-col v-for="pergunta in grupo" :key="pergunta.id" cols="12">
                    <div class="question-label">
                      {{ pergunta.pergunta }}
                    </div>
                    <div class="justification-text">
                      <v-icon size="14" color="#6c757d">mdi-information-outline</v-icon>
                      {{ pergunta.justificativa }}
                    </div>

                    <v-radio-group
                      v-if="pergunta.tipo === 'boolean'"
                      v-model="formData[pergunta.id]"
                      inline
                      hide-details
                      class="mt-2"
                    >
                      <v-radio :label="$t('preRaceHealthCheck.yes')" :value="true" color="success"></v-radio>
                      <v-radio :label="$t('preRaceHealthCheck.no')" :value="false" color="success"></v-radio>
                    </v-radio-group>

                    <v-text-field
                      v-else-if="pergunta.tipo === 'string'"
                      v-model="formData[pergunta.id]"
                      :placeholder="$t('preRaceHealthCheck.placeholder')"
                      variant="outlined"
                      density="comfortable"
                      rounded="lg"
                      hide-details
                      class="mt-2 custom-field"
                    />
                  </v-col>
                </v-row>
              </div>
            </v-stepper-window-item>
          </v-stepper-window>

          <div class="d-flex justify-space-between mt-8 pt-6" style="border-top: 1px solid #e9ecef;">
            <v-btn
              v-if="currentStep > 1"
              variant="outlined"
              color="grey-darken-1"
              rounded="lg"
              size="large"
              @click="currentStep--"
              :disabled="loading"
            >
              <v-icon left>mdi-chevron-left</v-icon>
              {{ $t('preRaceHealthCheck.back') }}
            </v-btn>
            <v-spacer v-else />

            <v-btn
              v-if="currentStep < totalSteps"
              color="#42A5F5"
              rounded="lg"
              size="large"
              class="text-white"
              @click="currentStep++"
            >
              {{ $t('preRaceHealthCheck.next') }}
              <v-icon right>mdi-chevron-right</v-icon>
            </v-btn>
            <v-btn
              v-else
              color="#42A5F5"
              rounded="lg"
              size="large"
              class="text-white submit-btn"
              @click="handleSubmit"
              :loading="loading"
            >
              <v-icon left>mdi-check</v-icon>
              {{ $t('preRaceHealthCheck.submit') }}
            </v-btn>
          </div>
        </v-stepper>
      </v-card-text>
    </v-card>

    <v-dialog v-model="successDialog" persistent max-width="500">
      <v-card rounded="xl">
        <v-card-text class="text-center pa-8">
          <div class="success-icon-wrapper mx-auto mb-4">
            <v-icon size="80" color="white">mdi-check-circle</v-icon>
          </div>
          <h2 class="text-h5 font-weight-bold mb-3">{{ $t('preRaceHealthCheck.successTitle') }}</h2>
          <p class="text-body-1 text-grey-darken-1">{{ $t('preRaceHealthCheck.successMessage') }}</p>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-btn
            color="#42A5F5"
            variant="flat"
            rounded="lg"
            block
            size="large"
            @click="voltarFormularios"
          >
            {{ $t('preRaceHealthCheck.backToForms') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import type { PreRaceHealthCheckData } from '@/Interfaces/pre-race-health-check.interface'
import formurarioMedicoService from '@/services/formulario-medico/formurarioMedico-service'

const router = useRouter()
const { t } = useI18n()
const formRef = ref()
const loading = ref(false)
const loadingFormularios = ref(true)
const currentStep = ref(1)
const formularios = ref<any[]>([])
const formData = ref<Record<string, any>>({})
const successDialog = ref(false)

const { locale } = useI18n()

const perguntas = computed(() => {
  const perguntasOriginais = formularios.value[0]?.perguntas || []
  return perguntasOriginais.map((p: any) => ({
    ...p,
    pergunta: locale.value === 'en' && p.en_pergunta ? p.en_pergunta : p.pergunta,
    justificativa: locale.value === 'en' && p.en_justificativa ? p.en_justificativa : p.justificativa
  }))
})

const perguntasPorPagina = computed(() => {
  const porPagina = 3
  const grupos: any[][] = []
  for (let i = 0; i < perguntas.value.length; i += porPagina) {
    grupos.push(perguntas.value.slice(i, i + porPagina))
  }
  return grupos
})

const totalSteps = computed(() => perguntasPorPagina.value.length)

const bsucarFormularios = async () => {
  loadingFormularios.value = true
  try {
    const response = await formurarioMedicoService.buscarFormularios()
    if (response.data?.[0]?.jaRespondeu) {
      window.location.href = '/Atleta-Screens/formularios'
      return
    }
    formularios.value = response.data
    perguntas.value.forEach((p: any) => {
      formData.value[p.id] = null
    })
  } catch (error) {
    console.error('Erro ao buscar formularios:', error)
    toast.error('Erro ao carregar os formularios.')
  } finally {
    loadingFormularios.value = false
  }
}

const props = defineProps<{
  eventoId?: number | string
}>()

const emit = defineEmits<{
  submit: [data: PreRaceHealthCheckData]
  cancel: []
}>()

const handleSubmit = async () => {
  loading.value = true
  try {
    const data = {
      eventoId: props.eventoId,
      ...formData.value
    }
    await formurarioMedicoService.responderFormulario(data)
    successDialog.value = true
    resetForm()
  } catch (error) {
    console.error('Erro ao enviar check-in:', error)
    toast.error('Erro ao enviar check-in. Tente novamente.')
  } finally {
    loading.value = false
  }
}

const voltarFormularios = () => {
  window.location.href = '/Atleta-Screens/formularios'
}

const resetForm = () => {
  perguntas.value.forEach((p: any) => {
    formData.value[p.id] = null
  })
}

onMounted(() => {
  bsucarFormularios()
})
</script>

<style scoped>
.custom-stepper {
  background: transparent;
}

.custom-stepper :deep(.v-stepper-header) {
  box-shadow: none;
  margin-bottom: 24px;
}

.custom-stepper :deep(.v-stepper-item__avatar) {
  background: #42A5F5 !important;
}

.custom-stepper :deep(.v-stepper-item--complete .v-stepper-item__avatar) {
  background: #88ce0d !important;
}

.header-section {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  padding: 32px 24px;
  border-radius: 20px 20px 0 0;
  margin: -1px -1px 0 -1px;
}

.icon-container {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.header-title {
  color: white;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0;
}

.header-subtitle {
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.95rem;
  margin: 8px 0 0 0;
  line-height: 1.5;
}

.header-logo {
  height: 48px;
  width: auto;
  filter: brightness(0) invert(1);
}

.section-card {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.section-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.section-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #42A5F5 0%, #0099cc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);
}

.section-title {
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.3px;
  margin: 0;
}

.question-label {
  color: #495057;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.5;
}

.custom-field {
  transition: all 0.3s ease;
}

.custom-field:hover {
  transform: translateY(-1px);
}

.custom-field :deep(.v-field) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e7ff;
  transition: all 0.3s ease;
}

.custom-field :deep(.v-field:hover) {
  border-color: #42A5F5;
  box-shadow: 0 4px 12px rgba(0, 198, 254, 0.15);
}

.custom-field :deep(.v-field--focused) {
  border-color: #42A5F5 !important;
  box-shadow: 0 0 0 2px rgba(0, 198, 254, 0.2) !important;
}

.submit-btn {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  box-shadow: 0 4px 20px rgba(0, 198, 254, 0.3) !important;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 198, 254, 0.4) !important;
}

:deep(.v-radio-group) {
  margin-top: 0;
}

:deep(.v-radio) {
  margin-right: 24px;
}

:deep(.v-selection-control__wrapper) {
  margin-right: 8px;
}

.justification-text {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: #6c757d;
  font-size: 0.8rem;
  line-height: 1.4;
  padding: 6px 0;
  font-style: italic;
  opacity: 0.85;
}

.success-icon-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #66BB6A 0%, #43A047 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(67, 160, 71, 0.3);
}
</style>
