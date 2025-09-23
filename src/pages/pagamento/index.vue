<template>
  <VRow class="d-flex flex-column flex-md-row ma-0 pa-0" no-gutters>
    <!-- DIV PAGAMENTO -->
    <VCol class="d-flex pa-0 ma-0" md="12">
      <div class="w-100 content-scroll">
        <VStepper v-model="step" class="w-100" :items="item">
          <template #item.1>
            <v-container>
              <v-row class="w-100 content-scroll">
                <v-col cols="12" md="7" lg="8">
                  <v-radio-group>
                    <span class="text-h6 text-blue mb-5"
                      >Cartão de Crédito ou Débito</span
                    >
                    <v-radio
                      class="cardBtn pa-2 rounded-xl mb-5"
                      value="cartao"
                      color="blue"
                      style="background-color: #e9f6fe"
                      prepend-icon="mdi-google"
                    >
                      <template v-slot:label>
                        <div class="d-flex ga-3">
                          <span>Adicionar Cartão</span>
                          <v-icon color="blue" size="24"
                            >mdi-credit-card-outline</v-icon
                          >
                        </div>
                      </template>
                    </v-radio>

                    <span class="text-h6 text-blue mb-5">Outros meios:</span>
                    <v-radio
                      class="cardBtn pa-2 rounded-xl mb-5"
                      value="applePay"
                      color="blue"
                      style="background-color: #e9f6fe"
                      prepend-icon="mdi-google"
                    >
                      <template v-slot:label>
                        <div class="d-flex ga-3">
                          <span>Apple Pay</span>
                          <v-icon color="blue" size="24">mdi-apple</v-icon>
                        </div>
                      </template>
                    </v-radio>
                    <v-radio
                      class="cardBtn pa-2 rounded-xl mb-5"
                      value="googlePay"
                      color="blue"
                      style="background-color: #e9f6fe"
                      prepend-icon="mdi-google"
                    >
                      <template v-slot:label>
                        <div class="d-flex ga-3">
                          <span>Google Pay</span>
                          <v-icon color="blue" size="24">mdi-google</v-icon>
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>

                <v-col class="ma-0 pa-0" cols="12" md="5" lg="4">
                  <v-card>
                    <div class="d-flex pa-5 bg-blue flex-column">
                      <div class="d-flex align-center">
                        <v-icon color="white" size="24"
                          >mdi-note-search-outline</v-icon
                        >
                        <v-card-title> Resumo </v-card-title>
                      </div>

                      <div class="d-flex flex-column align-center">
                        <v-card-text
                          class="text-h5 font-weight-bold text-center"
                          >Plano Selecionado</v-card-text
                        >
                        <v-card-text
                          class="text-h5 font-weight-medium ma-0 pa-0"
                          >0,00</v-card-text
                        >
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center mt-5">
                      <div class="">
                        <v-card-text>Data / Hora:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>24 de mês de ano / 00:00</v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Produto:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>Plano Selecionado</v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Comprador</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>Nome do comprador</v-card-text>
                      </div>
                    </div>

                    <div class="bg-grey my-5 mx-4" style="height: 2px"></div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Valor:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>R$ 0,00</v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Validade do Plano:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>30 Dias</v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Total:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>R$ 0,00</v-card-text>
                      </div>
                    </div>

                    <div class="bg-grey my-5 mx-4" style="height: 2px"></div>

                    <div class="d-flex justify-space-between align-center mb-5">
                      <div class="">
                        <v-card-text>Método de <br />pagamento:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>débito / crédito</v-card-text>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template #item.2>
            <v-container>
              <div class="d-flex justify-center mb-md-7">
                <h1
                  class="text-blue text-h5 text-md-h4 font-weight-medium text-center"
                >
                  Adicionar Cartão
                </h1>
              </div>

              <v-row class="mb-16">
                <v-col
                  class="py-5 py-md-0 px-0 px-md-5"
                  cols="12"
                  md="7"
                  lg="8"
                >
                  <v-card>
                    <v-form
                      class="w-100"
                      width="100%"
                      v-model="formValid"
                      ref="formRef"
                    >
                      <v-row>
                        <v-col
                          md="12"
                          lg="4"
                          class="mx-auto mx-lg-10 mt-9 d-none d-md-inline"
                        >
                          <v-card
                            class="d-flex flex-column rounded-xl card-with-bg pa-4 mx-auto"
                            max-width="320"
                            min-height="200"
                            image="../../assets/paymentCard.png"
                          >
                            <div class="text-white flex-1-1">
                              <v-card-title class="pa-0 ma-0"
                                >Banco</v-card-title
                              >
                            </div>

                            <div class="flex-1-3">
                              <v-card-text
                                class="text-white text-subtitle-1 text-md-h6 pa-0 ma-0 mb-3"
                              >
                                0000 0000 0000 0000
                              </v-card-text>
                              <div class="pr-5 pr-md-7">
                                <v-card-text class="text-white pa-0 ma-0"
                                  >Nome</v-card-text
                                >
                                <v-card-text
                                  class="text-white text-subtitle-1 pa-0 ma-0"
                                  >Nome Sobrenome</v-card-text
                                >
                              </div>
                            </div>
                          </v-card>
                        </v-col>

                        <v-row class="pa-10 mt-3">
                          <v-col class="pa-0 ma-0" cols="12">
                            <v-text-field
                              v-model="nomeCartao"
                              label="Nome no Cartão"
                              required
                              variant="outlined"
                              rounded="xl"
                              name="nomeDoCartao"
                              color="blue"
                            ></v-text-field>
                          </v-col>

                          <v-col class="pa-0 ma-0" cols="12">
                            <v-text-field
                              v-model="numeroCartao"
                              required
                              label="Número do Cartão"
                              variant="outlined"
                              rounded="xl"
                              :counter="16"
                              name="numeroDoCartao"
                              color="blue"
                            ></v-text-field>
                          </v-col>

                          <v-col class="pl-0 py-0" cols="6">
                            <v-text-field
                              v-model="validadedCartao"
                              required
                              label="Validade"
                              variant="outlined"
                              rounded="xl"
                              :counter="4"
                              name="validadeCartao"
                              color="blue"
                            ></v-text-field>
                          </v-col>

                          <v-col class="pr-0 py-0" cols="6">
                            <v-text-field
                              v-model="cvvCode"
                              required
                              label="CVV"
                              variant="outlined"
                              rounded="xl"
                              :counter="3"
                              name="cvvCartao"
                              color="blue"
                            ></v-text-field>
                          </v-col>

                          <v-col class="pa-0 ma-0" cols="12">
                            <v-select
                              :items="items"
                              label="Método de pagamento"
                              color="blue"
                              rounded="xl"
                              required
                              variant="outlined"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-row>
                    </v-form>
                  </v-card>

                  <v-card class="mt-5 py-10 d-flex flex-column justify-center">
                    <v-card-title
                      class="text-blue pa-0 mb-10 mx-5 text-subtitle-1 text-md-h6 text-center"
                    >
                      Adicionar cupom de desconto
                    </v-card-title>
                    <v-row class="mx-5 d-flex flex-column">
                      <v-col class="pa-0" cols="12">
                        <v-text-field
                          v-model="codigoCupom"
                          required
                          label="Código do cupom"
                          variant="outlined"
                          rounded="xl"
                          color="blue"
                          class="text-center"
                        ></v-text-field>
                      </v-col>

                      <v-col class="ma-0 pa-0 justify-center d-flex" cols="12">
                        <v-btn
                          class="text-lg-subtitle-1 text-subtitle-2"
                          size="x-large"
                          color="blue"
                          rounded="xl"
                        >
                          Validar Cupom
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>

                <v-col class="ma-0 pa-0" cols="12" md="5" lg="4">
                  <v-card>
                    <div class="d-flex pa-5 bg-blue flex-column">
                      <div class="d-flex align-center">
                        <v-icon color="white" size="24"
                          >mdi-note-search-outline</v-icon
                        >
                        <v-card-title> Resumo </v-card-title>
                      </div>

                      <div class="d-flex flex-column align-center">
                        <v-card-text
                          class="text-h5 font-weight-bold text-center"
                          >Plano Selecionado</v-card-text
                        >
                        <v-card-text
                          class="text-h5 font-weight-medium ma-0 pa-0"
                          >0,00</v-card-text
                        >
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center mt-5">
                      <div class="">
                        <v-card-text>Data / Hora:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>24 de mês de ano / 00:00</v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Produto:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>Plano Selecionado</v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Comprador</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>Nome do comprador</v-card-text>
                      </div>
                    </div>

                    <div class="bg-grey my-5 mx-4" style="height: 2px"></div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Valor:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>R$ 0,00</v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Validade do Plano:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>30 Dias</v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Total:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>R$ 0,00</v-card-text>
                      </div>
                    </div>

                    <div class="bg-grey my-5 mx-4" style="height: 2px"></div>

                    <div class="d-flex justify-space-between align-center mb-5">
                      <div class="">
                        <v-card-text>Método de <br />pagamento:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>débito / crédito</v-card-text>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template #item.3> </template>

          <template #actions="{ next, prev }">
            <div class="fixed-buttons">
              <v-container>
                <div
                  class="d-flex justify-space-between w-100 py-4 flex-column-reverse flex-md-row align-center ga-3"
                >
                  <VBtn
                    class="w-100"
                    :disabled="step === 1 ? true : false"
                    height="43px"
                    max-width="237px"
                    style="color: #00c6fe"
                    variant="outlined"
                    @click="prev"
                  >
                    Voltar
                  </VBtn>
                  <VBtn
                    class="text-white w-100"
                    height="43px"
                    max-width="237px"
                    :loading="loading"
                    :disabled="loading"
                    :style="
                      step === 3
                        ? 'background-color:#88ce0d'
                        : 'background-color: #00c6fe'
                    "
                    @click="handleNext(next)"
                  >
                    {{
                      step !== 3
                        ? 'Próximo'
                        : loading
                          ? 'Enviando...'
                          : 'Finalizar'
                    }}
                  </VBtn>
                </div>
              </v-container>
            </div>
          </template>
        </VStepper>
      </div>
    </VCol>
  </VRow>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const step = ref(1)
const router = useRouter()
const loading = ref(false)

const handleNext = async (next) => {
  if (step.value === 3) {
    // Lógica final aqui
    console.log('Finalizando...')
  } else {
    next()
  }
}

const item = ['Método de pagamento', 'Adicionar Cartão', 'Finalizar Pagamento']

const formValid = ref(false)
const nomeCartao = ref('')
const numeroCartao = ref('')
const validadedCartao = ref('')
const cvvCode = ref('')
const items = ref(['Débito', 'Crédito'])
</script>

<style scoped>
.content-scroll {
  height: 100vh; /* ocupa a altura total da tela */
  overflow-y: auto; /* ativa o scroll vertical */
  padding-bottom: 80px; /* espaço para não ficar atrás dos botões */
}

.cardBtn {
  cursor: pointer;
}

.card-with-bg {
  background-image: url('/path/to/your/image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.fixed-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e0e0e0;
  z-index: 1000;
}
</style>
