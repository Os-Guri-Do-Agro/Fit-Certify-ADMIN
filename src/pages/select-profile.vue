<template>
  <div class="profile-container">
    <v-overlay :model-value="loading" contained class="align-center justify-center">
      <v-progress-circular color="#1E88E5" indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <div class="content-wrapper">
      <div class="text-center mb-12">
        <div class="icon-header">
          <v-icon color="white" size="48">mdi-account-switch</v-icon>
        </div>
        <h2 class="text-h3 font-weight-bold mb-3" style="color: #1e293b;">{{ $t('trocarPerfil.title') }}</h2>
        <span class="text-h6" style="color: #64748b; font-weight: 400;">{{ $t('trocarPerfil.subtitle') }}</span>
      </div>

      <div class="perfis-grid">
        <div
          v-for="perfil in perfis"
          :key="perfil.id"
          @click="selecionarPerfil(perfil)"
          class="perfil-card"
          :class="{ 'perfil-selected': perfilId === perfil.id, 'perfil-disabled': loading }"
        >
          <div class="card-content">
            <div class="avatar-wrapper">
              <div class="avatar-ring" :class="{ 'ring-active': perfilId === perfil.id }">
                <v-avatar size="140">
                  <v-img v-if="perfil?.avatarUrl" :src="perfil.avatarUrl" cover />
                  <div v-else class="avatar-placeholder">
                    <v-icon color="white" size="64">mdi-account</v-icon>
                  </div>
                </v-avatar>
              </div>
              <div class="check-badge" v-if="perfilId === perfil.id">
                <v-icon color="white" size="20">mdi-check-bold</v-icon>
              </div>
            </div>
            <div class="perfil-name">
              {{ $t(`login.roles.${getRoles(perfil.nomeOriginal)}`) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de ativação de conta -->
  <v-dialog v-model="dialogAtivarConta" width="600">
    <v-card rounded="xl" style="font-family: DM Sans, sans-serif;">
      <div class="d-flex justify-end pa-2">
        <v-btn variant="text" icon @click="dialogAtivarConta = false">
          <v-icon color="#1E88E5">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-card-title class="d-flex flex-column justify-center align-center ga-5 mt-2 px-5 px-md-10">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
          <v-icon color="white" size="24">mdi-account-check</v-icon>
        </div>
        <span class="text-h6 text-md-h5 font-weight-bold" style="color: #2c3e50;">{{ $t('login.activateAccount.title') }}</span>
      </v-card-title>
      <v-card-subtitle class="text-center text-subtitle-2 text-md-subtitle-1 px-5 px-md-10"
        style="white-space: normal; word-wrap: break-word; color: #42A5F5; line-height: 1.6;">
        {{ $t('login.activateAccount.subtitle') }}
      </v-card-subtitle>
      <v-card-text class="text-center px-5 px-md-10 mt-2" style="color: #2c3e50;">
        {{ $t('login.activateAccount.description') }}
      </v-card-text>
      <v-card-actions class="d-flex w-100 flex-column ga-3 px-5 px-md-10 mb-5">
        <v-btn class="w-100 text-white" height="50px" color="#1E88E5"
          :loading="loadingAtivarConta" @click="ativarConta" rounded="xl" elevation="4"
          :disabled="loadingAtivarConta"
          style="font-weight: 600; text-transform: none; letter-spacing: 0; background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);">
          {{ $t('login.activateAccount.buttonActivate') }}
        </v-btn>
        <v-btn class="w-100" height="50px" color="#1E88E5" variant="outlined"
          @click="dialogAtivarConta = false" rounded="xl"
          :disabled="loadingAtivarConta"
          style="font-weight: 600; text-transform: none; letter-spacing: 0;">
          {{ $t('login.activateAccount.buttonCancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useI18n } from 'vue-i18n';
import authService from '@/services/auth/auth-service';
import atletaService from '@/services/atleta/atleta-service';
import { getPayloadFromToken, getRole, getStatusMedicoCRM } from '@/utils/auth';
import type { AxiosError } from 'axios';

const { t: $t } = useI18n();
const router = useRouter();

const perfis = ref<any[]>([]);
const perfilId = ref(null);
const loading = ref(false);
const dialogAtivarConta = ref(false);
const perfilInativoId = ref('');
const loadingAtivarConta = ref(false);

onMounted(() => {
  const savedPerfis = sessionStorage.getItem('perfis');
  const savedEmail = sessionStorage.getItem('loginEmail');
  const savedIsMobile = sessionStorage.getItem('loginIsMobile');

  if (!savedPerfis || !savedEmail) {
    router.push('/login');
    return;
  }

  perfis.value = JSON.parse(savedPerfis);
});

const getRoles = (nome: string) => {
  const map: Record<string, string> = {
    'Atleta': 'atleta',
    'Médico': 'medico',
    'Treinador': 'treinador',
    'Fisioterapeuta': 'fisioterapeuta'
  };
  return map[nome] || nome;
};

const ativarConta = async () => {
  try {
    loadingAtivarConta.value = true;
    const id = perfilInativoId.value;
    await atletaService.ativarContaAtleta(id);
    toast.success($t('login.activateAccount.toastSuccess'));
    dialogAtivarConta.value = false;
  } catch (error) {
    toast.error($t('login.activateAccount.toastError'));
  } finally {
    loadingAtivarConta.value = false;
  }
};

async function selecionarPerfil(perfil: any) {
  if (loading.value) return;

  perfilId.value = perfil.id;
  const savedEmail = sessionStorage.getItem('loginEmail');
  const savedIsMobile = sessionStorage.getItem('loginIsMobile') === 'true';

  try {
    loading.value = true;
    const response = await authService.loginComPerfil({
      email: savedEmail,
      perfilId: perfil.id,
      isMobile: savedIsMobile
    });

    if (response.data?.access_token) {
      const storage = savedIsMobile ? localStorage : sessionStorage;
      storage.setItem("token", response.data?.access_token);
      const payload = getPayloadFromToken(response.data?.access_token);
      const user = payload?.user;

      if (user?.id) {
        localStorage.setItem('usuarioId', user.id);
      }

      // Limpar dados temporários
      sessionStorage.removeItem('perfis');
      sessionStorage.removeItem('loginEmail');
      sessionStorage.removeItem('loginIsMobile');

      let path = '/';

      if (getRole() === 'admin') {
        toast.error($t('login.toastErrorAdmin'));
        return;
      }

      if (getRole() === 'medico' && getStatusMedicoCRM() === false) {
        toast.error($t('login.toastErrorMedicoCRM'));
      }

      if (user?.atleta && !user.atleta.planoId) {
        path = '/registerPlanos';
      } else if (user?.medico || (user?.atleta && user.atleta.planoId)) {
        path = '/';
      }

      router.push(path);
    } else {
      toast.error($t('login.toastError3'));
    }
  } catch (err: any) {
    const error = err as AxiosError<{
      message: string;
      statusCode: number;
      atletaId: string;
    }>;

    if (error.response?.data.statusCode === 400) {
      perfilInativoId.value = error.response?.data.atletaId;
      dialogAtivarConta.value = true;
    } else {
      toast.error($t('login.toastError3'));
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 40px 20px;
  position: relative;
}

.content-wrapper {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.icon-header {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 32px rgba(30, 136, 229, 0.4);
  margin: 0 auto 32px;
}

.perfis-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
  justify-items: center;
}

.perfil-card {
  width: 100%;
  max-width: 100%;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.perfil-card.perfil-disabled {
  pointer-events: none;
  opacity: 0.5;
}

.card-content {
  background: white;
  border-radius: 32px;
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 3px solid transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.card-content::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(66, 165, 245, 0.05), rgba(30, 136, 229, 0.05));
  opacity: 0;
  transition: opacity 0.4s ease;
}

.perfil-card:hover .card-content {
  transform: translateY(-12px);
  box-shadow: 0 24px 48px rgba(30, 136, 229, 0.25);
  border-color: #42A5F5;
}

.perfil-card:hover .card-content::before {
  opacity: 1;
}

.perfil-selected .card-content {
  border-color: #1E88E5;
  border-width: 4px;
  box-shadow: 0 16px 40px rgba(30, 136, 229, 0.35);
  transform: scale(1.05);
}

.perfil-selected .card-content::before {
  opacity: 1;
}

.avatar-wrapper {
  position: relative;
  z-index: 1;
}

.avatar-ring {
  padding: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  transition: all 0.4s ease;
}

.avatar-ring.ring-active {
  background: linear-gradient(135deg, #42A5F5, #1E88E5);
  box-shadow: 0 8px 24px rgba(30, 136, 229, 0.4);
}

.perfil-card:hover .avatar-ring {
  transform: scale(1.08);
}

.check-badge {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.5);
  border: 3px solid white;
  animation: checkPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes checkPop {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.perfil-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  z-index: 1;
  letter-spacing: -0.02em;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1200px) {
  .perfis-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    max-width: 800px;
  }
}

@media (max-width: 768px) {
  .perfis-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 600px;
  }
  
  .card-content {
    padding: 32px 20px;
  }
  
  .icon-header {
    width: 72px;
    height: 72px;
  }
}

@media (max-width: 480px) {
  .perfis-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 320px;
  }
}
</style>
