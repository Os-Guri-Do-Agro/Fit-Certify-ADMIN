<template>
  <v-navigation-drawer
    v-model="layoutStore.drawer"
    :rail="layoutStore.rail"
    permanent
    @click="layoutStore.rail && layoutStore.toggleRail()"
    class="clean-drawer position-fixed"
    color="white"
    rail-width="75"
    width="350"
  >
    <!-- Header -->
    <div class="mx-auto">
      <v-avatar
        class="d-flex align-center justify-center icon-drow my-2 ml-2"
        v-if="layoutStore.rail"
        size="60"
      >
        <v-img
          src="/src/assets/logo_pequena.png"
          alt="Logo"
          width="60"
          height="60"
          cover
        />
      </v-avatar>

      <div v-else>
        <div class="d-flex justify-center align-center pa-5">
          <div class="d-flex align-center justify-center">
            <v-img
            class="pa-0 ma-0"
              src="../assets/logo_drawer.png"
              width="240"
              height="100"
              contain
            />
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex align-center justify-center mb-10" v-if="!layoutStore.rail">
      <div class="px-5 pb-3 pt-2 rounded-md d-flex align-center justify-center ga-2 type-profile" v-if="payload?.role === 'treinador'">
        <v-icon icon="mdi-whistle" color="blue-lighten-1" size="15"></v-icon>
        <span class="font-weight-bold text-blue-lighten-1 text-caption">{{ t('drawerNavigator.roles.treinador') }}</span>
      </div>
      <div class="px-5 pb-3 pt-2 rounded-md d-flex align-center justify-center ga-2 type-profile" v-if="payload?.role === 'atleta'">
        <v-icon icon="mdi-run-fast" color="blue-lighten-1" size="20"></v-icon>
        <span class="font-weight-bold text-blue-lighten-1 text-caption">{{ t('drawerNavigator.roles.atleta') }}</span>
      </div>
      <div class="px-5 pb-3 pt-2 rounded-md d-flex align-center justify-center ga-2 type-profile" v-if="payload?.role === 'medico'">
        <v-icon icon="mdi-stethoscope" color="blue-lighten-1" size="20"></v-icon>
        <span class="font-weight-bold text-blue-lighten-1 text-caption">{{ t('drawerNavigator.roles.medico') }}</span>
      </div>
      <div class="px-5 pb-3 pt-2 rounded-md d-flex align-center justify-center ga-2 type-profile" v-if="payload?.role === 'fisioterapeuta'">
        <v-icon icon="mdi-human-handsup" color="blue-lighten-1" size="20"></v-icon>
        <span class="font-weight-bold text-blue-lighten-1 text-caption">{{ t('drawerNavigator.roles.fisioterapeuta') }}</span>
      </div>
    </div>

    <!-- Menu -->
    <div class="px-3 mt-2">
      <v-list v-model:opened="open" class="pa-0">
        <template v-for="item in menuFinal">
          <v-list-group
            v-if="item.children && item.children.length"
            :key="'group-' + item.value"
          >
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                class="mb-1 px-3 py-2"
                rounded="lg"
              >
                <template v-slot:prepend>
                  <v-icon :icon="item.icon" size="20"></v-icon>
                </template>
                <template v-slot:title>
                  <span class="text-body-2">{{ item.title }}</span>
                </template>
              </v-list-item>
            </template>

            <v-list-item
              v-for="child in item.children"
              :key="child.value"
              :to="child.to"
              class="pl-12 mb-1 py-1"
              rounded="lg"
            >
              <template v-slot:prepend>
                <v-icon :icon="child.icon" size="18"></v-icon>
              </template>
              <template v-slot:title>
                <span class="text-body-2">{{ child.title }}</span>
              </template>
            </v-list-item>
          </v-list-group>

          <v-list-item
            v-else
            :key="item.value"
            :to="item.to"
            class="mb-1 px-3 py-2"
            rounded="lg"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon" size="20"></v-icon>
            </template>
            <template v-slot:title>
              <span class="text-body-2">{{ item.title }}</span>
            </template>
          </v-list-item>
        </template>
      </v-list>

      <div class="mt-6" v-if="isMedico() || isFisioterapeuta() || isTreinador()">
        <v-divider class="mb-4"></v-divider>

        <v-list v-model:opened="open" class="pa-0">
          <v-list-group v-if="isMedico()">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                class="mb-1 px-3 py-2"
                rounded="lg"
              >
                <template v-slot:prepend>
                  <v-icon icon="mdi-account-group-outline" size="20"></v-icon>
                </template>
                <template v-slot:title>
                  <span class="text-body-2">{{ t('drawerNavigator.menu.pacientes') }}</span>
                </template>
              </v-list-item>
            </template>
            <v-list-item
              v-for="items in pacienteItems"
              :key="items.value"
              :to="items.to"
              class="pl-12 mb-1 py-1"
              rounded="lg"
            >
              <template v-slot:prepend>
                <v-icon :icon="items.icon" size="18"></v-icon>
              </template>
              <template v-slot:title>
                <span class="text-body-2">{{ items.title }}</span>
              </template>
            </v-list-item>
          </v-list-group>

          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                class="mb-1 px-3 py-2"
                rounded="lg"
              >
                <template v-slot:prepend>
                  <v-icon icon="mdi-bell-outline" size="20"></v-icon>
                </template>
                <template v-slot:title>
                  <span class="text-body-2">{{ t('drawerNavigator.menu.notificacoes') }}</span>
                </template>
              </v-list-item>
            </template>
            <v-list-item
              v-for="items in notificacoesItems"
              :key="items.value"
              :to="items.to"
              class="pl-12 mb-1 py-1"
              rounded="lg"
              @click="onClickMenu(items.title)"
            >
              <template v-slot:prepend>
                <v-icon :icon="items.icon" size="18"></v-icon>
              </template>
              <template v-slot:title>
                <span class="text-body-2">{{ items.title }}</span>
              </template>
            </v-list-item>
          </v-list-group>
        </v-list>
      </div>

      <div class="mt-6">
        <v-divider class="mb-4"></v-divider>

        <v-list v-model:opened="open" class="pa-0">
          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                class="mb-1 px-3 py-2"
                rounded="lg"
              >
                <template v-slot:prepend>
                  <v-icon icon="mdi-account-circle-outline" size="20"></v-icon>
                </template>
                <template v-slot:title>
                  <span class="text-body-2">{{ t('drawerNavigator.account.minhaConta') }}</span>
                </template>
              </v-list-item>
            </template>

            <template v-for="item in contaItems">
              <v-list-group
                v-if="item.children && item.children.length"
                :key="item.value"
              >
                <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    class="pl-12 mb-1 py-1"
                    rounded="lg"
                  >
                    <template v-slot:prepend>
                      <v-icon :icon="item.icon" size="18"></v-icon>
                    </template>
                    <template v-slot:title>
                      <span class="text-body-2">{{ item.title }}</span>
                    </template>
                  </v-list-item>
                </template>
                <v-list-item
                  v-for="child in item.children"
                  :key="child.value"
                  v-show="!child.hideForRoles || !child.hideForRoles.includes(payload?.role)"
                  :to="child.to"
                  class="pl-16 mb-1 py-1"
                  rounded="lg"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="child.icon" size="16"></v-icon>
                  </template>
                  <template v-slot:title>
                    <span class="text-body-2">{{ child.title }}</span>
                  </template>
                </v-list-item>
              </v-list-group>

              <v-list-item
                v-else
                :key="'item-' + item.value"
                :to="item.to"
                class="pl-12 mb-1 py-1"
                rounded="lg"
                @click="onClickMenu(item.title)"
              >
                <template v-slot:prepend>
                  <v-icon :icon="item.icon" size="18"></v-icon>
                </template>
                <template v-slot:title>
                  <span class="text-body-2">{{ item.title }}</span>
                </template>
              </v-list-item>
            </template>
          </v-list-group>
        </v-list>
      </div>
    </div>

    <!-- Footer -->
    <template v-slot:append>
      <div>
        <v-divider
          class="mx-2 mb-3"
          color="#42A5F5"
          opacity="0.3"
        ></v-divider>

        <v-list nav>
          <v-list-item
            v-for="item in footerMenuItem"
            :key="item.value"
            :prepend-icon="item.icon"
            :title="item.title"
            :to="item.to"
            rounded="lg"
            class="mb-1 menu-item"
            :class="{ 'active-menu': $route.path === item.to }"
            @click="onClickMenu(item.title)"
          >
          </v-list-item>
        </v-list>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout'
import { getPayload, isAtleta, isFisioterapeuta, isMedico, isTreinador, logout, getUserID, getAtletaId, getMedicoId, getFisioterapeutaId, getTreinadorId, usuarioAlternativo } from '@/utils/auth'
import { getProfileRoute, getListaConexaoRoute } from '@/utils/profile'
import { computed, onBeforeUnmount, onMounted, ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import userService from '@/services/user/user-service'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const layoutStore = useLayoutStore()
const $route = useRoute()
const open = ref(['Analise'])
const payload = ref<any>()

const notificacoesItems = computed(() => [
  {
    icon: 'mdi mdi-bell-outline',
    title: t('drawerNavigator.menu.notificacaoGeral'),
    value: 'notificacoes',
    to: '/notificacoes'
  }
])
const contaItems = computed(() => {
  const children = [
    ...(!getAtletaId() ? [{
      icon: 'mdi-run',
      title: t('drawerNavigator.account.atleta'),
      value: 'cadastrar-atleta',
      to: '/cadastrar-atleta',
      hideForRoles: ['atleta'],
    }] : []),
    ...(!getMedicoId() ? [{
      icon: 'mdi-stethoscope',
      title: t('drawerNavigator.account.medico'),
      value: 'cadastrar-medico',
      to: '/cadastrar-medico',
      hideForRoles: ['medico'],
    }] : []),
    ...(!getFisioterapeutaId() ? [{
      icon: 'mdi-human-handsup',
      title: t('drawerNavigator.account.fisioterapeuta'),
      value: 'cadastrar-fisioterapeuta',
      to: '/cadastrar-fisioterapeuta',
      hideForRoles: ['fisioterapeuta'],
    }] : []),
    ...(!getTreinadorId() ? [{
      icon: 'mdi-whistle',
      title: t('drawerNavigator.account.treinador'),
      value: 'cadastrar-treinador',
      to: '/cadastrar-treinador',
      hideForRoles: ['treinador'],
    }] : []),
  ]

  return [
    {
      icon: 'mdi-account-circle',
      title: t('drawerNavigator.account.perfil'),
      value: 'dashboard',
      to: getProfileRoute(),
    },
    ...(children.length > 0 && !usuarioAlternativo() ? [{
      icon: 'mdi-account-plus',
      title: t('drawerNavigator.account.novoPerfil'),
      value: 'novo-perfil',
      children,
    }] : []),
    ... (isMedico() && !usuarioAlternativo() ? [{
      icon: 'mdi-account-box-edit-outline',
      title: t('drawerNavigator.account.perfilPuflico'),
      value: 'publicProfile',
      to: '/Medico-Screens/editarPerfilPublico',
    }] : []),
    ... (isMedico() && !usuarioAlternativo() ? [{
      icon: 'mdi-account-child',
      title: t('drawerNavigator.account.emailsAlternativos'),
      value: 'emailsAlternativos',
      to: '/Medico-Screens/emailsAlternativos',
    }] : []),
    ... (usuarioAlternativo() ? [{
      icon: 'mdi-lock-reset',
      title: t('drawerNavigator.account.alterarSenhaEmailAlt'),
      value: 'alterarSenhaEmailAlt',
      to: '/Medico-Screens/AlterarSenhaEmailAlternativo',
    }] : []),

  ]
})

const pacienteItems = computed(() => [
  {
    icon: 'mdi-clipboard-text-search-outline',
    title: t('drawerNavigator.menu.listaPacientes'),
    value: 'lista de pacientes',
    to: '/Medico-Screens/pacientes',
  },
  {
    icon: 'mdi-account-group-outline',
    title: t('drawerNavigator.menu.recentes'),
    value: 'salvos',
    to: '/Medico-Screens/pacientesAtendidos',
  },
  {
    icon: 'mdi-account-group-outline',
    title: t('drawerNavigator.menu.pacientesExternos'),
    value: 'pacientesExternos',
    to: '/pacientesExternos',
  },
])

const footerMenuItem = computed(() => [
  {
    icon: 'mdi-cog',
    title: t('drawerNavigator.footer.configuracoes'),
    value: 'settings',
    to: '/settings',
  },
  { icon: 'mdi-logout', title: t('drawerNavigator.footer.sair'), value: 'exit', to: '/login' },
])

const menusPorPerfil = computed(() => ({
  medico: [
    {
      icon: 'mdi-calendar-blank-multiple',
      title: t('drawerNavigator.menu.consultas'),
      value: '',
      children: [
        {
          icon: 'mdi mdi-calendar-month-outline',
          title: t('drawerNavigator.menu.calendario'),
          value: 'calendario',
          to: '/Medico-Screens/agendaMedica',
        },
        {
          icon: 'mdi mdi-clipboard-list-outline',
          title: t('drawerNavigator.menu.consultas'),
          value: 'consultas',
          to: '/Medico-Screens/consultas',
        },
        {
          icon: 'mdi mdi-clipboard-list-outline',
          title: t('drawerNavigator.menu.externas'),
          value: 'consultasExternas',
          to: '/consultasExternas',
        },
        {
          icon: 'mdi mdi-calendar-month-outline',
          title: t('drawerNavigator.menu.pendentes'),
          value: 'Medico-Screens/consultasPendentes',
          to: '/Medico-Screens/consultasPendentes',
        },
      ],
    },
    {
      icon: 'mdi-email-multiple',
      title: t('appBar.titleConvitesEvento'),
      value: 'convitesEventos',
      to: '/Medico-Screens/convitesEventos',
      children: [],
    },
    {
      icon: 'mdi mdi-compass-outline',
      title: t('drawerNavigator.menu.resumo'),
      value: 'resumo',
      to: '/resumo',
      children: [],
    },

  ],
  atleta: [
    {
      icon: 'mdi mdi-heart-outline',
      title: t('drawerNavigator.menu.saude'),
      value: 'saude',
      to: '/saude',
      children: [
        {
          icon: 'mdi-calendar-star',
          title: t('drawerNavigator.menu.eventos'),
          value: 'eventos',
          to: '/Atleta-Screens/eventos',
        },
        {
          icon: 'mdi-form-select',
          title: t('drawerNavigator.menu.formularios'),
          value: 'formularios',
          to: '/Atleta-Screens/formularios',
        },
        {
          icon: 'mdi-weight-lifter',
          title: 'Treinos',
          value: 'treinos',
          to: '/Atleta-Screens/treinosAtleta',
        },
        {
          icon: 'mdi-chart-bar',
          title: t('drawerNavigator.menu.registrosMedicos'),
          value: 'registrosMedicos',
          to: '/Atleta-Screens/registrosMedicos',
        }
      ],
    },
    {
      icon: 'mdi mdi-calendar',
      title: t('drawerNavigator.menu.consultas'),
      value: 'Consultas',
      to: '/Atleta-Screens/consultas',
      children: [],
    },
    {
          icon: 'mdi-link',
          title: t('drawerNavigator.menu.conexoes'),
          value: 'conexoes',
          to: '/solicitacoesConexoes'
        },
    {
      icon: 'mdi mdi-file-document-outline',
      title: t('drawerNavigator.menu.certificados'),
      value: 'certificados',
      to: '/certificados',
      children: [],
    },
    {
      icon: 'mdi mdi-bell-outline',
      title: t('drawerNavigator.menu.notificacoes'),
      value: 'notificacoes',
      to: '/notificacoes',
    },
    {
      icon: 'mdi-clipboard-pulse-outline',
      title: t('drawerNavigator.menu.medicos'),
      value: 'medicos',
      children: [
        {
          icon: 'mdi-magnify',
          title: t('drawerNavigator.menu.buscarMedico'),
          value: 'buscarMedico',
          to: '/Atleta-Screens/medicos',
        },
        {
          icon: 'mdi-bookmark-outline',
          title: t('drawerNavigator.menu.meusMedicos'),
          value: 'meusMedicos',
          to: '/Atleta-Screens/meusMedicos',
        },
      ],
    },
  ],
  fisioterapeuta: [
    {
      icon: 'mdi-calendar-blank-multiple',
      title: t('drawerNavigator.menu.consultas'),
      value: '',
      children: [
        {
          icon: 'mdi mdi-calendar-month-outline',
          title: t('drawerNavigator.menu.calendario'),
          value: 'calendario',
          to: '/Fisioterapeuta-Screens/agendaFisioterapeutica',
        },
        {
          icon: 'mdi mdi-clipboard-list-outline',
          title: t('drawerNavigator.menu.consultas'),
          value: 'consultas',
          to: '/Fisioterapeuta-Screens/consultas',
        },
        {
          icon: 'mdi mdi-clipboard-list-outline',
          title: t('drawerNavigator.menu.externas'),
          value: 'consultasExternas',
          to: '/consultasExternas',
        },
        {
          icon: 'mdi mdi-calendar-month-outline',
          title: t('drawerNavigator.menu.pendentes'),
          value: 'Fisioterapeuta-Screens/consultasPendentes',
          to: '/Fisioterapeuta-Screens/consultasPendentes',
        },
      ],
    },
    {
      icon: 'mdi-link',
      title: t('drawerNavigator.menu.conexoes'),
      value: 'conexoes',
      to: '/solicitacoesConexoes'
    },
    {
      icon: 'mdi mdi-compass-outline',
      title: t('drawerNavigator.menu.resumo'),
      value: 'resumo',
      to: '/resumo',
      children: [],
    },
    {
      icon: 'mdi mdi-dumbbell',
      title: t('drawerNavigator.menu.treinosCriados'),
      value: 'treinosCriados',
      to: '/treinosCriados',
      children: [],
    },
    {
      icon: 'mdi mdi-human-handsup',
      title: t('drawerNavigator.menu.bibliotecaExercicios'),
      value: 'bibliotecaExercicios',
      to: '/exercicios',
    },
  ],
  treinador: [
  {
      icon: 'mdi mdi-heart-outline',
      title: t('drawerNavigator.menu.saude'),
      value: 'saude',
      to: '/saude',
      children: [
        {
          icon: 'mdi-calendar-star',
          title: t('drawerNavigator.menu.eventos'),
          value: 'eventos',
          to: '/Atleta-Screens/eventos',
        },
      ],
    },
  {
          icon: 'mdi-link',
          title: t('drawerNavigator.menu.conexoes'),
          value: 'conexoes',
          to: '/solicitacoesConexoes'
        },
        {
      icon: 'mdi mdi-dumbbell',
      title: t('drawerNavigator.menu.treinosCriados'),
      value: 'treinosCriados',
      to: '/treinosCriados',
      children: [],
    },
        {
      icon: 'mdi mdi-human-handsup',
      title: t('drawerNavigator.menu.bibliotecaExercicios'),
      value: 'bibliotecaExercicios',
      to: '/exercicios',
    },
  ]
}))

function handleClickOutside(event: MouseEvent) {
  const drawer = document.querySelector('.clean-drawer')
  if (drawer && !drawer.contains(event.target as Node)) {
    open.value = []
  }
}

function onClickMenu(menu: string) {
  if (menu == t('drawerNavigator.footer.sair')) {
    logout()
  }
}

const perfis: any = {
  medico: 'MÉDICO',
  atleta: 'ATLETA',
  fisioterapeuta: 'FISIOTERAPEUTA',
  treinador: 'TREINADOR',
  admin: 'ADMINISTRADOR',
}

function retornarSiglaNome() {
  const nome: string | undefined = toRaw(payload.value)?.user?.nome

  if (!nome) return ''

  const partes = nome.trim().split(' ').filter(Boolean)

  if (partes.length === 1) {
    return partes[0].charAt(0).toUpperCase()
  }

  const primeira = partes[0].charAt(0).toUpperCase()
  const ultima = partes[partes.length - 1].charAt(0).toUpperCase()

  return primeira + ultima
}

const menuFinal = computed(() => {
  const role = toRaw(payload.value)?.role as keyof typeof menusPorPerfil.value
  return menusPorPerfil.value[role] || []
})

onMounted(() => {
  payload.value = getPayload()
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.clean-drawer {
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%) !important;
  border-right: 1px solid rgba(66, 165, 245, 0.08);
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.03) !important;
}

.clean-drawer :deep(.v-navigation-drawer__content) {
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.clean-drawer :deep(.v-navigation-drawer__content)::-webkit-scrollbar {
  display: none;
}

.v-list-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-list-item .v-icon {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-list-item:hover {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(66, 165, 245, 0.3);
}

.v-list-item:hover .v-list-item-title,
.v-list-item:hover .v-list-item__content,
.v-list-item:hover span {
  color: white !important;
  font-weight: 600 !important;
  opacity: 100%;
}

.v-list-item:hover .v-icon {
  color: white !important;
  transform: scale(1.15);
}

.v-list-item--active {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  box-shadow: 0 4px 12px rgba(66, 165, 245, 0.3);
}

.v-list-item--active .v-list-item-title,
.v-list-item--active .v-list-item__content,
.v-list-item--active span {
  color: white !important;
  font-weight: 600 !important;
}

.v-list-item--active .v-icon {
  color: white !important;
}

.text-wrap .v-list-item__content {
  white-space: normal !important;
  word-wrap: break-word !important;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.v-list-item .v-list-item__prepend {
  margin-inline-end: 2px !important;
}

.v-list-item .v-list-item__prepend > .v-icon {
  margin-inline-end: 0 !important;
}

.paciente-item {
  font-size: 1.1rem !important;
}

.paciente-item .v-icon {
  font-size: 1.5rem !important;
}

.paciente-item .v-list-item__content {
  font-size: 1.1rem !important;
}

.v-list-item {
  font-size: 1.1rem !important;
  min-height: 52px !important;
}

.v-list-item .v-icon {
  font-size: 1.5rem !important;
}

.v-list-item-title {
  font-size: 1.1rem !important;
}
.icon-drow {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 10px;
  background-color: #edf7ff;
  border: 1px solid #dfe8f0;
}

.type-profile {
  border-bottom: 1px solid #dfe8f0;
  width: 80%;
  margin-right: 10px;
}
</style>
