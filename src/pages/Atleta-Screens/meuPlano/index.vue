<template>
  <div class="pa-4">
    <template v-if="loading">
      <!-- Header Skeleton -->
      <VCard class="mb-4 rounded-lg" elevation="0">
        <VSkeletonLoader type="article" />
      </VCard>

      <!-- Info Section Skeleton -->
      <VCard class="rounded-lg" elevation="0">
        <VSkeletonLoader type="list-item-avatar-two-line@5" />
      </VCard>
    </template>

    <template v-else-if="planoInfo?.hasSubscription">
      <!-- Header -->
      <VCard class="mb-4 rounded-lg" elevation="0" style="background: linear-gradient(135deg, #00C6FE 0%, #0099CC 100%);">
        <VCardText class="text-center pa-8">
          <h1 class="text-h4 font-weight-bold text-white mb-2">
            {{ planoInfo.plan?.name }}
          </h1>
          <div class="text-h3 font-weight-bold text-white">
            R$ {{ planoInfo.plan?.amount ? (planoInfo.plan.amount / 100).toFixed(2) : '0,00' }}
          </div>
          <div class="text-caption text-white mt-1">
            {{ planoInfo.plan?.interval === 'year' ? $t('meuPlano.year') : $t('meuPlano.month') }}
          </div>
        </VCardText>
      </VCard>

      <!-- Info Section -->
      <VCard class="rounded-lg" elevation="0">
        <VCardText class="pa-6">
          <VList class="bg-transparent">
            <!-- Duração -->
            <VListItem class="px-0 mb-2">
              <template #prepend>
                <VAvatar color="#E3F5FF" size="40" class="mr-3">
                  <VIcon icon="mdi-clock-outline" color="#00C6FE" size="20" />
                </VAvatar>
              </template>
              <VListItemTitle class="text-body-2 text-grey-darken-1 mb-1">{{ $t('meuPlano.duration') }}</VListItemTitle>
              <VListItemSubtitle class="text-body-1 font-weight-medium text-grey-darken-4">
                {{ planoInfo.plan?.interval_count }} {{ planoInfo.plan?.interval === 'year' ? $t('meuPlano.year') : $t('meuPlano.month') }}
              </VListItemSubtitle>
            </VListItem>

            <VDivider class="my-3" />

            <!-- Cliente -->
            <VListItem class="px-0 mb-2">
              <template #prepend>
                <VAvatar color="#E3F5FF" size="40" class="mr-3">
                  <VIcon icon="mdi-account" color="#00C6FE" size="20" />
                </VAvatar>
              </template>
              <VListItemTitle class="text-body-2 text-grey-darken-1 mb-1">{{ $t('meuPlano.customer') }}</VListItemTitle>
              <VListItemSubtitle class="text-body-1 font-weight-medium text-grey-darken-4">
                {{ planoInfo.customer?.name }}
              </VListItemSubtitle>
            </VListItem>

            <VDivider class="my-3" />

            <!-- Próxima Cobrança -->
            <VListItem class="px-0 mb-2">
              <template #prepend>
                <VAvatar color="#E3F5FF" size="40" class="mr-3">
                  <VIcon icon="mdi-credit-card-clock" color="#00C6FE" size="20" />
                </VAvatar>
              </template>
              <VListItemTitle class="text-body-2 text-grey-darken-1 mb-1">{{ $t('meuPlano.nextBilling') }}</VListItemTitle>
              <VListItemSubtitle class="text-body-1 font-weight-medium text-grey-darken-4">
                {{ planoInfo.subscription?.next_billing_date ? formatDate(planoInfo.subscription.next_billing_date) : $t('meuPlano.notAvailable') }}
              </VListItemSubtitle>
            </VListItem>

            <VDivider class="my-3" />

            <!-- Status -->
            <VListItem class="px-0 mb-2">
              <template #prepend>
                <VAvatar :color="planoInfo.subscription?.status === 'active' || planoInfo.subscription?.status === 'trialing' ? '#E8F5E9' : '#FFEBEE'" size="40" class="mr-3">
                  <VIcon :icon="planoInfo.subscription?.status === 'active' || planoInfo.subscription?.status === 'trialing' ? 'mdi-check-circle' : 'mdi-alert-circle'"
                    :color="planoInfo.subscription?.status === 'active' || planoInfo.subscription?.status === 'trialing' ? '#4CAF50' : '#F44336'" size="20" />
                </VAvatar>
              </template>
              <VListItemTitle class="text-body-2 text-grey-darken-1 mb-1">{{ $t('meuPlano.status') }}</VListItemTitle>
              <VListItemSubtitle class="text-body-1 font-weight-medium"
                :class="planoInfo.subscription?.status === 'active' || planoInfo.subscription?.status === 'trialing' ? 'text-green-darken-2' : 'text-red-darken-2'">
                {{ $t(`meuPlano.statusTypes.${planoInfo.subscription?.status}`) }}
              </VListItemSubtitle>
            </VListItem>

            <!-- Trial Info (se aplicável) -->
            <template v-if="planoInfo.subscription?.is_trial">
              <VDivider class="my-3" />
              <VListItem class="px-0 mb-2">
                <template #prepend>
                  <VAvatar color="#FFF3E0" size="40" class="mr-3">
                    <VIcon icon="mdi-gift" color="#FF9800" size="20" />
                  </VAvatar>
                </template>
                <VListItemTitle class="text-body-2 text-grey-darken-1 mb-1">{{ $t('meuPlano.trialEnd') }}</VListItemTitle>
                <VListItemSubtitle class="text-body-1 font-weight-medium text-grey-darken-4">
                  {{ planoInfo.subscription?.trial_end ? formatDate(planoInfo.subscription.trial_end) : $t('meuPlano.notAvailable') }}
                </VListItemSubtitle>
              </VListItem>
            </template>
          </VList>
        </VCardText>
      </VCard>

      <!-- Botão Gerenciar -->
      <VBtn color="#00C6FE" variant="flat" class="mt-4 w-100 text-none" size="large" rounded="lg"
        @click="handleGerenciarPlano" :loading="loadingManage" :disabled="loadingManage">
        <VIcon icon="mdi-cog" class="mr-2" />
        {{ $t('meuPlano.managePlan') }}
      </VBtn>
    </template>

    <template v-else>
      <VCard class="pa-8 text-center rounded-lg" elevation="0">
        <VAvatar color="#FFF3E0" size="80" class="mx-auto mb-4">
          <VIcon icon="mdi-alert-circle" color="#FF9800" size="48" />
        </VAvatar>
        <h3 class="text-h5 font-weight-bold mb-2 text-grey-darken-3">{{ $t('meuPlano.noActivePlan') }}</h3>
        <p class="text-body-1 text-grey-darken-1">{{ $t('meuPlano.noActivePlanDescription') }}</p>
      </VCard>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { getErrorMessage } from '@/common/error.utils'
import { useI18n } from 'vue-i18n'
import stripeService from '@/services/stripe/stripe-service'

const { t, locale } = useI18n()
const router = useRouter()

const planoInfo = ref<any>(null)
const loading = ref(true)
const loadingManage = ref(false)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return locale.value === 'pt'
    ? date.toLocaleDateString('pt-BR')
    : date.toLocaleDateString('en-US')
}

const handleGerenciarPlano = async () => {
  loadingManage.value = true
  try {
    const return_url  = 'https://fit-certify-admin.vercel.app/Atleta-Screens/meuPlano'
    const response = await stripeService.gerenciarPlano(return_url)
    window.location.href = response.data.url
  } catch (error) {
    toast.error(t('meuPlano.manageError', { error: getErrorMessage(error, t('meuPlano.unknownError')) }))
    loadingManage.value = false
  }
}

const loadSubscriptionInfo = async () => {
  loading.value = true
  try {
    const response = await stripeService.getInfoPlano()
    planoInfo.value = response.data
  } catch (error) {
    toast.error(t('meuPlano.loadError', { error: getErrorMessage(error, t('meuPlano.unknownError')) }))
    planoInfo.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadSubscriptionInfo()
})
</script>
