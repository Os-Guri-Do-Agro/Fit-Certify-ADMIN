<template>
  <v-dialog v-model="dialog" max-width="800" persistent>
    <v-card rounded="xl" elevation="12">
      <v-card-title class="d-flex justify-space-between align-center pa-6">
        <div>
          <h2 class="text-h5 font-weight-bold">Escolha seu Perfil</h2>
          <p class="text-subtitle-2 text-medium-emphasis mb-0">Selecione como deseja acessar a plataforma</p>
        </div>
        <v-btn icon="mdi-close" variant="text" @click="fechar"></v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text v-if="loading" class="px-6 py-6">
        <v-row>
          <v-col v-for="i in 2" :key="i" cols="12" md="6">
            <v-skeleton-loader type="card" class="perfil-skeleton"></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text v-else class="px-6 py-6">
        <v-row>
          <v-col v-for="perfil in perfis" :key="perfil.id" cols="12" md="6">
            <v-card
              class="selection-card"
              :class="{ 'selected-card': perfilSelecionado === perfil.id, 'current-card': perfil.id === perfilAtualId }"
              @click="selecionarPerfil(perfil)"
              elevation="0"
            >
              <v-card-text class="pa-6 text-center">
                <v-chip v-if="perfil.id === perfilAtualId" color="success" size="small" class="mb-2">
                  Perfil Atual
                </v-chip>
                <div class="icon-circle mb-4" :style="`background: ${getPerfilGradient(perfil.nome)};`">
                  <v-icon size="40" color="white">{{ getPerfilIcon(perfil.nome) }}</v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold mb-2">{{ perfil.nome }}</h3>
                <p class="text-body-2 text-medium-emphasis mb-0">
                  Acessar como {{ perfil.nome.toLowerCase() }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="px-6 py-4 d-flex justify-space-between">
        <v-btn variant="text" @click="fechar">Cancelar</v-btn>
        <v-btn
          color="#00c6fe"
          variant="flat"
          @click="confirmarPerfil"
          :disabled="!perfilSelecionado || perfilSelecionado === perfilAtualId"
          :loading="loadingBotao"
          class="text-white"
        >
          <v-icon class="me-2" color="#fff">mdi-login</v-icon>
          Trocar Perfil
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import authService from '@/services/auth/auth-service'
import { getPayload } from '@/utils/auth'
import { toast } from 'vue3-toastify'

interface Perfil {
  id: string | number
  nome: string
}

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const dialog = ref(false)
const perfis = ref<Perfil[]>([])
const loading = ref(false)
const loadingBotao = ref(false)
const perfilSelecionado = ref<string | number | null>(null)
const perfilAtualId = ref<string | number | null | undefined>(null)

watch(() => props.modelValue, (newVal) => {
  dialog.value = newVal
  if (newVal) {
    buscarPerfis()
  }
})

watch(dialog, (newVal) => {
  emit('update:modelValue', newVal)
})

const getPerfilIcon = (nome: string) => {
  const icons: Record<string, string> = {
    'Atleta': 'mdi-run',
    'Médico': 'mdi-stethoscope',
    'Treinador': 'mdi-whistle',
    Fisioterapeuta: 'mdi-human-handsup',
  }
  return icons[nome] || 'mdi-account-circle'
}

const getPerfilGradient = (nome: string) => {
  const gradients: Record<string, string> = {
    'Médico': 'linear-gradient(135deg, #88CE0D 0%, #6ba80a 100%)',
    'Atleta': 'linear-gradient(135deg, #00c6fe 0%, #0099cc 100%)',
    'Treinador': 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
    'Fisioterapeuta': 'linear-gradient(135deg, #AA3BFF 0%, #8D20E0 100%)',
  }
  return gradients[nome] || 'linear-gradient(135deg, #00c6fe 0%, #0099cc 100%)'
}

const selecionarPerfil = (perfil: Perfil) => {
  if (perfil.id === perfilAtualId.value) {
    toast.warning('Você já está neste perfil')
    return
  }
  perfilSelecionado.value = perfil.id
}

const confirmarPerfil = async () => {
  if (perfilSelecionado.value === perfilAtualId.value) {
    toast.warning('Você já está neste perfil')
    return
  }

  loadingBotao.value = true
  try {
    const data = {
      perfilId: perfilSelecionado.value,
      isMobile: true
    }
    const response = await authService.trocarPerfilLogado(data)

    const novoToken = response?.data?.access_token

    if (novoToken) {
      sessionStorage.setItem('token', novoToken)
      toast.success('Perfil trocado com sucesso!', { autoClose: 1500 })
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    }
  } catch (error) {
    toast.error('Erro ao trocar perfil')
    console.error('Erro ao trocar perfil:', error)
    loadingBotao.value = false
  }
}

const buscarPerfis = async () => {
  loading.value = true
  try {
    const response = await authService.buscarPerfisLogado()
    perfis.value = response.data.perfis || []

    const payload = getPayload()
    const roleAtual = payload?.role

    const roleParaPerfil: Record<string, string> = {
      'atleta': 'Atleta',
      'medico': 'Médico',
      'treinador': 'Treinador',
      'fisioterapeuta': 'Fisioterapeuta'
    }

    const nomePerfilAtual = roleParaPerfil[roleAtual]
    const perfilAtual = perfis.value.find(p => p.nome === nomePerfilAtual)
    perfilAtualId.value = perfilAtual?.id ?? null
  } catch (error) {
    console.error('Erro ao buscar perfis:', error)
  } finally {
    loading.value = false
  }
}

const fechar = () => {
  dialog.value = false
  perfilSelecionado.value = null
}
</script>

<style scoped>
.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
}

.selected-card .icon-circle {
  transform: scale(1.08);
}

.selection-card {
  cursor: pointer;
  transition: all 0.2s ease;
  border: 3px solid #f5f5f5;
  background: #fafafa;
  height: 100%;
}

.selection-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: #e0e0e0;
}

.selected-card {
  border: 3px solid #00c6fe !important;
  background: linear-gradient(135deg, rgba(0, 198, 254, 0.08) 0%, rgba(0, 153, 204, 0.08) 100%) !important;
  box-shadow: 0 8px 32px rgba(0, 198, 254, 0.3) !important;
  transform: translateY(-2px) scale(1.02);
}

.current-card {
  opacity: 0.7;
}

.perfil-skeleton {
  height: 200px;
  border-radius: 12px;
}
</style>
