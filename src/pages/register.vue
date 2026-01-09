<template>
  <VRow class="h-100 d-flex flex-column flex-md-row ma-0 pa-0 overflow-hidden fill-height" no-gutters>
    <!-- DIV DA ESQUERDA -->
    <VCol class="pa-0 ma-0 position-relative" md="4" style="background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); overflow: hidden;">
      <div style="position: absolute; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,0.1); top: -100px; right: -100px;"></div>
      <div style="position: absolute; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,0.08); bottom: 50px; left: -50px;"></div>

      <div class="w-100 h-100 pa-0 ma-0 flex-column justify-center align-center d-flex" no-gutters style="z-index: 1;">
        <div class=" mb-10" >
          <RouterLink class="d-flex justify-center align-center"
            to="/login" style="transition: transform 0.3s ease;" @mouseenter="$event.currentTarget.style.transform = 'scale(1.05)'" @mouseleave="$event.currentTarget.style.transform = 'scale(1)'">
            <v-img alt="Logo" class="mx-5 mx-lg-16 img-size w-100" cover max-width="300"  src="../assets/Login/logo-fit.png" style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));" />
          </RouterLink>
        </div>

        <div class="pa-0 ma-0 d-flex text-center flex-column align-center" >
          <h1 class="mx-5 mx-lg-15 text-white text-h5 text-center text-md-h4 font-weight-bold" style="
              font-family: DM Sans, sans-serif;
              text-shadow: 0 2px 8px rgba(0,0,0,0.15);
              letter-spacing: -0.5px;
            ">
            {{ $t(`register.leftPanel.title${step}`) }}
          </h1>
          <p class="mx-5 mx-lg-15 text-white text-center text-body-1 text-md-h6 font-weight-regular mt-5 mb-10"
            style="
              font-family: DM Sans, sans-serif;
              line-height: 1.6;
              opacity: 0.95;
            ">
            {{ $t(`register.leftPanel.text${step}`) }}
          </p>
        </div>
      </div>
    </VCol>

    <!-- DIV DA DIREITA -->
    <VCol class="h-100 d-flex align-center pa-0 ma-0" md="8" style="background: #f8f9fa;">
        <VStepper v-model="step" class="d-flex flex-column h-100 w-100 justify-space-between elevation-0" :items="item" style="background: transparent;">
          <!--Primeiro slid-->
          <template #item.1>
            <v-form :ref="formRef">
              <VRow class="px-4 px-md-8">
                <VCol class="mb-6 mt-10 mt-md-0" cols="12">
                  <div class="d-flex align-center ga-3">
                    <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                      <v-icon color="white" size="20">mdi-account</v-icon>
                    </div>
                    <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                      {{ $t('register.personalInfo.title') }}
                    </h2>
                  </div>
                </VCol>
                <VCol class="my-2 py-0 font-weight-medium" cols="12">
                  <v-select id="tipoPerfil" v-model="form.tipoPerfil" :items="perfilOptions"
                    :rules="[rules.requiredSelectObrigatorio]" item-title="nome" item-value="id"
                    :placeholder="$t('register.personalInfo.profilePlaceholder')" :label="$t('register.personalInfo.profile')" variant="outlined" rounded="lg"
                    bg-color="white" class="custom-field" @update:model-value="onPerfilChange" />
                </VCol>
                <VCol class="my-2 py-0 font-weight-medium" cols="12" md="8">
                  <VTextField id="nomeCompleto" v-model="form.nome" name="nomeCompleto"
                    :rules="[rules.requiredNomeObrigatorio]" :label="$t('register.personalInfo.fullName')" variant="outlined" rounded="lg"
                    bg-color="white" class="custom-field" />
                </VCol>
                <VCol class="my-2 py-0 font-weight-medium" cols="12" md="4">
                  <VTextField id="cpf" v-model="form.cpf" v-maska="'###.###.###-##'"
                    :rules="[rules.requiredCpfObrigatorio]" name="cpf" :placeholder="$t('register.personalInfo.cpfPlaceholder')"
                    :label="$t('register.personalInfo.cpf')" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
                </VCol>

                <VCol class="my-2 py-0 font-weight-medium" cols="12" :md="perfilSelecionado?.nome !== 'Treinador' ? 6 : 12">
                  <VTextField id="formEmail" v-model="form.email"
                    @blur="(e) => onBlurEmail(e.target.value)" :rules="[rules.requiredEmailObrigatorio]"
                    :placeholder="$t('register.personalInfo.emailPlaceholder')" type="email" :label="$t('register.personalInfo.email')" variant="outlined" rounded="lg"
                    bg-color="white" :loading="loadingEmail" class="custom-field" />
                </VCol>

                <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6" v-if="perfilSelecionado?.nome !== 'Treinador'">
                  <VTextField id="telefone" v-model="form.telefone" v-maska="'(##) #####-####'"
                    :rules="[rules.requiredTelefoneObrigatorio]" name="telefone" :placeholder="$t('register.personalInfo.phonePlaceholder')"
                    type="tel" :label="$t('register.personalInfo.phone')" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
                </VCol>

                <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
                  <VTextField id="senha" v-model="form.senha"
                    :rules="[rules.requiredSenhaObrigatoria]" name="senha" :type="showPassword ? 'text' : 'password'"
                    :label="$t('register.personalInfo.password')" variant="outlined" rounded="lg" bg-color="white" class="custom-field">
                    <template #append-inner>
                      <v-icon @click="showPassword = !showPassword" class="cursor-pointer" color="#00c6fe">
                        {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}
                      </v-icon>
                    </template>
                  </VTextField>
                </VCol>

                <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
                  <VTextField id="confirmarSenha" v-model="form.confirmarSenha"
                    :rules="[rules.requiredConfirmarSenha]" name="confirmarSenha" :type="showConfirmPassword ? 'text' : 'password'"
                    :label="$t('register.personalInfo.confirmPassword')" variant="outlined" rounded="lg" bg-color="white" class="custom-field">
                    <template #append-inner>
                      <v-icon @click="showConfirmPassword = !showConfirmPassword" class="cursor-pointer" color="#00c6fe">
                        {{ showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off' }}
                      </v-icon>
                    </template>
                  </VTextField>
                </VCol>

                <VCol class="my-2 py-0 font-weight-medium" cols="12">
                  <VTextField id="nascimento" v-model="form.dataNascimento" v-if="perfilSelecionado?.nome !== 'Treinador'"
                    :rules="[rules.requiredDataNascimentoObrigatorio]" name="nascimento" v-maska="'##/##/####'"
                    :placeholder="$t('register.personalInfo.birthDatePlaceholder')" :label="$t('register.personalInfo.birthDate')" variant="outlined" rounded="lg"
                    bg-color="white" class="custom-field" />
                </VCol>
              </VRow>
            </v-form>
          </template>

          <!--Segundo slide-->
          <template #item.2>
            <PacienteForm
              v-if="perfilSelecionado?.nome === 'Atleta'"
              :current-step="2"
              :form="form"
              v-model:form-doencas="formDoencas"
              v-model:form-sintomas="formSintomas"
              v-model:objetivo-atividade="objetivoAtividade"
              v-model:form-pdf-image="formPdfImage"
              :doencas="doencas"
              :sintomas="sintomas"
              :errors="errors"
            />
            <MedicoForm
              v-if="perfilSelecionado?.nome === 'Médico'"
              :current-step="2"
              :form="form"
              :loading-cep="loadingCep"
              @buscar-cep="buscarCep"
              @handle-file-change="handleFileChange"
            />
            <FisioterapeutaForm
              v-if="perfilSelecionado?.nome === 'Fisioterapeuta'"
              :current-step="2"
              :form="form"
              :loading-cep="loadingCep"
              @buscar-cep="buscarCep"
              @handle-file-change="handleFileChange"
            />
          </template>

          <!--Terceiro slide-->
          <template #item.3>
            <PacienteForm
              v-if="perfilSelecionado?.nome === 'Atleta'"
              :current-step="3"
              :form="form"
              v-model:form-doencas="formDoencas"
              v-model:form-sintomas="formSintomas"
              v-model:objetivo-atividade="objetivoAtividade"
              v-model:form-pdf-image="formPdfImage"
              :doencas="doencas"
              :sintomas="sintomas"
              :errors="errors"
            />
            <MedicoForm
              v-if="perfilSelecionado?.nome === 'Médico'"
              :current-step="3"
              :form="form"
              :loading-cep="loadingCep"
              @buscar-cep="buscarCep"
              @handle-file-change="handleFileChange"
            />
            <FisioterapeutaForm
              v-if="perfilSelecionado?.nome === 'Fisioterapeuta'"
              :current-step="3"
              :form="form"
              :loading-cep="loadingCep"
              @buscar-cep="buscarCep"
              @handle-file-change="handleFileChange"
            />
          </template>

          <!--Quarto slide-->
          <template #item.4>
            <PacienteForm
              v-if="perfilSelecionado?.nome === 'Atleta'"
              :current-step="4"
              :form="form"
              v-model:form-doencas="formDoencas"
              v-model:form-sintomas="formSintomas"
              v-model:objetivo-atividade="objetivoAtividade"
              v-model:form-pdf-image="formPdfImage"
              :doencas="doencas"
              :sintomas="sintomas"
              :errors="errors"
            />
            <MedicoForm
              v-if="perfilSelecionado?.nome === 'Médico'"
              :current-step="4"
              :form="form"
              :loading-cep="loadingCep"
              @buscar-cep="buscarCep"
              @handle-file-change="handleFileChange"
            />
            <FisioterapeutaForm
              v-if="perfilSelecionado?.nome === 'Fisioterapeuta'"
              :current-step="4"
              :form="form"
              :loading-cep="loadingCep"
              @buscar-cep="buscarCep"
              @handle-file-change="handleFileChange"
            />
          </template>

          <template #actions="{ next, prev }">
            <div class="pa-6 px-md-10">

              <!-- Botões -->
              <div class="d-flex justify-space-between w-100 flex-column-reverse flex-md-row align-center ga-4">
                <VBtn class="w-100" :disabled="step === 1" height="50px" max-width="237px"
                  color="#00c6fe" variant="outlined" rounded="xl" @click="prev"
                  style="border-width: 2px; font-weight: 600; text-transform: none; letter-spacing: 0;">
                  <v-icon start>mdi-arrow-left</v-icon>
                  {{ $t('register.buttons.back') }}
                </VBtn>
                <VBtn class="text-white w-100" height="50px" max-width="237px" :loading="loading"
                  :disabled="loading || disabled || !isCurrentStepValid"
                  :color="(step === 4 || perfilSelecionado?.nome === 'Treinador') ? '#88ce0d' : '#00c6fe'"
                  rounded="xl" elevation="4" @click="handleNext(next)"
                  style="font-weight: 600; text-transform: none; letter-spacing: 0;">
                  {{
                    (step !== 4 && perfilSelecionado?.nome !== 'Treinador')
                      ? $t('register.buttons.next')
                      : loading
                        ? $t('register.buttons.sending')
                        : $t('register.buttons.submit')
                  }}
                  <v-icon v-if="step !== 4 && perfilSelecionado?.nome !== 'Treinador'" end>mdi-arrow-right</v-icon>
                  <v-icon v-else end>mdi-check</v-icon>
                </VBtn>
              </div>
            </div>
          </template>
        </VStepper>
    </VCol>
  </VRow>
</template>

<script setup>
import { useField, useForm } from 'vee-validate'
import { ref, toRaw, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AtletaService from '../services/cadastro-service/atleta-service'
import medicoService from '@/services/medico/medico-service'
import { toast } from 'vue3-toastify'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import userService from '@/services/user/user-service'
import { vMaska } from 'maska/vue'
import customParseFormat from "dayjs/plugin/customParseFormat";
import { isValidDate } from '@/utils/isValidDate'
import { removerOffsetTimezone } from '@/utils/date.utils'
import { getErrorMessage } from '@/common/error.utils'
import PacienteForm from '@/components/PacienteForm.vue'
import MedicoForm from '@/components/MedicoForm.vue'
import FisioterapeutaForm from '@/components/FisioterapeutaForm.vue'
import DoencaService from '@/services/cadastro-service/doenca-service'
import SintomaService from '@/services/cadastro-service/sintoma-service'
import perfilService from '@/services/perfil/perfil-service'
import cadastromSimplificadoService from '@/services/cadastro-simplificado/cadastromSimplificado-service'
import fisioterapeutaService from '@/services/fisioterapeutas/fisioterapeuta-service'
import treinadorService from '@/services/treinador/treinador-service'

dayjs.locale('pt-br')
dayjs.extend(customParseFormat);
const step = ref(1)
const router = useRouter()
const { t, locale } = useI18n()
const loading = ref(false)

const loadingEmail = ref(false)
const loadingCep = ref(false)
const disabled = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const formRef = ref(null)

const getPerfis = (nome) => {
  const map = {
    'Atleta': 'atleta',
    'Médico': 'medico',
    'Fisioterapeuta': 'fisioterapeuta',
    'Treinador': 'treinador',
  }
  return map[nome] || nome
}


const form = ref({
  tipoPerfil: null,
  nome: '',
  cpf: '',
  senha: '',
  confirmarSenha: '',
  genero: null,
  email: '',
  telefone: '',
  dataNascimento: '',
  tipoSanguineo: null,
  altura: '',
  peso: '',
  objetivoAtividade: '',
  praticaAtividadeFisicaRegularmente: null,
  atividadeFisica: null,
  outrasCondicoes: '',
  tomaMedicamento: '',
  participouProva: null,
  ultimaProva: '',
  fezcheckUp: null,
  possuiSmartwatch: null,
  integrarDados: false,
  declaroInformacoes: false,
  aceitoCompartilhar: false,
  concordoTermos: false,
  // Campos específicos do médico
  crm: '',
  ufCrm: '',
  especializacao: '',
  experiencia: '',
  foco: '',
  perfil: '',
  carreira: '',
  destaques: '',
  diaFuncionamentoInicio: '',
  diaFuncionamentoFim: '',
  horarioInicio: '',
  horarioFim: '',
  cep: '',
  rua: '',
  bairro: '',
  numero: '',
  cidade: '',
  uf: '',
  linkInstagram: '',
  linkFacebook: '',
  declaraVeracidade: false,
  aceitaCompartilharDados: false,
  aceitaTermos: false,
  assinatura: null,
  //Campos específicos do fisioterapeuta
  codigoConvite: null,
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

let debounceTimer = null

// CADASTRO DE TREINADOR
const criarCadastroSimplificado = async () => {
  if (!form.value.nome || !form.value.email || !form.value.telefone || !form.value.tipoPerfil) {
    return
  }
  try {
    const data = {
      nome: form.value.nome,
      email: form.value.email,
      telefone: form.value.telefone,
      perfilId: form.value.tipoPerfil
    }
    await cadastromSimplificadoService.createCdastroSimples(data)
  } catch (error) {
    console.error('Erro ao criar cadastro simplificado:', getErrorMessage(error, 'Erro desconhecido'))
  }
}

const tiposPerfil = ref([])

const perfilOptions = computed(() => {
  return [
    { id: null, nome: 'Selecionar Perfil' },
    ...tiposPerfil.value.map(perfil => ({
      id: perfil.id,
      nome: t(`login.roles.${getPerfis(perfil.nome)}`)
    }))
  ]
})

const perfilSelecionado = computed(() => {
  return tiposPerfil.value.find(p => p.id === form.value.tipoPerfil)
})

const buscarPerfis = async () => {
  try {
    const response = await perfilService.getPerfis()
    tiposPerfil.value = response.data || []
  } catch (error) {
    console.error('Erro ao carregar perfis:', getErrorMessage(error, 'Erro desconhecido'))
  }
}

onMounted(() => {
  buscarPerfis()
  carregarDadosPaciente()
  carregarCadastroCache()
})


const formPdfImage = ref([])
const formDoencas = ref([])
const formSintomas = ref([])
const doencas = ref([])
const sintomas = ref([])

const { value: objetivoAtividade } = useField('objetivosItens')

const EXPIRES_IN = 7200000 * 2

const saveForm = () => {
  localStorage.setItem('cadastro_cache', JSON.stringify({
    form: form.value,
    formDoencas: formDoencas.value,
    formSintomas: formSintomas.value,
    objetivoAtividade: objetivoAtividade.value,
    timestamp: Date.now()
  }))
}

const carregarCadastroCache = () => {
  const cadastroCache = localStorage.getItem('cadastro_cache')
  if (cadastroCache) {
    const { form: formCache, formDoencas: doencasCache, formSintomas: sintomasCache, objetivoAtividade: objetivoCache, timestamp } = JSON.parse(cadastroCache)
    if (Date.now() - timestamp <= EXPIRES_IN) {
      form.value = { ...form.value, ...formCache }
      if (doencasCache) formDoencas.value = doencasCache
      if (sintomasCache) formSintomas.value = sintomasCache
      if (objetivoCache) objetivoAtividade.value = objetivoCache
    } else {
      localStorage.removeItem('cadastro_cache')
    }
  }
}

watch(
  () => [form.value, formDoencas.value, formSintomas.value, objetivoAtividade.value],
  () => {
    saveForm()
    if (form.value?.nome && form.value?.email && form.value?.telefone && form.value?.tipoPerfil && !disabled.value && !loadingEmail.value && onBlurEmail) {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        criarCadastroSimplificado()
      }, 3000)
    }
  },
  { deep: true }
)

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

const carregarDadosPaciente = async () => {
  await Promise.all([buscarDoenca(), buscarSintoma()])
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

  return data.isValid() ? removerOffsetTimezone(data.startOf("day").toISOString()) : "";
}

const formatarHorarioParaISO = (horario) => {
  if (!horario) return ''
  const dataBase = '2000-01-01'
  const [hora, minuto] = horario.split(':')
  const dataComHorario = new Date(dataBase + 'T' + hora + ':' + minuto + ':00.000Z')
  return removerOffsetTimezone(dataComHorario.toISOString())
}

const buscarCep = async (cep) => {
  if (!cep || cep.replace(/\D/g, '').length !== 8) return

  loadingCep.value = true

  try {
    const cepLimpo = cep.replace(/\D/g, '')
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    const data = await response.json()

    if (data.erro) {
      toast.error('CEP não encontrado', { autoClose: 3000 })
      return
    }

    form.value.rua = data.logradouro || ''
    form.value.bairro = data.bairro || ''
    form.value.cidade = data.localidade || ''
    form.value.uf = data.uf || ''
  } catch (error) {
    toast.error('Erro ao buscar CEP: ' + getErrorMessage(error, 'Erro desconhecido'), { autoClose: 3000 })
  } finally {
    loadingCep.value = false
  }
}

const handleFileChange = (file) => {
  if (file) {
    const maxSize = 5 * 1024 * 1024 // 5MB em bytes
    if (file.size > maxSize) {
      toast.error('Arquivo muito grande. Tamanho máximo permitido: 5MB', { autoClose: 3000 })
      return
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Tipo de arquivo não permitido. Use JPG, PNG ou PDF', { autoClose: 3000 })
      return
    }

    form.value.assinatura = file
    toast.success('Arquivo selecionado com sucesso!', { autoClose: 2000 })
  } else {
    form.value.assinatura = null
  }
}

const rules = {
  requiredNomeObrigatorio: (value) => !!value || t('register.validation.nameRequired'),

  requiredCpfObrigatorio: (value) => {
    if (!value) return t('register.validation.cpfRequired')
    return validarCPF(value) || t('register.validation.cpfInvalid')
  },

  requiredEmailObrigatorio: (value) => {
    if (!value) return t('register.validation.emailRequired')
    return validarEmail(value) || t('register.validation.emailInvalid')
  },

  requiredSenhaObrigatoria: (value) => {
    if (!value) return t('register.validation.passwordRequired')
    return (
      validarSenhaForte(value) ||
      t('register.validation.passwordStrength')
    )
  },

  requiredConfirmarSenha: (value) => {
    if (!value) return t('register.validation.confirmPasswordRequired')
    return value === form.value.senha || t('register.validation.passwordsNotMatch')
  },

  requiredTelefoneObrigatorio: (value) => !!value || t('register.validation.phoneRequired'),

  requiredDataNascimentoObrigatorio: (value) => {
    if (!value) return t('register.validation.birthDateRequired')
    return isValidDate(value) || t('register.validation.birthDateInvalid')
  },

  requiredAlturaObrigatorio: (value) => !!value || 'Altura obrigatória',
  requiredPesoObrigatorio: (value) => !!value || 'Peso obrigatório',
  requiredSelectObrigatorio: (value) =>
    value !== null && value !== undefined ? true : t('register.validation.fieldRequired'),
  requiredCheckObrigatorio: (value) => !!value || t('register.validation.fieldRequired'),
}

// Validações para cada step
const isStep1Valid = computed(() => {
  const baseValidation = (
    form.value.tipoPerfil !== null &&
    form.value.nome &&
    form.value.cpf &&
    validarCPF(form.value.cpf) &&
    form.value.email &&
    validarEmail(form.value.email) &&
    form.value.senha &&
    validarSenhaForte(form.value.senha) &&
    form.value.confirmarSenha &&
    form.value.senha === form.value.confirmarSenha &&
    !disabled.value
  )

  if (perfilSelecionado.value?.nome === 'Treinador') {
    return baseValidation
  }

  return (
    baseValidation &&
    form.value.telefone &&
    form.value.dataNascimento &&
    isValidDate(form.value.dataNascimento)
  )
})

const isStep2Valid = computed(() => {
  if (perfilSelecionado.value?.nome === 'Atleta') {
    return (
      form.value.altura &&
      form.value.peso &&
      form.value.genero !== null &&
      form.value.tipoSanguineo !== null &&
      form.value.praticaAtividadeFisicaRegularmente !== null
    )
  } else if (perfilSelecionado.value?.nome === 'Médico') {
    return (
      form.value.crm &&
      form.value.ufCrm
    )
  } else if (perfilSelecionado.value?.nome === 'Fisioterapeuta') {
    return true
  }
  return false
})

const isStep3Valid = computed(() => {
  if (perfilSelecionado.value?.nome === 'Atleta') {
    return (
      formDoencas.value.length > 0 &&
      formSintomas.value.length > 0 &&
      objetivoAtividade.value &&
      form.value.participouProva !== null
    )
  } else if (perfilSelecionado.value?.nome === 'Médico' || perfilSelecionado.value?.nome === 'Fisioterapeuta') {
    return (
      form.value.cep &&
      form.value.rua &&
      form.value.bairro &&
      form.value.numero &&
      form.value.cidade &&
      form.value.uf
    )
  }
  return false
})

const isStep4Valid = computed(() => {
  if (perfilSelecionado.value?.nome === 'Atleta') {
    return (
      form.value.fezcheckUp !== null &&
      form.value.possuiSmartwatch !== null &&
      form.value.integrarDados &&
      form.value.declaroInformacoes &&
      form.value.aceitoCompartilhar &&
      form.value.concordoTermos
    )
  } else if (perfilSelecionado.value?.nome === 'Médico' || perfilSelecionado.value?.nome === 'Fisioterapeuta') {
    return (
      form.value.declaraVeracidade &&
      form.value.aceitaCompartilharDados &&
      form.value.aceitaTermos
    )
  }
  return false
})

const getValidationErrors = () => {
  const errors = []

  if (form.value.tipoPerfil === null) errors.push('Tipo de perfil')
  if (!form.value.nome.trim()) errors.push('Nome completo')
  if (!form.value.cpf.replace(/\D/g, '')) errors.push('CPF')
  if (!validarCPF(form.value.cpf) && form.value.cpf.replace(/\D/g, '')) errors.push('CPF válido')
  if (!form.value.email.trim()) errors.push('Email')
  if (!validarEmail(form.value.email) && form.value.email.trim()) errors.push('Email válido')
  if (!form.value.telefone.replace(/\D/g, '')) errors.push('Telefone')
  if (!form.value.senha) errors.push('Senha')
  if (!validarSenhaForte(form.value.senha) && form.value.senha) errors.push('Senha válida')
  if (!form.value.confirmarSenha) errors.push('Confirmar senha')
  if (form.value.senha !== form.value.confirmarSenha) errors.push('Senhas coincidem')
  if (!form.value.dataNascimento) errors.push('Data de nascimento')
  if (!isValidDate(form.value.dataNascimento) && form.value.dataNascimento) errors.push('Data de nascimento válida')

  if (!form.value.altura) errors.push('Altura')
  if (!form.value.peso) errors.push('Peso')
  if (form.value.genero === null) errors.push('Gênero')
  if (form.value.tipoSanguineo === null) errors.push('Tipo sanguíneo')
  if (formDoencas.value.length === 0) errors.push('Histórico de doenças')
  if (formSintomas.value.length === 0) errors.push('Sintomas recentes')
  if (!objetivoAtividade.value) errors.push('Objetivo com atividade física')
  if (form.value.participouProva === null) errors.push('Participou de provas')

  if (form.value.fezcheckUp === null) errors.push('Fez check-up')
  if (form.value.possuiSmartwatch === null) errors.push('Possui smartwatch')
  if (!form.value.integrarDados) errors.push('Integrar dados com FitCertify365')
  if (!form.value.declaroInformacoes) errors.push('Declarar veracidade das informações')
  if (!form.value.aceitoCompartilhar) errors.push('Aceitar compartilhamento de dados')
  if (!form.value.concordoTermos) errors.push('Aceitar termos de uso')

  return errors
}

const validationErrors = computed(() => getValidationErrors())

const isCurrentStepValid = computed(() => {
  switch (step.value) {
    case 1:
      return isStep1Valid.value
    case 2:
      return isStep2Valid.value
    case 3:
      return isStep3Valid.value
    case 4:
      return isStep4Valid.value
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

const submitAtleta = handleSubmit(async () => {
  try {
    loading.value = true
    const values = toRaw(form.value)
    const sintomas = toRaw(formSintomas.value)
    const doencas = toRaw(formDoencas.value)
    const arquivos = toRaw(formPdfImage.value)
    const formData = new FormData()

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
    formData.append('dataNascimento', formatarDataParaISO(values.dataNascimento))

    if (arquivos?.length > 0) {
      arquivos.forEach((file) => {
        formData.append('files', file)
      })
    }

    formData.append('altura', values.altura ? Number(values.altura.replace(',', '.')) : 0)
    formData.append('peso', values.peso ? Number(values.peso.replace(',', '.')) : 0)
    formData.append('praticaAtividadeFisicaRegularmente', values.praticaAtividadeFisicaRegularmente ? 'true' : 'false')
    formData.append('participouProvaAntes', values.participouProva ? 'true' : 'false')
    formData.append('fezCheckupUltimosMeses', values.fezcheckUp ? 'true' : 'false')
    formData.append('possuiSmartwatch', values.possuiSmartwatch ? 'true' : 'false')
    formData.append('integrarFitCertify', values.integrarDados ? 'true' : 'false')
    formData.append('declaraVeracidade', values.declaroInformacoes ? 'true' : 'false')
    formData.append('aceitaCompartilharDados', values.aceitoCompartilhar ? 'true' : 'false')
    formData.append('aceitaTermos', values.concordoTermos ? 'true' : 'false')

    const response = await AtletaService.createAtleta(formData)

    if (response.success) {
      localStorage.removeItem('cadastro_cache')
      loading.value = false
      router.push('/thank-you?type=paciente').then(() => {
        toast.success(t('register.toasts.registerSuccess'), { autoClose: 2500 })
      })
    } else {
      loading.value = false
      toast.error(response?.message || t('register.toasts.registerError'))
    }
  } catch (error) {
    loading.value = false
    console.error(error)
  }
})

//SUBMIT MÉDICO
const submitMedico = handleSubmit(async () => {
  try {
    loading.value = true
    const values = toRaw(form.value)
    const formData = new FormData()

    formData.append('nome', values.nome || '')
    formData.append('senha', values.senha || '')
    formData.append('cpf', form.value.cpf.replace(/\D/g, '') || '')
    formData.append('email', values.email || '')
    formData.append('telefone', values.telefone.replace(/\D/g, '') || '')
    formData.append('dataNascimento', formatarDataParaISO(values.dataNascimento))
    formData.append('experiencia', values.experiencia || '0')
    formData.append('foco', values.foco || 'Não informado')
    formData.append('perfil', values.perfil || 'Não informado')
    formData.append('carreira', values.carreira || 'Não informado')
    formData.append('destaques', values.destaques || 'Não informado')
    formData.append('diaFuncionamentoInicio', values.diaFuncionamentoInicio || 'Pend')
    formData.append('diaFuncionamentoFim', values.diaFuncionamentoFim || 'Pend')
    formData.append('horarioInicio', formatarHorarioParaISO(values.horarioInicio) || formatarHorarioParaISO('00:00'))
    formData.append('horarioFim', formatarHorarioParaISO(values.horarioFim) || formatarHorarioParaISO('00:00'))
    formData.append('cep', values.cep || '')
    formData.append('rua', values.rua || '')
    formData.append('bairro', values.bairro || '')
    formData.append('numero', values.numero || '')
    formData.append('cidade', values.cidade || '')
    formData.append('uf', values.uf || '')
    formData.append('linkInstagram', values.linkInstagram || '')
    formData.append('linkFacebook', values.linkFacebook || '')
    formData.append('declaraVeracidade', values.declaraVeracidade ? 'true' : 'false')
    formData.append('aceitaCompartilharDados', values.aceitaCompartilharDados ? 'true' : 'false')
    formData.append('aceitaTermos', values.aceitaTermos ? 'true' : 'false')


    await medicoService.createMedico(formData)

    localStorage.removeItem('cadastro_cache')
    loading.value = false
    router.push('/thank-you?type=medico').then(() => {
      toast.success(t('register.toasts.registerSuccess'), { autoClose: 2500 })
    })
  } catch (error) {
    loading.value = false
    toast.error(getErrorMessage(error, 'Não foi possível concluir o cadastro'))
    console.error(error)
  }
})


// SUBMIT FISIOTERAPEUTA
const submitFisioterapeuta = handleSubmit(async () => {
  try {
    loading.value = true
    const values = toRaw(form.value)
    const formData = new FormData()

    formData.append('nome', values.nome)
    formData.append('senha', values.senha)
    formData.append('cpf', values.cpf.replace(/\D/g, ''))
    formData.append('email', values.email)
    formData.append('telefone', values.telefone.replace(/\D/g, ''))
    formData.append('dataNascimento', formatarDataParaISO(values.dataNascimento))
    formData.append('experiencia', values.experiencia ? Number(values.experiencia) : 0)
    formData.append('codigoConvite', values.codigoConvite || null)
    formData.append('foco', values.foco || 'Não informado')
    formData.append('perfil', values.perfil || 'Não informado')
    formData.append('carreira', values.carreira || 'Não informado')
    formData.append('destaques', values.destaques || 'Não informado')
    formData.append('diaFuncionamentoInicio', values.diaFuncionamentoInicio || 'Pend')
    formData.append('diaFuncionamentoFim', values.diaFuncionamentoFim || 'Pend')
    formData.append('horarioInicio', formatarHorarioParaISO(values.horarioInicio) || formatarHorarioParaISO('00:00'))
    formData.append('horarioFim', formatarHorarioParaISO(values.horarioFim) || formatarHorarioParaISO('00:00'))
    formData.append('cep', values.cep)
    formData.append('rua', values.rua)
    formData.append('bairro', values.bairro)
    formData.append('numero', values.numero)
    formData.append('cidade', values.cidade)
    formData.append('uf', values.uf)
    formData.append('linkInstagram', values.linkInstagram || '')
    formData.append('linkFacebook', values.linkFacebook || '')
    formData.append('declaraVeracidade', values.declaraVeracidade ? 'true' : 'false')
    formData.append('aceitaCompartilharDados', values.aceitaCompartilharDados ? 'true' : 'false')
    formData.append('aceitaTermos', values.aceitaTermos ? 'true' : 'false')

    await fisioterapeutaService.createFisioterapeuta(formData)

    localStorage.removeItem('cadastro_cache')
    loading.value = false
    router.push('/thank-you?type=atleta').then(() => {
      toast.success(t('register.toasts.registerSuccess'), { autoClose: 2500 })
    })
  } catch (error) {
    loading.value = false
    toast.error(getErrorMessage(error, t('register.toasts.registerError')))
    console.error(error)
  }
})

// SUBMIT TREINADOR
const submitTreinador = handleSubmit(async () => {
  try {
    loading.value = true
    const values = toRaw(form.value)
    const formData = new FormData()

    formData.append('nome', values.nome)
    formData.append('senha', values.senha)
    formData.append('cpf', values.cpf.replace(/\D/g, ''))
    formData.append('email', values.email)

    await treinadorService.createTreinador(formData)

    localStorage.removeItem('cadastro_cache')
    loading.value = false
    router.push('/thank-you?type=atleta').then(() => {
      toast.success(t('register.toasts.registerSuccess'), { autoClose: 2500 })
    })
  } catch (error) {
    loading.value = false
    toast.error(getErrorMessage(error, t('register.toasts.registerError')))
    console.error(error)
  }
})

const onPerfilChange = async (perfilId) => {
  localStorage.removeItem('cadastro_cache')
}

const handleNext = async (next) => {
  if (perfilSelecionado.value?.nome === 'Treinador') {
    await submitTreinador()
    return
  }

  if (step.value === 4) {
    try {
      if (perfilSelecionado.value?.nome === 'Médico') {
        await submitMedico()
      } else if (perfilSelecionado.value?.nome === 'Fisioterapeuta') {
        await submitFisioterapeuta()
      } else {
        await submitAtleta()
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', getErrorMessage(error, 'Erro desconhecido'))
    }
  } else {
    next()
  }
}

const item = [t('register.steps.step1'), t('register.steps.step2'), t('register.steps.step3'), t('register.steps.step4')]

const titleStep = [
  t('register.leftPanel.title1'),
  t('register.leftPanel.title2'),
  t('register.leftPanel.title3'),
  t('register.leftPanel.title4'),
]

const textStep = [
  t('register.leftPanel.text1'),
  t('register.leftPanel.text2'),
  t('register.leftPanel.text3'),
  t('register.leftPanel.text4'),
]
</script>

<style scoped>
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
  scrollbar-width: none;
}

.custom-scroll::-webkit-scrollbar {
  display: none;
}

:deep(.custom-field .v-field) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

:deep(.custom-field .v-field--error) {
  border-color: #ff5252;
}

:deep(.v-stepper-window) {
  overflow-y: auto;
  max-height: calc(100vh - 200px);
}

:deep(.v-stepper-window::-webkit-scrollbar) {
  width: 8px;
}

:deep(.v-stepper-window::-webkit-scrollbar-track) {
  background: #f1f1f1;
  border-radius: 10px;
}

:deep(.v-stepper-window::-webkit-scrollbar-thumb) {
  background: #00c6fe;
  border-radius: 10px;
}

:deep(.v-stepper-window::-webkit-scrollbar-thumb:hover) {
  background: #0099cc;
}

.v-btn {
  transition: all 0.3s ease;
}

.v-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.v-btn:active:not(:disabled) {
  transform: translateY(0);
}


</style>
