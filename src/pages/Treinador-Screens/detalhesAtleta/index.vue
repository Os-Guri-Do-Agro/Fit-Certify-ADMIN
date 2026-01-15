<template>
  <div class="w-100 h-100 ma-0">
    <v-container class="py-6">
      <div class="d-flex align-center mb-6">
        <v-btn
          icon
          variant="outlined"
          color="green"
          class="mr-3"
          @click="voltarParaLista"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h1 class="text-h5 text-md-h4 font-weight-bold text-green-lighten-1">
          Detalhes do Atleta
        </h1>
      </div>
      <v-row v-if="loading">
        <v-col cols="12">
          <v-skeleton-loader type="card" height="500" />
        </v-col>
        <v-col cols="12">
          <v-skeleton-loader type="card" height="300" />
        </v-col>
      </v-row>

      <template v-else-if="atleta">
        <v-row>
          <v-col cols="12">
            <v-card
              class="info-card"
              elevation="4"
              rounded="xl"
              :style="{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
              }"
            >
              <div
                class="text-center pa-5 mb-5 position-relative"
                style="background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%); border-radius: 12px 12px 0 0;"
              >
                <v-avatar
                  size="160"
                  class="elevation-3 mb-3"
                  style="background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%); border: 4px solid rgba(255, 255, 255, 0.3);"
                >
                  <v-img
                    v-if="atleta.avatarUrl"
                    :src="atleta.avatarUrl"
                    :alt="atleta.usuario?.nome"
                    cover
                  />
                  <v-icon v-else size="80" color="white">mdi-account-circle</v-icon>
                </v-avatar>
                <div class="text-h6 font-weight-bold text-white mb-1">
                  {{ atleta.usuario?.nome || 'N/A' }}
                </div>
                <div class="text-body-2 text-white mb-3" style="opacity: 0.9;">
                  {{ atleta.usuario?.email || 'N/A' }}
                </div>
              </div>

              <div class="pa-5">
              <v-row>
                <v-col cols="12" md="4">
                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-1">Idade</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ calcularIdade(atleta.dataNascimento) }} anos
                    </div>
                  </div>

                  <div>
                    <div class="text-caption text-grey-darken-1 mb-1">Data de Nascimento</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ formatarData(atleta.dataNascimento) }}
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="4">
                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-1">Altura</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ atleta.altura ? `${atleta.altura} cm` : 'N/A' }}
                    </div>
                  </div>

                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-1">Peso</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ atleta.peso ? `${atleta.peso} kg` : 'N/A' }}
                    </div>
                  </div>

                  <div>
                    <div class="text-caption text-grey-darken-1 mb-1">Gênero</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ atleta.genero || 'N/A' }}
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="4">
                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-1">Telefone</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ formatarTelefone(atleta.telefone) || 'N/A' }}
                    </div>
                  </div>

                  <div>
                    <div class="text-caption text-grey-darken-1 mb-1">Tipo Sanguíneo</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ atleta.tipoSanguineo || 'N/A' }}
                    </div>
                  </div>
                </v-col>
              </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12">
            <v-card
              class="expandable-card"
              elevation="4"
              rounded="xl"
              :style="{
                borderLeft: '4px solid #4CAF50',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
              }"
            >
              <div
                class="pa-6 cursor-pointer d-flex align-center"
                @click="toggleAlergias"
              >
                <v-avatar size="60" class="elevation-2 me-4" color="green-darken-1">
                  <v-icon size="30" color="white">mdi-alert-circle-outline</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="text-h6 font-weight-bold text-grey-darken-3">
                    Alergias
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    {{ alergias.length }} {{ alergias.length === 1 ? 'alergia registrada' : 'alergias registradas' }}
                  </div>
                </div>
                <v-icon :color="alergiasExpanded ? 'green-darken-1' : 'grey'">
                  {{ alergiasExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </div>

              <v-expand-transition>
                <div v-if="alergiasExpanded">
                  <v-divider />
                  <v-list class="pa-0 scrollable-content">
                    <template v-if="loadingAlergias">
                      <v-list-item v-for="n in 3" :key="n" class="px-6 py-3">
                        <v-skeleton-loader type="list-item-avatar-two-line" />
                      </v-list-item>
                    </template>
                    <template v-else-if="alergias.length === 0">
                      <v-list-item class="text-center py-8">
                        <v-list-item-title class="text-grey">
                          Nenhuma alergia registrada
                        </v-list-item-title>
                      </v-list-item>
                    </template>
                    <template v-else>
                      <v-list-item
                        v-for="(alergia, index) in alergias"
                        :key="index"
                        class="px-6 py-3"
                      >
                        <template #prepend>
                          <v-avatar size="40" color="red-darken-1" class="me-3">
                            <v-icon color="white" size="20">mdi-alert-circle</v-icon>
                          </v-avatar>
                        </template>

                        <v-list-item-title class="font-weight-medium text-grey-darken-3 mb-1">
                          {{ alergia.titulo || 'Alergia sem título' }}
                        </v-list-item-title>

                        <v-list-item-subtitle class="text-grey-darken-1">
                          {{ alergia.descricao || 'Sem descrição' }}
                        </v-list-item-subtitle>

                        <template #append>
                          <v-chip size="small" variant="outlined">
                            {{ formatarDataLocal(alergia.createdAt) }}
                          </v-chip>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-container>


  </div>
</template>

<script setup>
import { formatarData, formatarDataLocal } from '@/utils/date.utils'
import alergiasService from '@/services/alergias/alergias-service'
import atletaService from '@/services/atleta/atleta-service'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const atleta = ref(null)
const loading = ref(true)
const alergiasExpanded = ref(true)
const alergias = ref([])
const loadingAlergias = ref(true)

const calcularIdade = (dataNascimento) => {
  if (!dataNascimento) return 'N/A'
  const hoje = new Date()
  const nascimento = new Date(dataNascimento)
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const mes = hoje.getMonth() - nascimento.getMonth()
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--
  }
  return idade
}

const formatarTelefone = (telefone) => {
  if (!telefone) return null
  const numero = telefone.replace(/\D/g, '')
  if (numero.length === 11) {
    return numero.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (numero.length === 10) {
    return numero.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  return telefone
}

const voltarParaLista = () => {
  router.back()
}

const toggleAlergias = () => {
  alergiasExpanded.value = !alergiasExpanded.value
}

const findAllAlergias = async (id) => {
  try {
    loadingAlergias.value = true
    const response = await alergiasService.getAlergiaAtletaId(id)
    if (response && response.data) {
      alergias.value = response.data
    } else {
      alergias.value = response
    }
  } catch (error) {
    if (error.response?.status === 404) {
      alergias.value = []
    } else {
      console.error('Erro ao buscar alergias:', error)
      alergias.value = []
    }
  } finally {
    loadingAlergias.value = false
  }
}

const buscarAtleta = async (id) => {
  try {
    loading.value = true
    const response = await atletaService.getAtletaById(id)

    if (response && response.data) {
      atleta.value = response.data
    } else {
      atleta.value = response
    }
  } catch (error) {
    console.error('Erro ao buscar atleta:', error)
    atleta.value = null
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const atletaId = route.params.id || route.query.id
  if (atletaId) {
    buscarAtleta(atletaId)
    findAllAlergias(atletaId)
  } else {
    console.error('ID do atleta não encontrado na rota')
    loading.value = false
  }
})
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
  transition: all 0.3s ease;
}

.cursor-pointer:hover {
  opacity: 0.9;
}

.info-card {
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.expandable-card {
  transition: all 0.3s ease;
}

.expandable-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.list-item-hover {
  transition: all 0.3s ease;
  border-radius: 8px;
}

.list-item-hover:hover {
  background-color: rgba(76, 175, 80, 0.08) !important;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.border-b {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.ga-2 {
  gap: 8px;
}

.scrollable-content {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}

.scrollable-content::-webkit-scrollbar {
  width: 8px;
}

.scrollable-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.scrollable-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
