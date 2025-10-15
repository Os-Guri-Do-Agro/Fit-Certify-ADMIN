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

            <v-pagination
              v-model="page"
              :length="totalPages"
              @update:model-value="buscarMeusMedicos"
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
const totalPages = ref(1)

const buscarMeusMedicos = async () => {
  try {
    const response = await atletaService.getMedicosComConsulta(
      page.value,
      pageSize,
      nome.value
    )
    meusMedicos.value = response.data
    console.log('MÉDICOS FILTRADOS: ', meusMedicos.value)
    totalPages.value = Math.ceil(response.total / pageSize)
  } catch (error) {
    console.error('Erro ao buscar médicos:', error)
  }
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
