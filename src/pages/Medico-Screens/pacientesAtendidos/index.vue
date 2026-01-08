<template>
  <v-container class="py-8">

    <v-row>
      <v-col cols="12">
        <v-card style="border-radius: 20px; box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);">
          <v-card-title class=" pa-5" style="background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);">
            <v-row align="center" no-gutters>
              <v-col cols="12" md="6" class="d-flex align-center mb-4 mb-md-0">
                <v-icon color="white" size="32" class="mr-2">mdi-clipboard-account-outline</v-icon>
                <span class="text-h6 font-weight-bold text-white">{{ t('pacientesAtendidosMedico.title') }}</span>
              </v-col>
              <v-col cols="12" md="6" class="d-flex justify-md-end">
                <v-text-field
                  v-model="busca"
                  variant="outlined"
                  rounded="lg"
                  density="comfortable"
                  prepend-inner-icon="mdi-magnify"
                  :placeholder="t('pacientesAtendidosMedico.searchPlaceholder')"
                  hide-details
                  bg-color="white"
                  class="search-field"
                />
              </v-col>
            </v-row>
          </v-card-title>

          <v-data-table-server
            v-model:items-per-page="filterLimitPerPage"
            v-model:page="page"
            :headers="headers"
            :items="pacientesFiltrados"
            :loading="loading"
            :items-length="totalAtletas"
            :items-per-page-options="[5, 10, 20, 50, 100]"
            class="patient-table"
          >
            <template #loading>
              <v-skeleton-loader type="table-row@10" />
            </template>

            <template #item.usuario.avatarUrl="{ item }">
              <v-avatar size="40" class="my-2">
                <v-img v-if="item.usuario.avatarUrl" :src="item.usuario.avatarUrl" :alt="item.usuario.nome" />
                <v-icon v-else size="40" color="grey-lighten-1">mdi-account-circle</v-icon>
              </v-avatar>
            </template>

            <template #item.usuario.nome="{ item }">
              <div class="font-weight-bold text-grey-darken-3">{{ item.usuario.nome }}</div>
            </template>

            <template #item.idade="{ item }">
              <v-chip size="small" color="blue-lighten-4" variant="flat">
                {{ item.idade }} {{ t('pacientesAtendidosMedico.table.years') }}
              </v-chip>
            </template>

            <template #item.genero="{ item }">
              <v-chip size="small" :color="item.genero === 'Masculino' ? 'blue' : 'pink'" variant="outlined">
                <v-icon size="14" class="mr-1">{{ item.genero === 'Masculino' ? 'mdi-gender-male' : 'mdi-gender-female' }}</v-icon>
                {{ t(`pacientesAtendidosMedico.gender.${item.genero}`) }}
              </v-chip>
            </template>

            <template #item.actions="{ item }">
              <v-btn
                color="blue"
                variant="flat"
                size="small"
                rounded="lg"
                @click="verInformacoes(item)"
              >
                <v-icon size="16" class="mr-1">mdi-eye</v-icon>
                {{ t('pacientesAtendidosMedico.table.viewDetails') }}
              </v-btn>
            </template>
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import pacientesService from '@/services/medico/pacientes/pacientes-service'
import medicoService from '@/services/medico/medico-service'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
dayjs.extend(utc);

const router = useRouter()
const filterLimitPerPage = ref()
const page = ref(1)
const totalPages = ref()

const headers = computed(() => [
  { title: t('pacientesAtendidosMedico.table.profile'), key: 'usuario.avatarUrl', sortable: false },
  { title: t('pacientesAtendidosMedico.table.name'), key: 'usuario.nome',  sortable: false},
  { title: t('pacientesAtendidosMedico.table.age'), key: 'idade', sortable: false },
  { title: t('pacientesAtendidosMedico.table.gender'), key: 'genero', sortable: false,  },
  {
    title: t('pacientesAtendidosMedico.table.actions'),
    key: 'actions',
    sortable: false,
    align: 'end'
  },
])

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
.search-field {
  max-width: 400px;
}

.patient-table :deep(.v-data-table__th) {
  background-color: #f5f7fa !important;
  font-weight: 700 !important;
  color: #424242 !important;
  padding: 16px !important;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

.patient-table :deep(.v-data-table__td) {
  padding: 16px !important;
}

.patient-table :deep(.v-data-table__tr:hover) {
  background-color: #f8f9fa !important;
  transition: background-color 0.2s ease;
}
</style>
