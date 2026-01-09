<template>
  <div>
    <!-- Informações Profissionais -->
    <template v-if="currentStep === 2">
      <v-form>
        <VRow class="px-4 px-md-8">
          <VCol class="mb-6 mt-10 mt-md-0" cols="12">
            <div class="d-flex align-center ga-3">
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-stethoscope</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                {{ $t('cadastrarFisioterapeuta.professionalInfo.title') }}
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
              :placeholder="$t('cadastrarFisioterapeuta.professionalInfo.phonePlaceholder')"
              :label="$t('cadastrarFisioterapeuta.professionalInfo.phone')"
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
              :placeholder="$t('cadastrarFisioterapeuta.professionalInfo.experiencePlaceholder')"
              :label="$t('cadastrarFisioterapeuta.professionalInfo.experience')"
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
              :placeholder="$t('cadastrarFisioterapeuta.professionalInfo.focusPlaceholder')"
              :label="$t('cadastrarFisioterapeuta.professionalInfo.focus')"
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
              :placeholder="$t('cadastrarFisioterapeuta.professionalInfo.profilePlaceholder')"
              :label="$t('cadastrarFisioterapeuta.professionalInfo.profile')"
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
              :placeholder="$t('cadastrarFisioterapeuta.professionalInfo.careerPlaceholder')"
              :label="$t('cadastrarFisioterapeuta.professionalInfo.career')"
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
              :placeholder="$t('cadastrarFisioterapeuta.professionalInfo.highlightsPlaceholder')"
              :label="$t('cadastrarFisioterapeuta.professionalInfo.highlights')"
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
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-map-marker</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                {{ $t('cadastrarFisioterapeuta.address.title') }}
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
              :placeholder="$t('cadastrarFisioterapeuta.address.zipCodePlaceholder')"
              :label="$t('cadastrarFisioterapeuta.address.zipCode')"
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
              :placeholder="$t('cadastrarFisioterapeuta.address.streetPlaceholder')"
              :label="$t('cadastrarFisioterapeuta.address.street')"
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
              :placeholder="$t('cadastrarFisioterapeuta.address.numberPlaceholder')"
              :label="$t('cadastrarFisioterapeuta.address.number')"
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
              :placeholder="$t('cadastrarFisioterapeuta.address.neighborhoodPlaceholder')"
              :label="$t('cadastrarFisioterapeuta.address.neighborhood')"
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
              :placeholder="$t('cadastrarFisioterapeuta.address.cityPlaceholder')"
              :label="$t('cadastrarFisioterapeuta.address.city')"
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
              :placeholder="$t('cadastrarFisioterapeuta.address.statePlaceholder')"
              :label="$t('cadastrarFisioterapeuta.address.state')"
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
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-share-variant</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                {{ $t('cadastrarFisioterapeuta.socialMedia.title') }}
              </h2>
            </div>
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <VTextField
              id="linkInstagram"
              :model-value="form.linkInstagram"
              @update:model-value="form.linkInstagram = $event"
              name="linkInstagram"
              :placeholder="$t('cadastrarFisioterapeuta.socialMedia.instagramPlaceholder')"
              :label="$t('cadastrarFisioterapeuta.socialMedia.instagram')"
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
              :placeholder="$t('cadastrarFisioterapeuta.socialMedia.facebookPlaceholder')"
              :label="$t('cadastrarFisioterapeuta.socialMedia.facebook')"
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
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-clock</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                {{ $t('cadastrarFisioterapeuta.schedule.title') }}
              </h2>
            </div>
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <v-select
              id="diaFuncionamentoInicio"
              :model-value="form.diaFuncionamentoInicio"
              @update:model-value="form.diaFuncionamentoInicio = $event"
              :items="diasSemana"
              :placeholder="$t('cadastrarFisioterapeuta.schedule.startDayPlaceholder')"
              :label="$t('cadastrarFisioterapeuta.schedule.startDay')"
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
              :placeholder="$t('cadastrarFisioterapeuta.schedule.endDayPlaceholder')"
              :label="$t('cadastrarFisioterapeuta.schedule.endDay')"
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
              :placeholder="$t('cadastrarFisioterapeuta.schedule.startTimePlaceholder')"
              :label="$t('cadastrarFisioterapeuta.schedule.startTime')"
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
              :placeholder="$t('cadastrarFisioterapeuta.schedule.endTimePlaceholder')"
              :label="$t('cadastrarFisioterapeuta.schedule.endTime')"
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
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-file-document</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                {{ $t('cadastrarFisioterapeuta.terms.title') }}
              </h2>
            </div>
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <v-checkbox
              :model-value="form.declaraVeracidade"
              @update:model-value="form.declaraVeracidade = $event"
              :rules="[rules.required]"
              color="success"
              class="font-weight-medium"
              :label="$t('cadastrarFisioterapeuta.terms.declareTruth')"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <v-checkbox
              :model-value="form.aceitaCompartilharDados"
              @update:model-value="form.aceitaCompartilharDados = $event"
              :rules="[rules.required]"
              color="success"
              class="font-weight-medium"
              :label="$t('cadastrarFisioterapeuta.terms.shareData')"
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
                  {{ $t('cadastrarFisioterapeuta.terms.acceptTerms') }}
                  <span class="cursor-pointer text-decoration-underline" style="color: #00c6fe"
                    @click="showModalTerms = true">
                    {{ $t('cadastrarFisioterapeuta.terms.termsLink') }}</span>.
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
        <v-card-title class="text-center text-h5" style="color: #00c6fe; white-space: normal; word-wrap: break-word;">
          {{ $t('cadastrarFisioterapeuta.termsModal.title') }}
        </v-card-title>
        <v-card-text>
          <p class="mb-5"><strong>{{ $t('cadastrarFisioterapeuta.termsModal.introduction') }}</strong></p>
          <p>
            {{ $t('cadastrarFisioterapeuta.termsModal.welcome') }} <strong>{{ $t('cadastrarFisioterapeuta.termsModal.company') }}</strong> {{ $t('cadastrarFisioterapeuta.termsModal.companyRef') }}! <br><br>
            {{ $t('cadastrarFisioterapeuta.termsModal.termsIntro') }}
          </p>
          <p>
            {{ $t('cadastrarFisioterapeuta.termsModal.privacyPolicy') }} <strong>{{ $t('cadastrarFisioterapeuta.termsModal.privacyPolicyBold') }}</strong> {{ $t('cadastrarFisioterapeuta.termsModal.privacyPolicyText') }} <br><br>
            {{ $t('cadastrarFisioterapeuta.termsModal.agreement') }}
          </p>
          <p>
            {{ $t('cadastrarFisioterapeuta.termsModal.disagree') }} <strong>{{ $t('cadastrarFisioterapeuta.termsModal.email') }}</strong> {{ $t('cadastrarFisioterapeuta.termsModal.disagreeEnd') }} <br><br>
            {{ $t('cadastrarFisioterapeuta.termsModal.applies') }}
          </p>
          <p>
            {{ $t('cadastrarFisioterapeuta.termsModal.integration') }} <strong>{{ $t('cadastrarFisioterapeuta.termsModal.appleHealth') }}</strong> {{ $t('cadastrarFisioterapeuta.termsModal.and') }} <strong>{{ $t('cadastrarFisioterapeuta.termsModal.googleHealth') }}</strong>{{ $t('cadastrarFisioterapeuta.termsModal.integrationText') }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="w-100 text-white font-weight-bold" @click="maisTermos" height="50px" rounded="lg"
            style="background-color: #00c6fe">
            {{ $t('cadastrarFisioterapeuta.termsModal.readMore') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { vMaska } from 'maska/vue'
import { toast } from 'vue3-toastify'
import { getErrorMessage } from '@/common/error.utils'

const { t: $t } = useI18n()

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

const diasSemana = ref([
  $t('cadastrarFisioterapeuta.daysOfWeek.monday'),
  $t('cadastrarFisioterapeuta.daysOfWeek.tuesday'),
  $t('cadastrarFisioterapeuta.daysOfWeek.wednesday'),
  $t('cadastrarFisioterapeuta.daysOfWeek.thursday'),
  $t('cadastrarFisioterapeuta.daysOfWeek.friday'),
  $t('cadastrarFisioterapeuta.daysOfWeek.saturday'),
  $t('cadastrarFisioterapeuta.daysOfWeek.sunday')
])

const rules = {
  required: (value) => !!value || $t('cadastrarFisioterapeuta.required')
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
  border-color: #00c6fe;
}

.custom-field .v-field--focused {
  border-color: #00c6fe !important;
  box-shadow: 0 0 0 2px rgba(0, 198, 254, 0.2) !important;
}

.custom-field .v-label {
  color: #64748b;
  font-weight: 500;
}

.custom-field .v-field--focused .v-label {
  color: #00c6fe !important;
}
</style>
