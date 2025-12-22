<template>
  <div class="pa-4">
    <VRow>
      <VCol cols="12">
        <h1 class="text-h5 font-weight-bold mb-6">Configurações</h1>

        <VCard class="mb-4">
          <VList>
            <VListItem v-for="(item, index) in accountItems" :key="index" @click="handleNavigation(item)">
              <template #prepend>
                <VIcon :icon="`mdi-${item.icon}`" :color="item.title === 'Sair' ? 'error' : 'primary'" />
              </template>

              <VListItemTitle :class="item.title === 'Sair' ? 'text-error' : ''">
                {{ item.title }}
              </VListItemTitle>

              <template #append>
                <VIcon icon="mdi-chevron-right" />
              </template>
            </VListItem>
          </VList>
        </VCard>

        <VCard class="mb-4">
          <VList>
            <VListItem v-for="(item, index) in supportItems" :key="index" @click="router.push(item.to)">
              <template #prepend>
                <VIcon :icon="`mdi-${item.icon}`" color="primary" />
              </template>

              <VListItemTitle>{{ item.title }}</VListItemTitle>

              <template #append>
                <VIcon icon="mdi-chevron-right" />
              </template>
            </VListItem>
          </VList>
        </VCard>

        <VCard color="error" variant="tonal">
          <VCardText>
            <div class="d-flex align-center mb-3">
              <VIcon icon="mdi-alert" color="error" class="mr-2" />
              <span class="font-weight-bold">Zona de Perigo</span>
            </div>
            <p class="text-body-2 mb-3">Ações que afetam permanentemente sua conta.</p>
            <VBtn color="error" variant="outlined" @click="handleDeleteAccount()">
              Excluir Conta
            </VBtn>
          </VCardText>
        </VCard>

        <!-- Dialog de Confirmação -->
        <VDialog v-model="showDeleteDialog" max-width="400">
          <VCard rounded="xl" class="pa-4">
            <VCardTitle class="text-center text-h5 font-weight-bold text-error mb-4">
              Deletar Conta
            </VCardTitle>

            <VCardText class="text-center">
              <VIcon icon="mdi-alert-circle-outline" size="64" color="error" class="mb-4" />
              <p class="text-body-1 mb-4">
                Tem certeza que deseja deletar sua conta?
              </p>
              <p class="text-body-2 text-grey-600">
                Esta ação não pode ser desfeita e todos os seus dados serão perdidos permanentemente.
              </p>
            </VCardText>

            <VCardActions class="justify-center gap-3 pt-4">
              <VBtn variant="outlined" color="grey" @click="showDeleteDialog = false" rounded="lg">
                Cancelar
              </VBtn>
              <VBtn color="error" @click="handleDeleteAccount" rounded="lg">
                Deletar
              </VBtn>
            </VCardActions>
          </VCard>
        </VDialog>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
/* Estilos mínimos */
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
