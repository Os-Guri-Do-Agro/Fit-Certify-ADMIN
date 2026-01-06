<template>
  <div>
    <!-- Informações Profissionais -->
    <template v-if="currentStep === 2">
      <v-form>
        <VRow class="px-4 px-md-8">
          <VCol class="mb-6 mt-10 mt-md-0" cols="12">
            <div class="d-flex align-center ga-3">
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-stethoscope</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                Informações Profissionais
              </h2>
            </div>
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <VTextField
              id="telefone"
              v-maska="'(##) #####-####'"
              :model-value="form.telefone"
              @update:model-value="form.telefone = $event"
              :rules="[rules.required]"
              name="telefone"
              placeholder="(00) 00000-0000"
              label="Telefone*"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <VTextField
              id="experiencia"
              :model-value="form.experiencia"
              @update:model-value="form.experiencia = $event"
              type="number"
              name="experiencia"
              placeholder="Descreva sua experiência profissional"
              label="Tempo de Experiência"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <VTextField
              id="foco"
              :model-value="form.foco"
              @update:model-value="form.foco = $event"
              name="foco"
              placeholder="Ex: Medicina Esportiva, Cardiologia..."
              label="Foco de Atuação"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <v-textarea
              id="perfil"
              :model-value="form.perfil"
              @update:model-value="form.perfil = $event"
              name="perfil"
              placeholder="Descreva seu perfil profissional"
              label="Perfil Profissional"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
              rows="3"
              no-resize
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <VTextField
              id="carreira"
              :model-value="form.carreira"
              @update:model-value="form.carreira = $event"
              name="carreira"
              placeholder="Descreva sua trajetória profissional"
              label="Carreira"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <v-textarea
              id="destaques"
              :model-value="form.destaques"
              @update:model-value="form.destaques = $event"
              name="destaques"
              placeholder="Principais conquistas e destaques"
              label="Destaques"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
              rows="3"
              no-resize
            />
          </VCol>
        </VRow>
      </v-form>
    </template>

    <!-- Endereço e Redes Sociais -->
    <template v-if="currentStep === 3">
      <v-form>
        <VRow class="px-4 px-md-8">
          <VCol class="mb-6 mt-10 mt-md-0" cols="12">
            <div class="d-flex align-center ga-3">
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-map-marker</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                Endereço
              </h2>
            </div>
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="4">
            <VTextField
              id="cep"
              v-maska="'#####-###'"
              :model-value="form.cep"
              @update:model-value="form.cep = $event"
              @blur="buscarCep(form.cep)"
              :loading="loadingCep"
              :rules="[rules.required]"
              name="cep"
              placeholder="00000-000"
              label="CEP*"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="8">
            <VTextField
              id="rua"
              :model-value="form.rua"
              @update:model-value="form.rua = $event"
              :rules="[rules.required]"
              name="rua"
              placeholder="Nome da rua"
              label="Rua*"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="4">
            <VTextField
              id="numero"
              :model-value="form.numero"
              @update:model-value="form.numero = $event"
              :rules="[rules.required]"
              name="numero"
              placeholder="123"
              label="Número*"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="8">
            <VTextField
              id="bairro"
              :model-value="form.bairro"
              @update:model-value="form.bairro = $event"
              :rules="[rules.required]"
              name="bairro"
              placeholder="Nome do bairro"
              label="Bairro*"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="8">
            <VTextField
              id="cidade"
              :model-value="form.cidade"
              @update:model-value="form.cidade = $event"
              :rules="[rules.required]"
              name="cidade"
              placeholder="Nome da cidade"
              label="Cidade*"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="4">
            <v-select
              id="uf"
              :model-value="form.uf"
              @update:model-value="form.uf = $event"
              :items="UFlist"
              :rules="[rules.required]"
              placeholder="Selecione"
              label="UF*"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>
        </VRow>

        <VRow class="px-4 px-md-8">
          <VCol class="mb-6 mt-6" cols="12">
            <div class="d-flex align-center ga-3">
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-share-variant</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                Redes Sociais
              </h2>
            </div>
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <VTextField
              id="linkInstagram"
              :model-value="form.linkInstagram"
              @update:model-value="form.linkInstagram = $event"
              name="linkInstagram"
              placeholder="https://instagram.com/seu_perfil"
              label="Instagram"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <VTextField
              id="linkFacebook"
              :model-value="form.linkFacebook"
              @update:model-value="form.linkFacebook = $event"
              name="linkFacebook"
              placeholder="https://facebook.com/seu_perfil"
              label="Facebook"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>
        </VRow>
      </v-form>
    </template>

    <!-- Documentação e Horários -->
    <template v-if="currentStep === 4">
      <v-form>
        <VRow class="px-4 px-md-8">
          <VCol class="mb-6 mt-10 mt-md-0" cols="12">
            <div class="d-flex align-center ga-3">
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-clock</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                Horários de Funcionamento
              </h2>
            </div>
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <v-select
              id="diaFuncionamentoInicio"
              :model-value="form.diaFuncionamentoInicio"
              @update:model-value="form.diaFuncionamentoInicio = $event"
              :items="diasSemana"
              placeholder="Selecione"
              label="Dia de Início"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <v-select
              id="diaFuncionamentoFim"
              :model-value="form.diaFuncionamentoFim"
              @update:model-value="form.diaFuncionamentoFim = $event"
              :items="diasSemana"
              placeholder="Selecione"
              label="Dia de Fim"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <VTextField
              id="horarioInicio"
              v-maska="'##:##'"
              :model-value="form.horarioInicio"
              @update:model-value="form.horarioInicio = $event"
              name="horarioInicio"
              placeholder="08:00"
              label="Horário de Início"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12" md="6">
            <VTextField
              id="horarioFim"
              v-maska="'##:##'"
              :model-value="form.horarioFim"
              @update:model-value="form.horarioFim = $event"
              name="horarioFim"
              placeholder="18:00"
              label="Horário de Fim"
              variant="outlined"
              rounded="lg"
              bg-color="white"
              class="custom-field"
            />
          </VCol>
        </VRow>

        <VRow class="px-4 px-md-8">
          <VCol class="mb-6 mt-6" cols="12">
            <div class="d-flex align-center ga-3">
              <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                <v-icon color="white" size="20">mdi-file-document</v-icon>
              </div>
              <h2 class="text-start text-h5 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
                Termos e Políticas
              </h2>
            </div>
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <v-checkbox
              :model-value="form.declaraVeracidade"
              @update:model-value="form.declaraVeracidade = $event"
              :rules="[rules.required]"
              color="success"
              class="font-weight-medium"
              label="Declaro que as informações acima são verdadeiras*"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <v-checkbox
              :model-value="form.aceitaCompartilharDados"
              @update:model-value="form.aceitaCompartilharDados = $event"
              :rules="[rules.required]"
              color="success"
              class="font-weight-medium"
              label="Aceito compartilhar meus dados com as organizações dos eventos*"
            />
          </VCol>

          <VCol class="my-2 py-0 font-weight-medium" cols="12">
            <v-checkbox
              :model-value="form.aceitaTermos"
              @update:model-value="form.aceitaTermos = $event"
              :rules="[rules.required]"
              color="success"
              class="font-weight-medium"
            >
              <template #label>
                <span>
                  Li e concordo com os
                  <span class="cursor-pointer text-decoration-underline" style="color: #00c6fe"
                    @click="showModalTerms = true">
                    termos de Uso e Política de Privacidade*</span>.
                </span>
              </template>
            </v-checkbox>
          </VCol>
        </VRow>
      </v-form>
    </template>

    <!-- Modal de Termos -->
    <v-dialog v-model="showModalTerms" width="600" height="800">
      <v-card class="py-5 px-md-3 custom-scroll" rounded="xl">
        <v-card-title class="text-center text-h5" style="color: #00c6fe; white-space: normal; word-wrap: break-word;">
          Política de Privacidade, Termos e Condições de Uso e Proteção de Dados
        </v-card-title>
        <v-card-text>
          <p class="mb-5"><strong>1. Introdução</strong></p>
          <p>
            Bem-vindo(a) à <strong>FitCertify365</strong> ("Companhia", "nós", "nosso", "conosco")! <br><br>
            Estes Termos de Serviço ("Termos", "Termos de Serviço", "Termos e Condições de Uso") regem o uso dos
            nossos aplicativos móveis e plataforma digital, desenvolvidos pela FitCertify365.
          </p>
          <p>
            Nossa <strong>Política de Privacidade</strong> também rege o uso do nosso Serviço e explica como coletamos, protegemos e
            divulgamos informações resultantes da sua utilização dos aplicativos móveis e páginas web. <br><br>
            Seu acordo conosco inclui estes Termos e nossa Política de Privacidade ("Acordos"). Ao utilizar
            nossos serviços, você reconhece que leu e compreendeu os Acordos, e concorda em estar legalmente vinculado a
            eles.
          </p>
          <p>
            Caso não concorde (ou não possa cumprir) os Acordos, você não poderá utilizar o Serviço. Neste caso,
            solicitamos que nos comunique pelo e-mail <strong>atendimento@fitcertify365.com</strong> para que possamos buscar
            uma solução. <br><br>
            Estes Termos aplicam-se a todos os visitantes, usuários e demais pessoas que desejarem acessar ou
            utilizar o Serviço.
          </p>
          <p>
            Este aplicativo pode se integrar com o <strong>Apple Saúde (HealthKit ou CareKit)</strong> e
            com o <strong>Google Health Connect</strong>, para leitura e acompanhamento de dados obtidos via
            Apple Watch e outros dispositivos wearables compatíveis, permitindo também o envio de dados manuais e de
            dispositivos Bluetooth (BLE), sempre mediante autorização do usuário.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="w-100 text-white font-weight-bold" @click="maisTermos" height="50px" rounded="lg"
            style="background-color: #00c6fe">
            Ler Mais
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { vMaska } from 'maska/vue'
import { toast } from 'vue3-toastify'
import { getErrorMessage } from '@/common/error.utils'

const props = defineProps({
  currentStep: {
    type: Number,
    required: true
  },
  form: {
    type: Object,
    required: true
  },
  loadingCep: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['buscarCep', 'handleFileChange'])

const showModalTerms = ref(false)

const UFlist = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

const diasSemana = [
  'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'
]

const rules = {
  required: (value) => !!value || 'Campo obrigatório'
}

const buscarCep = (cep) => {
  emit('buscarCep', cep)
}

const handleFileChange = (file) => {
  emit('handleFileChange', file)
}

const maisTermos = () => {
  showModalTerms.value = false
  window.open('/politicaPrivacidade', '_blank')
}
</script>

<style scoped>
.custom-scroll {
  overflow-y: auto;
}

.custom-scroll::-webkit-scrollbar {
  display: none;
}

.custom-scroll {
  scrollbar-width: none;
}

.custom-field .v-field {
  border: 1px solid #e0e7ff;
  transition: all 0.3s ease;
}

.custom-field .v-field:hover {
  border-color: #00c6fe;
}

.custom-field .v-field--focused {
  border-color: #00c6fe !important;
  box-shadow: 0 0 0 2px rgba(0, 198, 254, 0.2) !important;
}

.custom-field .v-label {
  color: #64748b;
  font-weight: 500;
}

.custom-field .v-field--focused .v-label {
  color: #00c6fe !important;
}
</style>
