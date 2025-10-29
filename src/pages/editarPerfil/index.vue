<template>
  <v-container class="pa-0" fluid>
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <v-container class="position-relative">
        <v-row align="center" class="min-height-300 d-flex flex-md-column-reverse">
          <v-col cols="12"  class="text-center">
            <div class="profile-avatar-container ">
              <v-avatar size="140" class="profile-avatar">
                <v-img
                  v-if="formData.avatarUrl"
                  :src="formData.avatarUrl"
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
              <div class="info-chips d-flex ga-3 flex-column flex-md-row justify-space-between">
                <v-chip class="info-chip text-center d-flex justify-center" prepend-icon="mdi-account-edit">
                  Editar Perfil
                </v-chip>
                <v-chip class="info-chip text-center d-flex justify-center" prepend-icon="mdi-identifier">
                  ID: {{ payload?.userId }}
                </v-chip>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-container class="content-section">
      <v-row justify="center">
        <v-col cols="12" lg="8">
          <v-form ref="form" v-model="valid">
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
                      variant="outlined"
                      density="comfortable"
                      rounded="lg"
                      prepend-inner-icon="mdi-email"
                      color="#00c6fe"
                      :rules="[rules.required, rules.email]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.telefone"
                      label="Telefone"
                      variant="outlined"
                      density="comfortable"
                      rounded="lg"
                      prepend-inner-icon="mdi-phone"
                      color="#00c6fe"
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
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="mb-6" elevation="4" rounded="xl">
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
            </v-card>

            <div class="text-center d-flex ga-4 flex-column flex-md-row justify-center">
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
                @click="atualizarDados"
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
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { getPayload, isTokenValid, logout } from '@/utils/auth'
import { ref, onMounted } from 'vue'
import userService from '@/services/user/user-service'

const payload = ref<any>()
const form = ref()
const fileInput = ref<HTMLInputElement>()
const valid = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const formData = ref({
  email: '',
  senha: '',
  nome: '',
  telefone: '',
  dataNascimento: '',
  avatarUrl: '',
  senhaAtual: '',
  novaSenha: '',
  confirmarSenha: ''
})

const rules = {
  required: (value: any) => !!value || 'Campo obrigatório',
  email: (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'E-mail inválido'
  },
  minLength: (min: number) => (value: string) =>
    !value || value.length >= min || `Mínimo ${min} caracteres`,
  passwordMatch: (value: string) =>
    !value || value === formData.value.novaSenha || 'Senhas não coincidem'
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

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.value.avatarUrl = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const atualizarDados = async () => {
  if (!form.value?.validate()) return
  
  loading.value = true
  try {
    const userId = payload.value?.userId
    if (!userId) {
      console.error('ID do usuário não encontrado')
      return
    }

    const updateData: any = {
      nome: formData.value.nome,
      email: formData.value.email,
      telefone: formData.value.telefone,
      dataNascimento: formData.value.dataNascimento
    }

    if (formData.value.novaSenha) {
      updateData.senhaAtual = formData.value.senhaAtual
      updateData.novaSenha = formData.value.novaSenha
    }

    await userService.editarUsuario(userId)
    console.log('Dados atualizados com sucesso!')
  } catch (error) {
    console.error('Erro ao atualizar dados:', error)
  } finally {
    loading.value = false
  }
}

const cancelar = () => {
  // Voltar para a tela anterior ou resetar formulário
  window.history.back()
}

const carregarDados = () => {
  const user = payload.value?.user
  if (user) {
    formData.value.nome = user.nome || ''
    formData.value.email = user.email || ''
    formData.value.telefone = user.telefone || ''
    formData.value.avatarUrl = user.avatarUrl || ''
    // Converter data se necessário
    if (user.dataNascimento) {
      formData.value.dataNascimento = new Date(user.dataNascimento).toISOString().split('T')[0]
    }
  }
}

onMounted(() => {
  if (!isTokenValid()) {
    logout()
    return
  }
  payload.value = getPayload()
  carregarDados()
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