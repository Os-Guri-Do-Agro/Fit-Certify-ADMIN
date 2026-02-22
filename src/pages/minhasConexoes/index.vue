<template>
  <v-container class="pa-0 w-100" fluid>
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <v-container class="position-relative w-100">
        <v-btn color="white" variant="outlined" rounded="xl" prepend-icon="mdi-qrcode" @click="router.push('/gerenciarCodigos')" class="btn-top-right">
          {{ $t('solicitacoesConexoes.manageCodesButton') }}
        </v-btn>
        <v-row align="center" class="min-height-150">
          <v-col cols="12" class="text-center">
            <div class="d-flex align-center justify-center ga-5 mb-5">
              <div class="header-icon-wrapper-hero">
                <v-icon color="white" size="60">mdi-account-check</v-icon>
              </div>
              <div class="d-flex align-center justify-center">
                <h1 class="hero-title">{{ $t('minhasConexoes.title') }}</h1>
              </div>
            </div>
            <p class="hero-subtitle">{{ $t('minhasConexoes.subtitle') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-container class="content-section">
      <v-row justify="center">
        <v-col cols="12">
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
                    <v-badge color="green" dot location="bottom right" offset-x="8" offset-y="8">
                      <v-avatar size="90" class="avatar-shadow">
                        <v-img v-if="isAtleta && getProfissional(conexao)?.avatarUrl" :src="getProfissional(conexao).avatarUrl" cover></v-img>
                        <v-img v-else-if="!isAtleta && conexao?.solicitante?.avatarUrl" :src="conexao.solicitante.avatarUrl" cover></v-img>
                        <v-icon v-else size="45" color="grey-darken-1">mdi-account</v-icon>
                      </v-avatar>
                    </v-badge>
                  </v-col>

                  <v-col cols="12" sm="" class="text-center text-sm-left">
                    <div class="d-flex align-center justify-center justify-sm-start mb-2">
                      <h3 class="text-h6 font-weight-bold mr-2">
                        {{ isAtleta ? (getProfissional(conexao)?.usuario?.nome || $t('solicitacoesConexoes.user')) : (conexao?.solicitante?.usuario?.nome || $t('solicitacoesConexoes.user')) }}
                      </h3>
                      <v-chip color="green" size="small" variant="flat">
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
        </v-col>
      </v-row>
    </v-container>

    <!-- Modal Desvincular -->
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
          <p class="text-body-2 text-grey-darken-1">{{ $t('solicitacoesConexoes.modals.unlink.warning') }}</p>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn variant="text" color="grey" size="large" @click="modalDesvincular = false" :disabled="loadingModalAction">
            {{ $t('solicitacoesConexoes.modals.unlink.cancel') }}
          </v-btn>
          <v-btn variant="flat" color="red" size="large" @click="desvincularConexao" :loading="loadingModalAction">
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
import { toast } from 'vue3-toastify'
import { getPayload } from '@/utils/auth'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t, locale } = useI18n()

const payload = getPayload()
const isAtleta = payload?.role === 'atleta'

const conexoes = ref<any[]>([])
const loadingConexoes = ref(false)
const loadingAction = ref<string | null>(null)
const loadingModalAction = ref(false)
const modalDesvincular = ref(false)
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
    conexoes.value = []
    totalConexoes.value = 0
  } finally {
    loadingConexoes.value = false
  }
}

const openDesvincularModal = (conexao: any) => {
  conexaoSelecionada.value = conexao
  modalDesvincular.value = true
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
  if (conexao?.destinatario?.tipo === 'atleta') return conexao?.solicitante
  return conexao?.destinatario
}

const verPerfil = (conexao: any) => {
  const profissional = isAtleta ? getProfissional(conexao) : conexao?.solicitante
  const id = profissional?.id
  const tipo = profissional?.tipo
  if (tipo === 'atleta') router.push({ path: '/detalhesPaciente', query: { id } })
  else if (tipo === 'treinador') router.push({ path: '/Atleta-Screens/treinadorDetalhes', query: { id } })
  else if (tipo === 'fisioterapeuta') router.push({ path: '/Atleta-Screens/fisioterapeutaDetalhes', query: { id } })
}

onMounted(() => carregarConexoes())
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
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}
.min-height-150 { min-height: 150px; }
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
.avatar-shadow { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); }
.empty-state { margin-top: 40px; }
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
</style>
