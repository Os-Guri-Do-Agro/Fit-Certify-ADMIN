<template>
  <VRow class="h-100 d-flex flex-column flex-md-row ma-0 pa-0 overflow-hidden fill-height" no-gutters>
    <!-- DIV DA ESQUERDA -->
    <VCol class="pa-0 ma-0" md="4" style="background-color: #00c6fe">
      <VRow class="w-100 h-100 pa-0 ma-0 flex-column" no-gutters>
        <VCol class="pa-0 ma-0 flex-fill" cols="12">
          <RouterLink class="d-flex w-100 h-100 align-end justify-center justify-md-start mt-5 mt-md-0 pb-15"
            to="/login">
            <v-img alt="Logo" class="mx-5 mx-lg-15" cover max-width="200" src="../assets/Login/logo-fit.png" />
          </RouterLink>
        </VCol>

        <VCol class="pa-0 ma-0 d-flex text-center text-md-start flex-column align-center flex-fill" cols="12">
          <h1 class="mx-5 mx-lg-15 text-white text-h5 text-md-h4 font-weight-medium font-italic" style="
              font-family:
                DM Sans,
                sans-serif;
            ">
            {{ titleStep[step - 1] }}
          </h1>
          <p class="mx-5 mx-lg-15 text-white text-center text-md-start text-h6 text-md-h5 font-weight-regular mt-5 mb-10"
            style="
              font-family:
                DM Sans,
                sans-serif;
              line-height: 36px;
            ">
            {{ textStep[step - 1] }}
          </p>
        </VCol>
      </VRow>
    </VCol>

    <!-- DIV DA DIREITA -->
    <VCol class="h-100 d-flex align-center pa-0 ma-0" md="8">
      <v-container class="d-flex ga-10 align-top flex-column fill-height pa-0">
        <VStepper v-model="step" class="d-flex flex-column h-100 w-100 justify-space-between" :items="item">
          <!--Primeiro slid-->
          <template #item.1>
            <v-form :ref="formRef">
              <VRow>
                <VCol class="mb-10 mt-10 mt-md-0" cols="12">
                  <h2 class="text-start text-h5 font-weight-bold" style="color: #88ce0d">
                    1. Informações Pessoais
                  </h2>
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="8"><label for="nomeCompleto">Nome
                    completo:</label>
                  <VTextField id="nomeCompleto" density="compact" v-model="form.nome" name="nomeCompleto"
                    :rules="[rules.requiredNomeObrigatorio]" variant="outlined" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="4"><label for="cpf">CPF</label>
                  <VTextField id="cpf" v-model="form.cpf" v-maska="'###.###.###-##'" density="compact"
                    :rules="[rules.requiredCpfObrigatorio]" name="cpf" placeholder="000.000.000-00"
                    variant="outlined" />
                </VCol>

                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6"><label for="senha">Senha</label>
                  <VTextField id="senha" v-model="form.senha" density="compact"
                    :rules="[rules.requiredSenhaObrigatoria]" name="senha" :type="showPassword ? 'text' : 'password'"
                    variant="outlined">
                    <template #append-inner>
                      <v-icon @click="showPassword = !showPassword" class="cursor-pointer">
                        {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}
                      </v-icon>
                    </template>
                  </VTextField>
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6"><label for="formEmail">E-mail</label>
                  <VTextField id="formEmail" v-model="form.email" density="compact"
                    @blur="(e) => onBlurEmail(e.target.value)" :rules="[rules.requiredEmailObrigatorio]"
                    placeholder="exemplo@dominio.com" type="email" variant="outlined" :loading="loadingEmail" />
                </VCol>

                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6"><label for="telefone">Telefone:</label>
                  <VTextField v-maska="'(##) #####-####'" id="telefone" v-model="form.telefone" density="compact"
                    :rules="[rules.requiredTelefoneObrigatorio]" name="telefone" placeholder="(99) 9 9999-9999"
                    type="tel" variant="outlined" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6"><label for="nascimento">Data de
                    nascimento:</label>
                  <VTextField id="nascimento" v-model="form.dataNascimento" density="compact"
                    :rules="[rules.requiredDataNascimentoObrigatorio]" name="nascimento" v-maska="'##/##/####'"
                    placeholder="DD/MM/AAAA" variant="outlined" />
                </VCol>

                <VCol class="my-0 py-0 font-weight-medium" cols="6" md="12"><label for="altura">Altura (cm):</label>
                  <VTextField id="altura" v-maska="'#.##'" v-model="form.altura" density="compact"
                    :rules="[rules.requiredAlturaObrigatorio]" name="altura" placeholder="0.00cm" variant="outlined" />
                </VCol>

                <VCol class="my-0 py-0 font-weight-medium" cols="6" md="12"><label for="peso">Peso (kg):</label>
                  <VTextField id="peso" v-model="form.peso" v-maska="'###.##'" density="compact"
                    :rules="[rules.requiredPesoObrigatorio]" name="peso" placeholder="0.00kg" variant="outlined" />
                </VCol>

                <VCol class="my-0 py-0 font-weight-medium mb-5" cols="6"><label for="genero">Gênero</label>
                  <v-select id="genero" v-model="form.genero" :items="generos"
                    :rules="[rules.requiredSelectObrigatorio]" density="compact" item-title="title" item-value="value"
                    placeholder="Selecione" variant="outlined" />
                </VCol>

                <VCol class="my-0 py-0 font-weight-medium mb-5" cols="6"><label for="pratica">Tipo Sanguíneo</label>
                  <v-select v-model="form.tipoSanguineo" :items="tiposSanguineos"
                    :rules="[rules.requiredSelectObrigatorio]" density="compact" item-title="title" item-value="value"
                    placeholder="Selecione" variant="outlined" />
                </VCol>

                <VCol class="my-0 py-0 font-weight-medium mb-5" cols="12"><label for="pratica">Pratica atividade física
                    regularmente?</label>
                  <v-select id="pratica" v-model="form.praticaAtividadeFisicaRegularmente" density="compact"
                    :rules="[rules.requiredSelectObrigatorio]" :items="[
                      { title: 'Sim', value: true },
                      { title: 'Não', value: false },
                    ]" placeholder="Selecione" variant="outlined" />
                </VCol>
              </VRow>
            </v-form>
          </template>

          <!--Segundo slide-->
          <template #item.2>
            <v-form>
              <VRow class="pa-0 ma-0 fill-md-height d-flex flex-column flex-md-row">
                <VCol class="d-flex ma-0 pa-0 pr-0 pr-md-3" md="6">
                  <v-row class="d-flex">
                    <v-col cols="12">
                      <h2 class="text-start text-h5 font-weight-bold mb-5" style="color: #88ce0d">
                        2. Histórico de Saúde
                      </h2>
                      <div class="mb-5">
                        <span class="text-black font-weight-medium">Já foi diagnosticado com alguma das condições
                          abaixo?</span>
                      </div>
                      <v-checkbox v-for="(item, index) in doencas" :key="index" v-model="formDoencas"
                        :rules="[rules.requiredCheckObrigatorio]" :label="item.descricao" :value="item.id" hide-details
                        density="compact" color="success" @change="handleDoencaChange(item)" />

                      <VRow>
                        <VCol cols="12">
                          <div class="mt-5 d-flex flex-column">
                            <span class="text-black">Outras condições médicas:</span>
                            <v-textarea v-model="form.outrasCondicoes" class="text-black" color="black"
                              :error-messages="errors.outrasCondicoes" no-resize rows="2" variant="outlined" />
                          </div>
                        </VCol>

                        <VCol cols="12">
                          <div class="mt-5 d-flex flex-column">
                            <span class="text-black">Toma algum medicamento contínuo? Se sim,
                              qual?</span>
                            <v-textarea v-model="form.tomaMedicamento" class="text-black custom-textarea" color="black"
                              :error-messages="errors.tomaMedicamento" max-height="20px" no-resize rows="2"
                              variant="outlined" />
                          </div>
                        </VCol>
                      </VRow>
                    </v-col>
                  </v-row>
                </VCol>

                <VCol class="d-flex pa-0 ma-0" md="6">
                  <v-row class="d-flex h-100">
                    <v-col class="h-100" cols="12">
                      <h2 class="text-start text-h5 font-weight-bold mb-5" style="color: #88ce0d">
                        3. Sinais e Sintomas Recentes
                      </h2>
                      <div class="mb-5">
                        <span class="text-black font-weight-medium">Já foi diagnosticado com alguma das condições
                          abaixo?</span>
                      </div>
                      <v-checkbox v-for="(item, index) in sintomas" :key="index" v-model="formSintomas"
                        :rules="[rules.requiredCheckObrigatorio]" :label="item.descricao" :value="item.id" hide-details
                        density="compact" color="success" @change="handleSintomaChange(item)" />

                      <div class="mt-7">
                        <h2 class="text-start text-h5 font-weight-bold mb-7" style="color: #88ce0d">
                          4. Histórico Esportivo
                        </h2>
                        <VRow>
                          <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="objetivo_atividade">Objetivo
                              com a atividade física:</label>
                            <v-select id="objetivo_atividade" v-model="objetivoAtividade" :items="objetivos"
                              item-title="title" item-value="value" density="compact"
                              :rules="[rules.requiredSelectObrigatorio]" placeholder="Selecione" variant="outlined" />
                          </VCol>
                          <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="Objetivo_pratica">Já
                              participou de provas antes?</label>
                            <v-select id="Objetivo_pratica" v-model="form.participouProva" density="compact"
                              :rules="[rules.requiredSelectObrigatorio]" :items="[
                                { title: 'Sim', value: true },
                                { title: 'Não', value: false },
                              ]" placeholder="Selecione" variant="outlined" />
                          </VCol>

                          <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="ultimasprovas">Se sim, qual a
                              última?</label>
                            <VTextField id="ultimasprovas" v-model="form.ultimaProva" density="compact"
                              name="ultimasprovas" variant="outlined" />
                          </VCol>
                        </VRow>
                      </div>
                    </v-col>
                  </v-row>
                </VCol>
              </VRow>
            </v-form>
          </template>

          <!--Terceiro slide-->
          <template #item.3>
            <v-form>
              <div class="d-flex flex-column justify-space-between">
                <div class="mt-10 mt-md-0 d-flex">
                  <h2 class="text-start text-h5 font-weight-bold mb-5" style="color: #88ce0d">
                    5. Exames e Dados Complementares
                  </h2>
                </div>

                <VRow class="d-flex">
                  <v-form class="w-100">
                    <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="check">Fez check-up nos últimos 12
                        meses?</label><v-select density="comfortable" v-model="form.fezcheckUp"
                        :rules="[rules.requiredSelectObrigatorio]" :items="[
                          { title: 'Sim', value: true },
                          { title: 'Não', value: false },
                        ]" name="check" id="check" placeholder="Selecione" variant="outlined"></v-select></VCol>

                    <VCol cols="12" class="my-0 py-0 font-weight-medium">
                      <label for="arquivos">Anexar exames (PDF ou imagem):</label>
                      <VFileInput density="comfortable" prepend-icon="" name="arquivos" id="arquivos" variant="outlined"
                        accept=".pdf, image/*" @update:model-value="handleFileChange" />
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

                    <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="possuiSmartwatch">Possui smartwatch
                        ou app de treino?</label><v-select density="comfortable" v-model="form.possuiSmartwatch"
                        :rules="[rules.requiredSelectObrigatorio]" :items="[
                          { title: 'Sim', value: true },
                          { title: 'Não', value: false },
                        ]" id="possuiSmartwatch" placeholder="Selecione" variant="outlined"></v-select>
                    </VCol>
                    <VCol class="my-0 px-3" cols="12">
                      <v-checkbox class="font-weight-medium" v-model="form.integrarDados"
                        :rules="[rules.requiredCheckObrigatorio]" color="success" required
                        label=" Desejo integrar meus dados com a FitCertify365"></v-checkbox>
                    </VCol>
                  </v-form>
                </VRow>

                <div class="d-flex flex-column h-100">
                  <h2 class="text-start text-h5 font-weight-bold mb-5" style="color: #88ce0d">
                    6. Declaração
                  </h2>
                  <v-form class="w-100">
                    <v-checkbox v-model="form.declaroInformacoes" :rules="[rules.requiredCheckObrigatorio]"
                      color="success" class="font-weight-medium"
                      label=" Declaro que as informações acima são verdadeiras e autorizo a análise para fins de certificação.">
                    </v-checkbox>

                    <v-checkbox v-model="form.aceitoCompartilhar" :rules="[rules.requiredCheckObrigatorio]"
                      color="success" class="font-weight-medium"
                      label="Aceito compartilhar meus dados com as organizações dos eventos que eu participar.">
                    </v-checkbox>

                    <v-checkbox v-model="form.concordoTermos" :rules="[rules.requiredCheckObrigatorio]" color="success"
                      class="font-weight-medium">
                      <template #label>
                        <span>
                          Li e concordo com os
                          <span class="cursor-pointer text-decoration-underline" style="color: #00c6fe"
                            @click="showModal = true">
                            termos de Uso e Política de Privacidade </span>.
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
                          Bem-vindo(a) à <strong>FitCertify365</strong> (“Companhia”, “nós”,
                          “nosso”, “conosco”)! <br />
                          <br />
                          Estes Termos de Serviço (“Termos”, “Termos de
                          Serviço”, “Termos e Condições de Uso”) regem o uso dos
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
                          Política de Privacidade (“Acordos”). Ao utilizar
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
            </v-form>
          </template>

          <template #actions="{ next, prev }">
            <div class="d-flex justify-space-between w-100 px-6 mb-5 flex-column-reverse flex-md-row align-center ga-3">
              <VBtn class="w-100" :disabled="step === 1 ? true : false" height="43px" max-width="237px"
                style="color: #00c6fe" variant="outlined" @click="prev">
                Voltar
              </VBtn>
              <VBtn class="text-white w-100" height="43px" max-width="237px" :loading="loading"
                :disabled="loading || disabled || !isCurrentStepValid" :style="step === 3
                  ? 'background-color:#88ce0d'
                  : 'background-color: #00c6fe'
                  " @click="handleNext(next)">
                {{
                  step !== 3
                    ? 'Próximo'
                    : loading
                      ? 'Enviando...'
                      : 'Enviar Formulário'
                }}
              </VBtn>
            </div>
          </template>
        </VStepper>
      </v-container>
    </VCol>
  </VRow>
</template>

<script setup >
import { useField, useForm } from 'vee-validate'
import { onMounted, ref, toRaw, computed } from 'vue'
import { useRouter } from 'vue-router'
import AtletaService from '../services/cadastro-service/atleta-service'
import DoencaService from '../services/cadastro-service/doenca-service'
import SintomaService from '../services/cadastro-service/sintoma-service'
import { toast } from 'vue3-toastify'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import userService from '@/services/user/user-service'
import { vMaska } from 'maska/vue'
import customParseFormat from "dayjs/plugin/customParseFormat";
import { isValidDate } from '@/utils/isValidDate'

dayjs.locale('pt-br')
dayjs.extend(customParseFormat);
const step = ref(1)
const router = useRouter()
const loading = ref(false)

const loadingEmail = ref(false)
const disabled = ref(false)
const showPassword = ref(false)
const doencas = ref([])
const sintomas = ref([])
const formRef = ref(null)

const showModal = ref(false)

const form = ref({
  nome: '',
  cpf: '',
  senha: '',
  genero: null,
  email: '',
  telefone: '',
  dataNascimento: '',
  altura: '',
  peso: '',
  objetivoAtividade: '',
  praticaAtividadeFisicaRegularmente: null,
  atividadeFisica: null,
  outrasCondicoes: '',
  tomaMedicamento: '',
  tipoSanguineo: null,
  participouProva: null,
  ultimaProva: '',
  fezcheckUp: null,
  possuiSmartwatch: null,
  integrarDados: false,
  declaroInformacoes: false,
  aceitoCompartilhar: false,
  concordoTermos: false,
})

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

const formPdfImage = ref([])

const formDoencas = ref([])

const formSintomas = ref([])

async function onBlurEmail(email) {
  loadingEmail.value = true
  await userService
    .validarExisteEmail(email)
    .then((resp) => {
      const data = resp?.data

      if (data?.existeEmail == true) {
        toast.error(data?.message)
        disabled.value = true
        return
      } else {
        disabled.value = false
      }
    })
    .finally(() => (loadingEmail.value = false))
}

function maisTermos() {
  showModal.value = false
  window.open('/politicaPrivacidade', '_blank')
}

function handleFileChange(files) {
  if (!files) return
  const newFiles = Array.isArray(files) ? files : [files]
  formPdfImage.value = [...formPdfImage.value, ...newFiles]
}
function removeFile(index) {
  formPdfImage.value.splice(index, 1)
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '')
  if (cpf.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpf)) return false

  let soma = 0
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i)
  let resto = (soma * 10) % 11
  if (resto === 10) resto = 0
  if (resto !== parseInt(cpf[9])) return false

  soma = 0
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i)
  resto = (soma * 10) % 11
  if (resto === 10) resto = 0
  if (resto !== parseInt(cpf[10])) return false

  return true
}

function validarEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}

function validarSenhaForte(senha) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{8,}$/
  return regex.test(senha)
}

function formatarDataParaISO(dataDigitada) {
  if (!dataDigitada) return "";
  const data = dayjs(dataDigitada, "DD/MM/YYYY", true);

  return data.isValid() ? data.startOf("day").toISOString() : "";
}


function handleDoencaChange(item) {
  const nenhumaId = doencas.value.find(
    (d) => d.descricao === 'Nenhuma das anteriores'
  )?.id

  if (!nenhumaId) return

  if (item.id === nenhumaId) {
    if (formDoencas.value.includes(nenhumaId)) {
      formDoencas.value = [nenhumaId]
    } else {
      formDoencas.value = []
    }
  } else {
    formDoencas.value = formDoencas.value.filter((v) => v !== nenhumaId)
  }
}

function handleSintomaChange(item) {
  const nenhumId = sintomas.value.find(
    (s) => s.descricao === 'Nenhum desses'
  )?.id
  if (!nenhumId) return

  if (item.id === nenhumId) {
    formSintomas.value = formSintomas.value.includes(nenhumId) ? [nenhumId] : []
  } else {
    formSintomas.value = formSintomas.value.filter((v) => v !== nenhumId)
  }
}

const rules = {
  requiredNomeObrigatorio: (value) => !!value || 'Nome obrigatório',

  requiredCpfObrigatorio: (value) => {
    if (!value) return 'CPF obrigatório'
    return validarCPF(value) || 'CPF inválido'
  },

  requiredEmailObrigatorio: (value) => {
    if (!value) return 'E-mail obrigatório'
    return validarEmail(value) || 'E-mail inválido'
  },

  requiredSenhaObrigatoria: (value) => {
    if (!value) return 'Senha obrigatória'
    return (
      validarSenhaForte(value) ||
      'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial'
    )
  },

  requiredTelefoneObrigatorio: (value) => !!value || 'Telefone obrigatório',

  requiredDataNascimentoObrigatorio: (value) => {
    if (!value) return 'Data de nascimento obrigatória'
    return isValidDate(value) || 'Data de nascimento inválida'
  },

  requiredAlturaObrigatorio: (value) => !!value || 'Altura obrigatória',
  requiredPesoObrigatorio: (value) => !!value || 'Peso obrigatório',
  requiredSelectObrigatorio: (value) =>
    value !== null && value !== undefined ? true : 'Campo obrigatório',
  requiredCheckObrigatorio: (value) => !!value || 'Campo obrigatório',
}

// Validações para cada step
const isStep1Valid = computed(() => {
  return (
    form.value.nome &&
    form.value.cpf &&
    validarCPF(form.value.cpf) &&
    form.value.senha &&
    validarSenhaForte(form.value.senha) &&
    form.value.email &&
    validarEmail(form.value.email) &&
    form.value.telefone &&
    form.value.dataNascimento &&
    isValidDate(form.value.dataNascimento) &&
    form.value.altura &&
    form.value.peso &&
    form.value.genero !== null &&
    form.value.tipoSanguineo !== null &&
    form.value.praticaAtividadeFisicaRegularmente !== null &&
    !disabled.value
  )
})

const isStep2Valid = computed(() => {
  return (
    formDoencas.value.length > 0 &&
    formSintomas.value.length > 0 &&
    objetivoAtividade.value &&
    form.value.participouProva !== null
  )
})

const isStep3Valid = computed(() => {
  return (
    form.value.fezcheckUp !== null &&
    form.value.possuiSmartwatch !== null &&
    form.value.integrarDados &&
    form.value.declaroInformacoes &&
    form.value.aceitoCompartilhar &&
    form.value.concordoTermos
  )
})

const isCurrentStepValid = computed(() => {
  switch (step.value) {
    case 1:
      return isStep1Valid.value
    case 2:
      return isStep2Valid.value
    case 3:
      return isStep3Valid.value
    default:
      return false
  }
})


const { handleSubmit, errors } = useForm({
  validateOnMount: false,
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
})

onMounted(async () => {
  await buscarDoenca()
  await buscarSintoma()
})

const buscarDoenca = async () => {
  try {
    const res = await DoencaService.getAllDoencas()
    doencas.value = res.data || []
  } catch (error) {
    console.error('Erro ao carregar doenças', error)
  }
}

const buscarSintoma = async () => {
  try {
    const res = await SintomaService.getAllSintomas()
    sintomas.value = res.data || []
  } catch (error) {
    console.error('Erro ao carregar sintomas', error)
  }
}

const submitAtleta = handleSubmit(async () => {

  try {
    loading.value = true
    const values = toRaw(form.value)
    const sintomas = toRaw(formSintomas.value)
    const doencas = toRaw(formDoencas.value)
    const arquivos = toRaw(formPdfImage.value)
    const formData = new FormData()

    //STRING NESSA BOMBA
    formData.append('nome', values.nome || '')
    formData.append('senha', values.senha || '')
    formData.append('cpf', form.value.cpf.replace(/\D/g, '') || '')
    formData.append('email', values.email || '')
    formData.append('genero', values.genero || '')
    formData.append('telefone', values.telefone.replace(/\D/g, '') || '')
    formData.append('objetivo', objetivoAtividade.value || '')
    formData.append('outrasCondicoesMedicas', values.outrasCondicoes || '')
    formData.append('tomaMedicamentoContinuo', values.tomaMedicamento || '')
    formData.append('ultimaProva', values.ultimaProva || '')
    formData.append('historicoSaudeDoencas', doencas)
    formData.append('historicoSaudeSintomas', sintomas)
    formData.append('tipoSanguineo', values.tipoSanguineo || '')
    formData.append(
      'dataNascimento',
      formatarDataParaISO(values.dataNascimento)
    )

    if (arquivos?.length > 0) {
      arquivos.forEach((file) => {
        formData.append('files', file)
      })
    }

    //NUMBER NESSA BOMBA
    formData.append(
      'altura',
      values.altura ? Number(values.altura.replace(',', '.')) : 0
    )
    formData.append(
      'peso',
      values.peso ? Number(values.peso.replace(',', '.')) : 0
    )

    //BOOLEAN NESSA BOMBA

    formData.append(
      'praticaAtividadeFisicaRegularmente',
      values.praticaAtividadeFisicaRegularmente ? 'true' : 'false'
    )
    formData.append(
      'participouProvaAntes',
      values.participouProva ? 'true' : 'false'
    )
    formData.append(
      'fezCheckupUltimosMeses',
      values.fezcheckUp ? 'true' : 'false'
    )
    formData.append(
      'possuiSmartwatch',
      values.possuiSmartwatch ? 'true' : 'false'
    )
    formData.append(
      'integrarFitCertify',
      values.integrarDados ? 'true' : 'false'
    )
    formData.append(
      'declaraVeracidade',
      values.declaroInformacoes ? 'true' : 'false'
    )
    formData.append(
      'aceitaCompartilharDados',
      values.aceitoCompartilhar ? 'true' : 'false'
    )
    formData.append('aceitaTermos', values.concordoTermos ? 'true' : 'false')

    const response = await AtletaService.createAtleta(formData)

    if (response.success) {
      loading.value = false
      router.push('/login').then(() => {
        toast.success('Cadastro realizado com sucesso!', { autoClose: 2500 })
      })
    } else {
      loading.value = false
      toast.error(response?.message || 'Não foi possível concluir o cadastro')
    }
  } catch (error) {
    loading.value = false
    toast.error('Erro ao cadastrar. Tente novamente!', { autoClose: 3000 })
    console.error(error)
  }
})

const { value: objetivoAtividade } = useField('objetivosItens')

const objetivos = ref([
  { title: 'Saúde Geral', value: 'Saúde Geral' },
  { title: 'Objetivo 02', value: 'Objetivo 02' },
  { title: 'Objetivo 03', value: 'Objetivo 03' },
])

const handleNext = async (next) => {
  if (step.value === 3) {
    try {
      await submitAtleta()
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
    }
  } else {
    next()
  }
}

const item = ['Cadastro Básico', 'Cadastro Saúde', 'Cadastro Saude 2']

const titleStep = [
  'Comece agora sua jornada com mais saúde e performance.',
  '',
  '',
  'Comece agora sua jornada com mais saúde e performance.',
]

const textStep = [
  'Criar sua conta na FitCertify365 é rápido, seguro e gratuito. Com ela, você poderá emitir certificados, acompanhar seus marcadores de saúde e aproveitar benefícios exclusivos no nosso marketplace.',
  'Precisamos desses dados para compor seu perfil de saúde. Nenhuma informação será compartilhada sem sua autorização.',
  'Se você já realizou exames recentemente, pode anexar para agilizar sua avaliação.Também é possível integrar com dados de aplicativos ou dispositivos como smartwatch.',
  'Criar sua conta na FitCertify365 é rápido, seguro e gratuito.Com ela, você poderá validar certificados, acompanhar seus marcadores de saúde e aproveitar benefícios exclusivos no nosso marketplace.',
]
</script>

<style scoped>
.teste {
  background-color: red;
}

label,
h2 {
  font-family: 'DM Sans', sans-serif;
}

input[type='date']::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
  appearance: none;
}

.custom-scroll {
  overflow-y: auto;
}

.custom-scroll::-webkit-scrollbar {
  display: none;
}

.custom-scroll {
  scrollbar-width: none;
}
</style>
