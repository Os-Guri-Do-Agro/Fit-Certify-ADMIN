<template>
  <v-app-bar :elevation="0" class="app-bar" height="80">
    <template v-slot:prepend>
      <div class="d-flex align-center">
        <v-btn icon variant="flat" @click="layoutStore.toggleRail()" class="menu-btn ml-3 mr-4">
          <v-icon size="22px">mdi-menu</v-icon>
        </v-btn>
        <div class="page-header">
          <div class="icon-wrapper">
            <v-icon size="20px">{{ pageIcon }}</v-icon>
          </div>
          <span class="page-title">{{ pageTitle }}</span>
        </div>
      </div>
    </template>

    <template v-slot:append>
      <v-menu offset-y transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn icon variant="flat" v-bind="props" class="action-btn mr-2">
            <img
              :src="currentLocale === 'pt' ? 'https://flagcdn.com/w40/br.png' : 'https://flagcdn.com/w40/gb.png'"
              :alt="currentLocale === 'pt' ? 'Português' : 'English'"
              class="flag-img"
            />
          </v-btn>
        </template>
        <v-list class="profile-menu" elevation="8">
          <v-list-item @click="changeLocale('pt')" class="menu-item">
            <template v-slot:prepend>
              <img src="https://flagcdn.com/w40/br.png" alt="Brasil" class="flag-img-menu mr-2" />
            </template>
            <v-list-item-title>Português</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeLocale('en')" class="menu-item">
            <template v-slot:prepend>
              <img src="https://flagcdn.com/w40/gb.png" alt="England" class="flag-img-menu mr-2" />
            </template>
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn @click="router.push('/notificacoes')" icon variant="flat" class="action-btn mr-2">
        <v-badge :model-value="notificacoesNaoLidas > 0" :content="notificacoesNaoLidas" color="#FF6B6B" offset-x="-2" offset-y="2">
          <v-icon size="20px">mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>

      <v-btn @click="dialogPerfil = true" icon variant="flat" class="action-btn mr-3">
        <v-icon size="20px">mdi-account-convert</v-icon>
      </v-btn>

      <v-menu offset-y transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn variant="flat" v-bind="props" class="profile-btn mr-3" :class="{ 'profile-loading': loading }">
            <v-avatar size="38" class="profile-avatar">
              <v-img :src="atleta?.avatarUrl || medico?.avatarUrl || fisioterapeuta?.avatarUrl || treinador?.avatarUrl"></v-img>
            </v-avatar>
            <div class="profile-info">
              <span class="profile-name">{{ nomeUsuario }}</span>
              <span class="profile-role" v-if="!loading && payload?.role">{{ t(`appBar.role.${payload?.role}`) }}</span>
            </div>
            <v-icon size="16" class="ml-1">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list class="profile-menu" elevation="8">
          <v-list-item @click="router.push(getProfileRoute())" class="menu-item">
            <template v-slot:prepend>
              <v-icon size="20">mdi-account-circle</v-icon>
            </template>
            <v-list-item-title>{{ t('appBar.actions.profile')  }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="router.push('/settings')" class="menu-item">
            <template v-slot:prepend>
              <v-icon size="20">mdi-cog</v-icon>
            </template>
            <v-list-item-title>{{ t('appBar.actions.settings')  }}</v-list-item-title>
          </v-list-item>
          <v-divider class="my-1"></v-divider>
          <v-list-item @click="sair" class="menu-item logout-item">
            <template v-slot:prepend>
              <v-icon size="20" color="#FF6B6B">mdi-logout</v-icon>
            </template>
            <v-list-item-title>{{ t('appBar.actions.logout')  }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>

  <TrocarPerfilDialog v-model="dialogPerfil" />
</template>

<script setup lang="ts">
import { getProfileRoute } from '@/utils/profile';
import { useLayoutStore } from '@/stores/layout';
import { getPayload, getToken, logout } from '@/utils/auth';
import { onMounted, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import atletaService from '@/services/atleta/atleta-service';
import medicoService from '@/services/medico/medico-service';
import fisioterapeutaService from '@/services/fisioterapeutas/fisioterapeuta-service';
import treinadorService from '@/services/treinador/treinador-service';
import formularioMedicoService from '@/services/formulario-medico/formurarioMedico-service';
import notificacoesService from '@/services/notificacoes/notificacoes-service';
import userService from '@/services/user/user-service';
import { getAtletaId } from '@/utils/auth';
import { getMedicoId } from '@/utils/auth';
import { getFisioterapeutaId } from '@/utils/auth';
import { getTreinadorId } from '@/utils/auth';
import { isAtleta } from '@/utils/auth';
import { getUserLanguage } from '@/utils/auth';
import TrocarPerfilDialog from '@/components/TrocarPerfilDialog.vue';
import { toast } from 'vue3-toastify';
import { eventBus } from '@/utils/eventBus';
import { onBeforeUnmount } from 'vue';

const layoutStore = useLayoutStore()
const payload = ref<any>()
const router = useRouter()
const route = useRoute()
const { locale, t } = useI18n()
const currentLocale = ref(locale.value)
const atleta = ref<any>()
const medico = ref<any>()
const fisioterapeuta = ref<any>()
const treinador = ref<any>()
const loading = ref(true)
const dialogPerfil = ref(false)
const temFormularioPendente = ref(false)
const notificacoesNaoLidas = ref(0)

const nomeUsuario = computed(() => {
  const nomeCompleto = atleta.value?.usuario?.nome || medico.value?.usuario?.nome || fisioterapeuta.value?.usuario?.nome || treinador.value?.usuario?.nome
  if (!nomeCompleto) return ''
  const partes = nomeCompleto.trim().split(' ')
  return partes.slice(0, 2).join(' ')
})

const enviarIdioma = async () => {
  try {
    await userService.mudarIdioma(locale.value)
  } catch (e) {
    console.error(e)
  }
}

const changeLocale = (lang: string) => {
  locale.value = lang
  currentLocale.value = lang
  enviarIdioma()
  localStorage.setItem('locale', lang)
}

const pageTitle = computed(() => {
  const path = route.path

  // Rota raiz baseada na role
  if (path === '/') {
    const role = payload.value?.role
    if (role === 'atleta') return t('appBar.titleEvents')
    if (role === 'medico') return t('appBar.titleCalendar')
    if (role === 'fisioterapeuta') return t('appBar.titleCalendar')
    if (role === 'treinador') return t('appBar.titleExerciseLibrary')
  }

  // Rotas dinâmicas
  if (path.startsWith('/Atleta-Screens/eventos/')) return 'Detalhes do Evento'

  const routeMap: Record<string, string> = {
    '/Atleta-Screens/eventos': t('appBar.titleEvents'),
  '/Atleta-Screens/consultas': t('appBar.titleConsultas'),
  '/Atleta-Screens/registrosMedicos': t('appBar.titleRegistersDocs'),
  '/Atleta-Screens/medicos': t('appBar.titleSearchDoctor'),
  '/Atleta-Screens/meusMedicos': t('appBar.titleMyDoctors'),
  '/Atleta-Screens/perfilAtleta': t('appBar.titleProfile'),
  '/Atleta-Screens/editarPerfilAtleta': t('appBar.titleEditProfile'),
  '/Atleta-Screens/medicoDetalhes': t('appBar.titleDoctorDetails'),
  '/Atleta-Screens/fisioterapeutaDetalhes': t('appBar.titlePhysioDetails'),
  '/Atleta-Screens/treinadorDetalhes': t('appBar.titleCoachDetails'),
  '/Atleta-Screens/meuPlano': t('appBar.titleMyPlan'),
  '/Atleta-Screens/visaoGeral': t('appBar.titleOverview'),
  '/Atleta-Screens/treinosAtleta': t('appBar.titleMyTrainings'),
  '/Atleta-Screens/formularios': t('appBar.titleForms'),

  '/Medico-Screens/agendaMedica': t('appBar.titleCalendar'),
  '/Medico-Screens/consultas': t('appBar.titleConsultas'),
  '/Medico-Screens/consultasPendentes': t('appBar.titlePendingConsultations'),
  '/Medico-Screens/pacientes': t('appBar.titlePatientList'),
  '/Medico-Screens/pacientesAtendidos': t('appBar.titleRecentPatients'),
  '/Medico-Screens/detalhesPaciente': t('appBar.titlePatientDetails'),
  '/Medico-Screens/perfilMedico': t('appBar.titleProfile'),
  '/Medico-Screens/editarPerfilMedico': t('appBar.titleEditProfile'),
  '/Medico-Screens/perfil-publico': t('appBar.titlePublicProfile'),
  '/Medico-Screens/editarPerfilPublico': t('appBar.titleEditPublicProfile'),
  '/cadastrar-medico': t('appBar.titleRegisterDoctor'),
  '/Atleta-Screens/documentos': t('appBar.titleDocuments'),

  '/Fisioterapeuta-Screens/agendaFisioterapeutica': t('appBar.titleCalendar'),
  '/Fisioterapeuta-Screens/consultas': t('appBar.titleConsultas'),
  '/Fisioterapeuta-Screens/consultasPendentes': t('appBar.titlePendingConsultations'),
  '/Fisioterapeuta-Screens/perfilFisioterapeuta': t('appBar.titleProfile'),
  '/Fisioterapeuta-Screens/editarPerfilFisioterapeuta': t('appBar.titleEditProfile'),
  '/Fisioterapeuta-Screens/perfil-publico': t('appBar.titlePublicProfile'),
  '/Fisioterapeuta-Screens/editarPerfilPublico': t('appBar.titleEditPublicProfile'),
  '/cadastrar-fisioterapeuta':  t('appBar.titleRegisterPhysio'),
  '/treinosCriados': t('appBar.titleTreinosCriados'),

  '/Treinador-Screens/detalhesAtleta': t('appBar.titleAthleteDetails'),
  '/Treinador-Screens/editarPerfilTreinador': t('appBar.titleEditProfile'),
  '/cadastrar-treinador': t('appBar.titleRegisterCoach'),

  '/solicitacoesConexoes': t('appBar.titleConnections'),
  '/certificados': t('appBar.titleCertificates'),
  '/notificacoes': t('appBar.titleNotifications'),
  '/exercicios': t('appBar.titleExerciseLibrary'),
  '/settings': t('appBar.titleSettings'),
  '/resumo': t('appBar.titleSummary'),
  '/adicionarConsulta': t('appBar.titleAddConsultation'),
  '/analises': t('appBar.titleAnalytics'),
  '/artigos': t('appBar.titleArticles'),
  '/criarTreino': t('appBar.titleCreateTraining'),
  '/cupons': t('appBar.titleCoupons'),
  '/detalhesAtleta': t('appBar.titleAthleteDetails'),
  '/detalhesPaciente': t('appBar.titlePatientDetails'),
  '/gerenciarCodigos': t('appBar.titleManageCodes'),
  '/novaSenhaLogado': t('appBar.titleChangePassword'),
  '/users': t('appBar.titleUsers'),
  '/validarCertificado': t('appBar.titleValidateCertificate'),
  '/centralAjuda': t('appBar.titleHelpCenter'),
  '/registerPlanos': t('appBar.titlePlans'),

  '/cadastrar-atleta': t('appBar.titleRegisterAthlete'),
  '/cadastar-medico': t('appBar.titleRegisterDoctor'),
  '/cadastar-fisioterapeuta': t('appBar.titleRegisterPhysio'),
  '/cadastar-treinador': t('appBar.titleRegisterCoach'),
  '/cadastar-administrador': t('appBar.titleRegisterAdmin'),

  '/settings/deleteAccount': t('appBar.titleDeleteAccount'),
  '/consultasExternas': t('appBar.titleExternalConsultations'),
  '/pacientesExternos': t('appBar.titleExternalPatients'),
  }
  return routeMap[path] || ''
})

const pageIcon = computed(() => {
  const path = route.path

  // Rota raiz baseada na role
  if (path === '/') {
    const role = payload.value?.role
    if (role === 'atleta') return 'mdi-calendar-star'
    if (role === 'medico') return 'mdi-calendar-month-outline'
    if (role === 'fisioterapeuta') return 'mdi-calendar-month-outline'
    if (role === 'treinador') return 'mdi-human-handsup'
  }

  // Rotas dinâmicas
  if (path.startsWith('/Atleta-Screens/eventos/')) return 'mdi-calendar-check'

  const iconMap: Record<string, string> = {
    '/Atleta-Screens/eventos': 'mdi-calendar-star',
    '/Atleta-Screens/consultas': 'mdi-calendar',
    '/Atleta-Screens/registrosMedicos': 'mdi-chart-bar',
    '/Atleta-Screens/medicos': 'mdi-magnify',
    '/Atleta-Screens/meusMedicos': 'mdi-bookmark-outline',
    '/Atleta-Screens/perfilAtleta': 'mdi-account-circle',
    '/Atleta-Screens/editarPerfilAtleta': 'mdi-account-edit',
    '/Atleta-Screens/medicoDetalhes': 'mdi-doctor',
    '/Atleta-Screens/fisioterapeutaDetalhes': 'mdi-account-heart',
    '/Atleta-Screens/treinadorDetalhes': 'mdi-whistle',
    '/Atleta-Screens/meuPlano': 'mdi-credit-card-outline',
    '/Atleta-Screens/visaoGeral': 'mdi-view-dashboard',
    '/Atleta-Screens/treinosAtleta': 'mdi-dumbbell',
    '/Medico-Screens/agendaMedica': 'mdi-calendar-month-outline',
    '/Medico-Screens/consultas': 'mdi-clipboard-list-outline',
    '/Medico-Screens/consultasPendentes': 'mdi-calendar-month-outline',
    '/Medico-Screens/pacientes': 'mdi-clipboard-text-search-outline',
    '/Medico-Screens/pacientesAtendidos': 'mdi-account-group-outline',
    '/Medico-Screens/detalhesPaciente': 'mdi-account-details',
    '/Medico-Screens/perfilMedico': 'mdi-account-circle',
    '/Medico-Screens/editarPerfilMedico': 'mdi-account-edit',
    '/Medico-Screens/perfil-publico': 'mdi-account-box',
    '/Medico-Screens/editarPerfilPublico': 'mdi-account-edit-outline',
    '/Fisioterapeuta-Screens/agendaFisioterapeutica': 'mdi-calendar-month-outline',
    '/Fisioterapeuta-Screens/consultas': 'mdi-clipboard-list-outline',
    '/Fisioterapeuta-Screens/consultasPendentes': 'mdi-calendar-month-outline',
    '/Fisioterapeuta-Screens/perfilFisioterapeuta': 'mdi-account-circle',
    '/Fisioterapeuta-Screens/editarPerfilFisioterapeuta': 'mdi-account-edit',
    '/Fisioterapeuta-Screens/perfil-publico': 'mdi-account-box',
    '/Fisioterapeuta-Screens/editarPerfilPublico': 'mdi-account-edit-outline',
    '/Treinador-Screens/detalhesAtleta': 'mdi-account-details',
    '/Treinador-Screens/editarPerfilTreinador': 'mdi-account-edit',
    '/solicitacoesConexoes': 'mdi-link',
    '/certificados': 'mdi-file-document-outline',
    '/notificacoes': 'mdi-bell-outline',
    '/exercicios': 'mdi-human-handsup',
    '/settings': 'mdi-cog',
    '/resumo': 'mdi-compass-outline',
    '/adicionarConsulta': 'mdi-calendar-plus',
    '/analises': 'mdi-chart-line',
    '/artigos': 'mdi-newspaper',
    '/criarTreino': 'mdi-dumbbell',
    '/cupons': 'mdi-ticket-percent',
    '/detalhesAtleta': 'mdi-account-details',
    '/detalhesPaciente': 'mdi-account-details',
    '/gerenciarCodigos': 'mdi-qrcode',
    '/novaSenhaLogado': 'mdi-lock-reset',
    '/users': 'mdi-account-multiple',
    '/validarCertificado': 'mdi-certificate',
    '/centralAjuda': 'mdi-help-circle',
    '/registerPlanos': 'mdi-package-variant',
    '/cadastrar-atleta': 'mdi-account-plus',
    '/cadastrar-medico': 'mdi-doctor',
    '/cadastrar-fisioterapeuta': 'mdi-account-heart',
    '/cadastrar-treinador': 'mdi-whistle',
    '/treinosCriados': 'mdi-dumbbell',
    '/settings/deleteAccount': 'mdi-account-remove',
    "/consultasExternas": "mdi-clipboard-list-outline",
    "/pacientesExternos": "mdi-account-group-outline",
    "/Atleta-Screens/formularios": "mdi-form-select",
    '/Atleta-Screens/documentos': "mdi-file-document-multiple"
  }
  return iconMap[path] || 'mdi-view-dashboard'
})

const buscarAtletaById = async (id: string) => {
  if (!getToken()) return
  try {
    const response = await atletaService.getAtletaById(id)
    atleta.value = response.data
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}

const buscarMedicoById = async (id: string) => {
  if (!getToken()) return
  try {
    const response = await medicoService.getMedicoById(id)
    medico.value = response.data
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}

const buscarFisioterapeutaById = async (id: string) => {
  if (!getToken()) return
  try {
    const response = await fisioterapeutaService.getFisioterapeutaById(id)
    fisioterapeuta.value = response.data
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}

const buscarTreinadorById = async (id: string) => {
  if (!getToken()) return
  try {
    const response = await treinadorService.getTreinadorById(id)
    treinador.value = response.data
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}

const verificarFormulariosPendentes = async () => {
  if (!getToken() || !isAtleta()) return

  try {
    const response = await formularioMedicoService.buscarFormularios()
    const formularios = response.data || response
    const pendente = formularios.some((f: any) => !f.jaRespondeu)

    if (pendente) {
      temFormularioPendente.value = true
    }
  } catch (error) {
    console.error('Erro ao verificar formulários:', error)
  }
}

const buscarNotificacoesNaoLidas = async () => {
  if (!getToken()) return

  try {
    const response = await notificacoesService.buscarNotificacoes(1, 100)
    const notificacoes = response.data?.itens || []
    const naoLidas = notificacoes.filter((n: any) => !n.lida).length
    const formsPendentes = isAtleta() ? (temFormularioPendente.value ? 1 : 0) : 0
    notificacoesNaoLidas.value = naoLidas + formsPendentes
  } catch (error) {
    console.error('Erro ao buscar notificações:', error)
  }
}

onMounted(async () => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    locale.value = savedLocale
    currentLocale.value = savedLocale
  }

  if (!getToken()) return

  if (getAtletaId()) {
    await buscarAtletaById(getAtletaId())
    payload.value = getPayload()
    await verificarFormulariosPendentes()
    await buscarNotificacoesNaoLidas()
  } else if (getMedicoId()) {
    await buscarMedicoById(getMedicoId())
    payload.value = getPayload()
    await buscarNotificacoesNaoLidas()
  } else if (getFisioterapeutaId()) {
    await buscarFisioterapeutaById(getFisioterapeutaId())
    payload.value = getPayload()
    await buscarNotificacoesNaoLidas()
  } else if (getTreinadorId()) {
    await buscarTreinadorById(getTreinadorId())
    payload.value = getPayload()
    await buscarNotificacoesNaoLidas()
  }

  eventBus.on('notificacao-lida', buscarNotificacoesNaoLidas)

  if (locale.value !== getUserLanguage()) {
    enviarIdioma()
  }
})

onBeforeUnmount(() => {
  eventBus.off('notificacao-lida', buscarNotificacoesNaoLidas)
})

function sair() {
  logout()
}

const perfis: any = {
  'medico': t('appBar.role.medico'),
  'atleta': t('appBar.role.atleta'),
  'fisioterapeuta': t('appBar.role.fisioterapeuta'),
  'treinador': t('appBar.role.treinador'),
  'admin': 'ADMINISTRADOR'
}

</script>

<style scoped>
.app-bar {
  background: white !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(66, 165, 245, 0.08);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03) !important;
}

.menu-btn {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  color: white;
  border-radius: 12px;
  width: 46px;
  height: 46px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(66, 165, 245, 0.4);
}

.page-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
  border-radius: 10px;
  color: #1E88E5;
}

.page-title {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1E88E5 0%, #42A5F5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.action-btn {
  background: #F5F8FA;
  color: #546E7A;
  border-radius: 20px;
  width: 46px;
  height: 46px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-btn:hover {
  background: #E3F2FD;
  color: #1E88E5;
  transform: translateY(-2px);
}

.profile-btn {
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  border: 1.5px solid rgba(66, 165, 245, 0.15);
  border-radius: 16px;
  height: 56px !important;
  padding: 6px 14px 6px 6px !important;
  text-transform: none !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.profile-btn:hover {
  border-color: rgba(66, 165, 245, 0.4);
  box-shadow: 0 4px 16px rgba(66, 165, 245, 0.15);
  transform: translateY(-1px);
}

.profile-btn :deep(.v-btn__content) {
  justify-content: flex-start;
  gap: 10px;
}

.profile-avatar {
  border: 2px solid #E3F2FD;
  box-shadow: 0 2px 8px rgba(66, 165, 245, 0.2);
}

.profile-btn :deep(.v-avatar) {
  width: 42px !important;
  height: 42px !important;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.profile-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #263238;
  line-height: 1.2;
}

.profile-role {
  font-size: 0.7rem;
  font-weight: 500;
  color: #78909C;
  letter-spacing: 0.5px;
}

.profile-menu {
  border-radius: 12px;
  margin-top: 8px;
  overflow: hidden;
  border: 1px solid rgba(66, 165, 245, 0.1);
}

.menu-item {
  transition: all 0.2s ease;
  min-height: 48px;
}

.menu-item:hover {
  background: linear-gradient(90deg, #E3F2FD 0%, #f8fbff 100%);
}

.logout-item:hover {
  background: linear-gradient(90deg, #FFEBEE 0%, #fff5f5 100%);
}

.profile-loading {
  position: relative;
  overflow: hidden;
}

.profile-loading::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(66, 165, 245, 0.1), transparent);
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { left: -100%; }
  100% { left: 100%; }
}

.language-select {
  width: 80px;
  min-width: 80px;
}

.language-select :deep(.v-field) {
  background: #F5F8FA;
  border-radius: 12px;
  border: 1.5px solid rgba(66, 165, 245, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.language-select :deep(.v-field:hover) {
  background: #E3F2FD;
  border-color: rgba(66, 165, 245, 0.4);
  transform: translateY(-1px);
}

.language-select :deep(.v-field--focused) {
  border-color: #42A5F5;
  box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.1);
}

.flag-icon {
  font-size: 22px;
  line-height: 1;
}

.flag-img {
  width: 24px;
  height: 18px;
  border-radius: 4px;
  object-fit: cover;
}

.flag-img-menu {
  width: 28px;
  height: 21px;
  border-radius: 4px;
  object-fit: cover;
}
</style>
