<template>
  <v-container fluid class="fill-height pa-0 bg-container">
    <v-row justify="center" align="center" class="fill-height ma-0">
      <v-col cols="12" sm="10" md="8" lg="6" xl="5">
        <!-- Card principal -->
        <v-card rounded="xl" elevation="12" class="main-card">
          <!-- Logo no card branco -->
          <div class="text-center pt-8 pb-6">
<a href="https://fitcert365.com/" target="_blank" >
              <v-img
                src="../assets/Camada_1.png"
                max-width="280"
                class="mx-auto"
                alt="FitCert Logo"
                eager
              ></v-img>
            </a>
          </div>

          <!-- Título -->
          <div class="text-center pb-4 px-6">

            <h1 class="text-h4 font-weight-bold mb-3" style="color: #1a1a1a;">Crie sua conta</h1>
            <p class="text-subtitle-1 text-medium-emphasis mb-0">
              Selecione o tipo de conta que deseja criar
            </p>
          </div>

          <!-- Cards de seleção -->
          <v-card-text class="px-6 py-6">
            <v-row class="ma-0">
              <v-col cols="12" md="6" class="pa-2">
                <v-card class="selection-card" :class="{ 'selected-card': tipoContaSelecionado === 'atleta' }"
                  @click="selecionarTipoConta('atleta')" elevation="0">
                  <v-card-text class="pa-6 text-center">
                    <div class="icon-circle mb-4"
                      style="background: linear-gradient(135deg, #88CE0D 0%, #6ba80a 100%);">
                      <v-icon size="40" color="white">mdi-run</v-icon>
                    </div>
                    <h3 class="text-h6 font-weight-bold mb-3">Atleta</h3>
                    <p class="text-body-2 text-medium-emphasis mb-0">
                      Acesse consultas médicas e acompanhamento profissional
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="6" class="pa-2">
                <v-card class="selection-card" :class="{ 'selected-card': tipoContaSelecionado === 'medico' }"
                  @click="selecionarTipoConta('medico')" elevation="0">
                  <v-card-text class="pa-6 text-center">
                    <div class="icon-circle mb-4"
                      style="background: linear-gradient(135deg, #42A5F5 0%, #0099cc 100%);">
                      <v-icon size="40" color="white">mdi-stethoscope</v-icon>
                    </div>
                    <h3 class="text-h6 font-weight-bold mb-3">Médico</h3>
                    <p class="text-body-2 text-medium-emphasis mb-0">
                      Atenda pacientes e gerencie suas consultas
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- Botão de continuar -->
          <v-card-actions class="px-6 pb-6 pt-2">
            <v-btn color="#42A5F5" variant="flat" block size="x-large" @click="confirmarTipoConta"
              :disabled="!tipoContaSelecionado" class="text-white continue-btn" rounded="lg">
              <v-icon class="me-2">mdi-arrow-right</v-icon>
              Continuar
            </v-btn>
          </v-card-actions>

          <!-- Link para login -->
          <div class="text-center pb-6">
            <span class="text-body-2 text-medium-emphasis">Já tem uma conta?</span>
            <v-btn variant="text" color="#42A5F5" @click="router.push('/login')" class="text-none font-weight-bold">
              Fazer Login
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const tipoContaSelecionado = ref('')

function selecionarTipoConta(tipo: string) {
  tipoContaSelecionado.value = tipo
}

function confirmarTipoConta() {
  if (tipoContaSelecionado.value === 'atleta') {
    router.push('/register')
  } else if (tipoContaSelecionado.value === 'medico') {
    router.push('/register-medico')
  }
}
</script>

<style scoped>
.bg-container {
  position: relative;
  background-image: url('../assets/bg-registers-select.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.bg-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  z-index: 0;
}

.bg-container > * {
  position: relative;
  z-index: 1;
}

.logo-link {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.main-card {
  background: white;
  overflow: hidden;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #42A5F5 0%, #0099cc 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 198, 254, 0.3);
}

.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
}

.selected-card .icon-circle {
  transform: scale(1.08);
}

.selection-card {
  cursor: pointer;
  transition: all 0.2s ease;
  border: 3px solid #f5f5f5;
  background: #fafafa;
  height: 100%;
}

.selection-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: #e0e0e0;
}

.selected-card {
  border: 3px solid #42A5F5 !important;
  background: linear-gradient(135deg, rgba(0, 198, 254, 0.08) 0%, rgba(0, 153, 204, 0.08) 100%) !important;
  box-shadow: 0 8px 32px rgba(0, 198, 254, 0.3) !important;
  transform: translateY(-2px) scale(1.02);
}

.continue-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: none;
  font-size: 16px;
  height: 56px !important;
  box-shadow: 0 4px 16px rgba(0, 198, 254, 0.3);
  transition: all 0.3s ease;
}

.continue-btn:hover {
  box-shadow: 0 6px 24px rgba(0, 198, 254, 0.4);
  transform: translateY(-2px);
}

.continue-btn:disabled {
  opacity: 0.5;
}
</style>
