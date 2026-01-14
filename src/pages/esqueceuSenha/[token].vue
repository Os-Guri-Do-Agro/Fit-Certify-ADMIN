<template>
  <v-container style="background-color: #42A5F5" fluid
    class=" pa-0 fill-height d-flex flex-column flex-md-row overflow-x-hidden">
    <v-row no-gutters class="h-100">

      <!-- Modal -->
      <v-dialog v-model="showModal" width="600" persistent>
        <v-card :loading="loading" :disabled="loading">
          <v-card-title class="d-flex flex-column justify-center align-center ga-5 mt-5 px-5 px-md-10">
            <span class="mdi mdi-email-fast-outline text-h1" style="color: #42A5F5;"></span>
            <span class="text-h6 text-md-h5 font-weight-bold">{{ $t('resetPassword.modal.title') }}</span>
          </v-card-title>
          <v-card-subtitle class="text-center text-subtitle-2 text-md-subtitle-1  px-md-10"
            style="white-space: normal; word-wrap: break-word;">
            <span>
              {{ $t('resetPassword.modal.subtitle') }} <span class="font-weight-medium"
                style="color: #42A5F5;">{{ usuario?.email }}</span>
            </span>
          </v-card-subtitle>
          <div class="my-5 px-5 px-md-10">
            <v-otp-input variant="solo-filled" v-model="codigo"></v-otp-input>
          </div>
          <v-card-actions class="d-flex w-100 flex-column-reverse ga-5 px-5 px-md-10 mb-5">
            <v-btn class="w-100 text-white" height="50px" @click="confirmar" style="background-color: #42A5F5;"
              :loading="loading">{{ $t('resetPassword.modal.confirmButton') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Coluna da esquerda -->
      <v-col md="4" class="d-flex flex-column justify-center px-10  px-lg-16 h-100 ">

        <!-- Logo -->
        <div class="mb-8 d-flex justify-center">
          <span class="mdi mdi-lock-reset text-h1 text-white"></span>
        </div>

        <!-- Formulário -->
        <p class="text-white text-center text-subtitle-1 text-md-h6 text-lg-h5 px-lg-10" style="margin-bottom: 1.5rem;">
          {{ $t('resetPassword.pageTitle') }}
        </p>

        <v-form class="d-flex align-center flex-column px-lg-0 px-xl-12 h-auto" :ref="formRef">
          <v-text-field v-model="novaSenha" :type="showPassword ? 'text' : 'password'" :placeholder="$t('resetPassword.newPassword')"
            variant="solo" bg-color="white" density="comfortable" class="mb-4 w-100"
            :rules="[rules.requiredSenhaObrigatoria]" style="border-radius: 5px; color: #1f2937;">
            <template #append-inner>
              <v-icon @click="showPassword = !showPassword" class="cursor-pointer">
                {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}
              </v-icon>
            </template>
          </v-text-field>

          <v-text-field v-model="confirmarSenha" :type="showPassword2 ? 'text' : 'password'"
            :placeholder="$t('resetPassword.confirmPassword')" variant="solo" bg-color="white" density="comfortable"
            :rules="[rules.requiredSenhaObrigatoria]" class="w-100" style="border-radius: 5px; color: #1f2937;">
            <template #append-inner>
              <v-icon @click="showPassword2 = !showPassword2" class="cursor-pointer">
                {{ showPassword2 ? 'mdi-eye' : 'mdi-eye-off' }}
              </v-icon>
            </template>
          </v-text-field>

          <VRow class="d-flex w-100 mt-5">
            <div class="d-flex flex-column align-center w-100" cols="12">
              <VBtn class="text-white" block height="47px" style="background-color: #88CE0D;" @click="redefinirSenha"
                :loading="loading">
                {{ $t('resetPassword.resetButton') }}
              </VBtn>
              <div class="d-flex flex-column flex-md-row align-center justify-center mt-10">
                <span class="text-white text-md-subtitle-2 text-lg-subtitle-1">{{ $t('resetPassword.rememberPassword') }}</span>
                <button @click="voltar"
                  class="font-weight-bold ml-2 text-subtitle-1 text-align-center text-white">{{ $t('resetPassword.backToLogin') }}</button>
              </div>
            </div>
          </VRow>
        </v-form>

      </v-col>

      <!-- Coluna da direita -->
      <v-col md="8" class="pa-0 hidden-sm-and-down">
        <v-img src="../../assets/Login/login-banner.jpg" cover height="100vh" width="100%" </v-img>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import authService from '@/services/auth/auth-service';
import { logout } from '@/utils/auth'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const showModal = ref(true)
const router = useRoute()
const route = useRouter()
const showPassword = ref(false)
const showPassword2 = ref(false)
const novaSenha = ref('')
const confirmarSenha = ref('')
const codigo = ref('')
const usuario = ref<any>(null)
const loading = ref(false)
const formRef = ref<any>(null)
const token = ref()

function voltar() {
  showModal.value = false
  logout()
  route.push('/login')
}

const rules = {
  requiredSenhaObrigatoria: (value: any) => {
    if (!value) return t('resetPassword.validation.passwordRequired')
    return (
      validarSenhaForte(value) ||
      t('resetPassword.validation.passwordStrength')
    )
  },
}

function validarSenhaForte(senha: string) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{8,}$/
  return regex.test(senha)
}

async function confirmar() {
  if (!codigo.value) {
    toast.success(t('resetPassword.toast.enterCode'))
    return;
  }

  loading.value = true

  await authService.validarCodigoEmail({ token: token.value, codigo: codigo.value })
    .then((resp) => {
      if (resp?.success) {
        toast.success(resp?.data)
        showModal.value = false
      } else {
        toast.error(resp?.message)
      }
    }).finally(() => loading.value = false)
}

async function redefinirSenha() {
  if (novaSenha.value != confirmarSenha.value) {
    toast.error(t('resetPassword.toast.passwordMismatch'))
    return;
  }
  loading.value = true

  await authService.forgotPassword({
    codigo: codigo.value,
    senhaNova: novaSenha.value,
    token: token.value
  }).then((resp) => {
    if (resp?.success) {
      route.push("/login").then(() => {
        toast.success(resp?.data)
      })
    } else {
      toast.error(resp?.message)
    }
  }).finally(() => loading.value = false)
}

async function validarToken(token: string) {
  loading.value = true
  await authService.validarToken(token).then((resp) => {
    if (resp?.success) {
      usuario.value = resp?.data?.usuario
    } else {
      route.push("/login").then(() => {
        toast.error(t('resetPassword.toast.invalidToken'))
      })
    }
  }).finally(() => loading.value = false)
}

onMounted(() => {
  token.value = 'token' in router.params ? router.params.token : undefined
  validarToken(token.value)
})

</script>
