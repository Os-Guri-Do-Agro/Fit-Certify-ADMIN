<template>
  <v-container fluid class="pa-6">
    <v-card rounded="xl" elevation="4">
      <v-card-title class="pa-6 d-flex align-center" style="background: linear-gradient(135deg, #88CE0D 0%, #6ba80a 100%); color: white;">
        <v-icon class="mr-3" color="white" size="32">mdi-run</v-icon>
        <span class="text-h5 font-weight-bold">Cadastrar Novo Atleta</span>
      </v-card-title>

      <v-card-text class="pa-6">
        <VStepper v-model="step" :items="['Dados Físicos', 'Histórico de Saúde', 'Finalização']" class="elevation-0">
          <template #item.1>
            <PacienteForm :current-step="2" :form="form" v-model:form-doencas="formDoencas" v-model:form-sintomas="formSintomas" v-model:objetivo-atividade="objetivoAtividade" v-model:form-pdf-image="formPdfImage" :doencas="doencas" :sintomas="sintomas" :errors="errors" />
          </template>

          <template #item.2>
            <PacienteForm :current-step="3" :form="form" v-model:form-doencas="formDoencas" v-model:form-sintomas="formSintomas" v-model:objetivo-atividade="objetivoAtividade" v-model:form-pdf-image="formPdfImage" :doencas="doencas" :sintomas="sintomas" :errors="errors" />
          </template>

          <template #item.3>
            <PacienteForm :current-step="4" :form="form" v-model:form-doencas="formDoencas" v-model:form-sintomas="formSintomas" v-model:objetivo-atividade="objetivoAtividade" v-model:form-pdf-image="formPdfImage" :doencas="doencas" :sintomas="sintomas" :errors="errors" />
          </template>

          <template #actions="{ next, prev }">
            <div class="pa-6 d-flex justify-space-between">
              <VBtn :disabled="step === 1" @click="prev" variant="outlined" color="#88CE0D" rounded="xl">
                <v-icon start>mdi-arrow-left</v-icon>Voltar
              </VBtn>
              <VBtn :loading="loading" :disabled="loading" @click="step === 3 ? submitAtleta() : next()" color="#88CE0D" class="text-white" rounded="xl">
                {{ step === 3 ? 'Cadastrar' : 'Próximo' }}
                <v-icon end>{{ step === 3 ? 'mdi-check' : 'mdi-arrow-right' }}</v-icon>
              </VBtn>
            </div>
          </template>
        </VStepper>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { vMaska } from 'maska/vue'
import { toast } from 'vue3-toastify'
import { useForm } from 'vee-validate'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import PacienteForm from '@/components/PacienteForm.vue'
import AtletaService from '@/services/cadastro-service/atleta-service'
import DoencaService from '@/services/cadastro-service/doenca-service'
import SintomaService from '@/services/cadastro-service/sintoma-service'
import { isValidDate } from '@/utils/isValidDate'
import { removerOffsetTimezone } from '@/utils/date.utils'
import { getErrorMessage } from '@/common/error.utils'

dayjs.extend(customParseFormat)

const router = useRouter()
const step = ref(1)
const loading = ref(false)

const form = ref({
  dataNascimento: '', genero: null, tipoSanguineo: null, altura: '', peso: '',
  praticaAtividadeFisicaRegularmente: null, outrasCondicoes: '',
  tomaMedicamento: '', participouProva: null, ultimaProva: '', fezcheckUp: null,
  possuiSmartwatch: null, integrarDados: false, declaroInformacoes: false,
  aceitoCompartilhar: false, concordoTermos: false
})

const formDoencas = ref([])
const formSintomas = ref([])
const objetivoAtividade = ref('')
const formPdfImage = ref([])
const doencas = ref([])
const sintomas = ref([])

const { errors } = useForm()

const rules = {
  requiredDataNascimentoObrigatorio: (value) => {
    if (!value) return 'Data de nascimento obrigatória'
    return isValidDate(value) || 'Data de nascimento inválida'
  }
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '')
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false
  let soma = 0
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i)
  let resto = (soma * 10) % 11
  if (resto === 10) resto = 0
  if (resto !== parseInt(cpf[9])) return false
  soma = 0
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i)
  resto = (soma * 10) % 11
  if (resto === 10) resto = 0
  return resto === parseInt(cpf[10])
}

function validarEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

function validarSenhaForte(senha) {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{8,}$/.test(senha)
}

function formatarDataParaISO(dataDigitada) {
  if (!dataDigitada) return ''
  const data = dayjs(dataDigitada, 'DD/MM/YYYY', true)
  return data.isValid() ? removerOffsetTimezone(data.startOf('day').toISOString()) : ''
}

const submitAtleta = async () => {
  try {
    loading.value = true
    const values = toRaw(form.value)
    const sintomas = toRaw(formSintomas.value)
    const doencas = toRaw(formDoencas.value)
    const arquivos = toRaw(formPdfImage.value)
    const formData = new FormData()

    formData.append('dataNascimento', formatarDataParaISO(values.dataNascimento))
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
      arquivos.forEach((file) => formData.append('files', file))
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
      toast.success('Atleta cadastrado com sucesso!')
      router.push('/saude')
    } else {
      toast.error(response?.message || 'Não foi possível concluir o cadastro')
    }
  } catch (error) {
    toast.error(getErrorMessage(error, 'Erro ao cadastrar atleta'))
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
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
