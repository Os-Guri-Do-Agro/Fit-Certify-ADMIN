<template>
  <VRow
    class="h-100 d-flex flex-column flex-md-row ma-0 pa-0 overflow-hidden fill-height"
    no-gutters
  >

    <!-- DIV PAGAMENTO -->
    <VCol class="h-100 d-flex align-center pa-0 ma-0" md="12">
      <div class="d-flex w-100 ga-10 align-top flex-column fill-height pa-0 ma-0">
        <VStepper
          v-model="step"
          class="d-flex flex-column h-100 w-100 justify-space-between"
          :items="item"
        >

          <template #item.1>
                1
          </template>


          <template #item.2>
            2
          </template>


          <template #item.3>

          </template>

          <template #actions="{ next, prev }">
            <div
              class="d-flex justify-space-between w-100 px-6 mb-5 flex-column-reverse flex-md-row align-center ga-3"
            >
              <VBtn
                class="w-100"
                :disabled="step === 1 ? true : false"
                height="43px"
                max-width="237px"
                style="color: #00c6fe"
                variant="outlined"
                @click="prev"
              >
                Voltar
              </VBtn>
              <VBtn
                class="text-white w-100"
                height="43px"
                max-width="237px"
                :loading="loading"
                :disabled="loading"
                :style="
                  step === 3
                    ? 'background-color:#88ce0d'
                    : 'background-color: #00c6fe'
                "
                @click="handleNext(next)"
              >
                {{
                  step !== 3
                    ? 'Próximo'
                    : loading
                      ? 'Enviando...'
                      : 'Finalizar'
                }}
              </VBtn>
            </div>
          </template>
        </VStepper>
    </div>
    </VCol>
  </VRow>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const step = ref(1)
const router = useRouter()
const loading = ref(false)

const handleNext = async (next) => {
  if (step.value === 3) {
    // Lógica final aqui
    console.log('Finalizando...')
  } else {
    next()
  }
}

const item = ['Step 1', 'Step 2', 'Step 3']

const titleStep = [
  'Título do Step 1',
  'Título do Step 2', 
  'Título do Step 3'
]

const textStep = [
  'Descrição do primeiro step.',
  'Descrição do segundo step.',
  'Descrição do terceiro step.'
]
</script>