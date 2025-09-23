<template>
  <VRow class="h-100 d-flex flex-column flex-md-row ma-0 pa-0 overflow-hidden">
    <!-- HEADER -->
    <VCol class="pa-0 ma-0" md="12" style="background-color: #00c6fe">
      <VRow class="pa-0 ma-0">
        <VCol class="pa-0 ma-0 d-flex justify-center" cols="12">
          <v-container class="mb-5 mb-md-10 pa-0 ma-0 px-6 px-5 px-md-10" max-width="150vh">
            <div class="d-flex align-center justify-center py-10">
              <v-img
                src="../assets/Login/logo-fit.png"
                max-width="200"
                alt="Logo"
                style="cursor: pointer"
                @click="$router.push('/')"
              ></v-img>
            </div>
            <div class="d-flex justify-center px-md-10 py-5 py-md-10">
              <h1 class="text-h5 text-md-h3 font-weight-bold text-center text-white mb-8">
                Processo de Exclusão de Conta
              </h1>
            </div>
          </v-container>
        </VCol>
      </VRow>
    </VCol>

    <!-- CONTEÚDO -->
    <VCol class="d-flex pa-0 ma-0 justify-center" md="12">
      <v-container class="d-flex align-center justify-center mb-5 mb-md-10 pa-0 ma-0" max-width="150vh">
        <div class="d-flex">
          <div class="bg-grey-lighten-5 w-100">

            <!-- SEÇÃO 1 - INTRODUÇÃO -->
            <div class="d-flex mt-10 mx-md-10">
              <v-container class="px-6 px-5 px-md-10">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  1. Sobre a Exclusão de Conta
                </h2>

                <p class="my-4 text-body-1">
                  A <strong>FitCertify365</strong> respeita o direito dos usuários de solicitar a exclusão de suas contas e dados pessoais, em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD)</strong> e demais legislações aplicáveis.
                </p>

                <p class="my-4 text-body-1">
                  Este documento explica como funciona o processo de exclusão de conta, quais dados são removidos e os prazos envolvidos.
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 2 - COMO SOLICITAR -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  2. Como Solicitar a Exclusão
                </h2>

                <p class="my-4 text-body-1">
                  Para solicitar a exclusão de sua conta, você pode:
                </p>

                <ol class="pl-6 my-4 text-body-1">
                  <li class="mb-2">
                    Acessar a página de <strong>Configurações</strong> em sua conta
                  </li>
                  <li class="mb-2">
                    Navegar até <strong>settings/deleteAccount</strong>
                  </li>
                  <li class="mb-2">
                    Clicar no botão <strong>"Deletar Conta"</strong>
                  </li>
                  <li class="mb-2">
                    Confirmar sua solicitação no diálogo de confirmação
                  </li>
                </ol>

                <p class="my-4 text-body-1">
                  Alternativamente, você pode enviar uma solicitação por e-mail para <strong>desenvolvimento@fitcertify365.com</strong> com o assunto "Solicitação de Exclusão de Conta".
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 3 - PROCESSO -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  3. Processo de Exclusão
                </h2>

                <p class="my-4 text-body-1">
                  Após receber sua solicitação, seguimos o seguinte processo:
                </p>

                <div class="my-6">
                  <h3 class="text-h6 font-weight-bold mb-3" style="color: #00c6fe">
                    Etapa 1: Verificação (1-2 dias úteis)
                  </h3>
                  <p class="text-body-1 ml-4">
                    Verificamos a identidade do solicitante e validamos a solicitação para garantir a segurança da conta.
                  </p>
                </div>

                <div class="my-6">
                  <h3 class="text-h6 font-weight-bold mb-3" style="color: #00c6fe">
                    Etapa 2: Período de Carência (30 dias)
                  </h3>
                  <p class="text-body-1 ml-4">
                    Sua conta será desativada, mas os dados permanecerão armazenados por 30 dias. Durante este período, você pode cancelar a solicitação e reativar sua conta.
                  </p>
                </div>

                <div class="my-6">
                  <h3 class="text-h6 font-weight-bold mb-3" style="color: #00c6fe">
                    Etapa 3: Exclusão Definitiva
                  </h3>
                  <p class="text-body-1 ml-4">
                    Após o período de carência, todos os seus dados pessoais serão permanentemente removidos de nossos sistemas.
                  </p>
                </div>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 4 - DADOS EXCLUÍDOS -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  4. Dados que Serão Excluídos
                </h2>

                <p class="my-4 text-body-1">
                  A exclusão da conta resultará na remoção permanente dos seguintes dados:
                </p>

                <ul class="pl-6 my-4 text-body-1">
                  <li>Informações pessoais (nome, e-mail, telefone)</li>
                  <li>Dados de saúde e fitness armazenados</li>
                  <li>Histórico de atividades e exercícios</li>
                  <li>Preferências e configurações da conta</li>
                  <li>Dados de integração com dispositivos wearables</li>
                  <li>Histórico de consultas e interações médicas</li>
                  <li>Arquivos e documentos enviados</li>
                </ul>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 5 - DADOS MANTIDOS -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  5. Dados que Podem Ser Mantidos
                </h2>

                <p class="my-4 text-body-1">
                  Por questões legais, regulatórias ou de segurança, alguns dados podem ser mantidos por períodos específicos:
                </p>

                <ul class="pl-6 my-4 text-body-1">
                  <li>Registros de transações financeiras (conforme legislação fiscal)</li>
                  <li>Logs de segurança e auditoria (anonimizados)</li>
                  <li>Dados necessários para cumprimento de obrigações legais</li>
                  <li>Informações agregadas e estatísticas (sem identificação pessoal)</li>
                </ul>

                <p class="my-4 text-body-1">
                  Estes dados são mantidos apenas pelo tempo necessário e em conformidade com as leis aplicáveis.
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 6 - BACKUP DOS DADOS -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  6. Download dos Seus Dados
                </h2>

                <p class="my-4 text-body-1">
                  Antes da exclusão definitiva, você tem o direito de solicitar uma cópia dos seus dados pessoais:
                </p>

                <ul class="pl-6 my-4 text-body-1">
                  <li>Solicite o download durante o período de carência de 30 dias</li>
                  <li>Os dados serão fornecidos em formato estruturado e legível</li>
                  <li>O download estará disponível por 7 dias após a solicitação</li>
                  <li>Entre em contato conosco em <strong>desenvolvimento@fitcertify365.com</strong> para solicitar</li>
                </ul>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 7 - CANCELAMENTO -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  7. Cancelamento da Solicitação
                </h2>

                <p class="my-4 text-body-1">
                  Durante o período de carência de 30 dias, você pode cancelar a solicitação de exclusão:
                </p>

                <ul class="pl-6 my-4 text-body-1">
                  <li>Faça login em sua conta (se ainda estiver no período de carência)</li>
                  <li>Ou envie um e-mail para <strong>atendimento@fitcertify365.com</strong></li>
                  <li>Sua conta será reativada em até 24 horas</li>
                  <li>Todos os dados serão restaurados ao estado anterior</li>
                </ul>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 8 - CONSEQUÊNCIAS -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  8. Consequências da Exclusão
                </h2>

                <p class="my-4 text-body-1">
                  <strong>ATENÇÃO:</strong> A exclusão da conta é irreversível após o período de carência. As consequências incluem:
                </p>

                <ul class="pl-6 my-4 text-body-1">
                  <li>Perda permanente de todos os dados de saúde e fitness</li>
                  <li>Cancelamento automático de assinaturas ativas</li>
                  <li>Impossibilidade de recuperar histórico de atividades</li>
                  <li>Perda de acesso a consultas médicas anteriores</li>
                  <li>Necessidade de criar nova conta para usar novamente o serviço</li>
                </ul>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 9 - CONTATO -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  9. Dúvidas e Suporte
                </h2>

                <p class="my-4 text-body-1">
                  Para dúvidas sobre o processo de exclusão de conta ou para solicitar suporte:
                </p>

                <div class="my-4 pa-4 bg-blue-lighten-5 rounded">
                  <p class="text-body-1 mb-2">
                    📧 <strong>E-mail:</strong> atendimento@fitcertify365.com
                  </p>
                  <p class="text-body-1 mb-2">
                    🕒 <strong>Horário de Atendimento:</strong> Segunda a Sexta, 9h às 18h
                  </p>
                  <p class="text-body-1">
                    ⏱️ <strong>Tempo de Resposta:</strong> Até 48 horas úteis
                  </p>
                </div>

                <p class="my-4 text-body-1">
                  Nossa equipe está pronta para esclarecer qualquer dúvida sobre o processo de exclusão e seus direitos como usuário.
                </p>
              </v-container>
            </div>

          </div>
        </div>
      </v-container>
    </VCol>
  </VRow>
</template>

<script setup>
// Página institucional - sem lógica complexa necessária
</script>
