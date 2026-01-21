<template>
  <v-container class="py-10">
    <h1 class="text-h4 font-weight-bold mb-8">{{ $t('settings.title') }}</h1>

    <v-row>
      <v-col cols="12">
        <v-card class="mb-6" elevation="4" rounded="xl">
          <v-card-title class="section-title">
            <v-icon class="mr-3" color="#1E88E5">mdi-account-cog</v-icon>
            {{ $t('settings.account') }}
          </v-card-title>
          <v-list>
            <v-list-item v-for="(item, index) in accountItems" :key="index" @click="handleNavigation(item)" class="list-item-hover">
              <template #prepend>
                <v-icon :icon="`mdi-${item.icon}`" color="#1E88E5" />
              </template>

              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>

              <template #append>
                <v-icon icon="mdi-chevron-right" color="grey" />
              </template>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card class="mb-6" elevation="4" rounded="xl">
          <v-card-title class="section-title">
            <v-icon class="mr-3" color="#1E88E5">mdi-help-circle</v-icon>
            {{ $t('settings.support') }}
          </v-card-title>
          <v-list>
            <v-list-item v-for="(item, index) in supportItems" :key="index" @click="router.push(item.to)" class="list-item-hover">
              <template #prepend>
                <v-icon :icon="`mdi-${item.icon}`" color="#1E88E5" />
              </template>

              <v-list-item-title>{{ item.title }}</v-list-item-title>

              <template #append>
                <v-icon icon="mdi-chevron-right" color="grey" />
              </template>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card elevation="4" rounded="xl" class="danger-zone">
          <v-card-text class="pa-6">
            <div class="d-flex align-center mb-3">
              <v-icon icon="mdi-alert" color="error" size="28" class="mr-3" />
              <span class="text-h6 font-weight-bold text-error">{{ $t('settings.dangerZone') }}</span>
            </div>
            <p class="text-body-2 mb-4 text-grey-darken-1">{{ $t('settings.dangerZoneDescription') }}</p>
            <v-btn v-if="!perfil?.contaDeletada" color="error" variant="outlined" rounded="lg" @click="handleDeleteAccount()">
              <v-icon class="mr-2">mdi-delete</v-icon>
              {{ $t('settings.deleteAccount') }}
            </v-btn>
            <v-btn v-else color="success" variant="outlined" rounded="lg" @click="showReactivateDialog = true">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              {{ $t('settings.cancelDeactivation') }}
            </v-btn>
          </v-card-text>
        </v-card>

        <!-- Dialog de Reativação -->
        <v-dialog v-model="showReactivateDialog" max-width="400">
          <v-card rounded="xl" class="pa-4">
            <v-card-title class="text-center text-h5 font-weight-bold text-success mb-4">
              {{ $t('settings.reactivateAccountTitle') }}
            </v-card-title>

            <v-card-text class="text-center">
              <v-icon icon="mdi-check-circle-outline" size="64" color="success" class="mb-4" />
              <p class="text-body-1 mb-4">
                {{ $t('settings.reactivateAccountMessage') }}
              </p>
            </v-card-text>

            <v-card-actions class="justify-center gap-3 pt-4">
              <v-btn variant="outlined" color="grey" @click="showReactivateDialog = false" rounded="lg">
                {{ $t('settings.cancel') }}
              </v-btn>
              <v-btn  class="bg-success" @click="confirmReactivation" :loading="loading" rounded="lg">
                {{ $t('settings.reactivate') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Dialog de Confirmação -->
        <v-dialog v-model="showDeleteDialog" max-width="400">
          <v-card rounded="xl" class="pa-4">
            <v-card-title class="text-center text-h5 font-weight-bold text-error mb-4">
              {{ $t('settings.deleteAccountTitle') }}
            </v-card-title>

            <v-card-text class="text-center">
              <v-icon icon="mdi-alert-circle-outline" size="64" color="error" class="mb-4" />
              <p class="text-body-1 mb-4">
                {{ $t('settings.deleteAccountMessage') }}
              </p>
              <p class="text-body-2 text-grey-600">
                {{ $t('settings.deleteAccountWarning') }}
              </p>
            </v-card-text>

            <v-card-actions class="justify-center gap-3 pt-4">
              <v-btn variant="outlined" color="grey" @click="showDeleteDialog = false" rounded="lg">
                {{ $t('settings.cancel') }}
              </v-btn>
              <v-btn color="error" @click="handleDeleteAccount" rounded="lg">
                {{ $t('settings.delete') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.section-title {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #dee2e6;
  font-weight: 600;
  font-size: 1.2rem;
  color: #495057;
}

.list-item-hover {
  transition: all 0.2s ease;
  cursor: pointer;
}

.list-item-hover:hover {
  background: rgba(0, 198, 254, 0.05);
}

.danger-zone {
  border: 2px solid rgba(244, 67, 54, 0.2);
}

.v-card {
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-2px);
}
</style>
<script setup lang="ts">
import { getPayload, getRole } from '@/utils/auth';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useI18n } from 'vue-i18n';
import atletaService from '@/services/atleta/atleta-service';
import medicoService from '@/services/medico/medico-service';
import treinadorService from '@/services/treinador/treinador-service';
import fisioterapeutaService from '@/services/fisioterapeutas/fisioterapeuta-service';
import { getAtletaId, getMedicoId, getFisioterapeutaId, getTreinadorId, isAtleta, isMedico, isFisioterapeuta, isTreinador } from '@/utils/auth';


const { t } = useI18n();
const payload = ref<any>();
const showDeleteDialog = ref(false);
const showReactivateDialog = ref(false);
const deletingAccount = ref(false);
const router = useRouter();
const userRole = ref('');
const perfil = ref<any>(null)
const loading = ref(false);

const accountItems = computed(() => {
  const baseItems = [
    { icon: 'lock-reset', title: t('settings.newPassword'), to: '/novaSenhaLogado' },
    { icon: 'shield-lock-outline', title: t('settings.privacy'), to: '/politicaPrivacidade' },
    { icon: 'ticket-percent', title: t('settings.referrals'), to: '/cupons' }
  ];

  // Adiciona item específico para médico
  if (userRole.value === 'medico') {
    baseItems.unshift({ icon: 'account-outline', title: t('settings.editProfile'), to: '/Medico-Screens/editarPerfilMedico' });
    baseItems.push({ icon: 'doctor', title: t('settings.publicProfile'), to: '/Medico-Screens/editarPerfilPublico' });
  }
  if (userRole.value === 'atleta') {
    baseItems.unshift({ icon: 'account-outline', title: t('settings.editProfile'), to: '/Atleta-Screens/editarPerfilAtleta' });
    baseItems.push({ icon: 'wallet-outline', title: t('settings.subscriptionPayments'), to: '/Atleta-Screens/meuPlano' });
  }
  if (userRole.value === 'fisioterapeuta') {
    baseItems.unshift({ icon: 'account-outline', title: t('settings.editProfile'), to: '/Fisioterapeuta-Screens/editarPerfilFisioterapeuta' });
    baseItems.push({ icon: 'doctor', title: t('settings.publicProfile'), to: '/Fisioterapeuta-Screens/editarPerfilPublico' });
  }


  return baseItems;
});

const infoUser = async () => {
  try {
    if (isAtleta()) {
    const response = await atletaService.getAtletaById(getAtletaId());
    perfil.value = response.data;
    } else if (isMedico()) {
    const response = await medicoService.getMedicoById(getMedicoId());
    perfil.value = response.data;
    } else if (isFisioterapeuta()) {
    const response = await fisioterapeutaService.getFisioterapeutaById(getFisioterapeutaId());
    perfil.value = response.data;
    } else if (isTreinador()) {
    const response = await treinadorService.getTreinadorById(getTreinadorId());
    perfil.value = response.data;
    }
  } catch (error) {
    console.error('Erro ao buscar dados do atleta:', error);
  }
}

const confirmReactivation = async () => {
  loading.value = true;
  try {
    if (isAtleta()) {
      await atletaService.ativarContaAtleta(getAtletaId());
    } else if (isMedico()) {
      await medicoService.ativarContaMedico(getMedicoId());
    } else if (isFisioterapeuta()) {
      await fisioterapeutaService.ativarContaFisioterapeuta(getFisioterapeutaId());
    } else if (isTreinador()) {
      await treinadorService.ativarContaTreinador(getTreinadorId());
    }
    toast.success('Conta reativada com sucesso!');
    window.location.reload();
  } catch (error) {
    console.error('Erro ao ativar conta do atleta:', error);
  } finally {
    showReactivateDialog.value = false;
    loading.value = false;
  }
}

const handleNavigation = (item: any) => {
  if (item.to === '/politicaPrivacidade') {
    window.open('/politicaPrivacidade', '_blank')
  }
  else if (item.to === 'logout') {
    handleLogout();
  } else {
    router.push(item.to);
  }
};

const supportItems = computed(() => [
  { icon: 'help-circle-outline', title: t('settings.helpCenter'), to: '/centralAjuda' },
]);

const handleLogout = () => {
  localStorage.clear();
  router.push('/login');
  toast.success(t('settings.logoutSuccess'));
};

const handleDeleteAccount = () => {
  router.push('/settings/deleteAccount');
};

onMounted(() => {
  payload.value = getPayload();
  userRole.value = getRole();

  infoUser()
});
</script>
