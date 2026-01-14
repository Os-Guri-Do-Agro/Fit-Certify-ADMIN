<template>
  <v-container>

    <v-row class="mb-8">
      <v-col cols="12" sm="6" md="3">
        <v-card class="metric-card"  >
          <v-card-text class="pa-5">
            <div class="d-flex align-center justify-space-between mb-3">
              <v-avatar size="48" color="blue-lighten-4" class="metric-avatar">
                <v-icon size="24" color="blue-darken-1">mdi-account-group</v-icon>
              </v-avatar>
              <v-icon size="20" color="blue-lighten-3">mdi-trending-up</v-icon>
            </div>
            <div class="text-h4 font-weight-bold text-grey-darken-3 mb-1">{{ totalAtletas }}</div>
            <div class="text-body-2 text-grey font-weight-medium">{{ t('pacientesMedico.metrics.totalPatients') }}</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="metric-card"  >
          <v-card-text class="pa-5">
            <div class="d-flex align-center justify-space-between mb-3">
              <v-avatar size="48" color="green-lighten-4" class="metric-avatar">
  <v-icon size="24" color="green-darken-1">mdi-account-heart</v-icon>
</v-avatar>
              <v-icon size="20" color="green-lighten-3">mdi-check-circle</v-icon>
            </div>
            <div class="text-h4 font-weight-bold text-grey-darken-3 mb-1">{{ Metrics.pacientesAtendidos }}</div>
            <div class="text-body-2 text-grey font-weight-medium">{{ t('pacientesMedico.metrics.patientsServed') }}</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="metric-card"  >
          <v-card-text class="pa-5">
            <div class="d-flex align-center justify-space-between mb-3">
              <v-avatar size="48" color="orange-lighten-4" class="metric-avatar">
                <v-icon size="24" color="orange-darken-1">mdi-certificate</v-icon>
              </v-avatar>
              <v-icon size="20" color="orange-lighten-3">mdi-file-document</v-icon>
            </div>
            <div class="text-h4 font-weight-bold text-grey-darken-3 mb-1">{{ Metrics.certificadosEmitidos }}</div>
            <div class="text-body-2 text-grey font-weight-medium">{{ t('pacientesMedico.metrics.issuedCertificates') }}</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="metric-card"  >
          <v-card-text class="pa-5">
            <div class="d-flex align-center justify-space-between mb-3">
              <v-avatar size="48" color="purple-lighten-4" class="metric-avatar">
                <v-icon size="24" color="purple-darken-1">mdi-calendar-clock</v-icon>
              </v-avatar>
              <v-icon size="20" color="purple-lighten-3">mdi-calendar-check</v-icon>
            </div>
            <div class="text-h4 font-weight-bold text-grey-darken-3 mb-1">{{ Metrics.consultasMarcadas }}</div>
            <div class="text-body-2 text-grey font-weight-medium">{{ t('pacientesMedico.metrics.scheduledAppointments') }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card style="border-radius: 20px; box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);">
          <v-card-title class="pa-5" style="background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);">
            <v-row align="center" no-gutters>
              <v-col cols="12" md="6" class="d-flex align-center mb-4 mb-md-0">
                <v-icon color="white" size="24" class="mr-2">mdi-clipboard-account-outline</v-icon>
                <span class="text-h6 font-weight-bold text-white">{{ t('pacientesMedico.title') }}</span>
              </v-col>
              <v-col cols="12" md="6" class="d-flex justify-md-end">
                <v-text-field
                  v-model="busca"
                  variant="outlined"
                  rounded="lg"
                  density="comfortable"
                  prepend-inner-icon="mdi-magnify"
                  :placeholder="t('pacientesMedico.searchPlaceholder')"
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

            <template #item.avatarUrl="{ item }">
              <v-avatar size="40" class="my-2">
                <v-img v-if="item.avatarUrl" :src="item.avatarUrl" :alt="item.usuario.nome" />
                <v-icon v-else size="40" color="grey-lighten-1">mdi-account-circle</v-icon>
              </v-avatar>
            </template>

            <template #item.usuario.nome="{ item }">
              <div class="font-weight-bold text-grey-darken-3">{{ item.usuario.nome }}</div>
            </template>

            <template #item.idade="{ item }">
              <v-chip size="small" color="blue-lighten-4" variant="flat">
                {{ item.idade }} {{ t('pacientesMedico.table.years') }}
              </v-chip>
            </template>

            <template #item.genero="{ item }">
              <v-chip size="small" :color="item.genero === 'Masculino' ? 'blue' : 'pink'" variant="outlined">
                <v-icon size="14" class="mr-1">{{ item.genero === 'Masculino' ? 'mdi-gender-male' : 'mdi-gender-female' }}</v-icon>
                {{ t(`pacientesMedico.gender.${item.genero}`) }}
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
                {{ t('pacientesMedico.table.viewDetails') }}
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
  { title: t('pacientesMedico.table.profile'), key: 'avatarUrl', sortable: false },
  { title: t('pacientesMedico.table.name'), key: 'usuario.nome',  sortable: false},
  { title: t('pacientesMedico.table.age'), key: 'idade', sortable: false },
  { title: t('pacientesMedico.table.gender'), key: 'genero', sortable: false,  },
  {
    title: t('pacientesMedico.table.actions'),
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
  getMetricsByDay()
})


watch([page, filterLimitPerPage], () => {
  buscarAtletas()
})

const buscarAtletas = async () => {
  try {
    loading.value = true
    const response = await pacientesService.getAtletasByMedico(page.value, filterLimitPerPage.value)
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

 const  getMetricsByDay = async () => {
    try {
      const todayISO = dayjs().format('YYYY-MM-DD') + 'T00:00:00.000Z';
      const response = await medicoService.getMetricsById(todayISO);
      Metrics.value = ({
        pacientesAtendidos: response.data.pacientesAtendidos || 0,
        certificadosEmitidos: response.data.certificadosEmitidos || 0,
        consultasMarcadas: response.data.consultasMarcadas || 0,
      });
    } catch (error) {
      console.error('Erro ao carregar métricas:', error);
    }
  }

const verInformacoes = (paciente) => {
  router.push(`/Medico-Screens/detalhesPaciente?id=${paciente.id}`)
}
</script>

<style scoped>
.metric-card {
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);
}

.metric-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12) !important;
}

.metric-card:nth-child(1) {
  border-top-color: #42A5F5;
}

.metric-card:nth-child(2) {
  border-top-color: #66BB6A;
}

.metric-card:nth-child(3) {
  border-top-color: #FFA726;
}

.metric-card:nth-child(4) {
  border-top-color: #AB47BC;
}

.metric-avatar {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background-color: rgb(255, 196, 0);
  display: flex;
  align-items: center;
  justify-content: center;
}

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
