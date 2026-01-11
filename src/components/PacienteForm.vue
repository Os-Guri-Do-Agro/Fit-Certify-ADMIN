<template>
  <div>
    <!--Segundo slide - Dados Físicos-->
    <template v-if="currentStep === 2">
      <v-form>
        <VRow class="px-4 px-md-8">
          <VCol class="mb-6 mt-10 mt-md-0" cols="12">
            <div class="d-flex align-center ga-3">
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-human-male-height</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                {{ t('pacienteForm.physicalData.title') }}
              </h2>
            </div>
          </VCol>
          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <VTextField id="altura" v-maska="'#.##'" :model-value="form.altura" @update:model-value="form.altura = $event"
              :rules="[rules.requiredAlturaObrigatorio]" name="altura" :placeholder="t('pacienteForm.physicalData.heightPlaceholder')" :label="t('pacienteForm.physicalData.height')" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <VTextField id="peso" :model-value="form.peso" @update:model-value="form.peso = $event" v-maska="'###.##'"
              :rules="[rules.requiredPesoObrigatorio]" name="peso" :placeholder="t('pacienteForm.physicalData.weightPlaceholder')" :label="t('pacienteForm.physicalData.weight')" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <v-select id="genero" :model-value="form.genero" @update:model-value="form.genero = $event" :items="generos"
              :rules="[rules.requiredSelectObrigatorio]" item-title="title" item-value="value"
              :placeholder="t('pacienteForm.physicalData.genderPlaceholder')" :label="t('pacienteForm.physicalData.gender')" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <v-select id="tipoSanguineo" :model-value="form.tipoSanguineo" @update:model-value="form.tipoSanguineo = $event" :items="tiposSanguineos"
              :rules="[rules.requiredSelectObrigatorio]" item-title="title" item-value="value"
              :placeholder="t('pacienteForm.physicalData.genderPlaceholder')" :label="t('pacienteForm.physicalData.bloodType')" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <v-select id="praticaAtividade" :model-value="form.praticaAtividadeFisicaRegularmente" @update:model-value="form.praticaAtividadeFisicaRegularmente = $event"
              :rules="[rules.requiredSelectObrigatorio]" :items="[
                { title: t('pacienteForm.physicalData.yesNo.yes'), value: true },
                { title: t('pacienteForm.physicalData.yesNo.no'), value: false },
              ]" :placeholder="t('pacienteForm.physicalData.genderPlaceholder')" :label="t('pacienteForm.physicalData.regularActivity')" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
          </VCol>
        </VRow>

        <VRow class="px-4 px-md-8">
          <VCol cols="12">
            <div class="mt-7">
              <div class="d-flex align-center ga-3 mb-6">
                <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                  <v-icon color="white" size="20">mdi-trophy</v-icon>
                </div>
                <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                  {{ t('pacienteForm.sportsHistory.title') }}
                </h2>
              </div>
              <VRow>
                <VCol class="my-2 py-0 font-weight-medium" cols="12">
                  <v-select id="objetivo_atividade" :model-value="objetivoAtividade" @update:model-value="$emit('update:objetivoAtividade', $event)" :items="objetivos"
                    item-title="title" item-value="value"
                    :rules="[rules.requiredSelectObrigatorio]" :placeholder="t('pacienteForm.physicalData.genderPlaceholder')" :label="t('pacienteForm.sportsHistory.objective')" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
                </VCol>
                <VCol class="my-2 py-0 font-weight-medium" cols="12">
                  <v-select id="Objetivo_pratica" :model-value="form.participouProva" @update:model-value="form.participouProva = $event"
                    :rules="[rules.requiredSelectObrigatorio]" :items="[
                      { title: t('pacienteForm.physicalData.yesNo.yes'), value: true },
                      { title: t('pacienteForm.physicalData.yesNo.no'), value: false },
                    ]" :placeholder="t('pacienteForm.physicalData.genderPlaceholder')" :label="t('pacienteForm.sportsHistory.participatedBefore')" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
                </VCol>

                <VCol class="my-2 py-0 font-weight-medium" cols="12">
                  <VTextField id="ultimasprovas" :model-value="form.ultimaProva" @update:model-value="form.ultimaProva = $event"
                    name="ultimasprovas" :label="t('pacienteForm.sportsHistory.lastRace')" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
                </VCol>
              </VRow>
            </div>
          </VCol>
        </VRow>
      </v-form>
    </template>

    <!--Terceiro slide - Histórico de Saúde-->
    <template v-if="currentStep === 3">
      <v-form>
        <VRow class="px-4 px-md-8 fill-md-height d-flex flex-column flex-md-row">
          <VCol class="d-flex ma-0 pa-0 pr-0 pr-md-3" md="6">
            <v-row class="d-flex">
              <v-col class="mt-5" cols="12">
                <div class="d-flex align-center ga-3 mb-5">
                  <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                    <v-icon color="white" size="20">mdi-heart-pulse</v-icon>
                  </div>
                  <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                    {{ t('pacienteForm.healthHistory.title') }}
                  </h2>
                </div>
                <div class="mb-5">
                  <span class="text-black font-weight-medium">{{ t('pacienteForm.healthHistory.diagnosedQuestion') }}</span>
                </div>
                <div class="" v-if="formDoencas <= 0">
                  <v-chip color="error" class="text-red text-subtitle-2">
                    {{ t('pacienteForm.healthHistory.selectOneOption') }}
                  </v-chip>
                </div>
                <v-checkbox v-for="(item, index) in doencasOrdenadas" :key="index" :model-value="formDoencas"
                  @update:model-value="$emit('update:formDoencas', $event)"
                  :rules="[rules.requiredCheckObrigatorio]" :label="$t(`cadastrarAtleta.healthHistory.doencas.${getDoencasKey(item.descricao)}`)" :value="item.id" hide-details
                  density="compact" color="success" @change="handleDoencaChange(item)" />

                <VRow>
                  <VCol cols="12">
                    <div class="mt-5 d-flex flex-column">
                      <span class="text-black">{{ t('pacienteForm.healthHistory.otherConditions') }}</span>
                      <v-textarea :model-value="form.outrasCondicoes" @update:model-value="form.outrasCondicoes = $event" class="text-black custom-field" color="black"
                        :error-messages="errors.outrasCondicoes" no-resize rows="2" variant="outlined" rounded="lg" bg-color="white" />
                    </div>
                  </VCol>
                </VRow>
              </v-col>
            </v-row>
          </VCol>

          <VCol class="d-flex pa-0 ma-0" md="6">
            <v-row class="d-flex">
              <v-col class="mt-5" cols="12">
                <div class="d-flex align-center ga-3 mb-5">
                  <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                    <v-icon color="white" size="20">mdi-stethoscope</v-icon>
                  </div>
                  <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                    {{ t('pacienteForm.healthHistory.recentSymptoms') }}
                  </h2>
                </div>
                <div class="mb-5">
                  <span class="text-black font-weight-medium">{{ t('pacienteForm.healthHistory.diagnosedQuestion') }}</span>
                </div>
                <div class="" v-if="formSintomas <= 0">
                  <v-chip class="text-red text-subtitle-2">
                    {{ t('pacienteForm.healthHistory.selectOneOption') }}
                  </v-chip>
                </div>
                <v-checkbox v-for="(item, index) in sintomasOrdenados" :key="index" :model-value="formSintomas"
                  @update:model-value="$emit('update:formSintomas', $event)"
                  :rules="[rules.requiredCheckObrigatorio]" :label="$t(`cadastrarAtleta.healthHistory.sintomas.${getSintomasKey(item.descricao)}`)" :value="item.id" hide-details
                  density="compact" color="success" @change="handleSintomaChange(item)" />

                  <div class="mt-5 d-flex flex-column">
                      <span class="text-black">{{ t('pacienteForm.healthHistory.continuousMedication') }}</span>
                      <v-textarea :model-value="form.tomaMedicamento" @update:model-value="form.tomaMedicamento = $event" class="text-black custom-field" color="black"
                        :error-messages="errors.tomaMedicamento" max-height="20px" no-resize rows="2"
                        variant="outlined" rounded="lg" bg-color="white" />
                    </div>
              </v-col>

            </v-row>
          </VCol>
        </VRow>
      </v-form>
    </template>

    <!--Quarto slide - Finalização-->
    <template v-if="currentStep === 4">
      <v-form>
        <VRow class="px-4 px-md-8">
          <VCol cols="12">
            <div class="d-flex flex-column justify-space-between">
              <div class="mt-10 mt-md-0 d-flex mb-6">
                <div class="d-flex align-center ga-3">
                  <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                    <v-icon color="white" size="20">mdi-file-document</v-icon>
                  </div>
                  <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                    {{ t('pacienteForm.examsData.title') }}
                  </h2>
                </div>
              </div>

              <VRow class="d-flex">
                <v-form class="w-100">
                  <VCol class="my-2 py-0 font-weight-medium" cols="12">
                    <v-select :model-value="form.fezcheckUp" @update:model-value="form.fezcheckUp = $event"
                      :rules="[rules.requiredSelectObrigatorio]" :items="[
                        { title: t('pacienteForm.physicalData.yesNo.yes'), value: true },
                        { title: t('pacienteForm.physicalData.yesNo.no'), value: false },
                      ]" name="check" id="check" :placeholder="t('pacienteForm.physicalData.genderPlaceholder')" :label="t('pacienteForm.examsData.recentCheckup')" variant="outlined" rounded="lg" bg-color="white" class="custom-field"></v-select>
                  </VCol>

                  <VCol cols="12" class="my-2 py-0 font-weight-medium">
                    <VFileInput prepend-icon="" name="arquivos" id="arquivos" variant="outlined" rounded="lg" bg-color="white" class="custom-field"
                      accept=".pdf, image/*" :label="t('pacienteForm.examsData.attachExams')" @update:model-value="handleFileChange" />
                  </VCol>

              <VCol cols="12" class="my-0 py-0 font-weight-medium">
                <div v-if="formPdfImage.length">
                  <div v-for="(file, index) in formPdfImage" :key="index">
                    <div class="d-flex w-100 justify-space-between align-center my-5 pa-3 rounded-lg"
                      style="background-color: #88ce0d">
                      <div class="gap-5 text-white">
                        <b>{{ file.name }}</b>
                        <b>{{ (file.size / 1024).toFixed(1) }} KB</b>
                      </div>
                      <VBtn icon="mdi-close" size="small" @click="removeFile(index)" />
                    </div>
                  </div>
                </div>
              </VCol>

                  <VCol class="my-2 py-0 font-weight-medium" cols="12">
                    <v-select :model-value="form.possuiSmartwatch" @update:model-value="form.possuiSmartwatch = $event"
                      :rules="[rules.requiredSelectObrigatorio]" :items="[
                        { title: t('pacienteForm.physicalData.yesNo.yes'), value: true },
                        { title: t('pacienteForm.physicalData.yesNo.no'), value: false },
                      ]" id="possuiSmartwatch" :placeholder="t('pacienteForm.physicalData.genderPlaceholder')" :label="t('pacienteForm.examsData.hasSmartwatch')" variant="outlined" rounded="lg" bg-color="white" class="custom-field"></v-select>
                  </VCol>
              <VCol class="my-0 px-3" cols="12">
                <v-checkbox class="font-weight-medium" :model-value="form.integrarDados" @update:model-value="form.integrarDados = $event"
                  :rules="[rules.requiredCheckObrigatorio]" color="success" required
                  :label="t('pacienteForm.examsData.integrateFitCertify')"></v-checkbox>
              </VCol>
            </v-form>
          </VRow>

              <div class="d-flex flex-column h-100 mt-8">
                <div class="d-flex align-center ga-3 mb-6">
                  <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                    <v-icon color="white" size="20">mdi-clipboard-check</v-icon>
                  </div>
                  <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                    {{ t('pacienteForm.declaration.title') }}
                  </h2>
                </div>
            <v-form class="w-100">
              <v-checkbox :model-value="form.declaroInformacoes" @update:model-value="form.declaroInformacoes = $event" :rules="[rules.requiredCheckObrigatorio]"
                color="success" class="font-weight-medium"
                :label="t('pacienteForm.declaration.declareTruth')">
              </v-checkbox>

              <v-checkbox :model-value="form.aceitoCompartilhar" @update:model-value="form.aceitoCompartilhar = $event" :rules="[rules.requiredCheckObrigatorio]"
                color="success" class="font-weight-medium"
                :label="t('pacienteForm.declaration.shareData')">
              </v-checkbox>

              <v-checkbox :model-value="form.concordoTermos" @update:model-value="form.concordoTermos = $event" :rules="[rules.requiredCheckObrigatorio]" color="success"
                class="font-weight-medium">
                <template #label>
                  <span>
                    {{ t('pacienteForm.declaration.acceptTerms') }}
                    <span class="cursor-pointer text-decoration-underline" style="color: #00c6fe"
                      @click="showModal = true">
                      {{ t('pacienteForm.declaration.termsLink') }}</span>.
                  </span>
                </template>
              </v-checkbox>
            </v-form>

            <v-dialog v-model="showModal" width="600" height="800">
              <v-card class="py-5 px-md-3 custom-scroll" rounded="xl">
                <v-card-title class="text-center text-h5" style="
                    color: #00c6fe;
                    white-space: normal;
                    word-wrap: break-word;
                  ">{{ t('pacienteForm.termsModal.title') }}</v-card-title>
                <v-card-text>
                  <p class="mb-5"><strong>{{ t('pacienteForm.termsModal.introduction') }}</strong></p>

                  <p>
                    {{ t('pacienteForm.termsModal.welcome') }} <strong>{{ t('pacienteForm.termsModal.company') }}</strong> {{ t('pacienteForm.termsModal.companyRef') }}! <br />
                    <br />
                    {{ t('pacienteForm.termsModal.termsIntro') }}
                  </p>

                  <p>
                    {{ t('pacienteForm.termsModal.privacyPolicy') }} <strong>{{ t('pacienteForm.termsModal.privacyPolicyBold') }}</strong> {{ t('pacienteForm.termsModal.privacyPolicyText') }} <br />
                    <br />
                    {{ t('pacienteForm.termsModal.agreement') }}
                  </p>

                  <p>
                    {{ t('pacienteForm.termsModal.disagree') }}
                    <strong>{{ t('pacienteForm.termsModal.email') }}</strong> {{ t('pacienteForm.termsModal.disagreeEnd') }} <br />
                    <br />
                    {{ t('pacienteForm.termsModal.applies') }}
                  </p>

                  <p>
                    {{ t('pacienteForm.termsModal.integration') }} <strong>{{ t('pacienteForm.termsModal.appleHealth') }}</strong> {{ t('pacienteForm.termsModal.and') }}
                    <strong>{{ t('pacienteForm.termsModal.googleHealth') }}</strong>{{ t('pacienteForm.termsModal.integrationText') }}
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn class="w-100 text-white font-weight-bold" @click="maisTermos" height="50px" rounded="lg"
                    style="background-color: #00c6fe">
                    {{ t('pacienteForm.termsModal.readMore') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
              </div>
            </div>
          </VCol>
        </VRow>
      </v-form>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const getDoencasKey = (descricao) => {
  const map =  {
    'Hipertensão': 'item_1',
    'Diabetes': 'item_2',
    'Asma': 'item_3',
    'Colesterol alto': 'item_4',
    'Problemas cardíacos': 'item_5',
    'Nenhuma das anteriores': 'item_6'
  }
  return map[descricao] || descricao
}

const getSintomasKey = (descricao) => {
  const map = {
    'Dor no peito': 'item_1',
    'Falta de ar': 'item_2',
    ' Tontura ou desmaios': 'item_3',
    'Inchaço nas pernas': 'item_4',
    'Cansaço excessivo': 'item_5',
    'Nenhum desses': 'item_6'
  }
  return map[descricao] || descricao
}

const props = defineProps({
  currentStep: {
    type: Number,
    required: true
  },
  form: {
    type: Object,
    required: true
  },
  formDoencas: {
    type: Array,
    required: true
  },
  formSintomas: {
    type: Array,
    required: true
  },
  objetivoAtividade: {
    required: true
  },
  formPdfImage: {
    type: Array,
    required: true
  },
  doencas: {
    type: Array,
    default: () => []
  },
  sintomas: {
    type: Array,
    default: () => []
  },
  errors: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:formDoencas', 'update:formSintomas', 'update:objetivoAtividade', 'update:formPdfImage'])


const showModal = ref(false)

const objetivos = ref([
  { title: t('pacienteForm.sportsHistory.objectiveOptions.generalHealth'), value: 'Saúde Geral' },
  { title: t('pacienteForm.sportsHistory.objectiveOptions.aesthetics'), value: 'Melhorar a estética corporal' },
  { title: t('pacienteForm.sportsHistory.objectiveOptions.conditioning'), value: 'Condicionamento Físico e a Disposição' },
  { title: t('pacienteForm.sportsHistory.objectiveOptions.others'), value: 'Outros' },
])

const tiposSanguineos = ref([
  { title: t('pacienteForm.physicalData.bloodTypeOptions.aPositive'), value: 'A+' },
  { title: t('pacienteForm.physicalData.bloodTypeOptions.aNegative'), value: 'A-' },
  { title: t('pacienteForm.physicalData.bloodTypeOptions.bPositive'), value: 'B+' },
  { title: t('pacienteForm.physicalData.bloodTypeOptions.bNegative'), value: 'B-' },
  { title: t('pacienteForm.physicalData.bloodTypeOptions.abPositive'), value: 'AB+' },
  { title: t('pacienteForm.physicalData.bloodTypeOptions.abNegative'), value: 'AB-' },
  { title: t('pacienteForm.physicalData.bloodTypeOptions.oPositive'), value: 'O+' },
  { title: t('pacienteForm.physicalData.bloodTypeOptions.oNegative'), value: 'O-' },
  { title: t('pacienteForm.physicalData.bloodTypeOptions.unknown'), value: 'Não sei' },
])

const generos = ref([
  { title: t('pacienteForm.physicalData.genderOptions.male'), value: 'Masculino' },
  { title: t('pacienteForm.physicalData.genderOptions.female'), value: 'Feminino' },
  { title: t('pacienteForm.physicalData.genderOptions.other'), value: 'Outros' },
])

const rules = {
  requiredSelectObrigatorio: (value) =>
    value !== null && value !== undefined ? true : t('pacienteForm.validation.required'),
  requiredCheckObrigatorio: (value) => !!value || t('pacienteForm.validation.required'),
  requiredAlturaObrigatorio: (value) => !!value || t('pacienteForm.validation.heightRequired'),
  requiredPesoObrigatorio: (value) => !!value || t('pacienteForm.validation.weightRequired'),
}



const doencasOrdenadas = computed(() => {
  const outros = props.doencas.filter(d => d.descricao !== 'Nenhuma das anteriores')
  const nenhuma = props.doencas.filter(d => d.descricao === 'Nenhuma das anteriores')
  return [...outros, ...nenhuma]
})

const sintomasOrdenados = computed(() => {
  const outros = props.sintomas.filter(s => s.descricao !== 'Nenhum desses')
  const nenhum = props.sintomas.filter(s => s.descricao === 'Nenhum desses')
  return [...outros, ...nenhum]
})

const handleDoencaChange = (item) => {
  const nenhumaId = props.doencas.find(
    (d) => d.descricao === 'Nenhuma das anteriores'
  )?.id

  if (!nenhumaId) return

  if (item.id === nenhumaId) {
    if (props.formDoencas.includes(nenhumaId)) {
      emit('update:formDoencas', [nenhumaId])
    } else {
      emit('update:formDoencas', [])
    }
  } else {
    emit('update:formDoencas', props.formDoencas.filter((v) => v !== nenhumaId))
  }
}

const handleSintomaChange = (item) => {
  const nenhumId = props.sintomas.find(
    (s) => s.descricao === 'Nenhum desses'
  )?.id
  if (!nenhumId) return

  if (item.id === nenhumId) {
    emit('update:formSintomas', props.formSintomas.includes(nenhumId) ? [nenhumId] : [])
  } else {
    emit('update:formSintomas', props.formSintomas.filter((v) => v !== nenhumId))
  }
}

const handleFileChange = (files) => {
  if (!files) return
  const newFiles = Array.isArray(files) ? files : [files]
  emit('update:formPdfImage', [...props.formPdfImage, ...newFiles])
}

const removeFile = (index) => {
  const updated = [...props.formPdfImage]
  updated.splice(index, 1)
  emit('update:formPdfImage', updated)
}

const maisTermos = () => {
  showModal.value = false
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

.custom-field {
  transition: all 0.3s ease;
}

.custom-field:hover {
  transform: translateY(-1px);
}

.custom-field .v-field {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e7ff;
  transition: all 0.3s ease;
}

.custom-field .v-field:hover {
  border-color: #00c6fe;
  box-shadow: 0 4px 12px rgba(0, 198, 254, 0.15);
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
