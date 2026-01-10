<template>
  <VRow class="h-100 d-flex flex-column flex-md-row ma-0 pa-0 overflow-hidden fill-height" no-gutters>
    <!-- Formulário de Pagamento -->
    <VCol class="h-100 d-flex align-center pa-0 ma-0" :md="5" :cols="12" style="background: #f8f9fa;">
      <div class="d-flex flex-column h-100 w-100 justify-center px-4 px-md-8 overflow-y-auto">
        <div class="mb-6">
          <div class="d-flex align-center ga-3 justify-center justify-md-start">
            <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
              <v-icon color="white" size="20">mdi-credit-card</v-icon>
            </div>
            <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
              Finalizar Pagamento
            </h2>
          </div>
        </div>

        <v-form class="w-100" @submit.prevent="finalizarPagamento" ref="formRef">
          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <VTextField v-model="formData.nome" label="Nome Completo*" placeholder="Digite seu nome completo"
              :rules="[v => !!v || 'Nome é obrigatório']" variant="outlined" rounded="lg"
              bg-color="white" class="custom-field" />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <VTextField v-model="formData.email" type="email" label="E-mail*" placeholder="seu@email.com"
              :rules="[
                v => !!v || 'E-mail é obrigatório',
                v => /.+@.+\..+/.test(v) || 'E-mail inválido'
              ]" variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <VTextField v-model="formData.cpf" label="CPF*" placeholder="000.000.000-00"
              :rules="[v => !!v || 'CPF é obrigatório']" maxlength="14"
              variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
          </VCol>

          <VRow class="ma-0">
            <VCol cols="4" class="py-0 pl-0 pr-1">
              <VTextField v-model="formData.codigoPais" label="País*" placeholder="+55"
                :rules="[v => !!v || 'Obrigatório']" variant="outlined" rounded="lg"
                bg-color="white" class="custom-field" />
            </VCol>
            <VCol cols="3" class="py-0 px-1">
              <VTextField v-model="formData.codigoArea" label="DDD*" placeholder="11"
                :rules="[v => !!v || 'Obrigatório']" maxlength="2"
                variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
            </VCol>
            <VCol cols="5" class="py-0 pr-0 pl-1">
              <VTextField v-model="formData.numero" label="Número*" placeholder="99999-9999"
                :rules="[v => !!v || 'Obrigatório']" maxlength="10"
                variant="outlined" rounded="lg" bg-color="white" class="custom-field" />
            </VCol>
          </VRow>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <VTextField v-model="cupom" label="Cupom de Desconto (opcional)" placeholder="Digite o cupom"
              variant="outlined" rounded="lg" bg-color="white" class="custom-field">
              <template #append-inner>
                <v-btn size="small" color="#1E88E5" variant="text" @click="validarCupom">
                  Validar Cupom
                </v-btn>
              </template>
            </VTextField>
            <div v-if="cupomValido === true" class="text-success mt-2">
              Cupom válido! Desconto de 10% aplicado.
            </div>
            <div v-else-if="cupomValido === false" class="text-error mt-2">
              Cupom inválido. Tente novamente.
            </div>
          </VCol>

          <div class="d-flex justify-center w-100 mt-6 ga-3">
            <VBtn variant="outlined" height="50px" @click="voltar" rounded="xl"
              style="font-weight: 600; text-transform: none; letter-spacing: 0; flex: 1; max-width: 150px;">
              Voltar
            </VBtn>
            <VBtn class="text-white" height="50px" color="#1E88E5" rounded="xl" elevation="4" type="submit"
              style="font-weight: 600; text-transform: none; letter-spacing: 0; flex: 2; background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);">
              Finalizar Pagamento
              <v-icon end>mdi-check</v-icon>
            </VBtn>
          </div>
        </v-form>
      </div>
    </VCol>

    <!-- Resumo do Plano -->
    <VCol class="pa-0 ma-0" :md="7" :cols="12">
      <div class="h-100 w-100 pa-6 pa-md-10 d-flex flex-column" style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 198, 254, 0.4)); position: relative; overflow: hidden;">
        <div style="position: absolute; width: 400px; height: 400px; border-radius: 50%; background: linear-gradient(135deg, rgba(0, 198, 254, 0.8), rgba(0, 153, 204, 0.6)); top: -150px; right: -150px; filter: blur(1px);"></div>
        <div style="position: absolute; width: 250px; height: 250px; border-radius: 50%; background: linear-gradient(135deg, rgba(136, 206, 13, 0.7), rgba(0, 198, 254, 0.5)); bottom: -50px; left: -80px; filter: blur(1px);"></div>

        <div style="position: relative; z-index: 1;">
          <h2 class="text-white text-h5 text-md-h4 font-weight-bold mb-6" style="font-family: DM Sans, sans-serif; text-shadow: 0 2px 8px rgba(0,0,0,0.15);">
            Resumo do Plano
          </h2>

          <v-card rounded="xl" class="pa-6" style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);">
            <div class="d-flex align-center justify-space-between mb-4">
              <span class="text-h5 font-weight-bold" style="color: #2c3e50;">{{ plano?.nome }}</span>
              <v-chip v-if="plano?.maisPopular" color="#1E88E5" style="font-weight: 600;">
                Mais Popular
              </v-chip>
            </div>

            <p class="text-body-1 mb-6" style="color: #42A5F5;">
              {{ plano?.descricao }}
            </p>

            <v-divider class="my-4" />

            <div class="mb-4">
              <div class="d-flex justify-space-between mb-3">
                <span class="text-body-1" style="color: #2c3e50;">Valor Mensal:</span>
                <span class="text-h6 font-weight-bold" style="color: #2c3e50;">R$ {{ plano?.precoMes?.toFixed(2) }}</span>
              </div>
              <div class="d-flex justify-space-between mb-3">
                <span class="text-body-1" style="color: #2c3e50;">Valor Anual:</span>
                <span class="text-h6 font-weight-bold" style="color: #1E88E5;">R$ {{ plano?.precoAno?.toFixed(2) }}</span>
              </div>
              <div class="d-flex justify-space-between">
                <span class="text-body-1" style="color: #2c3e50;">Duração:</span>
                <span class="text-body-1 font-weight-medium" style="color: #2c3e50;">{{ plano?.duracao }} meses</span>
              </div>
            </div>

            <v-divider class="my-4" />

            <div class="d-flex justify-space-between align-center pa-4" style="background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%); border-radius: 12px;">
              <span class="text-h6 text-white font-weight-bold">Total:</span>
              <span class="text-h4 text-white font-weight-bold">R$ {{ plano?.precoAno?.toFixed(2) }}</span>
            </div>
          </v-card>
        </div>
      </div>
    </VCol>
  </VRow>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import planoService from '@/services/planos/plano-service'
  import stripeService from '@/services/stripe/stripe-service'
  import cupomService from '@/services/cupom/cupom-service'

  const router = useRouter()
  const route = useRoute()
  const cupom = ref(null)
  const cupomValido = ref(null)
  const plano = ref(null)
  const formRef = ref(null)

  const formData = ref({
    nome: '',
    email: '',
    cpf: '',
    codigoPais: '+55',
    codigoArea: '',
    numero: ''
  })

  onMounted(() => {
    infoPlano()
  })

  const infoPlano = async () => {
    try {
      const id = route.query.planoId
      const response = await planoService.getPlanoById(id)
      plano.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  const voltar = () => {
    router.back()
  }

  const finalizarPagamento = async () => {
    const { valid } = await formRef.value.validate()
    if (valid) {
      try {
        const data = {
          price_id: plano.value.priceIdStripe,
            customer: {
              name: formData.value.nome,
              email: formData.value.email,
              document: formData.value.cpf,
              type: 'individual',
              phones: {
                country_code: formData.value.codigoPais,
                area_code: formData.value.codigoArea,
                number: formData.value.numero,
              },
          },
          success_url: 'https://www.youtube.com/?hl=pt&gl=BR',
          cancel_url: 'https://www.linkedin.com/company/totvs/life/vempratotvs/',
          planoId: plano.value.id
        }
        const response = await stripeService.stripeCheckout(data)
        if (response.data.url) {
            window.location.href = response.data.url
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const validarCupom = async () => {
    if (cupom.value) {
      try {
        const response = await cupomService.validarCupom(cupom.value)
        cupomValido.value = !!response.data
      } catch (error) {
        if (error.response?.status === 400) {
          cupomValido.value = false
          return
        }
        throw error
      }
    }
  }
</script>

<style scoped>
label,
h1,
h2,
p {
  font-family: 'DM Sans', sans-serif;
}

:deep(.custom-field .v-field) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

:deep(.custom-field .v-field--focused) {
  border-color: #1E88E5;
  box-shadow: 0 4px 12px rgba(0, 198, 254, 0.2);
}

:deep(.custom-field .v-field--error) {
  border-color: #ff5252;
}

.v-btn {
  transition: all 0.3s ease;
}

.v-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.v-btn:active:not(:disabled) {
  transform: translateY(0);
}
</style>
