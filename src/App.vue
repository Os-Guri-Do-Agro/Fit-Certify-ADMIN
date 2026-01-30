<template>
  <v-app theme="light">
    <!-- Layout com Drawer e AppBar -->
    <v-layout v-if="!isAuthRoute">
      <DrawerNavigation />
      <AppBar />
      <v-main class="main-content">
        <v-container
          fluid
          style="background-color: #fffdfc"
        >
          <router-view />
        </v-container>
      </v-main>
    </v-layout>

    <!-- Layout sem Drawer/AppBar (Login, etc) -->
    <v-main v-else class="auth-layout">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLocale } from 'vuetify'
import AppBar from './layout/AppBar.vue'
import DrawerNavigation from './layout/DrawerNavigation.vue'

const route = useRoute()
const { locale } = useI18n()
const vuetifyLocale = useLocale()

watch(locale, (newLocale) => {
  vuetifyLocale.current.value = newLocale
}, { immediate: true })

// Rotas que não devem mostrar o layout padrão
const authRoutes = [
  '/login',
  '/register',
  '/registers',
  '/register-medico',
  '/registerPlanos',
  '/politicaPrivacidade',
  '/pagamento',
  '/detalhesExclusaoConta',
  '/validarCertificado',
  '/detalhesAtleta',
  '/thank-you',
  '/payment-success',
  '/pagamentoRealizado',
  '/pagamentoCancelado',
  '/select-profile',
  '/Atleta-Screens/checkInSaude'
]
const isAuthRoute = computed(() => {
  return (
    authRoutes.includes(route.path) ||
    route.path.startsWith('/esqueceuSenha')
  )
})
</script>

<style></style>
