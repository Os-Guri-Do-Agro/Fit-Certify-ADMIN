<template>
  <v-container style="background-color: #00c6fe" fluid
    class=" pa-0 fill-height d-flex flex-column flex-md-row overflow-x-hidden">
    <v-row no-gutters class="h-100">

      <v-col md="4" class="d-flex flex-column justify-center px-10  px-lg-16 h-100 ">

        <div class="mb-8">
          <a href="https://fitcert365.com/" class="d-flex align-center justify-center">
            <v-img src="../assets/Login/logo-fit.png" max-width="180" alt="Logo" cover></v-img>
          </a>
        </div>

        <p class="text-white text-center text-subtitle-1 text-md-h6 text-lg-h5 px-lg-10 "
          style="margin-bottom: 1.5rem;">
          Bem-vindo! Faça seu login para acessar sua conta.
        </p>


        <v-form class="d-flex align-center flex-column px-lg-0 px-xl-12 h-auto" @submit.prevent="handleSubmit"
          ref="formRef">
          <v-text-field v-model="email" type="email" placeholder="Email" hide-details variant="solo" bg-color="white"
            density="comfortable" class="mb-4 w-100" :rules="[value => !!value || 'Campo obrigatório']"
            style="border-radius: 5px;  color: #1f2937;">
          </v-text-field>

          <v-text-field v-model="senha" :type="showPassword ? 'text' : 'password'" placeholder="Senha" hide-details
            variant="solo" bg-color="white" density="comfortable" class="w-100"
            :rules="[value => !!value || 'Campo obrigatório']" style="border-radius: 5px; color: #1f2937;">
            <template #append-inner>
              <v-icon @click="showPassword = !showPassword" class="cursor-pointer">
                {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}
              </v-icon>
            </template></v-text-field>

            <div class="esqueceu-senha mt-2">
          <button type="button" @click="showModal = true"
            class="text-white text-subtitle-2" to="/forgot-password">
            <span>Esqueceu a senha?</span>
          </button>
            </div>


          <VRow class="d-flex w-100 mt-5">
            <div class="d-flex flex-column align-center w-100" cols="12">
              <VBtn class="text-white" block height="47px" style="background-color: #88CE0D;" type="submit"
                :loading="loading">
                Entrar</VBtn>
            </div>
          </VRow>
        </v-form>

        <div class="d-flex flex-column flex-md-row align-center justify-center mt-4">
          <span class="text-white text-md-subtitle-2 text-lg-subtitle-1">Não tem uma conta?</span>
          <button @click="showTipoContaModal = true"
            class="font-weight-bold ml-2 text-subtitle-1 text-align-center text-white"
            style="background: none; border: none; cursor: pointer;">
            Criar conta
          </button>
        </div>



        <v-dialog v-model="showModal" width="600">
          <v-card rounded="xl">
            <div>
              <v-btn variant="text" width="20px" height="50px">
                <span @click="showModal = false" class="mdi mdi-window-close text-h5" style="color: #00c6fe;"></span>
              </v-btn>
            </div>
            <v-card-title class="d-flex flex-column justify-center align-center ga-5 mt-5 px-5 px-md-10">
              <span class="mdi mdi-account-lock-outline text-h1" style="color: #00c6fe;"></span>
              <span class="text-h6 text-md-h5 font-weight-bold">Recuperar senha</span>
            </v-card-title>
            <v-card-subtitle class="text-center text-subtitle-2 text-md-subtitle-1"
              style="white-space: normal; word-wrap: break-word;">
              <span>
                Digite seu e-mail e nós enviaremos um link para redefinir sua senha.
              </span>
            </v-card-subtitle>
            <v-card-text class="px-5 px-md-10 mt-2 mt-md-5">
              <v-text-field v-model="emailModal" type="email" placeholder="Email" hide-details variant="solo"
                bg-color="white" @blur="() => onBlurEmailModal(emailModal)" :loading="loadingEmailModal">
              </v-text-field>
            </v-card-text>
            <v-card-actions class="d-flex w-100 flex-column ga-5 px-5 px-md-10 mb-5">
              <v-btn class="w-100 text-white" height="50px" style="background-color: #00c6fe;"
                :loading="loadingEmailModal" @click="enviarCodigo"
                :disabled="loadingEmailModal || !validarEmail(emailModal) || !clicouEnviar">Enviar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="showTipoContaModal" width="800">
          <v-card rounded="xl">
            <div class="d-flex justify-end pa-2">
              <v-btn variant="text" @click="showTipoContaModal = false" icon="mdi-close" size="small"></v-btn>
            </div>

            <v-card-title class="d-flex flex-column justify-center align-center ga-3 px-5">
              <v-icon size="60" color="#00c6fe">mdi-account-plus</v-icon>
              <span class="text-h5 font-weight-bold">Escolha o tipo de conta</span>
            </v-card-title>

            <v-card-subtitle class="text-center text-subtitle-1 px-5">
              Selecione se você deseja criar uma conta como atleta ou médico
            </v-card-subtitle>

            <v-card-text class="px-5 py-4">
              <div class="d-flex gap-4">
                <v-card class="pa-4 text-center cursor-pointer hover-card flex-1" variant="outlined"
                  @click="selecionarTipoConta('atleta')"
                  :class="{ 'selected-card': tipoContaSelecionado === 'atleta' }">
                  <v-icon size="48" color="#88CE0D" class="mb-3">mdi-account-heart</v-icon>
                  <div class="text-h6 font-weight-bold mb-2">Atleta</div>
                  <div class="text-body-2 text-grey">
                    Crie sua conta para acessar consultas médicas e acompanhamento
                  </div>
                </v-card>

                <v-card class="pa-4 text-center cursor-pointer hover-card flex-1" variant="outlined"
                  @click="selecionarTipoConta('medico')"
                  :class="{ 'selected-card': tipoContaSelecionado === 'medico' }">
                  <v-icon size="48" color="#00c6fe" class="mb-3">mdi-doctor</v-icon>
                  <div class="text-h6 font-weight-bold mb-2">Médico</div>
                  <div class="text-body-2 text-grey">
                    Crie sua conta para atender pacientes e gerenciar consultas
                  </div>
                </v-card>
              </div>
            </v-card-text>

            <v-card-actions class="px-5 pb-5">
              <v-btn color="#00c6fe" variant="flat" block size="large" @click="confirmarTipoConta"
                :disabled="!tipoContaSelecionado">
                Continuar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-col>

      <!-- Coluna da direita -->
      <v-col md="8" class="pa-0 hidden-sm-and-down">
        <v-img src="../assets/Login/login-banner.jpg" cover height="100vh" width="100%" </v-img>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import authService from '@/services/auth/auth-service';
import userService from '@/services/user/user-service';
import { getPayload, getRole, getStatusMedicoCRM } from '@/utils/auth';
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import type { VForm } from 'vuetify/components';
import dayjs from 'dayjs';

const showPassword = ref(false)
const email = ref('');
const senha = ref('');
const isMobile = ref(false)

const emailModal = ref('');
const loadingEmailModal = ref(false);

const formRef = ref<VForm | null>(null)
const router = useRouter()
const loading = ref(false)

const showModal = ref(false)
const clicouEnviar = ref(false)
const showTipoContaModal = ref(false)
const tipoContaSelecionado = ref('')
let debounceTimer: number

watch(emailModal, (newEmail) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    if (newEmail.endsWith('.com')) {
      onBlurEmailModal(newEmail)
    }
  }, 500)
})

async function handleSubmit() {
  if (!formRef.value) return;

  const { valid } = await formRef.value.validate();

  if (!valid) {
    toast.error("Preencha o formulário corretamente", { autoClose: 3000 });
    return;
  }

  try {
    loading.value = true
    const data = {
      email: email.value,
      senha: senha.value,
      isMobile: isMobile.value,
    };

    const response = await authService.login(data);

    if (response.data?.access_token) {
      sessionStorage.setItem("token", response.data?.access_token)
      loading.value = false
      const payload = getPayload()
      const user = payload?.user
      let path = '/'
      if (getRole() === 'admin') {
        toast.error(response?.message || "Este painel é exclusivo para médicos e atletas");
        return
      }
      if (getRole() === 'medico' && getStatusMedicoCRM() === false) {

        toast.error(response?.message || "Sua conta médica está inativa. Entre em contato com o suporte.'");
      }

      if (user?.atleta && !user.atleta.planoId) {
        path = '/registerPlanos'
      } else if (user?.medico || (user?.atleta && user.atleta.planoId)) {
        path = '/'
      }
      router.push(path).then(() => {
        toast.success("Login realizado com sucesso!", { autoClose: 2500 });
      });
    } else {
      toast.error(response?.message || "Não foi possível fazer login");
      loading.value = false
    }
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Erro no servidor");
    loading.value = false
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
      toast.error('Email não encontrado no sistema');
    } else {
      toast.success('Email encontrado! Clique em enviar para enviarmos o código de verificação.');
    }
  } catch (error) {
    toast.error('Erro ao verificar email');
  } finally {
    loadingEmailModal.value = false;
  }
}

function validarEmail(email: string) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}

async function enviarCodigo() {
  try {
    await authService.enviarCodigo(emailModal.value).then((resp) => {
      toast.success('Código enviado com sucesso!');
    })

  } catch (error) {
    toast.error('Erro ao enviar código');
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
.hover-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.hover-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.selected-card {
  border: 2px solid #00c6fe !important;
  background-color: rgba(0, 198, 254, 0.05);
}

.cursor-pointer {
  cursor: pointer;
}

.gap-4 {
  gap: 16px;
}

.esqueceu-senha {
  display: flex;
  width: 100%;
  justify-content: end;
}
</style>
