<template>
  <v-navigation-drawer
    v-model="layoutStore.drawer"
    :rail="layoutStore.rail"
    permanent
    @click="layoutStore.rail && layoutStore.toggleRail()"
    class="clean-drawer position-fixed"
    color="blue"
    rail-width="65"
    width="280"
  >
    <!-- Header -->
    <div class="pa-4 text-center header-section">
      <v-avatar
        class="d-flex align-center justify-center"
        v-if="layoutStore.rail"
        size="36"
        color="blue-lighten-1"
      >
        <v-img
          src="/src/assets/logo-pequena.png"
          alt="Logo"
          width="100%"
          height="100%"
          contain
        ></v-img>
      </v-avatar>

      <div v-else>
        <!-- <v-avatar size="48" color="blue-lighten-1" class="mb-3">
                    <span class="text-white font-weight-bold text-h6">NG</span>
                </v-avatar> -->
        <div class="d-flex align-center">
          <v-img
            src="/src/assets/logo-pequena.png"
            alt="Logo"
            width="150"
            class="mb-3"
            contain
          ></v-img>
        </div>
      </div>
    </div>

    <!-- Menu -->
    <div>
      <div>
        <v-list v-model:opened="open">
          <template v-for="item in menuFinal">
            <v-list-group
              v-if="item.children && item.children.length"
              :key="item.value"
              :prepend-icon="item.icon"
            >
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" :title="item.title"></v-list-item>
              </template>

              <v-list-item
                v-for="child in item.children"
                :key="child.value"
                :prepend-icon="child.icon"
                :title="child.title"
                :to="child.to"
                class="text-wrap"
              >
                <template v-slot:title>
                  <v-tooltip :text="child.title" location="right">
                    <template v-slot:activator="{ props }">
                      <span v-bind="props" class="text-truncate">{{
                        child.title
                      }}</span>
                    </template>
                  </v-tooltip>
                </template>
              </v-list-item>
            </v-list-group>

            <v-list-item
              v-else
              :key="item"
              :prepend-icon="item.icon"
              :title="item.title"
              :to="item.to"
              class="text-wrap"
            >
              <template v-slot:title>
                <v-tooltip :text="item.title" location="right">
                  <template v-slot:activator="{ props }">
                    <span v-bind="props" class="text-truncate">{{
                      item.title
                    }}</span>
                  </template>
                </v-tooltip>
              </template>
            </v-list-item>
          </template>
        </v-list>
      </div>

      <div class="mt-4 text-center" v-if="isMedico()">
        <v-divider class="mb-3" thickness="2"></v-divider>
        <span class="text-subtitle-1" v-show="!layoutStore.rail">
          {{ perfis[payload?.role] }}
        </span>

        <v-list style="text-align: start" v-model:opened="open">
          <v-list-group prepend-icon="mdi mdi-account-group-outline">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                title="Pacientes"
                icon="mdi mdi-account-group-outline"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="items in pacienteItems"
              :key="items.value"
              :prepend-icon="items.icon"
              :title="items.title"
              :value="items.value"
              :to="items.to"
              class="paciente-item text-wrap"
            ></v-list-item>
          </v-list-group>
        </v-list>

        <v-list style="text-align: start" v-model:opened="open">
          <v-list-group prepend-icon="mdi mdi-alert-circle-outline">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                title="Notificações"
                icon="mdi mdi-alert-circle-outline"
              ></v-list-item>
            </template>
                        <v-list-item
              v-for="items in notificacoesItems"
              :key="items.value"
              :prepend-icon="items.icon"
              :title="items.title"
              :value="items.value"
              :to="items.to"
              @click="onClickMenu(items.title)"
            ></v-list-item>
          </v-list-group>
        </v-list>
      </div>

      <div class="">
        <v-list style="text-align: start" v-model:opened="open">
          <v-list-group prepend-icon="mdi mdi-home-outline">
            <template v-slot:activator="{ props }">
              <v-list-item
                class=""
                v-bind="props"
                title="Minha conta"
                icon="mdi-search"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="items in contaItems"
              :key="items.value"
              :prepend-icon="items.icon"
              :title="items.title"
              :value="items.value"
              :to="items.to"
              @click="onClickMenu(items.title)"
            ></v-list-item>
          </v-list-group>
        </v-list>
      </div>
    </div>

    <!-- Footer -->
    <template v-slot:append>
      <div>
        <v-divider
          class="mx-2 mb-3"
          color="blue-lighten-4"
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
import { getPayload, isMedico, logout } from '@/utils/auth'
import { getProfileRoute } from '@/utils/profile'
import { computed, onBeforeUnmount, onMounted, ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'

const layoutStore = useLayoutStore()
const $route = useRoute()
const open = ref(['Analise'])
const payload = ref<any>()


const notificacoesItems = [
  {
    icon: 'mdi mdi-bell-outline',
    title: 'Notificação Geral',
    value: 'notificacoes',
    to: '/notificacoes'
  }
]
const contaItems = [
  {
    icon: 'mdi-account-circle',
    title: 'Perfil',
    value: 'dashboard',
    to: getProfileRoute(),
  },
]

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
          to: '/agendaMedica',
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
          value: 'agendaMedica/consultasPendentes',
          to: '/agendaMedica/consultasPendentes',
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
          icon: 'mdi-calendar-check',
          title: 'Treinos',
          value: 'treinos',
          to: '/agenda/treinos',
        },
        {
          icon: 'mdi-calendar-star',
          title: 'Competições',
          value: 'competicoes',
          to: '/agenda/competicoes',
        },
      ],
    },
    {
      icon: 'mdi mdi-exclamation',
      title: 'Alertas',
      value: 'alertas',
      to: '/alertas',
    },
    {
      icon: 'mdi mdi-web',
      title: 'Visão Geral',
      value: 'visaoGeral',
      to: '/visao-geral',
    },
    {
      icon: 'mdi mdi-calendar',
      title: 'Consultas',
      value: 'Consultas',
      to: '/Atleta-Screens/consultas',
      children: [],
    },
    {
      icon: 'mdi-chart-bar',
      title: 'Registros Médicos',
      value: 'registrosMedicos',
      to: '/registros-medicos',
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
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.v-list-item:hover {
  background-color: white !important;
  color: #1976d2 !important;
}

.v-list-item:hover .v-list-item__content,
.v-list-item:hover .v-icon {
  color: #1976d2 !important;
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
  font-size: 0.8rem !important;
}

.paciente-item .v-icon {
  font-size: 1rem !important;
}

.paciente-item .v-list-item__content {
  font-size: 0.8rem !important;
}
</style>
