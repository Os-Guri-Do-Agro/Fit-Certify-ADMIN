<template>
  <VRow class="h-100 d-flex flex-column flex-md-row ma-0 pa-0 overflow-hidden">


    
     <!-- DIV DA ESQUERDA -->
      
    <VCol class="pa-0 ma-0"  md="4" style="background-color: #00C6FE;">
      <VRow class="w-100 h-100 pa-0 ma-0 flex-column">
        <VCol class="pa-0 ma-0 flex-fill" cols="12" >
            <RouterLink to="/" class="d-flex w-100 h-100 align-end justify-center justify-md-start mt-5 mt-md-0 pb-15" >
                <v-img
                    src="../assets/Login/logo-fit.png"
                    max-width="200"
                    alt="Logo"
                    cover
                    class="mx-5 mx-lg-15"
                ></v-img>
            </RouterLink>
        </VCol>
        <VCol class="pa-0 ma-0 d-flex text-center text-md-start flex-column align-center flex-fill" cols="12">    
            
            <h1 class="mx-5 mx-lg-15 text-white text-h5 text-md-h4 font-weight-medium font-italic">Comece agora sua jornada com mais saúde e performance.</h1>

            <p class="mx-5 mx-lg-15 text-white text-center text-md-start text-h6 text-md-h5 font-weight-regular mt-5 mb-10 " style="font-family: DM Sans, sans-serif; line-height: 36px;">
                Criar sua conta na FitCertify365 é rápido, seguro e gratuito.Com ela, você poderá validar certificados, acompanhar seus marcadores de saúde e aproveitar benefícios exclusivos no nosso marketplace.
            </p>

        </VCol>
      </VRow>
    </VCol>



    <!--DIV DA DIREITA-->
    <VCol class="h-100 d-flex align-center pa-0 ma-0"  md="8">
        <v-container class="d-flex ga-10 align-top mx-md-5 flex-column">
            <div class="w-100 d-flex align-center flex-column">
                <h2 class="text-center text-h5 font-weight-black mb-5" style="color: #88CE0D; font-family: DM Sans, sans-serif;">
                    Escolha seu plano
                </h2>

                <span class="text-center text-subtitle-1" style="font-family: DM Sans, sans-serif;">Certifique sua saúde com a FitCertify365. Escolha o plano ideal para sua jornada esportiva.</span>
            </div>

            <VRow>
                <VCol cols="12" md="6">
                    <VCard class="pa-7 rounded-xl d-flex flex-column justify-space-between border_Focus" min-height="606.7px">
                        <div class="">
                            <VCardTitle class="font-weight-black text-h6 text-md-h5" style="color: #00B5D8; font-family: DM Sans, sans-serif;" primary-title>Saúde Certificada</VCardTitle>                            
                        </div>

                        <div class="">
                            <v-card-subtitle class="font-weight-black text-h6" style="color: #88CE0D; font-family: DM Sans, sans-serif;">R$ XXX,XX</v-card-subtitle>                            
                        </div>

                           
                        
                        <div class="">
                            <v-list density="compact" class="mt-4">
                                <v-list-item v-for="(item, i) in beneficiosC" :key="i" class="pa-0">
                                    <v-list-item-title style="color: #5F6C7B;">
                                        {{ item }}
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </div>

                        <div class="">
                            <VCardActions>
                                <VBtn class="text-white w-100 text-caption text-md-subtitle-1" max-width="255px" height="44px" style="background-color: #88CE0D;">Assinar Saúde Certificada</VBtn>
                            </VCardActions>
                        </div>

                    </VCard>
                </VCol>




                <VCol cols="12" md="6">
                    <VCard class="pa-7 rounded-xl d-flex flex-column justify-space-between border_Focus" min-height="606.7px">
                        <div class="d-flex align-md-center flex-column flex-md-row">
                            <VCardTitle class="font-weight-black text-h6 text-md-h5" style="color: #00B5D8; font-family: DM Sans, sans-serif;" primary-title>Saúde Ativa</VCardTitle>             <span class="text-caption font-weight-black" style="color: #00B5D8;">⭐ Mais popular</span>     
                        </div>

                        <div class="d-flex flex-column flex-lg-row">
                            <v-card-subtitle class="font-weight-black text-md-h6" style="color: #88CE0D; font-family: DM Sans, sans-serif;">R$ XXX/ano </v-card-subtitle>
                            <v-card-subtitle class="font-weight-black text-md-h6" style="color: #88CE0D; font-family: DM Sans, sans-serif;">(R$ XX,XX/mês)</v-card-subtitle>                                
                        </div>

                           
                        
                        <div class="">
                            <v-list density="compact" class="mt-4">
                                <v-list-item v-for="(item, i) in beneficiosA" :key="i" class="pa-0">
                                    <v-list-item-title style="color: #5F6C7B;">
                                        {{ item }}
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </div>

                        <div class="">
                            <VCardActions>
                                <VBtn to="" class="text-white w-100 text-caption text-md-subtitle-1" max-width="255px" height="44px" style="background-color: #88CE0D;">Assinar Saúde Ativa</VBtn>
                            </VCardActions>
                        </div>

                    </VCard>
                </VCol>
            </VRow>
        </v-container>
        
    </VCol>
  </VRow>
</template>


<style>

    .border_Focus:hover {
        border: 2px solid #00B5D8;
    }
</style>


<script>
export default {
  data() {
    return {
      beneficiosC: [
        '✔️ Conexão com provas parceiras ',
        '✔️ Emissão automática de modelo oficial',
        '✔️ Aplicação ilimitada em diferentes provas durante a validade',
        '✔️ Assinatura digital + QR Code',
        '✔️ Descontos no Marketplace',
        '❌ Acesso ao painel de saúde',
        '❌ Acesso ao painel de saúde',
        '❌ Integração com wearables '
      ],

      beneficiosA: [
        '✔️ Conexão com provas parceiras ',
        '✔️ Emissão automática de modelo oficial',
        '✔️ Aplicação ilimitada em diferentes provas durante a validade',
        '✔️ Assinatura digital + QR Code',
        '✔️ Acesso ao painel de saúde completo',
        '✔️ Monitoramento contínuo',
        '✔️ Alertas inteligentes e histórico',
        '✔️ Integração com apps e dispositivos'
      ]
    }
  }
}


</script>









