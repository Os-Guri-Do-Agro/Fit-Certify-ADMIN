<template>
  <div class="pa-0" fluid>
    <div v-if="loading">
      <div class="hero-section">
        <div class="hero-overlay"></div>
        <div class="position-relative">
          <div class="rating-chips">
            <div class="skeleton-rating-chip"></div>
            <div class="skeleton-rating-chip skeleton-rating-chip-wide"></div>
          </div>

          <v-row align="center" justify="center" class="min-height-400">
            <v-col cols="12" class="text-center">
              <div class="doctor-avatar-container">
                <div class="skeleton-avatar mx-auto mb-4"></div>
              </div>
              <div class="skeleton-name mx-auto mb-2"></div>
              <div class="skeleton-specialty mx-auto mb-4"></div>
              
              <div class="d-flex justify-center ga-3 flex-wrap">
                <div class="skeleton-chip"></div>
                <div class="skeleton-chip"></div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>

      <div class="content-section">
        <v-row justify="center">
          <v-col cols="12">
            <v-row class="mb-8 mt-5">
              <v-col cols="12">
                <v-skeleton-loader type="card" height="150" class="info-card"></v-skeleton-loader>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-else-if="treinador">
      <div class="hero-section">
        <div class="hero-overlay"></div>
        <div class="position-relative ma-5">
          <div class="rating-chips">
            <v-chip class="rating-chip" prepend-icon="mdi-star">0</v-chip>
            <v-chip class="rating-chip" prepend-icon="mdi-comment">0 {{ $t('treinadorDetalhes.reviews') }}</v-chip>
          </div>

          <v-row align="center" justify="center" class="min-height-400">
            <v-col cols="12" class="text-center">
              <div class="doctor-avatar-container">
                <v-avatar size="160" class="doctor-avatar">
                  <v-img
                    v-if="treinador.usuario?.avatarUrl"
                    :src="treinador.usuario.avatarUrl"
                    alt="Foto do treinador"
                    cover
                  />
                  <v-icon v-else size="80" color="white">mdi-account</v-icon>
                </v-avatar>
              </div>
              <h1 class="doctor-name">{{ treinador.usuario?.nome }}</h1>
              <p class="doctor-specialty">{{ $t('treinadorDetalhes.coach') }}</p>
              
              <div class="info-chips d-flex justify-center ga-3 flex-wrap mt-4">
                <v-chip v-if="idade" class="info-chip" prepend-icon="mdi-calendar">
                  {{ idade }} {{ $t('treinadorDetalhes.years') }}
                </v-chip>
                <v-chip v-if="treinador.codigoConvite" class="info-chip" prepend-icon="mdi-ticket-confirmation">
                  {{ $t('treinadorDetalhes.code') }}: {{ treinador.codigoConvite }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>

      <div class="content-section">
        <v-row justify="center">
          <v-col cols="12">
            <v-row class="mb-8 mt-md-5">
              <v-col cols="12">
                <v-card class="info-card h-100 rounded-xl" elevation="2">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-icon color="#00c6fe" size="32" class="mr-3">mdi-card-account-details</v-icon>
                      <h4 class="text-h5 font-weight-bold">{{ $t('treinadorDetalhes.contacts') }}</h4>
                    </div>
                    <div v-if="treinador.telefone" class="d-flex align-center mb-4">
                      <v-icon color="#666" size="28" class="mr-4">mdi-phone</v-icon>
                      <span class="text-h6">{{ formatarTelefone(treinador.telefone) }}</span>
                    </div>
                    <div v-if="treinador.usuario?.email" class="d-flex align-center">
                      <v-icon color="#666" size="28" class="mr-4">mdi-email</v-icon>
                      <span class="text-h6">{{ treinador.usuario.email }}</span>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Erro -->
    <v-container v-else>
      <v-card class="text-center py-16 mt-8" elevation="4" rounded="xl">
        <v-icon size="80" color="#ff5252" class="mb-4">mdi-alert-circle</v-icon>
        <h3 class="text-h4 font-weight-bold mb-3" style="color: #2c3e50;">{{ $t('treinadorDetalhes.notFound') }}</h3>
        <p class="text-h6 text-grey-darken-1 mb-8">{{ $t('treinadorDetalhes.notFoundDescription') }}</p>
        <v-btn
          color="#00c6fe"
          rounded="xl"
          elevation="4"
          size="x-large"
          @click="voltarParaLista"
          class="text-white px-8"
        >
          <v-icon class="mr-2">mdi-arrow-left</v-icon>
          {{ $t('treinadorDetalhes.back') }}
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
.hero-section {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  position: relative;
  overflow: hidden;
  border-radius: 20px;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}

.min-height-400 {
  min-height: 400px;
}

.rating-chips {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 2;
}

.rating-chip {
  background: #fff !important;
  color: #00c6fe !important;
  margin-left: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid;
}

.doctor-avatar {
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.doctor-name {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.doctor-specialty {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
}

.info-chip {
  background: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-section {
  background: #f8f9fa;
}

.info-card {
  transition: all 0.3s ease;
  border-left: 3px solid #2196F3;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 198, 254, 0.15) !important;
}

.skeleton-avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
}

.skeleton-name {
  width: 200px;
  height: 32px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.25);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
}

.skeleton-specialty {
  width: 150px;
  height: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
}

.skeleton-chip {
  width: 150px;
  height: 36px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
}

.skeleton-chip:nth-child(2) {
  width: 180px;
  animation-delay: 0.2s;
}

.skeleton-rating-chip {
  width: 60px;
  height: 32px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  margin-left: 8px;
  backdrop-filter: blur(10px);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
  display: inline-block;
}

.skeleton-rating-chip-wide {
  width: 120px;
  animation-delay: 0.2s;
}

@keyframes skeleton-pulse {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 960px) {
  .doctor-info {
    padding-left: 0;
    margin-top: 32px;
    text-align: center;
  }

  .rating-chips {
    position: static;
    text-align: center;
    margin-bottom: 24px;
  }

  .info-chips {
    text-align: center;
  }

  .info-chip {
    display: block;
    margin: 8px auto;
    width: fit-content;
  }

  .skeleton-rating-chip {
    margin: 4px;
  }
}
</style>
