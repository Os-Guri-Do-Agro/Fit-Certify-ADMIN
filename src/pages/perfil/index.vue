<template>
  <v-row class="mx-1 mx-md-5 d-flex ga-5 h-100">
    <v-col
      class="d-flex align-center flex-column flex-md-row"
      cols="12"
      style="background-color: #dfedc7ba; min-height: 194px"
    >
      <v-avatar class="ml-md-10" size="110px" style="background-color: #d9d9d9">
        <v-img :src="payload?.user?.avatarUrl"></v-img>
      </v-avatar>

      <div class="ml-md-10 d-flex flex-column ga-1">
        <h1 class="text-h6 text-md-h5 text-center text-md-start">
          {{ payload?.user?.nome }}
        </h1>
        <span
          class="text-subtitle-2 text-md-subtitle-1 text-center text-md-start"
          style="color: #8c8c8c"
          >{{ payload?.userId }}</span
        >
      </div>
    </v-col>

    <v-col class="h-100 bg-white rounded-lg" cols="12">
      <v-row class="pa-2 pa-md-5">
        <v-col
          class="d-flex align-center justify-center"
          cols="12"
          style="background-color: #88ce0db8; min-height: 81px"
        >
          <h2 class="text-white text-h6">Saúde</h2>
        </v-col>

        <v-col class="mt-7 justify-end d-flex pa-1 pa-md-4" cols="md-6">
          <v-card
            class="w-100"
            max-width="662px"
            elevation="0"
            style="background-color: #e7f8f6; min-height: 378px"
          >
            <VCardTitle class="pa-5">
              <span class="text-h6 ml-md-5" style="color: #00c6fe"
                >Parâmetro 1</span
              >
            </VCardTitle>
          </v-card>
        </v-col>
        <v-col
          class="mt-7 d-flex justify-start pa-1 pa-md-4"
          min-height="200px"
          cols="md-6"
        >
          <v-card
            class="w-100"
            max-width="662px"
            elevation="0"
            style="background-color: #e7f8f6; min-height: 378px"
          >
            <VCardTitle class="pa-5">
              <span class="text-h6 ml-md-5" style="color: #00c6fe"
                >Parâmetro 2</span
              >
            </VCardTitle>
          </v-card>
        </v-col>
        <v-col
          class="mt-7 d-flex justify-end pa-1 pa-md-4"
          min-height="200px"
          cols="md-6"
        >
          <v-card
            class="w-100"
            max-width="662px"
            elevation="0"
            style="background-color: #e7f8f6; min-height: 378px"
          >
            <VCardTitle class="pa-5">
              <span class="text-h6 ml-md-5" style="color: #00c6fe"
                >Parâmetro 3</span
              >
            </VCardTitle>
          </v-card>
        </v-col>
        <v-col
          class="mt-7 d-flex justify-start pa-1 pa-md-4"
          min-height="200px"
          cols="md-6"
        >
          <v-card
            class="w-100"
            max-width="662px"
            elevation="0"
            style="background-color: #e7f8f6; min-height: 378px"
          >
            <VCardTitle class="pa-5">
              <span class="text-h6 ml-md-5" style="color: #00c6fe"
                >Parâmetro 4</span
              >
            </VCardTitle>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { getPayload } from '@/utils/auth'
import { onMounted, ref } from 'vue'

const payload = ref<any>()

onMounted(() => {
  payload.value = getPayload()
})
</script>
