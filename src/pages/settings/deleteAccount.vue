<template>
    <VRow >
      <VCol cols="12">
        <div class="d-flex align-center mb-6">
          <VBtn icon="mdi-arrow-left" variant="text" @click="router.back()" class="mr-3" />
          <h1 class="text-h5 font-weight-bold">Excluir Conta</h1>
        </div>

        <VAlert type="warning" class="mb-6">
          <strong>Atenção:</strong> Esta ação é permanente e não pode ser desfeita.
        </VAlert>

        <VCard class="mb-6">
          <VCardTitle>O que acontece quando você exclui sua conta?</VCardTitle>
          <VCardText class="pa-6 ml-8">
            <ul>
              <li>Todos os seus dados pessoais serão removidos</li>
              <li>Seu histórico será apagado</li>
              <li>Você perderá acesso aos serviços</li>
              <li>Esta ação não pode ser revertida</li>
            </ul>

            <VBtn variant="text" color="primary" @click="redirectInfoExclusao()" class="mt-3">
              Ler política completa
              <VIcon icon="mdi-open-in-new" class="ml-1" size="16" />
            </VBtn>
          </VCardText>
        </VCard>

        <div class="d-flex gap-5 " >
          <VBtn color="error" class="mr-5" @click="showDeleteDialog = true">
            <VIcon icon="mdi-delete" class="mr-2" />
            Excluir Conta
          </VBtn>
          <VBtn variant="outlined" @click="router.back()">
            Cancelar
          </VBtn>
        </div>

        <VDialog v-model="showDeleteDialog" max-width="400">
          <VCard>
            <VCardTitle>Confirmar Exclusão</VCardTitle>
            <VCardText>
              Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.
            </VCardText>
            <VCardActions>
              <VSpacer />
              <VBtn @click="showDeleteDialog = false">Cancelar</VBtn>
              <VBtn color="error" @click="handleDeleteAccount" :loading="deletingAccount">
                Deletar
              </VBtn>
            </VCardActions>
          </VCard>
        </VDialog>
      </VCol>
    </VRow>
</template>

<style scoped>
/* Estilos mínimos */
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

const redirectInfoExclusao = () => {
  window.open('/detalhesExclusaoConta', '_blank');
};

const handleDeleteAccount = async () => {
  deletingAccount.value = true;

  try {
    // Simular chamada da API
    await new Promise(resolve => setTimeout(resolve, 2000));

    localStorage.clear();
    router.push('/login');
    toast.success('Conta deletada com sucesso!');
  } catch (error) {
    toast.error('Erro ao deletar conta. Tente novamente.');
  } finally {
    deletingAccount.value = false;
    showDeleteDialog.value = false;
  }
};

onMounted(() => {
  payload.value = getPayload();
});
</script>
