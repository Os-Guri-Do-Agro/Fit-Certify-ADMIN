<template>
  <v-container class="py-10">
    <div class="header-section">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <v-icon size="40" color="white">mdi-bell</v-icon>
        </div>
        <h1 class="header-title">{{ $t('notificacoes.title') }}</h1>
        <p class="header-subtitle">{{ $t('notificacoes.subtitle') }}</p>
        <div class="notification-stats">
          <v-chip class="stat-chip" prepend-icon="mdi-bell">
            {{ totalNotificacoes }} {{ $t('notificacoes.total') }}
          </v-chip>
          <v-chip class="stat-chip" prepend-icon="mdi-bell-badge">
            {{ notificacoesNaoLidas }} {{ $t('notificacoes.unread') }}
          </v-chip>
        </div>
      </div>
    </div>

    <v-row justify="center" class="mt-8">
      <v-col cols="12" md="10">
          <div class="d-flex align-center justify-space-between mb-6">
            <h3 class="text-h6 font-weight-bold">{{ $t('notificacoes.yourNotifications') }}</h3>
          </div>

          <div v-if="loading" class="loading-container">
            <v-skeleton-loader
              v-for="i in 3"
              :key="i"
              type="list-item-avatar-two-line"
              class="mb-4 rounded-xl"
            />
          </div>

          <div v-else>
            <v-card v-if="isAtleta() && formulariosPendentes.length > 0" elevation="3" class="mb-4 rounded-xl" color="#FFF3E0">
              <v-card-text class="pa-5">
                <div class="d-flex align-center">
                  <v-avatar color="#FF6B35" size="48" class="mr-4">
                    <v-icon color="white" size="24">mdi-clipboard-text</v-icon>
                  </v-avatar>
                  <div class="flex-grow-1">
                    <h4 class="text-subtitle-1 font-weight-bold text-black mb-1">
                      {{ t('notificacoes.pendingForms') }}
                    </h4>
                    <p class="text-body-2 text-grey-darken-1 mb-0">
                      {{ t('notificacoes.pendingFormsDescription', { count: formulariosPendentes.length }) }}
                    </p>
                  </div>
                  <v-btn @click="irParaFormularios" color="#FF6B35" variant="flat" size="small">
                    {{ t('notificacoes.answerForms') }}
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>

            <div v-if="notificacoes.length > 0">
              <v-card v-for="notificacao in notificacoes" :key="notificacao.id" elevation="2" :class="[
                'notification-item mb-4 rounded-xl',
                { 'unread': !notificacao.visualizado, 'read': notificacao.visualizado }
              ]">
                <v-card-text class="pa-5">
                  <div class="d-flex align-center">
                    <v-avatar :color="getNotificationColor(notificacao.tipo)" size="48" class="mr-4">
                      <v-icon color="white" size="24">
                        {{ getNotificationIcon(notificacao.tipo) }}
                      </v-icon>
                    </v-avatar>

                    <div class="flex-grow-1">
                      <div class="d-flex align-center justify-space-between mb-1">
                        <h4 class="text-subtitle-1 font-weight-medium text-black">
                          {{ notificacao.titulo }}
                        </h4>
                        <div class="d-flex align-center">
                          <span class="text-caption text-grey mr-2">
                            {{ formatDateTime(notificacao.data) }}
                          </span>
                          <v-chip v-if="!notificacao.visualizado" color="blue" size="x-small" class="mr-2">
                            {{ $t('notificacoes.new') }}
                          </v-chip>
                          <v-btn icon size="small" variant="text" @click="toggleVisualizacao(notificacao)">
                            <v-icon size="16">
                              {{ notificacao.visualizado ? 'mdi-eye-off' : 'mdi-eye' }}
                            </v-icon>
                          </v-btn>
                        </div>
                      </div>
                      <p class="text-body-2 text-grey-darken-1 mb-0">
                        {{ notificacao.descricao }}
                      </p>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </div>

            <div v-if="totalNotificacoes <= 0" class="text-center py-8">
              <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-bell-off</v-icon>
              <h4 class="text-h6 text-grey-darken-1 mb-2">{{ $t('notificacoes.noNotifications') }}</h4>
              <p class="text-body-2 text-grey">{{ $t('notificacoes.noNotificationsDescription') }}</p>
            </div>
          </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { formatarDataHora , formatarDataLocal} from '@/utils/date.utils'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { isAtleta } from '@/utils/auth'
import formularioMedicoService from '@/services/formulario-medico/formurarioMedico-service'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()
const router = useRouter()

dayjs.locale('pt-br')

const notificacoes = ref<any[]>([])
const formulariosPendentes = ref<any[]>([])
const loading = ref(true)

const formatDateTime = (dateTime: string) => {
  if (!dateTime) return ''
  const d = new Date(dateTime)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')

  const dateStr = locale.value === 'pt' ? `${day}/${month}/${year}` : `${month}/${day}/${year}`
  return `${dateStr} ${hours}:${minutes}`
}

const notificacoesNaoLidas = computed(() => {
  const naoLidas = notificacoes.value.filter(n => !n.visualizado).length
  const formsPendentes = isAtleta() ? formulariosPendentes.value.length : 0
  return naoLidas + formsPendentes
})

const totalNotificacoes = computed<any>(() => {
  const total = notificacoes.value.length
  const formsPendentes = isAtleta() ? formulariosPendentes.value.length : 0
  return total + formsPendentes
})


const getNotificationColor = (tipo: string) => {
  switch (tipo) {
    case 'consulta': return '#42A5F5'
    case 'exame': return 'green'
    case 'medicacao': return 'orange'
    case 'cancelamento': return 'red'
    default: return 'grey'
  }
}

const getNotificationIcon = (tipo: string) => {
  switch (tipo) {
    case 'consulta': return 'mdi-calendar-check'
    case 'exame': return 'mdi-file-document'
    case 'medicacao': return 'mdi-pill'
    case 'cancelamento': return 'mdi-calendar-remove'
    default: return 'mdi-bell'
  }
}

const toggleVisualizacao = (notificacao: any) => {
  notificacao.visualizado = !notificacao.visualizado
}

const marcarTodasComoLidas = () => {
  notificacoes.value.forEach(n => n.visualizado = true)
}

const buscarFormulariosPendentes = async () => {
  if (!isAtleta()) return

  try {
    const response = await formularioMedicoService.buscarFormularios()
    const formularios = response.data || response
    formulariosPendentes.value = formularios.filter((f: any) => !f.jaRespondeu)
  } catch (error) {
    console.error('Erro ao buscar formulários:', error)
  }
}

const irParaFormularios = () => {
  router.push('/Atleta-Screens/formularios')
}

const carregarNotificacoes = async () => {
  loading.value = true
  try {
    await buscarFormulariosPendentes()
    await new Promise(resolve => setTimeout(resolve, 800))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  carregarNotificacoes()
})
</script>

<style scoped>
.header-section {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  padding: 48px 24px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
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
  font-size: 1.1rem;
  color: white;
  opacity: 0.95;
  margin: 0;
}

.notification-stats {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.stat-chip {
  background: rgba(255, 255, 255, 0.9) !important;
  color: #1E88E5 !important;
  font-weight: 600;
}

.gradient-btn {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  color: white !important;
}

.notification-item {
  transition: all 0.2s ease;
  border-left: 4px solid transparent;
}

.notification-item.unread {
  border-left-color: #42A5F5;
  background: rgba(66, 165, 245, 0.03);
}

.notification-item.read {
  background: #fafafa;
}

.notification-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
}
</style>
