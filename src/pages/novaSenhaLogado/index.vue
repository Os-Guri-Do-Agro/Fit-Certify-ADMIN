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
                {{ $t('novaSenhaLogado.changePassword') }}
              </v-chip>
            </div>
            <div class="text-center">
              <v-avatar size="120" class="profile-avatar mb-4">
                <v-icon size="60" color="white">mdi-lock-reset</v-icon>
              </v-avatar>
              <p class="hero-subtitle">{{ $t('novaSenhaLogado.keepAccountSecure') }}</p>
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
              {{ $t('novaSenhaLogado.setNewPassword') }}
            </v-card-title>

            <v-card-text class="pa-6">
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="formData.senha"
                  :label="$t('novaSenhaLogado.currentPassword')"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  prepend-inner-icon="mdi-lock"
                  color="#42A5F5"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  :append-inner-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showCurrentPassword = !showCurrentPassword"
                  :rules="[rules.required]"
                  class="mb-4"
                />

                <v-text-field
                  v-model="formData.novaSenha"
                  :label="$t('novaSenhaLogado.newPassword')"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  prepend-inner-icon="mdi-lock-plus"
                  color="#42A5F5"
                  :type="showNewPassword ? 'text' : 'password'"
                  :append-inner-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showNewPassword = !showNewPassword"
                  :rules="[rules.required, rules.strongPassword]"
                  class="mb-4"
                />

                <v-text-field
                  v-model="formData.confirmarSenha"
                  :label="$t('novaSenhaLogado.confirmNewPassword')"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  prepend-inner-icon="mdi-lock-check"
                  color="#42A5F5"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showConfirmPassword = !showConfirmPassword"
                  :rules="[rules.required, rules.passwordMatch]"
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
                  {{ $t('novaSenhaLogado.cancel') }}
                </v-btn>
                <v-btn
                  color="#42A5F5"
                  rounded="xl"
                  size="large"
                  class="px-8 save-btn text-white"
                  @click="alterarSenha"
                  :loading="loading"
                  elevation="4"
                >
                  <v-icon left>mdi-check</v-icon>
                  {{ $t('novaSenhaLogado.changePasswordButton') }}
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import authService from '@/services/auth/auth-service'
import { getPayload, isTokenValid, logout } from '@/utils/auth'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { getErrorMessage } from '@/common/error.utils'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const valid = ref(false)
const loading = ref(false)



const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)



const formData = ref({
    senha: '',
    novaSenha: '',
    confirmarSenha: ''
})

async function alterarSenha() {
    loading.value = true

    try {
        const payload = {
        senhaAtual: formData.value.senha,
        senhaNova: formData.value.novaSenha,
    }
         await authService.forgotPassWordLogado(payload)
         toast.success(t('novaSenhaLogado.passwordChangedSuccess'))

         setTimeout(() => {
             router.push('/settings')
        }, 1500)

    } catch (error) {
        console.error('Erro ao alterar senha:', error)
        toast.error(t('novaSenhaLogado.passwordChangeError', { error: getErrorMessage(error, t('novaSenhaLogado.unknownError')) }))
    } finally {
        loading.value = false
    }
}

function voltar() {
    router.push('/settings')
}

const rules = {
  required: (value: any) => !!value || t('novaSenhaLogado.required'),
  strongPassword: (value: string) => {
    if (!value) return t('novaSenhaLogado.required')
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{8,}$/
    return regex.test(value) || t('novaSenhaLogado.strongPasswordError')
  },
  passwordMatch: (value: string) => {
    return !value || value === formData.value.novaSenha || t('novaSenhaLogado.passwordsNotMatch')
  }
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
