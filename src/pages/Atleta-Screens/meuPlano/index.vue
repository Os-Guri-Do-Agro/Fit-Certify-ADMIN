<template>
  <div class="pa-4">
    <template v-if="!planoInfo">
      <!-- Header Skeleton -->
      <VCard color="#00C6FE" class="text-center pa-8 mb-4">
        <VSkeletonLoader type="heading" class="mx-auto" />
      </VCard>

      <!-- Info Section Skeleton -->
      <VCard class="pa-6">
        <VSkeletonLoader type="list-item-avatar-two-line@5" />
      </VCard>
    </template>

    <template v-else>
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
            <VListItemTitle class="text-body-2 text-grey-600">Duração</VListItemTitle>
            <VListItemSubtitle class="text-h6 font-weight-bold text-black">
              {{ planoInfo.plan?.interval_count }} {{ planoInfo.plan?.interval === 'year' ? 'ano(s)' : 'mês(es)' }}
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-3" />

          <!-- Assinado em -->
          <VListItem class="px-0">
            <template #prepend>
              <VIcon icon="mdi-calendar-check" color="#00C6FE" size="24" />
            </template>
            <VListItemTitle class="text-body-2 text-grey-600">Assinado em:</VListItemTitle>
            <VListItemSubtitle class="text-h6 font-weight-bold text-black">
              {{ planoInfo.start_at ? new Date(planoInfo.start_at).toLocaleDateString('pt-BR') : 'Não disponível' }}
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-3" />

          <!-- Próxima Cobrança -->
          <VListItem class="px-0">
            <template #prepend>
              <VIcon icon="mdi-credit-card-clock" color="#00C6FE" size="24" />
            </template>
            <VListItemTitle class="text-body-2 text-grey-600">Próxima Cobrança:</VListItemTitle>
            <VListItemSubtitle class="text-h6 font-weight-bold text-black">
              {{ planoInfo.next_billing_at ? new Date(planoInfo.next_billing_at).toLocaleDateString('pt-BR') : 'Não disponível' }}
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-3" />

          <!-- Método de Pagamento -->
          <VListItem class="px-0">
            <template #prepend>
              <VIcon icon="mdi-credit-card" color="#00C6FE" size="24" />
            </template>
            <VListItemTitle class="text-body-2 text-grey-600">Método de Pagamento:</VListItemTitle>
            <VListItemSubtitle class="text-h6 font-weight-bold text-black">
              {{ planoInfo.card ? `${planoInfo.card.brand} •••• ${planoInfo.card.last_four_digits}` : planoInfo.payment_method || 'Não disponível' }}
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-3" />

          <!-- Status -->
          <VListItem class="px-0">
            <template #prepend>
              <VIcon :icon="planoInfo.status === 'active' ? 'mdi-check-circle' : 'mdi-alert-circle'"
                :color="planoInfo.status === 'active' ? '#88CE0D' : '#FF4444'" size="24" />
            </template>
            <VListItemTitle class="text-body-2 text-grey-600">Status</VListItemTitle>
            <VListItemSubtitle class="text-h6 font-weight-bold"
              :class="planoInfo?.status === 'active' ? 'text-green' : 'text-red'">
              {{ STATUS_ASSINATURA[planoInfo.status as keyof typeof STATUS_ASSINATURA] || 'Desconhecido' }}
            </VListItemSubtitle>
          </VListItem>
        </VList>
      </VCard>
    </template>

    <VBtn v-if="planoInfo && planoInfo.status !== 'canceled'" color="error" variant="outlined" class="mt-4 w-100" size="large"
      @click="showCancelModal = true">
      <VIcon icon="mdi-cancel" class="mr-2" />
      Cancelar Plano
    </VBtn>

    <VDialog v-model="showCancelModal" max-width="400">
      <VCard class="pa-6 text-center">
        <VIcon icon="mdi-alert-circle" color="error" size="48" class="mb-4" />

        <VCardTitle class="text-h5 font-weight-bold text-error mb-4">
          Cancelar Plano
        </VCardTitle>

        <VCardText class="text-body-1 mb-4">
          Tem certeza que deseja cancelar seu plano? Esta ação não pode ser desfeita e você
          perderá acesso aos benefícios premium.
        </VCardText>

        <VAlert color="warning" variant="tonal" class="mb-4">
          <div class="text-body-2">Tempo restante após cancelamento:</div>
        </VAlert>

        <VCardActions class="justify-center gap-3">
          <VBtn variant="outlined" color="primary" @click="showCancelModal = false">
            Manter Plano
          </VBtn>
          <VBtn color="error" :loading="loading" @click="handleCancelarPlano">
            {{ loading ? 'Cancelando...' : 'Sim, Cancelar' }}
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

const router = useRouter()

const planoInfo = ref<any>(null)
const loading = ref(false)
const showCancelModal = ref(false)

const STATUS_ASSINATURA = {
  active: 'Ativo',
  canceled: 'Cancelado',
  pending: 'Pendente',
  expired: 'Expirado',
  failed: 'Falhou'
}

const handleCancelarPlano = async () => {
  if (!planoInfo.value?.id) return

  loading.value = true
  try {
    await pagarmeService.cancelAtletaSubscriptionPagarme(planoInfo.value.id)
    toast.success('Plano cancelado com sucesso!')
    showCancelModal.value = false
    await loadSubscriptionInfo()
  } catch (error) {
    toast.error('Erro ao cancelar plano')
  } finally {
    loading.value = false
  }
}

const loadSubscriptionInfo = async () => {
  try {
    const response = await pagarmeService.getInfoSubscription()
    planoInfo.value = response.data.subscriptions[0]
  } catch (error) {
    toast.error('Erro ao carregar informações do plano')
  }
}

onMounted(() => {
  loadSubscriptionInfo()
})
</script>
