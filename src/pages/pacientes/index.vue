<template>
  <div class="w-100 h-100 ma-0">
    <v-container fluid>
      <!-- MÉTRICAS PRINCIPAIS -->
      <v-row class="mb-4" dense>
        <v-col cols="12" md="4">
          <v-card
            class="d-flex flex-column align-center justify-center bg-white"
            rounded="lg"
            variant="outlined"
            elevation="2"
            color="blue"
          >
            <v-sheet color="blue" class="d-flex justify-center pa-3 w-100">
              <v-icon size="40" color="white">mdi-account-heart</v-icon>
            </v-sheet>

            <v-card-title class="text-h3 font-weight-bold mt-3">0</v-card-title>
            <v-card-text class="text-subtitle-1 text-grey-darken-1 mb-4">
              Pacientes Atendidos
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card
            class="d-flex flex-column align-center justify-center bg-white"
            rounded="lg"
            variant="outlined"
            elevation="2"
            color="blue"
          >
            <v-sheet color="blue" class="d-flex justify-center pa-3 w-100">
              <v-icon size="40" color="white">mdi-certificate</v-icon>
            </v-sheet>

            <v-card-title class="text-h3 font-weight-bold mt-3">0</v-card-title>
            <v-card-text class="text-subtitle-1 text-grey-darken-1 mb-4">
              Certificados Emitidos
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card
            class="d-flex flex-column align-center justify-center bg-white"
            rounded="lg"
            variant="outlined"
            elevation="2"
            color="blue"
          >
            <v-sheet
              color="blue"
              class="d-flex justify-center pa-3 w-100"
              rounded="t-lg"
            >
              <v-icon size="40" color="white">mdi-calendar-clock</v-icon>
            </v-sheet>

            <v-card-title class="text-h3 font-weight-bold mt-3">0</v-card-title>
            <v-card-text class="text-subtitle-1 text-grey-darken-1 mb-4">
              Consultas Marcadas
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- STATUS SECUNDÁRIOS -->
      <v-row dense>
        <v-col cols="12" md="4">
          <v-card
            class="d-flex align-center pa-0 ma-0"
            rounded="lg"
            variant="outlined"
            color="green"
            height="80"
          >
            <v-sheet
              color="green"
              class="d-flex align-center justify-center h-100"
              width="70"
            >
              <v-icon color="white" size="28">mdi-account-multiple</v-icon>
            </v-sheet>

            <div class="ml-3 py-3">
              <div class="text-subtitle-2 text-grey-darken-1">
                Total de Pacientes
              </div>
              <div class="text-h6 font-weight-bold">0</div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card
            class="d-flex align-center pa-0 ma-0"
            rounded="lg"
            variant="outlined"
            color="amber"
            height="80"
          >
            <v-sheet
              color="amber"
              class="d-flex align-center justify-center h-100"
              width="70"
            >
              <v-icon color="white" size="28">mdi-history</v-icon>
            </v-sheet>

            <div class="ml-3 py-3">
              <div class="text-subtitle-2 text-grey-darken-1">
                Revisões a Fazer
              </div>
              <div class="text-h6 font-weight-bold">0</div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card
            class="d-flex align-center pa-0 ma-0"
            rounded="lg"
            variant="outlined"
            color="red"
            height="80"
          >
            <v-sheet
              color="red"
              class="d-flex align-center justify-center h-100"
              width="70"
            >
              <v-icon color="white" size="28">mdi-alert-circle-outline</v-icon>
            </v-sheet>

            <div class="ml-3 py-3">
              <div class="text-subtitle-2 text-grey-darken-1">Pendências</div>
              <div class="text-h6 font-weight-bold">0</div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-data-table :items="items"></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const items = [
  {
    name: 'African Elephant',
    age: 24,
    esport: 'Soccer',
  },
]
</script>
