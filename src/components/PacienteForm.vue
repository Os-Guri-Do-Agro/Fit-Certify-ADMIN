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
                Dados Físicos
              </h2>
            </div>
          </VCol>
          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <VTextField id="altura" v-maska="'#.##'" :model-value="form.altura" @update:model-value="form.altura = $event"
              :rules="[rules.requiredAlturaObrigatorio]" name="altura" placeholder="0.00cm" label="Altura (cm)*" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <VTextField id="peso" :model-value="form.peso" @update:model-value="form.peso = $event" v-maska="'###.##'"
              :rules="[rules.requiredPesoObrigatorio]" name="peso" placeholder="0.00kg" label="Peso (kg)*" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <v-select id="genero" :model-value="form.genero" @update:model-value="form.genero = $event" :items="generos"
              :rules="[rules.requiredSelectObrigatorio]" item-title="title" item-value="value"
              placeholder="Selecione" label="Gênero*" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <v-select id="tipoSanguineo" :model-value="form.tipoSanguineo" @update:model-value="form.tipoSanguineo = $event" :items="tiposSanguineos"
              :rules="[rules.requiredSelectObrigatorio]" item-title="title" item-value="value"
              placeholder="Selecione" label="Tipo Sanguíneo*" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <v-select id="praticaAtividade" :model-value="form.praticaAtividadeFisicaRegularmente" @update:model-value="form.praticaAtividadeFisicaRegularmente = $event"
              :rules="[rules.requiredSelectObrigatorio]" :items="[
                { title: 'Sim', value: true },
                { title: 'Não', value: false },
              ]" placeholder="Selecione" label="Pratica atividade física regularmente?*" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
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
                  Histórico Esportivo
                </h2>
              </div>
              <VRow>
                <VCol class="my-2 py-0 font-weight-medium" cols="12">
                  <v-select id="objetivo_atividade" :model-value="objetivoAtividade" @update:model-value="$emit('update:objetivoAtividade', $event)" :items="objetivos"
                    item-title="title" item-value="value"
                    :rules="[rules.requiredSelectObrigatorio]" placeholder="Selecione" label="Objetivo com a atividade física*" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
                </VCol>
                <VCol class="my-2 py-0 font-weight-medium" cols="12">
                  <v-select id="Objetivo_pratica" :model-value="form.participouProva" @update:model-value="form.participouProva = $event"
                    :rules="[rules.requiredSelectObrigatorio]" :items="[
                      { title: 'Sim', value: true },
                      { title: 'Não', value: false },
                    ]" placeholder="Selecione" label="Já participou de provas antes?*" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
                </VCol>

                <VCol class="my-2 py-0 font-weight-medium" cols="12">
                  <VTextField id="ultimasprovas" :model-value="form.ultimaProva" @update:model-value="form.ultimaProva = $event"
                    name="ultimasprovas" label="Se sim, qual a última? (Opcional)" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
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
                    Histórico de Saúde
                  </h2>
                </div>
                <div class="mb-5">
                  <span class="text-black font-weight-medium">Já foi diagnosticado com alguma das condições
                    abaixo?</span>
                </div>
                <div class="" v-if="formDoencas <= 0">
                  <v-chip color="error" class="text-red text-subtitle-2">
                    Marque uma das opções abaixo para prosseguir:
                  </v-chip>
                </div>
                <v-checkbox v-for="(item, index) in doencasOrdenadas" :key="index" :model-value="formDoencas"
                  @update:model-value="$emit('update:formDoencas', $event)"
                  :rules="[rules.requiredCheckObrigatorio]" :label="item.descricao" :value="item.id" hide-details
                  density="compact" color="success" @change="handleDoencaChange(item)" />

                <VRow>
                  <VCol cols="12">
                    <div class="mt-5 d-flex flex-column">
                      <span class="text-black">Outras condições médicas: (Opcional)</span>
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
                    Sinais e Sintomas Recentes
                  </h2>
                </div>
                <div class="mb-5">
                  <span class="text-black font-weight-medium">Já foi diagnosticado com alguma das condições
                    abaixo?</span>
                </div>
                <div class="" v-if="formSintomas <= 0">
                  <v-chip class="text-red text-subtitle-2">
                    Marque uma das opções abaixo para prosseguir:
                  </v-chip>
                </div>
                <v-checkbox v-for="(item, index) in sintomasOrdenados" :key="index" :model-value="formSintomas"
                  @update:model-value="$emit('update:formSintomas', $event)"
                  :rules="[rules.requiredCheckObrigatorio]" :label="item.descricao" :value="item.id" hide-details
                  density="compact" color="success" @change="handleSintomaChange(item)" />

                  <div class="mt-5 d-flex flex-column">
                      <span class="text-black">Toma algum medicamento contínuo? Se sim,
                        qual? (Opcional)</span>
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
                    Exames e Dados Complementares
                  </h2>
                </div>
              </div>

              <VRow class="d-flex">
                <v-form class="w-100">
                  <VCol class="my-2 py-0 font-weight-medium" cols="12">
                    <v-select :model-value="form.fezcheckUp" @update:model-value="form.fezcheckUp = $event"
                      :rules="[rules.requiredSelectObrigatorio]" :items="[
                        { title: 'Sim', value: true },
                        { title: 'Não', value: false },
                      ]" name="check" id="check" placeholder="Selecione" label="Fez check-up nos últimos 12 meses?*" variant="outlined" rounded="lg" bg-color="white" class="custom-field"></v-select>
                  </VCol>

                  <VCol cols="12" class="my-2 py-0 font-weight-medium">
                    <VFileInput prepend-icon="" name="arquivos" id="arquivos" variant="outlined" rounded="lg" bg-color="white" class="custom-field"
                      accept=".pdf, image/*" label="Anexar exames (PDF ou imagem): (Opcional)" @update:model-value="handleFileChange" />
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
                        { title: 'Sim', value: true },
                        { title: 'Não', value: false },
                      ]" id="possuiSmartwatch" placeholder="Selecione" label="Possui smartwatch ou app de treino?*" variant="outlined" rounded="lg" bg-color="white" class="custom-field"></v-select>
                  </VCol>
              <VCol class="my-0 px-3" cols="12">
                <v-checkbox class="font-weight-medium" :model-value="form.integrarDados" @update:model-value="form.integrarDados = $event"
                  :rules="[rules.requiredCheckObrigatorio]" color="success" required
                  label=" Desejo integrar meus dados com a FitCertify365*"></v-checkbox>
              </VCol>
            </v-form>
          </VRow>

              <div class="d-flex flex-column h-100 mt-8">
                <div class="d-flex align-center ga-3 mb-6">
                  <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                    <v-icon color="white" size="20">mdi-clipboard-check</v-icon>
                  </div>
                  <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                    Declaração
                  </h2>
                </div>
            <v-form class="w-100">
              <v-checkbox :model-value="form.declaroInformacoes" @update:model-value="form.declaroInformacoes = $event" :rules="[rules.requiredCheckObrigatorio]"
                color="success" class="font-weight-medium"
                label=" Declaro que as informações acima são verdadeiras e autorizo a análise para fins de certificação.*">
              </v-checkbox>

              <v-checkbox :model-value="form.aceitoCompartilhar" @update:model-value="form.aceitoCompartilhar = $event" :rules="[rules.requiredCheckObrigatorio]"
                color="success" class="font-weight-medium"
                label="Aceito compartilhar meus dados com as organizações dos eventos que eu participar.*">
              </v-checkbox>

              <v-checkbox :model-value="form.concordoTermos" @update:model-value="form.concordoTermos = $event" :rules="[rules.requiredCheckObrigatorio]" color="success"
                class="font-weight-medium">
                <template #label>
                  <span>
                    Li e concordo com os
                    <span class="cursor-pointer text-decoration-underline" style="color: #00c6fe"
                      @click="showModal = true">
                      termos de Uso e Política de Privacidade*</span>.
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
                  ">Política de Privacidade, Termos e Condições de Uso e
                  Proteção de Dados</v-card-title>
                <v-card-text>
                  <p class="mb-5"><strong>1. Introdução</strong></p>

                  <p>
                    Bem-vindo(a) à <strong>FitCertify365</strong> ("Companhia", "nós",
                    "nosso", "conosco")! <br />
                    <br />
                    Estes Termos de Serviço ("Termos", "Termos de
                    Serviço", "Termos e Condições de Uso") regem o uso dos
                    nossos aplicativos móveis e plataforma digital,
                    desenvolvidos pela FitCertify365.
                  </p>

                  <p>
                    Nossa <strong>Política de Privacidade</strong> também rege o uso do
                    nosso Serviço e explica como coletamos, protegemos e
                    divulgamos informações resultantes da sua utilização
                    dos aplicativos móveis e páginas web. <br />
                    <br />
                    Seu acordo conosco inclui estes Termos e nossa
                    Política de Privacidade ("Acordos"). Ao utilizar
                    nossos serviços, você reconhece que leu e compreendeu
                    os Acordos, e concorda em estar legalmente vinculado a
                    eles.
                  </p>

                  <p>
                    Caso não concorde (ou não possa cumprir) os Acordos,
                    você não poderá utilizar o Serviço. Neste caso,
                    solicitamos que nos comunique pelo e-mail
                    <strong>atendimento@fitcertify365.com</strong> para que possamos buscar
                    uma solução. <br />
                    <br />
                    Estes Termos aplicam-se a todos os visitantes,
                    usuários e demais pessoas que desejarem acessar ou
                    utilizar o Serviço.
                  </p>

                  <p>
                    Este aplicativo pode se integrar com o <strong>Apple Saúde (HealthKit ou CareKit)</strong> e
                    com o
                    <strong>Google Health Connect</strong>, para leitura e acompanhamento de dados obtidos via
                    Apple Watch e outros
                    dispositivos wearables compatíveis, permitindo também o envio de dados manuais e de
                    dispositivos Bluetooth
                    (BLE), sempre mediante autorização do usuário.
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn class="w-100 text-white font-weight-bold" @click="maisTermos" height="50px" rounded="lg"
                    style="background-color: #00c6fe">
                    Ler Mais
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
import { ref, computed, onMounted } from 'vue'
import DoencaService from '../services/cadastro-service/doenca-service'
import SintomaService from '../services/cadastro-service/sintoma-service'
import { getErrorMessage } from '@/common/error.utils'

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
  errors: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:formDoencas', 'update:formSintomas', 'update:objetivoAtividade', 'update:formPdfImage'])

const doencas = ref([])
const sintomas = ref([])
const showModal = ref(false)

const objetivos = ref([
  { title: 'Saúde Geral', value: 'Saúde Geral' },
  { title: 'Melhorar a estética corporal', value: 'Melhorar a estética corporal' },
  { title: 'Condicionamento Físico e a Disposição', value: 'Condicionamento Físico e a Disposição' },
  { title: 'Outros', value: 'Outros' },
])

const tiposSanguineos = ref([
  { title: 'A+', value: 'A+' },
  { title: 'A-', value: 'A-' },
  { title: 'B+', value: 'B+' },
  { title: 'B-', value: 'B-' },
  { title: 'AB+', value: 'AB+' },
  { title: 'AB-', value: 'AB-' },
  { title: 'O+', value: 'O+' },
  { title: 'O-', value: 'O-' },
  { title: 'Não sei', value: 'Não sei' },
])

const generos = ref([
  { title: 'Masculino', value: 'Masculino' },
  { title: 'Feminino', value: 'Feminino' },
  { title: 'Outros', value: 'Outros' },
])

const rules = {
  requiredSelectObrigatorio: (value) =>
    value !== null && value !== undefined ? true : 'Campo obrigatório',
  requiredCheckObrigatorio: (value) => !!value || 'Campo obrigatório',
  requiredAlturaObrigatorio: (value) => !!value || 'Altura obrigatória',
  requiredPesoObrigatorio: (value) => !!value || 'Peso obrigatório',
}

onMounted(async () => {
  await buscarDoenca()
  await buscarSintoma()
})

const buscarDoenca = async () => {
  try {
    const res = await DoencaService.getAllDoencas()
    doencas.value = res.data || []
  } catch (error) {
    console.error('Erro ao carregar doenças:', getErrorMessage(error, 'Erro desconhecido'))
  }
}

const buscarSintoma = async () => {
  try {
    const res = await SintomaService.getAllSintomas()
    sintomas.value = res.data || []
  } catch (error) {
    console.error('Erro ao carregar sintomas:', getErrorMessage(error, 'Erro desconhecido'))
  }
}

const doencasOrdenadas = computed(() => {
  const outros = doencas.value.filter(d => d.descricao !== 'Nenhuma das anteriores')
  const nenhuma = doencas.value.filter(d => d.descricao === 'Nenhuma das anteriores')
  return [...outros, ...nenhuma]
})

const sintomasOrdenados = computed(() => {
  const outros = sintomas.value.filter(s => s.descricao !== 'Nenhum desses')
  const nenhum = sintomas.value.filter(s => s.descricao === 'Nenhum desses')
  return [...outros, ...nenhum]
})

const handleDoencaChange = (item) => {
  const nenhumaId = doencas.value.find(
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
  const nenhumId = sintomas.value.find(
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
  box-shadow: 0 4px 12px rgba(0, 198, 254, 0.15);
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
