<template>
  <VRow class="h-100 d-flex flex-column flex-md-row ma-0 pa-0">


    
     <!-- DIV DA ESQUERDA -->
      
    <VCol class="pa-0 ma-0"  md="4" style="background-color: #00C6FE;">
      <VRow class="w-100 h-100 pa-0 ma-0 flex-column">
        <VCol class="pa-0 ma-0 flex-fill" cols="12" >
            <RouterLink to="/" class="d-flex w-100 h-100 align-end justify-center justify-md-start mt-5 pb-15" >
                <v-img
                    src="../assets/Login/logo-fit.png"
                    max-width="180"
                    alt="Logo"
                    cover
                    class="mx-5 mx-lg-15"
                ></v-img>
            </RouterLink>
        </VCol>
        <VCol class="pa-0 ma-0 d-flex text-center text-md-start flex-column align-center flex-fill" cols="12">     
            <h1 class="mx-5 mx-lg-15 text-white text-h5 text-md-h4 font-weight-medium font-italic" style="font-family: DM Sans, sans-serif;">
                Comece agora sua jornada com mais saúde e performance.
            </h1>
            <p class="mx-5 mx-lg-15 text-white text-center text-md-start text-subtitle-1 text-md-h6 font-weight-regular mt-5 mb-10 " style="font-family: DM Sans, sans-serif; line-height: 36px;">
                Criar sua conta na FitCertify365 é rápido, seguro e gratuito. Com ela, você poderá emitir certificados, acompanhar seus marcadores de saúde e aproveitar benefícios exclusivos no nosso marketplace.
            </p>

        </VCol>
      </VRow>
    </VCol>



    <!--DIV DA DIREITA-->
    <VCol class="h-100 d-flex align-center"  md="8">
        
        <VRow class="px-5">
            <VCol class="mb-10 mt-10 mt-md-0" cols="12"><h2 class="text-start text-h5 font-weight-bold" style="color: #88CE0D;">1. Informações Pessoais</h2></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="8"><label for="nomeCompleto">Nome completo:</label><VTextField id="nomeCompleto" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="4"><label for="cpf">CPF</label><VTextField id="cpf" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="4"><label for="telefone">Telefone:</label><VTextField id="telefone" type="tel" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="4"><label for="email">E-mail</label><VTextField id="email" type="email" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="4"><label for="nascimento">Data de nascimento:</label><VTextField id="nascimento" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="6" md="12"><label for="altura">Altura (cm):</label><VTextField id="altura" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="6" md="12"><label for="peso">Peso (kg):</label><VTextField id="peso" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="telefone">Telefone:</label><VTextField id="telefone02" type="tel" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="pratica">Pratica atividade física regularmente?</label><v-select
      v-model="select.value.value"
      :error-messages="select.errorMessage.value"
      :items="items"
      id="pratica"
      placeholder="Sim"
      variant="outlined"
    ></v-select></VCol>
    <VCol class="w-100" cols="12">
        <div
            class="w-100 text-decoration-none d-flex justify-center justify-md-end"
          >
            <v-btn
              to="/registerSaude"
              type="submit"
              class=" font-weight-bold text-white"
              value="outlined"
              width="100%"
              max-width="237px"
              style=" height: 47px; border-radius: 0.375rem; background-color: #00C6FE;"
            >
              Próximo
            </v-btn>
          </div>
    </VCol>
                    
                   
        </VRow>
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

  const select = useField('select')
 

  const items = ref([
    'Sim',
    'Não'
  ])

  const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
  })
</script>


<style scoped>
    label, h2 {
        font-family:"DM Sans", sans-serif;
    }
</style>
