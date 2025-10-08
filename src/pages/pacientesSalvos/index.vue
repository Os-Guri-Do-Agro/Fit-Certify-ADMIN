<template>
  <div class="h-100 w-100">
    <v-container fluid class="">
      <v-row class="">
        <v-col cols="12">
          <v-card
            rounded="lg"
            variant="outlined"
            color="blue"
            class="pa-0 ma-0"
          >
            <v-row no-gutters class="pa-5 bg-blue" justify="space-between">
              <v-col class="d-flex align-center" cols="auto">
                <v-icon color="white" size="28" class="mr-2"
                  >mdi-bookmark-multiple</v-icon
                >
                <div class="d-flex flex-column">
                  <span class="text-h6 font-weight-bold text-white"
                    >Pacientes Salvos</span
                  >
                  <span class="text-caption text-blue-lighten-4"
                    >{{
                      pacientesSalvosStore.pacientesSalvos.length
                    }}
                    paciente{{
                      pacientesSalvosStore.pacientesSalvos.length !== 1
                        ? 's'
                        : ''
                    }}
                    salvo{{
                      pacientesSalvosStore.pacientesSalvos.length !== 1
                        ? 's'
                        : ''
                    }}</span
                  >
                </div>
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
                  placeholder="Buscar paciente salvo..."
                  style="width: 350px"
                />
              </v-col>
            </v-row>

            <div
              v-if="pacientesFiltrados.length === 0"
              class="pa-8 text-center"
            >
              <v-icon size="64" color="grey-lighten-1"
                >mdi-bookmark-outline</v-icon
              >
              <div class="text-h6 text-grey-darken-1 mt-4">
                {{
                  busca
                    ? 'Nenhum paciente encontrado'
                    : 'Nenhum paciente salvo ainda'
                }}
              </div>
              <div class="text-body-2 text-grey-darken-1 mt-2">
                {{
                  busca
                    ? 'Tente ajustar sua busca'
                    : 'Salve pacientes na lista principal para vê-los aqui'
                }}
              </div>
            </div>

            <v-data-table
              v-else
              :headers="headers"
              :items="pacientesFiltrados"
              class="amber-header font-weight-bold"
              item-height="80"
            >
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
                    color="red-darken-1"
                    variant="outlined"
                    size="small"
                    icon
                    rounded="lg"
                    @click="removerPaciente(item)"
                  >
                    <v-icon size="16" color="red">mdi-bookmark-remove</v-icon>
                  </v-btn>

                  <v-btn
                    color="green-darken-1"
                    variant="outlined"
                    size="small"
                    icon
                    rounded="lg"
                    @click="
                      $router.push({
                        name: '/adicionarConsulta/',
                        query: { pacienteId: item.id },
                      })
                    "
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePacientesSalvosStore } from '@/stores/pacientesSalvos'

const router = useRouter()
const pacientesSalvosStore = usePacientesSalvosStore()
const busca = ref('')

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

const pacientesFiltrados = computed(() => {
  if (!busca.value) {
    return pacientesSalvosStore.pacientesSalvos
  }
  return pacientesSalvosStore.pacientesSalvos.filter((paciente) =>
    paciente.usuario.nome.toLowerCase().includes(busca.value.toLowerCase())
  )
})

const removerPaciente = (paciente) => {
  pacientesSalvosStore.removerPaciente(paciente.id)
}

const verInformacoes = (paciente) => {
  router.push(`/detalhesPaciente?id=${paciente.id}`)
}
</script>

<style scoped>
.amber-header :deep(.v-data-table__th) {
  background-color: #0080ff25 !important;
  color: black !important;
}

.amber-header :deep(.v-data-table__tr) {
  height: 80px !important;
}

.amber-header :deep(.v-data-table__td) {
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
