<template>
  <div class="pa-0" fluid>
    <!-- Loading -->
    <div v-if="loading" class="d-flex justify-center align-center" style="min-height: 100vh;">
      <v-progress-circular color="#00c6fe" indeterminate size="64"></v-progress-circular>
    </div>

    <!-- Conteúdo -->
    <div v-else-if="treinador">
      <!-- Header -->
      <div class="header-section">
        <v-container>
          <v-btn
            icon
            variant="text"
            color="white"
            size="large"
            @click="voltarParaLista"
            class="mb-4"
          >
            <v-icon size="28">mdi-arrow-left</v-icon>
          </v-btn>
        </v-container>
      </div>

      <!-- Perfil -->
      <div class="profile-section">
        <v-container>
          <div class="text-center">
            <v-avatar size="105" class="profile-avatar mb-4">
              <v-img
                v-if="treinador.usuario?.avatarUrl"
                :src="treinador.usuario.avatarUrl"
                alt="Avatar"
              />
              <span v-else class="text-h3 font-weight-bold text-white">
                {{ treinador.usuario?.nome?.charAt(0).toUpperCase() }}
              </span>
            </v-avatar>

            <h1 class="text-h4 font-weight-bold text-white mb-3">
              {{ treinador.usuario?.nome }}
            </h1>

            <v-chip
              v-if="idade"
              color="white"
              class="age-chip"
              prepend-icon="mdi-calendar"
            >
              {{ idade }} anos
            </v-chip>
          </div>
        </v-container>
      </div>

      <!-- Cards de Informações -->
      <v-container class="mt-n8">
        <!-- Código de Convite -->
        <v-card
          v-if="treinador.codigoConvite"
          elevation="4"
          rounded="xl"
          class="info-card mb-4"
        >
          <v-card-text class="pa-6">
            <div class="d-flex align-center mb-3">
              <v-icon size="28" color="#00c6fe" class="mr-3">mdi-ticket-confirmation</v-icon>
              <h3 class="text-h6 font-weight-bold" style="color: #333;">Código de Convite</h3>
            </div>
            <v-divider class="mb-4" />
            <p class="text-h5 font-weight-bold text-center" style="color: #00c6fe; letter-spacing: 2px;">
              {{ treinador.codigoConvite }}
            </p>
          </v-card-text>
        </v-card>

        <!-- Contatos -->
        <v-card elevation="4" rounded="xl" class="info-card">
          <v-card-text class="pa-6">
            <div class="d-flex align-center mb-3">
              <v-icon size="28" color="#00c6fe" class="mr-3">mdi-card-account-details</v-icon>
              <h3 class="text-h6 font-weight-bold" style="color: #333;">Contatos</h3>
            </div>
            <v-divider class="mb-4" />

            <div v-if="treinador.telefone" class="d-flex align-center mb-3">
              <v-icon color="#666" class="mr-3">mdi-phone</v-icon>
              <span class="text-body-1" style="color: #666;">{{ formatarTelefone(treinador.telefone) }}</span>
            </div>

            <div v-if="treinador.usuario?.email" class="d-flex align-center">
              <v-icon color="#666" class="mr-3">mdi-email</v-icon>
              <span class="text-body-1" style="color: #666;">{{ treinador.usuario.email }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </div>

    <!-- Erro -->
    <v-container v-else>
      <v-card class="text-center py-16 mt-8" elevation="4" rounded="xl">
        <v-icon size="80" color="#ff5252" class="mb-4">mdi-alert-circle</v-icon>
        <h3 class="text-h4 font-weight-bold mb-3" style="color: #2c3e50;">Treinador não encontrado</h3>
        <p class="text-h6 text-grey-darken-1 mb-8">O treinador solicitado não existe ou foi removido</p>
        <v-btn
          color="#00c6fe"
          rounded="xl"
          elevation="4"
          size="x-large"
          @click="voltarParaLista"
          class="text-white px-8"
        >
          <v-icon class="mr-2">mdi-arrow-left</v-icon>
          Voltar
        </v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import treinadorService from '@/services/treinador/treinador-service'

const router = useRouter()
const route = useRoute()

const treinador = ref<any>(null)
const loading = ref(true)

const idade = computed(() => {
  if (!treinador.value?.dataNascimento) return null
  return calcularIdade(treinador.value.dataNascimento)
})

const calcularIdade = (dataNascimento: string): number => {
  console.log('Data de nascimento:', dataNascimento)
  const hoje = new Date()
  const nascimento = new Date(dataNascimento)
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const mes = hoje.getMonth() - nascimento.getMonth()
  
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--
  }
  
  return idade
}

const formatarTelefone = (telefone: string): string => {
  if (!telefone) return ''
  const numeros = telefone.replace(/\D/g, '')
  
  if (numeros.length === 11) {
    return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 7)}-${numeros.substring(7)}`
  }
  
  return telefone
}

const carregarTreinador = async () => {
  try {
    loading.value = true
    const treinadorId = route.query?.id as string
    
    if (!treinadorId) {
      throw new Error('ID do treinador não encontrado')
    }

    const response = await treinadorService.getTreinadorById(treinadorId)
    treinador.value = response.data || response
  } catch (error) {
    console.error('Erro ao carregar treinador:', error)
    treinador.value = null
  } finally {
    loading.value = false
  }
}

const voltarParaLista = () => {
  router.back()
}

onMounted(() => {
  carregarTreinador()
})
</script>

<style scoped>
.header-section {
  background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%);
  padding: 24px 0 0 0;
}

.profile-section {
  background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%);
  padding: 0 0 80px 0;
}

.profile-avatar {
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%);
}

.age-chip {
  font-weight: 600;
  font-size: 0.95rem;
  padding: 8px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.info-card {
  transition: all 0.3s ease;
  border: 2px solid #E7F8F6;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 198, 254, 0.3) !important;
}

.v-btn {
  transition: all 0.3s ease;
}

.v-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}
</style>
