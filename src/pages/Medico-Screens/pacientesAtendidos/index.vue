<template>
  <div class="w-100 h-100 ma-0">
    <v-container fluid>
      <v-row>
        <h1 class="mb-5 text-h5 font-weight-bold">Pacientes atendidos recentemente</h1>
        <v-col cols="12">
          <v-card rounded="lg" variant="outlined" color="blue" class="pa-0 ma-0">
            <v-row no-gutters class="pa-5 bg-blue" justify="space-between">
              <v-col class="d-flex" cols="auto">
                <v-icon color="white" size="28" class="mr-2">mdi-clipboard-account-outline</v-icon>
                <span class="text-h6 font-weight-bold text-white">Lista de Pacientes</span>
              </v-col>
              <v-col cols="auto">
                <v-text-field v-model="busca" class="white-input" bg-color="white" variant="outlined" rounded="lg"
                  prepend-inner-icon="mdi-magnify" density="comfortable" placeholder="Buscar paciente..."
                  style="width: 350px" />
              </v-col>
            </v-row>

            <v-data-table-server
              :items-per-page-options="[1, 5, 7, 10, 20, 50, 100]"
               v-model:items-per-page="filterLimitPerPage"
               v-model:page="page"
              :headers="headers"
              :items="pacientesFiltrados"
              :loading="loading"
              :items-length="totalAtletas"
               class="blue-header font-weight-bold" item-height="80">

              <template #loading>
                <v-skeleton-loader type="table-row@10" />
              </template>
              <template #item.usuario.avatarUrl="{ item }">
                <v-avatar size="60">
                  <v-img v-if="item.usuario.avatarUrl" :src="item.usuario.avatarUrl" :alt="item.usuario.nome" />
                  <v-icon v-else size="68">mdi-account-circle</v-icon>
                </v-avatar>
              </template>

              <template #item.actions="{ item }">
                <div class="d-flex ga-3 align-center justify-end">
                  <v-btn color="blue" variant="outlined" size="small" rounded="lg" class="px-4 py-4 d-flex align-center"
                    @click="verInformacoes(item)">
                    <v-icon size="16" class="mr-2">mdi-information-outline</v-icon>
                    Ver Informações
                  </v-btn>

                </div>
              </template>
            </v-data-table-server>
            <h1>

            </h1>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import pacientesService from '@/services/medico/pacientes/pacientes-service'
import medicoService from '@/services/medico/medico-service'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const router = useRouter()
const filterLimitPerPage = ref()
const page = ref(1)
const totalPages = ref()

const headers = [
  { title: 'Perfil', key: 'usuario.avatarUrl', sortable: false },
  { title: 'Nome', key: 'usuario.nome',  sortable: false},
  { title: 'Idade', key: 'idade', sortable: false },
  { title: 'Gênero', key: 'genero', sortable: false,  },
  {
    title: 'Ações',
    key: 'actions',
    sortable: false,
    align: 'end'
  },
]

const atleta = ref([])
const totalAtletas = ref(0)
const loading = ref(true)
const busca = ref('')
const Metrics = ref({
  pacientesAtendidos: 0,
  certificadosEmitidos: 0,
  consultasMarcadas: 0,

})
const pacientesFiltrados = computed(() => {
  if (!busca.value) {
    return atleta.value
  }
  return atleta.value.filter((paciente) =>
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


watch([page, filterLimitPerPage], () => {
  buscarAtletas()
})

const buscarAtletas = async () => {
  try {
    loading.value = true
    const response = await pacientesService.getAtletasAtendidosByMedico(page.value, filterLimitPerPage.value)
    totalAtletas.value = response.data.total
    totalPages.value = response.data.totalPages
    atleta.value = response.data.itens
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

const verInformacoes = (paciente) => {
  router.push(`/Medico-Screens/detalhesPaciente?id=${paciente.id}`)
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
