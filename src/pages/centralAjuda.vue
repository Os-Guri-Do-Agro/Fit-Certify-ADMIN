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
                  Central de Ajuda FitCertify365
                </h1>
                <p class="text-h6 text-white opacity-90">
                  Encontre respostas para suas dúvidas e entre em contato conosco
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
        Perguntas Frequentes
      </VCardTitle>
      <VCardText class="pa-0">
        <VExpansionPanels variant="accordion">
          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-certificate" class="mr-3" />
              O certificado serve para todas as provas?
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              Sim. O certificado de aptidão física emitido pelo FitCertify365 é válido para qualquer competição que exija comprovação de saúde, conforme as diretrizes das autoridades esportivas e médicas. Recomendamos apenas verificar se a organização do evento aceita certificados digitais.
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-medical-bag" class="mr-3" />
              Preciso fazer exames antes?
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              Depende. Alguns usuários já possuem exames recentes e não precisam repetir. Outros podem ser orientados a realizar exames complementares, de acordo com a análise do profissional de saúde responsável. O FitCertify365 conecta você a médicos que seguirão critérios clínicos para garantir sua segurança.
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-doctor" class="mr-3" />
              Quem assina os certificados?
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              Todos os certificados são assinados por médicos registrados no Conselho Regional de Medicina (CRM), com experiência em saúde esportiva e aptidão física. A plataforma garante a verificação e o registro digital da assinatura para sua validade.
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-shield-check" class="mr-3" />
              Como sei se ele é válido?
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              O certificado conta com autenticação digital, número de identificação único e validação online através do QR Code. Qualquer organizador ou terceiro autorizado pode verificar a autenticidade em segundos, acessando o link indicado no documento.
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-clock-fast" class="mr-3" />
              Quanto tempo leva?
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              O processo é rápido. O médico realiza os exames com você no consultório e, se estiver tudo certo, o certificado é emitido na hora, de forma digital e com autenticação válida em todo o território nacional.
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle>
              <VIcon icon="mdi-repeat" class="mr-3" />
              Posso usar o mesmo para várias provas?
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              Sim. O certificado pode ser utilizado em diversas provas, desde que esteja dentro do período de validade definido pelo médico (geralmente entre 3 e 12 meses). Basta apresentá-lo aos organizadores quando solicitado.
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
            Canais Diretos
          </VCardTitle>
          <VCardText class="pa-6">
            <div class="contact-list">
              <div class="contact-item">
                <VIcon icon="mdi-phone" color="green" class="mr-3" />
                <div>
                  <strong>SAC</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    0800-44954994095
                  </p>
                </div>
              </div>
              <div class="contact-item">
                <VIcon icon="mdi-email" color="green" class="mr-3" />
                <div>
                  <strong>E-mail</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    atendimento@fitcertify365.com
                  </p>
                </div>
              </div>
              <div class="contact-item">
                <VIcon icon="mdi-whatsapp" color="green" class="mr-3" />
                <div>
                  <strong>WhatsApp</strong>
                  <p class="text-body-2 text-grey-600 mt-1">
                    (21) 400495694
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
            Quer fazer parte do nosso ecossistema?
          </VCardTitle>
          <VCardText class="pa-6">
            <p class="text-body-1 mb-4">
              Se você é organizador de eventos, médico, clínica ou marca esportiva e quer se conectar à FitCertify365, entre em contato conosco.
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
              Entre em Contato
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