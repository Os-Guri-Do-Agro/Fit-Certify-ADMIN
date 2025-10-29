<template>
  <v-container class="pa-0" fluid>
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <v-container class="position-relative">
        <v-row align="center" class="min-height-300 d-flex flex-md-column-reverse">
          <v-col cols="12" md="4" class="text-center">
            <div class="profile-avatar-container">
              <v-skeleton-loader
                v-if="!atleta"
                type="avatar"
                width="190"
                height="190"
                class="mx-auto mb-4 d-flex align-center justify-center skeleton-avatar"
              />
              <v-avatar v-else size="190" class="profile-avatar">
                <v-img
                  v-if="atleta?.usuario?.avatarUrl"
                  :src="atleta?.usuario?.avatarUrl"
                  alt="Foto do perfil"
                />
                <v-icon v-else size="70" color="white">mdi-account</v-icon>
              </v-avatar>
            </div>
            <v-skeleton-loader
              v-if="!atleta"
              type="text"
              width="300"
              class="mx-auto mb-4 skeleton-nome rounded-xl"
            />
            <h1 v-else class="profile-name">{{ atleta?.usuario?.nome }}</h1>
          </v-col>

          <v-col cols="12">
            <div class="profile-info">
              <div class="info-chips d-flex ga-3 flex-column flex-md-row justify-center justify-space-between ml-md-10">
                <div class="d-flex ga-2 flex-md-row flex-column">
                  
                <v-chip class="info-chip text-center d-none d-md-flex justify-center" prepend-icon="mdi-account-circle">
                  Perfil do Atleta
                </v-chip>
                <v-chip class="info-chip text-center d-flex justify-center" prepend-icon="mdi-shield-check">
                  Plano Ativo
                </v-chip>
                </div>

                <div class="d-flex ga-2 flex-md-row flex-column mr-md-10">
                <v-chip class="info-chip text-center d-flex justify-center" prepend-icon="mdi-identifier">
                   <p class="textId">ID: {{ payload?.userId }}</p>
                </v-chip>
                <v-btn class="info-chip d-flex align-center justify-center " variant="outlined" rounded="xl" color="#00C6FE" @click="router.push('/Atleta-Screens/editarPerfilAtleta')">
                  <v-icon class="mr-2 text-white" color="white">mdi-pencil</v-icon>
                  <p class="text-white text-subtitle-2">Editar Perfil</p>
                </v-btn>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    
    <v-container class="content-section">
      <v-expansion-panels class="custom-expansion-panels">
        <v-expansion-panel class="custom-expansion-panel">
          <v-expansion-panel-title>
            <div class="d-flex align-center">
              <v-icon color="#00c6fe" size="28" class="mr-3">mdi-heart-pulse</v-icon>
              <h3 class="text-h6 font-weight-bold text-grey-darken-2">Saúde</h3>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-card class="metrics-card mb-6" elevation="8" rounded="xl">
              <div class="metrics-header">
                <v-row align="center">
                  <v-col cols="12" md="4" class="text-center d-flex flex-column-reverse flex-md-column">
                    <div class="d-flex flex-column-reverse flex-md-row ga-2 align-center justify-center mt-5 mt-md-0 mb-md-5">
                      <v-chip class="info-chip text-center d-flex justify-center text-white" prepend-icon="mdi-heart-pulse">
                        Monitoramento de Saúde
                      </v-chip>
                      <v-chip class="info-chip text-center d-flex justify-center text-white">
                        Última Atualização: Hoje
                      </v-chip>
                    </div>
                    <div class="avatar-container">
                      <v-avatar size="190" class="metrics-avatar">
                        <v-icon size="80" color="white">mdi-heart-pulse</v-icon>
                      </v-avatar>
                      <h2 class="text-h5 font-weight-bold text-white mt-4">Indicadores de Saúde</h2>
                      <p class="text-subtitle-1 text-blue-darken-4">Acompanhe seus principais parâmetros</p>
                    </div>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-card class="" elevation="0" rounded="lg">
                      <v-card-text class="pa-4">
                        <v-row>
                          <v-col cols="12" md="6">
                            <div class="metric-item">
                              <div class="d-flex align-center mb-2">
                                <v-icon color="#00c6fe" size="24" class="mr-2">mdi-heart</v-icon>
                                <span class="metric-label">Frequência Cardíaca</span>
                              </div>
                              <div class="metric-value">72 <span class="metric-unit">bpm</span></div>
                              <div class="metric-status normal">Normal</div>
                            </div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="metric-item">
                              <div class="d-flex align-center mb-2">
                                <v-icon color="#00c6fe" size="24" class="mr-2">mdi-gauge</v-icon>
                                <span class="metric-label">Pressão Arterial</span>
                              </div>
                              <div class="metric-value">120/80 <span class="metric-unit">mmHg</span></div>
                              <div class="metric-status normal">Normal</div>
                            </div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="metric-item">
                              <div class="d-flex align-center mb-2">
                                <v-icon color="#00c6fe" size="24" class="mr-2">mdi-scale-bathroom</v-icon>
                                <span class="metric-label">Peso Corporal</span>
                              </div>
                              <div class="metric-value">75.2 <span class="metric-unit">kg</span></div>
                              <div class="metric-status normal">Ideal</div>
                            </div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <div class="metric-item">
                              <div class="d-flex align-center mb-2">
                                <v-icon color="#00c6fe" size="24" class="mr-2">mdi-thermometer</v-icon>
                                <span class="metric-label">Temperatura</span>
                              </div>
                              <div class="metric-value">36.5 <span class="metric-unit">°C</span></div>
                              <div class="metric-status normal">Normal</div>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import router from '@/router'
import { getPayload } from '@/utils/auth'
import { onMounted, ref } from 'vue'
import atletaService from '@/services/atleta/atleta-service'
import { getAtletaId } from '@/utils/auth'

const payload = ref<any>()
const atleta = ref<any>()
let atletaId = ref<any>()

const buscarAtletaPorId = async (id: any) => {
  try {
    const response = await atletaService.getAtletaById(id)
    atleta.value = response.data
  } catch (error) {
    console.error('Erro ao buscar atleta por ID:', error)
  }
}

onMounted(() => {
  atletaId = getAtletaId()

  if (atletaId) {
    buscarAtletaPorId(atletaId)
    payload.value = getPayload()
  } else {
    console.error('ID do atleta não encontrado.')
  }
  
})
</script>

<style scoped>
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

.profile-name {
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: 16px;
  margin-bottom: 8px;
}

.profile-id {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin: 0;
}

.info-chip {
  background: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
}

.content-section {
  background: #f8f9fa;
  padding-top: 48px;
  padding-bottom: 48px;
}

.custom-expansion-panels {
  box-shadow: none;
}

.custom-expansion-panel {
  background: white;
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
  margin-bottom: 16px;
  border: none;
  border-top: 4px solid #00c6fe;
  transition: all 0.3s ease;
}

.custom-expansion-panel:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 198, 254, 0.15) !important;
}

.custom-expansion-panel .v-expansion-panel-title {
  background: white;
  color: #00c6fe;
  font-weight: 600;
  padding: 24px;
}

.custom-expansion-panel .v-expansion-panel-text {
  padding: 0;
}

.section-header {
  text-align: center;
}

.health-card {
  transition: all 0.3s ease;
  border-left: 4px solid #00c6fe;
  background: white;
}

.health-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 198, 254, 0.15) !important;
}

.parameter-content {
  text-align: center;
}

.parameter-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #00c6fe;
  line-height: 1;
  margin-bottom: 8px;
}

.parameter-unit {
  font-size: 1.2rem;
  font-weight: 400;
  color: #666;
}

.parameter-status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.parameter-status.normal {
  background: #e8f5e8;
  color: #2e7d32;
}

.parameter-status.warning {
  background: #fff3e0;
  color: #f57c00;
}

.parameter-status.danger {
  background: #ffebee;
  color: #d32f2f;
}

.parameter-description {
  font-size: 0.875rem;
  color: #666;
}

.actions-card {
  border-top: 4px solid #00c6fe;
  background: white;
}

.action-btn {
  height: 56px !important;
  border-radius: 12px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  transition: all 0.3s ease !important;
}

.action-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 24px rgba(0, 198, 254, 0.2) !important;
}

.barraLista {
  height: 1px;
  background-color: #00c7fe7e;
  width: 50%;
}
.textId {
  font-size: 1em;
}
.skeleton-avatar {
  width: 190px;
  height: 190px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
}

.profile-avatar {
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

@keyframes skeleton-pulse {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
.skeleton-nome {
  background-color: #00c6fe;
}

/* Novos estilos para métricas */
.metrics-card {
  background: linear-gradient(135deg, #2196F3 0%, #00c6fe 100%);
  border: none;
  overflow: hidden;
}

.metrics-header {
  padding: 2rem;
  position: relative;
}

.metrics-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
  opacity: 0.3;
}

.avatar-container {
  position: relative;
  display: inline-block;
}

.metrics-avatar {
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.1);
}

.metric-item {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.metric-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 198, 254, 0.2);
}

.metric-label {
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
}

.metric-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 8px 0;
}

.metric-unit {
  font-size: 0.9rem;
  font-weight: 500;
  color: #7f8c8d;
}

.metric-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
}

.metric-status.normal {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

@media (max-width: 960px) {
  .profile-info {
    margin-top: 24px;
    text-align: center;
  }
  
  .info-chips {
    justify-content: center;
  }
  
  .section-header {
    text-align: left;
  }
  
  .parameter-content {
    text-align: left;
  }
  .textId {
  font-size: 0.7em;
}
}
</style>
