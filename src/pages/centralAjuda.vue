<template>
  <div class="pa-4">
    <VCard class="mb-6" color="blue-lighten-1" variant="flat">
      <VCardText class="pa-8">
        <VRow align="center">
          <VCol>
            <div class="d-flex align-center mb-4">
              <VIcon icon="mdi-help-circle" size="48" color="white" class="mr-4" />
              <div>
                <h1 class="text-h3 font-weight-bold text-white mb-2">
                  {{ $t('centralAjuda.title') }}
                </h1>
                <p class="text-h6 text-white opacity-90">
                  {{ $t('centralAjuda.subtitle') }}
                </p>
              </div>
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VCard class="mb-6" elevation="2">
      <VCardTitle class="d-flex align-center pa-6 bg-blue-lighten-5">
        <VIcon icon="mdi-frequently-asked-questions" color="blue" class="mr-3" />
        {{ $t('centralAjuda.faqTitle') }}
      </VCardTitle>
      <VCardText class="pa-0">
        <VExpansionPanels variant="accordion">
          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-certificate" class="mr-3" />
              {{ $t('centralAjuda.faq.q1') }}
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              {{ $t('centralAjuda.faq.a1') }}
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-medical-bag" class="mr-3" />
              {{ $t('centralAjuda.faq.q2') }}
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              {{ $t('centralAjuda.faq.a2') }}
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-doctor" class="mr-3" />
              {{ $t('centralAjuda.faq.q3') }}
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              {{ $t('centralAjuda.faq.a3') }}
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-shield-check" class="mr-3" />
              {{ $t('centralAjuda.faq.q4') }}
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              {{ $t('centralAjuda.faq.a4') }}
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-clock-fast" class="mr-3" />
              {{ $t('centralAjuda.faq.q5') }}
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              {{ $t('centralAjuda.faq.a5') }}
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-repeat" class="mr-3" />
              {{ $t('centralAjuda.faq.q6') }}
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              {{ $t('centralAjuda.faq.a6') }}
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCardText>
    </VCard>

    <VRow>
      <VCol cols="12" md="6">
        <VCard class="h-100" elevation="2">
          <VCardTitle class="d-flex align-center pa-6 bg-green-lighten-5">
            <VIcon icon="mdi-phone" color="green" class="mr-3" />
            {{ $t('centralAjuda.directChannels.title') }}
          </VCardTitle>
          <VCardText class="pa-6">
            <div class="contact-list">
              <div class="contact-item">
                <VIcon icon="mdi-phone" color="green" class="mr-3" />
                <div>
                  <strong>{{ $t('centralAjuda.directChannels.sac') }}</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    {{ $t('centralAjuda.directChannels.sacNumber') }}
                  </p>
                </div>
              </div>
              <div class="contact-item">
                <VIcon icon="mdi-email" color="green" class="mr-3" />
                <div>
                  <strong>{{ $t('centralAjuda.directChannels.email') }}</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    {{ $t('centralAjuda.directChannels.emailAddress') }}
                  </p>
                </div>
              </div>
              <div class="contact-item">
                <VIcon icon="mdi-whatsapp" color="green" class="mr-3" />
                <div>
                  <strong>{{ $t('centralAjuda.directChannels.whatsapp') }}</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    {{ $t('centralAjuda.directChannels.whatsappNumber') }}
                  </p>
                </div>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="6">
        <VCard class="h-100" elevation="2">
          <VCardTitle class="d-flex align-center pa-6 bg-purple-lighten-5">
            <VIcon icon="mdi-handshake" color="blue-lighten-1" class="mr-3" />
            {{ $t('centralAjuda.partnership.title') }}
          </VCardTitle>
          <VCardText class="pa-6">
            <p class="text-body-1 mb-4">
              {{ $t('centralAjuda.partnership.description') }}
            </p>
            <VBtn 
              color="blue-lighten-1" 
              variant="flat" 
              size="large"
              prepend-icon="mdi-email"
              block
              href="https://fitcertify365.com/#/contato"
              target="_blank"
            >
              {{ $t('centralAjuda.partnership.button') }}
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<script setup>
</script>

<style scoped>
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
}

.contact-item > div {
  flex: 1;
}
</style>
