<template>
  <v-navigation-drawer v-model="layoutStore.drawer" :rail="layoutStore.rail" permanent
    @click="layoutStore.rail && layoutStore.toggleRail()" class="clean-drawer position-fixed" color="light-blue-accent-3" rail-width="65">
    <!-- Header -->
    <div class="pa-4 text-center header-section">
      <v-avatar v-if="layoutStore.rail" size="36" color="blue-lighten-1">
        <span class="text-white font-weight-bold text-body-1">FC</span>
      </v-avatar>

      <div v-else>
        <!-- <v-avatar size="48" color="blue-lighten-1" class="mb-3">
                    <span class="text-white font-weight-bold text-h6">NG</span>
                </v-avatar> -->
        <div class="d-flex align-center">
           <v-img src="/src/assets/logo-pequena.png" alt="Logo" width="150" class="mb-3"
            contain></v-img>
          </div>
      </div>
    </div>

    <!-- Menu -->
    <div>
      <div>
        <v-list v-model:opened="open">
          <v-list-group prepend-icon="mdi-magnify">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Análise" icon="mdi-search"></v-list-item>
            </template>
            <v-list-item v-for="items in menuItems" :key="items.value" :prepend-icon="items.icon" :title="items.title"
              :value="items.value" :to="items.to"></v-list-item>
          </v-list-group>
        </v-list>
      </div>



      <div class="mt-4 text-center">
        <v-divider class="mb-3" thickness="2"></v-divider>
        <span class="text-subtitle-1" v-show="!layoutStore.rail">
          MÉDICO
        </span>

        <v-list style="text-align: center;" v-model:opened="open">
          <v-list-group prepend-icon="mdi mdi-alert-circle-outline">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Notificações" icon="mdi mdi-alert-circle-outline"></v-list-item>
            </template>
          </v-list-group>
        </v-list>
      </div>


      <div class="">
        <v-list style="text-align: center;" v-model:opened="open">
          <v-list-group prepend-icon="mdi mdi-home-outline">
            <template v-slot:activator="{ props }">
              <v-list-item class="" v-bind="props" title="Minha conta" icon="mdi-search"></v-list-item>
            </template>
            <v-list-item v-for="items in contaItems" :key="items.value" :prepend-icon="items.icon" :title="items.title"
              :value="items.value" :to="items.to"></v-list-item>
          </v-list-group>
        </v-list>
      </div>

    </div>

    <!-- Footer -->
    <template v-slot:append>
      <div>
        <v-divider class="mx-2 mb-3" color="blue-lighten-4" opacity="0.3"></v-divider>

        <v-list nav>
          <v-list-item v-for="item in footerMenuItem" :key="item.value" :prepend-icon="item.icon" :title="item.title"
            :to="item.to" rounded="lg" class="mb-1 menu-item" :class="{ 'active-menu': $route.path === item.to }">
          </v-list-item>

        </v-list>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { useRoute } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'

const layoutStore = useLayoutStore()
const $route = useRoute()
const open = ref(['Analise'])

const menuItems = [
  { icon: 'mdi mdi-compass-outline', title: 'Resumo', value: 'blog', to: '/resumo/' },
  { icon: 'mdi-chart-bar', title: 'MRP', value: 'marketplace', to: '/marketplace' },
]

const contaItems = [
  { icon: 'mdi mdi-account-circle', title: 'Perfil', value: 'dashboard', to: '/perfil' },
]

const footerMenuItem = [
  { icon: 'mdi-cog', title: 'Configurações', value: 'settings', to: '/settings' },
  { icon: 'mdi-logout', title: 'Sair', value: 'exit', to: '/login' },
]

function handleClickOutside(event: MouseEvent) {
  const drawer = document.querySelector('.clean-drawer')
  if (drawer && !drawer.contains(event.target as Node)) {
    open.value = [] 
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

</script>
