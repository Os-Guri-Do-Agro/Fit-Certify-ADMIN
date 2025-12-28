<template>
  <v-container class="pa-0 w-100" fluid>
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <v-container class="position-relative w-100">
        <v-btn color="white" variant="outlined" rounded="xl" prepend-icon="mdi-qrcode" @click="router.push('/gerenciarCodigos')" class="btn-top-right">
          Gerenciar Códigos
        </v-btn>
        <v-row align="center" class="min-height-300">
          <v-col cols="12" class="text-center">
            <v-icon color="white" size="80" class="mb-4">mdi-account-multiple-plus</v-icon>
            <h1 class="hero-title">Solicitações de Conexão</h1>
            <p class="hero-subtitle">Gerencie suas conexões com profissionais e atletas</p>
            <v-chip class="mt-4" color="white" variant="flat" size="large">
              <v-icon start>mdi-bell-badge</v-icon>
              {{ solicitacoesPendentes.length }} solicitações pendentes
            </v-chip>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-container class="content-section">
      <v-row justify="center">
        <v-col cols="12">
          <v-card rounded="xl" elevation="2">
            <v-tabs v-model="activeTab" bg-color="white" color="blue" grow>
              <v-tab value="pendentes">
                <v-icon start>mdi-clock-alert</v-icon>
                Pendentes
                <v-chip v-if="solicitacoesPendentes.length > 0" class="ml-2" size="small" color="blue">{{ solicitacoesPendentes.length }}</v-chip>
              </v-tab>
              <v-tab value="enviadas">
                <v-icon start>mdi-send</v-icon>
                Enviadas
                <v-chip v-if="solicitacoesEnviadas.length > 0" class="ml-2" size="small" color="orange">{{ solicitacoesEnviadas.length }}</v-chip>
              </v-tab>
              <v-tab value="conexoes">
                <v-icon start>mdi-account-check</v-icon>
                Minhas Conexões
                <v-chip v-if="totalConexoes > 0" class="ml-2" size="small" color="green">{{ totalConexoes }}</v-chip>
              </v-tab>
            </v-tabs>

            <v-window v-model="activeTab">
              <!-- Tab Pendentes -->
              <v-window-item value="pendentes">
                <div class="pa-4">
                  <div v-if="loadingPendentes">
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
                      v-for="solicitacao in solicitacoesPendentes"
                      :key="solicitacao.id"
                      class="conexao-card mb-4"
                      elevation="2"
                      rounded="xl"
                    >
                      <v-card-text class="pa-6">
                        <v-row align="center">
                          <v-col cols="12" sm="auto" class="text-center text-sm-left">
                            <v-badge
                              color="blue"
                              dot
                              location="bottom right"
                              offset-x="8"
                              offset-y="8"
                            >
                              <v-avatar size="90" class="avatar-shadow">
                                <v-img v-if="solicitacao.solicitante?.usuario?.avatarUrl" :src="solicitacao.solicitante.usuario.avatarUrl" cover></v-img>
                                <v-icon v-else size="45" color="grey-darken-1">mdi-account</v-icon>
                              </v-avatar>
                            </v-badge>
                          </v-col>

                          <v-col cols="12" sm="" class="text-center text-sm-left">
                            <div class="d-flex align-center justify-center justify-sm-start mb-2">
                              <h3 class="text-h6 font-weight-bold mr-2">{{ solicitacao.solicitante?.usuario?.nome || 'Usuário' }}</h3>
                              <v-chip
                                color="blue"
                                size="small"
                                variant="flat"
                              >
                                {{ solicitacao.solicitante?.tipo || 'Profissional' }}
                              </v-chip>
                            </div>
                            <div class="text-caption text-grey">
                              <v-icon size="16" class="mr-1">mdi-clock-outline</v-icon>
                              {{ formatarDataLocal(solicitacao.createdAt) }}
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
                                @click="openAceitarModal(solicitacao)"
                                :loading="loadingAction === solicitacao.id"
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
                                @click="openRecusarModal(solicitacao)"
                                :loading="loadingAction === solicitacao.id"
                              >
                                <v-icon start>mdi-close-circle</v-icon>
                                Recusar
                              </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <div v-if="solicitacoesPendentes.length === 0" class="empty-state">
                      <v-card class="pa-12 text-center" rounded="xl" elevation="0" color="grey-lighten-5">
                        <v-icon size="120" color="grey-lighten-1" class="mb-6">mdi-clock-check</v-icon>
                        <h3 class="text-h5 font-weight-bold mb-3">Nenhuma solicitação pendente</h3>
                        <p class="text-body-1 text-grey-darken-1">Você não possui solicitações de conexão no momento.</p>
                      </v-card>
                    </div>
                  </div>
                </div>
              </v-window-item>

              <!-- Tab Enviadas -->
              <v-window-item value="enviadas">
                <div class="pa-4">
                  <div v-if="loadingSolicitacoesEnviadas">
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
                      v-for="solicitacao in solicitacoesEnviadas"
                      :key="solicitacao.id"
                      class="conexao-card mb-4"
                      elevation="2"
                      rounded="xl"
                    >
                      <v-card-text class="pa-6">
                        <v-row align="center">
                          <v-col cols="12" sm="auto" class="text-center text-sm-left">
                            <v-badge
                              color="orange"
                              dot
                              location="bottom right"
                              offset-x="8"
                              offset-y="8"
                            >
                              <v-avatar size="90" class="avatar-shadow">
                                <v-img v-if="solicitacao.destinatario?.usuario?.avatarUrl" :src="solicitacao.destinatario.usuario.avatarUrl" cover></v-img>
                                <v-icon v-else size="45" color="grey-darken-1">mdi-account</v-icon>
                              </v-avatar>
                            </v-badge>
                          </v-col>

                          <v-col cols="12" sm="" class="text-center text-sm-left">
                            <div class="d-flex align-center justify-center justify-sm-start mb-2">
                              <h3 class="text-h6 font-weight-bold mr-2">{{ solicitacao.destinatario?.usuario?.nome || 'Usuário' }}</h3>
                              <v-chip
                                :color="getStatusColor(solicitacao.status)"
                                size="small"
                                variant="flat"
                              >
                                {{ solicitacao.status }}
                              </v-chip>
                            </div>
                            <div class="text-body-1 text-grey-darken-2 mb-1">
                              {{ solicitacao.destinatario?.tipo || 'Profissional' }}
                            </div>
                            <div class="text-caption text-grey">
                              <v-icon size="16" class="mr-1">mdi-clock-outline</v-icon>
                              Enviada em {{ formatarDataLocal(solicitacao.createdAt) }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <div v-if="solicitacoesEnviadas.length === 0" class="empty-state">
                      <v-card class="pa-12 text-center" rounded="xl" elevation="0" color="grey-lighten-5">
                        <v-icon size="120" color="grey-lighten-1" class="mb-6">mdi-send-outline</v-icon>
                        <h3 class="text-h5 font-weight-bold mb-3">Nenhuma solicitação enviada</h3>
                        <p class="text-body-1 text-grey-darken-1">Você ainda não enviou solicitações de conexão.</p>
                      </v-card>
                    </div>
                  </div>
                </div>
              </v-window-item>

              <!-- Tab Minhas Conexões -->
              <v-window-item value="conexoes">
                <div class="pa-4">
                  <v-row v-if="isAtleta" class="mb-4">
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="filtroTipo"
                        :items="[
                          { title: 'Todos', value: '' },
                          { title: 'Fisioterapeuta', value: 'fisioterapeuta' },
                          { title: 'Treinador', value: 'treinador' }
                        ]"
                        label="Filtrar por tipo"
                        variant="outlined"
                        density="comfortable"
                        @update:model-value="aplicarFiltro"
                      ></v-select>
                    </v-col>
                  </v-row>

                  <div v-if="loadingConexoes">
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
                      v-for="conexao in conexoes"
                      :key="conexao.id"
                      class="conexao-card mb-4"
                      elevation="2"
                      rounded="xl"
                    >
                      <v-card-text class="pa-6">
                        <v-row align="center">
                          <v-col cols="12" sm="auto" class="text-center text-sm-left">
                            <v-badge
                              color="green"
                              dot
                              location="bottom right"
                              offset-x="8"
                              offset-y="8"
                            >
                              <v-avatar size="90" class="avatar-shadow">
                                <v-img v-if="isAtleta && getProfissional(conexao)?.usuario?.avatarUrl" :src="getProfissional(conexao).usuario.avatarUrl" cover></v-img>
                                <v-img v-else-if="!isAtleta && conexao?.solicitante?.usuario?.avatarUrl" :src="conexao.solicitante.usuario.avatarUrl" cover></v-img>
                                <v-icon v-else size="45" color="grey-darken-1">mdi-account</v-icon>
                              </v-avatar>
                            </v-badge>
                          </v-col>

                          <v-col cols="12" sm="" class="text-center text-sm-left">
                            <div class="d-flex align-center justify-center justify-sm-start mb-2">
                              <h3 class="text-h6 font-weight-bold mr-2">
                                {{ isAtleta ? (getProfissional(conexao)?.usuario?.nome || 'Usuário') : (conexao?.solicitante?.usuario?.nome || 'Usuário') }}
                              </h3>
                              <v-chip
                                color="green"
                                size="small"
                                variant="flat"
                              >
                                {{ isAtleta ? (getProfissional(conexao)?.tipo || 'Profissional') : (conexao?.solicitante?.tipo || 'Atleta') }}
                              </v-chip>
                            </div>
                            <div class="text-caption text-grey">
                              <v-icon size="16" class="mr-1">mdi-check-circle</v-icon>
                              Conectado desde {{ formatarDataLocal(conexao.createdAt) }}
                            </div>
                          </v-col>

                          <v-col cols="12" sm="auto" class="text-center d-flex flex-column-reverse ga-2">
                            <v-btn
                              variant="outlined"
                              color="red"
                              size="large"
                              class="px-8"
                              rounded="lg"
                              @click="openDesvincularModal(conexao)"
                              :loading="loadingAction === conexao.id"
                            >
                              <v-icon start>mdi-link-off</v-icon>
                              Desvincular
                            </v-btn>
                            <v-btn
                              variant="outlined"
                              color="blue-lighten-1"
                              size="large"
                              class="px-8"
                              rounded="lg"
                              @click="verPerfil(conexao)"
                            >
                              <v-icon start>mdi-account-outline</v-icon>
                              Perfil
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <div v-if="conexoes.length === 0" class="empty-state">
                      <v-card class="pa-12 text-center" rounded="xl" elevation="0" color="grey-lighten-5">
                        <v-icon size="120" color="grey-lighten-1" class="mb-6">mdi-account-multiple-outline</v-icon>
                        <h3 class="text-h5 font-weight-bold mb-3">Nenhuma conexão ativa</h3>
                        <p class="text-body-1 text-grey-darken-1">Você ainda não possui conexões estabelecidas.</p>
                      </v-card>
                    </div>

                    <div v-if="conexoes.length > 0 && totalConexoes > pageSize" class="d-flex justify-center mt-6">
                      <v-pagination
                        v-model="currentPage"
                        :length="totalPages"
                        @update:model-value="mudarPagina"
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

    <!-- Modal de Confirmação Aceitar -->
    <v-dialog v-model="modalAceitar" max-width="500">
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5 font-weight-bold">
          <v-icon color="green" size="28" class="mr-2">mdi-check-circle</v-icon>
          Aceitar Solicitação
        </v-card-title>
        <v-card-text class="pa-6 pt-0">
          <p class="text-body-1 mb-2">
            Tem certeza que deseja aceitar a solicitação de conexão de <strong>{{ solicitacaoSelecionada?.solicitante?.usuario?.nome }}</strong>?
          </p>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            color="grey"
            size="large"
            @click="modalAceitar = false"
            :disabled="loadingModalAction"
          >
            Cancelar
          </v-btn>
          <v-btn
            variant="flat"
            color="green"
            size="large"
            @click="aceitarSolicitacao"
            :loading="loadingModalAction"
          >
            Aceitar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de Confirmação Recusar -->
    <v-dialog v-model="modalRecusar" max-width="500">
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5 font-weight-bold">
          <v-icon color="red" size="28" class="mr-2">mdi-close-circle</v-icon>
          Recusar Solicitação
        </v-card-title>
        <v-card-text class="pa-6 pt-0">
          <p class="text-body-1 mb-2">
            Tem certeza que deseja recusar a solicitação de conexão de <strong>{{ solicitacaoSelecionada?.solicitante?.usuario?.nome }}</strong>?
          </p>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            color="grey"
            size="large"
            @click="modalRecusar = false"
            :disabled="loadingModalAction"
          >
            Cancelar
          </v-btn>
          <v-btn
            variant="flat"
            color="red"
            size="large"
            @click="recusarSolicitacao"
            :loading="loadingModalAction"
          >
            Recusar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de Confirmação Desvincular -->
    <v-dialog v-model="modalDesvincular" max-width="500">
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5 font-weight-bold">
          <v-icon color="red" size="28" class="mr-2">mdi-alert-circle</v-icon>
          Confirmar Desvinculação
        </v-card-title>
        <v-card-text class="pa-6 pt-0">
          <p class="text-body-1 mb-2">
            Tem certeza que deseja desvincular-se de <strong>{{ isAtleta ? getProfissional(conexaoSelecionada)?.usuario?.nome : conexaoSelecionada?.solicitante?.usuario?.nome }}</strong>?
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
            @click="modalDesvincular = false"
            :disabled="loadingModalAction"
          >
            Cancelar
          </v-btn>
          <v-btn
            variant="flat"
            color="red"
            size="large"
            @click="desvincularConexao"
            :loading="loadingModalAction"
          >
            Desvincular
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import conexoesService from '@/services/solicitacaoConexao/conexao-service'
import { formatarDataLocal } from '@/utils/date.utils'
import { toast } from 'vue3-toastify'
import { getPayload } from '@/utils/auth'

const router = useRouter()

const activeTab = ref('pendentes')
const solicitacoesPendentes = ref<any[]>([])
const solicitacoesEnviadas = ref<any[]>([])
const conexoes = ref<any[]>([])

const payload = getPayload()
const isAtleta = payload?.role === 'atleta'
const atletaId = ref('')

const loadingPendentes = ref(false)
const loadingSolicitacoesEnviadas = ref(false)
const loadingConexoes = ref(false)
const loadingAction = ref<string | null>(null)
const loadingModalAction = ref(false)

const modalAceitar = ref(false)
const modalRecusar = ref(false)
const modalDesvincular = ref(false)

const solicitacaoSelecionada = ref<any>(null)
const conexaoSelecionada = ref<any>(null)
const filtroTipo = ref('')

const currentPage = ref(1)
const pageSize = ref(6)
const totalConexoes = ref(0)

const totalPages = computed(() => Math.ceil(totalConexoes.value / pageSize.value))

const carregarSolicitacoesPendentes = async () => {
  loadingPendentes.value = true
  try {
    const response = await conexoesService.getSolicitacoesConexaoPendentes()
    solicitacoesPendentes.value = response.data || []
  } catch (error) {
    toast.error('Erro ao carregar solicitações pendentes', { autoClose: 3000 })
  } finally {
    loadingPendentes.value = false
  }
}

const carregarSolicitacoesEnviadas = async () => {
  loadingSolicitacoesEnviadas.value = true
  try {
    const response = await conexoesService.getAllSolicitacoesEnviadas()
    solicitacoesEnviadas.value = response.data || []
  } catch (error) {
    toast.error('Erro ao carregar solicitações enviadas', { autoClose: 3000 })
  } finally {
    loadingSolicitacoesEnviadas.value = false
  }
}

const carregarConexoes = async () => {
  loadingConexoes.value = true
  try {
    const response = await conexoesService.getSolicitacoesConexaoPagined(
      currentPage.value,
      pageSize.value,
      'Aceita',
      filtroTipo.value
    )
    conexoes.value = response.data?.itens || response.itens || []
    totalConexoes.value = response.data?.total || response.total || 0
  } catch (error) {
    console.error('Erro ao carregar conexões:', error)
    conexoes.value = []
    totalConexoes.value = 0
  } finally {
    loadingConexoes.value = false
  }
}

const openAceitarModal = (solicitacao: any) => {
  solicitacaoSelecionada.value = solicitacao
  modalAceitar.value = true
}

const openRecusarModal = (solicitacao: any) => {
  solicitacaoSelecionada.value = solicitacao
  modalRecusar.value = true
}

const openDesvincularModal = (conexao: any) => {
  conexaoSelecionada.value = conexao
  modalDesvincular.value = true
}

const aceitarSolicitacao = async () => {
  if (!solicitacaoSelecionada.value) return
  loadingModalAction.value = true
  try {
    await conexoesService.aceitarSolicitacaoConexao({ solicitacaoId: solicitacaoSelecionada.value.id })
    toast.success('Solicitação aceita com sucesso!', { autoClose: 2500 })
    modalAceitar.value = false
    await carregarSolicitacoesPendentes()
    await carregarConexoes()
  } catch (error) {
    toast.error('Erro ao aceitar solicitação', { autoClose: 3000 })
  } finally {
    loadingModalAction.value = false
  }
}

const recusarSolicitacao = async () => {
  if (!solicitacaoSelecionada.value) return
  loadingModalAction.value = true
  try {
    await conexoesService.recusarSolicitacaoConexao({ solicitacaoId: solicitacaoSelecionada.value.id })
    toast.info('Solicitação recusada', { autoClose: 2500 })
    modalRecusar.value = false
    await carregarSolicitacoesPendentes()
  } catch (error) {
    toast.error('Erro ao recusar solicitação', { autoClose: 3000 })
  } finally {
    loadingModalAction.value = false
  }
}

const desvincularConexao = async () => {
  if (!conexaoSelecionada.value) return
  loadingModalAction.value = true
  try {
    await conexoesService.apagarConexao(conexaoSelecionada.value.id)
    toast.success('Conexão desvinculada com sucesso', { autoClose: 2500 })
    modalDesvincular.value = false
    await carregarConexoes()
  } catch (error) {
    toast.error('Erro ao desvincular conexão', { autoClose: 3000 })
  } finally {
    loadingModalAction.value = false
  }
}

const mudarPagina = (page: number) => {
  currentPage.value = page
  carregarConexoes()
}

const aplicarFiltro = () => {
  currentPage.value = 1
  carregarConexoes()
}

const getProfissional = (conexao: any) => {
  if (conexao?.destinatario?.tipo === 'atleta') {
    return conexao?.solicitante
  }
  return conexao?.destinatario
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Pendente': '#f59e0b',
    'Aceita': '#10b981',
    'Rejeitada': '#ef4444'
  }
  return colors[status] || '#94a3b8'
}

const verPerfil = (conexao: any) => {
  const profissional = isAtleta ? getProfissional(conexao) : conexao?.solicitante
  const id = profissional?.id
  const tipo = profissional?.tipo

  if (tipo === 'atleta') {
    router.push({ path: '/detalhesPaciente', query: { id } })
  } else if (tipo === 'treinador') {
    router.push({ path: '/Atleta-Screens/treinadorDetalhes', query: { id } })
  } else if (tipo === 'fisioterapeuta') {
    router.push({ path: '/Atleta-Screens/fisioterapeutaDetalhes', query: { id } })
  }
}

onMounted(() => {
  carregarSolicitacoesPendentes()
  carregarSolicitacoesEnviadas()
  carregarConexoes()
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

.ga-3 {
  gap: 12px;
}

.gap-3 {
  gap: 12px;
}

.btn-top-right {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  border-color: rgba(255, 255, 255, 0.6);
  color: white;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
}

.btn-top-right:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
