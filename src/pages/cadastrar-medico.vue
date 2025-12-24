<template>
  <v-container fluid class="pa-6">
    <v-card rounded="xl" elevation="4">
      <v-card-title class="pa-6 d-flex align-center" style="background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); color: white;">
        <v-icon class="mr-3" color="white" size="32">mdi-stethoscope</v-icon>
        <span class="text-h5 font-weight-bold">Cadastrar Novo Médico</span>
      </v-card-title>

      <v-card-text class="pa-6">
        <VStepper v-model="step" :items="['Informações Profissionais', 'Endereço', 'Finalização']" class="elevation-0">
          <template #item.1>
            <MedicoForm :current-step="2" :form="form" :loading-cep="loadingCep" @buscar-cep="buscarCep" @handle-file-change="handleFileChange" />
          </template>

          <template #item.2>
            <MedicoForm :current-step="3" :form="form" :loading-cep="loadingCep" @buscar-cep="buscarCep" @handle-file-change="handleFileChange" />
          </template>

          <template #item.3>
            <MedicoForm :current-step="4" :form="form" :loading-cep="loadingCep" @buscar-cep="buscarCep" @handle-file-change="handleFileChange" />
          </template>

          <template #actions="{ next, prev }">
            <div class="pa-6 d-flex justify-space-between">
              <VBtn :disabled="step === 1" @click="prev" variant="outlined" color="#00c6fe" rounded="xl">
                <v-icon start>mdi-arrow-left</v-icon>Voltar
              </VBtn>
              <VBtn :loading="loading" :disabled="loading" @click="step === 3 ? submitMedico() : next()" color="#00c6fe" class="text-white" rounded="xl">
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
import { ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { vMaska } from 'maska/vue'
import { toast } from 'vue3-toastify'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import MedicoForm from '@/components/MedicoForm.vue'
import medicoService from '@/services/medico/medico-service'
import { removerOffsetTimezone } from '@/utils/date.utils'
import { getErrorMessage } from '@/common/error.utils'

dayjs.extend(customParseFormat)

const router = useRouter()
const step = ref(1)
const loading = ref(false)
const loadingCep = ref(false)

const form = ref({
  dataNascimento: '',
  crm: '', ufCrm: '', especializacao: '', experiencia: '', foco: '', perfil: '',
  carreira: '', destaques: '', diaFuncionamentoInicio: '', diaFuncionamentoFim: '',
  horarioInicio: '', horarioFim: '', cep: '', rua: '', bairro: '', numero: '',
  cidade: '', uf: '', linkInstagram: '', linkFacebook: '', declaraVeracidade: false,
  aceitaCompartilharDados: false, aceitaTermos: false, assinatura: null
})

const rules = {
  required: (value) => !!value || 'Campo obrigatório'
}

function formatarDataParaISO(dataDigitada) {
  if (!dataDigitada) return ''
  const data = dayjs(dataDigitada, 'DD/MM/YYYY', true)
  return data.isValid() ? removerOffsetTimezone(data.startOf('day').toISOString()) : ''
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
      toast.error('CEP não encontrado')
      return
    }
    form.value.rua = data.logradouro || ''
    form.value.bairro = data.bairro || ''
    form.value.cidade = data.localidade || ''
    form.value.uf = data.uf || ''
  } catch (error) {
    toast.error('Erro ao buscar CEP')
  } finally {
    loadingCep.value = false
  }
}

const handleFileChange = (file) => {
  if (file) {
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error('Arquivo muito grande. Tamanho máximo: 5MB')
      return
    }
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Tipo de arquivo não permitido. Use JPG, PNG ou PDF')
      return
    }
    form.value.assinatura = file
    toast.success('Arquivo selecionado com sucesso!')
  } else {
    form.value.assinatura = null
  }
}

const submitMedico = async () => {
  try {
    loading.value = true
    const values = toRaw(form.value)
    const formData = new FormData()

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
    toast.success('Médico cadastrado com sucesso!')
    router.push('/resumo')
  } catch (error) {
    toast.error(getErrorMessage(error, 'Erro ao cadastrar médico'))
  } finally {
    loading.value = false
  }
}
</script>
