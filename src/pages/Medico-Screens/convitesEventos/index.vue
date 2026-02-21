<template>
  <div class="page-container">
    <v-sheet class="header-section">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <v-icon size="40" color="white">mdi-email-multiple</v-icon>
        </div>
        <h1 class="header-title">{{ t('convitesEventos.pageTitle') }}</h1>
      </div>
    </v-sheet>

    <div class="content-section">
      <v-tabs v-model="tab" color="#42A5F5" class="mb-6">
        <v-tab value="convites">
          <v-icon class="mr-2">mdi-email-receive</v-icon>
          {{ t('convitesEventos.tabConvites') }}
          <v-chip v-if="convitesPendentes.length > 0" size="small" color="error" class="ml-2">
            {{ convitesPendentes.length }}
          </v-chip>
        </v-tab>
        <v-tab value="eventos">
          <v-icon class="mr-2">mdi-calendar-check</v-icon>
          {{ t('convitesEventos.tabEventos') }}
        </v-tab>
        <v-tab value="grupos">
          <v-icon class="mr-2">mdi-account-group</v-icon>
          {{ t('convitesEventos.tabGrupos') }}
        </v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <!-- Aba de Convites -->
        <v-window-item value="convites">
          <v-row v-if="loadingConvites">
            <v-col cols="12" md="6" v-for="n in 4" :key="n">
              <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
          </v-row>

          <div v-else-if="convitesPendentes.length === 0" class="empty-state">
            <div class="empty-icon-wrapper">
              <v-icon size="80" color="#90CAF9">mdi-email-off</v-icon>
            </div>
            <h3 class="empty-title">{{ t('convitesEventos.noConvites') }}</h3>
            <p class="empty-text">{{ t('convitesEventos.noConvitesDesc') }}</p>
          </div>

          <v-row v-else>
            <v-col cols="12" md="5" v-for="convite in convitesPendentes" :key="convite.id">
              <v-card elevation="4" rounded="xl" class="ma-2">
                <v-card-text class="pa-6">
                  <div class="d-flex align-center mb-4">
                    <v-icon size="32" class="mr-3 gradient-icon">mdi-calendar-star</v-icon>
                    <h3 class="text-h6 font-weight-bold gradient-text">{{ (locale === 'en' ? convite.evento.en_titulo : null) || convite.evento.titulo }}</h3>
                  </div>

                  <div class="convite-details">
                    <div class="d-flex align-center mb-2">
                      <v-icon size="20" color="grey-darken-1" class="mr-2">mdi-map-marker</v-icon>
                      <span class="text-body-2">{{ convite.evento.local }}</span>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-icon size="20" color="grey-darken-1" class="mr-2">mdi-calendar</v-icon>
                      <span class="text-body-2">{{ formatDate(convite.evento.data) }}</span>
                    </div>
                  </div>

                  <v-divider class="my-4"></v-divider>

                  <div class="d-flex align-center justify-space-between flex-wrap ga-2">
                    <v-btn
                      @click="abrirModalInfo(convite)"
                      variant="text"
                      color="primary"
                      size="small"
                      rounded="xl"
                      prepend-icon="mdi-information-outline"
                    >
                      {{ t('convitesEventos.details') }}
                    </v-btn>
                    <div class="d-flex ga-2">
                      <v-btn
                        @click="aceitarConvite(convite.id)"
                        variant="outlined"
                        color="green"
                        size="small"
                        rounded="xl"
                        prepend-icon="mdi-check"
                        :loading="loadingAceitarAction === convite.id"
                      >
                        {{ t('convitesEventos.accept') }}
                      </v-btn>
                      <v-btn
                        @click="rejeitarConvite(convite.id)"
                        variant="outlined"
                        color="red"
                        size="small"
                        rounded="xl"
                        prepend-icon="mdi-close"
                        :loading="loadingRejeitarAction === convite.id"
                      >
                        {{ t('convitesEventos.refuse') }}
                      </v-btn>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <!-- Aba de Eventos Inscritos -->
        <v-window-item value="eventos">
          <v-row v-if="loadingEventos">
            <v-col cols="12" md="4" v-for="n in 6" :key="n">
              <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
          </v-row>

          <div v-else-if="eventosInscritos.length === 0" class="empty-state">
            <div class="empty-icon-wrapper">
              <v-icon size="80" color="#90CAF9">mdi-calendar-remove</v-icon>
            </div>
            <h3 class="empty-title">{{ t('convitesEventos.noEventos') }}</h3>
            <p class="empty-text">{{ t('convitesEventos.noEventosDesc') }}</p>
          </div>

          <v-row v-else>
            <v-col cols="12" md="4" v-for="evento in eventosInscritos" :key="evento.id">
              <v-card elevation="4" rounded="xl" class="ma-2">
                <v-card-text class="pa-6">
                  <div class="d-flex align-center mb-4">
                    <v-icon size="32" class="mr-3 gradient-icon">mdi-calendar-check</v-icon>
                    <h3 class="text-h6 font-weight-bold event-title gradient-text">
                      {{ locale === 'en' ? (evento.en_titulo || evento.titulo) : evento.titulo }}
                    </h3>
                  </div>

                  <div class="event-details">
                    <div class="d-flex align-center mb-2">
                      <v-icon size="20" color="grey-darken-1" class="mr-2">mdi-map-marker</v-icon>
                      <span class="text-body-2">{{ evento.local }}</span>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-icon size="20" color="grey-darken-1" class="mr-2">mdi-calendar</v-icon>
                      <span class="text-body-2">{{ formatDate(evento.data) }}</span>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-icon size="20" color="grey-darken-1" class="mr-2">mdi-run</v-icon>
                      <span class="text-body-2">{{ evento.distanciasEvento?.map(d => d.distancia).join(' / ') || 'N/A' }} km</span>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-icon size="20" color="grey-darken-1" class="mr-2">mdi-trophy-outline</v-icon>
                      <span class="text-body-2">{{ (locale === 'en' ? evento.tipoEvento?.en_nome : null) || evento.tipoEvento?.nome || 'N/A' }}</span>
                    </div>
                  </div>

                  <v-chip
                    :color="evento.ativo ? 'success' : 'grey'"
                    size="small"
                    class="mt-3"
                  >
                    {{ evento.ativo ? t('convitesEventos.active') : t('convitesEventos.closed') }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <!-- Aba de Grupos de Acesso -->
        <v-window-item value="grupos">
          <v-row v-if="loadingGrupos">
            <v-col cols="12" md="4" v-for="n in 3" :key="n">
              <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
          </v-row>

          <div v-else-if="gruposAcesso.length === 0" class="empty-state">
            <div class="empty-icon-wrapper">
              <v-icon size="80" color="#90CAF9">mdi-account-group-outline</v-icon>
            </div>
            <h3 class="empty-title">{{ t('convitesEventos.noGrupos') }}</h3>
            <p class="empty-text">{{ t('convitesEventos.noGruposDesc') }}</p>
          </div>

          <v-row v-else>
            <v-col cols="12" md="4" v-for="grupo in gruposAcesso" :key="grupo.id">
              <v-card elevation="4" rounded="xl" class="ma-2">
                <v-card-text class="pa-6">
                  <div class="d-flex align-center mb-4">
                    <v-icon size="32" class="mr-3 gradient-icon">mdi-account-group</v-icon>
                    <h3 class="text-h6 font-weight-bold gradient-text">{{ grupo.nome }}</h3>
                  </div>

                  <div class="event-details">
                    <div class="d-flex align-center mb-2">
                      <v-icon size="20" color="grey-darken-1" class="mr-2">mdi-text</v-icon>
                      <span class="text-body-2">{{ grupo.descricao }}</span>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <v-icon size="20" color="grey-darken-1" class="mr-2">mdi-calendar-plus</v-icon>
                      <span class="text-body-2">{{ formatDate(grupo.createdAt) }}</span>
                    </div>
                  </div>

                  <v-chip
                    :color="grupo.ativo ? 'success' : 'grey'"
                    size="small"
                    class="mt-3"
                  >
                    {{ grupo.ativo ? t('convitesEventos.active') : t('convitesEventos.inactive') }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </div>

    <v-dialog v-model="dialogInfo" max-width="600">
      <v-card rounded="xl">
        <v-card-title class="d-flex align-center pa-6 bg-gradient">
          <v-icon size="28" class="mr-3" color="white">mdi-calendar-star</v-icon>
          <span class="text-h5 text-white">{{ t('convitesEventos.dialogTitle') }}</span>
        </v-card-title>
        <v-card-text class="pa-6" v-if="conviteSelecionado">
          <div class="mb-4">
            <h3 class="text-h6 mb-2 gradient-text">{{ (locale === 'en' ? conviteSelecionado.evento.en_titulo : null) || conviteSelecionado.evento.titulo }}</h3>
            <p class="text-body-2 text-grey-darken-1">{{ (locale === 'en' ? conviteSelecionado.evento.en_descricao : null) || conviteSelecionado.evento.descricao }}</p>
          </div>
          <v-divider class="my-4"></v-divider>
          <div class="info-grid">
            <div class="info-item">
              <v-icon size="20" color="primary" class="mr-2">mdi-map-marker</v-icon>
              <div>
                <span class="text-caption text-grey">{{ t('convitesEventos.location') }}</span>
                <p class="text-body-2 mb-0">{{ conviteSelecionado.evento.local }}</p>
              </div>
            </div>
            <div class="info-item">
              <v-icon size="20" color="primary" class="mr-2">mdi-calendar</v-icon>
              <div>
                <span class="text-caption text-grey">{{ t('convitesEventos.date') }}</span>
                <p class="text-body-2 mb-0">{{ formatDate(conviteSelecionado.evento.data) }}</p>
              </div>
            </div>
            <div class="info-item" v-if="conviteSelecionado.evento.linkSiteProva">
              <v-icon size="20" color="primary" class="mr-2">mdi-web</v-icon>
              <div>
                <span class="text-caption text-grey">{{ t('convitesEventos.site') }}</span>
                <p class="text-body-2 mb-0">{{ conviteSelecionado.evento.linkSiteProva }}</p>
              </div>
            </div>
            <div class="info-item">
              <v-icon size="20" color="primary" class="mr-2">mdi-clock-outline</v-icon>
              <div>
                <span class="text-caption text-grey">{{ t('convitesEventos.status') }}</span>
                <p class="text-body-2 mb-0">{{ conviteSelecionado.status }}</p>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn @click="dialogInfo = false" variant="flat" color="primary" rounded="lg">
            {{ t('convitesEventos.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import conviteEventoService from '@/services/conviteEvento/conviteEvento-service'
import eventosSerice from '@/services/eventos/eventos-service'
import medicoService from '@/services/medico/medico-service'

const { t, locale } = useI18n()

const tab = ref('convites')
const loadingConvites = ref(false)
const loadingEventos = ref(false)
const loadingGrupos = ref(false)
const loadingAction = ref(null)
const dialogInfo = ref(false)
const conviteSelecionado = ref(null)
const loadingAceitarAction = ref(null)
const loadingRejeitarAction = ref(null)

const convitesPendentes = ref([])
const eventosInscritos = ref([])
const gruposAcesso = ref([])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString(locale.value === 'en' ? 'en-US' : 'pt-BR')
}

const getStatusColor = (status) => {
  const colors = {
    'Confirmado': 'success',
    'Pendente': 'warning',
    'Finalizado': 'grey'
  }
  return colors[status] || 'primary'
}

const carregarConvites = async () => {
  loadingConvites.value = true
  try {
    const response = await conviteEventoService.getConvitesMedico()
    convitesPendentes.value = response.data.filter(c => c.status === "Pendente")
  } catch (error) {
    toast.error(t('convitesEventos.toasts.errorLoadConvites'))
  } finally {
    loadingConvites.value = false
  }
}

const carregarGrupos = async () => {
  loadingGrupos.value = true
  try {
    const response = await medicoService.getMeusGrupos()
    gruposAcesso.value = response.data
  } catch (error) {
    toast.error(t('convitesEventos.toasts.errorLoadGrupos'))
  } finally {
    loadingGrupos.value = false
  }
}

const carregarEventos = async () => {
  loadingEventos.value = true
  try {
    const response = await eventosSerice.getEventosByMedico()
    eventosInscritos.value = response.data
  } catch (error) {
    toast.error(t('convitesEventos.toasts.errorLoadEventos'))
  } finally {
    loadingEventos.value = false
  }
}

const abrirModalInfo = (convite) => {
  conviteSelecionado.value = convite
  dialogInfo.value = true
}

const aceitarConvite = async (conviteId) => {
  loadingAceitarAction.value = conviteId
  try {
    const data = {
      conviteId: conviteId
    }
    await conviteEventoService.putAceitarConvite(data)
    convitesPendentes.value = convitesPendentes.value.filter(c => c.id !== conviteId)
    toast.success(t('convitesEventos.toasts.acceptSuccess'))
    carregarConvites()
    carregarEventos()
  } catch (error) {
    toast.error(t('convitesEventos.toasts.acceptError'))
  } finally {
    loadingAceitarAction.value = null
  }
}

const rejeitarConvite = async (conviteId) => {
  loadingRejeitarAction.value = conviteId
  try {
    const data = {
      conviteId: conviteId
    }
    await conviteEventoService.putRejeitarConvite(data)
    convitesPendentes.value = convitesPendentes.value.filter(c => c.id !== conviteId)
    toast.success(t('convitesEventos.toasts.refuseSuccess'))
    carregarConvites()
  } catch (error) {
    toast.error(t('convitesEventos.toasts.refuseError'))
  } finally {
    loadingRejeitarAction.value = null
  }
}

onMounted(() => {
  carregarConvites()
  carregarEventos()
  carregarGrupos()
})
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.header-section {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  padding: 48px 24px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.header-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.header-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.content-section {
  padding: 0 16px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
}

.empty-icon-wrapper {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
  border-radius: 50%;
  margin-bottom: 24px;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #546E7A;
  margin-bottom: 8px;
}

.empty-text {
  font-size: 1rem;
  color: #90A4AE;
}

.convite-card, .event-card {
  transition: transform 0.3s ease;
}

.convite-card:hover, .event-card:hover {
  transform: translateY(-4px);
}

.convite-details, .event-details {
  border-left: 3px solid;
  border-image: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) 1;
  padding-left: 16px;
  margin-left: 8px;
}

.gradient-icon {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.event-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.bg-gradient {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
}

.info-grid {
  display: grid;
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
</style>
