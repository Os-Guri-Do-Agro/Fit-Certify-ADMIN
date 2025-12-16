<template>
  <!--  -->
  <Resumo v-if="validationScreenByRole === 'atleta'" />
  <Calendario v-if="validationScreenByRole === 'medico'" />
  <ConexoesFisio v-if="validationScreenByRole === 'fisioterapeuta'" />
  <ConexoesTreinador v-if="validationScreenByRole === 'treinador'" />

</template>

<script setup>
import { onMounted, ref } from 'vue';
import Resumo from '../pages/Atleta-Screens/registrosMedicos'
import Calendario from '../pages/Medico-Screens/agendaMedica/index.vue'
import ConexoesFisio from '../pages/Fisioterapeuta-Screens/conexoes'
import ConexoesTreinador from '../pages/Treinador-Screens/conexoes'
import { getRole } from '@/utils/auth';
const validationScreenByRole = ref()

onMounted(async () => {
  const responseRole = getRole()
  validationScreenByRole.value = responseRole
})


</script>
