<template>
  <div style="background: #f8f9fa; min-height: 100vh;">
    <!-- Banner com Overlay -->
    <div class="banner-container" :style="{ backgroundImage: evento?.imagemUrl ? `url(${evento.imagemUrl})` : 'linear-gradient(135deg, #00c6fe 0%, #0099cc 100%)' }">
      <div class="banner-overlay">
        <v-container>
          <v-btn
            icon
            variant="text"
            color="white"
            @click="voltarParaLista"
            class="mb-4"
            size="large"
          >
            <v-icon size="32">mdi-arrow-left</v-icon>
          </v-btn>
        </v-container>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-16">
      <v-progress-circular indeterminate color="#00c6fe" size="64" width="6" />
      <p class="text-h6 mt-6 font-weight-medium" style="color: #2c3e50;">Carregando evento...</p>
    </div>

    <!-- Conteúdo -->
    <v-container v-else-if="evento" class="mt-n16">
      <!-- Card Principal -->
      <v-card elevation="8" rounded="xl" class="mb-6">
        <v-card-text class="pa-8">
          <v-row>
            <v-col cols="12" md="8">
              <div class="d-flex align-center mb-4">
                <v-icon size="40" color="#00c6fe" class="mr-3">mdi-calendar-star</v-icon>
                <h1 class="text-h3 font-weight-bold" style="color: #2c3e50;">
                  {{ evento.titulo }}
                </h1>
              </div>

              <div class="d-flex flex-wrap ga-3 mb-6">
                <v-chip
                  v-if="evento.linkEnviarCertificado"
                  :href="`mailto:${evento.linkEnviarCertificado}`"
                  color="#88ce0d"
                  variant="flat"
                  size="large"
                  prepend-icon="mdi-email"
                  class="text-white"
                  style="cursor: pointer;"
                >
                  Enviar Certificado
                </v-chip>

                <v-chip
                  v-if="evento.linkSiteProva"
                  :href="evento.linkSiteProva"
                  target="_blank"
                  color="#00c6fe"
                  variant="flat"
                  size="large"
                  prepend-icon="mdi-web"
                  class="text-white"
                  style="cursor: pointer;"
                >
                  Site da Prova
                </v-chip>
              </div>
            </v-col>

            <v-col cols="12" md="4" class="d-flex justify-center align-center">
              <v-avatar size="200" rounded="lg" class="logo-avatar">
                <v-img
                  v-if="evento.logoUrl"
                  :src="evento.logoUrl"
                  cover
                />
                <v-icon v-else size="80" color="#00c6fe">mdi-image</v-icon>
              </v-avatar>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Grid de Informações -->
      <v-row class="mb-6">
        <v-col cols="12" md="6">
          <v-card elevation="4" rounded="xl" class="info-card h-100">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <div class="icon-badge">
                  <v-icon color="white" size="28">mdi-calendar-clock</v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold ml-3" style="color: #2c3e50;">Data do Evento</h3>
              </div>
              <p class="text-h5 font-weight-bold" style="color: #00c6fe;">
                {{ formatarData(evento.data) }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card elevation="4" rounded="xl" class="info-card h-100">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <div class="icon-badge">
                  <v-icon color="white" size="28">mdi-map-marker</v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold ml-3" style="color: #2c3e50;">Local</h3>
              </div>
              <p class="text-h5 font-weight-bold" style="color: #00c6fe;">
                {{ evento.local || 'Não informado' }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card elevation="4" rounded="xl" class="info-card h-100">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <div class="icon-badge">
                  <v-icon color="white" size="28">mdi-run</v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold ml-3" style="color: #2c3e50;">Modalidade</h3>
              </div>
              <p class="text-h5 font-weight-bold" style="color: #00c6fe;">
                {{ tipoEvento?.nome || 'Não informado' }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card elevation="4" rounded="xl" class="info-card h-100">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <div class="icon-badge">
                  <v-icon color="white" size="28">mdi-map-marker-distance</v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold ml-3" style="color: #2c3e50;">Distâncias</h3>
              </div>
              <p class="text-h5 font-weight-bold" style="color: #00c6fe;">
                {{ formatDistancias(evento.distanciasEvento) }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Descrição -->
      <v-card elevation="4" rounded="xl" class="mb-6">
        <v-card-text class="pa-8">
          <div class="d-flex align-center mb-4">
            <v-icon size="32" color="#00c6fe" class="mr-3">mdi-text-box</v-icon>
            <h2 class="text-h5 font-weight-bold" style="color: #2c3e50;">Sobre o Evento</h2>
          </div>
          <v-divider class="mb-6" style="border-width: 2px; border-color: #E7F8F6;" />
          <p class="text-body-1" style="line-height: 1.8; color: #555; font-size: 1.1rem;">
            {{ evento.descricao || 'Descrição não disponível para este evento.' }}
          </p>
        </v-card-text>
      </v-card>

      <!-- Organização -->
      <v-card v-if="evento.organizacaoEvento && evento.organizacaoEvento.length > 0" elevation="4" rounded="xl">
        <v-card-text class="pa-8">
          <div class="d-flex align-center mb-4">
            <v-icon size="32" color="#00c6fe" class="mr-3">mdi-office-building</v-icon>
            <h2 class="text-h5 font-weight-bold" style="color: #2c3e50;">Organização</h2>
          </div>
          <v-divider class="mb-6" style="border-width: 2px; border-color: #E7F8F6;" />
          <div class="d-flex flex-wrap ga-6">
            <v-card
              v-for="(orgEvento, index) in evento.organizacaoEvento"
              :key="index"
              elevation="2"
              rounded="lg"
              class="org-card"
            >
              <v-img
                v-if="orgEvento.organizacao?.logoUrl"
                :src="orgEvento.organizacao.logoUrl"
                width="150"
                height="80"
                cover
              />
              <div v-else class="d-flex align-center justify-center" style="width: 150px; height: 80px; background: #f0f0f0;">
                <v-icon size="40" color="#00c6fe">mdi-office-building</v-icon>
              </div>
            </v-card>
          </div>
        </v-card-text>
      </v-card>
    </v-container>

    <!-- Erro -->
    <v-container v-else>
      <v-card
        class="text-center py-16 mt-8"
        elevation="4"
        rounded="xl"
      >
        <div class="empty-icon-container mx-auto mb-6">
          <v-icon size="80" color="#ff5252">mdi-alert-circle</v-icon>
        </div>
        <h3 class="text-h4 font-weight-bold mb-3" style="color: #2c3e50;">Evento não encontrado</h3>
        <p class="text-h6 text-grey-darken-1 mb-8">O evento solicitado não existe ou foi removido</p>
        <v-btn
          color="#00c6fe"
          rounded="xl"
          elevation="4"
          size="x-large"
          @click="voltarParaLista"
          class="text-white px-8"
          style="font-weight: 600; text-transform: none;"
        >
          <v-icon class="mr-2">mdi-arrow-left</v-icon>
          Voltar para Lista
        </v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import eventoService from '@/services/eventos/eventos-service'
import { toast } from 'vue3-toastify'

const router = useRouter()
const route = useRoute()

const evento = ref<any>(null)
const loading = ref(false)

const tipoEvento = ref<any>(null)

const formatarData = (data: string) => {
  if (!data) return 'Não informado'
  const date = new Date(data)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatDistancias = (distanciasEvento: any[]) => {
  if (!distanciasEvento || distanciasEvento.length === 0) {
    return 'Não informado'
  }
  return distanciasEvento.map((d) => `${d.distancia}K`).join(' / ')
}

const carregarEvento = async () => {
  try {
    loading.value = true
    const params = route.params as { id?: string }
    const eventoId = params.id || ''
    if (!eventoId) {
      throw new Error('ID do evento não encontrado')
    }

    const eventoResponse = await eventoService.getByEventoId(eventoId)
    evento.value = eventoResponse.data || eventoResponse

    try {

      const id = evento?.value?.tipoEventoId
      const tiposResponse = await eventoService.getTipoEventoById(id)
      tipoEvento.value = tiposResponse.data || tiposResponse
    } catch (tipoError) {
      console.error('Não foi possível carregar tipos de eventos:', tipoError)
    }
  } catch (error) {
    console.error('Erro ao carregar evento:', error)
    toast.error('Erro ao carregar detalhes do evento')
    evento.value = null
  } finally {
    loading.value = false
  }
}

const voltarParaLista = () => {
  router.push('/Atleta-Screens/eventos')
}

onMounted(() => {
  carregarEvento()
})
</script>

<style scoped>
.banner-container {
  height: 500px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 100%);
  display: flex;
  align-items: flex-start;
  padding-top: 24px;
}

.icon-badge {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);
}

.info-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.info-card:hover {
  transform: translateY(-4px);
  border-color: #00c6fe;
  box-shadow: 0 8px 24px rgba(0, 198, 254, 0.3) !important;
}

.org-card {
  transition: all 0.3s ease;
  border: 2px solid #E7F8F6;
  overflow: hidden;
}

.org-card:hover {
  transform: translateY(-4px);
  border-color: #00c6fe;
}

.empty-icon-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 82, 82, 0.1) 0%, rgba(255, 82, 82, 0.05) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-btn {
  transition: all 0.3s ease;
}

.v-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.v-chip {
  transition: all 0.3s ease;
}

.v-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
