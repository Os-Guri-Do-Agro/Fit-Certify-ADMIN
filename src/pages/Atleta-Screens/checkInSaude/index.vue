<template>
  <v-img src="@/assets/Login/login-banner.jpg" cover height="100vh" width="100%">
    <div class="overlay">
      <PreRaceHealthCheckForm :eventoId="eventoId" />
    </div>
  </v-img>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PreRaceHealthCheckForm from '@/components/PreRaceHealthCheckForm.vue'
import { getToken } from '@/utils/auth'

const route = useRoute()
const eventoId = ref<string | undefined>(route.query.eventoId as string)

onMounted(() => {
  if (!getToken() || getToken() === null ) {
    window.location.href = '/login'
  }
})
</script>

<style scoped>
.overlay {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 199, 254, 0.151));
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}

.overlay :deep(.v-card) {
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}
</style>
