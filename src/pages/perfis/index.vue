<template>
    <v-row justify="center" align="center" class="fill-height ma-0">
      <v-col cols="12" md="8">
        <v-card rounded="xl" elevation="12" class="main-card">
          <div class="text-center pt-8 pb-6">
            <a href="https://fitcert365.com/" target="_blank">
              <v-img
                src="../assets/Camada_1.png"
                max-width="280"
                class="mx-auto"
                alt="FitCert Logo"
              ></v-img>
            </a>
          </div>

          <div class="text-center pb-4 px-6">
            <h1 class="text-h4 font-weight-bold mb-3" style="color: #1a1a1a;">Escolha seu Perfil</h1>
            <p class="text-subtitle-1 text-medium-emphasis mb-0">
              Selecione como deseja acessar a plataforma
            </p>
          </div>

          <v-card-text v-if="loading" class="px-6 py-6">
            <v-row class="ma-0">
              <v-col v-for="i in 2" :key="i" cols="12" md="6" class="pa-2">
                <v-skeleton-loader type="card" class="perfil-skeleton"></v-skeleton-loader>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text v-else class="px-6 py-6">
            <v-row class="ma-0">
              <v-col v-for="perfil in perfis" :key="perfil.id" cols="12" md="6" class="pa-2">
                <v-card
                  class="selection-card"
                  :class="{ 'selected-card': perfilSelecionado === perfil.id }"
                  @click="selecionarPerfil(perfil)"
                  elevation="0"
                >
                  <v-card-text class="pa-6 text-center">
                    <div
                      class="icon-circle mb-4"
                      :style="`background: ${getPerfilGradient(perfil.nome)};`"
                    >
                      <v-icon size="40" color="white">{{ getPerfilIcon(perfil.nome) }}</v-icon>
                    </div>
                    <h3 class="text-h6 font-weight-bold mb-3">{{ perfil.nome }}</h3>
                    <p class="text-body-2 text-medium-emphasis mb-0">
                      Acessar como {{ perfil.nome.toLowerCase() }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions v-if="!loading" class="px-6 pb-6 pt-2">
            <v-btn
              color="#00c6fe"
              variant="flat"
              block
              size="x-large"
              @click="confirmarPerfil"
              :disabled="!perfilSelecionado"
              class="text-white continue-btn"
              rounded="lg"
              :loading="loadingBotao"
            >
              <v-icon class="me-2">mdi-login</v-icon>
              Trocar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import authService from '@/services/auth/auth-service'
import { getPayload } from '@/utils/auth'
import { toast } from 'vue3-toastify'

const perfis = ref([])
const loading = ref(true)
const loadingBotao = ref(false)
const perfilSelecionado = ref(null)
const perfilAtualId = ref(null)

const getPerfilIcon = (nome) => {
  const icons = {
    'Atleta': 'mdi-run',
    'Médico': 'mdi-stethoscope',
    'Treinador': 'mdi-whistle',
  }
  return icons[nome] || 'mdi-account-circle'
}

const getPerfilGradient = (nome) => {
  const gradients = {
    'Médico': 'linear-gradient(135deg, #88CE0D 0%, #6ba80a 100%)',
    'Atleta': 'linear-gradient(135deg, #00c6fe 0%, #0099cc 100%)',
    'Treinador': 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
  }
  return gradients[nome] || 'linear-gradient(135deg, #00c6fe 0%, #0099cc 100%)'
}

const selecionarPerfil = (perfil) => {
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
  try {
    const response = await authService.buscarPerfisLogado()
    perfis.value = response.data.perfis || []

    const payload = getPayload()
    const roleAtual = payload?.role

    const roleParaPerfil = {
      'atleta': 'Atleta',
      'medico': 'Médico',
      'treinador': 'Treinador'
    }

    const nomePerfilAtual = roleParaPerfil[roleAtual]
    const perfilAtual = perfis.value.find(p => p.nome === nomePerfilAtual)
    perfilAtualId.value = perfilAtual?.id

  } catch (error) {
    console.error('Erro ao buscar perfis:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  buscarPerfis()
})
</script>

<style scoped>
.bg-container {
  position: relative;
  background-image: url('../assets/bg-registers-select.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.bg-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  z-index: 0;
}

.bg-container > * {
  position: relative;
  z-index: 1;
}

.main-card {
  background: white;
  overflow: hidden;
}

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

.continue-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: none;
  font-size: 16px;
  height: 56px !important;
  box-shadow: 0 4px 16px rgba(0, 198, 254, 0.3);
  transition: all 0.3s ease;
}

.continue-btn:hover {
  box-shadow: 0 6px 24px rgba(0, 198, 254, 0.4);
  transform: translateY(-2px);
}

.continue-btn:disabled {
  opacity: 0.5;
}

.perfil-skeleton {
  height: 200px;
  border-radius: 12px;
}
</style>
