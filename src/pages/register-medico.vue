<template>
  <VRow class="h-100 d-flex flex-column flex-md-row ma-0 pa-0 overflow-hidden fill-height" no-gutters>
    <!-- DIV DA ESQUERDA -->
    <VCol class="pa-0 ma-0" md="4" style="background: #00c6fe">
      <VRow class="w-100 h-100 pa-0 ma-0 flex-column" no-gutters>
        <VCol class="pa-0 ma-0 flex-fill" cols="12">
          <RouterLink class="d-flex w-100 h-100 align-end justify-center justify-md-start mt-5 mt-md-0 pb-15"
            to="/login">
            <v-img alt="Logo" class="mx-5 mx-lg-15" cover max-width="200" src="../assets/Login/logo-fit.png" />
          </RouterLink>
        </VCol>

        <VCol class="pa-0 ma-0 d-flex text-center text-md-start flex-column align-center flex-fill" cols="12">
          <h1 class="mx-5 mx-lg-15 text-white text-h5 text-md-h4 font-weight-medium font-italic" style="
              font-family:
                DM Sans,
                sans-serif;
            ">
            {{ titleStep[step - 1] }}
          </h1>
          <p class="mx-5 mx-lg-15 text-white text-center text-md-start text-h6 text-md-h5 font-weight-regular mt-5 mb-10"
            style="
              font-family:
                DM Sans,
                sans-serif;
              line-height: 36px;
            ">
            {{ textStep[step - 1] }}
          </p>
        </VCol>
      </VRow>
    </VCol>

    <VCol class="h-100 d-flex align-center pa-0 ma-0" md="8">
      <v-container class="d-flex ga-10 align-top flex-column fill-height pa-6">
        <VStepper v-model="step" class="d-flex flex-column w-100" :items="item"
          style="min-height: calc(100vh - 100px);">
          <!--Primeiro step - Informações Pessoais-->
          <template #item.1>
            <v-form>
              <VRow class="pb-8">
                <VCol class="mb-10 mt-10 mt-md-0" cols="12">
                  <h2 class="text-start text-h5 font-weight-bold" style="color: #1976d2">
                    1. Informações Pessoais
                  </h2>
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="8">
                  <label for="nomeCompleto">Nome completo:</label>
                  <VTextField id="nomeCompleto" density="compact" v-model="form.nome" name="nomeCompleto"
                    :rules="[rules.requiredNomeObrigatorio]" variant="outlined" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="4">
                  <label for="cpf">CPF:</label>
                  <VTextField id="cpf" density="compact" v-model="form.cpf" name="cpf"
                    :rules="[rules.requiredCpfObrigatorio]" variant="outlined" v-maska="'###.###.###-##'"
                    placeholder="000.000.000-00" maxlength="14" />
                </VCol>

                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6">
                  <label for="email">Email:</label>
                  <VTextField @blur="(e) => onBlurEmail(e.target.value)" id="email" density="compact"
                    v-model="form.email" name="email" type="email" placeholder="exemplo@dominio.com"
                    :rules="[rules.requiredEmailObrigatorio]" variant="outlined" :loading="loadingEmail"
                    :error="!!emailError" :hint="emailError" persistent-hint />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6">
                  <label for="telefone">Telefone:</label>
                  <VTextField id="telefone" density="compact" v-model="form.telefone" name="telefone"
                    :rules="[rules.requiredTelefoneObrigatorio]" variant="outlined" v-maska="'(##) #####-####'"
                    placeholder="(99) 99999-9999" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6">
                  <label for="dataNascimento">Data de nascimento:</label>
                     <VTextField id="dataNascimento" v-model="form.dataNascimento" density="compact"
                    :rules="[rules.requiredDataNascimentoObrigatorio]" name="dataNascimento" v-maska="'##/##/####'"
                    placeholder="DD/MM/AAAA" variant="outlined" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6">
                  <label for="senha">Senha:</label>
                  <VTextField id="senha" density="compact" v-model="form.senha" name="senha" type="password"
                    :rules="[rules.requiredSenhaObrigatoria]" variant="outlined" />
                </VCol>
              </VRow>
            </v-form>
          </template>

          <!--Segundo step - Informações Profissionais-->
          <template #item.2>
            <v-form>
              <VRow class="pb-8">
                <VCol class="mb-10 mt-10 mt-md-0" cols="12">
                  <h2 class="text-start text-h5 font-weight-bold" style="color: #1976d2">
                    2. Informações Profissionais
                  </h2>
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium " cols="12" md="6">
                  <label for="crm">CRM:</label>
                  <VTextField id="crm" density="compact" v-model="form.crm" name="crm"
                    :rules="[rules.requiredCrmObrigatorio]" variant="outlined" maxlength="8"
                    placeholder="1234567 ou 123456-7" />
                  <label for="experiencia">Anos de experiência:</label>
                  <VTextField id="experiencia" density="compact" v-model="form.experiencia" name="experiencia"
                    :rules="[rules.requiredExperienciaObrigatorio]" variant="outlined" v-maska="'##'"
                    placeholder="00" />

                </VCol>

                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6">
                  <label for="crm">UF do CRM:</label>
                  <VCombobox variant="outlined" density="compact" :items="UFlist" v-model="form.ufCrm" />
                  <label for="especializacao">Especialização:</label>
                  <VTextField id="especializacao" density="compact" v-model="form.especializacao" name="especializacao"
                    :rules="[rules.requiredEspecializacaoObrigatorio]" variant="outlined" />
                </VCol>


                <VCol class="my-0 py-0 font-weight-medium" cols="12">
                  <label for="foco">Foco de atuação:</label>
                  <VTextField id="foco" density="compact" v-model="form.foco" name="foco"
                    :rules="[rules.requiredFocoObrigatorio]" variant="outlined" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12">
                  <label for="perfil">Perfil profissional:</label>
                  <VTextarea id="perfil" density="compact" v-model="form.perfil" name="perfil"
                    :rules="[rules.requiredPerfilObrigatorio]" variant="outlined" rows="3" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12">
                  <label for="carreira">Carreira:</label>
                  <VTextarea id="carreira" density="compact" v-model="form.carreira" name="carreira"
                    :rules="[rules.requiredCarreiraObrigatorio]" variant="outlined" rows="3" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12">
                  <label for="destaques">Destaques:</label>
                  <VTextarea id="destaques" density="compact" v-model="form.destaques" name="destaques"
                    :rules="[rules.requiredDestaquesObrigatorio]" variant="outlined" rows="3" />
                </VCol>
              </VRow>
            </v-form>
          </template>

          <!--Terceiro step - Endereço e Redes Sociais-->
          <template #item.3>
            <v-form>
              <VRow class="pb-8">
                <VCol class="mb-10 mt-10 mt-md-0" cols="12">
                  <h2 class="text-start text-h5 font-weight-bold" style="color: #1976d2">
                    3. Endereço e Redes Sociais
                  </h2>
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6">
                  <label for="cep">CEP:</label>
                  <VTextField id="cep" density="compact" v-model="form.cep" name="cep"
                    :rules="[rules.requiredCepObrigatorio]" variant="outlined" v-maska="'#####-###'"
                    @blur="buscarCep(form.cep)" placeholder="00000-000" :loading="loadingCep">
                    <template #append-inner>
                      <v-progress-circular v-if="loadingCep" size="20" indeterminate
                        color="primary"></v-progress-circular>
                    </template>
                  </VTextField>
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6">
                  <label for="uf">UF:</label>
                  <VTextField id="uf" density="compact" v-model="form.uf" name="uf"
                    :rules="[rules.requiredUfObrigatorio]" variant="outlined" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="8">
                  <label for="rua">Rua:</label>
                  <VTextField id="rua" density="compact" v-model="form.rua" name="rua"
                    :rules="[rules.requiredRuaObrigatorio]" variant="outlined" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="4">
                  <label for="numero">Número:</label>
                  <VTextField id="numero" density="compact" v-model="form.numero" name="numero"
                    :rules="[rules.requiredNumeroObrigatorio]" variant="outlined" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6">
                  <label for="bairro">Bairro:</label>
                  <VTextField id="bairro" density="compact" v-model="form.bairro" name="bairro"
                    :rules="[rules.requiredBairroObrigatorio]" variant="outlined" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6">
                  <label for="cidade">Cidade:</label>
                  <VTextField id="cidade" density="compact" v-model="form.cidade" name="cidade"
                    :rules="[rules.requiredCidadeObrigatorio]" variant="outlined" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6">
                  <label for="linkInstagram">Link do Instagram:</label>
                  <VTextField id="linkInstagram" density="compact" v-model="form.linkInstagram" name="linkInstagram"
                    variant="outlined" :rules="[rules.validarInstagram]"
                    placeholder="https://instagram.com/seu_usuario" />
                  <div class="text-caption text-grey mt-1">
                    Exemplo: https://instagram.com/seu_usuario
                  </div>
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6">
                  <label for="linkFacebook">Link do Facebook:</label>
                  <VTextField id="linkFacebook" density="compact" v-model="form.linkFacebook" name="linkFacebook"
                    variant="outlined" :rules="[rules.validarFacebook]"
                    placeholder="https://facebook.com/seu_usuario" />
                  <div class="text-caption text-grey mt-1">
                    Exemplo: https://facebook.com/seu_usuario
                  </div>
                </VCol>
              </VRow>
            </v-form>
          </template>

          <!--Quarto step - Documentação e Assinatura-->
          <template #item.4>
            <v-form>
              <VRow class="pb-8">
                <VCol class="mb-10 mt-10 mt-md-0" cols="12">
                  <h2 class="text-start text-h5 font-weight-bold" style="color: #1976d2">
                    4. Documentação e Assinatura
                  </h2>
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6">
                  <label for="diaFuncionamentoInicio">Dia de funcionamento (início):</label>
                  <v-select id="diaFuncionamentoInicio" density="compact" v-model="form.diaFuncionamentoInicio"
                    name="diaFuncionamentoInicio" :items="diasSemana" :rules="[rules.requiredDiaInicioObrigatorio]"
                    variant="outlined" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6">
                  <label for="diaFuncionamentoFim">Dia de funcionamento (fim):</label>
                  <v-select id="diaFuncionamentoFim" density="compact" v-model="form.diaFuncionamentoFim"
                    name="diaFuncionamentoFim" :items="diasSemana" :rules="[rules.requiredDiaFimObrigatorio]"
                    variant="outlined" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6">
                  <label for="horarioInicio">Horário de início:</label>
                  <VTextField id="horarioInicio" density="compact" v-model="form.horarioInicio" name="horarioInicio"
                    :rules="[rules.requiredHorarioInicioObrigatorio]" type="time" variant="outlined" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6">
                  <label for="horarioFim">Horário de fim:</label>
                  <VTextField id="horarioFim" density="compact" v-model="form.horarioFim" name="horarioFim"
                    :rules="[rules.requiredHorarioFimObrigatorio, rules.validarHorarioFim]" type="time"
                    variant="outlined" />
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12">
                  <label for="assinatura">Assinatura digital: (Opcional)</label>
                  <VFileInput id="assinatura" name="assinatura" density="comfortable" prepend-icon="mdi-pen"
                    variant="outlined" accept=".pdf, image/*" @update:model-value="handleFileChange"
                    placeholder="Selecione o arquivo da sua assinatura"
                    show-size counter />
                  <div class="text-caption text-grey mt-1">
                    Formatos aceitos: JPG, PNG, PDF (máximo 5MB)
                  </div>
                </VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12">
                  <v-checkbox color="primary" v-model="form.declaraVeracidade" :rules="[rules.requiredCheckObrigatorio]"
                    label="Declaro a veracidade das informações fornecidas" />
                  <v-checkbox color="primary" v-model="form.aceitaCompartilharDados"
                    :rules="[rules.requiredCheckObrigatorio]"
                    label="Aceito compartilhar meus dados com a FitCertify365" />
                  <v-checkbox color="primary" v-model="form.aceitaTermos" :rules="[rules.requiredCheckObrigatorio]">
                    <template #label>
                      <span>
                        Li e concordo com os
                        <span class="cursor-pointer text-decoration-underline" style="color: #00c6fe"
                          @click="showModalTerms = true">
                          termos de Uso e Política de Privacidade </span>.
                      </span>
                    </template></v-checkbox>
                </VCol>
              </VRow>
            </v-form>
          </template>

          <!-- Botões de navegação -->
          <template #actions>
            <div class="pa-6">
              <!-- Campos pendentes -->
              <v-alert v-if="step === 4 && validationErrors.length > 0"
                type="warning"
                variant="tonal"
                class="mb-6"
                rounded="lg">
                <template #prepend>
                  <v-icon>mdi-alert-circle</v-icon>
                </template>
                <div class="text-subtitle-1 font-weight-medium mb-3">Campos pendentes:</div>
                <div class="d-flex flex-wrap ga-2">
                  <v-chip v-for="error in validationErrors"
                    :key="error"
                    size="small"
                    color="warning"
                    variant="outlined">
                    {{ error }}
                  </v-chip>
                </div>
              </v-alert>

              <!-- Botões -->
              <div class="d-flex justify-space-between align-center pb-5">
                <VBtn v-if="step > 1"
                  color="grey"
                  variant="outlined"
                  size="large"
                  @click="step--"
                  class="px-8">
                  <v-icon start>mdi-arrow-left</v-icon>
                  Voltar
                </VBtn>
                <div v-else></div>

                <VBtn v-if="step < 4"
                  color="#1976d2"
                  variant="flat"
                  size="large"
                  @click="handleNext(() => step++)"
                  :disabled="!isCurrentStepValid"
                  class="px-8">
                  Próximo
                  <v-icon end>mdi-arrow-right</v-icon>
                </VBtn>

                <VBtn v-else
                  :disabled="loading || disabled"
                  color="#1976d2"
                  variant="flat"
                  size="large"
                  @click="submitMedico"
                  :loading="loading"
                  class="px-8">
                  <v-icon start>mdi-check</v-icon>
                  Finalizar Cadastro
                </VBtn>
              </div>
            </div>
          </template>
        </VStepper>
      </v-container>
    </VCol>
  </VRow>

  <v-dialog v-model="showAnalysisModal" max-width="500" persistent>
    <v-card>
      <v-card-title class="text-h5 text-center pa-6" style="color: #1976d2">
        <v-icon color="#1976d2" size="40" class="mr-3">mdi-check-circle</v-icon>
        Cadastro Realizado!
      </v-card-title>

      <v-card-text class="pa-6 text-center">
        <p class="text-h6 mb-4">
          Seu cadastro foi enviado com sucesso!
        </p>
        <p class="text-body-1 mb-4">
          Nossa equipe irá analisar seus dados e documentos. Você receberá um e-mail de confirmação assim que sua conta
          for aprovada.
        </p>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-spacer></v-spacer>
        <v-btn color="#1976d2" variant="flat" size="large" @click="goToLogin" block>
          Continuar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="showModalTerms" width="600" height="800">
    <v-card class="py-5 px-md-3 custom-scroll" rounded="xl">
      <v-card-title class="text-center text-h5" style="
                          color: #00c6fe;
                          white-space: normal;
                          word-wrap: break-word;
                        ">Política de Privacidade, Termos e Condições de Uso e
        Proteção de Dados</v-card-title>
      <v-card-text>
        <p class="mb-5"><strong>1. Introdução</strong></p>

        <p>
          Bem-vindo(a) à <strong>FitCertify365</strong> (“Companhia”, “nós”,
          “nosso”, “conosco”)! <br />
          <br />
          Estes Termos de Serviço (“Termos”, “Termos de
          Serviço”, “Termos e Condições de Uso”) regem o uso dos
          nossos aplicativos móveis e plataforma digital,
          desenvolvidos pela FitCertify365.
        </p>

        <p>
          Nossa <strong>Política de Privacidade</strong> também rege o uso do
          nosso Serviço e explica como coletamos, protegemos e
          divulgamos informações resultantes da sua utilização
          dos aplicativos móveis e páginas web. <br />
          <br />
          Seu acordo conosco inclui estes Termos e nossa
          Política de Privacidade (“Acordos”). Ao utilizar
          nossos serviços, você reconhece que leu e compreendeu
          os Acordos, e concorda em estar legalmente vinculado a
          eles.
        </p>

        <p>
          Caso não concorde (ou não possa cumprir) os Acordos,
          você não poderá utilizar o Serviço. Neste caso,
          solicitamos que nos comunique pelo e-mail
          <strong>atendimento@fitcertify365.com</strong> para que possamos buscar
          uma solução. <br />
          <br />
          Estes Termos aplicam-se a todos os visitantes,
          usuários e demais pessoas que desejarem acessar ou
          utilizar o Serviço.
        </p>

        <p>
          Este aplicativo pode se integrar com o <strong>Apple Saúde (HealthKit ou CareKit)</strong> e
          com o
          <strong>Google Health Connect</strong>, para leitura e acompanhamento de dados obtidos via
          Apple Watch e outros
          dispositivos wearables compatíveis, permitindo também o envio de dados manuais e de
          dispositivos Bluetooth
          (BLE), sempre mediante autorização do usuário.
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
</template>

<script setup>
import {  useForm } from 'vee-validate'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import dayjs from 'dayjs'
import customParseFormat from "dayjs/plugin/customParseFormat";
import { isValidDate } from '@/utils/isValidDate'
import { removerOffsetTimezone } from '@/utils/date.utils'
import medicoService from '@/services/medico/medico-service'
import { vMaska } from 'maska/vue'
import userService from '@/services/user/user-service'
import { getErrorMessage } from '@/common/error.utils'

dayjs.locale('pt-br')
dayjs.extend(customParseFormat);

const step = ref(1)
const router = useRouter()
const loading = ref(false)
const loadingCep = ref(false)
const formAssinatura = ref(null)
const showAnalysisModal = ref(false)
const showModalTerms = ref(false)
const validationErrors = computed(() => getValidationErrors())

const disabled = computed(() => validationErrors.value.length > 0)

const isStep1Valid = computed(() => {
  return (
    form.value.nome &&
    form.value.cpf &&
    validarCPF(form.value.cpf) &&
    form.value.email &&
    validarEmail(form.value.email) &&
    !emailError.value &&
    form.value.telefone &&
    form.value.dataNascimento &&
    isValidDate(form.value.dataNascimento) &&
    form.value.senha &&
    validarSenhaForte(form.value.senha)
  )
})

const isStep2Valid = computed(() => {
  return (
    form.value.crm &&
    form.value.ufCrm &&
    form.value.especializacao &&
    form.value.experiencia &&
    form.value.foco &&
    form.value.perfil &&
    form.value.carreira &&
    form.value.destaques
  )
})

const isStep3Valid = computed(() => {
  return (
    form.value.cep &&
    form.value.rua &&
    form.value.bairro &&
    form.value.numero &&
    form.value.cidade &&
    form.value.uf
  )
})

const isStep4Valid = computed(() => {
  return (
    form.value.diaFuncionamentoInicio &&
    form.value.diaFuncionamentoFim &&
    form.value.horarioInicio &&
    form.value.horarioFim &&
    validarHorario(form.value.horarioInicio) &&
    validarHorario(form.value.horarioFim) &&
    form.value.horarioInicio < form.value.horarioFim &&
    form.value.declaraVeracidade &&
    form.value.aceitaCompartilharDados &&
    form.value.aceitaTermos
  )
})

const isCurrentStepValid = computed(() => {
  switch (step.value) {
    case 1:
      return isStep1Valid.value
    case 2:
      return isStep2Valid.value
    case 3:
      return isStep3Valid.value
    case 4:
      return isStep4Valid.value
    default:
      return false
  }
})
const loadingEmail = ref(false)
const emailError = ref('')
const UFlist = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO'
]
async function onBlurEmail(email) {
  if (!email) return
  loadingEmail.value = true
  emailError.value = ''

  await userService
    .validarExisteEmail(email)
    .then((resp) => {
      const data = resp?.data

      if (data?.existeEmail == true) {
        emailError.value = 'Este email já está cadastrado no sistema'
      }
    })
    .finally(() => (loadingEmail.value = false))
}

function formatarDataParaISO(dataDigitada) {
  if (!dataDigitada) return "";
  const data = dayjs(dataDigitada, "DD/MM/YYYY", true);
  return data.isValid() ? removerOffsetTimezone(data.startOf("day").toISOString()) : "";
}



function maisTermos() {
  showModalTerms.value = false
  window.open('/politicaPrivacidade', '_blank')
}

const formatarHorarioParaISO = (horario) => {
  if (!horario) return ''
  const dataBase = '2000-01-01'
  const [hora, minuto] = horario.split(':')
  const dataComHorario = new Date(dataBase + 'T' + hora + ':' + minuto + ':00.000Z')
  return removerOffsetTimezone(dataComHorario.toISOString())
}

const validarHorario = (horario) => {
  if (!horario) return false
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
  return regex.test(horario)
}

const handleFileChange = (file) => {
  if (file) {
    const maxSize = 5 * 1024 * 1024 // 5MB em bytes
    if (file.size > maxSize) {
      toast.error('Arquivo muito grande. Tamanho máximo permitido: 5MB', { autoClose: 3000 })
      return
    }

    // Validar tipo do arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Tipo de arquivo não permitido. Use JPG, PNG ou PDF', { autoClose: 3000 })
      return
    }

    // Atualizar o formulário
    formAssinatura.value = file
    toast.success('Arquivo selecionado com sucesso!', { autoClose: 2000 })
  } else {
    formAssinatura.value = null
  }
}

// Função para navegar para o login
const goToLogin = () => {
  showAnalysisModal.value = false
  router.push('/login')
}



// Configuração do vee-validate
const { handleSubmit, errors } = useForm({
  validateOnMount: false,
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
})

// Formulário
const form = ref({
  nome: '',
  cpf: '',
  email: '',
  telefone: '',
  dataNascimento: '',
  crm: '',
  ufCrm: '',
  especializacao: '',
  experiencia: '',
  foco: '',
  perfil: '',
  carreira: '',
  destaques: '',
  diaFuncionamentoInicio: '',
  diaFuncionamentoFim: '',
  horarioInicio: '',
  horarioFim: '',
  cep: '',
  rua: '',
  bairro: '',
  numero: '',
  cidade: '',
  uf: '',
  linkInstagram: '',
  linkFacebook: '',
  declaraVeracidade: false,
  aceitaCompartilharDados: false,
  aceitaTermos: false,
  assinatura: null,
  senha: ''
})


const diasSemana = ref([
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo'
])

const titleStep = [
  'Comece agora sua jornada como médico na FitCertify365.',
  'Complete suas informações profissionais.',
  'Configure seu endereço e redes sociais.',
  'Finalize seu cadastro com documentação.',
]

const textStep = [
  'Criar sua conta de médico na FitCertify365 é rápido, seguro e gratuito. Com ela, você poderá atender pacientes, gerenciar consultas e emitir certificados médicos.',
  'Precisamos desses dados para compor seu perfil profissional. Nenhuma informação será compartilhada sem sua autorização.',
  'Configure seu endereço e redes sociais para completar seu perfil.',
  'Selecione sua assinatura digital e configure seus horários de atendimento para finalizar seu cadastro.',
]

const item = ['Informações Pessoais', 'Informações Profissionais', 'Endereço e Redes Sociais', 'Documentação e Assinatura']

const buscarCep = async (cep) => {
  if (!cep || cep.replace(/\D/g, '').length !== 8) return

  loadingCep.value = true

  try {
    const cepLimpo = cep.replace(/\D/g, '')
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    const data = await response.json()

    if (data.erro) {
      toast.error('CEP não encontrado', { autoClose: 3000 })
      return
    }

    form.value.rua = data.logradouro || ''
    form.value.bairro = data.bairro || ''
    form.value.cidade = data.localidade || ''
    form.value.uf = data.uf || ''


  } catch (error) {
    toast.error('Erro ao buscar CEP: ' + getErrorMessage(error, 'Erro desconhecido'), { autoClose: 3000 })
  } finally {
    loadingCep.value = false
  }
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '')
  if (cpf.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpf)) return false

  let soma = 0
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i)
  let resto = (soma * 10) % 11
  if (resto === 10) resto = 0
  if (resto !== parseInt(cpf[9])) return false

  soma = 0
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i)
  resto = (soma * 10) % 11
  if (resto === 10) resto = 0
  if (resto !== parseInt(cpf[10])) return false

  return true
}

function validarEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}

function validarSenhaForte(senha) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{8,}$/
  return regex.test(senha)
}

const rules = {
  requiredNomeObrigatorio: (value) => !!value || 'Nome obrigatório',

  requiredCpfObrigatorio: (value) => {
    if (!value) return 'CPF obrigatório'
    return validarCPF(value) || 'CPF inválido'
  },

  requiredEmailObrigatorio: (value) => {
    if (!value) return 'E-mail obrigatório'
    return validarEmail(value) || 'E-mail inválido'
  },

  requiredSenhaObrigatoria: (value) => {
    if (!value) return 'Senha obrigatória'
    return (
      validarSenhaForte(value) ||
      'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial'
    )
  },

  requiredTelefoneObrigatorio: (value) => !!value || 'Telefone obrigatório',

  requiredDataNascimentoObrigatorio: (value) => {
    if (!value) return 'Data de nascimento obrigatória'
    return isValidDate(value) || 'Data de nascimento inválida'
  },

  requiredCrmObrigatorio: (value) => {
    if (!value) return 'CRM obrigatório'
    const crmRegex = /^\d+/
    return crmRegex.test(value) || 'CRM deve estar no formato 1234567 ou 12312-2'
  },
  requiredEspecializacaoObrigatorio: (value) => !!value || 'Especialização obrigatória',
  requiredExperienciaObrigatorio: (value) => !!value || 'Anos de experiência obrigatório',
  requiredFocoObrigatorio: (value) => !!value || 'Foco de atuação obrigatório',
  requiredPerfilObrigatorio: (value) => !!value || 'Perfil profissional obrigatório',
  requiredCarreiraObrigatorio: (value) => !!value || 'Carreira obrigatória',
  requiredDestaquesObrigatorio: (value) => !!value || 'Destaques obrigatório',
  requiredCepObrigatorio: (value) => !!value || 'CEP obrigatório',
  requiredRuaObrigatorio: (value) => !!value || 'Rua obrigatória',
  requiredBairroObrigatorio: (value) => !!value || 'Bairro obrigatório',
  requiredNumeroObrigatorio: (value) => !!value || 'Número obrigatório',
  requiredCidadeObrigatorio: (value) => !!value || 'Cidade obrigatória',
  requiredUfObrigatorio: (value) => !!value || 'UF obrigatória',
  requiredDiaInicioObrigatorio: (value) => !!value || 'Dia de início obrigatório',
  requiredDiaFimObrigatorio: (value) => !!value || 'Dia de fim obrigatório',
  requiredHorarioInicioObrigatorio: (value) => {
    if (!value) return 'Horário de início obrigatório'
    return validarHorario(value) || 'Horário inválido (formato: HH:MM)'
  },
  requiredHorarioFimObrigatorio: (value) => {
    if (!value) return 'Horário de fim obrigatório'
    return validarHorario(value) || 'Horário inválido (formato: HH:MM)'
  },

  validarHorarioFim: (value) => {
    if (!value || !form.value.horarioInicio) return true
    const inicio = form.value.horarioInicio
    const fim = value
    if (inicio >= fim) return 'Horário de fim deve ser maior que o horário de início'
    return true
  },

  validarInstagram: (value) => {
    if (!value) return true
    const regex = /^https?:\/\/(www\.)?(instagram\.com|instagr\.am)\/.+/
    return regex.test(value) || 'Link do Instagram inválido'
  },

  validarFacebook: (value) => {
    if (!value) return true
    const regex = /^https?:\/\/(www\.)?(facebook\.com|fb\.com)\/.+/
    return regex.test(value) || 'Link do Facebook inválido'
  },
  requiredAssinaturaObrigatorio: (value) => !!value || 'Assinatura obrigatória',
  requiredCheckObrigatorio: (value) => !!value || 'Campo obrigatório',
}

const handleNext = async (next) => {
  if (step.value === 4) {
    try {
      await submitMedico()
    } catch (error) {
      toast.error("Erro ao realizar cadastro: " + getErrorMessage(error, 'Erro desconhecido'), { autoClose: 3000 })
    }
  } else {
    next()
  }
}

const getValidationErrors = () => {
  const errors = []

  if (!form.value.nome.trim()) errors.push('Nome completo')
  if (!form.value.cpf.replace(/\D/g, '')) errors.push('CPF')
  if (!validarCPF(form.value.cpf) && form.value.cpf.replace(/\D/g, '')) errors.push('CPF válido')
  if (!form.value.email.trim()) errors.push('Email')
  if (!validarEmail(form.value.email) && form.value.email.trim()) errors.push('Email válido')
  if (!form.value.crm.trim()) errors.push('Número do CRM')
  if (!form.value.ufCrm) errors.push('UF do CRM')
  if (!form.value.telefone.replace(/\D/g, '')) errors.push('Telefone')
  if (!form.value.dataNascimento) errors.push('Data de nascimento')
  if (!isValidDate(form.value.dataNascimento) && form.value.dataNascimento) errors.push('Data de nascimento válida')

  if (!form.value.senha) errors.push('Senha')
  if (!validarSenhaForte(form.value.senha) && form.value.senha) errors.push('Senha válida')
  if (!form.value.especializacao.trim()) errors.push('Especialização')
  if (!form.value.foco.trim()) errors.push('Foco de atuação')

  if (!form.value.perfil.trim()) errors.push('Perfil profissional')
  if (!form.value.carreira.trim()) errors.push('Carreira')
  if (!form.value.destaques.trim()) errors.push('Destaques')
  if (!form.value.horarioInicio) errors.push('Horário de funcionamento - Início')
  if (!form.value.horarioFim) errors.push('Horário de funcionamento - Fim')

  if (!form.value.diaFuncionamentoInicio) errors.push('Dia de funcionamento - Início')
  if (!form.value.diaFuncionamentoFim) errors.push('Dia de funcionamento - Fim')
  if (!form.value.cep.trim()) errors.push('CEP')
  if (!form.value.rua.trim()) errors.push('Rua')
  if (!form.value.bairro.trim()) errors.push('Bairro')
  if (!form.value.numero.trim()) errors.push('Número')
  if (!form.value.cidade.trim()) errors.push('Cidade')
  if (!form.value.uf) errors.push('UF')

  if (!form.value.aceitaCompartilharDados) errors.push('Aceitar compartilhamento de dados')
  if (!form.value.aceitaTermos) errors.push('Aceitar termos de uso')
  if (!form.value.declaraVeracidade) errors.push('Declarar veracidade das informações')

  return errors
}

const submitMedico = async () => {
  try {
    loading.value = true

    const formData = new FormData()
    formData.append('nome', form.value.nome)
    formData.append('cpf', form.value.cpf.replace(/\D/g, '') || '')
    formData.append('email', form.value.email)
    formData.append('telefone', form.value.telefone.replace(/\D/g, '') || '')
    formData.append('dataNascimento', formatarDataParaISO(form.value.dataNascimento))
    formData.append('senha', form.value.senha)

    formData.append('crm', form.value.crm + '/' + form.value.ufCrm)
    formData.append('especializacao', form.value.especializacao)
    formData.append('experiencia', form.value.experiencia)
    formData.append('foco', form.value.foco)
    formData.append('perfil', form.value.perfil)
    formData.append('carreira', form.value.carreira)
    formData.append('destaques', form.value.destaques)

    formData.append('cep', form.value.cep)
    formData.append('rua', form.value.rua)
    formData.append('bairro', form.value.bairro)
    formData.append('numero', form.value.numero)
    formData.append('cidade', form.value.cidade)
    formData.append('uf', form.value.uf)
    formData.append('linkInstagram', form.value.linkInstagram || '')
    formData.append('linkFacebook', form.value.linkFacebook || '')

    formData.append('diaFuncionamentoInicio', form.value.diaFuncionamentoInicio)
    formData.append('diaFuncionamentoFim', form.value.diaFuncionamentoFim)
    formData.append('horarioInicio', formatarHorarioParaISO(form.value.horarioInicio))
    formData.append('horarioFim', formatarHorarioParaISO(form.value.horarioFim))
    formData.append('declaraVeracidade', form.value.declaraVeracidade)
    formData.append('aceitaCompartilharDados', form.value.aceitaCompartilharDados)
    formData.append('aceitaTermos', form.value.aceitaTermos)

    // Arquivo de assinatura (se existir)
    if (formAssinatura.value) {
      formData.append('assinatura', formAssinatura.value)
    }

    const response = await medicoService.createMedico(formData)
    if (response.success) {
      // Mostrar modal de análise em vez de redirecionar
      showAnalysisModal.value = true
    } else {
      toast.error("Erro ao realizar cadastro", { autoClose: 3000 })
    }

  } catch (error) {
    toast.error("Erro ao realizar cadastro: " + getErrorMessage(error, 'Erro desconhecido'), { autoClose: 5000 })
  } finally {
    loading.value = false
  }
}
// #Todo timezone em data inicio e horario inicio e horario final e data final para fazer 100% agendamento
</script>

<style scoped>
.teste {
  background-color: red;
}
</style>
