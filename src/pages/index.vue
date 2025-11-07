<template>
  <!--  -->
  <Resumo v-if="validationScreenByRole === 'atleta'" />
  <Calendario v-else />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Resumo from '../pages/resumo/index.vue'
import Calendario from '../pages/Medico-Screens/agendaMedica/index.vue'
import { getRole } from '@/utils/auth';
const validationScreenByRole = ref()

onMounted(async () => {
  const responseRole = getRole()
  validationScreenByRole.value = responseRole
})


</script>
