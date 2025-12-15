<template>
  <v-container class="pa-0 w-100" fluid>
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <v-container class="position-relative w-100">
        <v-row align="center" class="min-height-300">
          <v-col cols="12" class="text-center">
            <v-icon color="white" size="80" class="mb-4">mdi-account-multiple-plus</v-icon>
            <h1 class="hero-title">Solicitações de Conexão</h1>
            <p class="hero-subtitle">Gerencie suas conexões com treinadores e fisioterapeutas</p>
            <v-chip class="mt-4" color="white" variant="flat" size="large">
              <v-icon start>mdi-bell-badge</v-icon>
              {{ conexoesPendentes.length }} solicitações pendentes
            </v-chip>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-container class="content-section">
      <v-row justify="center">
        <v-col cols="12">
          <v-card rounded="xl" elevation="2">
            <v-tabs v-model="tab" bg-color="white" color="blue" grow>
              <v-tab value="pendentes">
                <v-icon start>mdi-clock-alert</v-icon>
                Pendentes
                <v-chip v-if="conexoesPendentes.length > 0" class="ml-2" size="small" color="blue">{{ conexoesPendentes.length }}</v-chip>
              </v-tab>
              <v-tab value="minhas">
                <v-icon start>mdi-account-check</v-icon>
                Minhas Conexões
                <v-chip v-if="minhasConexoes.length > 0" class="ml-2" size="small" color="green">{{ minhasConexoes.length }}</v-chip>
              </v-tab>
            </v-tabs>

            <v-window v-model="tab">
              <!-- Tab Pendentes -->
              <v-window-item value="pendentes">
                <div class="pa-4">
                  <div v-if="loading">
                    <v-skeleton-loader
                      v-for="n in 3"
                      :key="n"
                      class="mb-4"
                      type="list-item-avatar-three-line"
                      rounded="xl"
                    />
                  </div>

                  <div v-else>
                    <v-card
                      v-for="(conexao, index) in conexoesPendentesFiltered"
                      :key="index"
                      class="conexao-card mb-4"
                      elevation="2"
                      rounded="xl"
                    >
                      <v-card-text class="pa-6">
                        <v-row align="center">
                          <v-col cols="12" sm="auto" class="text-center text-sm-left">
                            <v-badge
                              :color="conexao.tipo === 'Treinador' ? 'green' : 'blue'"
                              dot
                              location="bottom right"
                              offset-x="8"
                              offset-y="8"
                            >
                              <v-avatar size="90" class="avatar-shadow">
                                <v-img v-if="conexao.avatarUrl" :src="conexao.avatarUrl" cover></v-img>
                                <v-icon v-else size="45" color="grey-darken-1">mdi-account</v-icon>
                              </v-avatar>
                            </v-badge>
                          </v-col>

                          <v-col cols="12" sm="" class="text-center text-sm-left">
                            <div class="d-flex align-center justify-center justify-sm-start mb-2">
                              <h3 class="text-h6 font-weight-bold mr-2">{{ conexao.nome }}</h3>
                              <v-chip
                                :color="conexao.tipo === 'Treinador' ? 'green' : 'blue'"
                                size="small"
                                variant="flat"
                              >
                                {{ conexao.tipo }}
                              </v-chip>
                            </div>
                            <div class="text-body-1 text-grey-darken-2 mb-1">
                              <v-icon size="18" class="mr-1">mdi-certificate</v-icon>
                              {{ conexao.especializacao }}
                            </div>
                            <div class="text-caption text-grey">
                              <v-icon size="16" class="mr-1">mdi-clock-outline</v-icon>
                              Solicitação enviada há 2 dias
                            </div>
                          </v-col>

                          <v-col cols="12" sm="auto" class="text-center">
                            <div class="d-flex flex-column ga-3">
                              <v-btn
                                variant="flat"
                                color="green"
                                size="large"
                                class="px-8"
                                rounded="lg"
                                @click="aceitarConexao(conexao.id)"
                              >
                                <v-icon start>mdi-check-circle</v-icon>
                                Aceitar
                              </v-btn>
                              <v-btn
                                variant="outlined"
                                color="red"
                                size="large"
                                class="px-8"
                                rounded="lg"
                                @click="recusarConexao(conexao.id)"
                              >
                                <v-icon start>mdi-close-circle</v-icon>
                                Recusar
                              </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <div v-if="conexoesPendentesFiltered.length === 0" class="empty-state">
                      <v-card class="pa-12 text-center" rounded="xl" elevation="0" color="grey-lighten-5">
                        <v-icon size="120" color="grey-lighten-1" class="mb-6">mdi-clock-check</v-icon>
                        <h3 class="text-h5 font-weight-bold mb-3">Nenhuma solicitação pendente</h3>
                        <p class="text-body-1 text-grey-darken-1">Você não possui solicitações de conexão no momento.</p>
                      </v-card>
                    </div>
                  </div>
                </div>
              </v-window-item>

              <!-- Tab Minhas Conexões -->
              <v-window-item value="minhas">
                <div class="pa-4">
                  <v-row class="mb-4">
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="perfilSelecionado"
                        :items="[
                          { title: 'Todos', value: '' },
                          { title: 'Fisioterapeuta', value: getFisioterapeutaId() },
                          { title: 'Treinador', value: getTreinadorId() }
                        ]"
                        label="Filtrar por tipo"
                        variant="outlined"
                        density="comfortable"
                        @update:model-value="conexoesFindAllPagined"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <div v-if="loading">
                    <v-skeleton-loader
                      v-for="n in 3"
                      :key="n"
                      class="mb-4"
                      type="list-item-avatar-three-line"
                      rounded="xl"
                    />
                  </div>

                  <div v-else>
                    <v-card
                      v-for="(conexao, index) in minhasConexoes"
                      :key="index"
                      class="conexao-card mb-4"
                      elevation="2"
                      rounded="xl"
                    >
                      <v-card-text class="pa-6">
                        <v-row align="center">
                          <v-col cols="12" sm="auto" class="text-center text-sm-left">
                            <v-badge
                              :color="conexao.tipo === 'Treinador' ? 'green' : 'blue'"
                              dot
                              location="bottom right"
                              offset-x="8"
                              offset-y="8"
                            >
                              <v-avatar size="90" class="avatar-shadow">
                                <v-img v-if="conexao.avatarUrl" :src="conexao.avatarUrl" cover></v-img>
                                <v-icon v-else size="45" color="grey-darken-1">mdi-account</v-icon>
                              </v-avatar>
                            </v-badge>
                          </v-col>

                          <v-col cols="12" sm="" class="text-center text-sm-left">
                            <div class="d-flex align-center justify-center justify-sm-start mb-2">
                              <h3 class="text-h6 font-weight-bold mr-2">{{ conexao.nome }}</h3>
                              <v-chip
                                :color="conexao.tipo === 'Treinador' ? 'green' : 'blue'"
                                size="small"
                                variant="flat"
                              >
                                {{ conexao.tipo }}
                              </v-chip>
                            </div>
                            <div class="text-body-1 text-grey-darken-2 mb-1">
                              <v-icon size="18" class="mr-1">mdi-certificate</v-icon>
                              {{ conexao.especializacao }}
                            </div>
                            <div class="text-caption text-grey">
                              <v-icon size="16" class="mr-1">mdi-check-circle</v-icon>
                              Conectado desde {{ conexao.dataConexao }}
                            </div>
                          </v-col>

                          <v-col cols="12" sm="auto" class="text-center">
                            <v-btn
                              variant="outlined"
                              color="red"
                              size="large"
                              class="px-8"
                              rounded="lg"
                              @click="abrirModalDesvincular(conexao)"
                            >
                              <v-icon start>mdi-link-off</v-icon>
                              Desvincular
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <div v-if="minhasConexoes.length === 0" class="empty-state">
                      <v-card class="pa-12 text-center" rounded="xl" elevation="0" color="grey-lighten-5">
                        <v-icon size="120" color="grey-lighten-1" class="mb-6">mdi-account-multiple-outline</v-icon>
                        <h3 class="text-h5 font-weight-bold mb-3">Nenhuma conexão ativa</h3>
                        <p class="text-body-1 text-grey-darken-1">Você ainda não possui conexões estabelecidas.</p>
                      </v-card>
                    </div>

                    <div v-if="minhasConexoes.length > 0" class="d-flex justify-center mt-6">
                      <v-pagination
                        v-model="page"
                        :length="totalPages"
                        @update:model-value="conexoesFindAllPagined"
                      ></v-pagination>
                    </div>
                  </div>
                </div>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Modal de Confirmação -->
    <v-dialog v-model="dialogDesvincular" max-width="500">
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5 font-weight-bold">
          <v-icon color="red" size="28" class="mr-2">mdi-alert-circle</v-icon>
          Confirmar Desvinculação
        </v-card-title>
        <v-card-text class="pa-6 pt-0">
          <p class="text-body-1 mb-2">
            Tem certeza que deseja desvincular-se de <strong>{{ conexaoSelecionada?.nome }}</strong>?
          </p>
          <p class="text-body-2 text-grey-darken-1">
            Esta ação não poderá ser desfeita e você precisará solicitar uma nova conexão caso queira reconectar.
          </p>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            color="grey"
            size="large"
            @click="dialogDesvincular = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            variant="flat"
            color="red"
            size="large"
            @click="confirmarDesvincular"
          >
            Desvincular
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import atletaService from '@/services/atleta/atleta-service'
import { getTreinadorId, getFisioterapeutaId } from '@/utils/auth'

const page = ref(1)
const pageSize = ref(3)
const totalPages = ref(0)
const tab = ref('pendentes')
const loading = ref(false)
const dialogDesvincular = ref(false)
const conexaoSelecionada = ref(null)
const perfilSelecionado = ref('')

const conexoesPendentes = ref([])

const minhasConexoes = ref([])

const conexoesPendentesFiltered = computed(() => {
  return minhasConexoes.value.filter(c => c.status === 'pendente')
})

const aceitarConexao = (id) => {
  console.log('Aceitar conexão:', id)
  // TODO: Implementar chamada à API quando disponível
  conexoesPendentes.value = conexoesPendentes.value.filter(c => c.id !== id)
}

const recusarConexao = (id) => {
  console.log('Recusar conexão:', id)
  // TODO: Implementar chamada à API quando disponível
  conexoesPendentes.value = conexoesPendentes.value.filter(c => c.id !== id)
}

const abrirModalDesvincular = (conexao) => {
  conexaoSelecionada.value = conexao
  dialogDesvincular.value = true
}

const confirmarDesvincular = () => {
  console.log('Desvincular conexão:', conexaoSelecionada.value.id)
  // TODO: Implementar chamada à API quando disponível
  minhasConexoes.value = minhasConexoes.value.filter(c => c.id !== conexaoSelecionada.value.id)
  dialogDesvincular.value = false
  conexaoSelecionada.value = null
}

const conexoesFindAllPagined = async () => {
  const perfilId = perfilSelecionado.value
  loading.value = true
  try {
    const response = await atletaService.getConexoesFindAllPagined(page.value, pageSize.value, perfilId)
    minhasConexoes.value = response.data
    totalPages.value = response.totalPages || 0
  } catch (error) {
    console.error('Erro ao buscar conexões:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // TODO: Buscar conexões da API quando disponível
  conexoesFindAllPagined()
})
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #2196F3 0%, #00c6fe 100%);
  position: relative;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}

.min-height-300 {
  min-height: 300px;
}

.hero-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.2rem;
  margin: 0;
}

.content-section {
  background: #f8f9fa;
  padding-top: 40px;
  padding-bottom: 40px;
  min-height: 60vh;
  width: 100%;
}

.conexao-card {
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  background: white;
}

.conexao-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
  border-left-color: #2196F3;
}

.avatar-shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.empty-state {
  margin-top: 40px;
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}
</style>
