<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card style="border-radius: 20px; box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);">
          <v-card-title class="pa-5" style="background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);">
            <v-row align="center" no-gutters>
              <v-col cols="12" md="6" class="d-flex align-center mb-4 mb-md-0">
                <v-icon color="white" size="24" class="mr-2">mdi-email-multiple</v-icon>
                <span class="text-h6 font-weight-bold text-white">{{ $t('emailsAlternativos.title') }}</span>
              </v-col>
              <v-col cols="12" md="6" class="d-flex justify-md-end">
                <v-btn color="white" variant="elevated" rounded="lg" @click="dialog = true">
                  <v-icon class="mr-2">mdi-plus</v-icon>
                  {{ $t('emailsAlternativos.addEmail') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text class="pa-5">
            <v-skeleton-loader v-if="loading" type="list-item-avatar-two-line@3" />

            <v-alert v-else-if="emails.length === 0" type="info" variant="tonal" class="text-center">
              <div class="text-body-1">{{ $t('emailsAlternativos.noEmails') }}</div>
            </v-alert>

            <v-list v-else class="email-list">
              <v-list-item v-for="email in emails" :key="email.id" class="email-item mb-2 rounded-lg">
                <template v-slot:prepend>
                  <v-avatar color="blue-lighten-4">
                    <v-icon color="blue-darken-1">mdi-email</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-bold text-grey-darken-3">{{ email.email }}</v-list-item-title>
                <template v-slot:append>
                  <div class="d-flex ga-2">
                  <v-btn icon="mdi-pen" color="success" variant="flat" size="small" rounded="lg" @click="abrirAlterarSenha(email)" />
                  <v-btn icon="mdi-delete" color="error" variant="flat" size="small" rounded="lg" @click="confirmarDelete(email.id)" />
                  </div>

                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500">
      <v-card rounded="xl">
        <v-card-title class="pa-5 bg-blue-lighten-1 text-white">
          <v-icon color="white" class="mr-2">mdi-email-plus</v-icon>
          {{ $t('emailsAlternativos.addEmail') }}
        </v-card-title>
        <v-card-text class="pa-5">
          <v-text-field
            v-model="formData.email"
            :label="$t('emailsAlternativos.email')"
            type="email"
            variant="outlined"
            prepend-inner-icon="mdi-email"
            :rules="[rules.required, rules.email]"
            :error-messages="emailErrors"
          />
          <v-text-field
            v-model="formData.senha"
            :label="$t('emailsAlternativos.password')"
            type="password"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            class="mt-3"
            :rules="[rules.required, rules.minLength]"
            :error-messages="senhaErrors"
          />
          <v-text-field
            v-model="formData.confirmarSenha"
            :label="$t('emailsAlternativos.confirmPassword')"
            type="password"
            variant="outlined"
            prepend-inner-icon="mdi-lock-check"
            class="mt-3"
            :rules="[rules.required, rules.match]"
            :error-messages="confirmarSenhaErrors"
          />
        </v-card-text>
        <v-card-actions class="pa-5">
          <v-spacer />
          <v-btn variant="outlined" @click="dialog = false">{{ $t('emailsAlternativos.cancel') }}</v-btn>
          <v-btn color="blue-lighten-1" variant="elevated" :loading="creating" @click="criarEmail">{{ $t('emailsAlternativos.add') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="senhaDialog" max-width="500">
      <v-card rounded="xl">
        <v-card-title class="pa-5 bg-blue-lighten-1 text-white">
          <v-icon color="white" class="mr-2">mdi-lock-reset</v-icon>
          {{ $t('alterarSenhaEmailAlternativo.title') }}
        </v-card-title>
        <v-card-text class="pa-5">
          <v-form ref="senhaForm" v-model="senhaValid">
            <v-text-field
              v-model="senhaData.email"
              :label="$t('alterarSenhaEmailAlternativo.email')"
              variant="outlined"
              prepend-inner-icon="mdi-email"
              type="email"
              readonly
              class="mb-3"
            />
            <v-text-field
              v-model="senhaData.senhaAntiga"
              :label="$t('alterarSenhaEmailAlternativo.currentPassword')"
              variant="outlined"
              prepend-inner-icon="mdi-lock"
              :type="showPasswordOld ? 'text' : 'password'"
              :append-inner-icon="showPasswordOld ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPasswordOld = !showPasswordOld"
              class="mb-3"
            />
            <v-text-field
              v-model="senhaData.novaSenha"
              :label="$t('alterarSenhaEmailAlternativo.newPassword')"
              variant="outlined"
              prepend-inner-icon="mdi-lock-plus"
              :type="showPasswordNew ? 'text' : 'password'"
              :append-inner-icon="showPasswordNew ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPasswordNew = !showPasswordNew"
              :rules="[senhaRules.password]"
              class="mb-3"
            />
            <v-text-field
              v-model="senhaData.confirmarNovaSenha"
              :label="$t('alterarSenhaEmailAlternativo.confirmNewPassword')"
              variant="outlined"
              prepend-inner-icon="mdi-lock-check"
              :type="showPasswordConfirm ? 'text' : 'password'"
              :append-inner-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPasswordConfirm = !showPasswordConfirm"
              :rules="[senhaRules.passwordMatch]"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-5">
          <v-spacer />
          <v-btn variant="outlined" @click="senhaDialog = false" :disabled="savingSenha">{{ $t('alterarSenhaEmailAlternativo.cancel') }}</v-btn>
          <v-btn color="blue-lighten-1" variant="elevated" :loading="savingSenha" @click="salvarSenha">{{ $t('alterarSenhaEmailAlternativo.save') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card class="text-center justify-center align-center pa-6" rounded="xl">
        <v-icon icon="mdi-alert-circle" size="64" color="error" class="mb-4" />
        <h2 class="text-h5 font-weight-bold mb-2">{{ $t('emailsAlternativos.deleteTitle') }}</h2>
        <p class="text-body-1 text-grey-600 mb-4">{{ $t('emailsAlternativos.deleteMessage') }}</p>
        <div class="d-flex ga-3 justify-space-between">
          <v-btn variant="outlined" @click="deleteDialog = false" :disabled="deleting">{{ $t('emailsAlternativos.cancel') }}</v-btn>
          <v-btn color="error" @click="apagarEmail" :loading="deleting">{{ $t('emailsAlternativos.delete') }}</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import userService from '@/services/user/user-service';
import { getMedicoId, getUserID } from '@/utils/auth';

const { t } = useI18n()

const emails = ref([])
const loading = ref(false)
const creating = ref(false)
const deleting = ref(false)
const dialog = ref(false)
const deleteDialog = ref(false)
const emailToDelete = ref(null)
const senhaDialog = ref(false)
const savingSenha = ref(false)
const senhaValid = ref(false)
const showPasswordOld = ref(false)
const showPasswordNew = ref(false)
const showPasswordConfirm = ref(false)

const senhaData = ref({
  id: '',
  email: '',
  senhaAntiga: '',
  novaSenha: '',
  confirmarNovaSenha: ''
})

const senhaRules = {
  password: (v) => {
    if (!v) return true
    if (v.length < 8) return 'A senha deve ter pelo menos 8 caracteres'
    if (!/[0-9]/.test(v)) return 'A senha deve conter pelo menos um número'
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(v)) return 'A senha deve conter pelo menos um caractere especial'
    return true
  },
  passwordMatch: (v) => !senhaData.value.novaSenha || v === senhaData.value.novaSenha || t('alterarSenhaEmailAlternativo.validation.passwordMatch')
}

const formData = ref({
  email: '',
  senha: '',
  confirmarSenha: ''
})

const emailErrors = ref([])
const senhaErrors = ref([])
const confirmarSenhaErrors = ref([])

const rules = {
  required: (v) => !!v || t('emailsAlternativos.validation.required'),
  email: (v) => /.+@.+\..+/.test(v) || t('emailsAlternativos.validation.invalidEmail'),
  minLength: (v) => (v && v.length >= 8) || t('emailsAlternativos.validation.minLength'),
  match: (v) => v === formData.value.senha || t('emailsAlternativos.validation.passwordsNotMatch')
}

const validarFormulario = () => {
  emailErrors.value = []
  senhaErrors.value = []
  confirmarSenhaErrors.value = []

  let valido = true

  if (!formData.value.email) {
    emailErrors.value.push(t('emailsAlternativos.validation.required'))
    valido = false
  } else if (!/.+@.+\..+/.test(formData.value.email)) {
    emailErrors.value.push(t('emailsAlternativos.validation.invalidEmail'))
    valido = false
  }

  if (!formData.value.senha) {
    senhaErrors.value.push(t('emailsAlternativos.validation.required'))
    valido = false
  } else if (formData.value.senha.length < 6) {
    senhaErrors.value.push(t('emailsAlternativos.validation.minLength'))
    valido = false
  }

  if (!formData.value.confirmarSenha) {
    confirmarSenhaErrors.value.push(t('emailsAlternativos.validation.required'))
    valido = false
  } else if (formData.value.confirmarSenha !== formData.value.senha) {
    confirmarSenhaErrors.value.push(t('emailsAlternativos.validation.passwordsNotMatch'))
    valido = false
  }

  return valido
}

const buscarEmails = async () => {
  loading.value = true
  try {
    const response = await userService.getEmailsAlternativos()
    emails.value = response.data
  } catch (error) {
    toast.error(t('emailsAlternativos.toasts.loadError'))
  } finally {
    loading.value = false
  }
}

const criarEmail = async () => {
  if (!validarFormulario()) {
    return
  }

  creating.value = true
  try {
    const data = new FormData()
    data.append('email', formData.value.email)
    data.append('senha', formData.value.senha)

    await userService.createEmailAlternativo(data)
    toast.success(t('emailsAlternativos.toasts.createSuccess'))
    dialog.value = false
    formData.value = { email: '', senha: '', confirmarSenha: '' }
    emailErrors.value = []
    senhaErrors.value = []
    confirmarSenhaErrors.value = []
    buscarEmails()
  } catch (error) {
    toast.error(t('emailsAlternativos.toasts.createError'))
  } finally {
    creating.value = false
  }
}

const abrirAlterarSenha = (email) => {
  senhaData.value = { id: email.id, email: email.email, senhaAntiga: '', novaSenha: '', confirmarNovaSenha: '' }
  showPasswordOld.value = false
  showPasswordNew.value = false
  showPasswordConfirm.value = false
  senhaDialog.value = true
}

const salvarSenha = async () => {
  if (senhaData.value.novaSenha && senhaData.value.novaSenha !== senhaData.value.confirmarNovaSenha) {
    toast.error(t('alterarSenhaEmailAlternativo.toasts.passwordMismatch'))
    return
  }
  if (senhaData.value.novaSenha && !senhaData.value.senhaAntiga) {
    toast.error(t('alterarSenhaEmailAlternativo.toasts.currentPasswordRequired'))
    return
  }

  savingSenha.value = true
  try {
    const payload = { emailAlternativoId: senhaData.value.id, email: senhaData.value.email, senhaAntiga: senhaData.value.senhaAntiga, senhaNova: senhaData.value.novaSenha }
    await userService.mudarSenhaEmailAlternativo(payload)
    toast.success(t('alterarSenhaEmailAlternativo.toasts.success'))
    senhaDialog.value = false
  } catch (error) {
    toast.error(t('alterarSenhaEmailAlternativo.toasts.error'))
  } finally {
    savingSenha.value = false
  }
}

const confirmarDelete = (id) => {
  emailToDelete.value = id
  deleteDialog.value = true
}

const apagarEmail = async () => {
  deleting.value = true
  try {
    await userService.deleteEmailAlternativo(emailToDelete.value)
    toast.success(t('emailsAlternativos.toasts.deleteSuccess'))
    deleteDialog.value = false
    buscarEmails()
  } catch (error) {
    toast.error(t('emailsAlternativos.toasts.deleteError'))
  } finally {
    deleting.value = false
    emailToDelete.value = null
  }
}

onMounted(() => {
  buscarEmails()
})
</script>

<style scoped>
.email-list :deep(.v-list-item) {
  border-radius: 12px;
  transition: all 0.2s ease;
}

.email-list :deep(.v-list-item:hover) {
  background-color: #f8f9fa !important;
}

.email-item {
  border: 1px solid #e0e0e0;
  padding: 8px;
}
</style>
