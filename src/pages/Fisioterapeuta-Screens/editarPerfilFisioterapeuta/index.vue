<template>
  <div class="pa-0" fluid>
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="position-relative">
        <v-row align="center" class="min-height-300 d-flex flex-md-column-reverse">
          <v-col cols="12" class="text-center">
            <div class="profile-avatar-container">
              <v-avatar size="190" class="profile-avatar">
                <v-img
                  v-if="displayAvatar"
                  :src="displayAvatar"
                  alt="Foto do perfil"
                />
                <v-icon v-else size="70" color="white">mdi-account</v-icon>
              </v-avatar>
              <v-btn
                icon
                size="small"
                color="white"
                class="avatar-edit-btn"
                @click="fileInput?.click()"
              >
                <v-icon>mdi-camera</v-icon>
              </v-btn>
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="handleFileUpload"
              />
            </div>
            <h1 class="profile-name">{{ formData.nome }}</h1>
          </v-col>

          <v-col cols="12">
            <div class="profile-info">
              <div class="info-chips d-flex ga-3 flex-column flex-md-row justify-space-between ma-5">
                <v-chip class="info-chip text-center d-flex justify-center" prepend-icon="mdi-account-edit">
                  Editar Perfil
                </v-chip>
                <v-chip class="info-chip text-center d-flex justify-center" prepend-icon="mdi-identifier">
                  ID: {{ getUserID() }}
                </v-chip>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="content-section">
      <v-row justify="center">
        <v-col cols="12" lg="8">
          <v-skeleton-loader
            v-if="loadingData"
            type="card"
            class="mb-6"
          />

          <v-form v-else ref="form" v-model="valid">
            <v-card class="mb-6" elevation="4" rounded="xl">
              <v-card-title class="section-title">
                <v-icon class="mr-3" color="#00c6fe">mdi-account-circle</v-icon>
                Informações Pessoais
              </v-card-title>
              <v-card-text class="pa-6">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.nome"
                      label="Nome Completo"
                      variant="outlined"
                      density="comfortable"
                      rounded="lg"
                      prepend-inner-icon="mdi-account"
                      color="#00c6fe"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.email"
                      label="E-mail"
                      disabled
                      variant="outlined"
                      density="comfortable"
                      rounded="lg"
                      prepend-inner-icon="mdi-email"
                      color="#00c6fe"
                      :rules="[rules.required, rules.email, rules.emailExists]"
                      :loading="emailValidation.loading"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.telefone"
                      label="Telefone"
                      v-maska="'(##) #####-####'"
                      maxlength="15"
                      variant="outlined"
                      density="comfortable"
                      rounded="lg"
                      prepend-inner-icon="mdi-phone"
                      color="#00c6fe"
                      :rules="[rules.phone]"
                      @input="formatPhone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.dataNascimento"
                      label="Data de Nascimento"
                      variant="outlined"
                      density="comfortable"
                      rounded="lg"
                      prepend-inner-icon="mdi-calendar"
                      color="#00c6fe"
                      type="date"
                      :rules="[rules.birthDate]"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-divider class="my-4"></v-divider>

                <v-row>
                  <v-col cols="12" md="6">
                    <div class="d-flex align-center justify-space-between mb-3">
                      <div class="d-flex align-center">
                        <v-icon color="#00c6fe" class="mr-2">mdi-ticket-percent</v-icon>
                        <span class="text-h6">Código de Convite</span>
                      </div>
                      <v-btn
                        color="#00c6fe"
                        variant="tonal"
                        rounded="lg"
                        size="small"
                        prepend-icon="mdi-refresh"
                        @click="gerarCodigoConvite()"
                        :loading="loadingCodigo"
                      >
                        Gerar Código
                      </v-btn>
                    </div>
                    <v-text-field
                      :model-value="codigoConvite"
                      label="Seu código de convite"
                      variant="outlined"
                      density="comfortable"
                      rounded="lg"
                      prepend-inner-icon="mdi-qrcode"
                      color="#00c6fe"
                      readonly
                    >
                      <template v-slot:append-inner>
                        <v-btn
                          icon="mdi-content-copy"
                          variant="text"
                          size="small"
                          color="#00c6fe"
                          @click="copiarCodigo"
                        ></v-btn>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="d-flex align-center mb-3">
                      <v-icon color="#00c6fe" class="mr-2">mdi-ticket-account</v-icon>
                      <span class="text-h6">Inserir Código</span>
                    </div>
                    <v-text-field
                      v-model="codigoInserir"
                      label="Digite o código de convite"
                      variant="outlined"
                      density="comfortable"
                      rounded="lg"
                      prepend-inner-icon="mdi-keyboard"
                      color="#00c6fe"
                      placeholder="Ex: FIT2024ABC123"
                    >
                      <template v-slot:append-inner>
                        <v-btn
                          icon="mdi-check"
                          variant="text"
                          size="small"
                          color="#00c6fe"
                        ></v-btn>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- <v-card class="mb-6" elevation="4" rounded="xl">
              <v-card-title class="section-title">
                <v-icon class="mr-3" color="#00c6fe">mdi-lock</v-icon>
                Alterar Senha
              </v-card-title>
              <v-card-text class="pa-6">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.senhaAtual"
                      label="Senha Atual"
                      variant="outlined"
                      density="comfortable"
                      rounded="lg"
                      prepend-inner-icon="mdi-lock"
                      color="#00c6fe"
                      :type="showPassword ? 'text' : 'password'"
                      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append-inner="showPassword = !showPassword"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.novaSenha"
                      label="Nova Senha"
                      variant="outlined"
                      density="comfortable"
                      rounded="lg"
                      prepend-inner-icon="mdi-lock-plus"
                      color="#00c6fe"
                      :type="showNewPassword ? 'text' : 'password'"
                      :append-inner-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append-inner="showNewPassword = !showNewPassword"
                      :rules="formData.novaSenha ? [rules.minLength(6)] : []"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.confirmarSenha"
                      label="Confirmar Nova Senha"
                      variant="outlined"
                      density="comfortable"
                      rounded="lg"
                      prepend-inner-icon="mdi-lock-check"
                      color="#00c6fe"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append-inner="showConfirmPassword = !showConfirmPassword"
                      :rules="formData.confirmarSenha ? [rules.passwordMatch] : []"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card> -->

            <div class="text-center d-flex ga-4 flex-column-reverse flex-md-row justify-center">
              <v-btn
                variant="outlined"
                color="grey-darken-1"
                rounded="xl"
                size="large"
                class="px-8"
                @click="cancelar"
                :disabled="loading"
              >
                <v-icon left>mdi-close</v-icon>
                Cancelar
              </v-btn>
              <v-btn
                color="#00c6fe"
                rounded="xl"
                size="large"
                class="px-8 save-btn text-white"
                @click="atualizarDadosAtleta"
                :loading="loading"
                elevation="4"
              >
                <v-icon left>mdi-check</v-icon>
                Salvar Alterações
              </v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import fisioterapeutaService from '@/services/fisioterapeutas/fisioterapeuta-service'
import userService from '@/services/user/user-service'
import { getPayload, getUserID, isTokenValid, logout, getFisioterapeutaId } from '@/utils/auth'
import { removerOffsetTimezone } from '@/utils/date.utils'
import { vMaska } from 'maska/vue'
import { computed, onMounted, ref, watch } from 'vue'
import { toast } from 'vue3-toastify'

const codigoConvite = ref('')
const codigoInserir = ref('')
import { getErrorMessage } from '@/common/error.utils'

const payload = ref<any>()
const form = ref()
const fileInput = ref<HTMLInputElement>()
const valid = ref(false)
const loading = ref(false)
const loadingCodigo = ref(false)
const loadingData = ref(true)
const user = ref<any>({ fisioterapeuta: { telefone: '' } })
const emailValidation = ref({ loading: false, exists: false, checked: false })
const originalEmail = ref('')

let debounceTimer: number


const gerarCodigoConvite = async () => {
  loadingCodigo.value = true
  if (codigoConvite.value) {
    toast.info('Você já possui um código de convite gerado')
    loadingCodigo.value = false
    return
  }
  try {
    const response = await fisioterapeutaService.gerarCodigoConvite()
    codigoConvite.value = response.data.codigoConvite
    toast.success('Código gerado com sucesso!')
  } catch (error) {
    console.error('Erro ao gerar código de convite:', error)
    toast.error('Erro ao gerar código de convite')
  } finally {
    loadingCodigo.value = false
  }
}

const copiarCodigo = async () => {
  if (!codigoConvite.value) return
  try {
    await navigator.clipboard.writeText(codigoConvite.value)
    toast.success('Código copiado!')
  } catch (err) {
    toast.error('Erro ao copiar código: ' + getErrorMessage(err, 'Erro desconhecido'))
  }
}

const rules = {
  required: (value: any) => !!value || 'Campo obrigatório',
  email: (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'E-mail inválido'
  },
  emailExists: (value: string) => {
    if (!emailValidation.value.checked) return true
    if (emailValidation.value.exists) {
      return 'Este email já está em uso'
    }
    return true
  },
  phone: (value: string) => {
    if (!value) return 'Campo obrigatório'
    const digits = value.replace(/\D/g, '')
    return digits.length === 11 || 'Telefone deve ter 11 dígitos'
  },
  birthDate: (value: string) => {
    if (!value) return 'Campo obrigatório'
    const selectedYear = new Date(value).getFullYear()
    const currentYear = new Date().getFullYear()
    return selectedYear <= currentYear || 'Data não pode ser no futuro'
  },
  minLength: (min: number) => (value: string) =>
    !value || value.length >= min || `Mínimo ${min} caracteres`,
  // passwordMatch: (value: string) =>
  //   !value || value === formData.value.novaSenha || 'Senhas não coincidem'
}

const formatPhone = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')

  if (value.length <= 11) {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  formData.value.telefone = value
}

const avatarUrl = ref('')

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    formData.value.avatar = file
    avatarUrl.value = URL.createObjectURL(file)
  }
}

const displayAvatar = computed(() => {
  if (avatarUrl.value) return avatarUrl.value
  if (typeof formData.value.avatar === 'string') return formData.value.avatar
  return ''
})

const formData = ref({
  email: '',
  nome: '',
  telefone: '',
  dataNascimento: '',
  avatar: '' as string | File,
})

watch(() => formData.value.email, (newEmail) => {
  if (newEmail === originalEmail.value) {
    emailValidation.value = { loading: false, exists: false, checked: false }
    return
  }

  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    if (newEmail && newEmail.includes('@') && newEmail.includes('.')) {
      validateEmailExists(newEmail)
    }
  }, 800)
})

const validateEmailExists = async (email: string) => {
  if (!email || email === originalEmail.value) return

  emailValidation.value.loading = true
  emailValidation.value.checked = false

  try {
    const response = await userService.validarExisteEmail(email)

    emailValidation.value.exists = response?.data?.existeEmail || false
    emailValidation.value.checked = true

    if (form.value) {
      form.value.validate()
    }
  } catch (error) {
    console.error('Erro na validação:', error)
    emailValidation.value.exists = false
    emailValidation.value.checked = true
  } finally {
    emailValidation.value.loading = false
  }
}
const atualizarDadosAtleta = async () => {
  if (emailValidation.value.loading) {
    toast.error('Aguarde a validação do email')
    return
  }

  if (emailValidation.value.exists) {
    toast.error('Corrija os erros no formulário antes de salvar')
    return
  }

  const { valid } = await form.value.validate()
  if (!valid) {
    toast.error('Preencha todos os campos obrigatórios corretamente')
    return
  }

  loading.value = true


  try {
    const payload = getPayload()
    const data = new FormData()

    data.append('email', formData.value.email.trim() || formData.value.email)
    data.append('nome', formData.value.nome || formData.value.nome)
    data.append('telefone', formData.value.telefone.trim() || payload.user.fisioterapeuta.telefone)

    const dataNascimento = formData.value.dataNascimento || payload.user.fisioterapeuta.dataNascimento
    const isoDate = dataNascimento ? removerOffsetTimezone(new Date(dataNascimento).toISOString()) : ''
    data.append('dataNascimento', isoDate)



    if (formData.value.avatar instanceof File) {
      data.append('avatar', formData.value.avatar)
    }

    const id = getFisioterapeutaId()

    const response = await fisioterapeutaService.updateFisioterapeuta(id, data)

    toast.success('Dados atualizados com sucesso!')

    if (response.data.success) {
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }

    }

  } catch (error) {
    toast.error('Erro ao atualizar dados: ' + getErrorMessage(error, 'Erro desconhecido'), { position: 'top-right' })
    console.error(error)
  } finally {
    loading.value = false
  }
}


const cancelar = () => {
  window.history.back()
}
const carregarDados = async () => {
  try {
    const userData = payload.value?.user
    if (getFisioterapeutaId()) {
      const id = getFisioterapeutaId()
      const response = await fisioterapeutaService.getFisioterapeutaById(id)
      const atletaData = response.data

      user.value = atletaData
      originalEmail.value = atletaData.usuario?.email || ''
      formData.value.nome = atletaData.usuario?.nome || ''
      formData.value.email = atletaData.usuario?.email || ''
      formData.value.telefone = atletaData.telefone || ''
      formData.value.avatar = atletaData.usuario?.avatarUrl || ''
      codigoConvite.value = atletaData.codigoConvite || ''
      if (atletaData.dataNascimento) {
        formData.value.dataNascimento = new Date(atletaData.dataNascimento).toISOString().split('T')[0]
      }
    }
  } catch (error) {
    console.error('Erro ao carregar dados do fisioterapeuta:', error)
    toast.error('Erro ao carregar dados do fisioterapeuta: ' + getErrorMessage(error, 'Erro desconhecido'))
  } finally {
    loadingData.value = false
  }
}

onMounted(async () => {
  if (!isTokenValid()) {
    logout()
    return
  }
  payload.value = getPayload()
  await carregarDados()
})

</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #2196F3 0%, #00c6fe 100%);
  position: relative;
  overflow: hidden;
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

.profile-avatar-container {
  position: relative;
  display: inline-block;
}

.profile-avatar {
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.avatar-edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #00c6fe !important;
}

.profile-name {
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: 16px;
  margin-bottom: 8px;
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

.section-title {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #dee2e6;
  font-weight: 600;
  font-size: 1.2rem;
  color: #495057;
}

.save-btn {
  background: linear-gradient(135deg, #2196F3 0%, #00c6fe 100%) !important;
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

@media (max-width: 960px) {
  .profile-info {
    margin-top: 24px;
    text-align: center;
  }

  .info-chips {
    justify-content: center;
  }
}
</style>
