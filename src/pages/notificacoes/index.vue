<template>
  <v-container class="pa-0" fluid>
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <v-container class="position-relative">
        <div class="notification-stats">
          <v-chip class="stat-chip" prepend-icon="mdi-bell">
            {{ notificacoes.length }} total
          </v-chip>
          <v-chip class="stat-chip" prepend-icon="mdi-bell-badge">
            {{ notificacoesNaoLidas }} não lidas
          </v-chip>
        </div>

        <v-row align="center" class="min-height-300">
          <v-col cols="12" class="text-center">
            <v-icon color="white" size="80" class="mb-4">mdi-bell-outline</v-icon>
            <h1 class="notification-title">Notificações Gerais</h1>
            <p class="notification-subtitle">Acompanhe todas as suas notificações importantes</p>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-container class="content-section">
      <v-row justify="center">
        <v-col cols="12">
          <v-card class="notifications-card rounded-xl" elevation="2">
            <v-card-title class="pa-6 pb-0">
              <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                  <v-icon color="#00c6fe" size="28" class="mr-3">mdi-bell-ring</v-icon>
                  <h3 class="text-h6 font-weight-bold">Suas Notificações</h3>
                </div>
                <v-btn v-if="notificacoesNaoLidas > 0" variant="outlined" color="#00c6fe" size="small"
                  @click="marcarTodasComoLidas">
                  <v-icon size="16" class="mr-1">mdi-check-all</v-icon>
                  Marcar todas como lidas
                </v-btn>
              </div>
            </v-card-title>

            <v-card-text class="pa-6">
              <div v-if="notificacoes.length > 0">
                <v-card v-for="notificacao in notificacoes" :key="notificacao.id" elevation="1" :class="[
                  'notification-item mb-3 rounded-xl',
                  { 'unread': !notificacao.visualizado, 'read': notificacao.visualizado }
                ]" variant="outlined" :color="notificacao.visualizado ? 'grey-lighten-5' : 'blue'">
                  <v-card-text class="pa-4">
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
                              {{ formatarDataLocal(notificacao.data) }}
                            </span>
                            <v-chip v-if="!notificacao.visualizado" color="#00c6fe" size="x-small" class="mr-2">
                              Nova
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

              <div v-else class="text-center py-8">
                <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-bell-off</v-icon>
                <h4 class="text-h6 text-grey-darken-1 mb-2">Nenhuma notificação</h4>
                <p class="text-body-2 text-grey">Você não possui notificações no momento.</p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { formatarDataHora , formatarDataLocal} from '@/utils/date.utils'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { computed, ref } from 'vue'
dayjs.locale('pt-br')


const notificacoes = ref<any[]>([])

const notificacoesNaoLidas = computed(() => {
  return notificacoes.value.filter(n => !n.visualizado).length
})


const getNotificationColor = (tipo: string) => {
  switch (tipo) {
    case 'consulta': return '#00c6fe'
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
</script>

<style scoped>
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #2196F3 0%, #00c6fe 100%);
  position: relative;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}

.min-height-300 {
  min-height: 300px;
}

/* Notification Stats */
.notification-stats {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 2;
}

.stat-chip {
  background: #fff !important;
  color: #00c6fe !important;
  margin-left: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Notification Title */
.notification-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
}

.notification-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin: 0;
}

/* Content Section */
.content-section {
  background: #f8f9fa;
  padding-top: 40px;
  padding-bottom: 40px;
}

/* Cards */
.notifications-card {
  transition: all 0.3s ease;
  border-top: 3px solid #2196F3;
}

.notification-item {
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.notification-item.unread {
  border-left-color: #00c6fe;
  background: rgba(0, 198, 254, 0.02);
}

.notification-item.read {
  background: rgba(0, 0, 0, 0.05) !important;
}

.notification-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
}

/* Responsive */
@media (max-width: 960px) {
  .notification-stats {
    position: static;
    text-align: center;
    margin-bottom: 24px;
  }

  .stat-chip {
    margin: 4px;
  }

  .notification-title {
    font-size: 2rem;
  }
}
</style>
