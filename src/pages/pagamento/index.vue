<template>
  <VRow class="d-flex flex-column flex-md-row ma-0 pa-0" no-gutters>
    <!-- DIV PAGAMENTO -->
    <VCol class="d-flex pa-0 ma-0" md="12">
      <div class="w-100 content-scroll position-relative">
        <VStepper v-model="step" class="w-100" :items="item">
          <template #item.1>
            <v-container>
              <v-row>
                <v-col class="px-0 py-md-0 pr-md-5" cols="12" md="7" lg="8">
                  <v-card class="pa-5 pa-md-10">
                    <v-radio-group v-model="metodoPagamento">
                      <span class="text-subtitle-1 text-md-h6 text-blue mb-5"
                        >Cartão de Crédito ou Débito</span
                      >
                      <v-radio
                        class="cardBtn pa-2 rounded-xl mb-5"
                        value="cartao"
                        color="blue"
                        style="background-color: #ddf1fd"
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
                    </v-radio-group>

                    <v-btn
                      variant="outlined"
                      color="blue"
                      rounded="xl"
                      class="mt-5"
                      @click="voltarParaPlanos"
                    >
                      Voltar para Planos
                    </v-btn>
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
                          >{{
                            planoSelecionado?.nome || 'Plano Selecionado'
                          }}</v-card-text
                        >
                        <span
                          v-if="planoSelecionado?.nome === 'Saúde Ativa'"
                          class="text-caption font-weight-black mb-2 text-white"
                        >
                          ⭐ Mais popular
                        </span>
                        <v-card-text
                          class="text-h5 font-weight-medium ma-0 pa-0"
                          >R$
                          {{
                            formatarPreco(
                              planoSelecionado?.precoAno ||
                                planoSelecionado?.precoMes
                            )
                          }}{{
                            planoSelecionado?.precoAno ? '/ano' : '/mês'
                          }}</v-card-text
                        >
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center mt-5">
                      <div class="">
                        <v-card-text>Data / Hora:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text class="text-end">{{
                          formatarData()
                        }}</v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Produto:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text class="text-end">{{
                          planoSelecionado?.nome || 'Plano Selecionado'
                        }}</v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Comprador</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text class="text-end">{{
                          payload?.user?.nome
                        }}</v-card-text>
                      </div>
                    </div>

                    <div class="bg-grey my-2 mx-4" style="height: 2px"></div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Valor:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text
                          >R$
                          {{
                            formatarPreco(
                              planoSelecionado?.precoAno ||
                                planoSelecionado?.precoMes
                            )
                          }}{{
                            planoSelecionado?.precoAno ? '/ano' : '/mês'
                          }}</v-card-text
                        >
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Validade do Plano:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text
                          >{{ planoSelecionado?.duracao }} Meses</v-card-text
                        >
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Total:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text
                          >R$ {{ formatarPreco(valorTotal)
                          }}{{
                            planoSelecionado?.precoAno ? '/ano' : '/mês'
                          }}</v-card-text
                        >
                      </div>
                    </div>

                    <div class="bg-grey my-2 mx-4" style="height: 2px"></div>

                    <div class="d-flex justify-space-between align-center mb-5">
                      <div class="">
                        <v-card-text>Método de <br />pagamento:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>{{ metodoPagamento }}</v-card-text>
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
                      <v-row class="d-flex justify-center">
                        <v-col
                          md="12"
                          lg="4"
                          class="mx-auto mx-lg-10 mt-9 d-none d-md-inline"
                        >
                          <div class="card-container">
                            <v-card
                              :class="[
                                'card-face card-front',
                                { flipped: isCardFlipped },
                              ]"
                              class="d-flex flex-column rounded-xl pa-4 mx-auto"
                              max-width="320"
                              min-height="200"
                              style="
                                background: linear-gradient(
                                  135deg,
                                  #0067b8 0%,
                                  #6bd0ff 100%
                                );
                              "
                            >
                              <div class="text-white flex-1-1">
                                <v-card-title class="pa-0 ma-0">{{
                                  getBanco(numeroCartao)
                                }}</v-card-title>
                              </div>

                              <div class="flex-1-3">
                                <v-card-text
                                  class="text-white text-subtitle-1 text-md-h6 pa-0 ma-0 mb-3"
                                >
                                  {{ numeroCartao || '0000 0000 0000 0000' }}
                                </v-card-text>
                                <div class="pr-5 pr-md-7">
                                  <v-card-text class="text-white pa-0 ma-0"
                                    >Nome</v-card-text
                                  >
                                  <v-card-text
                                    class="text-white text-subtitle-1 pa-0 ma-0"
                                    >{{
                                      formatNomeCartao(nomeCartao)
                                    }}</v-card-text
                                  >
                                </div>
                              </div>
                            </v-card>

                            <v-card
                              :class="[
                                'card-face card-back',
                                { flipped: isCardFlipped },
                              ]"
                              class="d-flex flex-column rounded-xl pa-4 mx-auto"
                              max-width="320"
                              min-height="200"
                              style="
                                background: linear-gradient(
                                  135deg,
                                  #0067b8 0%,
                                  #6bd0ff 100%
                                );
                              "
                            >
                              <div class="black-stripe mt-4 mb-6"></div>
                              <div
                                class="d-flex justify-space-between align-center"
                              >
                                <div class="cvv-area">
                                  <v-card-text
                                    class="text-white text-caption pa-0 ma-0 mb-1"
                                    >CVV</v-card-text
                                  >
                                  <div class="cvv-box text-black pa-2 rounded">
                                    {{ cvvCode || '***' }}
                                  </div>
                                </div>
                                <div class="validity-area">
                                  <v-card-text
                                    class="text-white text-caption pa-0 ma-0 mb-1"
                                    >Validade</v-card-text
                                  >
                                  <v-card-text
                                    class="text-white text-subtitle-2 pa-0 ma-0"
                                  >
                                    {{ validadedCartao || 'MM/AA' }}
                                  </v-card-text>
                                </div>
                              </div>
                            </v-card>
                          </div>
                        </v-col>

                        <v-row class="pa-10 mt-3">
                          <v-col class="pa-0 mb-2" cols="12">
                            <v-text-field
                              class="px-3"
                              v-model="nomeCartao"
                              label="Nome do Cartão"
                              required
                              variant="outlined"
                              rounded="xl"
                              name="nomeDoCartao"
                              color="blue"
                              :rules="nomeRules"
                              validate-on="blur"
                            ></v-text-field>
                          </v-col>

                          <v-col class="pa-0 mb-2" cols="12">
                            <v-text-field
                              class="px-3"
                              v-model="numeroCartao"
                              required
                              label="Número do Cartão"
                              variant="outlined"
                              rounded="xl"
                              maxlength="19"
                              placeholder="0000 0000 0000 0000"
                              name="numeroDoCartao"
                              color="blue"
                              :rules="numeroRules"
                              validate-on="blur"
                              @input="onNumeroCartaoInput"
                            ></v-text-field>
                          </v-col>

                          <v-col class="pl-0 pr-2 mb-2" cols="6">
                            <v-text-field
                              class="px-3"
                              v-model="validadedCartao"
                              required
                              label="Validade"
                              variant="outlined"
                              rounded="xl"
                              maxlength="5"
                              placeholder="MM/AA"
                              name="validadeCartao"
                              color="blue"
                              :rules="validadeRules"
                              validate-on="blur"
                              @focus="flipCard"
                              @blur="unflipCard"
                              @input="onValidadeInput"
                            ></v-text-field>
                          </v-col>

                          <v-col class="pr-0 pl-2 mb-2" cols="6">
                            <v-text-field
                              class="px-3"
                              v-model="cvvCode"
                              required
                              label="CVV"
                              variant="outlined"
                              rounded="xl"
                              :counter="3"
                              maxlength="3"
                              name="cvvCartao"
                              color="blue"
                              :rules="cvvRules"
                              validate-on="blur"
                              @focus="flipCard"
                              @blur="unflipCard"
                              @input="onCvvInput"
                            ></v-text-field>
                          </v-col>

                          <v-col class="pa-0 mb-0" cols="12">
                            <v-select
                              class="px-3"
                              v-model="metodoPagamentoCartao"
                              :items="items"
                              item-title="label"
                              item-value="value"
                              label="Método de pagamento"
                              color="blue"
                              rounded="xl"
                              required
                              variant="outlined"
                              :rules="requiredRule"
                              validate-on="blur"
                            >
                              {{
                                metodoPagamentoCartao ||
                                'Selecione o metodo de pagamento'
                              }}</v-select
                            >
                          </v-col>
                        </v-row>
                      </v-row>
                    </v-form>
                  </v-card>

                  <v-card class="mt-5 py-10 d-flex flex-column justify-center">
                    <v-row class="mx-5 d-flex">
                      <v-col
                        class="pa-0 d-flex flex-column px-5"
                        cols="12"
                        lg="6"
                      >
                        <v-card-title
                          class="text-blue pa-0 mb-5 mx-5 text-subtitle-1 text-md-h6 text-center"
                        >
                          Adicionar cupom de desconto
                        </v-card-title>
                        <v-text-field
                          v-model="codigoCupom"
                          required
                          label="Código do cupom"
                          variant="outlined"
                          rounded="lg"
                          color="blue"
                          density="comfortable"
                          height="50"
                          @input="codigoCupom = codigoCupom.toUpperCase()"
                        ></v-text-field>

                        <v-btn
                          class="text-lg-subtitle-1 text-subtitle-2"
                          size="x-large"
                          color="blue"
                          rounded="xl"
                          :loading="loadingCupom"
                          @click="validarCupom()"
                        >
                          Validar Cupom
                        </v-btn>

                        <template v-if="cupom">
                          <b class="text-green text-center mt-3"
                            >Desconto de
                            {{
                              cupom?.porcentagem.toString().replace('.', ',')
                            }}
                            % aplicado!</b
                          >
                        </template>
                      </v-col>

                      <v-col
                        class="pa-0 d-flex flex-column px-5 mt-10 mt-md-0 justify-space-between"
                        cols="12"
                        lg="6"
                      >
                        <v-card-title
                          class="text-blue pa-0 mb-5 mx-5 text-subtitle-1 text-md-h6 text-center"
                        >
                          Endereço | Contato
                        </v-card-title>

                        <div v-if="enderecoSalvo" class="mx-5 mb-4">
                          <v-card variant="outlined" color="blue" class="pa-3">
                            <div class="text-caption text-grey-darken-1 mb-2">
                              Endereço:
                            </div>
                            <div class="text-body-2">
                              {{ endereco.rua }}, {{ endereco.complemento }}
                            </div>
                            <div class="text-body-2">
                              {{ endereco.cidade }}, {{ endereco.uf }} -
                              {{ endereco.cep }}
                            </div>
                            <div class="text-body-2">{{ endereco.pais }}</div>
                            <div
                              class="text-caption text-grey-darken-1 mt-2 mb-1"
                            >
                              Contato:
                            </div>
                            <div class="text-body-2">
                              {{ mobile_phone.full_number }}
                            </div>
                          </v-card>
                        </div>

                        <v-btn
                          class="text-lg-subtitle-1 text-subtitle-2"
                          size="x-large"
                          color="blue"
                          rounded="xl"
                          @click="showModal = true"
                        >
                          {{
                            enderecoSalvo
                              ? 'EDITAR ENDEREÇO'
                              : 'CADASTRAR NOVO ENDEREÇO'
                          }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>

                <v-dialog v-model="showModal" width="750" min-height="600">
                  <v-card class="bg-gray">
                    <div
                      class="d-flex justify-space-between align-center px-7 py-5"
                      elevation-1
                    >
                      <v-card-title
                        class="d-flex align-center ga-1 text-subtitle-1 text-md-h6 font-weight-black pa-0"
                      >
                        <v-icon size="28" color="blue"
                          >mdi-map-marker-circle</v-icon
                        >
                        NOVO ENDEREÇO
                      </v-card-title>

                      <v-btn
                        rounded="lg"
                        variant="outlined"
                        @click="showModal = false"
                        icon="mdi-window-close"
                        class="text-blue"
                      ></v-btn>
                    </div>

                    <v-form ref="enderecoFormRef" v-model="enderecoFormValid">
                      <v-row class="d-flex px-10 py-5">
                        <v-col class="pa-0" cols="12">
                          <v-text-field
                            v-model="endereco.rua"
                            required
                            label="Rua*"
                            variant="outlined"
                            rounded="lg"
                            density="comfortable"
                            color="blue"
                            class="mb-2"
                            :rules="requiredRule"
                            validate-on="blur"
                          ></v-text-field>
                        </v-col>

                        <v-col class="pa-0" cols="12">
                          <v-text-field
                            v-model="endereco.complemento"
                            required
                            label="Complemento*"
                            variant="outlined"
                            rounded="lg"
                            density="comfortable"
                            color="blue"
                            class="mb-2"
                            :rules="requiredRule"
                            validate-on="blur"
                          ></v-text-field>
                        </v-col>

                        <v-col class="pa-0 pr-2" cols="6">
                          <v-text-field
                            v-model="endereco.cep"
                            required
                            label="CEP*"
                            variant="outlined"
                            rounded="lg"
                            density="comfortable"
                            color="blue"
                            :rules="cepRules"
                            validate-on="blur"
                            maxlength="9"
                            class="mb-2"
                            @input="onCepInput"
                          ></v-text-field>
                        </v-col>

                        <v-col class="pa-0 pl-2" cols="6">
                          <v-text-field
                            v-model="endereco.uf"
                            required
                            label="UF*"
                            variant="outlined"
                            rounded="lg"
                            density="comfortable"
                            color="blue"
                            :rules="ufRules"
                            validate-on="blur"
                            maxlength="2"
                            class="mb-2"
                            @input="onUfInput"
                          ></v-text-field>
                        </v-col>

                        <v-col class="pa-0 pr-2" cols="6">
                          <v-text-field
                            v-model="endereco.cidade"
                            required
                            label="Cidade*"
                            variant="outlined"
                            rounded="lg"
                            density="comfortable"
                            color="blue"
                            :rules="requiredRule"
                            class="mb-2"
                            validate-on="blur"
                          ></v-text-field>
                        </v-col>

                        <v-col class="pa-0 pl-2" cols="6">
                          <v-text-field
                            v-model="endereco.pais"
                            required
                            label="País*"
                            variant="outlined"
                            rounded="lg"
                            maxlength="2"
                            density="comfortable"
                            color="blue"
                            class="mb-2"
                            :rules="requiredRule"
                            validate-on="blur"
                            @input="onPaisInput"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <div
                        class="d-flex justify-space-between align-center px-7"
                        elevation-1
                      >
                        <v-card-title
                          class="d-flex align-center ga-2 text-subtitle-1 text-md-h6 font-weight-black pa-0 pb-5"
                        >
                          <v-icon size="28" color="blue"
                            >mdi-card-account-phone-outline</v-icon
                          >
                          CONTATO
                        </v-card-title>
                      </div>

                      <v-row class="d-flex px-10 pt-5">
                        <v-col class="pa-0" cols="12">
                          <p>
                            TESTE:
                            {{ numeroCelular.slice(4, 13) }}
                          </p>
                          <v-text-field
                            v-model="mobile_phone.full_number"
                            required
                            label="Telefone Completo*"
                            variant="outlined"
                            rounded="lg"
                            density="comfortable"
                            color="blue"
                            :rules="telefoneCompletoRules"
                            validate-on="blur"
                            placeholder="+55 (21) 9 9999-9999"
                            @input="onTelefoneCompletoInput"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>

                    <v-row>
                      <v-col class="px-10 py-5" cols="12">
                        <v-btn
                          color="blue"
                          block
                          size="large"
                          @click="salvarEndereco"
                        >
                          SALVAR
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-dialog>

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
                          >{{
                            planoSelecionado?.nome || 'Plano Selecionado'
                          }}</v-card-text
                        >
                        <span
                          v-if="planoSelecionado?.nome === 'Saúde Ativa'"
                          class="text-caption font-weight-black mb-2 text-white"
                        >
                          ⭐ Mais popular
                        </span>
                        <v-card-text
                          class="text-h5 font-weight-medium ma-0 pa-0"
                          >R$
                          {{
                            formatarPreco(
                              planoSelecionado?.precoAno ||
                                planoSelecionado?.precoMes
                            )
                          }}{{
                            planoSelecionado?.precoAno ? '/ano' : '/mês'
                          }}</v-card-text
                        >
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center mt-5">
                      <div class="">
                        <v-card-text>Data / Hora:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text class="text-end">{{
                          formatarData()
                        }}</v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Produto:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text class="text-end">{{
                          planoSelecionado?.nome || 'Plano Selecionado'
                        }}</v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Comprador</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text class="text-end">{{
                          payload?.user?.nome
                        }}</v-card-text>
                      </div>
                    </div>

                    <div class="bg-grey my-2 mx-4" style="height: 2px"></div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Valor:</v-card-text>
                      </div>

                      <div :class="{ 'preco-antigo': cupom }">
                        <v-card-text
                          >R$
                          {{
                            formatarPreco(
                              planoSelecionado?.precoAno ||
                                planoSelecionado?.precoMes
                            )
                          }}{{
                            planoSelecionado?.precoAno ? '/ano' : '/mês'
                          }}</v-card-text
                        >
                      </div>
                    </div>

                    <div
                      v-if="cupom != null"
                      class="d-flex justify-space-between align-center"
                    >
                      <div class="">
                        <v-card-text>Desconto:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text
                          >{{
                            cupom?.porcentagem.toString().replace('.', ',') ||
                            '0'
                          }}%</v-card-text
                        >
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Validade do Plano:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text
                          >{{ planoSelecionado?.duracao }} Meses</v-card-text
                        >
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Total:</v-card-text>
                      </div>
                      <div class="">
                        <v-card-text
                          >R$ {{ formatarPreco(valorTotal)
                          }}{{
                            planoSelecionado?.precoAno ? '/ano' : '/mês'
                          }}</v-card-text
                        >
                      </div>
                    </div>
                    <div class="bg-grey my-2 mx-4" style="height: 2px"></div>

                    <div class="d-flex justify-space-between align-center mb-5">
                      <div class="">
                        <v-card-text>Método de <br />pagamento:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>{{
                          tipoCartoes[metodoPagamentoCartao]
                        }}</v-card-text>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template #item.3>
            <v-container>
              <div class="d-flex justify-center mb-md-7">
                <h1
                  class="text-blue text-h5 text-md-h4 font-weight-medium text-center"
                >
                  Finalizar Pagamento
                </h1>
              </div>

              <v-row class="mb-16">
                <v-col
                  class="py-5 py-md-0 px-0 px-md-5"
                  cols="12"
                  md="7"
                  lg="8"
                >
                  <v-card class="pa-2 pa-5">
                    <v-card-title
                      class="text-subtitle-1 d-flex align-center ga-2 font-weight-bold"
                    >
                      <v-icon size="24" color="blue">mdi-account</v-icon> DADOS
                      PESSOAIS
                    </v-card-title>
                    <v-card-subtitle class="mb-5 text-wrap">
                      Verifique suas informações pessoais antes de finalizar a
                      compra.
                    </v-card-subtitle>

                    <v-row style="background-color: #ddf1fd">
                      <v-col cols="12" md="6">
                        <div>
                          <v-card-text
                            class="py-0 font-weight-bold text-caption text-md-subtitle-2 d-flex align-center pa-0"
                          >
                            Nome:
                            <v-card-text class="text-caption">
                              {{ payload?.user?.nome }}
                            </v-card-text>
                          </v-card-text>
                        </div>

                        <div>
                          <v-card-text
                            class="py-0 font-weight-bold text-caption text-md-subtitle-2 d-flex align-center pa-0"
                          >
                            Celular:
                            <v-card-text class="text-caption">
                              {{ mobile_phone.full_number }}
                            </v-card-text>
                          </v-card-text>
                        </div>

                        <div>
                          <v-card-text
                            class="py-0 font-weight-bold text-caption text-md-subtitle-2 d-flex align-center pa-0"
                          >
                            CEP:
                            <v-card-text class="text-caption">
                              {{ endereco.cep }}
                            </v-card-text>
                          </v-card-text>
                        </div>
                      </v-col>

                      <v-col cols="12" md="6">
                        <div class="">
                          <v-card-text
                            class="py-0 font-weight-bold text-caption text-md-subtitle-2 d-flex align-center pa-0"
                          >
                            CPF:
                            <v-card-text class="text-caption">
                              {{ formatarCPF(payload?.user?.cpf) }}
                            </v-card-text>
                          </v-card-text>
                        </div>

                        <div class="">
                          <v-card-text
                            class="py-0 font-weight-bold text-caption text-md-subtitle-2 d-flex align-center pa-0"
                          >
                            E-mail:
                            <v-card-text class="text-caption">
                              {{ payload?.user?.email }}
                            </v-card-text>
                          </v-card-text>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>

                  <v-card class="mt-5 pa-5">
                    <v-card-title
                      class="text-subtitle-1 d-flex align-center ga-2 font-weight-bold flex-wrap"
                    >
                      <v-icon size="24" color="blue">mdi-credit-card</v-icon>
                      CARTÃO DE PAGAMENTO
                    </v-card-title>
                    <v-card-subtitle class="mb-5 text-wrap">
                      Informações do cartão selecionado.
                    </v-card-subtitle>

                    <div class="d-flex justify-center">
                      <div class="card-container" @click="flipCardStep3">
                        <v-card
                          :class="[
                            'card-face card-front',
                            { flipped: isCardFlippedStep3 },
                          ]"
                          class="d-flex flex-column rounded-xl card-with-bg pa-4 mx-auto"
                          max-width="320"
                          min-height="200"
                          style="
                            background: linear-gradient(
                              135deg,
                              #0067b8 0%,
                              #6bd0ff 100%
                            );
                          "
                        >
                          <div
                            class="d-flex justify-space-between text-white flex-1-1"
                          >
                            <v-card-title class="pa-0 ma-0">{{
                              getBanco(numeroCartao)
                            }}</v-card-title>
                            <v-card-text class="pa-0 ma-0 text-right">{{
                              tipoCartoes[metodoPagamentoCartao]
                            }}</v-card-text>
                          </div>

                          <div class="flex-1-3">
                            <v-card-text
                              class="text-white text-subtitle-1 text-md-h6 pa-0 ma-0 mb-3"
                            >
                              {{ numeroCartao || '0000 0000 0000 0000' }}
                            </v-card-text>
                            <div class="pr-5 pr-md-7">
                              <v-card-text class="text-white pa-0 ma-0"
                                >Nome</v-card-text
                              >
                              <v-card-text
                                class="text-white text-subtitle-1 pa-0 ma-0"
                                >{{ formatNomeCartao(nomeCartao) }}</v-card-text
                              >
                            </div>
                          </div>
                        </v-card>

                        <v-card
                          :class="[
                            'card-face card-back',
                            { flipped: isCardFlippedStep3 },
                          ]"
                          class="d-flex flex-column rounded-xl pa-4 mx-auto"
                          max-width="320"
                          min-height="200"
                          style="
                            background: linear-gradient(
                              135deg,
                              #0067b8 0%,
                              #6bd0ff 100%
                            );
                          "
                        >
                          <div class="black-stripe mt-4 mb-6"></div>
                          <div
                            class="d-flex justify-space-between align-center"
                          >
                            <div class="cvv-area">
                              <v-card-text
                                class="text-white text-caption pa-0 ma-0 mb-1"
                                >CVV</v-card-text
                              >
                              <div class="cvv-box text-black pa-2 rounded">
                                {{ cvvCode || '***' }}
                              </div>
                            </div>
                            <div class="validity-area">
                              <v-card-text
                                class="text-white text-caption pa-0 ma-0 mb-1"
                                >Validade</v-card-text
                              >
                              <v-card-text
                                class="text-white text-subtitle-2 pa-0 ma-0"
                              >
                                {{ validadedCartao || 'MM/AA' }}
                              </v-card-text>
                            </div>
                          </div>
                        </v-card>
                      </div>
                    </div>
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
                          >{{
                            planoSelecionado?.nome || 'Plano Selecionado'
                          }}</v-card-text
                        >
                        <span
                          v-if="planoSelecionado?.nome === 'Saúde Ativa'"
                          class="text-caption font-weight-black mb-2 text-white"
                        >
                          ⭐ Mais popular
                        </span>
                        <v-card-text
                          class="text-h5 font-weight-medium ma-0 pa-0"
                          >R$
                          {{
                            formatarPreco(
                              planoSelecionado?.precoAno ||
                                planoSelecionado?.precoMes
                            )
                          }}{{
                            planoSelecionado?.precoAno ? '/ano' : '/mês'
                          }}</v-card-text
                        >
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center mt-5">
                      <div class="">
                        <v-card-text>Data / Hora:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text class="text-end">{{
                          formatarData()
                        }}</v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Produto:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text class="text-end">{{
                          planoSelecionado?.nome || 'Plano Selecionado'
                        }}</v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Comprador</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text class="text-end">{{
                          payload?.user?.nome
                        }}</v-card-text>
                      </div>
                    </div>

                    <div class="bg-grey my-2 mx-4" style="height: 2px"></div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Valor:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text
                          >R$
                          {{
                            formatarPreco(
                              planoSelecionado?.precoAno ||
                                planoSelecionado?.precoMes
                            )
                          }}{{
                            planoSelecionado?.precoAno ? '/ano' : '/mês'
                          }}</v-card-text
                        >
                      </div>
                    </div>

                    <div
                      v-if="cupom != null"
                      class="d-flex justify-space-between align-center"
                    >
                      <div class="">
                        <v-card-text>Desconto:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text
                          >{{
                            cupom?.porcentagem.toString().replace('.', ',') ||
                            '0'
                          }}%</v-card-text
                        >
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Validade do Plano:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text
                          >{{ planoSelecionado?.duracao }} Meses</v-card-text
                        >
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div class="">
                        <v-card-text>Total:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text
                          >R$ {{ formatarPreco(valorTotal)
                          }}{{
                            planoSelecionado?.precoAno ? '/ano' : '/mês'
                          }}</v-card-text
                        >
                      </div>
                    </div>

                    <div class="bg-grey my-2 mx-4" style="height: 2px"></div>

                    <div class="d-flex justify-space-between align-center mb-5">
                      <div class="">
                        <v-card-text>Método de <br />pagamento:</v-card-text>
                      </div>

                      <div class="">
                        <v-card-text>{{
                          tipoCartoes[metodoPagamentoCartao]
                        }}</v-card-text>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template #item.4>
            <v-container>
              <div class="d-flex justify-center mb-md-7">
                <h1
                  class="text-green text-h5 text-md-h4 font-weight-medium text-center"
                >
                  Pagamento Realizado com Sucesso!
                </h1>
              </div>

              <v-row class="mb-16">
                <v-col
                  class="py-5 py-md-0 px-0 px-md-5"
                  cols="12"
                  md="7"
                  lg="8"
                >
                  <v-card class="pa-5 text-center">
                    <v-icon size="80" color="green" class="mb-5">
                      mdi-check-circle
                    </v-icon>

                    <v-card-title class="text-h5 text-green mb-3">
                      Parabéns!
                    </v-card-title>

                    <v-card-text class="text-subtitle-1 mb-5">
                      Seu pagamento foi processado com sucesso e seu plano já
                      está ativo.
                    </v-card-text>

                    <v-card-text class="text-body-2 mb-5">
                      Você receberá um e-mail de confirmação em breve com todos
                      os detalhes da sua compra.
                    </v-card-text>

                    <v-btn
                      color="blue"
                      size="large"
                      rounded="xl"
                      class="text-white px-8"
                      @click="irParaHome"
                    >
                      Ir para Home
                    </v-btn>
                  </v-card>
                </v-col>

                <v-col class="ma-0 pa-0" cols="12" md="5" lg="4">
                  <v-card>
                    <div class="d-flex pa-5 bg-green flex-column">
                      <div class="d-flex align-center">
                        <v-icon color="white" size="24">
                          mdi-check-circle
                        </v-icon>
                        <v-card-title class="text-white">
                          Compra Finalizada
                        </v-card-title>
                      </div>

                      <div class="d-flex flex-column align-center">
                        <v-card-text
                          class="text-h5 font-weight-bold text-center text-white"
                        >
                          {{ planoSelecionado?.nome || 'Plano Selecionado' }}
                        </v-card-text>
                        <span
                          v-if="planoSelecionado?.nome === 'Saúde Ativa'"
                          class="text-caption font-weight-black mb-2 text-white"
                        >
                          ⭐ Mais popular
                        </span>
                        <v-card-text
                          class="text-h5 font-weight-medium ma-0 pa-0 text-white"
                        >
                          R$
                          {{
                            formatarPreco(
                              planoSelecionado?.precoAno ||
                                planoSelecionado?.precoMes
                            )
                          }}{{ planoSelecionado?.precoAno ? '/ano' : '/mês' }}
                        </v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center mt-5">
                      <div>
                        <v-card-text>Status:</v-card-text>
                      </div>
                      <div>
                        <v-card-text
                          class="text-end text-green font-weight-bold"
                        >
                          Aprovado
                        </v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div>
                        <v-card-text>Data / Hora:</v-card-text>
                      </div>
                      <div>
                        <v-card-text class="text-end">
                          {{ formatarData() }}
                        </v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center">
                      <div>
                        <v-card-text>Produto:</v-card-text>
                      </div>
                      <div>
                        <v-card-text class="text-end">
                          {{ planoSelecionado?.nome || 'Plano Selecionado' }}
                        </v-card-text>
                      </div>
                    </div>

                    <div class="bg-grey my-2 mx-4" style="height: 2px"></div>

                    <div class="d-flex justify-space-between align-center">
                      <div>
                        <v-card-text>Total Pago:</v-card-text>
                      </div>
                      <div>
                        <v-card-text class="text-end font-weight-bold">
                          R$
                          {{
                            formatarPreco(
                              valorTotal ||
                                planoSelecionado?.precoAno ||
                                planoSelecionado?.precoMes
                            )
                          }}{{ planoSelecionado?.precoAno ? '/ano' : '/mês' }}
                        </v-card-text>
                      </div>
                    </div>

                    <div class="d-flex justify-space-between align-center mb-5">
                      <div>
                        <v-card-text>Método de pagamento:</v-card-text>
                      </div>
                      <div>
                        <v-card-text class="text-end">
                          {{
                            tipoCartoes[metodoPagamentoCartao] ||
                            metodoPagamento
                          }}
                        </v-card-text>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template #actions="{ next, prev }">
            <div class="fixed-buttons">
              <v-container>
                <div
                  class="d-flex justify-space-between w-100 py-4 flex-column-reverse flex-md-row align-center ga-3"
                >
                  <VBtn
                    v-if="step !== 4"
                    class="w-100"
                    :disabled="step === 1 ? true : false"
                    height="43px"
                    max-width="237px"
                    style="color: #00c6fe"
                    variant="outlined"
                    @click="handlePrev(prev)"
                  >
                    Voltar
                  </VBtn>
                  <VBtn
                    v-if="step !== 4"
                    class="text-white w-100"
                    height="43px"
                    max-width="237px"
                    :loading="loading"
                    :disabled="loading || (step === 1 && !metodoPagamento)"
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
                          ? 'Processando...'
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePlanoStore } from '@/stores/plano'
import { getPayload, refreshUserData } from '@/utils/auth'
import { toast } from 'vue3-toastify'
import cupomService from '@/services/cupom/cupom-service'
import pagarmeService from '@/services/pagarme/pagarme-service'

const step = ref(1)
const router = useRouter()
const loading = ref(false)
const planoStore = usePlanoStore()

const planoSelecionado = computed(() => planoStore.getPlanoSelecionado)

const payload = ref()

const formatarPreco = (preco) => {
  return preco?.toFixed(2).replace('.', ',') || '0,00'
}

const formatarData = () => {
  const agora = new Date()
  const dia = agora.getDate().toString().padStart(2, '0')
  const mes = agora.toLocaleString('pt-BR', { month: 'long' })
  const ano = agora.getFullYear()
  const hora = agora.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${dia} de ${mes} de ${ano} / ${hora}`
}

const formatarCPF = (cpf) => {
  if (!cpf) return ''
  const numbers = cpf.replace(/\D/g, '')
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

const formatarTelefone = (telefone) => {
  if (!telefone) return ''
  const numbers = telefone.replace(/\D/g, '')
  return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

onMounted(() => {
  if (!planoSelecionado.value) {
    router.push('/registerPlanos')
  }
  payload.value = getPayload()
})

const handleNext = async (next) => {
  if (step.value === 1) {
    if (!metodoPagamento.value) {
      return
    }
    if (metodoPagamento.value === 'cartao') {
      next()
    } else {
      step.value = 3
    }
  } else if (step.value === 2) {
    const { valid } = await formRef.value.validate()
    if (valid && enderecoSalvo.value) {
      next()
    } else if (!enderecoSalvo.value) {
      toast.error('É necessário cadastrar um endereço para continuar')
    }
  } else if (step.value === 3) {
    loading.value = true

    if (
      !mobile_phone.value.country_code ||
      !mobile_phone.value.area_code ||
      !mobile_phone.value.number_clean
    ) {
      toast.error('Dados de contato incompletos')
      loading.value = false
      return
    }

    const data = {
      plan_id: planoSelecionado.value.planoIdPagarme,
      customer: {
        name: payload.value.user.nome,
        email: payload.value.user.email,
        document: payload.value.user.cpf,
        type: 'individual',
        document_type: 'CPF',
        phones: {
          country_code: numeroCelular.value.slice(0, 2),
          area_code: numeroCelular.value.slice(2, 4),
          number: numeroCelular.value.slice(4, 13),
        },
      },
      card: {
        number: numeroCartao.value,
        exp_month: Number(validadedCartao.value.slice(0, 2)),
        exp_year: Number(validadedCartao.value.slice(3, 5)),
        cvv: cvvCode.value,
        holder_name: nomeCartao.value,
        billing_address: {
          line_1: endereco.value.rua,
          line_2: endereco.value.complemento,
          zip_code: endereco.value.cep_clean,
          city: endereco.value.cidade,
          state: endereco.value.uf,
          country: endereco.value.pais,
        },
      },
      payment_method: metodoPagamentoCartao.value,
      discounts: cupom.value
        ? [
            {
              cycles: '1',
              value: cupom?.value?.porcentagem.toString(),
              discount_type: 'percentage',
            },
          ]
        : [],
    }

    console.log('Dados do telefone:', mobile_phone.value)
    console.log('Dados enviados para API:', data)

    await pagarmeService
      .realizarAssinatura(data)
      .then(async (resp) => {
        if (resp?.success && resp?.data?.status == 'active') {
          toast.success('Pagamento realizado com sucesso!')
          await refreshUserData()
          next()
        } else {
          toast.error('Falha no pagamento')
        }
      })
      .catch((err) => {
        toast.error('Erro ao processar pagamento! Tente novamente.')
      })
      .finally(() => (loading.value = false))
  } else if (step.value === 4) {
    console.log('step')
    //chamar função de refresh user data
  } else {
    next()
  }
}

const handlePrev = (prev) => {
  if (step.value === 3 && metodoPagamento.value !== 'cartao') {
    step.value = 1
  } else {
    prev()
  }
}

const item = [
  'Método de pagamento',
  'Adicionar Cartão',
  'Finalizar Pagamento',
  'Pagamento Realizado',
]

const tipoCartoes = {
  credit_card: 'Cartão de Crédito',
  debit_card: 'Cartão de Débito',
}

const formValid = ref(false)
const nomeCartao = ref('')
const numeroCartao = ref('')
const validadedCartao = ref('')
const cvvCode = ref('')
const metodoPagamentoCartao = ref('')
const items = ref([
  { label: 'Débito', value: 'debit_card' },
  { label: 'Crédito', value: 'credit_card' },
])
const isCardFlipped = ref(false)
const isCardFlippedStep3 = ref(false)
const metodoPagamento = ref('')
const formRef = ref(null)
const cupom = ref(null)
const loadingCupom = ref(false)

const flipCard = () => {
  isCardFlipped.value = true
}

const unflipCard = () => {
  isCardFlipped.value = false
}

const flipCardStep3 = () => {
  isCardFlippedStep3.value = !isCardFlippedStep3.value
}

const formatValidade = (value) => {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length >= 2) {
    return numbers.substring(0, 2) + '/' + numbers.substring(2, 4)
  }
  return numbers
}

const onValidadeInput = (event) => {
  const formatted = formatValidade(event.target.value)
  validadedCartao.value = formatted
}

const onCvvInput = (event) => {
  const numbers = event.target.value.replace(/\D/g, '')
  cvvCode.value = numbers
}

const validadeRules = [
  (value) => {
    if (!value) return 'Validade é obrigatória'
    if (value.length !== 5) return 'Formato deve ser MM/AA'

    const [mes, ano] = value.split('/')
    const mesNum = parseInt(mes)
    const anoNum = parseInt('20' + ano)

    if (mesNum < 1 || mesNum > 12) return 'Mês deve estar entre 01 e 12'

    const hoje = new Date()
    const dataValidade = new Date(anoNum, mesNum - 1)

    if (dataValidade < hoje) return 'Cartão expirado'

    return true
  },
]

const getBanco = (numero) => {
  if (!numero) return 'Banco'
  const firstDigits = numero.replace(/\D/g, '').substring(0, 4)

  if (firstDigits.startsWith('4')) return 'Visa'
  if (firstDigits.startsWith('5') || firstDigits.startsWith('2'))
    return 'Mastercard'
  if (firstDigits.startsWith('3')) return 'American Express'
  if (firstDigits.startsWith('6')) return 'Discover'

  return 'Banco'
}

const numeroCelular = computed(() => {
  return mobile_phone.value.full_number.replace(/\D/g, '')
})

const formatNomeCartao = (nome) => {
  if (!nome) return 'Nome Sobrenome'

  const nomes = nome
    .trim()
    .split(' ')
    .filter((n) => n.length > 0)

  if (nomes.length === 1) return nomes[0]
  if (nomes.length === 2) return `${nomes[0]} ${nomes[1]}`

  const primeiro = nomes[0]
  const ultimo = nomes[nomes.length - 1]
  const meios = nomes
    .slice(1, -1)
    .map((n) => n.charAt(0).toUpperCase())
    .join(' ')

  return `${primeiro} ${meios} ${ultimo}`
}

const formatNumeroCartao = (value) => {
  const numbers = value.replace(/\D/g, '').substring(0, 16)
  return numbers.replace(/(\d{4})(?=\d)/g, '$1 ')
}

const onNumeroCartaoInput = (event) => {
  const formatted = formatNumeroCartao(event.target.value)
  numeroCartao.value = formatted
}

const onTelefoneCompletoInput = (event) => {
  const value = event.target.value
  const numbers = value.replace(/\D/g, '')

  // Assume formato brasileiro por padrão (+55)
  if (numbers.length >= 13) {
    const countryCode = numbers.substring(0, 2)
    const areaCode = numbers.substring(2, 4)
    const phoneNumber = numbers.substring(4, 13)

    mobile_phone.value.country_code = 'br'
    mobile_phone.value.area_code = areaCode
    mobile_phone.value.number_clean = phoneNumber

    // Formatar para exibição
    let formatted = `+${countryCode} (${areaCode}) `
    if (phoneNumber.length > 0) {
      formatted += phoneNumber.substring(0, 1)
    }
    if (phoneNumber.length > 1) {
      formatted += ' ' + phoneNumber.substring(1, 5)
    }
    if (phoneNumber.length > 5) {
      formatted += '-' + phoneNumber.substring(5)
    }

    mobile_phone.value.full_number = formatted
    mobile_phone.value.number =
      phoneNumber.substring(0, 1) +
      ' ' +
      phoneNumber.substring(1, 5) +
      '-' +
      phoneNumber.substring(5)
  } else {
    mobile_phone.value.full_number = value
  }
}

const requiredRule = [(v) => !!v || 'Campo obrigatório']

const nomeRules = [
  (v) => !!v || 'Nome é obrigatório',
  (v) => v.length >= 2 || 'Nome deve ter pelo menos 2 caracteres',
]

const numeroRules = [
  (v) => !!v || 'Número do cartão é obrigatório',
  (v) => v.replace(/\s/g, '').length === 16 || 'Número deve ter 16 dígitos',
]

const cvvRules = [
  (v) => !!v || 'CVV é obrigatório',
  (v) => v.length === 3 || 'CVV deve ter 3 dígitos',
]

const codigoCupom = ref('')

const irParaHome = async () => {
  await refreshUserData()
  router.push('/')
}

const voltarParaPlanos = () => {
  router.push('/registerPlanos')
}

const validarCupom = async () => {
  if (!codigoCupom.value) {
    Toast.show({
      type: 'error',
      text1: 'Digite um código',
    })
    return
  }
  loadingCupom.value = true
  await cupomService
    .validarCupom(codigoCupom.value)
    .then((resp) => {
      if (resp?.success && resp?.data?.isValid) {
        toast.success('Cupom aplicado!')
        cupom.value = resp?.data?.cupom
      }
    })
    .catch((err) => {
      toast.error(err.response.data.message)
    })
    .finally(() => (loadingCupom.value = false))
}

const valorTotal = computed(() => {
  const precoBase =
    planoSelecionado.value?.precoAno || planoSelecionado.value?.precoMes
  if (!precoBase) return 0

  let valor = precoBase
  if (cupom.value?.porcentagem) {
    valor = valor - (valor * cupom.value.porcentagem) / 100
  }
  return valor
})

const showModal = ref(false)
const enderecoFormRef = ref(null)
const enderecoFormValid = ref(false)

const endereco = ref({
  rua: '',
  complemento: '',
  cep: '',
  cep_clean: '',
  uf: '',
  cidade: '',
  pais: '',
})

const mobile_phone = ref({
  country_code: 'br',
  area_code: '',
  number: '',
  number_clean: '',
  full_number: '',
})

const cepRules = [
  (v) => !!v || 'CEP é obrigatório',
  (v) => v.replace(/\D/g, '').length === 8 || 'CEP deve ter 8 dígitos',
]

const ufRules = [
  (v) => !!v || 'UF é obrigatória',
  (v) => v.length === 2 || 'UF deve ter 2 caracteres',
]

const dddRules = [
  (v) => !!v || 'DDD é obrigatório',
  (v) => v.length === 2 || 'DDD deve ter 2 dígitos',
]

const telefoneCompletoRules = [
  (v) => !!v || 'Telefone é obrigatório',
  (v) => {
    const numbers = v.replace(/\D/g, '')
    return (
      numbers.length >= 13 ||
      'Telefone deve ter formato completo: +55 (XX) 9 XXXX-XXXX'
    )
  },
]

const onCepInput = (event) => {
  const numbers = event.target.value.replace(/\D/g, '').substring(0, 8)
  endereco.value.cep_clean = numbers

  let formatted = numbers
  if (numbers.length > 5) {
    formatted = numbers.substring(0, 5) + '-' + numbers.substring(5)
  }
  endereco.value.cep = formatted
}

const enderecoSalvo = ref(false)

const onUfInput = (event) => {
  const value = event.target.value.toUpperCase().substring(0, 2)
  endereco.value.uf = value
}

const onPaisInput = (event) => {
  const value = event.target.value.toUpperCase().substring(0, 2)
  endereco.value.pais = value
}

const salvarEndereco = async () => {
  const { valid } = await enderecoFormRef.value.validate()
  if (valid) {
    enderecoSalvo.value = true
    toast.success('Endereço salvo com sucesso!')
    showModal.value = false
  } else {
    toast.error('Preencha todos os campos obrigatórios')
  }
}
</script>

<style scoped>
.content-scroll {
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 120px;
  box-sizing: border-box;
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
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.preco-antigo {
  text-decoration: line-through;
  color: #888;
}

@media (max-width: 768px) {
  .content-scroll {
    padding-bottom: 180px;
    height: 100dvh;
  }

  .fixed-buttons {
    padding: 12px 0;
  }
}

@media (max-width: 480px) {
  .content-scroll {
    padding-bottom: 200px;
    height: 100dvh;
  }
}

.card-container {
  perspective: 1000px;
  width: 320px;
  height: 200px;
  position: relative;
  margin: 0 auto;
  cursor: pointer;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-front {
  transform: rotateY(0deg);
}

.card-back {
  transform: rotateY(180deg);
}

.card-front.flipped {
  transform: rotateY(-180deg);
}

.card-back.flipped {
  transform: rotateY(0deg);
}

.black-stripe {
  width: 100%;
  height: 30px;
  background-color: #000;
}

.cvv-box {
  background-color: #fff;
  width: 50px;
  text-align: center;
  font-weight: bold;
}

.validity-area {
  text-align: right;
}

:deep(.v-stepper) {
  height: auto !important;
  min-height: auto !important;
}

:deep(.v-stepper-window) {
  height: auto !important;
  min-height: auto !important;
}

:deep(.v-stepper-window-item) {
  height: auto !important;
  min-height: auto !important;
}
</style>
