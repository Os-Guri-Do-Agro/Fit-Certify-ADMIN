<template>
  <v-container class="h-100">
    <h2 class="text-h4 font-weight-bold mb-6">{{ $t('analises.title') }}</h2>

    <v-row align="center" class="mb-4">
      <v-col cols="auto">
        <span class="text-body-1 font-weight-medium">{{ $t('analises.searchBy') }}</span>
      </v-col>
      <v-col cols="auto">
        <v-btn-toggle v-model="filtro" rounded="pill" color="blue" group>
          <v-btn value="novos" variant="tonal">{{ $t('analises.new') }}</v-btn>
          <v-btn value="antigos" variant="outlined">{{ $t('analises.old') }}</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-divider class="mb-6"></v-divider>

    <v-row dense>
      <v-col v-for="(analise, i) in analises" :key="i" cols="12">
        <v-card
          variant="outlined"
          color="blue"
          class="pa-4"
          rounded="xl"
          @click="selecionado = i"
          style="cursor: pointer"
        >
          <v-row align="center">
            <v-col cols="auto">
              <v-icon color="blue">{{ selecionado === i ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank' }}</v-icon>
            </v-col>

            <v-col>
              <div class="text-blue text-subtitle-1 font-weight-bold">
                {{ analise.titulo }}
              </div>
              <div class="text-body-2">
                <strong>{{ analise.parametro }}:</strong>
                {{ analise.descricao }}
              </div>
              <div class="text-caption text-grey-darken-1">
                {{ $t('analises.added') }} {{ analise.data }}
              </div>
            </v-col>

            <v-col cols="auto">
              <v-btn
                prepend-icon
                variant="tonal"
                color="blue"
                size="small"
                rounded="lg"
                class="px-5 py-4 d-flex align-center justify-center"
              >
                <span class="mr-1 text-subtitle-2 font-weight-bold"
                  >{{ $t('analises.download') }}</span
                >
                <v-icon>mdi-arrow-down-circle-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const filtro = ref('novos')
const selecionado = ref(null)

const analises = [
  {
    titulo: 'Exame de Sangue',
    parametro: 'Glicose',
    descricao: 'Níveis elevados. Pode indicar diabetes.',
    data: '10 de Julho de 2025',
  },
  {
    titulo: 'Exame de Urina',
    parametro: 'Cor e Odor',
    descricao: 'Anormalidades podem indicar doença nos rins e trato urinário.',
    data: '10 de Julho de 2025',
  },
  {
    titulo: 'Perfil Lipídico',
    parametro: 'Triglicerídeos',
    descricao: 'Níveis elevados podem indicar maior risco cardíaco.',
    data: '10 de Julho de 2025',
  },
  {
    titulo: 'Teste de Tireóide',
    parametro: 'T3 e T4',
    descricao: 'Níveis anormais podem indicar disfunção tireoidal.',
    data: '10 de Julho de 2025',
  },
]
</script>
