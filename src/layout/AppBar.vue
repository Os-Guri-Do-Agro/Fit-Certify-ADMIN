<template>
  <v-app-bar color="" :elevation="0" class="app-bar">
    <template v-slot:prepend>
      <v-btn icon variant="text" color="light-blue-accent-3" @click="layoutStore.toggleRail()" class="ml-2">
        <v-icon size="36px">mdi-menu</v-icon>
      </v-btn>
    </template>

    <template v-slot:append>
      <v-btn @click="router.push('/notificacoes')" icon variant="text" color="light-blue-accent-3" class="mr-5">
        <v-badge dot color="light-blue-accent-3">
          <v-icon size="28px">mdi-bell-outline</v-icon>
        </v-badge>

      </v-btn>

      <v-sheet width="65px" height="100%" class="bg-red d-flex align-center justify-center mr-3">
        <v-icon size="38px">mdi-alert-outline</v-icon>
      </v-sheet>


      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn variant="text" v-bind="props" class="mr-2 pa-0 d-flex align-center" style="height: 100%;">
            <!-- Avatar -->
            <v-skeleton-loader v-if="loading" type="avatar"></v-skeleton-loader>
            <v-avatar v-else size="42" class="mr-3">
              <v-img :src="atleta?.usuario?.avatarUrl || medico?.usuario?.avatarUrl"></v-img>
            </v-avatar>

            <!-- Nome e profissão -->
            <div class="d-flex flex-column justify-center text-left">
              <v-skeleton-loader v-if="loading" type="paragraph" width="120"></v-skeleton-loader>
              <span v-else class="font-weight-medium text-body-2">{{ atleta?.usuario?.nome || medico?.usuario?.nome
              }}</span>
              <v-skeleton-loader v-if="loading" type="text" width="80" class="mt-0 d-none"></v-skeleton-loader>
              <span v-else class="text-caption text-grey">{{ perfis[payload?.role] }}</span>
            </div>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="router.push(getProfileRoute())">
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="router.push('/settings')">
            <v-list-item-title>Configurações</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="sair">
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { getProfileRoute } from '@/utils/profile';
import { useLayoutStore } from '@/stores/layout';
import { getPayload, logout } from '@/utils/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import atletaService from '@/services/atleta/atleta-service';
import medicoService from '@/services/medico/medico-service';
import { getAtletaId } from '@/utils/auth';
import { getMedicoId } from '@/utils/auth';

const layoutStore = useLayoutStore()
const payload = ref<any>()
const router = useRouter()
const atleta = ref<any>()
const medico = ref<any>()
const atletaId = ref()
const medicoId = ref()
const loading = ref(true)

const buscarAtletaById = async (id: string) => {

  try {
    const response = await atletaService.getAtletaById(id)
    atleta.value = response.data
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}

const buscarMedicoById = async (id: string) => {

  try {
    const response = await medicoService.getMedicoById(id)
    medico.value = response.data
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}

onMounted(async () => {
  atletaId.value = getAtletaId()
  medicoId.value = getMedicoId()
  if (atletaId.value) {
    await buscarAtletaById(atletaId.value)
    payload.value = getPayload()
  } else if (medicoId.value) {
    await buscarMedicoById(medicoId.value)
    payload.value = getPayload()
  } else {
    console.error('ID do atleta não encontrado o')
  }
})

function sair() {
  logout()
}

const perfis: any = {
  'medico': 'MÉDICO',
  'atleta': 'ATLETA',
  'admin': 'ADMINISTRADOR'
}

</script>

<style scoped>
.app-bar {
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
