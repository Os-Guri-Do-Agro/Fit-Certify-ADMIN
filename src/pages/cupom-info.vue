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
                  Sistema de Cupons FitCertify365
                </h1>
                <p class="text-h6 text-white opacity-90">
                  Informações completas sobre nosso programa de descontos
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
            <span class="text-white">Como Gerar um Cupom</span>
          </VCardTitle>
          <VCardText class="pa-6">
            <div class="info-list">
              <div class="info-item">
                <VIcon icon="mdi-plus-circle" color="blue" class="mr-3" />
                <div>
                  <strong>Toque no botão "Gerar Cupom" na tela principal</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-auto-fix" color="blue" class="mr-3" />
                <div>
                  <strong>O sistema criará automaticamente um código único</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-calendar-check" color="blue" class="mr-3" />
                <div>
                  <strong>O cupom terá validade e limite de uso definidos</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-share" color="blue" class="mr-3" />
                <div>
                  <strong>Você pode compartilhar o código com todos</strong>
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
            <span class="text-white">Informações do Cupom</span>
          </VCardTitle>
          <VCardText class="pa-6">
            <div class="info-list">
              <div class="info-item">
                <VIcon icon="mdi-barcode" color="blue" class="mr-3" />
                <div>
                  <strong>Código: Sequência única para identificação</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-percent" color="blue" class="mr-3" />
                <div>
                  <strong>Desconto: Porcentagem aplicada no valor da assinatura</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-calendar-clock" color="blue" class="mr-3" />
                <div>
                  <strong>Validade: Data limite para uso do cupom</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-counter" color="blue" class="mr-3" />
                <div>
                  <strong>Limite de uso: Quantidade máxima de resgates</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-chart-line" color="blue" class="mr-3" />
                <div>
                  <strong>Utilizações: Quantas vezes já foi usado</strong>
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
            <span class="text-white">Regras de Uso</span>
          </VCardTitle>
          <VCardText class="pa-6">
            <div class="info-list">
              <div class="info-item">
                <VIcon icon="mdi-credit-card-check" color="blue" class="mr-3" />
                <div>
                  <strong>Válido apenas após confirmar pagamento</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-close-circle" color="blue" class="mr-3" />
                <div>
                  <strong>Não pode ser combinado com outras promoções</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-check-decagram" color="blue" class="mr-3" />
                <div>
                  <strong>Só é válido para a FitCertify365</strong>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-calendar-alert" color="blue" class="mr-3" />
                <div>
                  <strong>Cupom deve estar dentro da validade</strong>
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
            <span class="text-white">Suporte e Contato</span>
          </VCardTitle>
          <VCardText class="pa-6">
            <div class="info-list">
              <div class="info-item">
                <VIcon icon="mdi-email" color="blue" class="mr-3" />
                <div>
                  <strong>Email</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    atendimento@fitcertify365.com
                  </p>
                </div>
              </div>

              <div class="info-item">
                <VIcon icon="mdi-phone" color="blue" class="mr-3" />
                <div>
                  <strong>Telefone</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    0800 123 4567
                  </p>
                </div>
              </div>
              <div class="info-item" style="cursor: pointer;" @click="$router.push('/centralAjuda')">
                <VIcon icon="mdi-help-circle-outline" color="blue" class="mr-3" />
                <div>
                  <strong>Central de Ajuda</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    Acesse nossa central de ajuda completa
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
        Perguntas Frequentes
      </VCardTitle>
      <VCardText class="pa-0">
        <VExpansionPanels variant="accordion">
          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-help" class="mr-3" />
              Como criar um cupom de desconto?
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              Para criar um cupom, acesse sua área pessoal, vá até a seção "Indicações" e clique em "Gerar Cupom". 
              O sistema criará automaticamente um cupom com 10% de desconto válido por 2 anos.
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-help" class="mr-3" />
              Posso criar mais de um cupom?
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              Não, cada usuário pode ter apenas um cupom ativo por vez. Para criar um novo cupom, 
              entre em contato com nosso suporte.
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-help" class="mr-3" />
              O que acontece quando o cupom expira?
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              Cupons expirados não podem mais ser utilizados. Entre em contato com o suporte 
              para solicitar a renovação do seu cupom.
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-help" class="mr-3" />
              Como acompanhar o uso do meu cupom?
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              Na sua área de cupons, você pode ver quantas vezes seu cupom foi utilizado 
              e quantos usos ainda restam do limite máximo.
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