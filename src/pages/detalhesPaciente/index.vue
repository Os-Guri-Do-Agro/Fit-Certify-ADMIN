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

      <v-row v-if="loading" justify="center">
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
                      paciente.telefone || 'N/A'
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

      <v-row>
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
                    v-for="(item, index) in historicoMedico"
                    :key="index"
                    class="px-4 py-2 cursor-pointer list-item-hover"
                    @click="abrirModalExame(item)"
                  >
                    <template #prepend>
                      <v-icon
                        :color="item.tipo === 'consulta' ? 'blue' : 'green'"
                      >
                        {{
                          item.tipo === 'consulta'
                            ? 'mdi-stethoscope'
                            : 'mdi-pill'
                        }}
                      </v-icon>
                    </template>

                    <v-list-item-title class="font-weight-medium">
                      {{ item.medico.nome }}
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      {{ item.medico.especializacao }}
                    </v-list-item-subtitle>

                    <template #append>
                      <div class="d-flex align-center ga-2">
                        <v-chip
                          size="small"
                          variant="outlined"
                          class="d-none d-sm-flex"
                        >
                          {{ formatarData(item.data) }}
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
                    v-if="historicoMedico.length === 0"
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

      <v-row>
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
                  <v-list-item
                    v-for="(alergia, index) in alergias"
                    :key="index"
                    class="px-4 py-2"
                  >
                    <template #prepend>
                      <v-icon color="blue">mdi-alert-circle</v-icon>
                    </template>

                    <v-list-item-title class="font-weight-medium">
                      {{ alergia.nome }}
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      {{ alergia.sintomas }}
                    </v-list-item-subtitle>

                    <template #append>
                      <v-chip size="small" variant="outlined">
                        {{ formatarData(alergia.dataAdicionada) }}
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
          {{ exameSelecionado.medico.nome }} -
          {{ exameSelecionado.medico.especializacao }}
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
                      {{ formatarData(exameSelecionado.data) }}
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
                      {{ exameSelecionado.tipo }}
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
                <p class="text-body-2 mb-0">
                  {{ exameSelecionado.diagnostico }}
                </p>
              </div>
            </div>
          </div>

          <div
            v-if="exameSelecionado.medicamentos?.length"
            class="pa-4 border-b"
          >
            <div class="d-flex align-start">
              <v-icon color="green" class="mr-2 mt-1">mdi-pill</v-icon>
              <div class="flex-grow-1">
                <div class="text-subtitle-2 mb-3">Medicamentos Receitados</div>
                <div class="d-flex flex-column ga-2">
                  <v-card
                    v-for="(medicamento, idx) in exameSelecionado.medicamentos"
                    :key="idx"
                    variant="outlined"
                    class="pa-3"
                  >
                    <div class="d-flex align-center">
                      <v-icon color="green" size="small" class="mr-2"
                        >mdi-pill</v-icon
                      >
                      <div class="flex-grow-1">
                        <div class="font-weight-medium text-body-2">
                          {{ medicamento.nome }}
                        </div>
                        <div class="text-caption text-grey">
                          {{ medicamento.dosagem }} •
                          {{ medicamento.frequencia }}
                        </div>
                      </div>
                    </div>
                  </v-card>
                </div>
              </div>
            </div>
          </div>

          <div v-if="exameSelecionado.observacoes" class="pa-4">
            <div class="d-flex align-start">
              <v-icon color="purple" class="mr-2 mt-1">mdi-note-text</v-icon>
              <div class="flex-grow-1">
                <div class="text-subtitle-2 mb-2">Observações</div>
                <p class="text-body-2 mb-0">
                  {{ exameSelecionado.observacoes }}
                </p>
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            :color="exameSelecionado.tipo === 'consulta' ? 'blue' : 'green'"
            variant="outlined"
            @click="modalExame = false"
          >
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

const router = useRouter()
const route = useRoute()

const paciente = ref(null)
const loading = ref(true)
const historicoMedicoExpanded = ref(false)
const alergiasExpanded = ref(true)
const modalExame = ref(false)
const exameSelecionado = ref(null)

const alergias = ref([
  {
    nome: 'Penicilina',
    sintomas: 'Erupção cutânea, coceira, inchaço',
    dataAdicionada: '2023-05-15',
  },
  {
    nome: 'Amendoim',
    sintomas: 'Dificuldade respiratória, inchaço na garganta',
    dataAdicionada: '2022-08-20',
  },
  {
    nome: 'Látex',
    sintomas: 'Irritação na pele, vermelhidão',
    dataAdicionada: '2024-01-10',
  },
])

const historicoMedico = ref([
  {
    tipo: 'consulta',
    titulo: 'Consulta Cardiológica',
    descricao: 'Avaliação cardiovascular de rotina - Resultados normais',
    data: '2024-01-15',
    medico: {
      nome: 'Dr. Carlos Silva',
      especializacao: 'Cardiologista',
    },
    favorito: false,
    diagnostico:
      'Função cardiovascular dentro dos parâmetros normais. Pressão arterial controlada.',
    medicamentos: [
      {
        nome: 'Atenolol 25mg',
        dosagem: '1 comprimido',
        frequencia: '1x ao dia',
      },
      { nome: 'AAS 100mg', dosagem: '1 comprimido', frequencia: '1x ao dia' },
    ],
    observacoes:
      'Manter atividade física regular e dieta balanceada. Retorno em 6 meses.',
  },
  {
    tipo: 'exame',
    titulo: 'Exame de Sangue',
    descricao: 'Hemograma completo - Todos os valores dentro da normalidade',
    data: '2024-01-10',
    medico: {
      nome: 'Dra. Ana Costa',
      especializacao: 'Clínica Geral',
    },
    favorito: true,
    diagnostico:
      'Hemograma completo sem alterações. Níveis de colesterol e glicose normais.',
    medicamentos: [],
    observacoes: 'Manter hábitos saudáveis. Próximo exame em 1 ano.',
  },
  {
    tipo: 'consulta',
    titulo: 'Consulta Ortopédica',
    descricao: 'Avaliação de lesão no joelho - Recomendado fisioterapia',
    data: '2023-12-20',
    medico: {
      nome: 'Dr. Roberto Lima',
      especializacao: 'Ortopedista',
    },
    favorito: false,
    diagnostico:
      'Lesão leve no menisco medial. Processo inflamatório controlado.',
    medicamentos: [
      {
        nome: 'Ibuprofeno 600mg',
        dosagem: '1 comprimido',
        frequencia: '3x ao dia por 7 dias',
      },
      {
        nome: 'Glucosamina 1500mg',
        dosagem: '1 cápsula',
        frequencia: '1x ao dia',
      },
    ],
    observacoes:
      'Fisioterapia 3x por semana. Evitar impacto por 30 dias. Retorno em 1 mês.',
  },
])

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

const buscarPaciente = async (id) => {
  try {
    loading.value = true
    console.log('Buscando paciente com ID:', id)
    const response = await atletaService.getAtletaById(id)
    console.log('Resposta completa da API:', response)

    if (response && response.data) {
      paciente.value = response.data
    } else {
      paciente.value = response
    }

    console.log('Paciente final carregado:', paciente.value)
  } catch (error) {
    console.error('Erro ao buscar paciente:', error)
    console.error('Detalhes do erro:', error.response || error)
    paciente.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const pacienteId = route.params.id || route.query.id
  console.log('ID do paciente:', pacienteId)
  console.log('Route params:', route.params)
  console.log('Route query:', route.query)

  if (pacienteId) {
    buscarPaciente(pacienteId)
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
