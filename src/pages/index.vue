<template>
  <Resumo v-if="validationScreenByRole === 'atleta'" />
  <Agenda v-else />
</template>

<script  setup>
import { onMounted, ref } from 'vue';
import Resumo from '../pages/resumo/index.vue'
import Agenda from '../pages/agenda/index.vue'
import { getRole } from '@/utils/auth';
const validationScreenByRole = ref()
onMounted(async () => {
 const a = getRole()
  validationScreenByRole.value = a
})


</script>
