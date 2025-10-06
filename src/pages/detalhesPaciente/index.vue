<template>
  <div class="w-100 h-100 ma-0">
    <v-container fluid>
      <div class="d-flex align-center mb-5">
        <v-btn
          icon
          variant="outlined"
          color="blue"
          class="mr-3"
          @click="voltarParaLista"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h1 class="text-h5 font-weight-bold">Detalhes do Paciente</h1>
      </div>

      <v-row v-if="loading">
        <v-col cols="12" md="5">
          <v-skeleton-loader type="card" />
        </v-col>
        <v-col cols="12" md="7">
          <v-skeleton-loader type="card" />
        </v-col>
        <v-col cols="12">
          <v-skeleton-loader type="card" />
        </v-col>
        <v-col cols="12">
          <v-skeleton-loader type="card" />
        </v-col>
      </v-row>

      <v-row v-else-if="paciente">
        <v-col cols="12" md="5">
          <v-card rounded="lg" variant="outlined" color="blue">
            <div
              class="bg-blue pa-4 d-flex flex-column flex-md-row ga-2 justify-space-between align-center"
            >
              <div class="">
                <v-card-title
                  class="text-white pa-0 text-subtitle-1 d-flex align-center flex-column flex-md-row"
                >
                  <v-icon class="mr-md-2">mdi-account</v-icon>
                  Informações Pessoais
                </v-card-title>
              </div>
              <div class="d-flex ga-1">
                <span
                  class="bg-white px-2 rounded-lg d-flex align-center justify-center"
                  ><v-icon color="blue" size="18">mdi-star</v-icon>
                  <strong class="ml-1">0</strong></span
                >
                <span
                  class="bg-white px-2 rounded-lg d-flex align-center justify-center"
                  ><v-icon color="blue" size="18"
                    >mdi-chat-processing-outline</v-icon
                  >
                  <strong class="ml-1">0</strong></span
                >
              </div>
            </div>

            <v-card-text class="pa-4">
              <div class="text-center mb-4">
                <v-avatar size="150">
                  <v-img
                    v-if="paciente.usuario?.avatarUrl"
                    :src="paciente.usuario.avatarUrl"
                    :alt="paciente.usuario?.nome"
                  />
                  <v-icon v-else size="150">mdi-account-circle</v-icon>
                </v-avatar>
              </div>

              <div class="mb-3">
                <strong class="text-black">Nome:</strong>
                <span class="text-black ml-1">{{
                  paciente.usuario?.nome || 'N/A'
                }}</span>
              </div>
              <div class="mb-3">
                <strong class="text-black">Email:</strong>
                <span class="text-black ml-1">{{
                  paciente.usuario?.email || 'N/A'
                }}</span>
              </div>
              <div class="mb-3">
                <strong class="text-black">Idade:</strong>
                <span class="text-black ml-1"
                  >{{ calcularIdade(paciente.dataNascimento) }} anos</span
                >
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="7">
          <v-card rounded="lg" variant="outlined" color="blue">
            <div class="pa-4 bg-blue d-flex align-center">
              <v-card-title class="text-white text-subtitle-1 pa-0">
                <v-icon class="mr-2">mdi-clipboard-text</v-icon>
                Informações Médicas
              </v-card-title>
            </div>

            <v-card-text class="pa-4">
              <v-row>
                <v-col cols="12" md="6">
                  <div class="mb-3">
                    <strong class="text-black">Altura:</strong>
                    <span class="text-black ml-1">{{
                      paciente.altura ? `${paciente.altura} cm` : 'N/A'
                    }}</span>
                  </div>
                  <div class="mb-3">
                    <strong class="text-black">Peso:</strong>
                    <span class="text-black ml-1">{{
                      paciente.peso ? `${paciente.peso} kg` : 'N/A'
                    }}</span>
                  </div>
                  <div class="mb-3">
                    <strong class="text-black">Gênero:</strong>
                    <span class="text-black ml-1">{{
                      paciente.genero || 'N/A'
                    }}</span>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="mb-3">
                    <strong class="text-black">Telefone:</strong>
                    <span class="text-black ml-1">{{
                      formatarTelefone(paciente.telefone) || 'N/A'
                    }}</span>
                  </div>
                  <div class="mb-3">
                    <strong class="text-black">Tipo Sanguíneo:</strong>
                    <span class="text-black ml-1">{{
                      paciente.tipoSanguineo || 'N/A'
                    }}</span>
                  </div>
                  <div class="mb-3">
                    <strong class="text-black">Data de Nascimento:</strong>
                    <span class="text-black ml-1">{{
                      formatarData(paciente.dataNascimento)
                    }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-if="!loading && paciente">
        <v-col cols="12" md="12">
          <v-card rounded="lg" variant="outlined" color="blue">
            <div
              class="pa-4 bg-blue d-flex align-center cursor-pointer"
              @click="toggleHistoricoMedico"
            >
              <v-card-title
                class="text-white text-subtitle-1 pa-0 d-flex align-center w-100 text-center"
              >
                <v-spacer />
                <v-icon class="mr-2">mdi-clipboard-pulse-outline</v-icon>
                Histórico Médico
                <v-spacer />
                <v-icon class="ml-2">
                  {{
                    historicoMedicoExpanded
                      ? 'mdi-chevron-up'
                      : 'mdi-chevron-down'
                  }}
                </v-icon>
              </v-card-title>
            </div>

            <v-expand-transition>
              <v-card-text v-show="historicoMedicoExpanded" class="pa-0">
                <v-list>
                  <v-list-item
                    v-for="(item, index) in consultas"
                    :key="index"
                    class="px-4 py-2 cursor-pointer list-item-hover"
                    @click="abrirModalExame(item)"
                  >
                    <template #prepend>
                      <v-icon color="blue"> mdi-stethoscope </v-icon>
                    </template>

                    <v-list-item-title class="font-weight-medium">
                      {{ item.medico?.usuario?.nome || 'Médico não informado' }}
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      {{
                        item.medico?.especializacao ||
                        'Especialização não informada'
                      }}
                    </v-list-item-subtitle>

                    <template #append>
                      <div class="d-flex align-center ga-2">
                        <v-chip
                          size="small"
                          variant="outlined"
                          class="d-none d-sm-flex"
                        >
                          {{ formatarData(item.createdAt) }}
                        </v-chip>
                        <v-btn
                          :icon="
                            item.favorito ? 'mdi-heart' : 'mdi-heart-outline'
                          "
                          :color="item.favorito ? 'red' : 'grey'"
                          variant="text"
                          size="small"
                          @click.stop="toggleFavorito(item)"
                        />
                      </div>
                    </template>
                  </v-list-item>

                  <v-list-item
                    v-if="consultas.length === 0"
                    class="text-center py-8"
                  >
                    <v-list-item-title class="text-grey">
                      Nenhum histórico médico encontrado
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-if="!loading && paciente">
        <v-col cols="12" md="12">
          <v-card rounded="lg" variant="outlined" color="blue">
            <div
              class="pa-4 bg-blue d-flex align-center cursor-pointer"
              @click="toggleAlergias"
            >
              <v-card-title
                class="text-white text-subtitle-1 pa-0 d-flex align-center w-100 text-center"
              >
                <v-spacer />
                <v-icon class="mr-2">mdi-alert-circle-outline</v-icon>
                Alergias
                <v-spacer />
                <v-icon class="ml-2">
                  {{ alergiasExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </v-card-title>
            </div>

            <v-expand-transition>
              <v-card-text v-show="alergiasExpanded" class="pa-0">
                <v-list>
                  <template v-if="loadingAlergias">
                    <v-list-item v-for="n in 3" :key="n" class="px-4 py-2">
                      <v-skeleton-loader type="list-item-two-line" />
                    </v-list-item>
                  </template>

                  <template v-else>
                    <v-list-item
                      v-for="(alergia, index) in alergias"
                      :key="index"
                      class="px-4 py-2"
                    >
                      <template #prepend>
                        <v-icon color="blue">mdi-alert-circle</v-icon>
                      </template>

                      <v-list-item-title class="font-weight-medium">
                        {{ alergia.titulo || 'Alergia sem título' }}
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        {{ alergia.descricao || 'Sem descrição' }}
                      </v-list-item-subtitle>

                      <template #append>
                        <v-chip size="small" variant="outlined">
                          {{ formatarData(alergia.createdAt) }}
                        </v-chip>
                      </template>
                    </v-list-item>

                    <v-list-item
                      v-if="alergias.length === 0"
                      class="text-center py-8"
                    >
                      <v-list-item-title class="text-grey">
                        Nenhuma alergia registrada
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list>
              </v-card-text>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="modalExame" max-width="600px" rounded="lg">
      <v-card v-if="exameSelecionado">
        <v-card-title
          :class="exameSelecionado.tipo === 'consulta' ? 'bg-blue' : 'bg-green'"
          class="text-white pa-4"
        >
          <v-icon class="mr-2">{{
            exameSelecionado.tipo === 'consulta'
              ? 'mdi-stethoscope'
              : 'mdi-pill'
          }}</v-icon>
          {{ exameSelecionado.medico?.usuario?.nome || 'Médico' }} -
          {{ exameSelecionado.medico?.especializacao || 'Especialização' }}
        </v-card-title>

        <v-card-text class="pa-0">
          <div class="pa-4 border-b">
            <v-row>
              <v-col cols="6">
                <div class="d-flex align-center mb-2">
                  <v-icon color="blue" class="mr-2">mdi-calendar</v-icon>
                  <div>
                    <div class="text-caption text-grey">Data da Consulta</div>
                    <div class="font-weight-medium">
                      {{ formatarData(exameSelecionado.createdAt) }}
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="d-flex align-center mb-2">
                  <v-icon
                    :color="
                      exameSelecionado.tipo === 'consulta' ? 'blue' : 'green'
                    "
                    class="mr-2"
                  >
                    {{
                      exameSelecionado.tipo === 'consulta'
                        ? 'mdi-stethoscope'
                        : 'mdi-pill'
                    }}
                  </v-icon>
                  <div>
                    <div class="text-caption text-grey">Tipo</div>
                    <div class="font-weight-medium text-capitalize">
                      Consulta
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>

          <div class="pa-4 border-b">
            <div class="d-flex align-start">
              <v-icon color="orange" class="mr-2 mt-1"
                >mdi-clipboard-pulse</v-icon
              >
              <div class="flex-grow-1">
                <div class="text-subtitle-2 mb-2">Diagnóstico</div>
                <p
                  class="text-body-2 mb-0"
                  style="word-break: break-word; overflow-wrap: break-word"
                >
                  {{ exameSelecionado.diagnostico }}
                </p>
              </div>
            </div>
          </div>

          <div
            v-if="exameSelecionado.medicamentosReceitados"
            class="pa-4 border-b"
          >
            <div class="d-flex align-start">
              <v-icon color="green" class="mr-2 mt-1">mdi-pill</v-icon>
              <div class="flex-grow-1">
                <div class="text-subtitle-2 mb-2">Medicamentos Receitados</div>
                <p
                  class="text-body-2 mb-0"
                  style="word-break: break-word; overflow-wrap: break-word"
                >
                  {{ exameSelecionado.medicamentosReceitados }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="exameSelecionado.situacao" class="pa-4">
            <div class="d-flex align-start">
              <v-icon color="purple" class="mr-2 mt-1">mdi-note-text</v-icon>
              <div class="flex-grow-1">
                <div class="text-subtitle-2 mb-2">Situação</div>
                <p
                  class="text-body-2 mb-0"
                  style="word-break: break-word; overflow-wrap: break-word"
                >
                  {{ exameSelecionado.situacao }}
                </p>
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn color="blue" variant="outlined" @click="modalExame = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import atletaService from '@/services/atleta/atleta-service'
import consultasService from '@/services/consultas/consultas-service'
import alergiasService from '@/services/alergias/alergias-service'

const router = useRouter()
const route = useRoute()

const paciente = ref(null)
const loading = ref(true)
const historicoMedicoExpanded = ref(false)
const alergiasExpanded = ref(true)
const modalExame = ref(false)
const exameSelecionado = ref(null)
const consultas = ref([])
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

const formatarData = (data) => {
  if (!data) return 'N/A'
  return new Date(data).toLocaleDateString('pt-BR')
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
  router.push('/pacientes')
}

const toggleHistoricoMedico = () => {
  historicoMedicoExpanded.value = !historicoMedicoExpanded.value
}

const toggleAlergias = () => {
  alergiasExpanded.value = !alergiasExpanded.value
}

const abrirModalExame = (item) => {
  exameSelecionado.value = item
  modalExame.value = true
}

const toggleFavorito = (item) => {
  item.favorito = !item.favorito
}

const findAllConsultas = async (id) => {
  try {
    const response = await consultasService.getConsultasByAtletaId(id)
    if (response && response.data) {
      consultas.value = response.data
    } else {
      consultas.value = response
    }
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('Nenhuma consulta encontrada para este atleta')
      consultas.value = []
    } else {
      console.error('Erro ao buscar consultas:', error)
      consultas.value = []
    }
  }
}

const findAllAlergias = async () => {
  try {
    loadingAlergias.value = true
    const response = await alergiasService.getAlergiaAtletaId(paciente.value.id)
    if (response && response.data) {
      alergias.value = response.data
    } else {
      alergias.value = response
    }
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('Nenhuma alergia encontrada para este atleta')
      alergias.value = []
    } else {
      console.error('Erro ao buscar alergias:', error)
      alergias.value = []
    }
  } finally {
    loadingAlergias.value = false
  }
}

const buscarPaciente = async (id) => {
  try {
    loading.value = true
    const response = await atletaService.getAtletaById(id)

    if (response && response.data) {
      paciente.value = response.data
    } else {
      paciente.value = response
    }
  } catch (error) {
    console.error('Erro ao buscar paciente:', error)
    console.error('Detalhes do erro:', error.response || error)
    paciente.value = null
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const pacienteId = route.params.id || route.query.id

  if (pacienteId) {
    await buscarPaciente(pacienteId)
    await findAllConsultas(pacienteId)
    await findAllAlergias()
  } else {
    console.error('ID do paciente não encontrado na rota')
    loading.value = false
  }
})
</script>

<style scoped>
.v-card-title {
  font-weight: bold;
}

.cursor-pointer {
  cursor: pointer;
}

.list-item-hover {
  transition: all 0.2s ease;
  border-radius: 8px;
}

.list-item-hover:hover {
  background-color: rgba(33, 150, 243, 0.08) !important;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.border-b {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
