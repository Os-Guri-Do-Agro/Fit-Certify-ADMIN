<template>
  <div class="pa-6" style="background: #f8f9fa; min-height: 100vh;">
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-8">
      <div class="d-flex align-center ga-3">
        <v-btn
          icon
          variant="outlined"
          color="#1E88E5"
          @click="voltarParaLista"
          style="border-width: 2px;"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <div>
          <h1 class="text-h4 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">
            {{ t('exercicios.title') }}
          </h1>
          <p class="text-body-2 text-grey mt-1">{{ t('exercicios.subtitle') }}</p>
        </div>
      </div>
      <v-btn
        color="#1E88E5"
        prepend-icon="mdi-plus"
        @click="criarExercicio"
        rounded="xl"
        elevation="4"
        height="48"
        class="text-white px-6"
        style="font-weight: 600; text-transform: none; letter-spacing: 0;"
      >
        {{ t('exercicios.addExercise') }}
      </v-btn>
    </div>

    <!-- Busca -->
    <v-card class="mb-8 search-card" elevation="0" rounded="xl">
      <v-card-text class="pa-4">
        <v-text-field
          v-model="busca"
          :placeholder="t('exercicios.searchPlaceholder')"
          variant="outlined"
          density="comfortable"
          hide-details
          clearable
          rounded="lg"
          bg-color="white"
          class="search-field"
        >
          <template #prepend-inner>
            <v-icon color="#1E88E5">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-card-text>
    </v-card>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-16">
      <v-progress-circular indeterminate color="#1E88E5" size="64" width="6" />
      <p class="text-h6 mt-6 font-weight-medium" style="color: #2c3e50;">{{ t('exercicios.loading') }}</p>
    </div>

    <!-- Empty State -->
    <v-card
      v-else-if="exerciciosFiltrados.length === 0"
      class="text-center py-16"
      elevation="0"
      rounded="xl"
      style="background: white;"
    >
      <div class="empty-icon-container mx-auto mb-6">
        <v-icon size="64" color="#1E88E5">mdi-book-open-variant</v-icon>
      </div>
      <h3 class="text-h5 font-weight-bold mb-3" style="color: #2c3e50;">{{ t('exercicios.noExercises') }}</h3>
      <p class="text-body-1 text-grey-darken-1">{{ t('exercicios.noExercisesDescription') }}</p>
    </v-card>

    <!-- Lista de Exercícios -->
    <v-row v-else>
      <v-col v-for="exercicio in exerciciosFiltrados" :key="exercicio.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="exercicio-card" elevation="0" rounded="xl" @click="abrirDetalhes(exercicio)">
          <v-card-text class="pa-5">
            <div class="d-flex align-center mb-4">
              <div class="icon-container">
                <v-icon color="white" size="28">mdi-dumbbell</v-icon>
              </div>
            </div>
            <h3 class="text-h6 font-weight-bold mb-2" style="color: #2c3e50;">{{ exercicio.nome }}</h3>
            <p class="text-body-2 text-grey-darken-1 line-clamp-2" style="line-height: 1.6;">
              {{ exercicio.descricao || t('exercicios.noDescription') }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Paginação -->
    <div v-if="totalPages > 1 && !loading" class="d-flex justify-center align-center mt-8 ga-4">
      <v-btn
        icon
        variant="outlined"
        color="#1E88E5"
        :disabled="page === 1"
        @click="mudarPagina(page - 1)"
        style="border-width: 2px;"
        size="large"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-card elevation="0" rounded="xl" class="px-6 py-3">
        <span class="text-body-1 font-weight-medium" style="color: #2c3e50;">
          {{ t('exercicios.page') }} {{ page }} {{ t('exercicios.of') }} {{ totalPages }}
        </span>
      </v-card>
      <v-btn
        icon
        variant="outlined"
        color="#1E88E5"
        :disabled="page >= totalPages"
        @click="mudarPagina(page + 1)"
        style="border-width: 2px;"
        size="large"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>

    <!-- Modal Criar Exercício -->
    <v-dialog v-model="modalCriar" max-width="600" scrollable>
      <v-card rounded="xl" elevation="24">
        <v-card-title
          class="text-white d-flex justify-space-between align-center pa-6"
          style="background: linear-gradient(135deg, #1E88E5 0%, #0099cc 100%);"
        >
          <span class="text-h5 font-weight-bold">{{ t('exercicios.createModal.title') }}</span>
          <v-btn
            icon
            variant="text"
            @click="modalCriar = false"
            style="background: rgba(255,255,255,0.2);"
          >
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pt-6 pb-6" style="background: #f8f9fa;">
          <v-card class="mb-4" elevation="0" rounded="xl">
            <v-card-text class="pa-4">
              <v-text-field
                v-model="nome"
                :placeholder="t('exercicios.createModal.namePlaceholder')"
                variant="outlined"
                density="comfortable"
                rounded="lg"
                :disabled="loadingSalvar"
                hide-details
                bg-color="white"
              >
                <template #prepend-inner>
                  <v-icon color="#1E88E5">mdi-dumbbell</v-icon>
                </template>
              </v-text-field>
            </v-card-text>
          </v-card>

          <v-card class="mb-4" elevation="0" rounded="xl">
            <v-card-text class="pa-4">
              <v-text-field
                :model-value="tipoTreinoSelecionado?.nome || ''"
                :placeholder="t('exercicios.createModal.selectTrainingType')"
                variant="outlined"
                density="comfortable"
                rounded="lg"
                readonly
                @click="modalTipoTreino = true"
                :disabled="loadingSalvar"
                hide-details
                bg-color="white"
                style="cursor: pointer;"
              >
                <template #prepend-inner>
                  <v-icon color="#1E88E5">mdi-format-list-bulleted</v-icon>
                </template>
                <template #append-inner>
                  <v-icon>mdi-chevron-down</v-icon>
                </template>
              </v-text-field>
            </v-card-text>
          </v-card>

          <v-card class="mb-4" elevation="0" rounded="xl">
            <v-card-text class="pa-4">
              <label class="text-body-2 font-weight-medium mb-3 d-block" style="color: #2c3e50;">
                {{ t('exercicios.createModal.descriptionLabel') }}
              </label>
              <v-textarea
                v-model="descricao"
                variant="outlined"
                rounded="lg"
                rows="6"
                :disabled="loadingSalvar"
                :placeholder="t('exercicios.createModal.descriptionPlaceholder')"
                hide-details
                bg-color="white"
              />
            </v-card-text>
          </v-card>

          <v-btn
            block
            size="x-large"
            rounded="xl"
            color="#88ce0d"
            elevation="4"
            height="56"
            :disabled="loadingSalvar"
            :style="{ opacity: loadingSalvar ? 0.6 : 1 }"
            @click="salvarExercicio"
            class="text-white"
            style="font-weight: 600; text-transform: none; letter-spacing: 0;"
          >
            <v-icon v-if="!loadingSalvar" left>mdi-check-circle</v-icon>
            <v-progress-circular v-else indeterminate size="24" width="3" color="white" />
            <span class="ml-2">{{ loadingSalvar ? t('exercicios.createModal.saving') : t('exercicios.createModal.save') }}</span>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Modal Tipo de Treino -->
    <v-dialog v-model="modalTipoTreino" max-width="500" scrollable>
      <v-card rounded="xl" elevation="24">
        <v-card-title
          class="text-white pa-6"
          style="background: linear-gradient(135deg, #1E88E5 0%, #0099cc 100%);"
        >
          <span class="text-h6 font-weight-bold">{{ t('exercicios.trainingTypeModal.title') }}</span>
        </v-card-title>
        <v-card-text class="pa-0" style="max-height: 400px;">
          <v-list>
            <v-list-item
              v-for="tipo in tiposTreinos"
              :key="tipo.id"
              @click="selecionarTipoTreino(tipo)"
              class="tipo-treino-item"
            >
              <v-list-item-title class="font-weight-medium">{{ tipo.nome }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Modal de Detalhes -->
    <v-dialog v-model="modalVisible" max-width="700" scrollable>
      <v-card v-if="exercicioSelecionado" rounded="xl" elevation="24">
        <v-card-title
          class="text-white d-flex justify-space-between align-center pa-6"
          style="background: linear-gradient(135deg, #1E88E5 0%, #0099cc 100%);"
        >
          <span class="text-h5 font-weight-bold">{{ t('exercicios.detailsModal.title') }}</span>
          <v-btn
            icon
            variant="text"
            @click="modalVisible = false"
            style="background: rgba(255,255,255,0.2);"
          >
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pt-6 pb-6" style="background: #f8f9fa;">
          <v-card class="mb-4" elevation="0" rounded="xl">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <div class="icon-container-large">
                  <v-icon color="white" size="48">mdi-dumbbell</v-icon>
                </div>
                <div class="ml-4">
                  <h2 class="text-h5 font-weight-bold" style="color: #2c3e50;">{{ exercicioSelecionado.nome }}</h2>
                </div>
              </div>
              <p class="text-body-1" style="line-height: 1.7; color: #2c3e50;">
                {{ exercicioSelecionado.descricao || t('exercicios.noDescription') }}
              </p>
            </v-card-text>
          </v-card>

          <v-card elevation="0" rounded="xl">
            <v-card-text class="pa-6">
              <v-row>
                <v-col cols="12" md="6">
                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-2 font-weight-medium">{{ t('exercicios.detailsModal.status') }}</div>
                    <v-chip
                      :color="exercicioSelecionado.ativo ? '#88ce0d' : '#ff5252'"
                      size="default"
                      class="font-weight-bold"
                    >
                      {{ exercicioSelecionado.ativo ? t('exercicios.detailsModal.active') : t('exercicios.detailsModal.inactive') }}
                    </v-chip>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-2 font-weight-medium">{{ t('exercicios.detailsModal.createdAt') }}</div>
                    <div class="text-body-1 font-weight-bold" style="color: #2c3e50;">
                      {{ formatarData(exercicioSelecionado.createdAt) }}
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import exercicioService from '@/services/treinos/exercicios/exercicio-service'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import 'dayjs/locale/en'

const { t, locale } = useI18n()
const router = useRouter()

watch(locale, (newLocale) => {
  dayjs.locale(newLocale === 'pt' ? 'pt-br' : 'en')
})

const exercicios = ref<any[]>([])
const busca = ref('')
const loading = ref(false)
const modalVisible = ref(false)
const exercicioSelecionado = ref<any>(null)
const page = ref(1)
const totalPages = ref(1)
const pageSize = 12

const exerciciosFiltrados = computed(() => {
  if (!busca.value.trim()) {
    return exercicios.value
  }
  const termo = busca.value.toLowerCase()
  return exercicios.value.filter(exercicio =>
    exercicio.nome?.toLowerCase().includes(termo) ||
    exercicio.descricao?.toLowerCase().includes(termo)
  )
})

const carregarExercicios = async () => {
  try {
    loading.value = true
    const response = await exercicioService.getExerciciosPagined(page.value, pageSize)

    if (response?.itens) {
      exercicios.value = response.itens
      totalPages.value = response.totalPages || 1
    } else if (response?.data) {
      exercicios.value = response.data.itens || []
      totalPages.value = response.data.totalPages || 1
    } else {
      exercicios.value = []
      totalPages.value = 1
    }
  } catch (error) {
    console.error('Erro ao carregar exercícios:', error)
    toast.error(t('exercicios.toast.loadError'))
    exercicios.value = []
  } finally {
    loading.value = false
  }
}

const mudarPagina = (novaPagina: number) => {
  page.value = novaPagina
  carregarExercicios()
}

const abrirDetalhes = (exercicio: any) => {
  exercicioSelecionado.value = exercicio
  modalVisible.value = true
}

const voltarParaLista = () => {
  router.back()
}

const modalCriar = ref(false)
const nome = ref('')
const descricao = ref('')
const tipoTreinoId = ref('')
const tipoTreinoSelecionado = ref<any>(null)
const tiposTreinos = ref<any[]>([])
const modalTipoTreino = ref(false)
const loadingSalvar = ref(false)

const criarExercicio = () => {
  modalCriar.value = true
  carregarTiposTreino()
}

const carregarTiposTreino = async () => {
  try {
    const tipoTreinoService = (await import('@/services/treinos/tipoTreino/tipoTreino-service')).default
    const response = await tipoTreinoService.getAllTiposTreino()
    tiposTreinos.value = response?.data || response || []
  } catch (error) {
    console.error('Erro ao carregar tipos de treino:', error)
    toast.error(t('exercicios.toast.loadTrainingTypesError'))
  }
}

const selecionarTipoTreino = (tipo: any) => {
  tipoTreinoSelecionado.value = tipo
  tipoTreinoId.value = tipo.id
  modalTipoTreino.value = false
}

const salvarExercicio = async () => {
  if (!nome.value.trim()) {
    toast.error(t('exercicios.toast.nameRequired'))
    return
  }
  if (!tipoTreinoId.value) {
    toast.error(t('exercicios.toast.trainingTypeRequired'))
    return
  }

  try {
    loadingSalvar.value = true
    const payload = {
      nome: nome.value.trim(),
      descricao: descricao.value.trim() || undefined,
      tipoTreinoId: tipoTreinoId.value,
      ativo: true
    }
    await exercicioService.createExercicio(payload)
    toast.success(t('exercicios.toast.createSuccess'))
    modalCriar.value = false
    nome.value = ''
    descricao.value = ''
    tipoTreinoId.value = ''
    tipoTreinoSelecionado.value = null
    await carregarExercicios()
  } catch (error) {
    console.error('Erro ao criar exercício:', error)
    toast.error(t('exercicios.toast.createError'))
  } finally {
    loadingSalvar.value = false
  }
}

const formatarData = (data: string) => {
  if (!data) return 'N/A'
  return locale.value === 'pt'
    ? dayjs(data).format('DD/MM/YYYY')
    : dayjs(data).format('MM/DD/YYYY')
}

onMounted(() => {
  dayjs.locale(locale.value === 'pt' ? 'pt-br' : 'en')
  carregarExercicios()
})
</script>

<style scoped>
.exercicio-card {
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  background: white;
  border: 2px solid transparent;
}

.exercicio-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25) !important;
  border-color: #1E88E5;
}

.search-card {
  background: white;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
}

.search-card:hover {
  border-color: #1E88E5;
}

:deep(.search-field .v-field) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.icon-container {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);
}

.icon-container-large {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);
}

.empty-icon-container {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 198, 254, 0.1) 0%, rgba(0, 153, 204, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

.v-btn {
  transition: all 0.3s ease;
}

.v-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.v-btn:active:not(:disabled) {
  transform: translateY(0);
}

.tipo-treino-item {
  cursor: pointer;
  transition: all 0.2s ease;
}

.tipo-treino-item:hover {
  background: rgba(0, 198, 254, 0.1);
}
</style>
