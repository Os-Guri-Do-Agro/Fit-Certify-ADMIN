<template>
  <VRow class="h-100 d-flex flex-column flex-md-row ma-0 pa-0 overflow-hidden fill-height" no-gutters>
    <!-- DIV DA ESQUERDA -->
    <VCol class="pa-0 ma-0 position-relative" md="4" style="background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); overflow: hidden;">
      <div style="position: absolute; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,0.1); top: -100px; right: -100px;"></div>
      <div style="position: absolute; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,0.08); bottom: 50px; left: -50px;"></div>

      <div class="w-100 h-100 pa-0 ma-0 flex-column justify-center align-center d-flex" no-gutters style="z-index: 1;">
        <div class="mb-10">
          <RouterLink class="d-flex justify-center align-center"
            to="/login" style="transition: transform 0.3s ease;" @mouseenter="$event.currentTarget.style.transform = 'scale(1.05)'" @mouseleave="$event.currentTarget.style.transform = 'scale(1)'">
            <v-img alt="Logo" class="mx-5 mx-lg-16 img-size w-100" cover max-width="300" src="../assets/Login/logo-fit.png" style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));" />
          </RouterLink>
        </div>

        <div class="pa-0 ma-0 d-flex text-center flex-column align-center">
          <h1 class="mx-5 mx-lg-15 text-white text-h5 text-center text-md-h4 font-weight-bold" style="
              font-family: DM Sans, sans-serif;
              text-shadow: 0 2px 8px rgba(0,0,0,0.15);
              letter-spacing: -0.5px;
            ">
            {{ title }}
          </h1>
          <p class="mx-5 mx-lg-15 text-white text-center text-body-1 text-md-h6 font-weight-regular mt-5 mb-10"
            style="
              font-family: DM Sans, sans-serif;
              line-height: 1.6;
              opacity: 0.95;
            ">
            {{ subtitle }}
          </p>
        </div>
      </div>
    </VCol>

    <!-- DIV DA DIREITA -->
    <VCol class="h-100 d-flex align-center pa-0 ma-0" md="8" style="background: #f8f9fa;">
      <div class="d-flex flex-column h-100 w-100 justify-center align-center px-4 px-md-8">
        <div class="d-flex flex-column align-center text-center max-width-600">
          <!-- Ícone de sucesso -->
          <div class="mb-8" style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #88ce0d 0%, #6ba80a 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 32px rgba(136, 206, 13, 0.3);">
            <v-icon color="white" size="60">mdi-check</v-icon>
          </div>

          <!-- Título principal -->
          <h2 class="text-h4 text-md-h3 font-weight-bold mb-4" style="color: #2c3e50; letter-spacing: -0.5px; font-family: DM Sans, sans-serif;">
            Obrigado!
          </h2>

          <!-- Mensagem personalizada -->
          <p class="text-h6 text-md-h5 mb-6" style="color: #34495e; line-height: 1.6; font-family: DM Sans, sans-serif;">
            {{ mainMessage }}
          </p>

          <!-- Descrição adicional -->
          <p class="text-body-1 text-md-subtitle-1 mb-8" style="color: #7f8c8d; line-height: 1.8; font-family: DM Sans, sans-serif;">
            {{ description }}
          </p>

          <!-- Informação adicional específica -->
          <div v-if="additionalInfo" class="mb-8 pa-4" style="background: rgba(0, 198, 254, 0.1); border-radius: 12px; border-left: 4px solid #00c6fe;">
            <p class="text-body-2 text-md-body-1 mb-0" style="color: #2c3e50; font-family: DM Sans, sans-serif;">
              {{ additionalInfo }}
            </p>
          </div>

          <!-- Botões de ação -->
          <div class="d-flex flex-column flex-md-row ga-4 w-100">
            <VBtn class="flex-grow-1" height="50px"
              color="#00c6fe" variant="outlined" rounded="xl"
              style="border-width: 2px; font-weight: 600; text-transform: none; letter-spacing: 0;"
              @click="goToHome">
              <v-icon start>mdi-home</v-icon>
              Página Inicial
            </VBtn>
          </div>
        </div>
      </div>
    </VCol>
  </VRow>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Determina o tipo de cadastro baseado na query string
const userType = computed(() => {
  return route.query.type || 'paciente'
})

// Títulos e textos personalizados
const title = computed(() => {
  return userType.value === 'medico'
    ? 'Bem-vindo à equipe médica FitCertify365!'
    : 'Bem-vindo à comunidade FitCertify365!'
})

const subtitle = computed(() => {
  return userType.value === 'medico'
    ? 'Seu cadastro foi enviado com sucesso. Agora você faz parte da nossa rede de profissionais de saúde especializados em medicina esportiva.'
    : 'Seu cadastro foi realizado com sucesso. Agora você pode começar sua jornada rumo a uma vida mais saudável e ativa.'
})

const mainMessage = computed(() => {
  return userType.value === 'medico'
    ? 'Seu cadastro médico foi enviado para análise!'
    : 'Seu cadastro foi realizado com sucesso!'
})

const description = computed(() => {
  return userType.value === 'medico'
    ? 'Recebemos suas informações e documentos. Nossa equipe irá analisar seu CRM e credenciais. Você receberá um e-mail de confirmação assim que sua conta for aprovada.'
    : 'Agora você pode fazer login e começar a aproveitar todos os benefícios da plataforma FitCertify365. Acompanhe seus marcadores de saúde e emita certificados médicos.'
})

const additionalInfo = computed(() => {
  return userType.value === 'medico'
    ? '💡 O processo de validação pode levar até 48 horas úteis. Você será notificado por e-mail quando sua conta estiver ativa.'
    : '🎉 Explore nossa plataforma e descubra como podemos ajudar você a alcançar seus objetivos de saúde e performance!'
})

const goToLogin = () => {
  router.push('/login')
}

const goToHome = () => {
  router.push('/')
}

onMounted(() => {
  // Limpa possíveis dados de formulário do sessionStorage/localStorage se necessário
  // sessionStorage.removeItem('registerForm')
})
</script>

<style scoped>
.max-width-600 {
  max-width: 600px;
}

.v-btn {
  transition: all 0.3s ease;
}

.v-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.v-btn:active:not(:disabled) {
  transform: translateY(0);
}
</style>
