<template>
  <v-container class="py-10">
    <div class="header-section">
      <div class="header-content">
        <div class="profile-avatar-container">
          <v-skeleton-loader
            v-if="!atleta"
            type="avatar"
            width="120"
            height="120"
            class="mx-auto skeleton-avatar"
          />
          <v-avatar v-else size="120" class="profile-avatar">
            <v-img
              v-if="atleta?.usuario?.avatarUrl"
              :src="atleta?.usuario?.avatarUrl"
              alt="Foto do perfil"
            />
            <v-icon v-else size="50" color="white">mdi-account</v-icon>
          </v-avatar>
        </div>
        <v-skeleton-loader
          v-if="!atleta"
          type="text"
          width="200"
          class="mx-auto skeleton-nome rounded-xl"
        />
        <h1 v-else class="header-title">{{ atleta?.usuario?.nome }}</h1>
        <p class="header-subtitle">Perfil do Atleta</p>
        <div class="notification-stats">
          <v-chip class="stat-chip" prepend-icon="mdi-identifier">
            ID: {{ getUserID() }}
          </v-chip>
          <v-chip class="stat-chip" prepend-icon="mdi-shield-check">
            Plano Ativo
          </v-chip>
        </div>
        <v-btn class="mt-4 gradient-btn" rounded="xl" @click="$router.push('/Atleta-Screens/editarPerfilAtleta')">
          <v-icon class="mr-2">mdi-pencil</v-icon>
          Editar Perfil
        </v-btn>
      </div>
    </div>

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
                            <div class="metric-value">0 <span class="metric-unit">bpm</span></div>
                            <div class="metric-status normal">Sem dados</div>
                          </div>
                        </v-col>
                        <v-col cols="12" md="6">
                          <div class="metric-item">
                            <div class="d-flex align-center mb-2">
                              <v-icon color="#00c6fe" size="24" class="mr-2">mdi-gauge</v-icon>
                              <span class="metric-label">Pressão Arterial</span>
                            </div>
                            <div class="metric-value">0 <span class="metric-unit">mmHg</span></div>
                            <div class="metric-status normal">Sem dados</div>
                          </div>
                        </v-col>
                        <v-col cols="12" md="6">
                          <div class="metric-item">
                            <div class="d-flex align-center mb-2">
                              <v-icon color="#00c6fe" size="24" class="mr-2">mdi-scale-bathroom</v-icon>
                              <span class="metric-label">Peso Corporal</span>
                            </div>
                            <div class="metric-value"> <span>0</span> <span class="metric-unit">kg</span></div>
                            <div class="metric-status normal">Sem dados</div>
                          </div>
                        </v-col>
                        <v-col cols="12" md="6">
                          <div class="metric-item">
                            <div class="d-flex align-center mb-2">
                              <v-icon color="#00c6fe" size="24" class="mr-2">mdi-thermometer</v-icon>
                              <span class="metric-label">Temperatura</span>
                            </div>
                            <div class="metric-value">0 <span class="metric-unit">°C</span></div>
                            <div class="metric-status normal">Sem dados</div>
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

      <v-expansion-panel class="custom-expansion-panel">
        <v-expansion-panel-title>
          <div class="d-flex align-center">
            <v-icon color="#00c6fe" size="28" class="mr-3">mdi-account-details</v-icon>
            <h3 class="text-h6 font-weight-bold text-grey-darken-2">Informações Pessoais</h3>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-card class="metrics-card mb-6" elevation="8" rounded="xl">
            <div class="metrics-header">
              <v-row align="center">
                <v-col cols="12" md="4" class="text-center d-flex flex-column-reverse flex-md-column">
                  <div class="d-flex flex-column-reverse flex-md-row ga-2 align-center justify-center mt-5 mt-md-0 mb-md-5">
                    <v-chip class="info-chip text-center d-flex justify-center text-white" prepend-icon="mdi-account-details">
                      Dados Pessoais
                    </v-chip>
                    <v-chip class="info-chip text-center d-flex justify-center text-white">
                      Informações Cadastrais
                    </v-chip>
                  </div>
                  <div class="avatar-container">
                    <v-avatar size="190" class="metrics-avatar">
                      <v-icon size="80" color="white">mdi-account-details</v-icon>
                    </v-avatar>
                    <h2 class="text-h5 font-weight-bold text-white mt-4">Dados Cadastrais</h2>
                    <p class="text-subtitle-1 text-blue-darken-4">Informações pessoais do atleta</p>
                  </div>
                </v-col>
                <v-col cols="12" md="8">
                  <v-card class="" elevation="0" rounded="lg">
                    <v-card-text class="pa-4">
                      <v-row>
                        <v-col cols="12" md="6">
                          <div class="metric-item">
                            <div class="d-flex align-center mb-2">
                              <v-icon color="#00c6fe" size="24" class="mr-2">mdi-email</v-icon>
                              <span class="metric-label">Email</span>
                            </div>
                            <div class="metric-value">{{ atleta?.usuario?.email || 'Não informado' }}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" md="6">
                          <div class="metric-item">
                            <div class="d-flex align-center mb-2">
                              <v-icon color="#00c6fe" size="24" class="mr-2">mdi-phone</v-icon>
                              <span class="metric-label">Telefone</span>
                            </div>
                            <div class="metric-value">{{ atleta?.telefone || 'Não informado' }}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" md="6">
                          <div class="metric-item">
                            <div class="d-flex align-center mb-2">
                              <v-icon color="#00c6fe" size="24" class="mr-2">mdi-card-account-details</v-icon>
                              <span class="metric-label">CPF</span>
                            </div>
                            <div class="metric-value">{{ formatarCpf }}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" md="6">
                          <div class="metric-item">
                            <div class="d-flex align-center mb-2">
                              <v-icon color="#00c6fe" size="24" class="mr-2">mdi-calendar</v-icon>
                              <span class="metric-label">Data de Nascimento</span>
                            </div>
                            <div class="metric-value">{{ formatarData }}</div>
                          </div>
                        </v-col>
                        <v-col cols="12" >
                          <div class="metric-item">
                            <div class="d-flex align-center mb-2">
                              <v-icon color="#00c6fe" size="24" class="mr-2">mdi-human-male-height</v-icon>
                              <span class="metric-label">Altura</span>
                            </div>
                            <div class="metric-value">{{ atleta?.altura ? atleta.altura + ' cm' : 'Não informado' }}</div>
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
</template>

<script setup lang="ts">
import router from '@/router'
import atletaService from '@/services/atleta/atleta-service'
import { getAtletaId, getUserID } from '@/utils/auth'
import { computed, onMounted, ref } from 'vue'

const atleta = ref<any>()

const formatarData = computed(() => {
  if (!atleta.value?.dataNascimento) return 'Não informado'
  return new Date(atleta.value.dataNascimento).toLocaleDateString('pt-BR')
})

const formatarCpf = computed(() => {
  if (!atleta.value?.usuario?.cpf) return 'Não informado'
  return atleta.value.usuario.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
})

const buscarAtletaPorId = async (id: any) => {
  try {
    const response = await atletaService.getAtletaById(id)
    atleta.value = response.data
  } catch (error) {
    console.error('Erro ao buscar atleta por ID:', error)
  }
}

onMounted(() => {

  if (getAtletaId()) {
    buscarAtletaPorId(getAtletaId())
  } else {
    console.error('ID do atleta não encontrado.')
  }

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
  flex-wrap: wrap;
  justify-content: center;
}

.stat-chip {
  background: rgba(255, 255, 255, 0.9) !important;
  color: #1E88E5 !important;
  font-weight: 600;
}

.gradient-btn {
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.gradient-btn:hover {
  background: rgba(255, 255, 255, 0.3) !important;
}

.profile-avatar {
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.skeleton-avatar {
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 4px solid rgba(255, 255, 255, 0.3);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
}

@keyframes skeleton-pulse {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}

.skeleton-nome {
  background-color: rgba(255, 255, 255, 0.3);
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
}

.custom-expansion-panel:first-child {
  border-top: 4px solid #00c6fe;
}

.custom-expansion-panel:last-child {
  border-bottom: 4px solid #00c6fe;
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

.info-chip {
  background: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
}

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
  transition: all 0.3s ease;
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 16px;
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
  color: grey;
  border: 1px solid rgba(76, 175, 80, 0.3);
}
</style>
