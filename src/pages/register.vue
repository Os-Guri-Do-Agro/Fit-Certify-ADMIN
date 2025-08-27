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


        <!--Primeiro slid-->
          <template #item.1>
          <v-form>

          <VRow>
            <VCol class="mb-10 mt-10 mt-md-0" cols="12"><h2 class="text-start text-h5 font-weight-bold" style="color: #88CE0D;">1. Informações Pessoais</h2></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="8"><label for="nomeCompleto">Nome completo:</label>
              <VTextField v-model="form.nomeCompleto" :error-messages="errors.nomeCompleto" density="compact" name="nomeCompleto" id="nomeCompleto" variant="outlined"/>
            </VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="4"><label for="cpf">CPF</label>
              <VTextField v-model="form.cpf" :error-messages="errors.cpf" placeholder="000.000.000-00" density="compact" name="cpf" id="cpf" variant="outlined"/>
            </VCol>
          

            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6"><label for="senha">Senha</label>
              <VTextField v-model="form.senha" :error-messages="errors.senha" density="compact" name="senha" id="senha" type="password" variant="outlined"/>
            </VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6"><label for="formEmail">E-mail</label>
              <VTextField v-model="form.email" :error-messages="errors.email" placeholder="exemplo@dominio.com" density="compact" id="formEmail" type="email" variant="outlined"/>
            </VCol>


            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6"><label for="telefone">Telefone:</label>
              <VTextField v-model="form.telefone" :error-messages="errors.telefone" placeholder="(99) 9 9999-9999" density="compact" name="telefone" id="telefone" type="tel" variant="outlined"/>
            </VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="6"><label for="nascimento">Data de nascimento:</label>
              <VTextField v-model="form.dataDeNascimento" :error-messages="errors.dataDeNascimento" placeholder="DD/MM/AAAA" density="compact" name="nascimento" id="nascimento" variant="outlined"/>
            </VCol>


            <VCol class="my-0 py-0 font-weight-medium" cols="6" md="12"><label for="altura">Altura (cm):</label>
              <VTextField density="compact" v-model="form.altura" :error-messages="errors.altura" placeholder="0.00cm" name="altura" id="altura" variant="outlined"/>
            </VCol>

            <VCol class="my-0 py-0 font-weight-medium" cols="6" md="12"><label for="peso">Peso (kg):</label>
              <VTextField density="compact" v-model="form.peso" :error-messages="errors.peso" placeholder="0.00kg" name="peso" id="peso" variant="outlined"/>
            </VCol>

            <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="pratica">Pratica atividade física regularmente?</label>
              <v-select density="compact"
            v-model="form.atividadeFisica"
            :error-messages="errors.atividadeFisica"
            :items="items"
            id="pratica"
            variant="outlined"
            placeholder="Sim"
            ></v-select>
          </VCol>
                                      
          </VRow>
          </v-form>
          </template>


          <!--Segundo slide-->
          <template #item.2>
            <v-form>
            <VRow class="pa-0 ma-0 fill-md-height d-flex flex-column flex-md-row">


            <VCol class="d-flex ma-0 pa-0 pr-0 pr-md-3"  md="6">
                <v-row class="d-flex " >
                    <v-col cols="12">
                <h2 class="text-start text-h5 font-weight-bold mb-5" style="color: #88CE0D;">2. Histórico de Saúde</h2>
                <div class="mb-5"><span class="text-black font-weight-medium">Já foi diagnosticado com alguma das condições abaixo?</span></div>
                        <v-checkbox
                            v-for="(item, index) in doencas"
                            :key="index"
                            v-model="formDoencas.doencas"
                            :label="item.descricao"
                            :value="item.descricao"
                            hide-details
                            density="compact"
                            color="success"
                        />

                        <VRow>
                            <VCol cols="12">
                        <div class="mt-5 d-flex flex-column">
                            <span class="text-black">Outras condições médicas:</span>
                            <v-textarea class="text-black" v-model="form.outrasCondicoes" :error-messages="errors.outrasCondicoes" no-resize rows="2" color="black" variant="outlined"></v-textarea>
                        </div>
                            </VCol>


                            <VCol cols="12">
                        <div class="mt-5 d-flex flex-column">
                            <span class="text-black">Toma algum medicamento contínuo? Se sim, qual?</span>
                            <v-textarea class="text-black custom-textarea" v-model="form.tomaMedicamento" :error-messages="errors.tomaMedicamento" rows="2"  no-resize max-height="20px" color="black" variant="outlined"></v-textarea>
                        </div>
                            </VCol>
                        </VRow>

                    </v-col>
                </v-row>
            </VCol>

            
            <VCol class="d-flex pa-0 ma-0" md="6">
                <v-row class="d-flex h-100" >
                    <v-col class="h-100" cols="12">
                <h2 class="text-start text-h5 font-weight-bold mb-5" style="color: #88CE0D;">3. Sinais e Sintomas Recentes</h2>
                <div class="mb-5"><span class="text-black font-weight-medium">Já foi diagnosticado com alguma das condições abaixo?</span></div>
                        <v-checkbox
                            v-for="(item, index) in sintomas"
                            :key="index"
                            v-model="formSintomas.sintomas"
                            :label="item.descricao"
                            :value="item.descricao"
                            hide-details
                            density="compact"
                            color="success"
                        />

                        <div class="mt-7">
                            <h2 class="text-start text-h5 font-weight-bold mb-7" style="color: #88CE0D;">4. Histórico Esportivo</h2>
                            <VRow>
                            <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="objetivo_atividade">Objetivo com a atividade física:</label><v-select density="compact"
                            v-model="select.value.value"
                            :error-messages="errors.atividadeFisica"
                            :items="objetivos"
                            id="objetivo_atividade"
                            placeholder="Saúde geral"
                            variant="outlined"
                            ></v-select></VCol>

                            <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="Objetivo_pratica">Já participou de provas antes?</label>
                              <v-select density="compact"
                            v-model="form.participouProva"
                            :error-messages="errors.atividadeFisica"
                            :items="items"
                            id="Objetivo_pratica"
                            placeholder="Sim"
                            variant="outlined"
                            ></v-select></VCol>

                                <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="ultimasprovas">Se sim, qual a última?</label>
                                  <VTextField v-model="form.ultimaProva" name="ultimasprovas" id="ultimasprovas" density="compact" variant="outlined"/>
                                </VCol>
                                
                            </VRow>
                        </div>

                    </v-col>
                </v-row>
            </VCol>

        </VRow>
        </v-form>
          </template>

          <!--Terceiro slide-->
          <template #item.3>
            <v-form>

  <div class="d-flex flex-column justify-space-between">
    <div class="mt-10 mt-md-0 d-flex">
                <h2 class="text-start text-h5 font-weight-bold mb-5" style="color: #88CE0D;">
                    5. Exames e Dados Complementares
                </h2>
            </div>

            <VRow class="d-flex">
                <v-form class="w-100">
                <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="check">Fez check-up nos últimos 12 meses?</label><v-select
                  density="comfortable"
                  v-model="form.fezcheckUp"
                  :error-messages="errors.fezcheckUp"
                  :items="items"
                  name="check"
                  id="check"
                  placeholder="Sim"
                  variant="outlined"
                ></v-select></VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="arquivos">Anexar exames (PDF ou imagem):</label>
                  <VFileInput v-model="formPdfImage.pdfImages" density="comfortable" prepend-icon="" name="arquivos" id="arquivos" variant="outlined"/></VCol>
                <VCol class="my-0 py-0 font-weight-medium " cols="12"><label for="possuiSmartwatch">Possui smartwatch ou app de treino?</label><v-select
                  density="comfortable"
                  v-model="form.possuiSmartwatch"
                  :error-messages="errors.possuiSmartwatch"
                  :items="items"
                  id="possuiSmartwatch"
                  placeholder="Sim"
                  variant="outlined"
                ></v-select></VCol>
            <VCol class="my-0 px-1" cols="12">
                <v-checkbox class="font-weight-medium" color="success" required label=" Desejo integrar meus dados com a FitCertify365"></v-checkbox>
            </VCol>
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
            </div>
            </div>
            </v-form>
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
                @click="handleNext(next)"
                >
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
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import DoencaService from '../services/cadastro-service/doenca-service'
import SintomaService from '../services/cadastro-service/sintoma-service'
import AtletaService from '../services/cadastro-service/atleta-service'
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import * as yup from "yup"

dayjs.locale("pt-br");

const step = ref(1)
const router = useRouter()

const doencas = ref([])
const sintomas = ref([])
const selecionados = ref([])

const form = ref({
  nomeCompleto: '',
  cpf: '',
  senha: '',
  email: '',
  telefone: '',
  dataDeNascimento: '',
  altura: '',
  peso: '',
  atividadeFisica: null,
  outrasCondicoes: '',
  tomaMedicamento: '',
  participouProva: null,
  ultimaProva: '',
  fezcheckUp: null,
  possuiSmartwatch: null
})

const schema = yup.object({
  nomeCompleto: yup.string().required("Nome é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: yup.string().min(6, "Senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
  telefone: yup.string().required("Telefone é obrigatório"),
  dataDeNascimento: yup.string().required("Data de nascimento é obrigatória"),
  altura: yup.number().required("Altura é obrigatória"),
  peso: yup.number().required("Peso é obrigatório"),
  atividadeFisica: yup.string().required("Campo obrigatório"),
  fezcheckUp: yup.string().required("Campo obrigatório"),
  possuiSmartwatch: yup.string().required("Campo obrigatório"),
})

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
})

const formPdfImage = ref({
  pdfImages: []
})

const formDoencas = ref({
  doencas: []
})

const formSintomas = ref({
  sintomas: []
})

onMounted(async () => {
  await buscarDoenca(),
  await bruscarSintoma()
})

const buscarDoenca = async () => {
  try {
    const res = await DoencaService.getAllDoencas()
    doencas.value = res.data || []
  } catch (e) {
    console.error('Erro ao carregar doenças', e)
  }
}

const bruscarSintoma = async () => {
  try {
    const res = await SintomaService.getAllSintomas()
    sintomas.value = res.data || []
  } catch (e) {
    console.error('Erro ao carregar sintomas', e)
  }
}

const submitAtleta = handleSubmit(async (values) => {
  try {
    const formData = new FormData()

 
    for (const key in values) {
      formData.append(key, values[key])
    }


    formPdfImage.value.pdfImages.forEach((file, index) => {
      formData.append(`arquivos[${index}]`, file)
    })


    formDoencas.value.doencas.forEach((id, index) => {
      formData.append(`doencas[${index}]`, id)
    })


    formSintomas.value.sintomas.forEach((id, index) => {
      formData.append(`sintomas[${index}]`, id)
    })
    
    await AtletaService.createAtleta(formData)
    router.push("/registerPlanos")
  } catch (error) {
    console.error("Erro ao criar atleta:", error)
  }
})

const select = useField('select')

const items = ref(['Sim', 'Não'])
const objetivos = ref(['Saúde Geral', 'Objetivo 02', 'Objetivo 03'])

const handleNext = async (next) => {
  if (step.value === 3) {
    try {
      await submitAtleta()
      router.push('/registerPlanos')
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
    }
  } else {
    next()
  }
}

const declaracoes = [
  'Declaro que as informações acima são verdadeiras e autorizo a análise para fins de certificação.',
  'Aceito compartilhar meus dados com as organizações dos eventos que eu participar.',
  'Li e concordo com os Termos de Uso e Política de Privacidade.'
]

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
