<template>
  <VContainer fluid class="pa-0 fill-height" style="background: #f8f9fa;">
    <VRow class="ma-0 fill-height">
      <VCol cols="12" class="pa-6">
        <VCard rounded="xl" elevation="4" class="mx-auto" max-width="1200">
          <!-- Header -->
          <VCardTitle class="d-flex justify-space-between align-center pa-6">
            <div>
              <h2 class="text-h5 font-weight-bold">{{ $t('criarTreino.title') }}</h2>
              <p class="text-subtitle-2 text-medium-emphasis mb-0">{{ $t('criarTreino.subtitle') }}</p>
            </div>
            <VBtn icon="mdi-close" variant="text" @click="voltar"></VBtn>
          </VCardTitle>

          <VDivider></VDivider>

          <!-- Progress Bar -->
          <div class="pa-6">
            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-body-2 font-weight-medium">{{ $t('criarTreino.step') }} {{ currentStep }} {{ $t('criarTreino.of') }} {{ totalSteps }}</span>
              <span class="text-body-2 text-medium-emphasis">{{ Math.round((currentStep / totalSteps) * 100) }}%</span>
            </div>
            <VProgressLinear :model-value="(currentStep / totalSteps) * 100" color="#00c6fe" height="8" rounded></VProgressLinear>
          </div>

          <VDivider></VDivider>

          <!-- Step Content -->
          <VCardText class="pa-6" style="min-height: 400px;">
            <!-- Step 1: Informações do Treino -->
            <div v-if="currentStep === 1">
              <div class="d-flex align-center ga-3 mb-6">
                <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                  <v-icon color="white" size="20">mdi-information</v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold">{{ $t('criarTreino.trainingInfo') }}</h3>
              </div>

              <VRow>
                <VCol cols="12" md="6">
                  <VTextField v-model="tipoRecomendacaoDisplay" :label="$t('criarTreino.recommendationType') + '*'" variant="outlined" rounded="lg" bg-color="white" readonly @click="modalTipoRecomendacao = true">
                    <template #append-inner>
                      <v-icon>mdi-chevron-down</v-icon>
                    </template>
                  </VTextField>
                </VCol>

                <VCol cols="12" md="6" v-if="tipoRecomendacao === 'Semanal'">
                  <VTextField v-model="frequenciaSemanalDisplay" :label="$t('criarTreino.weeklyFrequency') + '*'" variant="outlined" rounded="lg" bg-color="white" readonly @click="modalFrequencia = true">
                    <template #append-inner>
                      <v-icon>mdi-chevron-down</v-icon>
                    </template>
                  </VTextField>
                </VCol>

                <VCol cols="12">
                  <VTextField v-model="tipoTreinoDisplay" :label="$t('criarTreino.trainingType') + '*'" variant="outlined" rounded="lg" bg-color="white" readonly @click="abrirModalTipoTreino">
                    <template #append-inner>
                      <v-icon>mdi-chevron-down</v-icon>
                    </template>
                  </VTextField>
                </VCol>

                <VCol cols="12">
                  <VTextarea v-model="instrucoes" :label="$t('criarTreino.instructions')" variant="outlined" rounded="lg" bg-color="white" rows="4"></VTextarea>
                </VCol>
              </VRow>
            </div>

            <!-- Step 2: Exercícios -->
            <div v-if="currentStep === 2">
              <div class="d-flex align-center ga-3 mb-6">
                <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                  <v-icon color="white" size="20">mdi-dumbbell</v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold">{{ $t('criarTreino.exercises') }}</h3>
              </div>

              <VBtn color="#00c6fe" variant="flat" class="text-white mb-4" @click="modalSelecionarExercicio = true">
                <v-icon start>mdi-plus</v-icon>
                {{ $t('criarTreino.selectExercise') }}
              </VBtn>

              <!-- Formulário de Exercício -->
              <VCard v-if="exercicioSelecionado" elevation="2" rounded="lg" class="mb-4 pa-4">
                <h4 class="text-subtitle-1 font-weight-bold mb-4">{{ exercicioEditando ? $t('criarTreino.editExercise') : $t('criarTreino.addExercise') }}: {{ nomeExercicio }}</h4>
                <VRow>
                  <VCol cols="12" md="6">
                    <VTextField v-model="series" :label="$t('criarTreino.sets')" type="number" variant="outlined" rounded="lg" bg-color="white"></VTextField>
                  </VCol>
                  <VCol cols="12" md="6">
                    <VTextField v-model="repeticoes" :label="$t('criarTreino.reps')" type="number" variant="outlined" rounded="lg" bg-color="white"></VTextField>
                  </VCol>
                  <VCol cols="12" md="4">
                    <VTextField v-model="carga" :label="$t('criarTreino.load')" type="number" variant="outlined" rounded="lg" bg-color="white"></VTextField>
                  </VCol>
                  <VCol cols="12" md="4">
                    <VTextField v-model="quantidadeKm" :label="$t('criarTreino.distance')" type="number" variant="outlined" rounded="lg" bg-color="white"></VTextField>
                  </VCol>
                  <VCol cols="12" md="4">
                    <VTextField v-model="frequencia" :label="$t('criarTreino.frequency')" type="number" variant="outlined" rounded="lg" bg-color="white"></VTextField>
                  </VCol>
                  <VCol cols="12">
                    <VTextarea v-model="observacoesExercicio" :label="$t('criarTreino.observations')" variant="outlined" rounded="lg" bg-color="white" rows="3"></VTextarea>
                  </VCol>
                  <VCol cols="12" class="d-flex ga-2">
                    <VBtn color="#88ce0d" variant="flat" class="text-white" @click="adicionarExercicio">
                      <v-icon start>{{ exercicioEditando ? 'mdi-check' : 'mdi-plus' }}</v-icon>
                      {{ exercicioEditando ? $t('criarTreino.update') : $t('criarTreino.add') }}
                    </VBtn>
                    <VBtn variant="outlined" @click="cancelarExercicio">{{ $t('criarTreino.cancel') }}</VBtn>
                  </VCol>
                </VRow>
              </VCard>

              <!-- Lista de Exercícios -->
              <div v-if="exercicios.length > 0">
                <h4 class="text-subtitle-1 font-weight-bold mb-3">{{ $t('criarTreino.addedExercises') }} ({{ exercicios.length }})</h4>
                <VCard v-for="(ex, index) in exercicios" :key="index" elevation="1" rounded="lg" class="mb-3 pa-4">
                  <div class="d-flex justify-space-between align-center">
                    <div>
                      <h5 class="text-subtitle-1 font-weight-bold mb-1">{{ index + 1 }}. {{ ex.nomeExercicioPersonalizado }}</h5>
                      <p class="text-body-2 text-medium-emphasis mb-0">
                        <span v-if="ex.series">{{ ex.series }} {{ $t('criarTreino.sets').toLowerCase() }}</span>
                        <span v-if="ex.repeticoes"> • {{ ex.repeticoes }} {{ $t('criarTreino.reps').toLowerCase() }}</span>
                        <span v-if="ex.carga"> • {{ ex.carga }}kg</span>
                        <span v-if="ex.quantidadeKm"> • {{ ex.quantidadeKm }}km</span>
                        <span v-if="ex.frequencia"> • {{ $t('criarTreino.frequency') }}: {{ ex.frequencia }}</span>
                      </p>
                    </div>
                    <div class="d-flex ga-2">
                      <VBtn icon="mdi-pencil" size="small" variant="text" color="#00c6fe" @click="editarExercicio(index)"></VBtn>
                      <VBtn icon="mdi-delete" size="small" variant="text" color="error" @click="removerExercicio(index)"></VBtn>
                    </div>
                  </div>
                </VCard>
              </div>
              <VAlert v-else type="info" variant="tonal" class="mt-4">{{ $t('criarTreino.noExercisesAdded') }}</VAlert>
            </div>

            <!-- Step 3: Observações Finais -->
            <div v-if="currentStep === 3">
              <div class="d-flex align-center ga-3 mb-6">
                <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #00c6fe 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
                  <v-icon color="white" size="20">mdi-text-box</v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold">{{ $t('criarTreino.finalObservations') }}</h3>
              </div>

              <VRow>
                <VCol cols="12">
                  <VTextarea v-model="cuidadosRestricoes" :label="$t('criarTreino.careAndRestrictions')" variant="outlined" rounded="lg" bg-color="white" rows="4"></VTextarea>
                </VCol>
                <VCol cols="12">
                  <VTextarea v-model="observacoesGerais" :label="$t('criarTreino.generalObservations')" variant="outlined" rounded="lg" bg-color="white" rows="6"></VTextarea>
                </VCol>
              </VRow>
            </div>
          </VCardText>

          <VDivider></VDivider>

          <!-- Actions -->
          <VCardActions class="pa-6 d-flex justify-space-between">
            <VBtn v-if="currentStep > 1" variant="outlined" color="#00c6fe" @click="currentStep--">
              <v-icon start>mdi-arrow-left</v-icon>
              {{ $t('criarTreino.back') }}
            </VBtn>
            <VSpacer v-else></VSpacer>
            <VBtn v-if="currentStep < totalSteps" color="#00c6fe" variant="flat" class="text-white" @click="currentStep++">
              {{ $t('criarTreino.next') }}
              <v-icon end>mdi-arrow-right</v-icon>
            </VBtn>
            <VBtn v-else color="#88ce0d" variant="flat" class="text-white" :loading="loading" @click="salvarTreino">
              <v-icon start>mdi-check</v-icon>
              {{ $t('criarTreino.saveTraining') }}
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>

    <!-- Modal Tipo Recomendação -->
    <VDialog v-model="modalTipoRecomendacao" max-width="400">
      <VCard rounded="xl">
        <VCardTitle class="pa-4">{{ $t('criarTreino.recommendationTypeModal') }}</VCardTitle>
        <VDivider></VDivider>
        <VList>
          <VListItem @click="selecionarTipoRecomendacao('Semanal')">
            <VListItemTitle>{{ $t('criarTreino.weekly') }}</VListItemTitle>
          </VListItem>
          <VListItem @click="selecionarTipoRecomendacao('Diario')">
            <VListItemTitle>{{ $t('criarTreino.daily') }}</VListItemTitle>
          </VListItem>
        </VList>
      </VCard>
    </VDialog>

    <!-- Modal Frequência -->
    <VDialog v-model="modalFrequencia" max-width="400">
      <VCard rounded="xl">
        <VCardTitle class="pa-4">{{ $t('criarTreino.weeklyFrequencyModal') }}</VCardTitle>
        <VDivider></VDivider>
        <VList>
          <VListItem v-for="freq in ['1x', '2x', '3x', '4x', '5x', '6x', '7x']" :key="freq" @click="selecionarFrequencia(freq)">
            <VListItemTitle>{{ freq }}</VListItemTitle>
          </VListItem>
        </VList>
      </VCard>
    </VDialog>

    <!-- Modal Tipo Treino -->
    <VDialog v-model="modalTipoTreino" max-width="500">
      <VCard rounded="xl">
        <VCardTitle class="pa-4">{{ $t('criarTreino.selectTrainingType') }}</VCardTitle>
        <VDivider></VDivider>
        <VCardText v-if="carregarTiposTreinos" class="pa-6 text-center">
          <VProgressCircular indeterminate color="#00c6fe"></VProgressCircular>
        </VCardText>
        <VList v-else style="max-height: 400px; overflow-y: auto;">
          <VListItem v-for="tipo in tiposTreinos" :key="tipo.id" @click="selecionarTipoTreino(tipo)">
            <VListItemTitle>{{ $t(`exercicios.tiposTreino.${getTipoTreinosKey(tipo.nome)}`) }}</VListItemTitle>
          </VListItem>
        </VList>
      </VCard>
    </VDialog>

    <!-- Modal Selecionar Exercício -->
    <VDialog v-model="modalSelecionarExercicio" max-width="600">
      <VCard rounded="xl">
        <VCardTitle class="pa-4">{{ $t('criarTreino.selectExerciseModal') }}</VCardTitle>
        <VDivider></VDivider>
        <VCardText class="pa-4">
          <VTextField v-model="filtroExercicio" :label="$t('criarTreino.searchExercise')" variant="outlined" rounded="lg" prepend-inner-icon="mdi-magnify" clearable></VTextField>
        </VCardText>
        <VCardText v-if="carregandoExercicios" class="pa-6 text-center">
          <VProgressCircular indeterminate color="#00c6fe"></VProgressCircular>
        </VCardText>
        <VList v-else style="max-height: 400px; overflow-y: auto;">
          <VListItem v-for="ex in exerciciosFiltrados" :key="ex.id" @click="selecionarExercicio(ex)">
            <VListItemTitle>{{ ex.nome }}</VListItemTitle>
          </VListItem>
        </VList>
      </VCard>
    </VDialog>
  </VContainer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import exercicioService from '@/services/treinos/exercicios/exercicio-service'
import tipoTreinoService from '@/services/treinos/tipoTreino/tipoTreino-service'
import treinoService from '@/services/treinos/treino-service'
import { getPayload } from '@/utils/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const currentStep = ref(1)
const totalSteps = 3

const tipoRecomendacao = ref('')
const frequenciaSemanal = ref('')
const tipoTreinoSelecionado = ref<any>(null)
const instrucoes = ref('')
const cuidadosRestricoes = ref('')
const observacoesGerais = ref('')

const exercicios = ref<any[]>([])
const exercicioSelecionado = ref<any>(null)
const exercicioEditando = ref<number | null>(null)
const exerciciosDisponiveis = ref<any[]>([])
const filtroExercicio = ref('')

const nomeExercicio = ref('')
const series = ref('')
const repeticoes = ref('')
const carga = ref('')
const quantidadeKm = ref('')
const frequencia = ref('')
const observacoesExercicio = ref('')

const tiposTreinos = ref<any[]>([])

const loading = ref(false)
const carregandoExercicios = ref(false)
const carregarTiposTreinos = ref(false)

const modalTipoRecomendacao = ref(false)
const modalFrequencia = ref(false)
const modalTipoTreino = ref(false)
const modalSelecionarExercicio = ref(false)

const tipoRecomendacaoDisplay = computed(() => tipoRecomendacao.value || t('criarTreino.select'))
const frequenciaSemanalDisplay = computed(() => frequenciaSemanal.value || t('criarTreino.select'))
const tipoTreinoDisplay = computed(() => tipoTreinoSelecionado.value?.nome || t('criarTreino.select'))

const getTipoTreinosKey = (nome: string) => {
  const map: Record<string, string> = {
    'Abdômen': 'abdomen',
    'Antebraço': 'antebraco',
    'Braço': 'braco',
    'Cardio': 'cardio',
    'Costas': 'costas',
    'Funcional': 'funcional',
    'Glúteo': 'gluteo',
    'Ombro': 'ombro',
    'Peito': 'peito',
    'Perna': 'perna',
    'Triceps': 'triceps'
  }
  return map[nome] || nome
}

const exerciciosFiltrados = computed(() => {
  if (!filtroExercicio.value) return exerciciosDisponiveis.value
  return exerciciosDisponiveis.value.filter(ex =>
    ex.nome.toLowerCase().includes(filtroExercicio.value.toLowerCase())
  )
})

onMounted(() => {
  buscarExercicios()
})

const buscarExercicios = async () => {
  carregandoExercicios.value = true
  try {
    const response = await exercicioService.getAllExercicios()
    exerciciosDisponiveis.value = response.data || []
  } catch (error) {
    toast.error(t('criarTreino.toasts.errorLoadExercises'))
  } finally {
    carregandoExercicios.value = false
  }
}

const buscarExerciciosPorTipoTreino = async (tipoTreinoId: string) => {
  carregandoExercicios.value = true
  try {
    const response = await exercicioService.getExerciciosByTreinoId(tipoTreinoId)
    exerciciosDisponiveis.value = response.data || []
  } catch (error) {
    toast.error(t('criarTreino.toasts.errorLoadExercisesByType'))
  } finally {
    carregandoExercicios.value = false
  }
}

const buscarTiposTreino = async () => {
  carregarTiposTreinos.value = true
  try {
    const response = await tipoTreinoService.getAllTiposTreino()
    tiposTreinos.value = response.data || []
  } catch (error) {
    toast.error(t('criarTreino.toasts.errorLoadTrainingTypes'))
  } finally {
    carregarTiposTreinos.value = false
  }
}

const abrirModalTipoTreino = () => {
  modalTipoTreino.value = true
  if (tiposTreinos.value.length === 0) {
    buscarTiposTreino()
  }
}

const selecionarTipoRecomendacao = (tipo: string) => {
  tipoRecomendacao.value = tipo
  if (tipo === 'Diario') {
    frequenciaSemanal.value = ''
  }
  modalTipoRecomendacao.value = false
}

const selecionarFrequencia = (freq: string) => {
  frequenciaSemanal.value = freq
  modalFrequencia.value = false
}

const selecionarTipoTreino = async (tipo: any) => {
  tipoTreinoSelecionado.value = tipo
  modalTipoTreino.value = false
  await buscarExerciciosPorTipoTreino(tipo.id)
}

const selecionarExercicio = (ex: any) => {
  exercicioSelecionado.value = ex
  nomeExercicio.value = ex.nome
  modalSelecionarExercicio.value = false
}

const adicionarExercicio = () => {
  if (!exercicioSelecionado.value) {
    toast.warning(t('criarTreino.toasts.selectExerciseWarning'))
    return
  }

  const exercicio = {
    exercicioId: exercicioSelecionado.value.id,
    nomeExercicioPersonalizado: nomeExercicio.value,
    series: series.value ? Number(series.value) : undefined,
    repeticoes: repeticoes.value ? Number(repeticoes.value) : undefined,
    carga: carga.value ? Number(carga.value) : undefined,
    quantidadeKm: quantidadeKm.value ? Number(quantidadeKm.value) : undefined,
    frequencia: frequencia.value ? Number(frequencia.value) : undefined,
    observacoes: observacoesExercicio.value.trim() || undefined,
    ordem: exercicioEditando.value !== null ? exercicioEditando.value + 1 : exercicios.value.length + 1
  }

  if (exercicioEditando.value !== null) {
    exercicios.value[exercicioEditando.value] = exercicio
    toast.success(t('criarTreino.toasts.exerciseUpdated'))
  } else {
    exercicios.value.push(exercicio)
    toast.success(t('criarTreino.toasts.exerciseAdded'))
  }

  limparFormularioExercicio()
}

const editarExercicio = (index: number) => {
  const ex = exercicios.value[index]
  exercicioSelecionado.value = { id: ex.exercicioId, nome: ex.nomeExercicioPersonalizado }
  nomeExercicio.value = ex.nomeExercicioPersonalizado
  series.value = ex.series?.toString() || ''
  repeticoes.value = ex.repeticoes?.toString() || ''
  carga.value = ex.carga?.toString() || ''
  quantidadeKm.value = ex.quantidadeKm?.toString() || ''
  frequencia.value = ex.frequencia?.toString() || ''
  observacoesExercicio.value = ex.observacoes || ''
  exercicioEditando.value = index
}

const removerExercicio = (index: number) => {
  exercicios.value.splice(index, 1)
  exercicios.value.forEach((ex, i) => ex.ordem = i + 1)
  toast.success(t('criarTreino.toasts.exerciseRemoved'))
}

const cancelarExercicio = () => {
  limparFormularioExercicio()
}

const limparFormularioExercicio = () => {
  exercicioSelecionado.value = null
  nomeExercicio.value = ''
  series.value = ''
  repeticoes.value = ''
  carga.value = ''
  quantidadeKm.value = ''
  frequencia.value = ''
  observacoesExercicio.value = ''
  exercicioEditando.value = null
}

const salvarTreino = async () => {
  if (exercicios.value.length === 0) {
    toast.warning(t('criarTreino.toasts.addAtLeastOneExercise'))
    return
  }

  loading.value = true
  try {
    const payload = getPayload()
    const atletaId = route.query.atletaId as string

    const frequenciaNum = tipoRecomendacao.value === 'Diario'
      ? 0
      : frequenciaSemanal.value ? Number(frequenciaSemanal.value.replace('x', '')) : undefined

    const data: any = {
      atletaId,
      tipoRecomendacao: tipoRecomendacao.value,
      frequenciaSemanal: frequenciaNum,
      tipoTreinoId: tipoTreinoSelecionado.value?.id,
      instrucoes: instrucoes.value.trim() || undefined,
      cuidadosRestricoes: cuidadosRestricoes.value.trim() || undefined,
      observacoesGerais: observacoesGerais.value.trim() || undefined,
      ativo: true,
      exercicios: exercicios.value
    }

    if (payload?.role === 'treinador') {
      data.treinadorId = payload.user?.treinadorId
    } else if (payload?.role === 'fisioterapeuta') {
      data.fisioterapeutaId = payload.user?.fisioterapeutaId
    }

    await treinoService.createTreino(data)
    toast.success(t('criarTreino.toasts.trainingCreatedSuccess'))
    router.back()
  } catch (error) {
    toast.error(t('criarTreino.toasts.errorCreatingTraining'))
    console.error(error)
  } finally {
    loading.value = false
  }
}

const voltar = () => {
  router.back()
}
</script>

<style scoped>
:deep(.v-field) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

:deep(.v-field:hover) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
