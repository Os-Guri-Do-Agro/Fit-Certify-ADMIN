<template>
  <div class="pa-4">
    <VCard class="mb-6" color="blue-lighten-1" variant="flat">
      <VCardText class="pa-8">
        <VRow align="center">
          <VCol>
            <div class="d-flex align-center mb-4">
              <VIcon icon="mdi-ticket-percent" size="48" color="white" class="mr-4" />
              <div>
                <h1 class="text-h3 font-weight-bold text-white mb-2">
                  {{ $t('cupomInfo.title') }}
                </h1>
                <p class="text-h6 text-white opacity-90">
                  {{ $t('cupomInfo.subtitle') }}
                </p>
              </div>
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VRow>
      <VCol cols="12" md="6">
        <VCard class="h-100" elevation="2">
          <VCardTitle class="d-flex align-center pa-6 bg-blue-lighten-1">
            <VIcon icon="mdi-ticket-percent" color="white" class="mr-3" />
            <span class="text-white">{{ $t('cupomInfo.howToGenerate.title') }}</span>
          </VCardTitle>
          <VCardText class="pa-6">
            <div class="info-list">
              <div class="info-item">
                <VIcon icon="mdi-plus-circle" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.howToGenerate.step1') }}</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-auto-fix" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.howToGenerate.step2') }}</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-calendar-check" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.howToGenerate.step3') }}</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-share" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.howToGenerate.step4') }}</strong>
                </div>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="6">
        <VCard class="h-100" elevation="2">
          <VCardTitle class="d-flex align-center pa-6 bg-blue-lighten-1">
            <VIcon icon="mdi-information" color="white" class="mr-3" />
            <span class="text-white">{{ $t('cupomInfo.couponInfo.title') }}</span>
          </VCardTitle>
          <VCardText class="pa-6">
            <div class="info-list">
              <div class="info-item">
                <VIcon icon="mdi-barcode" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.couponInfo.code') }}</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-percent" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.couponInfo.discount') }}</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-calendar-clock" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.couponInfo.validity') }}</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-counter" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.couponInfo.usageLimit') }}</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-chart-line" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.couponInfo.uses') }}</strong>
                </div>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="6">
        <VCard class="h-100" elevation="2">
          <VCardTitle class="d-flex align-center pa-6 bg-blue-lighten-1">
            <VIcon icon="mdi-check-circle" color="white" class="mr-3" />
            <span class="text-white">{{ $t('cupomInfo.usageRules.title') }}</span>
          </VCardTitle>
          <VCardText class="pa-6">
            <div class="info-list">
              <div class="info-item">
                <VIcon icon="mdi-credit-card-check" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.usageRules.rule1') }}</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-close-circle" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.usageRules.rule2') }}</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-check-decagram" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.usageRules.rule3') }}</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-calendar-alert" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.usageRules.rule4') }}</strong>
                </div>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="6">
        <VCard class="h-100" elevation="2">
          <VCardTitle class="d-flex align-center pa-6 bg-blue-lighten-1">
            <VIcon icon="mdi-help-circle-outline" color="white" class="mr-3" />
            <span class="text-white">{{ $t('cupomInfo.support.title') }}</span>
          </VCardTitle>
          <VCardText class="pa-6">
            <div class="info-list">
              <div class="info-item">
                <VIcon icon="mdi-email" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.support.email') }}</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    {{ $t('cupomInfo.support.emailAddress') }}
                  </p>
                </div>
              </div>

              <div class="info-item">
                <VIcon icon="mdi-phone" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.support.phone') }}</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    {{ $t('cupomInfo.support.phoneNumber') }}
                  </p>
                </div>
              </div>
              <div class="info-item" style="cursor: pointer;" @click="$router.push('/centralAjuda')">
                <VIcon icon="mdi-help-circle-outline" color="blue" class="mr-3" />
                <div>
                  <strong>{{ $t('cupomInfo.support.helpCenter') }}</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    {{ $t('cupomInfo.support.helpCenterDesc') }}
                  </p>
                </div>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VCard class="mt-6" elevation="2">
      <VCardTitle class="d-flex align-center pa-6 bg-grey-lighten-4">
        <VIcon icon="mdi-frequently-asked-questions" color="grey-darken-2" class="mr-3" />
        {{ $t('cupomInfo.faq.title') }}
      </VCardTitle>
      <VCardText class="pa-0">
        <VExpansionPanels variant="accordion">
          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-help" class="mr-3" />
              {{ $t('cupomInfo.faq.q1') }}
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              {{ $t('cupomInfo.faq.a1') }}
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-help" class="mr-3" />
              {{ $t('cupomInfo.faq.q2') }}
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              {{ $t('cupomInfo.faq.a2') }}
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-help" class="mr-3" />
              {{ $t('cupomInfo.faq.q3') }}
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              {{ $t('cupomInfo.faq.a3') }}
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-help" class="mr-3" />
              {{ $t('cupomInfo.faq.q4') }}
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              {{ $t('cupomInfo.faq.a4') }}
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCardText>
    </VCard>
  </div>
</template>

<script setup>
</script>

<style scoped>
.info-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-item {
  display: flex;
  align-items: flex-start;
}

.info-item > div {
  flex: 1;
}
</style>