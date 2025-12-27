<template>
  <v-container fluid class="pa-6">
    <v-card rounded="xl" elevation="4">
      <v-card-title class="pa-6 d-flex align-center" style="background: linear-gradient(135deg, #88CE0D 0%, #6ba80a 100%); color: white;">
        <v-icon class="mr-3" color="white" size="32">mdi-run</v-icon>
        <span class="text-h5 font-weight-bold">Cadastrar Novo Atleta</span>
      </v-card-title>

      <v-card-text class="pa-6">
        <VRow class="mb-4">
          <VCol cols="12">
            <VTextField
              v-maska="'(##) #####-####'"
              v-model="form.telefone"
              label="Telefone"
              placeholder="(00) 00000-0000"
              variant="outlined"
              rounded="lg"
            />
          </VCol>
        </VRow>

        <VStepper v-model="step" :items="['Dados Físicos', 'Histórico de Saúde', 'Finalização']" class="elevation-0">
          <template #item.1>
            <v-form>
              <VRow class="px-4 px-md-8">
                <VCol class="mb-6 mt-10 mt-md-0" cols="12">
                  <div class="d-flex align-center ga-3">
                    <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #88CE0D 0%, #6ba80a 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(136, 206, 13, 0.4);">
                      <v-icon color="white" size="20">mdi-human</v-icon>
                    </div>
                    <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                      Dados Físicos
                    </h2>
                  </div>
                </VCol>

                <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
                  <VSelect v-model="form.tipoSanguineo" :items="['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']" label="Tipo Sanguíneo *" variant="outlined" rounded="lg" bg-color="white" class="custom-field" :rules="[v => !!v || 'Campo obrigatório']" />
                </VCol>
                <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
                  <VSelect v-model="form.genero" :items="['Masculino', 'Feminino', 'Outro']" label="Gênero *" variant="outlined" rounded="lg" bg-color="white" class="custom-field" :rules="[v => !!v || 'Campo obrigatório']" />
                </VCol>
                <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
                  <VTextField v-model="form.altura" v-maska="'#.##'" label="Altura (cm) *" placeholder="0.00cm" variant="outlined" rounded="lg" bg-color="white" class="custom-field" :rules="[v => !!v || 'Campo obrigatório']" />
                </VCol>
                <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
                  <VTextField v-model="form.peso" v-maska="'###.##'" label="Peso (kg) *" placeholder="0.00kg" variant="outlined" rounded="lg" bg-color="white" class="custom-field" :rules="[v => !!v || 'Campo obrigatório']" />
                </VCol>
                <VCol class="my-2 py-0 font-weight-medium" cols="12">
                  <VSelect v-model="form.praticaAtividadeFisicaRegularmente" :items="[{title: 'Sim', value: true}, {title: 'Não', value: false}]" placeholder="Selecione" label="Pratica atividade física regularmente? *" variant="outlined" rounded="lg" bg-color="white" class="custom-field" :rules="[v => v !== null || 'Campo obrigatório']" />
                </VCol>
              </VRow>
            </v-form>
          </template>

          <template #item.2>
            <v-form>
              <VRow class="px-4 px-md-8 fill-md-height d-flex flex-column flex-md-row">
                <VCol class="d-flex ma-0 pa-0 pr-0 pr-md-3" md="6">
                  <v-row class="d-flex">
                    <v-col class="mt-5" cols="12">
                      <div class="d-flex align-center ga-3 mb-5">
                        <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #88CE0D 0%, #6ba80a 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(136, 206, 13, 0.4);">
                          <v-icon color="white" size="20">mdi-heart-pulse</v-icon>
                        </div>
                        <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                          Histórico de Saúde
                        </h2>
                      </div>
                      <div class="mb-5">
                        <span class="text-black font-weight-medium">Já foi diagnosticado com alguma das condições abaixo?</span>
                      </div>
                      <div class="" v-if="form.historicoSaudeDoencas.length <= 0">
                        <v-chip color="error" class="text-red text-subtitle-2">
                          Marque uma das opções abaixo para prosseguir:
                        </v-chip>
                      </div>
                      <v-checkbox v-for="(item, index) in doencasOrdenadas" :key="index" v-model="form.historicoSaudeDoencas" :label="item.descricao" :value="item.id" hide-details density="compact" color="success" @change="handleDoencaChange(item)" />

                      <VRow>
                        <VCol cols="12">
                          <div class="mt-5 d-flex flex-column">
                            <span class="text-black">Outras condições médicas: (Opcional)</span>
                            <v-textarea v-model="form.outrasCondicoesMedicas" class="text-black custom-field" color="black" no-resize rows="2" variant="outlined" rounded="lg" bg-color="white" />
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
                        <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #88CE0D 0%, #6ba80a 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(136, 206, 13, 0.4);">
                          <v-icon color="white" size="20">mdi-stethoscope</v-icon>
                        </div>
                        <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                          Sinais e Sintomas Recentes
                        </h2>
                      </div>
                      <div class="mb-5">
                        <span class="text-black font-weight-medium">Já foi diagnosticado com alguma das condições abaixo?</span>
                      </div>
                      <div class="" v-if="form.historicoSaudeSintomas.length <= 0">
                        <v-chip class="text-red text-subtitle-2">
                          Marque uma das opções abaixo para prosseguir:
                        </v-chip>
                      </div>
                      <v-checkbox v-for="(item, index) in sintomasOrdenados" :key="index" v-model="form.historicoSaudeSintomas" :label="item.descricao" :value="item.id" hide-details density="compact" color="success" @change="handleSintomaChange(item)" />

                      <div class="mt-5 d-flex flex-column">
                        <span class="text-black">Toma algum medicamento contínuo? Se sim, qual? (Opcional)</span>
                        <v-textarea v-model="form.tomaMedicamentoContinuo" class="text-black custom-field" color="black" no-resize rows="2" variant="outlined" rounded="lg" bg-color="white" />
                      </div>
                    </v-col>
                  </v-row>
                </VCol>
              </VRow>

              <VRow class="px-4 px-md-8">
                <VCol cols="12">
                  <div class="mt-7">
                    <div class="d-flex align-center ga-3 mb-6">
                      <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #88CE0D 0%, #6ba80a 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(136, 206, 13, 0.4);">
                        <v-icon color="white" size="20">mdi-trophy</v-icon>
                      </div>
                      <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                        Histórico Esportivo
                      </h2>
                    </div>
                    <VRow>
                      <VCol class="my-2 py-0 font-weight-medium" cols="12">
                        <VSelect v-model="form.objetivo" :items="[{title: 'Saúde Geral', value: 'Saúde Geral'}, {title: 'Melhorar a estética corporal', value: 'Melhorar a estética corporal'}, {title: 'Condicionamento Físico e a Disposição', value: 'Condicionamento Físico e a Disposição'}, {title: 'Outros', value: 'Outros'}]" item-title="title" item-value="value" placeholder="Selecione" label="Objetivo com a atividade física *" variant="outlined" rounded="lg" bg-color="white" class="custom-field" :rules="[v => !!v || 'Campo obrigatório']" />
                      </VCol>
                      <VCol class="my-2 py-0 font-weight-medium" cols="12">
                        <VSelect v-model="form.participouProvaAntes" :items="[{title: 'Sim', value: true}, {title: 'Não', value: false}]" placeholder="Selecione" label="Já participou de provas antes? *" variant="outlined" rounded="lg" bg-color="white" class="custom-field" :rules="[v => v !== null || 'Campo obrigatório']" />
                      </VCol>
                      <VCol class="my-2 py-0 font-weight-medium" cols="12">
                        <VTextField v-model="form.ultimaProva" label="Se sim, qual a última? (Opcional)" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
                      </VCol>
                    </VRow>
                  </div>
                </VCol>
              </VRow>
            </v-form>
          </template>

          <template #item.3>
            <v-form>
              <VRow class="px-4 px-md-8">
                <VCol class="mb-6 mt-10 mt-md-0" cols="12">
                  <div class="d-flex align-center ga-3">
                    <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #88CE0D 0%, #6ba80a 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(136, 206, 13, 0.4);">
                      <v-icon color="white" size="20">mdi-check-circle</v-icon>
                    </div>
                    <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                      Finalização
                    </h2>
                  </div>
                </VCol>

                <VCol class="my-2 py-0 font-weight-medium" cols="12">
                  <VSelect v-model="form.participouProvaAntes" :items="[{title: 'Sim', value: true}, {title: 'Não', value: false}]" placeholder="Selecione" label="Já participou de provas antes? *" variant="outlined" rounded="lg" bg-color="white" class="custom-field" :rules="[v => v !== null || 'Campo obrigatório']" />
                </VCol>
                <VCol class="my-2 py-0 font-weight-medium" cols="12">
                  <VTextField v-model="form.ultimaProva" label="Se sim, qual a última? (Opcional)" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
                </VCol>
                <VCol class="my-2 py-0 font-weight-medium" cols="12">
                  <VSelect v-model="form.fezCheckupUltimosMeses" :items="[{title: 'Sim', value: true}, {title: 'Não', value: false}]" placeholder="Selecione" label="Fez check-up nos últimos 12 meses? *" variant="outlined" rounded="lg" bg-color="white" class="custom-field" :rules="[v => v !== null || 'Campo obrigatório']" />
                </VCol>
                <VCol class="my-2 py-0 font-weight-medium" cols="12">
                  <VFileInput v-model="formPdfImage" prepend-icon="" label="Anexar exames (PDF ou imagem): (Opcional)" variant="outlined" rounded="lg" bg-color="white" class="custom-field" accept=".pdf, image/*" @update:model-value="handleFileChange" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" v-if="formPdfImage.length">
                  <div v-for="(file, index) in formPdfImage" :key="index">
                    <div class="d-flex w-100 justify-space-between align-center my-5 pa-3 rounded-lg" style="background-color: #88ce0d">
                      <div class="gap-5 text-white">
                        <b>{{ file.name }}</b>
                        <b>{{ (file.size / 1024).toFixed(1) }} KB</b>
                      </div>
                      <VBtn icon="mdi-close" size="small" @click="removeFile(index)" />
                    </div>
                  </div>
                </VCol>
                <VCol class="my-2 py-0 font-weight-medium" cols="12">
                  <VSelect v-model="form.possuiSmartwatch" :items="[{title: 'Sim', value: true}, {title: 'Não', value: false}]" placeholder="Selecione" label="Possui smartwatch ou app de treino? *" variant="outlined" rounded="lg" bg-color="white" class="custom-field" :rules="[v => v !== null || 'Campo obrigatório']" />
                </VCol>
                <VCol class="my-0 px-3" cols="12">
                  <VCheckbox v-model="form.integrarFitCertify" label="Desejo integrar meus dados com a FitCertify365 *" color="success" class="font-weight-medium" :rules="[v => !!v || 'Campo obrigatório']" />
                </VCol>

                <VCol cols="12">
                  <v-checkbox v-model="form.declaraVeracidade" color="success" class="font-weight-medium" :rules="[v => !!v || 'Campo obrigatório']" label="Declaro que as informações acima são verdadeiras e autorizo a análise para fins de certificação. *" />
                </VCol>
                <VCol cols="12">
                  <v-checkbox v-model="form.aceitaCompartilharDados" color="success" class="font-weight-medium" :rules="[v => !!v || 'Campo obrigatório']" label="Aceito compartilhar meus dados com as organizações dos eventos que eu participar. *" />
                </VCol>
                <VCol class="my-2 py-0 font-weight-medium" cols="12">
                  <v-checkbox v-model="form.aceitaTermos" color="success" class="font-weight-medium" :rules="[v => !!v || 'Campo obrigatório']">
                    <template #label>
                      <span class="font-weight-medium">
                        Li e concordo com os
                        <span class="cursor-pointer text-decoration-underline" style="color: #88CE0D" @click="showModalTerms = true">
                          termos de Uso e Política de Privacidade*</span>.
                      </span>
                    </template>
                  </v-checkbox>
                </VCol>
              </VRow>
            </v-form>
          </template>

          <template #actions="{ next, prev }">
            <div class="pa-6 d-flex justify-space-between">
              <VBtn :disabled="step === 1" @click="prev" variant="outlined" color="#88CE0D" rounded="xl">
                <v-icon start>mdi-arrow-left</v-icon>Voltar
              </VBtn>
              <VBtn :loading="loading" :disabled="loading" @click="step === 3 ? submitAtleta() : (validateStep() ? next() : toast.error('Preencha todos os campos obrigatórios'))" color="#88CE0D" class="text-white" rounded="xl">
                {{ step === 3 ? 'Cadastrar' : 'Próximo' }}
                <v-icon end>{{ step === 3 ? 'mdi-check' : 'mdi-arrow-right' }}</v-icon>
              </VBtn>
            </div>
          </template>
        </VStepper>
      </v-card-text>
    </v-card>

    <!-- Modal de Termos -->
    <v-dialog v-model="showModalTerms" width="600" height="800">
      <v-card class="py-5 px-md-3 custom-scroll" rounded="xl">
        <v-card-title class="text-center text-h5" style="color: #88CE0D; white-space: normal; word-wrap: break-word;">
          Política de Privacidade, Termos e Condições de Uso e Proteção de Dados
        </v-card-title>
        <v-card-text>
          <p class="mb-5"><strong>1. Introdução</strong></p>
          <p>
            Bem-vindo(a) à <strong>FitCertify365</strong> ("Companhia", "nós", "nosso", "conosco")! <br><br>
            Estes Termos de Serviço ("Termos", "Termos de Serviço", "Termos e Condições de Uso") regem o uso dos
            nossos aplicativos móveis e plataforma digital, desenvolvidos pela FitCertify365.
          </p>
          <p>
            Nossa <strong>Política de Privacidade</strong> também rege o uso do nosso Serviço e explica como coletamos, protegemos e
            divulgamos informações resultantes da sua utilização dos aplicativos móveis e páginas web. <br><br>
            Seu acordo conosco inclui estes Termos e nossa Política de Privacidade ("Acordos"). Ao utilizar
            nossos serviços, você reconhece que leu e compreendeu os Acordos, e concorda em estar legalmente vinculado a
            eles.
          </p>
          <p>
            Caso não concorde (ou não possa cumprir) os Acordos, você não poderá utilizar o Serviço. Neste caso,
            solicitamos que nos comunique pelo e-mail <strong>atendimento@fitcertify365.com</strong> para que possamos buscar
            uma solução. <br><br>
            Estes Termos aplicam-se a todos os visitantes, usuários e demais pessoas que desejarem acessar ou
            utilizar o Serviço.
          </p>
          <p>
            Este aplicativo pode se integrar com o <strong>Apple Saúde (HealthKit ou CareKit)</strong> e
            com o <strong>Google Health Connect</strong>, para leitura e acompanhamento de dados obtidos via
            Apple Watch e outros dispositivos wearables compatíveis, permitindo também o envio de dados manuais e de
            dispositivos Bluetooth (BLE), sempre mediante autorização do usuário.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="w-100 text-white font-weight-bold" @click="maisTermos" height="50px" rounded="lg" style="background-color: #88CE0D">
            Ler Mais
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { vMaska } from 'maska/vue'
import { toast } from 'vue3-toastify'
import AtletaService from '@/services/cadastro-service/atleta-service'
import DoencaService from '@/services/cadastro-service/doenca-service'
import SintomaService from '@/services/cadastro-service/sintoma-service'
import { getErrorMessage } from '@/common/error.utils'

const router = useRouter()
const step = ref(1)
const loading = ref(false)

const form = ref({
  telefone: '', tipoSanguineo: null, genero: null, altura: '', peso: '',
  historicoSaudeDoencas: [], outrasCondicoesMedicas: '', tomaMedicamentoContinuo: '',
  historicoSaudeSintomas: [], objetivo: '', participouProvaAntes: null, ultimaProva: '',
  praticaAtividadeFisicaRegularmente: null, fezCheckupUltimosMeses: null, possuiSmartwatch: null,
  integrarFitCertify: false, declaraVeracidade: false, aceitaCompartilharDados: false, aceitaTermos: false
})

const doencas = ref([])
const sintomas = ref([])
const showModalTerms = ref(false)
const formPdfImage = ref([])

const loadFormFromCache = () => {
  const cached = localStorage.getItem('atletaForm')
  if (cached) {
    const parsed = JSON.parse(cached)
    Object.assign(form.value, parsed)
  }
}

const saveFormToCache = () => {
  localStorage.setItem('atletaForm', JSON.stringify(form.value))
}

watch(form, () => {
  saveFormToCache()
}, { deep: true })

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

const validateStep = () => {
  if (step.value === 1) {
    return form.value.tipoSanguineo && form.value.genero && form.value.altura && form.value.peso && form.value.praticaAtividadeFisicaRegularmente !== null
  }
  if (step.value === 2) {
    return form.value.historicoSaudeDoencas.length > 0 && form.value.historicoSaudeSintomas.length > 0 && form.value.objetivo
  }
  if (step.value === 3) {
    return form.value.participouProvaAntes !== null && form.value.fezCheckupUltimosMeses !== null && form.value.possuiSmartwatch !== null &&
           form.value.integrarFitCertify && form.value.declaraVeracidade && form.value.aceitaCompartilharDados && form.value.aceitaTermos
  }
  return true
}

const handleFileChange = (files) => {
  if (!files) return
  const newFiles = Array.isArray(files) ? files : [files]
  formPdfImage.value = [...formPdfImage.value, ...newFiles]
}

const removeFile = (index) => {
  formPdfImage.value.splice(index, 1)
}

const handleDoencaChange = (item) => {
  const nenhumaId = doencas.value.find(d => d.descricao === 'Nenhuma das anteriores')?.id
  if (!nenhumaId) return

  if (item.id === nenhumaId) {
    if (form.value.historicoSaudeDoencas.includes(nenhumaId)) {
      form.value.historicoSaudeDoencas = [nenhumaId]
    } else {
      form.value.historicoSaudeDoencas = []
    }
  } else {
    form.value.historicoSaudeDoencas = form.value.historicoSaudeDoencas.filter(v => v !== nenhumaId)
  }
}

const handleSintomaChange = (item) => {
  const nenhumId = sintomas.value.find(s => s.descricao === 'Nenhum desses')?.id
  if (!nenhumId) return

  if (item.id === nenhumId) {
    form.value.historicoSaudeSintomas = form.value.historicoSaudeSintomas.includes(nenhumId) ? [nenhumId] : []
  } else {
    form.value.historicoSaudeSintomas = form.value.historicoSaudeSintomas.filter(v => v !== nenhumId)
  }
}

const submitAtleta = async () => {
  if (!validateStep()) {
    toast.error('Preencha todos os campos obrigatórios')
    return
  }
  try {
    loading.value = true
    const formData = new FormData()

    formData.append('telefone', form.value.telefone || '')
    formData.append('tipoSanguineo', form.value.tipoSanguineo || '')
    formData.append('genero', form.value.genero || '')
    formData.append('altura', form.value.altura ? Number(form.value.altura) : 0)
    formData.append('peso', form.value.peso ? Number(form.value.peso) : 0)

    form.value.historicoSaudeDoencas.forEach(id => {
      formData.append('historicoSaudeDoencas', id)
    })

    formData.append('outrasCondicoesMedicas', form.value.outrasCondicoesMedicas || '')
    formData.append('tomaMedicamentoContinuo', form.value.tomaMedicamentoContinuo || '')

    form.value.historicoSaudeSintomas.forEach(id => {
      formData.append('historicoSaudeSintomas', id)
    })
    formData.append('objetivo', form.value.objetivo || '')
    formData.append('participouProvaAntes', form.value.participouProvaAntes ? 'true' : 'false')
    formData.append('ultimaProva', form.value.ultimaProva || '')
    formData.append('praticaAtividadeFisicaRegularmente', form.value.praticaAtividadeFisicaRegularmente ? 'true' : 'false')
    formData.append('fezCheckupUltimosMeses', form.value.fezCheckupUltimosMeses ? 'true' : 'false')
    formData.append('possuiSmartwatch', form.value.possuiSmartwatch ? 'true' : 'false')
    formData.append('integrarFitCertify', form.value.integrarFitCertify ? 'true' : 'false')
    formData.append('declaraVeracidade', form.value.declaraVeracidade ? 'true' : 'false')
    formData.append('aceitaCompartilharDados', form.value.aceitaCompartilharDados ? 'true' : 'false')
    formData.append('aceitaTermos', form.value.aceitaTermos ? 'true' : 'false')

    if (formPdfImage.value?.length > 0) {
      formPdfImage.value.forEach((file) => formData.append('files', file))
    }

    await AtletaService.createAtletaLogado(formData)
    localStorage.removeItem('atletaForm')
    toast.success('Atleta cadastrado com sucesso!')
    router.push('/Atleta-Screens/registrosMedicos')
  } catch (error) {
    toast.error(getErrorMessage(error, 'Erro ao cadastrar atleta'))
  } finally {
    loading.value = false
  }
}

const maisTermos = () => {
  showModalTerms.value = false
  window.open('/politicaPrivacidade', '_blank')
}

onMounted(async () => {
  loadFormFromCache()
  try {
    const [resDoencas, resSintomas] = await Promise.all([
      DoencaService.getAllDoencas(),
      SintomaService.getAllSintomas()
    ])
    doencas.value = resDoencas.data || []
    sintomas.value = resSintomas.data || []
  } catch (error) {
    toast.error('Erro ao carregar dados')
  }
})
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

.cursor-pointer {
  cursor: pointer;
}

.custom-field {
  transition: all 0.3s ease;
}

.custom-field:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(136, 206, 13, 0.15);
}

.custom-field .v-field {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e7ff;
  transition: all 0.3s ease;
}

.custom-field .v-field:hover {
  border-color: #88CE0D;
  box-shadow: 0 4px 12px rgba(136, 206, 13, 0.15);
}

.custom-field .v-field--focused {
  border-color: #88CE0D !important;
  box-shadow: 0 0 0 2px rgba(136, 206, 13, 0.2) !important;
}

.custom-field .v-label {
  color: #64748b;
  font-weight: 500;
}

.custom-field .v-field--focused .v-label {
  color: #88CE0D !important;
}
</style>
