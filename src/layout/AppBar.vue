<template>
    <v-app-bar color=""  :elevation="0" class="app-bar">
        <template v-slot:prepend>
            <v-btn icon variant="text" color="light-blue-accent-3" @click="layoutStore.toggleRail()" class="ml-2">
                <v-icon size="36px">mdi-menu</v-icon>
            </v-btn>
        </template>

        <template v-slot:append>
            <v-btn icon variant="text" color="light-blue-accent-3" class="mr-5">
                <v-badge dot color="light-blue-accent-3">
                    <v-icon size="28px">mdi-bell-outline</v-icon>   
                </v-badge>

            </v-btn>

                <v-sheet width="65px" height="100%" class="bg-red d-flex align-center justify-center mr-3">
                    <v-icon size="38px">mdi-alert-outline</v-icon>
                </v-sheet>


            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn
                        variant="text"
                        v-bind="props"
                        class="mr-2 pa-0 d-flex align-center"
                        style="height: 100%;"
                        >
                        <!-- Avatar -->
                        <v-avatar size="42" class="mr-3" >
                            <v-img :src="payload?.user?.avatarUrl"></v-img>
                        </v-avatar>

                        <!-- Nome e profissão -->
                        <div class="d-flex flex-column justify-center text-left">
                            <span class="font-weight-medium text-body-2">{{ payload?.user?.nome }}</span>
                            <span class="text-caption text-grey">{{ perfis[payload?.role] }}</span>
                        </div>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="router.push('/perfil')">
                        <v-list-item-title>Perfil</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
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
import { useLayoutStore } from '@/stores/layout';
import { getPayload, logout } from '@/utils/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const layoutStore = useLayoutStore()
const payload = ref<any>()
const router = useRouter()

function sair(){
    logout()
}

const perfis: any = {
  'medico': 'MÉDICO',
  'atleta': 'ATLETA',
  'admin': 'ADMINISTRADOR'
}

onMounted(() => {
  payload.value = getPayload()
})

</script>

<style scoped>
.app-bar {
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
