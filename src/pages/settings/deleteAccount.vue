<template>
  <v-container class="pa-6">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-btn
          icon
          variant="text"
          size="large"
          @click="router.back()"
          class="mb-4"
        >
          <v-icon size="28">mdi-arrow-left</v-icon>
        </v-btn>

        <v-card class="warning-card mb-6" elevation="0" rounded="xl">
          <v-card-text class="pa-8 text-center">
            <div class="warning-icon-container mx-auto mb-4">
              <v-icon size="64" color="#ff5252">mdi-alert-circle</v-icon>
            </div>
            <h1 class="text-h4 font-weight-bold mb-3" style="color: #2c3e50;">{{ $t('deleteAccount.title') }}</h1>
            <p class="text-h6 mb-0" style="color: #ff5252; font-weight: 600;">
              {{ $t('deleteAccount.permanentWarning') }}
            </p>
          </v-card-text>
        </v-card>

        <v-card class="info-card mb-6" elevation="2" rounded="xl">
          <v-card-text class="pa-6">
            <div class="d-flex align-center mb-4">
              <v-icon color="#42A5F5" size="28" class="mr-3">mdi-information</v-icon>
              <h3 class="text-h6 font-weight-bold" style="color: #2c3e50;">{{ $t('deleteAccount.whatHappens') }}</h3>
            </div>

            <div class="consequences-list">
              <div class="consequence-item">
                <v-icon color="#ff5252" size="20" class="mr-3">mdi-account-remove</v-icon>
                <span class="text-body-1">{{ $t('deleteAccount.consequences.item1') }}</span>
              </div>
              <div class="consequence-item">
                <v-icon color="#ff5252" size="20" class="mr-3">mdi-history</v-icon>
                <span class="text-body-1">{{ $t('deleteAccount.consequences.item2') }}</span>
              </div>
              <div class="consequence-item">
                <v-icon color="#ff5252" size="20" class="mr-3">mdi-lock</v-icon>
                <span class="text-body-1">{{ $t('deleteAccount.consequences.item3') }}</span>
              </div>
              <div class="consequence-item">
                <v-icon color="#ff5252" size="20" class="mr-3">mdi-alert</v-icon>
                <span class="text-body-1">{{ $t('deleteAccount.consequences.item4') }}</span>
              </div>
            </div>

            <v-btn
              variant="text"
              color="#42A5F5"
              @click="redirectInfoExclusao()"
              class="mt-4 text-none"
              rounded="lg"
            >
              {{ $t('deleteAccount.readFullPolicy') }}
              <v-icon class="ml-2" size="18">mdi-open-in-new</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>

        <div class="d-flex justify-center ga-3 flex-wrap">
          <v-btn
            color="#ff5252"
            size="x-large"
            rounded="xl"
            elevation="4"
            @click="showDeleteDialog = true"
            class="text-white px-8"
          >
            <v-icon class="mr-2">mdi-delete</v-icon>
            {{ $t('deleteAccount.deleteButton') }}
          </v-btn>
          <v-btn
            variant="outlined"
            color="grey"
            size="x-large"
            rounded="xl"
            @click="router.back()"
            class="px-8"
          >
            {{ $t('deleteAccount.cancelButton') }}
          </v-btn>
        </div>

        <v-dialog v-model="showDeleteDialog" max-width="500">
          <v-card rounded="xl" elevation="8">
            <v-card-title class="pa-6 text-center">
              <div class="dialog-icon-container mx-auto mb-3">
                <v-icon size="48" color="#ff5252">mdi-alert-circle-outline</v-icon>
              </div>
              <h3 class="text-h5 font-weight-bold" style="color: #2c3e50;">{{ $t('deleteAccount.confirmDialog.title') }}</h3>
            </v-card-title>
            <v-card-text class="pa-6 text-center">
              <p class="text-body-1 mb-0" style="color: #666;">
                {{ $t('deleteAccount.confirmDialog.message') }}
              </p>
            </v-card-text>
            <v-card-actions class="pa-6 justify-center gap-3">
              <v-btn
                variant="outlined"
                color="grey"
                rounded="lg"
                size="large"
                @click="showDeleteDialog = false"
                class="px-6"
              >
                {{ $t('deleteAccount.confirmDialog.cancel') }}
              </v-btn>
              <v-btn
                variant="elevated"
                color="error"
                rounded="lg"
                size="large"
                @click="handleDeleteAccount"
                :loading="deletingAccount"
                class="px-6"
              >
                <v-icon class="mr-2">mdi-delete</v-icon>
                {{ $t('deleteAccount.confirmDialog.delete') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.warning-card {
  background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
  border: 2px solid #ffcdd2;
}

.warning-icon-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 82, 82, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-card {
  transition: all 0.3s ease;
  border-left: 4px solid #42A5F5;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 198, 254, 0.15) !important;
}

.consequences-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.consequence-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.consequence-item:hover {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.dialog-icon-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 82, 82, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

v-btn {
  transition: all 0.3s ease;
}

v-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}
</style>
<script setup lang="ts">
import { getPayload } from '@/utils/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { getErrorMessage } from '@/common/error.utils';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
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
    toast.success(t('deleteAccount.successMessage'));
  } catch (error) {
    toast.error(t('deleteAccount.errorMessage') + ' ' + getErrorMessage(error, t('deleteAccount.unknownError')));
  } finally {
    deletingAccount.value = false;
    showDeleteDialog.value = false;
  }
};

onMounted(() => {
  payload.value = getPayload();
});
</script>
