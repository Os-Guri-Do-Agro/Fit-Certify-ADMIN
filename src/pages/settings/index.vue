<template>
  <VContainer class="pa-4">
    <VRow justify="center">
      <VCol cols="12" md="8" lg="6">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-h4 font-weight-bold mb-2" style="color: #00c6fe">
            Configurações
          </h1>
          <p class="text-grey-600">
            Gerencie sua conta e preferências
          </p>
        </div>

        <!-- Lista de Configurações -->
        <VCard class="mb-6" elevation="2" rounded="xl">
          <VList class="pa-0">
            <VListItem
              v-for="(item, index) in listButtons"
              :key="index"
              :to="item.to !== 'Login' ? `/settings/${item.to}` : '/login'"
              class="py-4 px-6"
              :class="{ 'border-bottom': index < listButtons.length - 1 }"
              @click="item.to === 'Login' ? handleLogout() : null"
            >
              <template #prepend>
                <VIcon
                  :icon="`mdi-${item.icon}`"
                  size="24"
                  :color="item.title === 'Sair' ? '#ff5252' : '#00c6fe'"
                />
              </template>

              <VListItemTitle
                class="font-weight-medium"
                :class="item.title === 'Sair' ? 'text-red' : 'text-grey-800'"
              >
                {{ item.title }}
              </VListItemTitle>

              <template #append>
                <VIcon
                  :icon="`mdi-${item.arrowIcon}`"
                  size="20"
                  color="grey-400"
                />
              </template>
            </VListItem>
          </VList>
        </VCard>

        <!-- Botão Deletar Conta -->
        <div class="text-center">
          <VBtn
            color="error"
            variant="outlined"
            size="large"
            rounded="xl"
            class="px-8 py-3"
            @click="handleDeleteAccount()"
          >
            <VIcon icon="mdi-delete-outline" class="mr-2" />
            Deletar Conta
          </VBtn>
        </div>

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
              <VBtn
                variant="outlined"
                color="grey"
                @click="showDeleteDialog = false"
                rounded="lg"
              >
                Cancelar
              </VBtn>
              <VBtn
                color="error"
                @click="handleDeleteAccount"
                rounded="lg"
              >
                Deletar
              </VBtn>
            </VCardActions>
          </VCard>
        </VDialog>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
.border-bottom {
  border-bottom: 1px solid #e0e0e0;
}

.v-list-item {
  transition: all 0.2s ease;
}

.v-list-item:hover {
  background-color: #f5f5f5;
}
</style>
<script setup lang="ts">
import { getPayload } from '@/utils/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const payload = ref<any>();
const showDeleteDialog = ref(false);
const deletingAccount = ref(false);
const router = useRouter();

const listButtons: any[] = [
  {
    icon: 'account-outline',
    title: 'Perfil',
    to: 'Perfil',
    arrowIcon: 'chevron-right',
  },
  {
    icon: 'heart-outline',
    title: 'Favoritos',
    to: '404page',
    arrowIcon: 'chevron-right',
  },
  {
    icon: 'wallet-outline',
    title: 'Método de pagamento',
    to: '404page',
    arrowIcon: 'chevron-right',
  },
  {
    icon: 'lock-outline',
    title: 'Privacidade',
    to: 'Privacidade',
    arrowIcon: 'chevron-right',
  },
  {
    icon: 'cog-outline',
    title: 'Configurações',
    to: 'Configurações',
    arrowIcon: 'chevron-right',
  },
  {
    icon: 'help',
    title: 'Ajuda',
    to: 'Central De Ajuda',
    arrowIcon: 'chevron-right',
  },
  {
    icon: 'logout',
    title: 'Sair',
    to: 'Login',
    arrowIcon: 'chevron-right',
  },
];

const handleLogout = () => {
  localStorage.clear();
  router.push('/login');
  toast.success('Logout realizado com sucesso!');
};

const handleDeleteAccount = async () => {
  router.push('/settings/deleteAccount')
  // deletingAccount.value = true;

  // try {
  //   // Simular chamada da API
  //   await new Promise(resolve => setTimeout(resolve, 2000));

  //   localStorage.clear();
  //   router.push('/login');
  //   toast.success('Conta deletada com sucesso!');
  // } catch (error) {
  //   toast.error('Erro ao deletar conta. Tente novamente.');
  // } finally {
  //   deletingAccount.value = false;
  //   showDeleteDialog.value = false;
  // }
};

onMounted(() => {
  payload.value = getPayload();
});
</script>

