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
                    >Médicos Salvos</span
                  >
                  <span class="text-caption text-green-lighten-4"
                    >{{ medicosSalvosStore.medicosSalvos.length }} médico{{
                      medicosSalvosStore.medicosSalvos.length !== 1 ? 's' : ''
                    }}
                    salvo{{
                      medicosSalvosStore.medicosSalvos.length !== 1 ? 's' : ''
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
                  placeholder="Buscar médico salvo..."
                  style="width: 350px"
                />
              </v-col>
            </v-row>

            <div v-if="medicosFiltrados.length === 0" class="pa-8 text-center">
              <v-icon size="64" color="grey-lighten-1">mdi-doctor</v-icon>
              <div class="text-h6 text-grey-darken-1 mt-4">
                {{
                  busca
                    ? 'Nenhum médico encontrado'
                    : 'Nenhum médico salvo ainda'
                }}
              </div>
              <div class="text-body-2 text-grey-darken-1 mt-2">
                {{
                  busca
                    ? 'Tente ajustar sua busca'
                    : 'Salve médicos na lista principal para vê-los aqui'
                }}
              </div>
            </div>

            <v-data-table
              v-else
              :headers="headers"
              :items="medicosFiltrados"
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
                    color="green"
                    variant="outlined"
                    size="small"
                    rounded="lg"
                    class="px-4 py-4 d-flex align-center"
                    @click="verInformacoes(item)"
                  >
                    <v-icon size="16" class="mr-2"
                      >mdi-information-outline</v-icon
                    >
                    Ver Detalhes
                  </v-btn>

                  <v-btn
                    color="red-darken-1"
                    variant="outlined"
                    size="small"
                    icon
                    rounded="lg"
                    @click="removerMedico(item)"
                  >
                    <v-icon size="16" color="red">mdi-bookmark-remove</v-icon>
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
import { useMedicosSalvosStore } from '@/stores/medicosSalvos'

const router = useRouter()
const medicosSalvosStore = useMedicosSalvosStore()
const busca = ref('')

const headers = [
  { title: 'Perfil', key: 'usuario.avatarUrl' },
  { title: 'Nome', key: 'usuario.nome' },
  { title: 'Especialidade', key: 'especialidade' },
  { title: 'CRM', key: 'crm' },
  {
    title: 'Ações',
    key: 'actions',
    sortable: false,
    align: 'end',
  },
]

const medicosFiltrados = computed(() => {
  if (!busca.value) {
    return medicosSalvosStore.medicosSalvos
  }
  return medicosSalvosStore.medicosSalvos.filter((medico) =>
    medico.usuario.nome.toLowerCase().includes(busca.value.toLowerCase())
  )
})

const removerMedico = (medico) => {
  medicosSalvosStore.removerMedico(medico.id)
}

const verInformacoes = (medico) => {
  const url = router.resolve({
    name: '/Atleta-Screens/medicoDetalhes/',
    query: { id: medico.id },
  }).href
  window.open(url, '_blank')
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
