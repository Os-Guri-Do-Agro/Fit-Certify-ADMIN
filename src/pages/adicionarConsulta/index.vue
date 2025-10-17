<template>
  <div class="w-100 h-100 ma-0">
    <v-container fluid>
      <div class="d-flex align-center mb-5">
        <v-btn
          icon
          variant="outlined"
          color="blue"
          class="mr-3"
          @click="$router.back()"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h1 class="text-h5 font-weight-bold">Adicionar Consulta</h1>
      </div>

      <v-row class="d-flex flex-column ga-6">
        <v-col cols="12" class="mx-auto">
          <v-card rounded="lg" variant="outlined" color="blue">
            <div class="pa-4 bg-blue d-flex align-center">
              <v-card-title
                class="text-white text-subtitle-1 pa-0 d-flex align-center"
              >
                <v-icon class="mr-2">mdi-stethoscope</v-icon>
                Consulta
              </v-card-title>
            </div>

            <v-card-text class="pa-4">
              <v-row dense>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="salvarConsulta.diagnostico"
                    label="Diagnóstico"
                    variant="outlined"
                    color="blue"
                    required
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="salvarConsulta.medicamentosReceitados"
                    label="Medicamentos Receitados"
                    variant="outlined"
                    color="blue"
                    auto-grow
                    rows="3"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="salvarConsulta.situacao"
                    label="Situação Atual"
                    variant="outlined"
                    color="blue"
                    auto-grow
                    rows="3"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" class="d-flex">
          <v-card-actions class="pa-0 w-100 d-flex justify-space-between ga-2">
            <v-btn
              variant="outlined"
              class="px-16 py-5 d-flex align-center justify-center"
              color="grey"
              @click="$router.back()"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="blue"
              class="px-16 py-5 d-flex align-center justify-center"
              variant="flat"
              :loading="loading"
              :disabled="loading"
              @click="salvarConsultaFunc"
            >
              <v-icon left>mdi-clipboard-check-outline</v-icon>
              Salvar
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>


  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPayload } from '@/utils/auth'
import consultasService from '@/services/consultas/consultas-service'
import { toast } from 'vue3-toastify'


const route = useRoute()
const router = useRouter()

const loading = ref(false)

const salvarConsulta = ref({
  medicoId: '',
  atletaId: '',
  diagnostico: '',
  medicamentosReceitados: '',
  situacao: '',
})

const updateIds = () => {
  const payload = getPayload()
  const atletaId = route.query.pacienteId || ''

  salvarConsulta.value.atletaId = atletaId
  salvarConsulta.value.medicoId = payload?.user?.medico?.id || ''
}

onMounted(updateIds)

watch(() => route.query, updateIds, { immediate: true })

const salvarConsultaFunc = async () => {
  if (!salvarConsulta.value.medicoId || !salvarConsulta.value.atletaId) {
    toast.error('IDs do médico e atleta são obrigatórios')
    return
  }

  loading.value = true
  try {
    await consultasService.postConsulta(salvarConsulta.value)
    toast.success('Consulta salva com sucesso!')
    router.back()
  } catch (error) {
    console.error('Erro ao salvar:', error)
    toast.error('Erro ao salvar consulta.')
  } finally {
    loading.value = false
  }
}


</script>

<style scoped>
.v-card-title {
  font-weight: bold;
}

.file-list {
  max-height: 260px;
  overflow-y: auto;
}
</style>
