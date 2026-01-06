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
      <v-btn @click="router.push('/notificacoes')" icon variant="flat" class="action-btn mr-2">
        <v-badge dot color="#FF6B6B" offset-x="-2" offset-y="2">
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
              <v-img :src="atleta?.usuario?.avatarUrl || medico?.usuario?.avatarUrl || fisioterapeuta?.usuario?.avatarUrl || treinador?.usuario?.avatarUrl"></v-img>
            </v-avatar>
            <div class="profile-info">
              <span class="profile-name">{{ atleta?.usuario?.nome || medico?.usuario?.nome || fisioterapeuta?.usuario?.nome || treinador?.usuario?.nome }}</span>
              <span class="profile-role">{{ perfis[payload?.role] }}</span>
            </div>
            <v-icon size="16" class="ml-1">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list class="profile-menu" elevation="8">
          <v-list-item @click="router.push(getProfileRoute())" class="menu-item">
            <template v-slot:prepend>
              <v-icon size="20">mdi-account-circle</v-icon>
            </template>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="router.push('/settings')" class="menu-item">
            <template v-slot:prepend>
              <v-icon size="20">mdi-cog</v-icon>
            </template>
            <v-list-item-title>Configurações</v-list-item-title>
          </v-list-item>
          <v-divider class="my-1"></v-divider>
          <v-list-item @click="sair" class="menu-item logout-item">
            <template v-slot:prepend>
              <v-icon size="20" color="#FF6B6B">mdi-logout</v-icon>
            </template>
            <v-list-item-title>Sair</v-list-item-title>
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
import { getPayload, logout } from '@/utils/auth';
import { onMounted, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import atletaService from '@/services/atleta/atleta-service';
import medicoService from '@/services/medico/medico-service';
import fisioterapeutaService from '@/services/fisioterapeutas/fisioterapeuta-service';
import treinadorService from '@/services/treinador/treinador-service';
import { getAtletaId } from '@/utils/auth';
import { getMedicoId } from '@/utils/auth';
import { getFisioterapeutaId } from '@/utils/auth';
import { getTreinadorId } from '@/utils/auth';
import TrocarPerfilDialog from '@/components/TrocarPerfilDialog.vue';
import { ca } from 'vuetify/locale';

const layoutStore = useLayoutStore()
const payload = ref<any>()
const router = useRouter()
const route = useRoute()
const atleta = ref<any>()
const medico = ref<any>()
const fisioterapeuta = ref<any>()
const treinador = ref<any>()
const loading = ref(true)
const dialogPerfil = ref(false)

const pageTitle = computed(() => {
  const path = route.path

  // Rotas dinâmicas
  if (path.startsWith('/Atleta-Screens/eventos/')) return 'Detalhes do Evento'

  const routeMap: Record<string, string> = {
    '/Atleta-Screens/eventos': 'Eventos',
    '/Atleta-Screens/consultas': 'Consultas',
    '/Atleta-Screens/registrosMedicos': 'Registros Médicos',
    '/Atleta-Screens/medicos': 'Buscar Médico',
    '/Atleta-Screens/meusMedicos': 'Meus Médicos',
    '/Atleta-Screens/perfilAtleta': 'Perfil',
    '/Atleta-Screens/editarPerfilAtleta': 'Editar Perfil',
    '/Atleta-Screens/medicoDetalhes': 'Detalhes do Médico',
    '/Atleta-Screens/fisioterapeutaDetalhes': 'Detalhes do Fisioterapeuta',
    '/Atleta-Screens/treinadorDetalhes': 'Detalhes do Treinador',
    '/Atleta-Screens/meuPlano': 'Meu Plano',
    '/Atleta-Screens/visaoGeral': 'Visão Geral',
    '/Medico-Screens/agendaMedica': 'Calendário',
    '/Medico-Screens/consultas': 'Consultas',
    '/Medico-Screens/consultasPendentes': 'Consultas Pendentes',
    '/Medico-Screens/pacientes': 'Lista de Pacientes',
    '/Medico-Screens/pacientesAtendidos': 'Pacientes Recentes',
    '/Medico-Screens/detalhesPaciente': 'Detalhes do Paciente',
    '/Medico-Screens/perfilMedico': 'Perfil',
    '/Medico-Screens/editarPerfilMedico': 'Editar Perfil',
    '/Medico-Screens/perfil-publico': 'Perfil Público',
    '/Medico-Screens/editarPerfilPublico': 'Editar Perfil Público',
    '/Fisioterapeuta-Screens/agendaFisioterapeutica': 'Calendário',
    '/Fisioterapeuta-Screens/consultas': 'Consultas',
    '/Fisioterapeuta-Screens/consultasPendentes': 'Consultas Pendentes',
    '/Fisioterapeuta-Screens/perfilFisioterapeuta': 'Perfil',
    '/Fisioterapeuta-Screens/editarPerfilFisioterapeuta': 'Editar Perfil',
    '/Fisioterapeuta-Screens/perfil-publico': 'Perfil Público',
    '/Fisioterapeuta-Screens/editarPerfilPublico': 'Editar Perfil Público',
    '/Treinador-Screens/detalhesAtleta': 'Detalhes do Atleta',
    '/Treinador-Screens/editarPerfilTreinador': 'Editar Perfil',
    '/solicitacoesConexoes': 'Conexões',
    '/certificados': 'Certificados',
    '/notificacoes': 'Notificações',
    '/exercicios': 'Biblioteca de Exercícios',
    '/settings': 'Configurações',
    '/resumo': 'Resumo',
    '/adicionarConsulta': 'Adicionar Consulta',
    '/analises': 'Análises',
    '/artigos': 'Artigos',
    '/criarTreino': 'Criar Treino',
    '/cupons': 'Cupons',
    '/detalhesAtleta': 'Detalhes do Atleta',
    '/detalhesPaciente': 'Detalhes do Paciente',
    '/gerenciarCodigos': 'Gerenciar Códigos',
    '/novaSenhaLogado': 'Alterar Senha',
    '/users': 'Usuários',
    '/validarCertificado': 'Validar Certificado',
    '/centralAjuda': 'Central de Ajuda',
    '/registerPlanos': 'Planos',
    '/cadastrar-atleta': 'Cadastrar Atleta',
    '/cadastar-medico': 'Cadastrar Médico',
    '/cadastar-fisioterapeuta': 'Cadastrar Fisioterapeuta',
    '/cadastar-treinador': 'Cadastrar Treinador',
    '/cadastar-administrador': 'Cadastrar Administrador',
  }
  return routeMap[path] || 'Dashboard'
})

const pageIcon = computed(() => {
  const path = route.path

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
  }
  return iconMap[path] || 'mdi-view-dashboard'
})

const buscarAtletaById = async (id: string) => {

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
  try {
    const response = await treinadorService.getTreinadorById(id)
    treinador.value = response.data
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}

onMounted(async () => {
  if (getAtletaId()) {
    await buscarAtletaById(getAtletaId())
    payload.value = getPayload()
  } else if (getMedicoId()) {
    await buscarMedicoById(getMedicoId())
    payload.value = getPayload()
  } else if (getFisioterapeutaId()) {
    await buscarFisioterapeutaById(getFisioterapeutaId())
    payload.value = getPayload()
  } else if (getTreinadorId()) {
    await buscarTreinadorById(getTreinadorId())
    payload.value = getPayload()
  } else{
    return
  }
})

function sair() {
  logout()
}

const perfis: any = {
  'medico': 'MÉDICO',
  'atleta': 'ATLETA',
  'fisioterapeuta': 'FISIOTERAPEUTA',
  'treinador': 'TREINADOR',
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
  border-radius: 12px;
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
</style>
