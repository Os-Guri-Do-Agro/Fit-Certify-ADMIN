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
          <VCardTitle class="d-flex align-center pa-6 bg-blue-lighten-5">
            <VIcon icon="mdi-help-circle" color="blue" class="mr-3" />
            Como Funciona
          </VCardTitle>
          <VCardText class="pa-6">
            <div class="info-list">
              <div class="info-item">
                <VIcon icon="mdi-numeric-1-circle" color="blue" class="mr-3" />
                <div>
                  <strong>Criação do Cupom</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    Usuários cadastrados (médicos e atletas) podem gerar um cupom exclusivo de 10% de desconto
                  </p>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-numeric-2-circle" color="blue" class="mr-3" />
                <div>
                  <strong>Compartilhamento</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    O código pode ser compartilhado com pacientes e atletas
                  </p>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-numeric-3-circle" color="blue" class="mr-3" />
                <div>
                  <strong>Aplicação do Desconto</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    Desconto aplicado automaticamente no checkout da plataforma
                  </p>
                </div>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="6">
        <VCard class="h-100" elevation="2">
          <VCardTitle class="d-flex align-center pa-6 bg-orange-lighten-5">
            <VIcon icon="mdi-alert-circle" color="orange" class="mr-3" />
            Regras e Limitações
          </VCardTitle>
          <VCardText class="pa-6">
            <div class="info-list">
              <div class="info-item">
                <VIcon icon="mdi-account-check" color="orange" class="mr-3" />
                <div>
                  <strong>1 Cupom por Usuário</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    Cada usuário pode ter apenas um cupom ativo por vez
                  </p>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-counter" color="orange" class="mr-3" />
                <div>
                  <strong>Limite de Uso</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    Máximo de 999 utilizações por cupom
                  </p>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-calendar-clock" color="orange" class="mr-3" />
                <div>
                  <strong>Validade</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    2 anos a partir da data de criação
                  </p>
                </div>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="6">
        <VCard class="h-100" elevation="2">
          <VCardTitle class="d-flex align-center pa-6 bg-green-lighten-5">
            <VIcon icon="mdi-star-circle" color="green" class="mr-3" />
            Benefícios
          </VCardTitle>
          <VCardText class="pa-6">
            <div class="info-list">
              <div class="info-item">
                <VIcon icon="mdi-percent" color="green" class="mr-3" />
                <div>
                  <strong>10% de Desconto</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    Desconto fixo em todos os serviços da plataforma
                  </p>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-share-variant" color="green" class="mr-3" />
                <div>
                  <strong>Fácil Compartilhamento</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    Compartilhe via WhatsApp, email ou redes sociais
                  </p>
                </div>
              </div>
              <div class="info-item">
                <VIcon icon="mdi-chart-line" color="green" class="mr-3" />
                <div>
                  <strong>Acompanhamento</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    Monitore quantas vezes seu cupom foi utilizado
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
            <VIcon icon="mdi-help-circle-outline" color="purple" class="mr-3" />
            Suporte e Contato
          </VCardTitle>
          <VCardText class="pa-6">
            <div class="info-list">
              <div class="info-item">
                <VIcon icon="mdi-email" color="purple" class="mr-3" />
                <div>
                  <strong>Email</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    atendimento@fitcertify365.com
                  </p>
                </div>
              </div>

              <div class="info-item">
                <VIcon icon="mdi-phone" color="purple" class="mr-3" />
                <div>
                  <strong>Telefone</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    0800 123 4567
                  </p>
                </div>
              </div>
              <div class="info-item" style="cursor: pointer;" @click="$router.push('/centralAjuda')">
                <VIcon icon="mdi-help-circle-outline" color="purple" class="mr-3" />
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