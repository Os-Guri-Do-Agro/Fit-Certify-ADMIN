<template>
  <div >
    <div class="header-section">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <v-icon size="40" color="white">mdi-dumbbell</v-icon>
        </div>
        <h1 class="header-title">{{ t('treinosAtleta.title') }}</h1>
      </div>
    </div>

    <v-row justify="center" class="mb-10 mt-8">
      <v-btn-toggle v-model="tab" rounded="pill" group mandatory class="filter-toggle">
        <v-btn
          value="semanal"
          :variant="tab === 'semanal' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium filter-btn"
          :class="{ 'active-filter': tab === 'semanal' }"
        >
          {{ t('treinosAtleta.tabs.weekly') }}
        </v-btn>
        <v-btn
          value="diario"
          :variant="tab === 'diario' ? 'flat' : 'outlined'"
          class="px-8 text-body-1 font-weight-medium filter-btn"
          :class="{ 'active-filter': tab === 'diario' }"
        >
          {{ t('treinosAtleta.tabs.daily') }}
        </v-btn>
      </v-btn-toggle>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <div v-if="tab === 'semanal'">
          <v-row v-if="loading">
            <v-col v-for="i in 3" :key="i" cols="12">
              <v-skeleton-loader type="article, actions" rounded="xl"></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-else-if="treinosSemanais.length">
            <v-col v-for="treino in treinosSemanais" :key="treino.id" cols="12">
              <v-card
                class="pa-6 hover-card"
                elevation="4"
                rounded="xl"
                :style="{
                  borderLeft: '4px solid #42A5F5',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                }"
              >
                <div class="cursor-pointer" @click="toggleDetalhes(treino.id)">
                  <v-row no-gutters>
                    <v-col cols="auto" class="me-4 d-flex align-center justify-center">
                      <v-avatar size="70" class="elevation-2 gradient-avatar">
                        <v-icon size="35" color="white">mdi-dumbbell</v-icon>
                      </v-avatar>
                    </v-col>

                    <v-col class="d-flex flex-column justify-center">
                      <div class="text-h6 font-weight-bold gradient-text mb-1">
                        {{ treino.tipoTreino.nome }}
                      </div>
                      <div class="text-body-2 text-grey-darken-1 mb-2 d-flex align-center">
                        <v-icon size="16" class="me-1 gradient-icon">mdi-calendar-repeat</v-icon>
                        {{ t('treinosAtleta.frequency', { count: treino.frequenciaSemanal }) }}
                      </div>
                      <div class="text-body-2 text-grey-darken-2 d-flex align-center">
                        <v-icon size="16" class="me-2 gradient-icon">mdi-format-list-numbered</v-icon>
                        {{ treino.exercicioTreinos.length === 1 ? t('treinosAtleta.exercise', { count: treino.exercicioTreinos.length }) : t('treinosAtleta.exercises', { count: treino.exercicioTreinos.length }) }}
                      </div>
                    </v-col>

                    <v-col cols="auto" class="d-flex align-center">
                      <v-icon :color="expandido[treino.id] ? '#42A5F5' : 'grey'">
                        {{ expandido[treino.id] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                      </v-icon>
                    </v-col>
                  </v-row>
                </div>

                <v-expand-transition>
                  <div v-show="expandido[treino.id]" class="mt-4">
                    <v-divider class="mb-4"></v-divider>

                    <div class="info-section mb-3">
                      <div class="text-subtitle-2 font-weight-bold mb-1">{{ t('treinosAtleta.instructions') }}</div>
                      <p class="text-body-2">{{ treino.instrucoes }}</p>
                    </div>
                    <div class="info-section mb-3">
                      <div class="text-subtitle-2 font-weight-bold mb-1">{{ t('treinosAtleta.careRestrictions') }}</div>
                      <p class="text-body-2">{{ treino.cuidadosRestricoes }}</p>
                    </div>
                    <div class="info-section mb-4">
                      <div class="text-subtitle-2 font-weight-bold mb-1">{{ t('treinosAtleta.observations') }}</div>
                      <p class="text-body-2">{{ treino.observacoesGerais }}</p>
                    </div>

                    <v-divider class="mb-4"></v-divider>
                    <div class="text-subtitle-1 font-weight-bold gradient-text mb-3">{{ t('treinosAtleta.exercisesList') }}</div>

                    <v-card
                      v-for="exercicio in treino.exercicioTreinos"
                      :key="exercicio.id"
                      class="mb-3 exercise-card"
                      elevation="2"
                      rounded="lg"
                    >
                      <v-card-text>
                        <div class="text-subtitle-2 font-weight-bold mb-2">
                          {{ exercicio.ordem }}. {{ exercicio.nomeExercicioPersonalizado || exercicio.exercicio.nome }}
                        </div>
                        <div class="d-flex flex-wrap gap-2 mb-2">
                          <v-chip size="small" color="#42A5F5" variant="flat" class="text-white" v-if="exercicio.series">
                            <v-icon start size="14">mdi-repeat</v-icon>
                            {{ t('treinosAtleta.sets', { count: exercicio.series }) }}
                          </v-chip>
                          <v-chip size="small" color="#1E88E5" variant="flat" class="text-white" v-if="exercicio.repeticoes">
                            <v-icon start size="14">mdi-counter</v-icon>
                            {{ t('treinosAtleta.reps', { count: exercicio.repeticoes }) }}
                          </v-chip>
                          <v-chip size="small" color="orange" variant="flat" class="text-white" v-if="exercicio.carga">
                            <v-icon start size="14">mdi-weight-kilogram</v-icon>
                            {{ t('treinosAtleta.load', { weight: exercicio.carga }) }}
                          </v-chip>
                          <v-chip size="small" color="green" variant="flat" class="text-white" v-if="exercicio.quantidadeKm">
                            <v-icon start size="14">mdi-map-marker-distance</v-icon>
                            {{ t('treinosAtleta.distance', { km: exercicio.quantidadeKm }) }}
                          </v-chip>
                        </div>
                        <div v-if="exercicio.observacoes" class="text-caption text-grey-darken-1">
                          <v-icon size="14" class="me-1">mdi-information-outline</v-icon>
                          {{ exercicio.observacoes }}
                        </div>
                      </v-card-text>
                    </v-card>

                    <div class="text-caption text-grey mt-4">
                      <v-icon size="14" class="me-1">mdi-account</v-icon>
                      {{ t('treinosAtleta.createdBy', { name: treino.createdBy, date: formatarData(treino.createdAt) }) }}
                    </div>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
          <div v-else-if="!loading" class="text-center py-8">
            <v-icon size="64" color="grey-lighten-2">mdi-dumbbell</v-icon>
            <p class="text-h6 mt-4 text-grey">{{ t('treinosAtleta.noWeeklyTrainings') }}</p>
          </div>
        </div>

        <div v-if="tab === 'diario'">
          <v-row v-if="loading">
            <v-col v-for="i in 3" :key="i" cols="12">
              <v-skeleton-loader type="article, actions" rounded="xl"></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-else-if="treinosDiarios.length">
            <v-col v-for="treino in treinosDiarios" :key="treino.id" cols="12">
              <v-card
                class="pa-6 hover-card"
                elevation="4"
                rounded="xl"
                :style="{
                  borderLeft: '4px solid #42A5F5',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                }"
              >
                <div class="cursor-pointer" @click="toggleDetalhes(treino.id)">
                  <v-row no-gutters>
                    <v-col cols="auto" class="me-4 d-flex align-center justify-center">
                      <v-avatar size="70" class="elevation-2 gradient-avatar">
                        <v-icon size="35" color="white">mdi-dumbbell</v-icon>
                      </v-avatar>
                    </v-col>

                    <v-col class="d-flex flex-column justify-center">
                      <div class="text-h6 font-weight-bold gradient-text mb-1">
                        {{ treino.tipoTreino.nome }}
                      </div>
                      <div class="text-body-2 text-grey-darken-2 d-flex align-center">
                        <v-icon size="16" class="me-2 gradient-icon">mdi-format-list-numbered</v-icon>
                        {{ treino.exercicioTreinos.length === 1 ? t('treinosAtleta.exercise', { count: treino.exercicioTreinos.length }) : t('treinosAtleta.exercises', { count: treino.exercicioTreinos.length }) }}
                      </div>
                    </v-col>

                    <v-col cols="auto" class="d-flex align-center">
                      <v-icon :color="expandido[treino.id] ? '#42A5F5' : 'grey'">
                        {{ expandido[treino.id] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                      </v-icon>
                    </v-col>
                  </v-row>
                </div>

                <v-expand-transition>
                  <div v-show="expandido[treino.id]" class="mt-4">
                    <v-divider class="mb-4"></v-divider>

                    <div class="info-section mb-3">
                      <div class="text-subtitle-2 font-weight-bold mb-1">{{ t('treinosAtleta.instructions') }}</div>
                      <p class="text-body-2">{{ treino.instrucoes }}</p>
                    </div>
                    <div class="info-section mb-3">
                      <div class="text-subtitle-2 font-weight-bold mb-1">{{ t('treinosAtleta.careRestrictions') }}</div>
                      <p class="text-body-2">{{ treino.cuidadosRestricoes }}</p>
                    </div>
                    <div class="info-section mb-4">
                      <div class="text-subtitle-2 font-weight-bold mb-1">{{ t('treinosAtleta.observations') }}</div>
                      <p class="text-body-2">{{ treino.observacoesGerais }}</p>
                    </div>

                    <v-divider class="mb-4"></v-divider>
                    <div class="text-subtitle-1 font-weight-bold gradient-text mb-3">{{ t('treinosAtleta.exercisesList') }}</div>

                    <v-card
                      v-for="exercicio in treino.exercicioTreinos"
                      :key="exercicio.id"
                      class="mb-3 exercise-card"
                      elevation="2"
                      rounded="lg"
                    >
                      <v-card-text>
                        <div class="text-subtitle-2 font-weight-bold mb-2">
                          {{ exercicio.ordem }}. {{ exercicio.nomeExercicioPersonalizado || exercicio.exercicio.nome }}
                        </div>
                        <div class="d-flex flex-wrap gap-2 mb-2">
                          <v-chip size="small" color="#42A5F5" variant="flat" class="text-white" v-if="exercicio.series">
                            <v-icon start size="14">mdi-repeat</v-icon>
                            {{ t('treinosAtleta.sets', { count: exercicio.series }) }}
                          </v-chip>
                          <v-chip size="small" color="#1E88E5" variant="flat" class="text-white" v-if="exercicio.repeticoes">
                            <v-icon start size="14">mdi-counter</v-icon>
                            {{ t('treinosAtleta.reps', { count: exercicio.repeticoes }) }}
                          </v-chip>
                          <v-chip size="small" color="orange" variant="flat" class="text-white" v-if="exercicio.carga">
                            <v-icon start size="14">mdi-weight-kilogram</v-icon>
                            {{ t('treinosAtleta.load', { weight: exercicio.carga }) }}
                          </v-chip>
                          <v-chip size="small" color="green" variant="flat" class="text-white" v-if="exercicio.quantidadeKm">
                            <v-icon start size="14">mdi-map-marker-distance</v-icon>
                            {{ t('treinosAtleta.distance', { km: exercicio.quantidadeKm }) }}
                          </v-chip>
                        </div>
                        <div v-if="exercicio.observacoes" class="text-caption text-grey-darken-1">
                          <v-icon size="14" class="me-1">mdi-information-outline</v-icon>
                          {{ exercicio.observacoes }}
                        </div>
                      </v-card-text>
                    </v-card>

                    <div class="text-caption text-grey mt-4">
                      <v-icon size="14" class="me-1">mdi-account</v-icon>
                      {{ t('treinosAtleta.createdBy', { name: treino.createdBy, date: formatarData(treino.createdAt) }) }}
                    </div>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
          <div v-else-if="!loading" class="text-center py-8">
            <v-icon size="64" color="grey-lighten-2">mdi-dumbbell</v-icon>
            <p class="text-h6 mt-4 text-grey">{{ t('treinosAtleta.noDailyTrainings') }}</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import treinoService from '@/services/treinos/treino-service'
import { getAtletaId } from '@/utils/auth'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const treinos = ref([])
const tab = ref('semanal')
const expandido = ref({})
const loading = ref(true)

const treinosSemanais = computed(() =>
  treinos.value.filter(t => t.tipoRecomendacao === 'Semanal')
)

const treinosDiarios = computed(() =>
  treinos.value.filter(t => t.tipoRecomendacao === 'Diario')
)

const toggleDetalhes = (id) => {
  expandido.value[id] = !expandido.value[id]
}

const formatarData = (data) => {
  const date = new Date(data)
  if (locale.value === 'pt') {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  } else {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
  }
}

const buscarTreinosAtleta = async () => {
  loading.value = true
  try {
    const atletaId = getAtletaId()
    const response = await treinoService.getTreinosByAtleta(atletaId)
    treinos.value = response.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await buscarTreinosAtleta()
})
</script>

<style scoped>
.header-section {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  padding: 48px 24px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.header-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.header-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.filter-toggle {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 50px;
}

.filter-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-btn.active-filter {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  color: white !important;
}

.gradient-avatar {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
}

.gradient-icon {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hover-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.hover-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.cursor-pointer {
  cursor: pointer;
}

.info-section {
  border-left: 3px solid;
  border-image: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) 1;
  padding-left: 16px;
}

.exercise-card {
  border: 1px solid #E3F2FD;
  transition: all 0.2s ease;
}

.exercise-card:hover {
  border-color: #42A5F5;
}

.gap-2 {
  gap: 8px;
}
</style>
