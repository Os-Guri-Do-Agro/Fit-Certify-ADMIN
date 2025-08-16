<template>
  <VRow
    class="h-100 d-flex flex-column flex-md-row ma-0 pa-0 overflow-hidden fill-height" no-gutters
  >
    <!-- DIV DA ESQUERDA -->
    <VCol class="pa-0 ma-0" md="4" style="background-color: #00c6fe">
      <VRow class="w-100 h-100 pa-0 ma-0 flex-column" no-gutters>
        <VCol class="pa-0 ma-0 flex-fill" cols="12">
          <RouterLink
            class="d-flex w-100 h-100 align-end justify-center justify-md-start mt-5 mt-md-0 pb-15"
            to="/"
          >
            <v-img
              alt="Logo"
              class="mx-5 mx-lg-15"
              cover
              max-width="200"
              src="../assets/Login/logo-fit.png"
            />
          </RouterLink>
        </VCol>

        <VCol
          class="pa-0 ma-0 d-flex text-center text-md-start flex-column align-center flex-fill"
          cols="12"
        >
          <h1
            class="mx-5 mx-lg-15 text-white text-h5 text-md-h4 font-weight-medium font-italic"
            style="
              font-family:
                DM Sans,
                sans-serif;
            "
          >
            {{ titleStep[step - 1] }}
          </h1>
          <p
            class="mx-5 mx-lg-15 text-white text-center text-md-start text-h6 text-md-h5 font-weight-regular mt-5 mb-10"
            style="
              font-family:
                DM Sans,
                sans-serif;
              line-height: 36px;
            "
          >
            {{ textStep[step - 1] }}
          </p>
        </VCol>
      </VRow>
    </VCol>

    <!-- DIV DA DIREITA -->
    <VCol class="h-100 d-flex align-center pa-0 ma-0" md="8">
      <v-container class="d-flex ga-10 align-top flex-column fill-height pa-0">
        <VStepper
          v-model="step"
          class="d-flex flex-column h-100 w-100 justify-space-between"
          :items="item"
        >
          <template #item.1>
            <CadastroBasico />
          </template>

          <template #item.2>
            <CadastroSaude />
          </template>

          <template #item.3>
            <CadastroSaude02 />
          </template>

         <template #actions="{ next, prev }">
            <div
              class="d-flex justify-space-between w-100 px-6 mb-5 flex-column-reverse flex-md-row align-center ga-3"
            >
              <VBtn
                class="w-100"
                height="43px"
                max-width="237px"
                style="color: #00c6fe"
                variant="outlined"
                :disabled="step === 1 ? true : false"

                @click="prev"
              >
                Voltar
              </VBtn>
              <VBtn
                class="text-white w-100"
                height="43px"
                max-width="237px"
                :style="step === 3 ? 'background-color:#88ce0d' : 'background-color: #00c6fe'"
                 @click="handleNext(next)" >
                 {{ step !== 3 ? 'Próximo' : 'Enviar Formulário' }}
              </VBtn>
            </div>
          </template>
        </VStepper>
      </v-container>
    </VCol>
  </VRow>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CadastroBasico from '../components/cadastros/cadastroBasico.vue'
import CadastroSaude02 from '../components/cadastros/cadastroSaude02.vue'
import CadastroSaude from '../components/cadastros/CadastroSaude.vue'

const step = ref(1)
const router = useRouter()


const handleNext = (next) => {
  if (step.value === 3) {

    router.push('/registerPlanos') 
  } else {
    next()
  }
}

const item = [
  'Cadastro Básico',
  'Cadastro Saúde',
  'Cadastro Saude 2'
]

const titleStep = [
  'Comece agora sua jornada com mais saúde e performance.',
  '',
  '',
  'Comece agora sua jornada com mais saúde e performance.',
]

const textStep = [
  'Criar sua conta na FitCertify365 é rápido, seguro e gratuito. Com ela, você poderá emitir certificados, acompanhar seus marcadores de saúde e aproveitar benefícios exclusivos no nosso marketplace.',
  'Precisamos desses dados para compor seu perfil de saúde. Nenhuma informação será compartilhada sem sua autorização.',
  'Se você já realizou exames recentemente, pode anexar para agilizar sua avaliação.Também é possível integrar com dados de aplicativos ou dispositivos como smartwatch.',
  'Criar sua conta na FitCertify365 é rápido, seguro e gratuito.Com ela, você poderá validar certificados, acompanhar seus marcadores de saúde e aproveitar benefícios exclusivos no nosso marketplace.',
]
</script>




<style scoped>
.teste{
  background-color: red;
}
label,
h2 {
  font-family: 'DM Sans', sans-serif;
}

</style>
