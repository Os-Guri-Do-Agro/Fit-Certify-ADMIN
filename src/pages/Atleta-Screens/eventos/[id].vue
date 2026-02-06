<template>
  <div style="background: #f8f9fa; min-height: 100vh;">
    <!-- Banner com Overlay -->
    <div class="banner-container"
      :style="{ backgroundImage: evento?.imagemUrl ? `url(${evento.imagemUrl})` : 'linear-gradient(135deg, #42A5F5 0%, #0099cc 100%)' }">
      <div class="banner-overlay">
        <v-container>
          <v-btn icon variant="text" color="white" @click="voltarParaLista" class="mb-4" size="large">
            <v-icon size="32">mdi-arrow-left</v-icon>
          </v-btn>
        </v-container>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-16">
      <v-progress-circular indeterminate color="#42A5F5" size="64" width="6" />
      <p class="text-h6 mt-6 font-weight-medium" style="color: #2c3e50;">{{ t('eventos.details.loading') }}</p>
    </div>

    <!-- Conteúdo -->
    <v-container v-else-if="evento" class="mt-n16">
      <!-- Card Principal -->
      <v-card elevation="8" rounded="xl" class="mb-6">
        <v-card-text class="pa-8">
          <v-row>
            <v-col cols="12" md="8">
              <div class="d-flex align-center mb-4">
                <v-icon size="40" color="#42A5F5" class="mr-3">mdi-calendar-star</v-icon>
                <h1 class="text-h3 font-weight-bold" style="color: #2c3e50;">
                  {{ locale === 'en' && evento.en_titulo ? evento.en_titulo : evento.titulo }}
                </h1>
              </div>

              <div class="d-flex flex-wrap ga-3 mb-6">
                <v-btn v-if="evento.linkEnviarCertificado && isUserAtleta" @click="abrirDialogTermos" :disabled="evento.aceitouTermo || evento.possuiCertificadoExclusivo && !evento.temCertificado"  color="#88ce0d"
                  variant="flat" size="large" prepend-icon="mdi-email" rounded="lg" elevation="3"
                  class="text-white px-6" style="font-weight: 600; text-transform: none;">
                  <span v-if="!evento.aceitouTermo">
                    {{ t('eventos.details.sendCertificate') }}
                  </span>

                  <span v-else>
                    {{ t('eventos.details.registered') }}
                  </span>

                </v-btn>

                <v-btn v-if="evento.linkSiteProva" :href="evento.linkSiteProva" target="_blank" color="#42A5F5"
                  variant="flat" size="large" prepend-icon="mdi-web" rounded="lg" elevation="3" class="text-white px-6"
                  style="font-weight: 600; text-transform: none;">
                  {{ t('eventos.details.eventWebsite') }}
                </v-btn>
              </div>
              <div class="">
                <v-btn v-if="isUserAtleta && !evento.formularioMedicoRespondido && evento.aceitouTermo && evento.formularioMedicoDisponivel" @click="responderFormulario" color="#FF6B35"
                  variant="flat" size="large" prepend-icon="mdi-clipboard-text" rounded="lg" elevation="3"
                  class="text-white px-6" style="font-weight: 600; text-transform: none;">
                  {{ t('eventos.answerForm') }}
                </v-btn>
              </div>
              <div class="mt-5" v-if="evento.possuiCertificadoExclusivo">
                <v-chip color="info">
                  <span>
                    {{ t('eventos.details.exclusivo') }}
                  </span>
                </v-chip>
              </div>
            </v-col>

            <v-col cols="12" md="4" class="d-flex justify-center align-center">
              <v-avatar size="200" rounded="lg" class="logo-avatar">
                <v-img v-if="evento.logoUrl" :src="evento.logoUrl" cover />
                <v-icon v-else size="80" color="#42A5F5">mdi-image</v-icon>
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
                <h3 class="text-h6 font-weight-bold ml-3" style="color: #2c3e50;">{{ t('eventos.details.eventDate') }}</h3>
              </div>
              <p class="text-h5 font-weight-bold" style="color: #42A5F5;">
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
                <h3 class="text-h6 font-weight-bold ml-3" style="color: #2c3e50;">{{ t('eventos.details.location') }}</h3>
              </div>
              <p class="text-h5 font-weight-bold" style="color: #42A5F5;">
                {{ evento.local || t('eventos.details.notInformed') }}
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
                <h3 class="text-h6 font-weight-bold ml-3" style="color: #2c3e50;">{{ t('eventos.details.modality') }}</h3>
              </div>
              <p class="text-h5 font-weight-bold" style="color: #42A5F5;">
                {{ locale === 'en' && tipoEvento?.en_nome ? tipoEvento.en_nome : tipoEvento?.nome || t('eventos.details.notInformed') }}
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
                <h3 class="text-h6 font-weight-bold ml-3" style="color: #2c3e50;">{{ t('eventos.details.distances') }}</h3>
              </div>
              <p class="text-h5 font-weight-bold" style="color: #42A5F5;">
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
            <v-icon size="32" color="#42A5F5" class="mr-3">mdi-text-box</v-icon>
            <h2 class="text-h5 font-weight-bold" style="color: #2c3e50;">{{ t('eventos.details.aboutEvent') }}</h2>
          </div>
          <v-divider class="mb-6" style="border-width: 2px; border-color: #E7F8F6;" />
          <p class="text-body-1" style="line-height: 1.8; color: #555; font-size: 1.1rem;">
            {{ locale === 'en' && evento.en_descricao ? evento.en_descricao : evento.descricao || t('eventos.details.noDescription') }}
          </p>
        </v-card-text>
      </v-card>

      <!-- Organização -->
      <v-card v-if="evento.organizacaoEvento && evento.organizacaoEvento.length > 0" elevation="4" rounded="xl">
        <v-card-text class="pa-8">
          <div class="d-flex align-center mb-4">
            <v-icon size="32" color="#42A5F5" class="mr-3">mdi-office-building</v-icon>
            <h2 class="text-h5 font-weight-bold" style="color: #2c3e50;">{{ t('eventos.details.organization') }}</h2>
          </div>
          <v-divider class="mb-6" style="border-width: 2px; border-color: #E7F8F6;" />
          <div class="d-flex flex-wrap ga-6">
            <v-card v-for="(orgEvento, index) in evento.organizacaoEvento" :key="index" elevation="2" rounded="lg"
              class="org-card">
              <v-img v-if="orgEvento.organizacao?.logoUrl" :src="orgEvento.organizacao.logoUrl" width="150" height="80"
                cover />
              <div v-else class="d-flex align-center justify-center"
                style="width: 150px; height: 80px; background: #f0f0f0;">
                <v-icon size="40" color="#42A5F5">mdi-office-building</v-icon>
              </div>
            </v-card>
          </div>
        </v-card-text>
      </v-card>
    </v-container>

    <!-- Erro -->
    <v-container v-else>
      <v-card class="text-center py-16 mt-8" elevation="4" rounded="xl">
        <div class="empty-icon-container mx-auto mb-6">
          <v-icon size="80" color="#ff5252">mdi-alert-circle</v-icon>
        </div>
        <h3 class="text-h4 font-weight-bold mb-3" style="color: #2c3e50;">{{ t('eventos.details.notFound') }}</h3>
        <p class="text-h6 text-grey-darken-1 mb-8">{{ t('eventos.details.notFoundDescription') }}</p>
        <v-btn color="#42A5F5" rounded="xl" elevation="4" size="x-large" @click="voltarParaLista"
          class="text-white px-8" style="font-weight: 600; text-transform: none;">
          <v-icon class="mr-2">mdi-arrow-left</v-icon>
          {{ t('eventos.details.backToList') }}
        </v-btn>
      </v-card>
    </v-container>

    <!-- Dialog Termos -->
    <v-dialog v-model="dialogTermos" max-width="800" persistent>
      <v-card rounded="xl">
        <v-card-title v-if="evento.possuiTermo && termos?.termo" class="pa-6 d-flex align-center"
          style="background: #42A5F5; color: white;">
          <v-icon class="mr-3" color="white">mdi-file-document-outline</v-icon>
          <span class="text-h5 font-weight-bold">{{ t('eventos.details.termsTitle') }}</span>
        </v-card-title>

        <v-card-title v-else class="pa-6 d-flex align-center" style="background: #42A5F5; color: white;">
          <v-icon class="mr-3" color="white">mdi-file-document-outline</v-icon>
          <span class="text-h5 font-weight-bold">{{ t('eventos.details.sendTitle') }}</span>
        </v-card-title>

        <v-card-text class="pa-6">
          <div v-if="evento.possuiTermo" @scroll="onScroll"
            style="max-height: 400px; overflow-y: auto; white-space: pre-wrap; line-height: 1.6; color: #333; border: 1px solid #e0e0e0; padding: 16px; border-radius: 8px; background: #fafafa;">
            {{ termos?.termo }}
          </div>
          <div v-else class="text-center py-8">
            <v-icon size="80" color="#42A5F5" class="mb-4">mdi-cloud-upload-outline</v-icon>
            <h3 class="text-h5 font-weight-bold mb-2" style="color: #2c3e50;">{{ t('eventos.details.almostThere') }}</h3>
            <p class="text-body-1 px-6" style="color: #666;">
              {{ t('eventos.details.confirmMessage') }}
            </p>
          </div>
        </v-card-text>

        <v-card-actions class="pa-6">
          <v-btn @click="dialogTermos = false" variant="outlined" color="#666" rounded="lg" size="large" class="px-6">
            {{ t('eventos.details.cancel') }}
          </v-btn>
          <v-spacer />
          <v-btn @click="confirmarEnvio" :disabled="(evento.possuiTermo && !scrolledToBottom) || loadingTermos"
            :loading="loadingTermos" color="#88ce0d" variant="flat" rounded="lg" size="large" class="text-white px-6"
            style="font-weight: 600;">
            {{ t('eventos.details.confirmSend') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import eventoService from '@/services/eventos/eventos-service'
import termosService from '@/services/eventos/termos/termos-service'
import atletaService from '@/services/atleta/atleta-service'
import { toast } from 'vue3-toastify'
import { isAtleta } from '@/utils/auth'
import { useI18n } from 'vue-i18n'
import { getAtletaId } from '@/utils/auth'

const { t, locale } = useI18n()

const router = useRouter()
const route = useRoute()

const evento = ref<any>(null)
const loading = ref(false)
const loadingTermos = ref(false)
const termos = ref<any>(null)
const dialogTermos = ref(false)
const scrolledToBottom = ref(false)

const tipoEvento = ref<any>(null)
const isUserAtleta = computed(() => isAtleta())

const formatarData = (data: string) => {
  if (!data) return t('eventos.details.notInformed')
  const date = new Date(data)
  const localeStr = locale.value === 'en' ? 'en-US' : 'pt-BR'
  return date.toLocaleDateString(localeStr, {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const buscarTermos = async () => {
  try {
    const response = await termosService.getTermosByEventoId(evento.value.id)
    termos.value = response.data || response
  } catch (error) {
    console.error('Não foi possível carregar termos:', error)
  }
}

const aceitarTermos = async () => {
  loadingTermos.value = true
  try {
    const data = {
      eventoId: evento.value.id,
    }
    await termosService.aceitarTermos(data)
    toast.success('Termos e certificado enviados para o e-mail cadastrado.')
    dialogTermos.value = false
    await carregarEvento()
  } catch (error) {
    console.error('Erro ao aceitar termos:', error)
    toast.error('Erro ao aceitar termos')
  } finally {
    loadingTermos.value = false
  }
}


const formatDistancias = (distanciasEvento: any[]) => {
  if (!distanciasEvento || distanciasEvento.length === 0) {
    return t('eventos.details.notInformed')
  }
  return distanciasEvento.map((d) => `${d.distancia}K`).join(' / ')
}

const responderFormulario = () => {
  const params = route.params as { id?: string }
  router.push(`/Atleta-Screens/formulario-medico/${params.id}`)
}

const carregarEvento = async () => {
  try {
    loading.value = true
    const params = route.params as { id?: string }
    const eventoId = params.id
    const atletaId = getAtletaId()
    if (!eventoId) {
      throw new Error('ID do evento não encontrado')
    }

    const eventoResponse = await eventoService.getByEventoAtletaId(eventoId, atletaId)
    evento.value = eventoResponse.data || eventoResponse

  } catch (error) {
    console.error('Erro ao carregar evento:', error)
    toast.error('Erro ao carregar detalhes do evento')
    evento.value = null
  } finally {
    loading.value = false
  }
}

const buscarTipoEvento = async (id: string) => {
  try {
    const response = await eventoService.getTipoEventoById(id)
    tipoEvento.value = response.data || response
  } catch (error) {
    console.error('Erro ao buscar tipo de evento:', error)
    return null
  }
}

const voltarParaLista = () => {
  router.push('/Atleta-Screens/eventos')
}

const abrirDialogTermos = () => {
  scrolledToBottom.value = false
  dialogTermos.value = true
}

const onScroll = (e: Event) => {
  const target = e.target as HTMLElement
  const bottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 10
  if (bottom) scrolledToBottom.value = true
}

const confirmarEnvio = async () => {
  try {
    await aceitarTermos()
    dialogTermos.value = false
  } catch (error) {
    console.error('Erro ao confirmar envio:', error)
  }
}

onMounted(() => {
  const carregarDados = async () => {
    await carregarEvento()
    const id = evento.value?.tipoEventoId

    if (evento.value?.possuiTermo) {
      buscarTermos()
    }
    buscarTipoEvento(id)
  }
  carregarDados()
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
  background: linear-gradient(135deg, #42A5F5 0%, #0099cc 100%);
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
  border-color: #42A5F5;
  box-shadow: 0 8px 24px rgba(0, 198, 254, 0.3) !important;
}

.org-card {
  transition: all 0.3s ease;
  border: 2px solid #E7F8F6;
  overflow: hidden;
}

.org-card:hover {
  transform: translateY(-4px);
  border-color: #42A5F5;
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
