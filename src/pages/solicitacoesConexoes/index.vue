<template>
  <v-container class="pa-0 w-100" fluid>
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <v-container class="position-relative w-100">
        <v-btn color="white" variant="outlined" rounded="xl" prepend-icon="mdi-qrcode" @click="router.push('/gerenciarCodigos')" class="btn-top-right">
          {{ $t('solicitacoesConexoes.manageCodesButton') }}
        </v-btn>
        <v-row align="center" class="min-height-250">
          <v-col cols="12" class="text-center">
            <div class="d-flex align-center justify-center ga-5 mb-5">
            <div class="header-icon-wrapper-hero">
              <v-icon color="white" size="60">mdi-account-multiple-plus</v-icon>
            </div>
            <div class="d-flex align-center justify-center">
              <h1 class="hero-title">{{ $t('solicitacoesConexoes.title') }}</h1>
            </div>

            </div>

            <p class="hero-subtitle">{{ $t('solicitacoesConexoes.subtitle') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-container class="content-section">
      <v-row justify="center">
        <v-col cols="12">
          <v-card rounded="xl" elevation="2">
            <v-tabs v-model="activeTab" bg-color="white" grow class="modern-tabs">
              <v-tab value="pendentes" class="tab-item">
                <v-icon start>mdi-clock-alert</v-icon>
                {{ $t('solicitacoesConexoes.tabs.pending') }}
                <v-chip v-if="solicitacoesPendentes.length > 0" class="ml-2 tab-chip" size="small">{{ solicitacoesPendentes.length }}</v-chip>
              </v-tab>
              <v-tab value="enviadas" class="tab-item">
                <v-icon start>mdi-send</v-icon>
                {{ $t('solicitacoesConexoes.tabs.sent') }}
                <v-chip v-if="solicitacoesEnviadas.length > 0" class="ml-2 tab-chip" size="small">{{ solicitacoesEnviadas.length }}</v-chip>
              </v-tab>
              <v-tab value="conexoes" class="tab-item">
                <v-icon start>mdi-account-check</v-icon>
                {{ $t('solicitacoesConexoes.tabs.myConnections') }}
                <v-chip v-if="totalConexoes > 0" class="ml-2 tab-chip" size="small">{{ totalConexoes }}</v-chip>
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
                              dot
                              location="bottom right"
                              offset-x="8"
                              offset-y="8"
                              class="badge-gradient"
                            >
                              <v-avatar size="90" class="avatar-shadow">
                                <v-img v-if="solicitacao.solicitante?.usuario?.avatarUrl" :src="solicitacao.solicitante.usuario.avatarUrl" cover></v-img>
                                <v-icon v-else size="45" color="grey-darken-1">mdi-account</v-icon>
                              </v-avatar>
                            </v-badge>
                          </v-col>

                          <v-col cols="12" sm="" class="text-center text-sm-left">
                            <div class="d-flex align-center justify-center justify-sm-start mb-2">
                              <h3 class="text-h6 font-weight-bold mr-2">{{ solicitacao.solicitante?.usuario?.nome || $t('solicitacoesConexoes.user') }}</h3>
                              <v-chip
                                size="small"
                                variant="flat"
                                class="chip-gradient"
                              >
                                {{ translateRole(solicitacao.solicitante?.tipo) || $t('solicitacoesConexoes.professional') }}
                              </v-chip>
                            </div>
                            <div class="text-caption text-grey">
                              <v-icon size="16" class="mr-1">mdi-clock-outline</v-icon>
                              {{ formatDate(solicitacao.createdAt) }}
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
                                {{ $t('solicitacoesConexoes.acceptButton') }}
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
                                {{ $t('solicitacoesConexoes.refuseButton') }}
                              </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <div v-if="solicitacoesPendentes.length === 0" class="empty-state">
                      <v-card class="pa-12 text-center" rounded="xl" elevation="0" color="grey-lighten-5">
                        <v-icon size="120" color="grey-lighten-1" class="mb-6">mdi-clock-check</v-icon>
                        <h3 class="text-h5 font-weight-bold mb-3">{{ $t('solicitacoesConexoes.emptyStates.noPending') }}</h3>
                        <p class="text-body-1 text-grey-darken-1">{{ $t('solicitacoesConexoes.emptyStates.noPendingDescription') }}</p>
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
                              <h3 class="text-h6 font-weight-bold mr-2">{{ solicitacao.destinatario?.usuario?.nome || $t('solicitacoesConexoes.user') }}</h3>
                              <v-chip
                                :color="getStatusColor(solicitacao.status)"
                                size="small"
                                variant="flat"
                              >
                                {{ translateStatus(solicitacao.status) }}
                              </v-chip>
                            </div>
                            <div class="text-body-1 text-grey-darken-2 mb-1">
                              {{ translateRole(solicitacao.destinatario?.tipo) || $t('solicitacoesConexoes.professional') }}
                            </div>
                            <div class="text-caption text-grey">
                              <v-icon size="16" class="mr-1">mdi-clock-outline</v-icon>
                              {{ $t('solicitacoesConexoes.sentAt') }} {{ formatDate(solicitacao.createdAt) }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <div v-if="solicitacoesEnviadas.length === 0" class="empty-state">
                      <v-card class="pa-12 text-center" rounded="xl" elevation="0" color="grey-lighten-5">
                        <v-icon size="120" color="grey-lighten-1" class="mb-6">mdi-send-outline</v-icon>
                        <h3 class="text-h5 font-weight-bold mb-3">{{ $t('solicitacoesConexoes.emptyStates.noSent') }}</h3>
                        <p class="text-body-1 text-grey-darken-1">{{ $t('solicitacoesConexoes.emptyStates.noSentDescription') }}</p>
                      </v-card>
                    </div>
                  </div>
                </div>
              </v-window-item>

              <!-- Tab Minhas Conexões -->
              <v-window-item value="conexoes">
                <div class="pa-4">
                  <v-row v-if="isAtleta" class="mb-4 d-flex align-center justify-center">
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="filtroTipo"
                        :items="[
                          { title: $t('solicitacoesConexoes.filterOptions.all'), value: '' },
                          { title: $t('solicitacoesConexoes.filterOptions.physiotherapist'), value: 'fisioterapeuta' },
                          { title: $t('solicitacoesConexoes.filterOptions.coach'), value: 'treinador' }
                        ]"
                        :label="$t('solicitacoesConexoes.filterByType')"
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
                                {{ isAtleta ? (getProfissional(conexao)?.usuario?.nome || $t('solicitacoesConexoes.user')) : (conexao?.solicitante?.usuario?.nome || $t('solicitacoesConexoes.user')) }}
                              </h3>
                              <v-chip
                                color="green"
                                size="small"
                                variant="flat"
                              >
                                {{ isAtleta ? translateRole(getProfissional(conexao)?.tipo) || $t('solicitacoesConexoes.professional') : translateRole(conexao?.solicitante?.tipo) || $t('solicitacoesConexoes.athlete') }}
                              </v-chip>
                            </div>
                            <div class="text-caption text-grey">
                              <v-icon size="16" class="mr-1">mdi-check-circle</v-icon>
                              {{ $t('solicitacoesConexoes.connectedSince') }} {{ formatDate(conexao.createdAt) }}
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
                              {{ $t('solicitacoesConexoes.unlinkButton') }}
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
                              {{ $t('solicitacoesConexoes.profileButton') }}
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <div v-if="conexoes.length === 0" class="empty-state">
                      <v-card class="pa-12 text-center" rounded="xl" elevation="0" color="grey-lighten-5">
                        <v-icon size="120" color="grey-lighten-1" class="mb-6">mdi-account-multiple-outline</v-icon>
                        <h3 class="text-h5 font-weight-bold mb-3">{{ $t('solicitacoesConexoes.emptyStates.noConnections') }}</h3>
                        <p class="text-body-1 text-grey-darken-1">{{ $t('solicitacoesConexoes.emptyStates.noConnectionsDescription') }}</p>
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
          {{ $t('solicitacoesConexoes.modals.accept.title') }}
        </v-card-title>
        <v-card-text class="pa-6 pt-0">
          <p class="text-body-1 mb-2">
            {{ $t('solicitacoesConexoes.modals.accept.message') }} <strong>{{ solicitacaoSelecionada?.solicitante?.usuario?.nome }}</strong>?
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
            {{ $t('solicitacoesConexoes.modals.accept.cancel') }}
          </v-btn>
          <v-btn
            variant="flat"
            color="green"
            size="large"
            @click="aceitarSolicitacao"
            :loading="loadingModalAction"
          >
            {{ $t('solicitacoesConexoes.modals.accept.confirm') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de Confirmação Recusar -->
    <v-dialog v-model="modalRecusar" max-width="500">
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5 font-weight-bold">
          <v-icon color="red" size="28" class="mr-2">mdi-close-circle</v-icon>
          {{ $t('solicitacoesConexoes.modals.refuse.title') }}
        </v-card-title>
        <v-card-text class="pa-6 pt-0">
          <p class="text-body-1 mb-2">
            {{ $t('solicitacoesConexoes.modals.refuse.message') }} <strong>{{ solicitacaoSelecionada?.solicitante?.usuario?.nome }}</strong>?
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
            {{ $t('solicitacoesConexoes.modals.refuse.cancel') }}
          </v-btn>
          <v-btn
            variant="flat"
            color="red"
            size="large"
            @click="recusarSolicitacao"
            :loading="loadingModalAction"
          >
            {{ $t('solicitacoesConexoes.modals.refuse.confirm') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de Confirmação Desvincular -->
    <v-dialog v-model="modalDesvincular" max-width="500">
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5 font-weight-bold">
          <v-icon color="red" size="28" class="mr-2">mdi-alert-circle</v-icon>
          {{ $t('solicitacoesConexoes.modals.unlink.title') }}
        </v-card-title>
        <v-card-text class="pa-6 pt-0">
          <p class="text-body-1 mb-2">
            {{ $t('solicitacoesConexoes.modals.unlink.message') }} <strong>{{ isAtleta ? getProfissional(conexaoSelecionada)?.usuario?.nome : conexaoSelecionada?.solicitante?.usuario?.nome }}</strong>?
          </p>
          <p class="text-body-2 text-grey-darken-1">
            {{ $t('solicitacoesConexoes.modals.unlink.warning') }}
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
            {{ $t('solicitacoesConexoes.modals.unlink.cancel') }}
          </v-btn>
          <v-btn
            variant="flat"
            color="red"
            size="large"
            @click="desvincularConexao"
            :loading="loadingModalAction"
          >
            {{ $t('solicitacoesConexoes.modals.unlink.confirm') }}
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
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t, locale } = useI18n()

const activeTab = ref('pendentes')
const solicitacoesPendentes = ref<any[]>([])
const solicitacoesEnviadas = ref<any[]>([])
const conexoes = ref<any[]>([])

const payload = getPayload()
const isAtleta = payload?.role === 'atleta'

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

const formatDate = (date: string) => {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()

  return locale.value === 'pt' ? `${day}/${month}/${year}` : `${month}/${day}/${year}`
}

const translateRole = (role: string) => {
  const roleMap: Record<string, string> = {
    'atleta': 'appBar.role.atleta',
    'medico': 'appBar.role.medico',
    'fisioterapeuta': 'appBar.role.fisioterapeuta',
    'treinador': 'appBar.role.treinador'
  }
  return t(roleMap[role] || role)
}

const translateStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    'Pendente': 'solicitacoesConexoes.status.Pendente',
    'Aceita': 'solicitacoesConexoes.status.Aceita',
    'Rejeitada': 'solicitacoesConexoes.status.Rejeitada'
  }
  return t(statusMap[status] || status)
}

const carregarSolicitacoesPendentes = async () => {
  loadingPendentes.value = true
  try {
    const response = await conexoesService.getSolicitacoesConexaoPendentes()
    solicitacoesPendentes.value = response.data || []
  } catch (error) {
    toast.error(t('solicitacoesConexoes.toasts.errorLoadPending'), { autoClose: 3000 })
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
    toast.error(t('solicitacoesConexoes.toasts.errorLoadSent'), { autoClose: 3000 })
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
    toast.success(t('solicitacoesConexoes.toasts.successAccept'), { autoClose: 2500 })
    modalAceitar.value = false
    await carregarSolicitacoesPendentes()
    await carregarConexoes()
  } catch (error) {
    toast.error(t('solicitacoesConexoes.toasts.errorAccept'), { autoClose: 3000 })
  } finally {
    loadingModalAction.value = false
  }
}

const recusarSolicitacao = async () => {
  if (!solicitacaoSelecionada.value) return
  loadingModalAction.value = true
  try {
    await conexoesService.recusarSolicitacaoConexao({ solicitacaoId: solicitacaoSelecionada.value.id })
    toast.info(t('solicitacoesConexoes.toasts.infoRefuse'), { autoClose: 2500 })
    modalRecusar.value = false
    await carregarSolicitacoesPendentes()
  } catch (error) {
    toast.error(t('solicitacoesConexoes.toasts.errorRefuse'), { autoClose: 3000 })
  } finally {
    loadingModalAction.value = false
  }
}

const desvincularConexao = async () => {
  if (!conexaoSelecionada.value) return
  loadingModalAction.value = true
  try {
    await conexoesService.apagarConexao(conexaoSelecionada.value.id)
    toast.success(t('solicitacoesConexoes.toasts.successUnlink'), { autoClose: 2500 })
    modalDesvincular.value = false
    await carregarConexoes()
  } catch (error) {
    toast.error(t('solicitacoesConexoes.toasts.errorUnlink'), { autoClose: 3000 })
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
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  position: relative;
  overflow: hidden;
  padding: 48px 24px;
  border-radius: 20px;
  margin-bottom: 32px;
  box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}

.min-height-250 {
  min-height: 250px;
}

.header-icon-wrapper-hero {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.chip-badge {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modern-tabs {
  border-bottom: 2px solid #f0f0f0;
}

.tab-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-item:hover {
  background: rgba(66, 165, 245, 0.05);
}

.v-tab--selected {
  color: #42A5F5 !important;
}

.tab-chip {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  color: white !important;
}

.badge-gradient :deep(.v-badge__badge) {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
}

.chip-gradient {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  color: white !important;
}

.hero-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.2rem;
  margin: 0;
}

.content-section {
  margin-top: 40px;
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
  border-left-color: #42A5F5;
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
