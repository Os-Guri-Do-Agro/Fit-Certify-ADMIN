<template>
    <v-row class="fill-height ma-0 pa-0">
        <v-col class="border-md d-flex align-center justify-center flex-column" style="background-color: #22d3ee;"  cols="4">
            <RouterLink to="/">
            <v-img
            max-width="180"
            aspect-ratio="16/9"
            cover
            src="../assets/Login/logo-fit.png"
            ></v-img>
            </RouterLink>

            <h2 class="text-h4 text-white font-italic font-weight-bold" style="max-width: 400px; font-family: DM Sans, sans-serif;">Comece agora sua jornada com mais saúde e performance.</h2>
            <span class="text-white text-h6 mt-5" style="max-width: 400px; font-family: DM Sans, sans-serif;">Criar sua conta na FitCertify365 é rápido, seguro e gratuito.Com ela, você poderá emitir certificados, acompanhar seus marcadores de saúde e aproveitar benefícios exclusivos no nosso marketplace.</span>
        </v-col>
        <v-col cols="8" class="bg-red d-flex ">
    <v-row  >
        <v-col cols="8" > <H1>teste</H1>   <v-text-field placeholder="Teste" label="ola" variant="outlined"></v-text-field></v-col>
        <v-col cols="4">   <H1>CPF</H1>  <v-text-field variant="outlined"></v-text-field></v-col>
        <v-col cols="4">    <v-text-field variant="outlined"></v-text-field></v-col>
        <v-col cols="4">    <v-text-field variant="outlined"></v-text-field></v-col>
        <v-col cols="4">    <v-text-field variant="outlined"></v-text-field></v-col>
        <v-col cols="12">    <v-text-field variant="outlined"></v-text-field></v-col>
    </v-row>

        </v-col>
    </v-row>
</template>