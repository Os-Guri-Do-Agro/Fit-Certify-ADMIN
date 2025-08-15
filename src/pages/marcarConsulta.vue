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
            <p class="mx-5 mx-lg-15 text-white text-center text-md-start text-h6 text-md-h5 font-weight-regular mt-5 mb-10 " style="font-family: DM Sans, sans-serif; line-height: 36px;">
                A FitCertify365 conecta você a médicos esportivos de forma rápida, segura e sem sair de casa.
            </p>

        </VCol>
      </VRow>
    </VCol>



    <!--DIV DA DIREITA-->
    <VCol class="h-100 d-flex align-center pa-0 ma-0"  md="8">
        <v-container class="d-flex ga-10 mx-md-5 flex-column">
            <div class="">
                <h2 class="text-center text-h4 font-weight-black mb-5" style="color: #88CE0D; font-family: DM Sans, sans-serif;">
                    Encontre um médico parceiro próximo a você 
                    e agende sua consulta presencial
                </h2>
            </div>

            <VRow>
                <VCol cols="12" md="6">
                        <label for="cep" style="color: #1A156C;">Cep</label><v-text-field
                        v-model="cep.value.value"
                        :counter="9"
                        :error-messages="cep.errorMessage.value"
                        variant="outlined"
                        placeholder="Cep"
                        name="cep"
                        density="comfortable"
    ></v-text-field>
                </VCol>
                <VCol class="d-flex align-center justify-center ga-3 flex-wrap" cols="12" md="6">
                    <VBtn class="w-100 text-white" max-width="237px" height="44.9px" @click="submit" style="background-color: #05DEF0;">Buscar</VBtn>
                    <VBtn class="w-100" max-width="237px" height="44.9px" to="/" style="color: #05DEF0; background-color: #F5FDFC; border: 2px solid;">Já tenho meu médico</VBtn>
                </VCol>
            </VRow>

            <VRow class="d-flex pa-0 ma-0">
                <VCol class="justify-center d-flex flex-column ga-5" cols="12" md="6">


                    <VCard class="w-100 pa-5 rounded-xl" style="background-color: #E7F8F6;">
                        <div class="d-flex flex-column flex-lg-row align-center text-center text-lg-start ga-2">
                            <div class="rounded-circle d-flex flex-column align-center ga-2">
                                <div class="">
                                    <img src="../assets/perfil.png" alt="">
                                </div>
                                <div class="d-flex ga-1">
                                    <VIcon class="cursor-pointer">mdi mdi-instagram</VIcon>
                                    <VIcon class="cursor-pointer">mdi mdi-whatsapp</VIcon>                              
                                </div>
                            </div>
                            

                            <div class="d-flex flex-column">
                                <v-card-title class="text-h5 font-weight-bold">
                                    Nome Sobrenome <br> 
                                    <span class="text-subtitle-1 font-weight-medium">CRM 98379374</span>
                                </v-card-title>


                                    <span class="ml-md-2"><VIcon><span class="mdi mdi-map-marker-outline" style="color: #1A156C;"></span></VIcon> <span class="font-weight-medium">2.4 Km de distância</span></span>
  

                                <VCardText class="font-weight-medium cursor-pointer">
                                    Av. das Americas, 3333 Sl 1312 <br>
                                    Rio de janeiro, RJ, 22631-003
                                </VCardText>        
                            </div>
                        </div>
                    </VCard>






                    <VCard class="w-100 pa-5 rounded-xl" style="background-color: #E7F8F6;">
                        <div class="d-flex flex-column flex-lg-row align-center text-center text-lg-start ga-2">
                            <div class="rounded-circle d-flex flex-column align-center ga-2">
                                <div class="">
                                    <img src="../assets/perfil.png" alt="">
                                </div>
                                <div class="d-flex ga-1">
                                    <VIcon class="cursor-pointer">mdi mdi-instagram</VIcon>
                                    <VIcon class="cursor-pointer">mdi mdi-whatsapp</VIcon>                              
                                </div>
                            </div>
                            

                            <div class="d-flex flex-column">
                                <v-card-title class="text-h5 font-weight-bold">
                                    Nome Sobrenome <br> 
                                    <span class="text-subtitle-1 font-weight-medium">CRM 98379374</span>
                                </v-card-title>


                                    <span class="ml-md-2"><VIcon><span class="mdi mdi-map-marker-outline" style="color: #1A156C;"></span></VIcon> <span class="font-weight-medium">2.4 Km de distância</span></span>
  

                                <VCardText class="font-weight-medium cursor-pointer">
                                    Av. das Americas, 3333 Sl 1312 <br>
                                    Rio de janeiro, RJ, 22631-003
                                </VCardText>        
                            </div>
                        </div>
                    </VCard>

                    <div class="d-flex justify-center ga-4">
                        <div class="" style="width: 12px; height: 12px; background-color: #05DEF0; border-radius: 50%; cursor: pointer;"></div>
                        <div class="" style="width: 12px; height: 12px; background-color: #05DEF0; border-radius: 50%; cursor: pointer;"></div>
                        <div class="" style="width: 12px; height: 12px; background-color: #05DEF0; border-radius: 50%; cursor: pointer;"></div>
                        <div class="" style="width: 12px; height: 12px; background-color: #05DEF0; border-radius: 50%; cursor: pointer;"></div>
                    </div>
                </VCol>

                <VCol cols="6">
                    <div class="">
                        <img class="w-100 cursor-pointer" src="../assets/mapa.jpg" alt="">
                    </div>
                </VCol>
            </VRow>
        </v-container>
        
    </VCol>
  </VRow>
</template>


<script setup>
  import { useField, useForm } from 'vee-validate'

  const { handleSubmit } = useForm({
    validationSchema: {
      phone (value) {
        if (/^[0-9-]{7,}$/.test(value)) return true

        return 'Phone number needs to be at least 7 digits.'
      }
    },
  })

  const cep = useField('cep')

  const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
  })
</script>











