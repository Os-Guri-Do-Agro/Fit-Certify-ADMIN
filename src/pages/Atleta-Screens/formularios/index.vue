<template>
  <div class="page-container">
    <v-sheet class="header-section">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <v-icon size="40" color="white">mdi-clipboard-text</v-icon>
        </div>
        <h1 class="header-title">{{ $t('formulariosMedicos.title') }}</h1>
      </div>
      <p class="header-subtitle">{{ $t('formulariosMedicos.subtitle') }}</p>
    </v-sheet>

    <div class="content-section">
      <v-row v-if="loading">
        <v-col cols="12" md="4" v-for="n in 3" :key="n">
          <v-skeleton-loader type="card" class="skeleton-card"></v-skeleton-loader>
        </v-col>
      </v-row>

      <div v-else-if="error" class="empty-state">
        <div class="empty-icon-wrapper error">
          <v-icon size="80" color="#EF5350">mdi-alert-circle</v-icon>
        </div>
        <h3 class="empty-title">{{ $t('formulariosMedicos.errorLoading') }}</h3>
      </div>

      <div v-else-if="formularios.length === 0" class="empty-state">
        <div class="empty-icon-wrapper">
          <v-icon size="80" color="#90CAF9">mdi-clipboard-remove</v-icon>
        </div>
        <h3 class="empty-title">{{ $t('formulariosMedicos.noEvents') }}</h3>
        <p class="empty-text">{{ $t('formulariosMedicos.noEventsDescription') }}</p>
      </div>

      <v-row v-else>
        <v-col cols="12" md="4" v-for="formulario in formularios" :key="formulario.id">
          <v-card elevation="8" rounded="xl" class="event-card">
            <v-img
              v-if="formulario.imagemUrl"
              :src="formulario.imagemUrl"
              height="200"
              cover
              class="event-img"
            />
            <div v-else class="event-img-placeholder">
              <v-icon size="64" color="#90CAF9">mdi-clipboard-text</v-icon>
            </div>

            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-icon size="32" class="mr-3 gradient-icon">
                  mdi-clipboard-text
                </v-icon>
                <h3 class="text-h5 font-weight-bold event-title gradient-text">
                  {{ formulario.titulo }}
                </h3>
              </div>

              <div class="event-details">
                <div class="d-flex align-center mb-3">
                  <v-icon size="20" color="grey-darken-1" class="mr-2">
                    mdi-calendar
                  </v-icon>
                  <span class="text-body-1">{{ formatDate(formulario.data) }}</span>
                </div>

                <div class="d-flex align-center mb-3">
                  <v-icon size="20" color="grey-darken-1" class="mr-2">
                    mdi-map-marker
                  </v-icon>
                  <span class="text-body-1 event-text">{{ formulario.local }}</span>
                </div>
              </div>

              <v-btn
                v-if="formulario.jaRespondeu"
                color="success"
                variant="tonal"
                rounded="lg"
                block
                class="mt-4"
                disabled
              >
                <v-icon class="mr-2">mdi-check-circle</v-icon>
                {{ $t('formulariosMedicos.formSubmitted') }}
              </v-btn>
              <v-btn
                v-else
                variant="flat"
                rounded="lg"
                block
                class="mt-4 gradient-btn"
                @click="responderFormulario(formulario.id)"
              >
                <v-icon class="mr-2">mdi-file-document-edit</v-icon>
                {{ $t('formulariosMedicos.answerForm') }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import formularioMedicoService from '@/services/formulario-medico/formurarioMedico-service'

const router = useRouter()
const { locale } = useI18n()
const loading = ref(false)
const error = ref<string | null>(null)
const formularios = ref<any[]>([])

const buscarFomularios = async() => {
  loading.value = true
  error.value = null
  try {
    const response = await formularioMedicoService.buscarFormularios()
    formularios.value = response.data
  } catch (err) {
    console.error('Erro ao buscar formulários:', err)
    error.value = 'Erro ao carregar os formulários'
    toast.error('Erro ao carregar os formulários')
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const localeCode = locale.value === 'pt' ? 'pt-BR' : 'en-US'
  return date.toLocaleDateString(localeCode, { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const responderFormulario = (eventoId: string) => {
  window.open(`/Atleta-Screens/checkInSaude?eventoId=${eventoId}`, '_blank')
}

onMounted(() => {
  buscarFomularios()
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
  margin-bottom: 8px;
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

.header-subtitle {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  text-align: center;
  margin: 0;
}

.content-section {
  padding: 0 16px;
}

.skeleton-card {
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
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

.empty-icon-wrapper.error {
  background: linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%);
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

.event-card {
  min-height: 275px;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.event-card:hover {
  transform: translateY(-4px);
}

.event-img {
  border-radius: 0;
}

.event-img-placeholder {
  height: 200px;
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.event-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
}

.event-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}

.event-details {
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

.gradient-btn {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  color: white !important;
}

@media (max-width: 768px) {
  .header-title {
    font-size: 1.5rem;
  }
}
</style>
