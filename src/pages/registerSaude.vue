<template>
  <VRow class="h-100 d-flex flex-column flex-md-row ma-0 pa-0">


    
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
                Precisamos desses dados para compor seu perfil de saúde.
                Nenhuma informação será compartilhada sem sua autorização.
            </p>

        </VCol>
      </VRow>
    </VCol>



    <!--DIV DA DIREITA-->
    <VCol class="h-100 d-flex pa-0 ma-0"  md="8">
        <VRow class="pa-0 ma-0 fill-md-height mt-15">
            <v-container class="d-flex align-top mx-md-5 flex-column flex-md-row">


            <VCol class="d-flex ma-0 pa-0"  md="6">
                <v-row class="d-flex " >
                    <v-col cols="12">
                <h2 class="text-start text-h5 font-weight-bold mb-5" style="color: #88CE0D;">2. Histórico de Saúde</h2>
                <div class="mb-5"><span class="text-black font-weight-medium">Já foi diagnosticado com alguma das condições abaixo?</span></div>
                        <v-checkbox
                            v-for="(item, index) in condicoes"
                            :key="index"
                            v-model="selecionados"
                            :label="item"
                            :value="item"
                            hide-details
                            density="compact"
                            color="success"
                        />

                        <VRow>
                            <VCol cols="12">
                        <div class="mt-5 d-flex flex-column">
                            <span class="text-black">Outras condições médicas:</span>
                            <v-textarea class="text-black" no-resize rows="2" color="black" variant="outlined"></v-textarea>
                        </div>
                            </VCol>


                            <VCol cols="12">
                        <div class="mt-5 d-flex flex-column">
                            <span class="text-black">Toma algum medicamento contínuo? Se sim, qual?</span>
                            <v-textarea class="text-black custom-textarea" rows="2"  no-resize max-height="20px" color="black" variant="outlined"></v-textarea>
                        </div>
                            </VCol>
                        </VRow>

                    </v-col>
                </v-row>
            </VCol>






            
            <VCol class="d-flex" md="6">
                <v-row class="d-flex h-100" >
                    <v-col class="h-100" cols="12">
                <h2 class="text-start text-h5 font-weight-bold mb-5" style="color: #88CE0D;">3. Sinais e Sintomas Recentes</h2>
                <div class="mb-5"><span class="text-black font-weight-medium">Já foi diagnosticado com alguma das condições abaixo?</span></div>
                        <v-checkbox
                            v-for="(item, index) in sintomas"
                            :key="index"
                            v-model="selecionados"
                            :label="item"
                            :value="item"
                            hide-details
                            density="compact"
                            color="success"
                        />

                        <div class="mt-7">
                            <h2 class="text-start text-h5 font-weight-bold mb-7" style="color: #88CE0D;">4. Histórico Esportivo</h2>
                            <VRow>
                                <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="">Objetivo com a atividade física:</label><VTextField placeholder="Saúde geral" variant="outlined"/></VCol>
                                <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="">Já participou de provas antes?</label><VTextField placeholder="Sim" variant="outlined"/></VCol>
                                <VCol class="my-0 py-0 font-weight-medium" cols="12" lg="6"><label for="">Se sim, qual a última?</label><VTextField variant="outlined"/></VCol>
                                <VCol class="my-0 py-0 font-weight-medium d-flex align-center" cols="12" lg="6"><v-btn class="text-white w-100" height="56px" to="/registerSaude02" style="background-color: #00C6FE;">Próximo</v-btn></VCol>
                            </VRow>
                        </div>

                    </v-col>
                </v-row>
            </VCol>
            </v-container>
        </VRow>
        
    </VCol>
  </VRow>
</template>



<script setup>
import { ref } from 'vue'

const condicoes = [
  'Hipertensão',
  'Diabetes',
  'Asma',
  'Colesterol alto',
  'Problemas cardíacos',
  'Doenças renais',
  'Problemas respiratórios',
  'Nenhuma das anteriores'
]

const sintomas = [
    'Dor no peito ao esforço',
    'Falta de ar com atividades leves',
    'Tontura ou desmaios',
    'Palpitações',
    'Inchaço nas pernas',
    'Nenhum desses'
]

const selecionados = ref([])
</script>

<style lang="">
    
</style>


