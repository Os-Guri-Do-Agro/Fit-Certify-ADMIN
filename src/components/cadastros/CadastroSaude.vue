<template>
            <VRow class="pa-0 ma-0 fill-md-height d-flex flex-column flex-md-row">


            <VCol class="d-flex ma-0 pa-0 pr-0 pr-md-3"  md="6">
                <v-row class="d-flex " >
                    <v-col cols="12">
                <h2 class="text-start text-h5 font-weight-bold mb-5" style="color: #88CE0D;">2. Histórico de Saúde</h2>
                <div class="mb-5"><span class="text-black font-weight-medium">Já foi diagnosticado com alguma das condições abaixo?</span></div>
                        <v-checkbox
                            v-for="(item, index) in condicoes"
                            :key="index"
                            v-model="selecionados"
                            :label="item"
                            :value="item"
                            hide-details
                            density="compact"
                            color="success"
                        />

                        <VRow>
                            <VCol cols="12">
                        <div class="mt-5 d-flex flex-column">
                            <span class="text-black">Outras condições médicas:</span>
                            <v-textarea class="text-black" no-resize rows="2" color="black" variant="outlined"></v-textarea>
                        </div>
                            </VCol>


                            <VCol cols="12">
                        <div class="mt-5 d-flex flex-column">
                            <span class="text-black">Toma algum medicamento contínuo? Se sim, qual?</span>
                            <v-textarea class="text-black custom-textarea" rows="2"  no-resize max-height="20px" color="black" variant="outlined"></v-textarea>
                        </div>
                            </VCol>
                        </VRow>

                    </v-col>
                </v-row>
            </VCol>






            
            <VCol class="d-flex pa-0 ma-0" md="6">
                <v-row class="d-flex h-100" >
                    <v-col class="h-100" cols="12">
                <h2 class="text-start text-h5 font-weight-bold mb-5" style="color: #88CE0D;">3. Sinais e Sintomas Recentes</h2>
                <div class="mb-5"><span class="text-black font-weight-medium">Já foi diagnosticado com alguma das condições abaixo?</span></div>
                        <v-checkbox
                            v-for="(item, index) in sintomas"
                            :key="index"
                            v-model="selecionados"
                            :label="item"
                            :value="item"
                            hide-details
                            density="compact"
                            color="success"
                        />

                        <div class="mt-7">
                            <h2 class="text-start text-h5 font-weight-bold mb-7" style="color: #88CE0D;">4. Histórico Esportivo</h2>
                            <VRow>
                                <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="objetivo">Objetivo com a atividade física:</label><VTextField name="objetivo" id="objetivo"  placeholder="Saúde geral" variant="outlined"/></VCol>
                                <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="provas">Já participou de provas antes?</label><VTextField name="provas"  id="provas" placeholder="Sim" variant="outlined"/></VCol>
                                <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="ultimasprovas">Se sim, qual a última?</label><VTextField name="ultimasprovas" id="ultimasprovas" variant="outlined"/></VCol>
                                
                            </VRow>
                        </div>

                    </v-col>
                </v-row>
            </VCol>

        </VRow>
</template>

<script setup>
import { ref } from 'vue'

const condicoes = [
  'Hipertensão',
  'Diabetes',
  'Asma',
  'Colesterol alto',
  'Problemas cardíacos',
  'Doenças renais',
  'Problemas respiratórios',
  'Nenhuma das anteriores'
]

const sintomas = [
    'Dor no peito ao esforço',
    'Falta de ar com atividades leves',
    'Tontura ou desmaios',
    'Palpitações',
    'Inchaço nas pernas',
    'Nenhum desses'
]

const selecionados = ref([])
</script>