<template>
  <div class="success-container">
    <div class="content-wrapper">
      <div class="logo-section">
        <a href="https://fitcertify365.com/" target="_blank" class="logo-link">
          <v-img alt="FitCertify Logo" width="300" src="@/assets/Camada_1.png" class="logo-img" />
        </a>
      </div>

      <div class="success-card">
        <div class="icon-wrapper">
          <div class="success-icon-bg">
            <v-icon color="white" size="48" class="success-icon">mdi-check-circle</v-icon>
          </div>
        </div>

        <h1 class="success-title">
          Pagamento Confirmado!
        </h1>

        <div class="info-box">
          <span class="info-text text-center">Parabéns! Sua transação foi processada com sucesso e seu acesso já está liberado.</span>
        </div>
      </div>

      <div class="action-section">
        <VBtn
          class="return-btn text-white"
          height="56px"
          color="#88ce0d"
          rounded="lg"
          elevation="0"
          size="large"
          @click="voltarApp">
          <v-icon start size="24">mdi-arrow-left</v-icon>
          Voltar para o Aplicativo
        </VBtn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const voltarApp = () => {
  window.location.href = 'com.nicolascastela.fitcertify://login'
}
</script>

<style scoped>
* {
  font-family: 'DM Sans', sans-serif;
}

.success-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.content-wrapper {
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.logo-section {
  display: flex;
  justify-content: center;
  animation: fadeInDown 0.6s ease-out;
}

.logo-link {
  transition: transform 0.3s ease;
  display: inline-block;
}

.logo-link:hover {
  transform: scale(1.05);
}

.logo-img {
  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.1));
}

.success-card {
  background: white;
  border-radius: 24px;
  padding: 48px 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.icon-wrapper {
  margin-bottom: 8px;
}

.success-icon-bg {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(135deg, #88ce0d 0%, #6ba80a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(136, 206, 13, 0.35);
  animation: scaleIn 0.5s ease-out 0.4s both;
}

.success-icon {
  animation: checkmark 0.6s ease-out 0.6s both;
}

.success-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a202c;
  text-align: center;
  margin: 0;
  letter-spacing: -0.5px;
}

.success-message {
  font-size: 16px;
  color: #64748b;
  text-align: center;
  line-height: 1.6;
  margin: 0;
  max-width: 400px;
}

.info-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f0f9e8;
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid #d4edbc;
  width: 100%;
  max-width: 400px;
}

.info-text {
  font-size: 14px;
  color: #4a5568;
  font-weight: 500;
}

.action-section {
  display: flex;
  justify-content: center;
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

.return-btn {
  width: 100%;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.3px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.return-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(136, 206, 13, 0.3) !important;
}

.return-btn:active {
  transform: translateY(0);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes checkmark {
  0% {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(0deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

@media (max-width: 600px) {
  .success-card {
    padding: 40px 24px;
  }

  .success-title {
    font-size: 28px;
  }

  .success-message {
    font-size: 15px;
  }

  .logo-img {
    width: 240px;
  }
}
</style>
