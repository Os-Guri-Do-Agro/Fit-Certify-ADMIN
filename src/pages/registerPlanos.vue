<template>
  <VRow class="h-100 d-flex flex-column flex-md-row ma-0 pa-0 overflow-hidden">
    <!-- DIV DA ESQUERDA -->
    <VCol class="pa-0 ma-0" md="4" style="background-color: #00c6fe">
      <VRow class="w-100 h-100 pa-0 ma-0 flex-column">
        <VCol class="pa-0 ma-0 flex-fill" cols="12">
          <div
            class="d-flex w-100 h-100 align-end justify-center justify-md-start mt-5 mt-md-0 pb-15"
          >
            <v-img
              src="../assets/Login/logo-fit.png"
              max-width="200"
              alt="Logo"
              cover
              class="mx-5 mx-lg-15"
            ></v-img>
          </div>
        </VCol>
        <VCol
          class="pa-0 ma-0 d-flex text-center text-md-start flex-column align-center flex-fill"
          cols="12"
        >
          <h1
            class="mx-5 mx-lg-15 text-white text-h5 text-md-h4 font-weight-medium font-italic"
          >
            {{ $t('registerPlanos.title') }}
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
            {{ $t('registerPlanos.subtitle') }}
          </p>
        </VCol>
      </VRow>
    </VCol>

    <!--DIV DA DIREITA-->
    <VCol class="h-100 d-flex align-center pa-0 ma-0" md="8">
      <v-container class="d-flex ga-10 align-top mx-md-5 flex-column">
        <div class="w-100 d-flex justify-end">
          <v-btn icon @click="sair">
            <SvgIcon type="mdi" :path="mdiWindowClose" style="color: #00b5d8" />
          </v-btn>
        </div>
        <div class="w-100 d-flex align-center flex-column">
          <h2
            class="text-center text-h5 font-weight-black mb-5"
            style="
              color: #88ce0d;
              font-family:
                DM Sans,
                sans-serif;
            "
          >
            {{ $t('registerPlanos.choosePlan') }}
          </h2>

          <span
            class="text-center text-subtitle-1"
            style="
              font-family:
                DM Sans,
                sans-serif;
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
                class="pa-7 rounded-xl"
                height="606.7px"
              />
            </VCol>
          </template>

          <!-- PLANOS -->
          <template v-else>
            <VCol v-for="plano in planos" :key="plano.id" cols="12" md="6">
              <VCard
                class="pa-7 rounded-xl d-flex flex-column justify-space-between border_Focus"
                min-height="606.7px"
                height="100%"
              >
                <!-- Nome e destaque -->
                <div class="d-flex align-md-center flex-column flex-md-row">
                  <VCardTitle
                    class="font-weight-black text-h6 text-md-h5"
                    style="
                      color: #00b5d8;
                      font-family:
                        DM Sans,
                        sans-serif;
                    "
                    primary-title
                  >
                    {{ plano.nome }}
                  </VCardTitle>
                  <span
                    v-if="plano.maisPopular"
                    class="text-caption font-weight-black"
                    style="color: #00b5d8"
                  >
                    ⭐ {{ $t('registerPlanos.mostPopular') }}
                  </span>
                </div>

                <!-- Preço -->
                <div class="d-flex flex-column flex-lg-row">
                  <v-card-subtitle
                  v-if="!plano.maisPopular"
                    class="font-weight-black text-md-h6"
                    style="
                      color: #88ce0d;
                      font-family:
                        DM Sans,
                        sans-serif;
                    "
                  >
                    R$
                    {{
                      plano.precoMes?.toFixed(2).replace('.', ',') || '0,00'
                    }}/{{ $t('registerPlanos.perMonth') }}
                  </v-card-subtitle>

                  <v-card-subtitle
                    v-if="plano.precoMes && plano.maisPopular"
                    class="font-weight-black text-md-h6"
                    style="
                      color: #88ce0d;
                      font-family:
                        DM Sans,
                        sans-serif;
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
                      class="text-white w-100 text-caption text-md-subtitle-1"
                      max-width="255px"
                      height="44px"
                      style="background-color: #88ce0d"
                    >
                      {{ $t('registerPlanos.subscribe') }} {{ plano.nome }}
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
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiWindowClose } from '@mdi/js'
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
    'Emissão autmomática de modelo oficial': 'item_02',
    'Aplicação ilimitada em diferentes provas durante a validade': 'item_03',
    'Assinatura digital + QR Code': 'item_04',
    'Descontos no Marketplace': 'item_05',
    'Acesso ao painel de saúde': 'item_06',
    'Monitoramento contínuo': 'item_07',
    'integração com wearables': 'item_08'
  }
  return map[descricao] || descricao
}

function sair() {
  logout()
  router.push('/login')
}

function assinarPlano(plano) {
  planoStore.setPlanoSelecionado(plano)
  router.push('/pagamento')
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

<style>
.border_Focus:hover {
  border: 2px solid #00b5d8;
}
</style>
