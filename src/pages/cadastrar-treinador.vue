<template>
  <v-container fluid class="pa-6">
    <v-card rounded="xl" elevation="4">
      <v-card-title class="pa-6 d-flex align-center" style="background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); color: white;">
        <v-icon class="mr-3" color="white" size="32">mdi-whistle</v-icon>
        <span class="text-h5 font-weight-bold">Cadastrar Treinador</span>
      </v-card-title>

      <v-card-text class="pa-6">
        <v-form>
          <VRow>
            <VCol cols="12">
              <VTextField v-model="form.telefone" label="Telefone*" placeholder="(00) 00000-0000" variant="outlined" rounded="lg" bg-color="white" class="custom-field" @input="formatPhone" />
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import treinadorService from '@/services/treinador/treinador-service'
import { getErrorMessage } from '@/common/error.utils'

const router = useRouter()
const loading = ref(false)

const form = ref({
  telefone: ''
})

const formatPhone = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length > 11) value = value.slice(0, 11)
  if (value.length > 10) {
    form.value.telefone = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (value.length > 6) {
    form.value.telefone = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  } else if (value.length > 2) {
    form.value.telefone = value.replace(/(\d{2})(\d{0,5})/, '($1) $2')
  } else {
    form.value.telefone = value.replace(/(\d*)/, '$1')
  }
}

const submitTreinador = async () => {
  const phoneDigits = form.value.telefone.replace(/\D/g, '')
  if (!phoneDigits) {
    toast.error('Telefone é obrigatório')
    return
  }
  if (phoneDigits.length < 11) {
    toast.error('Telefone inválido')
    return
  }
  try {
    loading.value = true
    const formData = new FormData()
    formData.append('telefone', form.value.telefone)

    await treinadorService.createTreinadorLogado(formData)
    toast.success('Treinador cadastrado com sucesso!')
    router.push('/resumo')
  } catch (error) {
    toast.error(getErrorMessage(error, 'Erro ao cadastrar treinador'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.custom-field .v-field {
  border: 1px solid #e0e7ff;
  transition: all 0.3s ease;
}

.custom-field .v-field:hover {
  border-color: #ff9800;
}

.custom-field .v-field--focused {
  border-color: #ff9800 !important;
  box-shadow: 0 0 0 2px rgba(255, 152, 0, 0.2) !important;
}

.custom-field .v-label {
  color: #64748b;
  font-weight: 500;
}

.custom-field .v-field--focused .v-label {
  color: #ff9800 !important;
}
</style>