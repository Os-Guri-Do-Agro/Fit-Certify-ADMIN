<template>
  <v-container class="pa-0" fluid>
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <v-container class="position-relative">
        <v-row align="center" class="min-height-300 d-flex flex-md-column-reverse">
          <v-col cols="12" md="4" class="text-center">
            <div class="profile-avatar-container">
              <v-avatar size="140" class="profile-avatar">
                <v-img
                  v-if="payload?.user?.avatarUrl"
                  :src="payload?.user?.avatarUrl"
                  alt="Foto do perfil"
                />
                <v-icon v-else size="70" color="white">mdi-account</v-icon>
              </v-avatar>
            </div>
            <h1 class="profile-name">{{ payload?.user?.nome }}</h1>
          </v-col>

          <v-col cols="12">
            <div class="profile-info">
              <div class="info-chips d-flex ga-3 flex-column flex-md-row justify-center justify-space-between ml-md-10">
                <div class="d-flex ga-2 flex-md-row flex-column">
                  
                <v-chip class="info-chip text-center d-none d-md-flex justify-center" prepend-icon="mdi-account-circle">
                  Perfil do Usuário
                </v-chip>
                <v-chip class="info-chip text-center d-flex justify-center" prepend-icon="mdi-shield-check">
                  Plano Ativo
                </v-chip>
                </div>

                <div class="d-flex ga-2 flex-md-row flex-column mr-md-10">
                <v-chip class="info-chip text-center d-flex justify-center" prepend-icon="mdi-identifier">
                   <p class="textId">ID: {{ payload?.userId }}</p>
                </v-chip>
                <v-btn class="info-chip d-flex align-center justify-center " variant="outlined" rounded="xl" color="#00C6FE">
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
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <div class="section-header mb-6">
            <div class="d-flex flex-column flex-md-row align-center justify-md-center">
              <v-icon color="#00c6fe" size="32" class="mr-3">mdi-heart-pulse</v-icon>
              <h2 class="text-h5 font-weight-bold text-grey-darken-2 text-center">Monitoramento de Saúde</h2>
            </div>
            <p class="text-body-1 text-grey mt-2 mb-0 text-center">Acompanhe seus principais indicadores de saúde</p>
          </div>

          <v-row class="mb-8">
            <v-col cols="12" md="6" class="mb-4">
              <v-card class="health-card h-100 rounded-xl" elevation="2">
                <v-card-text class="pa-6">
                  <div class="d-flex align-center mb-4">
                    <v-icon color="#00c6fe" size="28" class="mr-3">mdi-heart</v-icon>
                    <h3 class="text-h6 font-weight-bold text-grey-darken-2">Frequência Cardíaca</h3>
                  </div>
                  <div class="parameter-content">
                    <div class="parameter-value">72 <span class="parameter-unit">bpm</span></div>
                    <div class="parameter-status normal">Normal</div>
                    <div class="parameter-description">Última medição: Hoje, 14:30</div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="6" class="mb-4">
              <v-card class="health-card h-100 rounded-xl" elevation="2">
                <v-card-text class="pa-6">
                  <div class="d-flex align-center mb-4">
                    <v-icon color="#00c6fe" size="28" class="mr-3">mdi-gauge</v-icon>
                    <h3 class="text-h6 font-weight-bold text-grey-darken-2">Pressão Arterial</h3>
                  </div>
                  <div class="parameter-content">
                    <div class="parameter-value">120/80 <span class="parameter-unit">mmHg</span></div>
                    <div class="parameter-status normal">Normal</div>
                    <div class="parameter-description">Última medição: Hoje, 14:25</div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="6" class="mb-4">
              <v-card class="health-card h-100 rounded-xl" elevation="2">
                <v-card-text class="pa-6">
                  <div class="d-flex align-center mb-4">
                    <v-icon color="#00c6fe" size="28" class="mr-3">mdi-scale-bathroom</v-icon>
                    <h3 class="text-h6 font-weight-bold text-grey-darken-2">Peso Corporal</h3>
                  </div>
                  <div class="parameter-content">
                    <div class="parameter-value">75.2 <span class="parameter-unit">kg</span></div>
                    <div class="parameter-status normal">Ideal</div>
                    <div class="parameter-description">Última medição: Ontem, 08:00</div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="6" class="mb-4">
              <v-card class="health-card h-100 rounded-xl" elevation="2">
                <v-card-text class="pa-6">
                  <div class="d-flex align-center mb-4">
                    <v-icon color="#00c6fe" size="28" class="mr-3">mdi-thermometer</v-icon>
                    <h3 class="text-h6 font-weight-bold text-grey-darken-2">Temperatura</h3>
                  </div>
                  <div class="parameter-content">
                    <div class="parameter-value">36.5 <span class="parameter-unit">°C</span></div>
                    <div class="parameter-status normal">Normal</div>
                    <div class="parameter-description">Última medição: Hoje, 12:00</div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- <v-card class="actions-card rounded-xl" elevation="2">
            <v-card-title class="pa-6 pb-0">
              <div class="d-flex align-center justify-center">
                <v-icon color="#00c6fe" size="28" class="mr-3">mdi-lightning-bolt</v-icon>
                <h3 class="text-h6 font-weight-bold text-grey-darken-2">Minhas consultas</h3>
              </div>

              <div class="w-full d-flex align-center justify-center mt-5">
                <div class="barraLista"></div>
              </div>
            </v-card-title>
            
            <v-card-text class="pa-6">
              <v-row>

                <v-col cols="12">

                </v-col>
              </v-row>
            </v-card-text>
          </v-card> -->
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { getPayload } from '@/utils/auth'
import { onMounted, ref } from 'vue'

const payload = ref<any>()

onMounted(() => {
  payload.value = getPayload()
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

.profile-avatar {
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
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
