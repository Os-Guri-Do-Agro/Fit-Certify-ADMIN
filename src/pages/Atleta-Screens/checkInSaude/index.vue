<template>
  <div class="check-in-page">
    <PreRaceHealthCheckForm :eventoId="eventoId" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PreRaceHealthCheckForm from '@/components/PreRaceHealthCheckForm.vue'

const route = useRoute()
const eventoId = ref<number | undefined>()

onMounted(() => {
  // const id = (route.params.eventoId as string) || (route.query.eventoId as string)
  // if (id) {
  //   eventoId.value = Number(id)
  // }
})
</script>

<style scoped>
.check-in-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px 0;
}
</style>
