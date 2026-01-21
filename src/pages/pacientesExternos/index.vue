<template>
  <v-container class="py-8">
    <v-row>
      <v-col cols="12">
        <v-card style="border-radius: 20px; box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);">
          <v-card-title class="pa-5" style="background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);">
            <v-row align="center" no-gutters>
              <v-col cols="12" md="6" class="d-flex align-center mb-4 mb-md-0">
                <v-icon color="white" size="32" class="mr-2">mdi-account-multiple-outline</v-icon>
                <span class="text-h6 font-weight-bold text-white">{{ t('appBar.titleExternalPatients') }}</span>
              </v-col>
              <v-col cols="12" md="6" class="d-flex justify-md-end">
                <v-text-field
                  v-model="busca"
                  variant="outlined"
                  rounded="lg"
                  density="comfortable"
                  prepend-inner-icon="mdi-magnify"
                  :placeholder="t('consultasExternas.searchByName') + ' ' + t('consultasExternas.searchByCpf')"
                  hide-details
                  bg-color="white"
                  class="search-field"
                />
              </v-col>
            </v-row>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="pacientesFiltrados"
            :loading="loading"
            class="patient-table"
          >
            <template #loading>
              <v-skeleton-loader type="table-row@10" />
            </template>

            <template #item.nome="{ item }">
              <div class="font-weight-bold text-grey-darken-3">{{ item.nome }}</div>
            </template>

            <template #item.cpf="{ item }">
              <v-chip size="small" color="blue-lighten-4" variant="flat">
                {{ item.cpf }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import consultasService from '@/services/consultas/consultas-service';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const pacientes = ref([])
const loading = ref(true)
const busca = ref('')

const headers = computed(() => [
  { title: t('consultasExternas.name'), key: 'nome', sortable: false },
  { title: t('consultasExternas.cpf'), key: 'cpf', sortable: false },
  { title: t('detalhesPacienteMedico.phone'), key: 'telefone', sortable: false },
  { title: t('perfilAtleta.email'), key: 'email', sortable: false },
])

const pacientesFiltrados = computed(() => {
  if (!busca.value) {
    return pacientes.value
  }
  return pacientes.value.filter((paciente) =>
    paciente.nome.toLowerCase().includes(busca.value.toLowerCase()) ||
    paciente.cpf.includes(busca.value)
  )
})

const buscarPacientes = async () => {
  try {
    loading.value = true
    const response = await consultasService.findPacienteExterno()
    pacientes.value = response.data
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  buscarPacientes()
})

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
