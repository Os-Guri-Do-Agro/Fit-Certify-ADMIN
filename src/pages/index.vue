<template>
  <!--  -->
  <Eventos v-if="validationScreenByRole === 'atleta'" />
  <CalendarioMedico v-if="validationScreenByRole === 'medico'" />
  <CalendarioFisio v-if="validationScreenByRole === 'fisioterapeuta'" />
  <BibliotecaTreinos v-if="validationScreenByRole === 'treinador'" />

</template>

<script setup>
import { onMounted, ref } from 'vue';
import Eventos from '../pages/Atleta-Screens/eventos'
import CalendarioMedico from '../pages/Medico-Screens/agendaMedica/index.vue'
import CalendarioFisio from '../pages/Fisioterapeuta-Screens/agendaFisioterapeutica'
import BibliotecaTreinos from '../pages/exercicios'
import { getRole } from '@/utils/auth';
const validationScreenByRole = ref()

onMounted(async () => {
  const responseRole = getRole()
  validationScreenByRole.value = responseRole
})


</script>
