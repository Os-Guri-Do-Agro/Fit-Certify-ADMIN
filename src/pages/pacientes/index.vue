<template>
  <div class="w-100 h-100 ma-0">
    <v-container fluid>
      <h1 class="mb-5 text-h5 font-weight-bold">Lista de Pacientes</h1>
      <v-row class="mb-4" dense>
        <v-col cols="12" md="4">
          <v-card
            class="d-flex flex-column align-center justify-center bg-white"
            rounded="lg"
            variant="outlined"
            elevation="2"
            color="blue"
          >
            <v-sheet color="blue" class="d-flex justify-center pa-3 w-100">
              <v-icon size="40" color="white">mdi-account-heart</v-icon>
            </v-sheet>

            <v-card-title class="text-h3 font-weight-bold mt-3">0</v-card-title>
            <v-card-text class="text-subtitle-1 text-grey-darken-1 mb-4">
              Pacientes Atendidos
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card
            class="d-flex flex-column align-center justify-center bg-white"
            rounded="lg"
            variant="outlined"
            elevation="2"
            color="blue"
          >
            <v-sheet color="blue" class="d-flex justify-center pa-3 w-100">
              <v-icon size="40" color="white">mdi-certificate</v-icon>
            </v-sheet>

            <v-card-title class="text-h3 font-weight-bold mt-3">0</v-card-title>
            <v-card-text class="text-subtitle-1 text-grey-darken-1 mb-4">
              Certificados Emitidos
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card
            class="d-flex flex-column align-center justify-center bg-white"
            rounded="lg"
            variant="outlined"
            elevation="2"
            color="blue"
          >
            <v-sheet
              color="blue"
              class="d-flex justify-center pa-3 w-100"
              rounded="t-lg"
            >
              <v-icon size="40" color="white">mdi-calendar-clock</v-icon>
            </v-sheet>

            <v-card-title class="text-h3 font-weight-bold mt-3">0</v-card-title>
            <v-card-text class="text-subtitle-1 text-grey-darken-1 mb-4">
              Consultas Marcadas
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12" md="4">
          <v-card
            class="d-flex align-center pa-0 ma-0"
            rounded="lg"
            variant="outlined"
            color="green"
            height="80"
          >
            <v-sheet
              color="green"
              class="d-flex align-center justify-center h-100"
              width="70"
            >
              <v-icon color="white" size="28">mdi-account-multiple</v-icon>
            </v-sheet>

            <div class="ml-3 py-3">
              <div class="text-subtitle-2 text-grey-darken-1">
                Total de Pacientes
              </div>
              <div class="text-h6 font-weight-bold">{{ atleta.length }}</div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card
            class="d-flex align-center pa-0 ma-0"
            rounded="lg"
            variant="outlined"
            color="amber"
            height="80"
          >
            <v-sheet
              color="amber"
              class="d-flex align-center justify-center h-100"
              width="70"
            >
              <v-icon color="white" size="28">mdi-history</v-icon>
            </v-sheet>

            <div class="ml-3 py-3">
              <div class="text-subtitle-2 text-grey-darken-1">
                Revisões a Fazer
              </div>
              <div class="text-h6 font-weight-bold">0</div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card
            class="d-flex align-center pa-0 ma-0"
            rounded="lg"
            variant="outlined"
            color="red"
            height="80"
          >
            <v-sheet
              color="red"
              class="d-flex align-center justify-center h-100"
              width="70"
            >
              <v-icon color="white" size="28">mdi-alert-circle-outline</v-icon>
            </v-sheet>

            <div class="ml-3 py-3">
              <div class="text-subtitle-2 text-grey-darken-1">Pendências</div>
              <div class="text-h6 font-weight-bold">0</div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card
            rounded="lg"
            variant="outlined"
            color="blue"
            class="pa-0 ma-0"
          >
            <v-row no-gutters class="pa-5 bg-blue" justify="space-between">
              <v-col class="d-flex" cols="auto">
                <v-icon color="white" size="28" class="mr-2"
                  >mdi-clipboard-account-outline</v-icon
                >
                <span class="text-h6 font-weight-bold text-white"
                  >Lista de Pacientes</span
                >
              </v-col>
              <v-col cols="auto">
                <v-text-field
                  v-model="busca"
                  class="white-input"
                  bg-color="white"
                  variant="outlined"
                  rounded="lg"
                  prepend-inner-icon="mdi-magnify"
                  density="comfortable"
                  placeholder="Buscar paciente..."
                  style="width: 350px"
                />
              </v-col>
            </v-row>

            <v-data-table
              :headers="headers"
              :items="pacientesFiltrados"
              :loading="loading"
              class="blue-header font-weight-bold"
              item-height="80"
            >
              <template #loading>
                <v-skeleton-loader type="table-row@10" />
              </template>
              <template #item.usuario.avatarUrl="{ item }">
                <v-avatar size="60">
                  <v-img
                    v-if="item.usuario.avatarUrl"
                    :src="item.usuario.avatarUrl"
                    :alt="item.usuario.nome"
                  />
                  <v-icon v-else size="68">mdi-account-circle</v-icon>
                </v-avatar>
              </template>

              <template #item.actions="{ item }">
                <div class="d-flex ga-3 align-center justify-end">
                  <v-btn
                    color="blue"
                    variant="outlined"
                    size="small"
                    rounded="lg"
                    class="px-4 py-4 d-flex align-center"
                    @click="verInformacoes(item)"
                  >
                    <v-icon size="16" class="mr-2"
                      >mdi-information-outline</v-icon
                    >
                    Ver Informações
                  </v-btn>

                  <v-btn
                    :color="pacientesSalvosStore.isPacienteSalvo(item.id) ? 'amber-darken-1' : 'grey-lighten-1'"
                    :variant="pacientesSalvosStore.isPacienteSalvo(item.id) ? 'flat' : 'outlined'"
                    size="small"
                    icon
                    rounded="lg"
                    @click="toggleSalvo(item)"
                  >
                    <v-icon
                      size="16"
                      :color="pacientesSalvosStore.isPacienteSalvo(item.id) ? 'white' : 'grey-darken-2'"
                    >
                      {{ pacientesSalvosStore.isPacienteSalvo(item.id) ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}
                    </v-icon>
                  </v-btn>

                  <v-btn
                    color="green-darken-1"
                    variant="outlined"
                    size="small"
                    icon
                    rounded="lg"
                    @click="editarPaciente(item)"
                  >
                    <v-icon size="16" color="green">mdi-pencil</v-icon>
                  </v-btn>
                </div>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import atletaService from '@/services/atleta/atleta-service'
import { usePacientesSalvosStore } from '@/stores/pacientesSalvos'

const router = useRouter()
const pacientesSalvosStore = usePacientesSalvosStore()

const headers = [
  { title: 'Perfil', key: 'usuario.avatarUrl' },
  { title: 'Nome', key: 'usuario.nome' },
  { title: 'Idade', key: 'idade' },
  { title: 'Gênero', key: 'genero' },
  {
    title: 'Ações',
    key: 'actions',
    sortable: false,
    align: 'end',
  },
]

const atleta = ref([])
const loading = ref(true)
const busca = ref('')

const pacientesFiltrados = computed(() => {
  if (!busca.value) {
    return atleta.value
  }
  return atleta.value.filter(paciente => 
    paciente.usuario.nome.toLowerCase().includes(busca.value.toLowerCase())
  )
})

const calcularIdade = (dataNascimento) => {
  const hoje = new Date()
  const nascimento = new Date(dataNascimento)
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const mes = hoje.getMonth() - nascimento.getMonth()
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--
  }
  return idade
}

onMounted(() => {
  buscarAtletas()
})

const buscarAtletas = async () => {
  try {
    loading.value = true
    const response = await atletaService.getAllAtletas()
    atleta.value = response.data
      .map((item) => ({
        ...item,
        idade: calcularIdade(item.dataNascimento),
        favorito: false,
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } catch (error) {
    console.error('Erro ao buscar atletas:', error)
  } finally {
    loading.value = false
  }
}

const toggleSalvo = (paciente) => {
  pacientesSalvosStore.togglePacienteSalvo(paciente)
}

const editarPaciente = (paciente) => {
  console.log('Editar paciente:', paciente)
}

const verInformacoes = (paciente) => {
  router.push(`/detalhesPaciente?id=${paciente.id}`)
}
</script>

<style scoped>
.blue-header :deep(.v-data-table__th) {
  background-color: #0080ff25 !important;
  color: black !important;
}

.blue-header :deep(.v-data-table__tr) {
  height: 80px !important;
}

.blue-header :deep(.v-data-table__td) {
  padding: 5px !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
}

.white-input :deep(.v-field__field) {
  background-color: white !important;
  border-radius: 8px !important;
}

.white-input :deep(.v-field__outline) {
  --v-field-border-color: white !important;
}
</style>
