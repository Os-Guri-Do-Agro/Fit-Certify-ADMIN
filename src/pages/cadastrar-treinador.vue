<template>
  <v-container fluid class="pa-6">
    <v-card rounded="xl" elevation="4">
      <v-card-title class="pa-6 d-flex align-center" style="background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); color: white;">
        <v-icon class="mr-3" color="white" size="32">mdi-whistle</v-icon>
        <span class="text-h5 font-weight-bold">Cadastrar Novo Treinador</span>
      </v-card-title>

      <v-card-text class="pa-6">
        <v-form>
          <VRow>
            <VCol cols="12" md="8">
              <VTextField v-model="form.nome" :rules="[rules.required]" label="Nome completo*" variant="outlined" rounded="lg" />
            </VCol>
            <VCol cols="12" md="4">
              <VTextField v-model="form.cpf" v-maska="'###.###.###-##'" :rules="[rules.required]" label="CPF*" variant="outlined" rounded="lg" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="form.email" :rules="[rules.required]" label="E-mail*" variant="outlined" rounded="lg" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="form.senha" :rules="[rules.required]" :type="showPassword ? 'text' : 'password'" label="Senha*" variant="outlined" rounded="lg">
                <template #append-inner>
                  <v-icon @click="showPassword = !showPassword">{{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                </template>
              </VTextField>
            </VCol>
          </VRow>

          <div class="d-flex justify-end mt-6">
            <VBtn :loading="loading" :disabled="loading" @click="submitTreinador" color="#ff9800" class="text-white" rounded="xl" size="large">
              Cadastrar Treinador
              <v-icon end>mdi-check</v-icon>
            </VBtn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { vMaska } from 'maska/vue'
import { toast } from 'vue3-toastify'
import treinadorService from '@/services/treinador/treinador-service'
import { getErrorMessage } from '@/common/error.utils'

const router = useRouter()
const loading = ref(false)
const showPassword = ref(false)

const form = ref({
  nome: '',
  cpf: '',
  email: '',
  senha: ''
})

const rules = {
  required: (value) => !!value || 'Campo obrigatório'
}

const submitTreinador = async () => {
  try {
    loading.value = true
    const values = toRaw(form.value)
    const formData = new FormData()

    formData.append('nome', values.nome)
    formData.append('senha', values.senha)
    formData.append('cpf', values.cpf.replace(/\D/g, ''))
    formData.append('email', values.email)

    await treinadorService.createTreinador(formData)
    toast.success('Treinador cadastrado com sucesso!')
    router.push('/exercicios')
  } catch (error) {
    toast.error(getErrorMessage(error, 'Erro ao cadastrar treinador'))
  } finally {
    loading.value = false
  }
}
</script>
