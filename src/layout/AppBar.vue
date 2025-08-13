<template>
    <v-app-bar color=""  :elevation="0" class="app-bar">
        <template v-slot:prepend>
            <v-btn icon variant="text" color="blue-lighten-1" @click="layoutStore.toggleRail()" class="ml-2">
                <v-icon size="36px">mdi-menu</v-icon>
            </v-btn>
        </template>

        <template v-slot:append>
            <v-btn icon variant="text" color="blue-lighten-1" class="mr-2">
                <v-badge content="2" color="info">
                    <v-icon size="28px">mdi-bell-outline</v-icon>   
                </v-badge>

            </v-btn>

                <v-sheet width="65px" height="100%" class="bg-red d-flex align-center justify-center">
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
                            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
                        </v-avatar>

                        <!-- Nome e profissão -->
                        <div class="d-flex flex-column justify-center text-left">
                            <span class="font-weight-medium text-body-2">Manuela Castro</span>
                            <span class="text-caption text-grey">MÉDICA</span>
                        </div>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-title>Perfil</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Configurações</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-list-item-title>Sair</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
    </v-app-bar>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout';

const layoutStore = useLayoutStore()
</script>

<style scoped>
.app-bar {
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
