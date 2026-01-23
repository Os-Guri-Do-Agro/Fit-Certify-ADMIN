<template>
  <v-container class="py-8">
    <v-card elevation="4" rounded="xl" class="mx-auto" max-width="1200">
      <div class="header-section">
        <div class="d-flex align-center justify-space-between mb-2">
          <div class="d-flex align-center ga-3">
            <div class="icon-container">
              <v-icon color="white" size="24">mdi-clipboard-pulse</v-icon>
            </div>
            <h1 class="header-title">Check-in de Saúde Pré-Prova</h1>
          </div>
          <img src="/favicon.png" alt="Logo" class="header-logo" />
        </div>
        <p class="header-subtitle">
          Responda as perguntas abaixo para auxiliar a equipe médica. Todos os campos são opcionais.
        </p>
      </div>

      <v-card-text class="pa-6 pa-md-8">
        <v-stepper v-model="currentStep" elevation="0" class="custom-stepper">
          <v-stepper-header>
            <v-stepper-item :complete="currentStep > 1" :value="1" title="Sintomas" />
            <v-divider />
            <v-stepper-item :complete="currentStep > 2" :value="2" title="Saúde Geral" />
            <v-divider />
            <v-stepper-item :complete="currentStep > 3" :value="3" title="Sono e Medicação" />
            <v-divider />
            <v-stepper-item :value="4" title="Condições Físicas" />
          </v-stepper-header>

          <v-stepper-window>
            <v-stepper-window-item :value="1">
              <v-form ref="formRef">
                <div class="section-card">
                  <div class="section-header">
                    <div class="section-icon-wrapper">
                      <v-icon color="white" size="20">mdi-heart-pulse</v-icon>
                    </div>
                    <h2 class="section-title">Sintomas Cardiovasculares e Respiratórios</h2>
                  </div>

                  <v-row class="mt-4">
                    <v-col cols="12">
                      <div class="question-label">
                        Sentiu dor ou pressão no peito, palpitações ou falta de ar fora do comum nas últimas 48 horas?
                      </div>
                      <div class="justification-text">
                        <v-icon size="14" color="#6c757d">mdi-information-outline</v-icon>
                        Identifica sinais de alerta cardíaco agudo que podem evoluir para eventos graves, como infarto ou arritmias, durante o esforço máximo.
                      </div>
                      <v-radio-group v-model="formData.sintomasCardiovasculares" inline hide-details class="mt-2">
                        <v-radio label="Sim" :value="true" color="success"></v-radio>
                        <v-radio label="Não" :value="false" color="success"></v-radio>
                      </v-radio-group>
                    </v-col>

                    <v-col cols="12">
                      <div class="question-label">
                        Apresentou tontura, escurecimento visual ou desmaio nos últimos dois dias?
                      </div>
                      <div class="justification-text">
                        <v-icon size="14" color="#6c757d">mdi-information-outline</v-icon>
                        Indica instabilidade no sistema circulatório ou desequilíbrios metabólicos que podem causar colapsos durante a corrida.
                      </div>
                      <v-radio-group v-model="formData.tonturaDesmaiо" inline hide-details class="mt-2">
                        <v-radio label="Sim" :value="true" color="success"></v-radio>
                        <v-radio label="Não" :value="false" color="success"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </div>
              </v-form>
            </v-stepper-window-item>

            <v-stepper-window-item :value="2">
              <div class="section-card">
                <div class="section-header">
                  <div class="section-icon-wrapper">
                    <v-icon color="white" size="20">mdi-thermometer</v-icon>
                  </div>
                  <h2 class="section-title">Condições Gerais de Saúde</h2>
                </div>

                <v-row class="mt-4">
                  <v-col cols="12" md="6">
                    <div class="question-label">
                      Teve febre ou calafrios nas últimas 24 horas?
                    </div>
                    <div class="justification-text">
                      <v-icon size="14" color="#6c757d">mdi-information-outline</v-icon>
                      A febre prejudica a regulação térmica do corpo e aumenta o risco de miocardite viral, uma das principais causas de morte súbita em atletas.
                    </div>
                    <v-radio-group v-model="formData.febreCalafrios" inline hide-details class="mt-2">
                      <v-radio label="Sim" :value="true" color="success"></v-radio>
                      <v-radio label="Não" :value="false" color="success"></v-radio>
                    </v-radio-group>
                  </v-col>

                  <v-col cols="12" md="6">
                    <div class="question-label">
                      Teve vômito ou náusea persistente nas últimas 12 horas?
                    </div>
                    <div class="justification-text">
                      <v-icon size="14" color="#6c757d">mdi-information-outline</v-icon>
                      Indica um estado de desidratação prévia e perda de eletrólitos que compromete a função muscular e a segurança cardiovascular.
                    </div>
                    <v-radio-group v-model="formData.vomitoNausea" inline hide-details class="mt-2">
                      <v-radio label="Sim" :value="true" color="success"></v-radio>
                      <v-radio label="Não" :value="false" color="success"></v-radio>
                    </v-radio-group>
                  </v-col>

                  <v-col cols="12">
                    <div class="question-label">
                      Você se sente mentalmente alerta e orientado neste momento?
                    </div>
                    <div class="justification-text">
                      <v-icon size="14" color="#6c757d">mdi-information-outline</v-icon>
                      Alterações na clareza mental podem ser sinais precoces de desequilíbrio eletrolítico ou estresse sistêmico severo.
                    </div>
                    <v-radio-group v-model="formData.alertaMental" inline hide-details class="mt-2">
                      <v-radio label="Sim" :value="true" color="success"></v-radio>
                      <v-radio label="Não" :value="false" color="success"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </div>
            </v-stepper-window-item>

            <v-stepper-window-item :value="3">
              <div class="section-card mb-6">
                <div class="section-header">
                  <div class="section-icon-wrapper">
                    <v-icon color="white" size="20">mdi-sleep</v-icon>
                  </div>
                  <h2 class="section-title">Sono e Recuperação</h2>
                </div>

                <v-row class="mt-4">
                  <v-col cols="12" md="6">
                    <div class="question-label mb-1">
                      Quantas horas de sono você teve na última noite?
                    </div>
                    <div class="justification-text mb-2">
                      <v-icon size="14" color="#6c757d">mdi-information-outline</v-icon>
                      A privação de sono reduz a capacidade de dissipar calor e prejudica a coordenação motora, elevando o risco de intercorrências térmicas e quedas.
                    </div>
                    <v-text-field
                      v-model.number="formData.horasSono"
                      variant="outlined"
                      rounded="lg"
                      bg-color="white"
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      suffix="horas"
                      prepend-inner-icon="mdi-clock-outline"
                      color="#42A5F5"
                      class="custom-field"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>

              <div class="section-card">
                <div class="section-header">
                  <div class="section-icon-wrapper">
                    <v-icon color="white" size="20">mdi-pill</v-icon>
                  </div>
                  <h2 class="section-title">Medicamentos e Suplementos</h2>
                </div>

                <v-row class="mt-4">
                  <v-col cols="12">
                    <div class="question-label">
                      Consumiu suplemento termogênico, pré-treino ou estimulante nas últimas 12 horas?
                    </div>
                    <div class="justification-text">
                      <v-icon size="14" color="#6c757d">mdi-information-outline</v-icon>
                      Essas substâncias podem elevar a frequência cardíaca e a pressão arterial de forma perigosa, além de mascarar sinais de exaustão do organismo.
                    </div>
                    <v-radio-group v-model="formData.suplementoEstimulante" inline hide-details class="mt-2">
                      <v-radio label="Sim" :value="true" color="success"></v-radio>
                      <v-radio label="Não" :value="false" color="success"></v-radio>
                    </v-radio-group>
                  </v-col>

                  <v-col cols="12">
                    <div class="question-label">
                      Tomou algum anti-inflamatório ou analgésico nas últimas 6 horas?
                    </div>
                    <div class="justification-text">
                      <v-icon size="14" color="#6c757d">mdi-information-outline</v-icon>
                      O uso de anti-inflamatórios antes de exercícios intensos aumenta significativamente o risco de lesão renal aguda devido à desidratação.
                    </div>
                    <v-radio-group v-model="formData.antiInflamatorioAnalgesico" inline hide-details class="mt-2">
                      <v-radio label="Sim" :value="true" color="success"></v-radio>
                      <v-radio label="Não" :value="false" color="success"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </div>
            </v-stepper-window-item>

            <v-stepper-window-item :value="4">
              <div class="section-card">
                <div class="section-header">
                  <div class="section-icon-wrapper">
                    <v-icon color="white" size="20">mdi-run</v-icon>
                  </div>
                  <h2 class="section-title">Condições Físicas e Ambientais</h2>
                </div>

                <v-row class="mt-4">
                  <v-col cols="12">
                    <div class="question-label">
                      Realizou viagem longa ou mudança brusca de altitude na última semana?
                    </div>
                    <div class="justification-text">
                      <v-icon size="14" color="#6c757d">mdi-information-outline</v-icon>
                      O jet lag e a falta de aclimatação alteram a resposta cardiovascular e o estado de hidratação, exigindo atenção redobrada da equipe médica.
                    </div>
                    <v-radio-group v-model="formData.viagemAltitude" inline hide-details class="mt-2">
                      <v-radio label="Sim" :value="true" color="success"></v-radio>
                      <v-radio label="Não" :value="false" color="success"></v-radio>
                    </v-radio-group>
                  </v-col>

                  <v-col cols="12">
                    <div class="question-label">
                      Sente dor articular ou muscular que altere sua forma de correr?
                    </div>
                    <div class="justification-text">
                      <v-icon size="14" color="#6c757d">mdi-information-outline</v-icon>
                      Permite prever lesões ortopédicas agudas causadas por compensações biomecânicas durante a prova.
                    </div>
                    <v-radio-group v-model="formData.dorArticularMuscular" inline hide-details class="mt-2">
                      <v-radio label="Sim" :value="true" color="success"></v-radio>
                      <v-radio label="Não" :value="false" color="success"></v-radio>
                    </v-radio-group>
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
              Voltar
            </v-btn>
            <v-spacer v-else />
            
            <v-btn
              v-if="currentStep < 4"
              color="#42A5F5"
              rounded="lg"
              size="large"
              class="text-white"
              @click="currentStep++"
            >
              Próximo
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
              Enviar Check-in
            </v-btn>
          </div>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import type { PreRaceHealthCheckData } from '@/Interfaces/pre-race-health-check.interface'

const formRef = ref()
const loading = ref(false)
const currentStep = ref(1)

const formData = ref<PreRaceHealthCheckData>({
  sintomasCardiovasculares: null,
  tonturaDesmaiо: null,
  febreCalafrios: null,
  vomitoNausea: null,
  alertaMental: null,
  horasSono: null,
  suplementoEstimulante: null,
  antiInflamatorioAnalgesico: null,
  viagemAltitude: null,
  dorArticularMuscular: null,
})

const props = defineProps<{
  eventoId?: number
}>()

const handleSubmit = async () => {
  loading.value = true
  
  try {
    const payload: PreRaceHealthCheckData = {
      ...formData.value,
      dataPreenchimento: new Date().toISOString(),
      eventoId: props.eventoId,
    }

    // Simulação de envio (mocado)
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Check-in enviado (mocado):', payload)
    
    toast.success('Check-in de saúde enviado com sucesso!')
    resetForm()
  } catch (error) {
    console.error('Erro ao enviar check-in:', error)
    toast.error('Erro ao enviar check-in. Tente novamente.')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  formData.value = {
    sintomasCardiovasculares: null,
    tonturaDesmaiо: null,
    febreCalafrios: null,
    vomitoNausea: null,
    alertaMental: null,
    horasSono: null,
    suplementoEstimulante: null,
    antiInflamatorioAnalgesico: null,
    viagemAltitude: null,
    dorArticularMuscular: null,
  }
}
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
</style>
