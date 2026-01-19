<template>
  <VRow class="h-100 d-flex flex-column flex-md-row ma-0 pa-0 overflow-hidden fill-height" no-gutters>
    <!-- DIV DA ESQUERDA -->
    <VCol class="h-100 d-flex align-center pa-0 ma-0" :md="4" :cols="12" style="background: #f8f9fa;">
      <div class="d-flex flex-column h-100 w-100 justify-center px-4 px-md-8 position-relative">
        <div class="position-absolute" style="top: 16px; right: 16px;">
          <v-menu offset-y transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <v-btn icon variant="flat" v-bind="props">
                <img
                  :src="currentLocale === 'pt' ? 'https://flagcdn.com/w40/br.png' : 'https://flagcdn.com/w40/gb.png'"
                  :alt="currentLocale === 'pt' ? 'Português' : 'English'"
                  style="width: 32px; height: 24px; object-fit: cover; border-radius: 4px;"
                />
              </v-btn>
            </template>
            <v-list elevation="8">
              <v-list-item @click="changeLocale('pt')">
                <template v-slot:prepend>
                  <img src="https://flagcdn.com/w40/br.png" alt="Brasil" style="width: 32px; height: 24px; object-fit: cover; border-radius: 2px;" class="mr-2" />
                </template>
                <v-list-item-title>Português</v-list-item-title>
              </v-list-item>
              <v-list-item @click="changeLocale('en')">
                <template v-slot:prepend>
                  <img src="https://flagcdn.com/w40/gb.png" alt="England" style="width: 32px; height: 24px; object-fit: cover; border-radius: 2px;" class="mr-2" />
                </template>
                <v-list-item-title>English</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="mb-8 d-flex d-md-none justify-center">
          <a href="https://fitcertify365.com/" target="_blank" style="transition: transform 0.3s ease;" @mouseenter="($event.currentTarget as HTMLElement).style.transform = 'scale(1.05)'" @mouseleave="($event.currentTarget as HTMLElement).style.transform = 'scale(1)'">
            <v-img alt="Logo" cover width="280" src="../assets/Camada_1.png" style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));" />
          </a>
        </div>

        <div class="mb-6 mt-10 mt-md-0">
          <div class="d-flex align-center ga-3 justify-center justify-md-start">
            <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
              <v-icon color="white" size="20">mdi-login</v-icon>
            </div>
            <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
              {{ $t('login.welcomeBack') }}
            </h2>
          </div>
        </div>

        <v-form class="w-100" @submit.prevent="handleSubmit" ref="formRef">
          <div class="my-2 py-0 font-weight-medium">
            <VTextField v-model="email" type="email" :label="$t('login.email') + '*'" :placeholder="$t('login.emailPlaceholder')"
              :rules="[value => !!value || $t('login.campoObrigatorio')]" variant="outlined" rounded="lg"
              bg-color="white" class="custom-field" />
          </div>

          <div class="my-2 py-0 font-weight-medium">
            <VTextField v-model="senha" :type="showPassword ? 'text' : 'password'" :label="$t('login.senha') + '*'"
              :rules="[value => !!value || $t('login.campoObrigatorio')]" variant="outlined" rounded="lg"
              bg-color="white" class="custom-field">
              <template #append-inner>
                <v-icon @click="showPassword = !showPassword" class="cursor-pointer" color="#1E88E5">
                  {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
              </template>
            </VTextField>
          </div>



          <div class="d-flex justify-space-between w-100 align-center my-4">
            <v-checkbox v-model="isMobile" :label="$t('login.manterLogin')" hide-details
              style="color: #2c3e50; font-family: DM Sans, sans-serif;" />
            <button type="button" @click="showModal = true"
              class="text-decoration-none" style="color: #1E88E5; background: none; border: none; cursor: pointer; font-family: DM Sans, sans-serif; font-weight: 500;">
              {{ $t('login.esqueciSenha') }}
            </button>
          </div>

          <div class="d-flex justify-center w-100 mt-6">
            <VBtn class="text-white w-100" height="50px" :loading="loading"
              color="#1E88E5"
              rounded="xl" elevation="4" type="submit"
              style="font-weight: 600; text-transform: none; letter-spacing: 0; max-width: 400px;">
              {{ $t('login.button') }}
              <v-icon end>mdi-arrow-right</v-icon>
            </VBtn>
          </div>
        </v-form>

        <div class="d-flex justify-center align-center mt-8" style="font-family: DM Sans, sans-serif;">
          <span style="color: #42A5F5;">{{ $t('login.text') }}</span>
          <button @click="router.push('/register')"
            class="ml-2 text-decoration-none font-weight-bold"
            style="color: #1E88E5; background: none; border: none; cursor: pointer; font-family: DM Sans, sans-serif;">
            {{ $t('login.link') }}
          </button>
        </div>
      </div>
    </VCol>

    <!-- DIV DA DIREITA -->
    <VCol class="pa-0 ma-0 hidden-sm-and-down" md="8">
      <v-img src="../assets/Login/login-banner.jpg" cover height="100vh" width="100%">
        <div style="position: absolute; width: 400px; height: 400px; border-radius: 50%; background: linear-gradient(135deg, rgba(0, 198, 254, 0.8), rgba(0, 153, 204, 0.6)); top: -150px; right: -150px; filter: blur(1px);">
        </div>
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
              {{ $t('login.bannerTitle') }}
            </h1>
            <p class="mx-5 mx-lg-15 text-white text-center text-body-1 text-md-h6 font-weight-regular mt-5 mb-10"
              style="
                font-family: DM Sans, sans-serif;
                line-height: 1.6;
                opacity: 0.95;
              ">
              {{ $t('login.bannerSubtitle') }}
            </p>
          </div>
        </div>
      </v-img>
    </VCol>
  </VRow>

  <!-- Modal de recuperação de senha -->
  <v-dialog v-model="showModal" width="600">
    <v-card rounded="xl" style="font-family: DM Sans, sans-serif;">
      <div class="d-flex justify-end pa-2">
        <v-btn variant="text" icon @click="showModal = false">
          <v-icon color="#1E88E5">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-card-title class="d-flex flex-column justify-center align-center ga-5 mt-2 px-5 px-md-10">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
          <v-icon color="white" size="24">mdi-lock-reset</v-icon>
        </div>
        <span class="text-h6 text-md-h5 font-weight-bold" style="color: #2c3e50;">{{ $t('login.forgotPassword.title') }}</span>
      </v-card-title>
      <v-card-subtitle class="text-center text-subtitle-2 text-md-subtitle-1 px-5 px-md-10"
        style="white-space: normal; word-wrap: break-word; color: #42A5F5; line-height: 1.6;">
        {{ $t('login.forgotPassword.subtitle') }}
      </v-card-subtitle>
      <v-card-text class="px-5 px-md-10 mt-2 mt-md-5">
        <VTextField v-model="emailModal" type="email" :label="$t('login.email')" :placeholder="$t('login.emailPlaceholder')"
          @blur="() => onBlurEmailModal(emailModal)" :loading="loadingEmailModal"
          variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
      </v-card-text>
      <v-card-actions class="d-flex w-100 flex-column ga-5 px-5 px-md-10 mb-5">
        <v-btn class="w-100 text-white" height="50px" color="#1E88E5"
          :loading="loadingEmailModal" @click="enviarCodigo" rounded="xl" elevation="4"
          :disabled="loadingEmailModal || !validarEmail(emailModal) || !clicouEnviar"
          style="font-weight: 600; text-transform: none; letter-spacing: 0; background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);">
          {{ $t('login.forgotPassword.button') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import authService from '@/services/auth/auth-service';
import userService from '@/services/user/user-service';
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import type { VForm } from 'vuetify/components';
import { getErrorMessage } from '@/common/error.utils';
import { useI18n } from 'vue-i18n';

const { t: $t, locale } = useI18n();
const currentLocale = ref(locale.value)

const showPassword = ref(false)
const email = ref('');
const senha = ref('');
const isMobile = ref(false)

const emailModal = ref('');
const loadingEmailModal = ref(false);

const formRef = ref<VForm | null>(null)
const router = useRouter()
const route = useRoute()
const loading = ref(false)

const showModal = ref(false)
const clicouEnviar = ref(false)
const showTipoContaModal = ref(false)
const tipoContaSelecionado = ref('')
let debounceTimer: number

const changeLocale = (lang: string) => {
  locale.value = lang
  currentLocale.value = lang
  localStorage.setItem('locale', lang)
}

onMounted(() => {
  if (route.query['tipo-cadastro'] !== undefined) {
    showTipoContaModal.value = true
  }
  const savedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (savedToken) {
    router.push('/');
  }
})

watch(emailModal, (newEmail) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    if (newEmail.endsWith('.com')) {
      onBlurEmailModal(newEmail)
    }
  }, 500)
})

const getRoles = (nome: string) => {
  const map: Record<string,string> = {
    'Atleta': 'atleta',
    'Médico': 'medico',
    'Treinador': 'treinador',
    'Fisioterapeuta': 'fisioterapeuta'
  }
  return map[nome] || nome
}

async function handleSubmit() {
  if (!formRef.value) return;

  const { valid } = await formRef.value.validate();

  if (!valid) {
    toast.error($t('login.toastError1'), { autoClose: 3000 });
    return;
  }

  try {
    loading.value = true;

    const data = {
      email: email.value,
      senha: senha.value,
      isMobile: isMobile.value,
    };

    const response = await authService.login(data);
    if (response.success && response.data?.perfis) {
      const perfis = response.data.perfis.map((perfil: any) => ({
        ...perfil,
        nomeOriginal: perfil.nome
      }));
      
      // Salvar dados temporários no sessionStorage
      sessionStorage.setItem('perfis', JSON.stringify(perfis));
      sessionStorage.setItem('loginEmail', email.value);
      sessionStorage.setItem('loginIsMobile', String(isMobile.value));
      
      // Redirecionar para página de seleção de perfil
      router.push('/select-profile');
    } else {
      toast.error($t('login.toastError2'));
    }
  } catch (err: any) {
    toast.error($t('login.toastError3'));
  } finally {
    loading.value = false;
  }
}

async function onBlurEmailModal(email: string) {
  if (!email) return;
  clicouEnviar.value = true

  loadingEmailModal.value = true;
  try {
    const response = await userService.validarExisteEmail(email);
    const data = response?.data;

    if (!data?.existeEmail) {
      toast.error($t('login.forgotPassword.toastEmailError1'));
    } else {
      toast.success($t('login.forgotPassword.toastEmailSuccess1'));
    }
  } catch (error) {
    toast.error($t('login.forgotPassword.toastEmailError1_2') + ' ' + getErrorMessage(error, $t('login.forgotPassword.toastEmailError2_2')));
  } finally {
    loadingEmailModal.value = false;
    loading.value = false;
  }
}

function validarEmail(email: string) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}

async function enviarCodigo() {
  try {
    await authService.enviarCodigo(emailModal.value).then((resp) => {
      toast.success($t('login.forgotPassword.toastSuccessCode'));
    })

  } catch (error) {
    toast.error($t('login.forgotPassword.toastErrorCode1_2') + ' ' + getErrorMessage(error, $t('login.forgotPassword.toastErrorCode2_2')));
  }
}

function selecionarTipoConta(tipo: string) {
  tipoContaSelecionado.value = tipo
}

function confirmarTipoConta() {
  if (tipoContaSelecionado.value === 'atleta') {
    showTipoContaModal.value = false
    router.push('/register')
  } else if (tipoContaSelecionado.value === 'medico') {
    showTipoContaModal.value = false
    router.push('/register-medico')
  }
}

</script>

<style scoped>
label,
h1,
h2,
p {
  font-family: 'DM Sans', sans-serif;
}

:deep(.custom-field .v-field) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

:deep(.custom-field .v-field--focused) {
  border-color: #1E88E5;
  box-shadow: 0 4px 12px rgba(0, 198, 254, 0.2);
}

:deep(.custom-field .v-field--error) {
  border-color: #ff5252;
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

:deep(.v-checkbox .v-selection-control__input) {
  color: #1E88E5;
}

:deep(.v-checkbox .v-label) {
  color: #2c3e50 !important;
  font-family: 'DM Sans', sans-serif;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
