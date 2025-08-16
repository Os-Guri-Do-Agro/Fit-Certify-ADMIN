<template>
  <div class="d-flex flex-column justify-space-between">
    <div class="mt-10 mt-md-0 d-flex">
                <h2 class="text-start text-h5 font-weight-bold mb-5" style="color: #88CE0D;">
                    5. Exames e Dados Complementares
                </h2>
            </div>

            <VRow class="d-flex">
                <v-form class="w-100">
                <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="check">Fez check-up nos últimos 12 meses?</label><v-select
        density="comfortable"
      v-model="checkselect.value.value"
      :error-messages="checkselect.errorMessage.value"
      :items="items"
      name="check"
      id="check"
      placeholder="Sim"
      variant="outlined"
    ></v-select></VCol>
                <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="arquivos">Anexar exames (PDF ou imagem):</label><VFileInput density="comfortable" prepend-icon="" name="arquivos" id="arquivos" variant="outlined"/></VCol>
                <VCol class="my-0 py-0 font-weight-medium " cols="12"><label for="app">Possui smartwatch ou app de treino?</label><v-select
        density="comfortable"
      v-model="appselect.value.value"
      :error-messages="appselect.errorMessage.value"
      :items="items"
      name="app"
      id="app"
      placeholder="Sim"
      variant="outlined"
    ></v-select></VCol>
            <div class="">
                <v-checkbox class="font-weight-medium" color="success" label=" Desejo integrar meus dados com a FitCertify365"></v-checkbox>
            </div>
            </v-form>
            </VRow>



            <div class="d-flex flex-column h-100">
                <h2 class="text-start text-h5 font-weight-bold mb-5" style="color: #88CE0D;">
                    6. Declaração
                </h2>
                <v-form class="w-100">
            <v-checkbox
            v-for="(item, index) in declaracoes"
            :key="index"
            v-model="selecionados"
            :label="item"
            :value="item"
            density="compact"
            class="font-weight-medium" color="success" ></v-checkbox>
                </v-form>
            </div>
            </div>
</template>


<script setup>
  import { ref } from 'vue'
  import { useField } from 'vee-validate'

  const checkselect = useField('checkselect')
  const appselect = useField('appselect')
  
  const declaracoes = [
    'Declaro que as informações acima são verdadeiras e autorizo a análise para fins de certificação.',
    'Aceito compartilhar meus dados com as organizações dos eventos que eu participar.',
    'Li e concordo com os Termos de Uso e Política de Privacidade.'
  ]

  

  const selecionados = ref([])
 

  const items = ref([
    'Sim',
    'Não'
  ])
  

</script>