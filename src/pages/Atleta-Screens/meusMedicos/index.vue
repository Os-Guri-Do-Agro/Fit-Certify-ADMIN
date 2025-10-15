<template>
  <div class="h-100 w-100">
    <v-container fluid class="">
      <v-row class="">
        <v-col cols="12">
          <v-card
            rounded="lg"
            variant="outlined"
            color="green"
            class="pa-0 ma-0"
          >
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
                  @input="buscarMeusMedicos"
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

            <div
              class="pa-5"
              v-for="(meusMedicos, index) in meusMedicos"
              :key="index"
            >
              <v-row align="center">
                <v-col cols="auto" class="text-center">
                  <v-avatar size="90" color="grey-lighten-3">
                    <v-img
                      v-if="medico?.usuario?.avatarUrl"
                      :src="medico?.usuario?.avatarUrl"
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
                    class="text-subtitle-1 font-weight-bold"
                    style="color: black"
                  >
                    NOME: {{ medico?.usuario?.nome }}
                  </div>
                  <div class="text-body-2" style="color: black">
                    {{ medico?.especializacao }}
                  </div>
                  <div class="text-body-2" style="color: black">
                    CRM: {{ medico?.crm }}
                  </div>

                  <v-row align="center" class="mt-3">
                    <v-col cols="auto">
                      <v-btn
                        variant="flat"
                        color="green"
                        class="px-8 text-body-2"
                        rounded
                        @click="detalhesMedico(medico.id)"
                      >
                        Mais Detalhes
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>

            <v-pagination
              v-model="page"
              :length="totalPages"
              @update:model-value="mudarPagina"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import atletaService from '@/services/atleta/atleta-service'

const busca = ref('')
const meusMedicos = ref([])
const page = ref(1)
const pageSize = 10
const nome = ref('')
const totalPages = ref(0)

const buscarMeusMedicos = async () => {
  try {
    const response = await atletaService.getMedicosComConsulta(
      page.value,
      pageSize,
      nome.value
    )
    meusMedicos.value = response.data.itens
    console.log('MÉDICOS FILTRADOS: ', meusMedicos.value)
    totalPages.value = response.data.totalPages
  } catch (error) {
    console.error('Erro ao buscar médicos:', error)
  }
}

const mudarPagina = (novaPagina) => {
  page.value = novaPagina
  buscarMeusMedicos()
}

onMounted(() => {
  buscarMeusMedicos()
})
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
