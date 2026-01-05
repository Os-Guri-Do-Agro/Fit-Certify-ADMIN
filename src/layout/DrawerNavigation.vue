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
          <div class="d-flex align-center jsutify-center icon-drow">
            <v-img
            class="pa-0 ma-0"
              src="../assets/logo_pequena.png"
              width="90"
              height="90"
              cover
            />
          </div>
          <div class="">
          <h1 class="text-blue-lighten-1 text-h5 font-weight-bold">FitCertify<span style="color: #88CE0D;">365</span></h1>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex align-center justify-center mb-10" v-if="!layoutStore.rail">
      <div class="px-5 pb-3 pt-2 rounded-md d-flex align-center justify-center ga-2 type-profile" v-if="payload?.role === 'treinador'">
        <v-icon icon="mdi-whistle" color="blue-lighten-1" size="15"></v-icon>
        <span class="font-weight-bold text-blue-lighten-1 text-caption">Treinador</span>
      </div>
      <div class="px-5 pb-3 pt-2 rounded-md d-flex align-center justify-center ga-2 type-profile" v-if="payload?.role === 'atleta'">
        <v-icon icon="mdi-run-fast" color="blue-lighten-1" size="20"></v-icon>
        <span class="font-weight-bold text-blue-lighten-1 text-caption">Atleta</span>
      </div>
      <div class="px-5 pb-3 pt-2 rounded-md d-flex align-center justify-center ga-2 type-profile" v-if="payload?.role === 'medico'">
        <v-icon icon="mdi-stethoscope" color="blue-lighten-1" size="20"></v-icon>
        <span class="font-weight-bold text-blue-lighten-1 text-caption">Médico</span>
      </div>
      <div class="px-5 pb-3 pt-2 rounded-md d-flex align-center justify-center ga-2 type-profile" v-if="payload?.role === 'fisioterapeuta'">
        <v-icon icon="mdi-human-handsup" color="blue-lighten-1" size="20"></v-icon>
        <span class="font-weight-bold text-blue-lighten-1 text-caption">Fisioterapeuta</span>
      </div>
    </div>

    <!-- Menu -->
    <div class="px-3 mt-2">
      <v-list v-model:opened="open" class="pa-0">
        <template v-for="item in menuFinal">
          <v-list-group
            v-if="item.children && item.children.length"
            :key="item.value"
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
            :key="item"
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
                  <span class="text-body-2">Pacientes</span>
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
                  <span class="text-body-2">Notificações</span>
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
                  <span class="text-body-2">Minha conta</span>
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
          color="#00C6FE"
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
import { getPayload, isAtleta, isFisioterapeuta, isMedico, isTreinador, logout, getUserID } from '@/utils/auth'
import { getProfileRoute, getListaConexaoRoute } from '@/utils/profile'
import { computed, onBeforeUnmount, onMounted, ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import userService from '@/services/user/user-service'

const layoutStore = useLayoutStore()
const $route = useRoute()
const open = ref(['Analise'])
const payload = ref<any>()
const infoUser = ref<any>()


  const infoUsuario = async () => {
    try {
      const id = getUserID()
      const response = await userService.userById(id)
      infoUser.value = response.data
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error)
    }
  }

const notificacoesItems = [
  {
    icon: 'mdi mdi-bell-outline',
    title: 'Notificação Geral',
    value: 'notificacoes',
    to: '/notificacoes'
  }
]
const contaItems = computed(() => {
  const children = [
    ...(!infoUser.value?.atletaId ? [{
      icon: 'mdi-run',
      title: 'Atleta',
      value: 'cadastrar-atleta',
      to: '/cadastrar-atleta',
      hideForRoles: ['atleta'],
    }] : []),
    ...(!infoUser.value?.medicoId ? [{
      icon: 'mdi-stethoscope',
      title: 'Médico',
      value: 'cadastrar-medico',
      to: '/cadastrar-medico',
      hideForRoles: ['medico'],
    }] : []),
    ...(!infoUser.value?.fisioterapeutaId ? [{
      icon: 'mdi-human-handsup',
      title: 'Fisioterapeuta',
      value: 'cadastrar-fisioterapeuta',
      to: '/cadastrar-fisioterapeuta',
      hideForRoles: ['fisioterapeuta'],
    }] : []),
    ...(!infoUser.value?.treinadorId ? [{
      icon: 'mdi-whistle',
      title: 'Treinador',
      value: 'cadastrar-treinador',
      to: '/cadastrar-treinador',
      hideForRoles: ['treinador'],
    }] : []),
  ]

  return [
    {
      icon: 'mdi-account-circle',
      title: 'Perfil',
      value: 'dashboard',
      to: getProfileRoute(),
    },
    ...(children.length > 0 ? [{
      icon: 'mdi-account-plus',
      title: 'Novo Perfil',
      value: 'novo-perfil',
      children,
    }] : []),
  ]
})

const pacienteItems = [
  {
    icon: 'mdi-clipboard-text-search-outline',
    title: 'Lista de Pacientes',
    value: 'lista de pacientes',
    to: '/Medico-Screens/pacientes',
  },
  {
    icon: 'mdi-account-group-outline',
    title: 'Recentes',
    value: 'salvos',
    to: '/Medico-Screens/pacientesAtendidos',
  },
]

const footerMenuItem = [
  {
    icon: 'mdi-cog',
    title: 'Configurações',
    value: 'settings',
    to: '/settings',
  },
  { icon: 'mdi-logout', title: 'Sair', value: 'exit', to: '/login' },
]

const menusPorPerfil: Record<string, any[]> = {
  medico: [
    {
      icon: 'mdi-calendar-blank-multiple',
      title: 'Consultas',
      value: '',
      children: [
        {
          icon: 'mdi mdi-calendar-month-outline',
          title: 'Calendário',
          value: 'calendario',
          to: '/Medico-Screens/agendaMedica',
        },
        {
          icon: 'mdi mdi-clipboard-list-outline',
          title: 'Consultas',
          value: 'consultas',
          to: '/Medico-Screens/consultas',
        },
        {
          icon: 'mdi mdi-calendar-month-outline',
          title: 'Pendentes',
          value: 'Medico-Screens/consultasPendentes',
          to: '/Medico-Screens/consultasPendentes',
        },
      ],
    },
    {
      icon: 'mdi mdi-compass-outline',
      title: 'Resumo',
      value: 'resumo',
      to: '/resumo',
      children: [],
    },

  ],
  atleta: [
    {
      icon: 'mdi mdi-heart-outline',
      title: 'Saúde',
      value: 'saude',
      to: '/saude',
      children: [
        {
          icon: 'mdi-calendar-star',
          title: 'Eventos',
          value: 'eventos',
          to: '/Atleta-Screens/eventos',
        },
      ],
    },
    // {
    //   icon: 'mdi mdi-web',
    //   title: 'Visão Geral',
    //   value: 'visaoGeral',
    //   to: '/visao-geral',
    // },
    {
      icon: 'mdi mdi-calendar',
      title: 'Consultas',
      value: 'Consultas',
      to: '/Atleta-Screens/consultas',
      children: [],
    },
    {
          icon: 'mdi-link',
          title: 'Conexões',
          value: 'conexoes',
          to: '/solicitacoesConexoes'
        },
    {
      icon: 'mdi-chart-bar',
      title: 'Registros Médicos',
      value: 'registrosMedicos',
      to: '/Atleta-Screens/registrosMedicos',
      children: [],
    },
    {
      icon: 'mdi mdi-file-document-outline',
      title: 'Certificados',
      value: 'certificados',
      to: '/certificados',
      children: [],
    },
    {
      icon: 'mdi mdi-bell-outline',
      title: 'Notificações',
      value: 'notificacoes',
      to: '/notificacoes',
    },
    {
      icon: 'mdi-clipboard-pulse-outline',
      title: 'Médicos',
      value: 'medicos',
      children: [
        {
          icon: 'mdi-magnify',
          title: 'Buscar Médico',
          value: 'buscarMedico',
          to: '/Atleta-Screens/medicos',
        },
        {
          icon: 'mdi-bookmark-outline',
          title: 'Meus Medicos',
          value: 'meusMedicos',
          to: '/Atleta-Screens/meusMedicos',
        },
      ],
    },
  ],
  fisioterapeuta: [
    {
      icon: 'mdi-calendar-blank-multiple',
      title: 'Consultas',
      value: '',
      children: [
        {
          icon: 'mdi mdi-calendar-month-outline',
          title: 'Calendário',
          value: 'calendario',
          to: '/Fisioterapeuta-Screens/agendaFisioterapeutica',
        },
        {
          icon: 'mdi mdi-clipboard-list-outline',
          title: 'Consultas',
          value: 'consultas',
          to: '/Fisioterapeuta-Screens/consultas',
        },
        {
          icon: 'mdi mdi-calendar-month-outline',
          title: 'Pendentes',
          value: 'Fisioterapeuta-Screens/consultasPendentes',
          to: '/Fisioterapeuta-Screens/consultasPendentes',
        },
      ],
    },
    {
      icon: 'mdi-link',
      title: 'Conexões',
      value: 'conexoes',
      to: '/solicitacoesConexoes'
    },
    {
      icon: 'mdi mdi-compass-outline',
      title: 'Resumo',
      value: 'resumo',
      to: '/resumo',
      children: [],
    },
    {
      icon: 'mdi mdi-human-handsup',
      title: 'Biblioteca de Exercícios',
      value: 'bibliotecaExercicios',
      to: '/exercicios',
    },
  ],
  treinador: [
  {
      icon: 'mdi mdi-heart-outline',
      title: 'Saúde',
      value: 'saude',
      to: '/saude',
      children: [
        {
          icon: 'mdi-calendar-star',
          title: 'Eventos',
          value: 'eventos',
          to: '/Atleta-Screens/eventos',
        },
      ],
    },
  {
          icon: 'mdi-link',
          title: 'Conexões',
          value: 'conexoes',
          to: '/solicitacoesConexoes'
        },
        {
      icon: 'mdi mdi-human-handsup',
      title: 'Biblioteca de Exercícios',
      value: 'bibliotecaExercicios',
      to: '/exercicios',
    },
  ]
}

function handleClickOutside(event: MouseEvent) {
  const drawer = document.querySelector('.clean-drawer')
  if (drawer && !drawer.contains(event.target as Node)) {
    open.value = []
  }
}

function onClickMenu(menu: string) {
  if (menu == 'Sair') {
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
  const role = toRaw(payload.value)?.role
  return menusPorPerfil[role] || []
})

onMounted(() => {
  payload.value = getPayload()
  infoUsuario()
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.clean-drawer :deep(.v-navigation-drawer__content) {
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.clean-drawer :deep(.v-navigation-drawer__content)::-webkit-scrollbar {
  display: none;
}

.v-list-item:hover {
  background-color: #42A5F5 !important;
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
}

.v-list-item--active {
  background-color: #42A5F5 !important;
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
