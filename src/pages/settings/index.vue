<template>
  <v-container class="py-10">
    <h1 class="text-h4 font-weight-bold mb-8">Configurações</h1>

    <v-row>
      <v-col cols="12">
        <v-card class="mb-6" elevation="4" rounded="xl">
          <v-card-title class="section-title">
            <v-icon class="mr-3" color="#00c6fe">mdi-account-cog</v-icon>
            Conta
          </v-card-title>
          <v-list>
            <v-list-item v-for="(item, index) in accountItems" :key="index" @click="handleNavigation(item)" class="list-item-hover">
              <template #prepend>
                <v-icon :icon="`mdi-${item.icon}`" color="#00c6fe" />
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
            <v-icon class="mr-3" color="#00c6fe">mdi-help-circle</v-icon>
            Suporte
          </v-card-title>
          <v-list>
            <v-list-item v-for="(item, index) in supportItems" :key="index" @click="router.push(item.to)" class="list-item-hover">
              <template #prepend>
                <v-icon :icon="`mdi-${item.icon}`" color="#00c6fe" />
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
              <span class="text-h6 font-weight-bold text-error">Zona de Perigo</span>
            </div>
            <p class="text-body-2 mb-4 text-grey-darken-1">Ações que afetam permanentemente sua conta.</p>
            <v-btn color="error" variant="outlined" rounded="lg" @click="handleDeleteAccount()">
              <v-icon class="mr-2">mdi-delete</v-icon>
              Excluir Conta
            </v-btn>
          </v-card-text>
        </v-card>

        <!-- Dialog de Confirmação -->
        <v-dialog v-model="showDeleteDialog" max-width="400">
          <v-card rounded="xl" class="pa-4">
            <v-card-title class="text-center text-h5 font-weight-bold text-error mb-4">
              Deletar Conta
            </v-card-title>

            <v-card-text class="text-center">
              <v-icon icon="mdi-alert-circle-outline" size="64" color="error" class="mb-4" />
              <p class="text-body-1 mb-4">
                Tem certeza que deseja deletar sua conta?
              </p>
              <p class="text-body-2 text-grey-600">
                Esta ação não pode ser desfeita e todos os seus dados serão perdidos permanentemente.
              </p>
            </v-card-text>

            <v-card-actions class="justify-center gap-3 pt-4">
              <v-btn variant="outlined" color="grey" @click="showDeleteDialog = false" rounded="lg">
                Cancelar
              </v-btn>
              <v-btn color="error" @click="handleDeleteAccount" rounded="lg">
                Deletar
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

const payload = ref<any>();
const showDeleteDialog = ref(false);
const deletingAccount = ref(false);
const router = useRouter();
const userRole = ref('');

const accountItems = computed(() => {
  const baseItems = [
    { icon: 'lock-reset', title: 'Nova senha', to: '/novaSenhaLogado' },
    { icon: 'shield-lock-outline', title: 'Privacidade', to: '/politicaPrivacidade' },
    { icon: 'ticket-percent', title: 'Indicações', to: '/cupons' }
  ];

  // Adiciona item específico para médico
  if (userRole.value === 'medico') {
    baseItems.unshift({ icon: 'account-outline', title: 'Editar Perfil', to: '/Medico-Screens/editarPerfilMedico' });
    baseItems.push({ icon: 'doctor', title: 'Perfil Público', to: '/Medico-Screens/editarPerfilPublico' });
  }
  if (userRole.value === 'atleta') {
    baseItems.unshift({ icon: 'account-outline', title: 'Editar Perfil', to: '/Atleta-Screens/editarPerfilAtleta' });
    baseItems.push({ icon: 'wallet-outline', title: 'Assinatura e Pagamentos', to: '/Atleta-Screens/meuPlano' });
  }
  if (userRole.value === 'fisioterapeuta') {
    baseItems.unshift({ icon: 'account-outline', title: 'Editar Perfil', to: '/Fisioterapeuta-Screens/editarPerfilFisioterapeuta' });
    baseItems.push({ icon: 'doctor', title: 'Perfil Público', to: '/Fisioterapeuta-Screens/editarPerfilPublico' });
  }
  if (userRole.value === 'treinador') {
    baseItems.unshift({ icon: 'account-outline', title: 'Editar Perfil', to: '/Fisioterapeuta-Screens/perfilTreinador' });
    baseItems.push({ icon: 'wallet-outline', title: 'Assinatura e Pagamentos', to: '/Atleta-Screens/meuPlano' });
  }

  return baseItems;
});

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

const supportItems: any[] = [
  { icon: 'help-circle-outline', title: 'Central de Ajuda', to: '/centralAjuda' },
];

const handleLogout = () => {
  localStorage.clear();
  router.push('/login');
  toast.success('Logout realizado com sucesso!');
};

const handleDeleteAccount = () => {
  router.push('/settings/deleteAccount');
};

onMounted(() => {
  payload.value = getPayload();
  userRole.value = getRole();
});
</script>
