<template>
  <VRow class="h-100 d-flex flex-column flex-md-row ma-0 pa-0 overflow-hidden fill-height" no-gutters>
    <!-- DIV DA ESQUERDA -->
    <VCol class="h-100 d-flex align-center pa-0 ma-0" :md="4" :cols="12" style="background: #f8f9fa;">
      <div class="d-flex flex-column h-100 w-100 justify-center align-center px-4 px-md-8">
        <div class="mb-8 d-flex justify-center">
          <a href="https://fitcertify365.com/" target="_blank" style="transition: transform 0.3s ease;" @mouseenter="($event.currentTarget as HTMLElement).style.transform = 'scale(1.05)'" @mouseleave="($event.currentTarget as HTMLElement).style.transform = 'scale(1)'">
            <v-img alt="Logo" cover width="280" src="../assets/Camada_1.png" style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));" />
          </a>
        </div>

        <div class="mb-6">
          <div class="d-flex flex-column align-center ga-4">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #88ce0d 0%, #6ba80a 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(136, 206, 13, 0.4);">
              <v-icon color="white" size="40">mdi-check-circle</v-icon>
            </div>
            <h2 class="text-center text-h4 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
              {{ $t('paymentSuccess.title') }}
            </h2>
            <p class="text-center text-body-1" style="color: #42A5F5; max-width: 400px; line-height: 1.6;">
              {{ $t('paymentSuccess.message') }}
            </p>
          </div>
        </div>

        <div class="d-flex justify-center w-100 mt-8">
          <VBtn class="text-white w-100" height="50px" color="#1E88E5" rounded="xl" elevation="4" @click="router.push('/')"
            style="font-weight: 600; text-transform: none; letter-spacing: 0; max-width: 400px;">
            {{ $t('paymentSuccess.goToHome') }}
            <v-icon end>mdi-home</v-icon>
          </VBtn>
        </div>
      </div>
    </VCol>

    <!-- DIV DA DIREITA -->
    <VCol class="pa-0 ma-0 hidden-sm-and-down" md="8">
      <v-img src="../assets/Login/login-banner.jpg" cover height="100vh" width="100%">
        <div style="position: absolute; width: 400px; height: 400px; border-radius: 50%; background: linear-gradient(135deg, rgba(0, 198, 254, 0.8), rgba(0, 153, 204, 0.6)); top: -150px; right: -150px; filter: blur(1px);"></div>
        <div style="position: absolute; width: 250px; height: 250px; border-radius: 50%; background: linear-gradient(135deg, rgba(136, 206, 13, 0.7), rgba(0, 198, 254, 0.5)); bottom: -50px; left: -80px; filter: blur(1px);"></div>
        <div style="position: absolute; width: 150px; height: 150px; border-radius: 50%; background: rgba(255, 255, 255, 0.2); top: 20%; right: 20%; filter: blur(0.5px);"></div>
        <div class="w-100 h-100 pa-0 ma-0 flex-column justify-center align-center d-flex" style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 198, 254, 0.4)); position: relative; z-index: 1;">
          <div class="mb-10">
            <a href="https://fitcertify365.com/" target="_blank" class="d-flex justify-center align-center"
              style="transition: transform 0.3s ease;" @mouseenter="($event.currentTarget as HTMLElement).style.transform = 'scale(1.05)'" @mouseleave="($event.currentTarget as HTMLElement).style.transform = 'scale(1)'">
              <v-img alt="Logo" class="mx-5 mx-lg-16" cover width="280" src="../assets/Login/logo-fit.png" style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));" />
            </a>
          </div>

          <div class="pa-0 ma-0 d-flex text-center flex-column align-center">
            <h1 class="mx-5 mx-lg-15 text-white text-h5 text-center text-md-h4 font-weight-bold" style="
                font-family: DM Sans, sans-serif;
                text-shadow: 0 2px 8px rgba(0,0,0,0.15);
                letter-spacing: -0.5px;
              ">
              {{ $t('paymentSuccess.welcomeTitle') }}
            </h1>
            <p class="mx-5 mx-lg-15 text-white text-center text-body-1 text-md-h6 font-weight-regular mt-5 mb-10"
              style="
                font-family: DM Sans, sans-serif;
                line-height: 1.6;
                opacity: 0.95;
              ">
              {{ $t('paymentSuccess.welcomeMessage') }}
            </p>
          </div>
        </div>
      </v-img>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t: $t } = useI18n();
</script>

<style scoped>
label,
h1,
h2,
p {
  font-family: 'DM Sans', sans-serif;
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
