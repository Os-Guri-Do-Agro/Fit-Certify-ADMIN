<template>
  <div class="pa-4">
    <template v-if="loading">
      <!-- Header Skeleton -->
      <VCard color="#00C6FE" class="text-center pa-8 mb-4">
        <VSkeletonLoader type="heading" class="mx-auto" />
      </VCard>

      <!-- Info Section Skeleton -->
      <VCard class="pa-6">
        <VSkeletonLoader type="list-item-avatar-two-line@5" />
      </VCard>
    </template>

    <template v-else-if="planoInfo">
      <!-- Header -->
      <VCard color="#00C6FE" class="text-center pa-8 mb-4">
        <h1 class="text-h4 font-weight-bold text-white mb-2">
          {{ planoInfo.plan?.name }}
        </h1>
        <div class="text-h3 font-weight-bold text-white">
          R$ {{ planoInfo.items?.[0]?.pricing_scheme?.price ? (planoInfo.items[0].pricing_scheme.price / 100).toFixed(2) : '0,00' }}
        </div>
      </VCard>

      <!-- Info Section -->
      <VCard class="pa-6">
        <VList>
          <!-- Duração -->
          <VListItem class="px-0">
            <template #prepend>
              <VIcon icon="mdi-clock-outline" color="#00C6FE" size="24" />
            </template>
            <VListItemTitle class="text-body-2 text-grey-600">{{ $t('meuPlano.duration') }}</VListItemTitle>
            <VListItemSubtitle class="text-h6 font-weight-bold text-black">
              {{ planoInfo.plan?.interval_count }} {{ planoInfo.plan?.interval === 'year' ? $t('meuPlano.year') : $t('meuPlano.month') }}
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-3" />

          <!-- Assinado em -->
          <VListItem class="px-0">
            <template #prepend>
              <VIcon icon="mdi-calendar-check" color="#00C6FE" size="24" />
            </template>
            <VListItemTitle class="text-body-2 text-grey-600">{{ $t('meuPlano.subscribedOn') }}</VListItemTitle>
            <VListItemSubtitle class="text-h6 font-weight-bold text-black">
              {{ planoInfo.start_at ? formatDate(planoInfo.start_at) : $t('meuPlano.notAvailable') }}
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-3" />

          <!-- Próxima Cobrança -->
          <VListItem class="px-0">
            <template #prepend>
              <VIcon icon="mdi-credit-card-clock" color="#00C6FE" size="24" />
            </template>
            <VListItemTitle class="text-body-2 text-grey-600">{{ $t('meuPlano.nextBilling') }}</VListItemTitle>
            <VListItemSubtitle class="text-h6 font-weight-bold text-black">
              {{ planoInfo.next_billing_at ? formatDate(planoInfo.next_billing_at) : $t('meuPlano.notAvailable') }}
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-3" />

          <!-- Método de Pagamento -->
          <VListItem class="px-0">
            <template #prepend>
              <VIcon icon="mdi-credit-card" color="#00C6FE" size="24" />
            </template>
            <VListItemTitle class="text-body-2 text-grey-600">{{ $t('meuPlano.paymentMethod') }}</VListItemTitle>
            <VListItemSubtitle class="text-h6 font-weight-bold text-black">
              {{ planoInfo.card ? `${planoInfo.card.brand} •••• ${planoInfo.card.last_four_digits}` : planoInfo.payment_method || $t('meuPlano.notAvailable') }}
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-3" />

          <!-- Status -->
          <VListItem class="px-0">
            <template #prepend>
              <VIcon :icon="planoInfo.status === 'active' ? 'mdi-check-circle' : 'mdi-alert-circle'"
                :color="planoInfo.status === 'active' ? '#88CE0D' : '#FF4444'" size="24" />
            </template>
            <VListItemTitle class="text-body-2 text-grey-600">{{ $t('meuPlano.status') }}</VListItemTitle>
            <VListItemSubtitle class="text-h6 font-weight-bold"
              :class="planoInfo?.status === 'active' ? 'text-green' : 'text-red'">
              {{ $t(`meuPlano.statusTypes.${planoInfo.status}`) }}
            </VListItemSubtitle>
          </VListItem>
        </VList>
      </VCard>
    </template>

    <template v-else>
      <VCard class="pa-8 text-center">
        <VIcon icon="mdi-alert-circle" color="warning" size="64" class="mb-4" />
        <h3 class="text-h5 font-weight-bold mb-2">{{ $t('meuPlano.noActivePlan') }}</h3>
        <p class="text-body-1 text-grey">{{ $t('meuPlano.noActivePlanDescription') }}</p>
      </VCard>
    </template>

    <VBtn v-if="planoInfo && planoInfo.status !== 'canceled'" color="error" variant="outlined" class="mt-4 w-100" size="large"
      @click="showCancelModal = true">
      <VIcon icon="mdi-cancel" class="mr-2" />
      {{ $t('meuPlano.cancelPlan') }}
    </VBtn>

    <VDialog v-model="showCancelModal" max-width="400">
      <VCard class="pa-6 text-center">
        <VIcon icon="mdi-alert-circle" color="error" size="48" class="mb-4" />

        <VCardTitle class="text-h5 font-weight-bold text-error mb-4">
          {{ $t('meuPlano.cancelPlanTitle') }}
        </VCardTitle>

        <VCardText class="text-body-1 mb-4">
          {{ $t('meuPlano.cancelPlanMessage') }}
        </VCardText>

        <VAlert color="warning" variant="tonal" class="mb-4">
          <div class="text-body-2">{{ $t('meuPlano.timeRemaining') }}</div>
        </VAlert>

        <VCardActions class="justify-center gap-3">
          <VBtn variant="outlined" color="primary" @click="showCancelModal = false">
            {{ $t('meuPlano.keepPlan') }}
          </VBtn>
          <VBtn color="error" :loading="loading" @click="handleCancelarPlano">
            {{ loading ? $t('meuPlano.canceling') : $t('meuPlano.confirmCancel') }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import pagarmeService from '@/services/pagarme/pagarme-service'
import { getErrorMessage } from '@/common/error.utils'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const router = useRouter()

const planoInfo = ref<any>(null)
const loading = ref(true)
const loadingCancel = ref(false)
const showCancelModal = ref(false)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return locale.value === 'pt' 
    ? date.toLocaleDateString('pt-BR')
    : date.toLocaleDateString('en-US')
}

const handleCancelarPlano = async () => {
  if (!planoInfo.value?.id) return

  loading.value = true
  try {
    await pagarmeService.cancelAtletaSubscriptionPagarme(planoInfo.value.id)
    toast.success(t('meuPlano.cancelSuccess'))
    showCancelModal.value = false
    await loadSubscriptionInfo()
  } catch (error) {
    toast.error(t('meuPlano.cancelError', { error: getErrorMessage(error, t('meuPlano.unknownError')) }))
  } finally {
    loading.value = false
  }
}

const loadSubscriptionInfo = async () => {
  loading.value = true
  try {
    const response = await pagarmeService.getInfoSubscription()
    planoInfo.value = response.data.subscriptions[0]
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
