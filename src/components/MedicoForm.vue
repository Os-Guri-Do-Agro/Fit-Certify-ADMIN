<template>
  <div>
    <!-- Informações Profissionais -->
    <template v-if="currentStep === 2">
      <v-form>
        <VRow class="px-4 px-md-8">
          <VCol class="mb-6 mt-10 mt-md-0" cols="12">
            <div class="d-flex align-center ga-3">
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #42A5F5 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-stethoscope</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                {{ t('medicoForm.professionalInfo.title') }}
              </h2>
            </div>
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <VTextField
              id="telefone"
              v-maska="'(##) #####-####'"
              :model-value="form.telefone"
              @update:model-value="form.telefone = $event"
              :rules="[rules.required]"
              name="telefone"
              :placeholder="t('medicoForm.professionalInfo.phonePlaceholder')"
              :label="t('medicoForm.professionalInfo.phone')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <VTextField
              id="crm"
              :model-value="form.crm"
              @update:model-value="form.crm = $event"
              :rules="[rules.required]"
              name="crm"
              :placeholder="t('medicoForm.professionalInfo.crmPlaceholder')"
              :label="t('medicoForm.professionalInfo.crm')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <v-select
              id="ufCrm"
              :model-value="form.ufCrm"
              @update:model-value="form.ufCrm = $event"
              :items="UFlist"
              :rules="[rules.required]"
              :placeholder="t('medicoForm.professionalInfo.selectPlaceholder')"
              :label="t('medicoForm.professionalInfo.ufCrm')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <VTextField
              id="especializacao"
              :model-value="form.especializacao"
              @update:model-value="form.especializacao = $event"
              name="especializacao"
              :placeholder="t('medicoForm.professionalInfo.specializationPlaceholder')"
              :label="t('medicoForm.professionalInfo.specialization')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <VTextField
              id="experiencia"
              :model-value="form.experiencia"
              @update:model-value="form.experiencia = $event"
              type="number"
              name="experiencia"
              :placeholder="t('medicoForm.professionalInfo.experiencePlaceholder')"
              :label="t('medicoForm.professionalInfo.experience')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <VTextField
              id="foco"
              :model-value="form.foco"
              @update:model-value="form.foco = $event"
              name="foco"
              :placeholder="t('medicoForm.professionalInfo.focusPlaceholder')"
              :label="t('medicoForm.professionalInfo.focus')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <v-textarea
              id="perfil"
              :model-value="form.perfil"
              @update:model-value="form.perfil = $event"
              name="perfil"
              :placeholder="t('medicoForm.professionalInfo.profilePlaceholder')"
              :label="t('medicoForm.professionalInfo.profile')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
              rows="3"
              no-resize
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <VTextField
              id="carreira"
              :model-value="form.carreira"
              @update:model-value="form.carreira = $event"
              name="carreira"
              :placeholder="t('medicoForm.professionalInfo.careerPlaceholder')"
              :label="t('medicoForm.professionalInfo.career')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <v-textarea
              id="destaques"
              :model-value="form.destaques"
              @update:model-value="form.destaques = $event"
              name="destaques"
              :placeholder="t('medicoForm.professionalInfo.highlightsPlaceholder')"
              :label="t('medicoForm.professionalInfo.highlights')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
              rows="3"
              no-resize
            />
          </VCol>
        </VRow>
      </v-form>
    </template>

    <!-- Endereço e Redes Sociais -->
    <template v-if="currentStep === 3">
      <v-form>
        <VRow class="px-4 px-md-8">
          <VCol class="mb-6 mt-10 mt-md-0" cols="12">
            <div class="d-flex align-center ga-3">
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #42A5F5 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-map-marker</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                {{ t('medicoForm.address.title') }}
              </h2>
            </div>
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="4">
            <VTextField
              id="cep"
              v-maska="'#####-###'"
              :model-value="form.cep"
              @update:model-value="form.cep = $event"
              @blur="buscarCep(form.cep)"
              :loading="loadingCep"
              :rules="[rules.required]"
              name="cep"
              :placeholder="t('medicoForm.address.zipCodePlaceholder')"
              :label="t('medicoForm.address.zipCode')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="8">
            <VTextField
              id="rua"
              :model-value="form.rua"
              @update:model-value="form.rua = $event"
              :rules="[rules.required]"
              name="rua"
              :placeholder="t('medicoForm.address.streetPlaceholder')"
              :label="t('medicoForm.address.street')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="4">
            <VTextField
              id="numero"
              :model-value="form.numero"
              @update:model-value="form.numero = $event"
              :rules="[rules.required]"
              name="numero"
              :placeholder="t('medicoForm.address.numberPlaceholder')"
              :label="t('medicoForm.address.number')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="8">
            <VTextField
              id="bairro"
              :model-value="form.bairro"
              @update:model-value="form.bairro = $event"
              :rules="[rules.required]"
              name="bairro"
              :placeholder="t('medicoForm.address.neighborhoodPlaceholder')"
              :label="t('medicoForm.address.neighborhood')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="8">
            <VTextField
              id="cidade"
              :model-value="form.cidade"
              @update:model-value="form.cidade = $event"
              :rules="[rules.required]"
              name="cidade"
              :placeholder="t('medicoForm.address.cityPlaceholder')"
              :label="t('medicoForm.address.city')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="4">
            <v-select
              id="uf"
              :model-value="form.uf"
              @update:model-value="form.uf = $event"
              :items="UFlist"
              :rules="[rules.required]"
              :placeholder="t('medicoForm.professionalInfo.selectPlaceholder')"
              :label="t('medicoForm.address.state')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>
        </VRow>

        <VRow class="px-4 px-md-8">
          <VCol class="mb-6 mt-6" cols="12">
            <div class="d-flex align-center ga-3">
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #42A5F5 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-share-variant</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                {{ t('medicoForm.socialMedia.title') }}
              </h2>
            </div>
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <VTextField
              id="linkInstagram"
              :model-value="form.linkInstagram"
              @update:model-value="form.linkInstagram = $event"
              name="linkInstagram"
              :placeholder="t('medicoForm.socialMedia.instagramPlaceholder')"
              :label="t('medicoForm.socialMedia.instagram')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <VTextField
              id="linkFacebook"
              :model-value="form.linkFacebook"
              @update:model-value="form.linkFacebook = $event"
              name="linkFacebook"
              :placeholder="t('medicoForm.socialMedia.facebookPlaceholder')"
              :label="t('medicoForm.socialMedia.facebook')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>
        </VRow>
      </v-form>
    </template>

    <!-- Documentação e Horários -->
    <template v-if="currentStep === 4">
      <v-form>
        <VRow class="px-4 px-md-8">
          <VCol class="mb-6 mt-10 mt-md-0" cols="12">
            <div class="d-flex align-center ga-3">
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #42A5F5 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-clock</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                {{ t('medicoForm.schedule.title') }}
              </h2>
            </div>
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <v-select
              id="diaFuncionamentoInicio"
              :model-value="form.diaFuncionamentoInicio"
              @update:model-value="form.diaFuncionamentoInicio = $event"
              :items="diasSemana"
              :placeholder="t('medicoForm.professionalInfo.selectPlaceholder')"
              :label="t('medicoForm.schedule.startDay')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <v-select
              id="diaFuncionamentoFim"
              :model-value="form.diaFuncionamentoFim"
              @update:model-value="form.diaFuncionamentoFim = $event"
              :items="diasSemana"
              :placeholder="t('medicoForm.professionalInfo.selectPlaceholder')"
              :label="t('medicoForm.schedule.endDay')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <VTextField
              id="horarioInicio"
              v-maska="'##:##'"
              :model-value="form.horarioInicio"
              @update:model-value="form.horarioInicio = $event"
              name="horarioInicio"
              :placeholder="t('medicoForm.schedule.startTimePlaceholder')"
              :label="t('medicoForm.schedule.startTime')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <VTextField
              id="horarioFim"
              v-maska="'##:##'"
              :model-value="form.horarioFim"
              @update:model-value="form.horarioFim = $event"
              name="horarioFim"
              :placeholder="t('medicoForm.schedule.endTimePlaceholder')"
              :label="t('medicoForm.schedule.endTime')"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>
        </VRow>

        <VRow class="px-4 px-md-8">
          <VCol class="mb-6 mt-6" cols="12">
            <div class="d-flex align-center ga-3">
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #42A5F5 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-file-document</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                {{ t('medicoForm.signature.title') }}
              </h2>
            </div>
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <VFileInput
              prepend-icon=""
              name="assinatura"
              id="assinatura"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
              accept=".pdf, image/*"
              :label="t('medicoForm.signature.label')"
              @update:model-value="handleFileChange"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <v-checkbox
              :model-value="form.declaraVeracidade"
              @update:model-value="form.declaraVeracidade = $event"
              :rules="[rules.required]"
              color="success"
              class="font-weight-medium"
              :label="t('medicoForm.terms.declareTruth')"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <v-checkbox
              :model-value="form.aceitaCompartilharDados"
              @update:model-value="form.aceitaCompartilharDados = $event"
              :rules="[rules.required]"
              color="success"
              class="font-weight-medium"
              :label="t('medicoForm.terms.shareData')"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <v-checkbox
              :model-value="form.aceitaTermos"
              @update:model-value="form.aceitaTermos = $event"
              :rules="[rules.required]"
              color="success"
              class="font-weight-medium"
            >
              <template #label>
                <span>
                  {{ t('medicoForm.terms.acceptTerms') }}
                  <span class="cursor-pointer text-decoration-underline" style="color: #42A5F5"
                    @click="showModalTerms = true">
                    {{ t('medicoForm.terms.termsLink') }}</span>.
                </span>
              </template>
            </v-checkbox>
          </VCol>
        </VRow>
      </v-form>
    </template>

    <!-- Modal de Termos -->
    <v-dialog v-model="showModalTerms" width="600" height="800">
      <v-card class="py-5 px-md-3 custom-scroll" rounded="xl">
        <v-card-title class="text-center text-h5" style="color: #42A5F5; white-space: normal; word-wrap: break-word;">
          {{ t('medicoForm.termsModal.title') }}
        </v-card-title>
        <v-card-text>
          <p class="mb-5"><strong>{{ t('medicoForm.termsModal.introduction') }}</strong></p>
          <p>
            {{ t('medicoForm.termsModal.welcome') }} <strong>{{ t('medicoForm.termsModal.company') }}</strong> {{ t('medicoForm.termsModal.companyRef') }} <br><br>
            {{ t('medicoForm.termsModal.termsIntro') }}
          </p>
          <p>
            {{ t('medicoForm.termsModal.privacyPolicy') }} <strong>{{ t('medicoForm.termsModal.privacyPolicyBold') }}</strong> {{ t('medicoForm.termsModal.privacyPolicyText') }} <br><br>
            {{ t('medicoForm.termsModal.agreement') }}
          </p>
          <p>
            {{ t('medicoForm.termsModal.disagree') }} <strong>{{ t('medicoForm.termsModal.email') }}</strong> {{ t('medicoForm.termsModal.disagreeEnd') }} <br><br>
            {{ t('medicoForm.termsModal.applies') }}
          </p>
          <p>
            {{ t('medicoForm.termsModal.integration') }} <strong>{{ t('medicoForm.termsModal.appleHealth') }}</strong> {{ t('medicoForm.termsModal.and') }}
            <strong>{{ t('medicoForm.termsModal.googleHealth') }}</strong>{{ t('medicoForm.termsModal.integrationText') }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="w-100 text-white font-weight-bold" @click="maisTermos" height="50px" rounded="lg"
            style="background-color: #42A5F5">
            {{ t('medicoForm.termsModal.readMore') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { vMaska } from 'maska/vue'
import { toast } from 'vue3-toastify'
import { getErrorMessage } from '@/common/error.utils'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  currentStep: {
    type: Number,
    required: true
  },
  form: {
    type: Object,
    required: true
  },
  loadingCep: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['buscarCep', 'handleFileChange'])

const showModalTerms = ref(false)

const UFlist = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

const diasSemana = [
  t('medicoForm.daysOfWeek.monday'),
  t('medicoForm.daysOfWeek.tuesday'),
  t('medicoForm.daysOfWeek.wednesday'),
  t('medicoForm.daysOfWeek.thursday'),
  t('medicoForm.daysOfWeek.friday'),
  t('medicoForm.daysOfWeek.saturday'),
  t('medicoForm.daysOfWeek.sunday')
]

const rules = {
  required: (value) => !!value || t('medicoForm.required')
}

const buscarCep = (cep) => {
  emit('buscarCep', cep)
}

const handleFileChange = (file) => {
  emit('handleFileChange', file)
}

const maisTermos = () => {
  showModalTerms.value = false
  window.open('/politicaPrivacidade', '_blank')
}
</script>

<style scoped>
.custom-scroll {
  overflow-y: auto;
}

.custom-scroll::-webkit-scrollbar {
  display: none;
}

.custom-scroll {
  scrollbar-width: none;
}

.custom-field .v-field {
  border: 1px solid #e0e7ff;
  transition: all 0.3s ease;
}

.custom-field .v-field:hover {
  border-color: #42A5F5;
}

.custom-field .v-field--focused {
  border-color: #42A5F5 !important;
  box-shadow: 0 0 0 2px rgba(0, 198, 254, 0.2) !important;
}

.custom-field .v-label {
  color: #64748b;
  font-weight: 500;
}

.custom-field .v-field--focused .v-label {
  color: #42A5F5 !important;
}
</style>
