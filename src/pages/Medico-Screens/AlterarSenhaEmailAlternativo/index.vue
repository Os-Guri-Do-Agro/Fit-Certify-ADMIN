<template>
  <v-container class="pa-0" fluid>
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <v-container class="position-relative">
        <v-row align="center" class="min-height-200">
          <v-col cols="12">
            <div class="d-flex align-center mb-4">
              <v-chip class="info-chip" prepend-icon="mdi-lock-reset">
                {{ $t('appBar.titleAlterarSenhaEmailAlt') }}
              </v-chip>
            </div>
            <div class="text-center">
              <v-avatar size="120" class="profile-avatar mb-4">
                <v-icon size="60" color="white">mdi-lock-reset</v-icon>
              </v-avatar>
              <p class="hero-subtitle">{{ $t('alterarSenhaEmailAlternativo.subtitle') }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Content Section -->
    <v-container class="content-section">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card elevation="8" rounded="xl" class="password-card">
            <v-card-title class="section-title">
              <v-icon class="mr-3" color="#42A5F5">mdi-shield-lock</v-icon>
              {{ $t('alterarSenhaEmailAlternativo.title') }}
            </v-card-title>

            <v-card-text class="pa-6">
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="formData.email"
                  :label="$t('alterarSenhaEmailAlternativo.email')"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  prepend-inner-icon="mdi-email"
                  color="#42A5F5"
                  type="email"
                  :rules="[rules.email]"
                  class="mb-4"
                />

                <v-text-field
                  v-model="formData.senhaAntiga"
                  :label="$t('alterarSenhaEmailAlternativo.currentPassword')"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  prepend-inner-icon="mdi-lock"
                  color="#42A5F5"
                  :type="showPasswordOld ? 'text' : 'password'"
                  :append-inner-icon="showPasswordOld ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPasswordOld = !showPasswordOld"
                  class="mb-4"
                />

                <v-text-field
                  v-model="formData.novaSenha"
                  :label="$t('alterarSenhaEmailAlternativo.newPassword')"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  prepend-inner-icon="mdi-lock-plus"
                  color="#42A5F5"
                  :type="showPasswordNew ? 'text' : 'password'"
                  :append-inner-icon="showPasswordNew ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPasswordNew = !showPasswordNew"
                  :rules="[rules.password]"
                  class="mb-4"
                />

                <v-text-field
                  v-model="formData.confirmarNovaSenha"
                  :label="$t('alterarSenhaEmailAlternativo.confirmNewPassword')"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  prepend-inner-icon="mdi-lock-check"
                  color="#42A5F5"
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  :append-inner-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPasswordConfirm = !showPasswordConfirm"
                  :rules="[rules.passwordMatch]"
                />
              </v-form>
            </v-card-text>

            <v-card-actions class="pa-6 pt-0">
              <div class="d-flex ga-4 flex-column-reverse flex-md-row justify-center w-100">
                <v-btn
                  variant="outlined"
                  color="grey-darken-1"
                  rounded="xl"
                  size="large"
                  class="px-8"
                  @click="voltar"
                  :disabled="loading"
                >
                  <v-icon left>mdi-close</v-icon>
                  {{ $t('alterarSenhaEmailAlternativo.cancel') }}
                </v-btn>
                <v-btn
                  color="#42A5F5"
                  rounded="xl"
                  size="large"
                  class="px-8 save-btn text-white"
                  @click="salvar"
                  :loading="loading"
                  elevation="4"
                >
                  <v-icon left>mdi-check</v-icon>
                  {{ $t('alterarSenhaEmailAlternativo.save') }}
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" lg="3">
          <v-card elevation="8" rounded="xl" class="info-card">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-icon color="#42A5F5" size="32">mdi-information-outline</v-icon>
                <h3 class="ml-3">{{ $t('alterarSenhaEmailAlternativo.info.title') }}</h3>
              </div>

              <v-alert
                type="info"
                variant="tonal"
                color="#42A5F5"
                rounded="lg"
                class="mb-4"
              >
                <div class="d-flex align-start">
                  <v-icon class="mr-2 mt-1">mdi-email-edit</v-icon>
                  <div>
                    <strong>{{ $t('alterarSenhaEmailAlternativo.info.emailTitle') }}</strong>
                    <p class="text-body-2 mt-1 mb-0">{{ $t('alterarSenhaEmailAlternativo.info.emailDescription') }}</p>
                  </div>
                </div>
              </v-alert>

              <v-alert
                type="warning"
                variant="tonal"
                color="orange"
                rounded="lg"
              >
                <div class="d-flex align-start">
                  <v-icon class="mr-2 mt-1">mdi-lock-alert</v-icon>
                  <div>
                    <strong>{{ $t('alterarSenhaEmailAlternativo.info.passwordTitle') }}</strong>
                    <p class="text-body-2 mt-1 mb-0">{{ $t('alterarSenhaEmailAlternativo.info.passwordDescription') }}</p>
                  </div>
                </div>
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import userService from '@/services/user/user-service'
import { getErrorMessage } from '@/common/error.utils'
import { getUserID, getToken } from '@/utils/auth'

const router = useRouter()
const { t } = useI18n()
const valid = ref(false)
const loading = ref(false)

const showPasswordOld = ref(false)
const showPasswordNew = ref(false)
const showPasswordConfirm = ref(false)

const formData = ref({
  email: '',
  senhaAntiga: '',
  novaSenha: '',
  confirmarNovaSenha: ''
})

const rules = {
  required: (v: string) => !!v || t('emailsAlternativos.validation.required'),
  email: (v: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return !v || pattern.test(v) || 'Email inválido'
  },
  password: (v: string) => {
    if (!v) return true
    if (v.length < 8) return 'A senha deve ter pelo menos 8 caracteres'
    if (!/[0-9]/.test(v)) return 'A senha deve conter pelo menos um número'
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(v)) return 'A senha deve conter pelo menos um caractere especial'
    return true
  },
  passwordMatch: (v: string) => !formData.value.novaSenha || v === formData.value.novaSenha || t('alterarSenhaEmailAlternativo.validation.passwordMatch')
}

const salvar = async () => {
  if (!valid.value) {
    toast.error('Por favor, corrija os erros no formulário')
    return
  }

  if (!formData.value.novaSenha && !formData.value.email) {
    toast.error('Preencha pelo menos a senha ou o email alternativo')
    return
  }

  if (formData.value.novaSenha && formData.value.novaSenha !== formData.value.confirmarNovaSenha) {
    toast.error(t('alterarSenhaEmailAlternativo.toasts.passwordMismatch'))
    return
  }

  if (formData.value.novaSenha && !formData.value.senhaAntiga) {
    toast.error(t('alterarSenhaEmailAlternativo.toasts.currentPasswordRequired'))
    return
  }

  loading.value = true
  try {
    const payload: any = {}
    if (formData.value.email) payload.email = formData.value.email
    if (formData.value.novaSenha) {
      payload.senhaAntiga = formData.value.senhaAntiga
      payload.senhaNova = formData.value.novaSenha
    }

    const response = await userService.mudarSenhaEmailAlternativo(payload)

    if (response?.data?.access_token) {
      const storage = localStorage.getItem('token') ? localStorage : sessionStorage
      storage.setItem('token', response.data.access_token)
    }

    toast.success(t('alterarSenhaEmailAlternativo.toasts.success'))

    setTimeout(() => {
      router.push('/settings')
    }, 1500)
  } catch (error) {
    toast.error(t('alterarSenhaEmailAlternativo.toasts.error') + getErrorMessage(error, t('alterarSenhaEmailAlternativo.toasts.unknownError')))
  } finally {
    loading.value = false
  }
}

function voltar() {
  router.push('/settings')
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
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

.min-height-200 {
  min-height: 200px;
}

.profile-avatar {
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.info-chip {
  background: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.content-section {
  background: #f8f9fa;
  padding-top: 48px;
  padding-bottom: 48px;
  margin-top: -24px;
}

.password-card {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.info-card {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: fit-content;
  position: sticky;
  top: 24px;
}

.section-title {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #dee2e6;
  font-weight: 600;
  font-size: 1.2rem;
  color: #495057;
}

.save-btn {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  box-shadow: 0 4px 20px rgba(0, 198, 254, 0.3) !important;
  transition: all 0.3s ease;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 198, 254, 0.4) !important;
}

.v-card {
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-2px);
}
</style>
