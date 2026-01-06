<template>
  <div class="pa-0" fluid>
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="position-relative">
        <v-row align="center" class="min-height-300 d-flex flex-md-column-reverse">
          <v-col cols="12" md="4" class="text-center">
            <div class="profile-avatar-container mt-5">
              <v-skeleton-loader
                v-if="!medico"
                type="avatar"
                width="190"
                height="190"
                class="mx-auto mb-4 d-flex align-center justify-center skeleton-avatar"
              />
              <v-avatar v-else size="190" class="profile-avatar">
                <v-img
                  v-if="medico?.usuario?.avatarUrl"
                  :src="medico?.usuario?.avatarUrl"
                  alt="Foto do perfil"
                />
                <v-icon v-else size="70" color="white">mdi-account</v-icon>
              </v-avatar>
            </div>
            <v-skeleton-loader
              v-if="!medico"
              type="text"
              width="300"
              class="mx-auto mb-4 skeleton-nome rounded-xl"
            />
            <h1 v-else class="profile-name">{{ medico?.usuario?.nome }}</h1>
            <p v-if="medico" class="profile-specialty">{{ medico?.especializacao }}</p>
            <div v-if="medico" class="profile-credentials mb-5">
              <v-chip class="credential-chip" prepend-icon="mdi-certificate">
                CRM: {{ medico?.crm }}
              </v-chip>
              <v-chip class="credential-chip" prepend-icon="mdi-medal">
                {{ medico?.experiencia }} anos de experiência
              </v-chip>
            </div>
          </v-col>

          <v-col cols="12">
            <div class="profile-info">
              <div class="info-chips d-flex ga-3 flex-column flex-md-row justify-center justify-space-between ma-5">
                <div class="d-flex ga-2 flex-md-row flex-column">

                <v-chip class="info-chip text-center d-none d-md-flex justify-center" prepend-icon="mdi-account-circle">
                  Perfil Médico
                </v-chip>
                </div>

                <div class="d-flex ga-2 flex-md-row flex-column">
                <v-chip class="info-chip text-center d-flex justify-center" prepend-icon="mdi-identifier">
                   <p class="textId">ID: {{ getUserID() }}</p>
                </v-chip>
                <v-btn class="info-chip d-flex align-center justify-center " variant="outlined" rounded="xl" color="#1E88E5" @click="() => router.push('/medico-Screens/editarPerfilMedico')">
                  <v-icon class="mr-2 text-white" color="white">mdi-pencil</v-icon>
                  <p class="text-white text-subtitle-2">Editar Perfil</p>
                </v-btn>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>


    <div class="content-section">
      <v-expansion-panels class="custom-expansion-panels">
        <v-expansion-panel class="custom-expansion-panel">
          <v-expansion-panel-title>
            <div class="d-flex align-center">
              <v-icon color="#1E88E5" size="28" class="mr-3">mdi-account</v-icon>
              <h3 class="text-h6 font-weight-bold text-grey-darken-2">Informações Pessoais</h3>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-email</v-icon>
                    </div>
                    <h4 class="card-title">Email</h4>
                  </div>
                  <p class="card-content">{{ medico?.usuario?.email || 'Não informado' }}</p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-phone</v-icon>
                    </div>
                    <h4 class="card-title">Telefone</h4>
                  </div>
                  <p class="card-content">{{ formatarTelefone(medico?.telefone) || 'Não informado' }}</p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-card-account-details</v-icon>
                    </div>
                    <h4 class="card-title">CPF</h4>
                  </div>
                  <p class="card-content">{{ formatarCPF(medico?.usuario?.cpf) || 'Não informado' }}</p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-calendar</v-icon>
                    </div>
                    <h4 class="card-title">Data de Nascimento</h4>
                  </div>
                  <p class="card-content">{{ formatarData(medico?.dataNascimento) || 'Não informado' }}</p>
                </div>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel class="custom-expansion-panel-center">
          <v-expansion-panel-title>
            <div class="d-flex align-center">
              <v-icon color="#1E88E5" size="28" class="mr-3">mdi-briefcase</v-icon>
              <h3 class="text-h6 font-weight-bold text-grey-darken-2">Informações Profissionais</h3>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-target</v-icon>
                    </div>
                    <h4 class="card-title">Foco Principal</h4>
                  </div>
                  <p class="card-content">{{ medico?.foco || 'Não informado' }}</p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-account-circle</v-icon>
                    </div>
                    <h4 class="card-title">Perfil Profissional</h4>
                  </div>
                  <p class="card-content">{{ medico?.perfil || 'Não informado' }}</p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-briefcase</v-icon>
                    </div>
                    <h4 class="card-title">Trajetória Profissional</h4>
                  </div>
                  <p class="card-content">{{ medico?.carreira || 'Não informado' }}</p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-star</v-icon>
                    </div>
                    <h4 class="card-title">Principais Conquistas</h4>
                  </div>
                  <p class="card-content">{{ medico?.destaques || 'Não informado' }}</p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-calendar-week</v-icon>
                    </div>
                    <h4 class="card-title">Dias de Trabalho</h4>
                  </div>
                  <p class="card-content">{{ medico?.diaFuncionamentoInicio }} - {{ medico?.diaFuncionamentoFim }}</p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-clock</v-icon>
                    </div>
                    <h4 class="card-title">Horários de Trabalho</h4>
                  </div>
                  <p class="card-content">{{ formatarHorarioLocal(medico?.horarioInicio) }} - {{ formatarHorarioLocal(medico?.horarioFim) }}</p>
                </div>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel class="custom-expansion-panel-bottom">
          <v-expansion-panel-title>
            <div class="d-flex align-center">
              <v-icon color="#1E88E5" size="28" class="mr-3">mdi-map-marker</v-icon>
              <h3 class="text-h6 font-weight-bold text-grey-darken-2">Endereço</h3>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-home</v-icon>
                    </div>
                    <h4 class="card-title">Logradouro</h4>
                  </div>
                  <p class="card-content">{{ medico?.rua || 'Não informado' }}</p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-numeric</v-icon>
                    </div>
                    <h4 class="card-title">Número</h4>
                  </div>
                  <p class="card-content">{{ medico?.numero || 'Não informado' }}</p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-city</v-icon>
                    </div>
                    <h4 class="card-title">Cidade</h4>
                  </div>
                  <p class="card-content">{{ medico?.cidade || 'Não informado' }}</p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-mailbox</v-icon>
                    </div>
                    <h4 class="card-title">CEP</h4>
                  </div>
                  <p class="card-content">{{ medico?.cep || 'Não informado' }}</p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-map</v-icon>
                    </div>
                    <h4 class="card-title">Bairro</h4>
                  </div>
                  <p class="card-content">{{ medico?.bairro || 'Não informado' }}</p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="professional-card">
                  <div class="card-header">
                    <div class="icon-wrapper">
                      <v-icon color="white" size="20">mdi-flag</v-icon>
                    </div>
                    <h4 class="card-title">UF</h4>
                  </div>
                  <p class="card-content">{{ medico?.uf || 'Não informado' }}</p>
                </div>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatarData, formatarHorarioLocal } from '@/utils/date.utils'
import router from '@/router'
import medicoService from '@/services/medico/medico-service'
import { getMedicoId, getUserID } from '@/utils/auth'
import { onMounted, ref } from 'vue'

const medico = ref<any>()


const formatarTelefone = (telefone: string) => {
  if (!telefone) return null
  const numeros = telefone.replace(/\D/g, '')
  if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`
  }
  if (numeros.length === 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`
  }
  return telefone
}

const formatarCPF = (cpf: string) => {
  if (!cpf) return null
  const numeros = cpf.replace(/\D/g, '')
  if (numeros.length === 11) {
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9)}`
  }
  return cpf
}

const buscarMedicoPorId = async (id: any) => {
  try {
    const response = await medicoService.getMedicoById(id)
    medico.value = response.data
  } catch (error) {
    console.error('Erro ao buscar medico por ID:', error)
  }
}

onMounted(() => {

  if (getMedicoId()) {
    buscarMedicoPorId(getMedicoId())
  } else {
    console.error('ID do medico não encontrado.')
  }

})
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);
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
  border-top: 4px solid #1E88E5;
}

.custom-expansion-panel-center {
   background: white;
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
  margin-bottom: 16px;
  border: none;
  padding: 5px 0px;
  border-right: 3px solid #1E88E5;
  border-left: 3px solid #1E88E5;
}

.custom-expansion-panel-bottom {
  background: white;
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
  margin-bottom: 16px;
  border: none;
  padding-bottom: 5px;
  border-bottom: 4px solid #1E88E5;
}

.custom-expansion-panel .v-expansion-panel-title,
.custom-expansion-panel-center .v-expansion-panel-title,
.custom-expansion-panel-bottom .v-expansion-panel-title {
  background: white;
  color: #1E88E5;
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
  border-left: 4px solid #1E88E5;
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
  color: #1E88E5;
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
  border-top: 4px solid #1E88E5;
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

.profile-specialty {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin: 8px 0 16px 0;
}

.profile-credentials {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.credential-chip {
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  font-size: 0.875rem;
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
  background-color: #1E88E5;
}

/* Novos estilos para métricas */
.metrics-card {
  background: linear-gradient(135deg, #2196F3 0%, #1E88E5 100%);
  border: none;
  overflow: hidden;
}

.metrics-header {
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

.professional-card {
  background: white;
  border-radius: 16px;
  padding: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid rgba(0, 198, 254, 0.1);
}

.professional-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 198, 254, 0.15);
}

.card-header {
  background: linear-gradient(135deg, #2196F3 0%, #1E88E5 100%);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-title {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.card-content {
  padding: 20px;
  color: #495057;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
  min-height: 80px;
  display: flex;
  align-items: flex-start;
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
