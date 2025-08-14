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
                Se você já realizou exames recentemente, pode anexar para agilizar sua avaliação.Também é possível integrar com dados de aplicativos ou dispositivos como smartwatch.
            </p>

        </VCol>
      </VRow>
    </VCol>



    <!--DIV DA DIREITA-->
    <VCol class="h-100 d-flex align-center pa-0 ma-0"  md="8">
        <v-container class="d-flex ga-10 align-top mx-md-5 flex-column">
            <div class="mt-10 mt-md-0">
                <h2 class="text-start text-h5 font-weight-bold" style="color: #88CE0D;">
                    5. Exames e Dados Complementares
                </h2>
            </div>

            <VRow class="d-flex">
                <v-form class="w-100">
                <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="check">Fez check-up nos últimos 12 meses?</label><v-select
        density="comfortable"
      v-model="checkselect.value.value"
      :error-messages="checkselect.errorMessage.value"
      :items="items"
      id="check"
      placeholder="Sim"
      variant="outlined"
    ></v-select></VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="arquivos">Anexar exames (PDF ou imagem):</label><VFileInput density="comfortable" prepend-icon="" id="arquivos" variant="outlined"/></VCol>
                <VCol class="my-0 py-0 font-weight-medium " cols="12"><label for="app">Possui smartwatch ou app de treino?</label><v-select
        density="comfortable"
      v-model="appselect.value.value"
      :error-messages="appselect.errorMessage.value"
      :items="items"
      id="app"
      placeholder="Sim"
      variant="outlined"
    ></v-select></VCol>
            <div class="">
                <v-checkbox class="font-weight-medium" color="success" label=" Desejo integrar meus dados com a FitCertify365"></v-checkbox>
            </div>
            </v-form>
            </VRow>



            <div class="d-flex flex-column h-100">
                <h2 class="text-start text-h5 font-weight-bold mb-5" style="color: #88CE0D;">
                    6. Declaração
                </h2>
                <v-form class="w-100">
            <v-checkbox
            v-for="(item, index) in declaracoes"
            :key="index"
            v-model="selecionados"
            :label="item"
            :value="item"
            density="compact"
            class="font-weight-medium" color="success" ></v-checkbox>
                </v-form>
                <div class="d-flex justify-center justify-md-start">
                    <v-btn class="text-white w-100 d-flex" height="43px" max-width="237px" to="/registerPlanos" style="background-color: #88CE0D;">Enviar questionário</v-btn>
                </div>

            </div>
        </v-container>
        
    </VCol>
  </VRow>
</template>



<script setup>
  import { ref } from 'vue'
  import { useField, useForm } from 'vee-validate'

  const { handleSubmit } = useForm({
    validationSchema: {

      select (value) {
        if (value) return true

        return 'Select an item.'
      },
    },
  })

  const checkselect = useField('checkselect')
  const appselect = useField('appselect')
  
  const declaracoes = [
    'Declaro que as informações acima são verdadeiras e autorizo a análise para fins de certificação.',
    'Aceito compartilhar meus dados com as organizações dos eventos que eu participar.',
    'Li e concordo com os Termos de Uso e Política de Privacidade.'
  ]

  

  const selecionados = ref([])
 

  const items = ref([
    'Sim',
    'Não'
  ])
  

</script>


<style scoped>
    label, h2 {
        font-family:"DM Sans", sans-serif;
    }
</style>



