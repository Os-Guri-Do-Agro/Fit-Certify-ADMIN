<template>
  <div class="h-100 w-100">
    <v-container fluid class="">
      <v-row class="">
        <v-col cols="12">
          <v-card rounded="lg" class="pa-0 ma-0">
            <v-row no-gutters class="pa-5 bg-green" justify="space-between">
              <v-col class="d-flex align-center" cols="auto">
                <v-icon color="white" size="28" class="mr-2">mdi-doctor</v-icon>
                <div class="d-flex flex-column">
                  <span class="text-h6 font-weight-bold text-white"
                    >Meus Médicos</span
                  >
                </div>
              </v-col>
              <v-col cols="auto">
                <v-text-field
                  v-model="busca"
                  @input="filtrarMedicos"
                  class="white-input"
                  bg-color="white"
                  variant="outlined"
                  rounded="lg"
                  prepend-inner-icon="mdi-magnify"
                  density="comfortable"
                  placeholder="Buscar médico salvo..."
                  style="width: 350px"
                />
              </v-col>
            </v-row>

            <!-- Skeleton Loading -->
            <div v-if="loading">
              <v-skeleton-loader
                v-for="n in 3"
                :key="n"
                class="mb-6 pa-5 ma-5"
                type="list-item-avatar-three-line"
                elevation="2"
                rounded="xl"
                height="140"
              />
            </div>

            <!-- Nenhum médico encontrado -->
            <div v-else-if="!loading && meusMedicos.length === 0" class="text-center pa-10">
              <v-icon size="80" color="grey-lighten-1" class="mb-4">mdi-doctor</v-icon>
              <div class="text-h6 text-grey-darken-1">Nenhum médico encontrado</div>
            </div>

            <!-- Lista de Médicos -->
            <v-card
              v-else
              class="pa-5 ma-5"
              v-for="(meusMedicos, index) in meusMedicos"
              :key="index"
            >
              <v-row align="center">
                <v-col cols="auto" class="text-center">
                  <v-avatar size="90" color="grey-lighten-3">
                    <v-img
                      v-if="meusMedicos?.usuario?.avatarUrl"
                      :src="meusMedicos?.usuario?.avatarUrl"
                      cover
                    ></v-img>
                    <v-icon v-else size="50" color="grey-darken-1"
                      >mdi-account</v-icon
                    >
                  </v-avatar>
                  <div class="mt-2">
                    <v-btn icon size="small" variant="text">
                      <v-icon size="22" color="black">mdi-instagram</v-icon>
                    </v-btn>
                    <v-btn icon size="small" variant="text">
                      <v-icon size="22" color="black">mdi-whatsapp</v-icon>
                    </v-btn>
                  </div>
                </v-col>

                <v-col>
                  <div
                    class="text-subtitle-1 font-weight-bold d-flex align-center justify-space-between"
                    style="color: black"
                  >
                    {{ meusMedicos?.usuario?.nome }}
                    <v-btn icon size="small" color="green" variant="flat">
                      <v-icon>mdi-map-marker</v-icon>
                    </v-btn>
                  </div>
                  <div class="text-body-2" style="color: black">
                    {{ meusMedicos?.especializacao }}
                  </div>
                  <div class="text-body-2" style="color: black">
                    CRM: {{ meusMedicos?.crm }}
                  </div>

                  <v-row align="center" class="mt-3">
                    <v-col cols="auto">
                      <v-btn
                        variant="flat"
                        color="green"
                        class="px-8 text-body-2"
                        rounded
                        @click="detalhesMedico(meusMedicos.id)"
                      >
                        Mais Detalhes
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>

            <v-pagination
              v-if="totalPages > 1 && !loading"
              v-model="page"
              :length="totalPages"
              :disabled="loading"
              @update:model-value="mudarPagina"
              class="mt-4"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import atletaService from '@/services/atleta/atleta-service'

const router = useRouter()

const busca = ref('')
const meusMedicos = ref([])
const page = ref(1)
const pageSize = 10
const totalPages = ref(0)
const loading = ref(false)

let debounceTimer = null
let currentRequest = null

const buscarMeusMedicos = async () => {
  if (currentRequest) {
    currentRequest.abort()
  }

  loading.value = true
  const controller = new AbortController()
  currentRequest = controller

  try {
    const response = await atletaService.getMedicosComConsulta(
      page.value,
      pageSize,
      busca.value,
      { signal: controller.signal }
    )

    if (!controller.signal.aborted) {
      meusMedicos.value = response?.data?.itens || []
      totalPages.value = Math.max(1, response?.data?.totalPages || 1)

      if (page.value > totalPages.value) {
        page.value = 1
        return buscarMeusMedicos()
      }
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Erro ao buscar médicos:', error)
      meusMedicos.value = []
      totalPages.value = 1
    }
  } finally {
    if (!controller.signal.aborted) {
      loading.value = false
      currentRequest = null
    }
  }
}

const filtrarMedicos = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    page.value = 1
    buscarMeusMedicos()
  }, 500)
}

const mudarPagina = (novaPagina) => {
  if (novaPagina >= 1 && novaPagina <= totalPages.value && !loading.value) {
    page.value = novaPagina
    buscarMeusMedicos()
  }
}

onMounted(() => {
  buscarMeusMedicos()
})

onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  if (currentRequest) {
    currentRequest.abort()
  }
})

function detalhesMedico(id) {
  if (!id) return

  const url = router.resolve({
    name: '/Atleta-Screens/medicoDetalhes/',
    query: { id },
  }).href
  window.open(url, '_blank')
}
</script>

<style scoped>
.white-input :deep(.v-field__field) {
  background-color: white !important;
  border-radius: 8px !important;
}

.white-input :deep(.v-field__outline) {
  --v-field-border-color: white !important;
}
</style>
