<template>
  <VRow class="h-100 d-flex flex-column flex-md-row ma-0 pa-0 overflow-hidden">
    <!-- DIV DA ESQUERDA -->
    <VCol class="pa-0 ma-0" md="4" style="background-color: #42A5F5">
      <VRow class="w-100 h-100 pa-0 ma-0 flex-column">
        <VCol
          class="pa-0 ma-0 d-flex text-center flex-column align-center justify-center">
          <div class="mb-10">
            <a href="https://fitcertify365.com/" target="_blank" class="d-flex justify-center align-center logo-link">
              <v-img alt="Logo" class="mx-5 mx-lg-16" cover width="280" src="../assets/Login/logo-fit.png" style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));" />
            </a>
          </div>

          <div class="pa-0 ma-0 d-flex text-center flex-column align-center">
            <h1 class="mx-5 mx-lg-15 text-white text-h5 text-center text-md-h4 font-weight-bold" style="
                font-family: DM Sans, sans-serif;
                text-shadow: 0 2px 8px rgba(0,0,0,0.15);
                letter-spacing: -0.5px;
              ">
              {{ $t('registerPlanos.title') }}
            </h1>
            <p class="mx-5 mx-lg-15 text-white text-center text-body-1 text-md-h6 font-weight-regular mt-5 mb-10"
              style="
                font-family: DM Sans, sans-serif;
                line-height: 1.6;
                opacity: 0.95;
              ">
              {{ $t('registerPlanos.subtitle') }}
            </p>
          </div>
        </VCol>
      </VRow>
    </VCol>

    <!--DIV DA DIREITA-->
    <VCol class="h-100 d-flex align-center pa-0 ma-0" md="8" style="background: #f8f9fa;">
      <v-container class="d-flex ga-10 align-top mx-md-5 flex-column py-8">
        <div class="w-100 d-flex justify-end">
          <v-btn icon variant="text" @click="sair">
            <v-icon color="#42A5F5">mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="w-100 d-flex align-center flex-column mb-4">
          <div class="d-flex align-center ga-3 mb-4">
            <div style="width: 50px; height: 50px; border-radius: 12px; background: linear-gradient(135deg, #88ce0d 0%, #6ba80a 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(136, 206, 13, 0.4);">
              <v-icon color="white" size="24">mdi-star</v-icon>
            </div>
            <h2
              class="text-center text-h5 text-md-h4 font-weight-bold"
              style="
                color: #2c3e50;
                font-family: DM Sans, sans-serif;
                letter-spacing: -0.5px;
              "
            >
              {{ $t('registerPlanos.choosePlan') }}
            </h2>
          </div>

          <span
            class="text-center text-subtitle-1"
            style="
              font-family: DM Sans, sans-serif;
              color: #6b7280;
              line-height: 1.6;
            "
          >
            {{ $t('registerPlanos.planDescription') }}
          </span>
        </div>

        <VRow class="d-flex flex-md-row-reverse flex-column-reverse">
          <!-- LOADING -->
          <template v-if="loading">
            <VCol v-for="n in 2" :key="n" cols="12" md="6">
              <VSkeletonLoader
                type="card, actions"
                class="pa-7 rounded-xl elevation-2"
                height="606.7px"
              />
            </VCol>
          </template>

          <!-- PLANOS -->
          <template v-else>
            <VCol v-for="plano in planos" :key="plano.id" cols="12" md="6">
              <VCard
                class="pa-7 rounded-xl d-flex flex-column justify-space-between plan-card"
                min-height="606.7px"
                height="100%"
                elevation="2"
              >
                <!-- Nome e destaque -->
                <div class="d-flex align-md-center flex-column flex-md-row">
                  <VCardTitle
                    class="font-weight-bold text-h6 text-md-h5"
                    style="
                      color: #42A5F5;
                      font-family: DM Sans, sans-serif;
                    "
                    primary-title
                  >
                    {{ $t(`registerPlanos.planos.${getNomePlanoKey(plano.nome)}`) }}
                  </VCardTitle>
                  <span
                    v-if="plano.maisPopular"
                    class="text-caption font-weight-bold px-3 py-1"
                    style="color: #42A5F5; background: rgba(0, 198, 254, 0.1); border-radius: 20px;"
                  >
                    ⭐ {{ $t('registerPlanos.mostPopular') }}
                  </span>
                </div>

                <!-- Preço -->
                <div class="d-flex flex-column flex-lg-row">
                  <v-card-subtitle
                  v-if="!plano.maisPopular"
                    class="font-weight-bold text-md-h6"
                    style="
                      color: #88ce0d;
                      font-family: DM Sans, sans-serif;
                    "
                  >
                    R$
                    {{
                      plano.precoMes?.toFixed(2).replace('.', ',') || '0,00'
                    }}/{{ $t('registerPlanos.perMonth') }}
                  </v-card-subtitle>

                  <v-card-subtitle
                    v-if="plano.precoMes && plano.maisPopular"
                    class="font-weight-bold text-md-h6"
                    style="
                      color: #88ce0d;
                      font-family: DM Sans, sans-serif;
                    "
                  >
                    R$
                    {{ plano.precoAno.toFixed(2).replace('.', ',') }}/{{ $t('registerPlanos.perYear') }}
                  </v-card-subtitle>
                </div>

                <!-- Benefícios -->
                <div>
                  <v-list density="compact">
                    <v-list-item
                      v-for="item in plano.planoBeneficio"
                      :key="item.id"
                      min-height="45px"
                      class="d-flex overflow-x-auto"
                    >
                      <div class="d-flex flex-row-reverse">
                        <v-list-item-title
                          class="text-wrap flex-grow-1"
                          style="color: #5f6c7b"
                        >
                          {{ $t(`registerPlanos.beneficios.${getBeneficioKey(item.beneficio.descricao)}`) }}
                        </v-list-item-title>

                        <span
                          class="mr-1"
                          v-if="item.incluso"
                          style="
                            color: #4caf50;
                            font-weight: bold;
                            margin-left: auto;
                          "
                        >
                          ✔️
                        </span>
                        <span
                          class="mr-1"
                          v-else
                          style="
                            color: #f44336;
                            font-weight: bold;
                            margin-left: auto;
                          "
                        >
                          ❌
                        </span>
                      </div>
                    </v-list-item>
                  </v-list>
                </div>

                <!-- Botão -->
                <div>
                  <VCardActions>
                    <VBtn
                      @click="assinarPlano(plano)"
                      class="text-white w-100 text-caption text-md-subtitle-1 bg-light-green-darken-1"
                      max-width="255px"
                      height="50px"
                      rounded="xl"
                      elevation="4"
                      style="font-weight: 600; text-transform: none; letter-spacing: 0;"
                    >
                      {{ $t('registerPlanos.subscribe') }} {{ $t(`registerPlanos.planos.${getNomePlanoKey(plano.nome)}`) }}
                    </VBtn>
                  </VCardActions>
                </div>
              </VCard>
            </VCol>
          </template>
        </VRow>
      </v-container>
    </VCol>
  </VRow>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PlanoService from '../services/planos/plano-service'
import { logout } from '@/utils/auth'
import { usePlanoStore } from '@/stores/plano'

const { t } = useI18n()

const router = useRouter()
const planos = ref([])
const loading = ref(true)
const planoStore = usePlanoStore()

const getBeneficioKey = (descricao) => {
  const map = {
    'Conexão com provas parceiras': 'item_01',
    'Emissão automática de modelo oficial': 'item_02',
    'Aplicação ilimitada em diferentes provas durante a validade': 'item_03',
    'Assinatura digital + QR Code': 'item_04',
    'Descontos no Marketplace': 'item_05',
    'Acesso ao painel de saúde': 'item_06',
    'Monitoramento contínuo': 'item_07',
    'Integração com wearables': 'item_08',
    'Alertas inteligentes e histórico': 'item_09',
    'Integração com apps e dispositivos': 'item_10',
    'Acesso ao painel de saúde completo': 'item_11',
  }
  return map[descricao] || descricao
}

const getNomePlanoKey = (nome) => {
  const map = {
    'Saúde Certificada': 'saudeCertificada',
    'Saúde Ativa': 'saudeAtiva'
  }
  return map[nome] || nome
}

function sair() {
  logout()
  router.push('/login')
}

function assinarPlano(plano) {
  router.push({ name: '/pagamento/',
  query:{ planoId: plano.id } })
  console.log(plano.id)
}

const buscarPlanos = async () => {
  try {
    const res = await PlanoService.getAllPlanos()
    planos.value = res.data || []
  } catch (error) {
    console.error('Erro ao carregar planos', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await buscarPlanos()
})
</script>

<style scoped>
label,
h1,
h2,
p {
  font-family: 'DM Sans', sans-serif;
}

.plan-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
  background: white;
}

.plan-card:hover {
  border-color: #42A5F5;
  box-shadow: 0 8px 24px rgba(0, 198, 254, 0.2) !important;
  transform: translateY(-4px);
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

.logo-link {
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
}
</style>
