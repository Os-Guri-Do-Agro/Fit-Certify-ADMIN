<template>
  <div class="w-100 h-100 ma-0">
    <v-container class="py-6">
      <div class="d-flex align-center mb-6">
        <v-btn
          icon
          variant="outlined"
          color="blue"
          class="mr-3"
          @click="voltarParaLista"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h1 class="text-h5 text-md-h4 font-weight-bold text-blue-lighten-1">
          {{ t('detalhesPaciente.backToList') }}
        </h1>
      </div>
      <v-row v-if="loading">
        <v-col cols="12">
          <v-skeleton-loader type="card" height="500" />
        </v-col>
        <v-col cols="12">
          <v-skeleton-loader type="card" height="300" />
        </v-col>
        <v-col cols="12">
          <v-skeleton-loader type="card" height="300" />
        </v-col>
      </v-row>

      <template v-else-if="paciente">
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
                style="background: linear-gradient(135deg, #2196F3 0%, #00c6fe 100%); border-radius: 12px 12px 0 0;"
              >
                <div class="position-absolute d-none d-md-flex" style="top: 16px; right: 16px;">
                  <v-chip
                    :color="temLicencaAtiva ? 'success' : 'error'"
                    size="small"
                    variant="flat"
                    class="text-white"
                  >
                    <v-icon start size="16">
                      {{ temLicencaAtiva ? 'mdi-check-circle' : 'mdi-close-circle' }}
                    </v-icon>
                    {{ temLicencaAtiva ? t('detalhesPacienteMedico.active') : t('detalhesPacienteMedico.certificateInactive') }}
                  </v-chip>
                </div>
                <v-avatar
                  size="160"
                  class="elevation-3 mb-3"
                  style="background: linear-gradient(135deg, #2196F3 0%, #00c6fe 100%); border: 4px solid rgba(255, 255, 255, 0.3);"
                >
                  <v-img
                    v-if="paciente.usuario?.avatarUrl"
                    :src="paciente.usuario.avatarUrl"
                    :alt="paciente.usuario?.nome"
                    cover
                  />
                  <v-icon v-else size="80" color="white">mdi-account-circle</v-icon>
                </v-avatar>
                <div class="text-h6 font-weight-bold text-white mb-1">
                  {{ paciente.usuario?.nome || 'N/A' }}
                </div>
                <div class="text-body-2 text-white mb-3" style="opacity: 0.9;">
                  {{ paciente.usuario?.email || 'N/A' }}
                </div>
                <div class="d-flex justify-center ga-2">
                  <v-chip
                    size="small"
                    variant="flat"
                    class="text-white"
                    style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px);"
                  >
                    <v-icon start size="16">mdi-star</v-icon>
                    0
                  </v-chip>
                  <v-chip
                    size="small"
                    variant="flat"
                    class="text-white"
                    style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px);"
                  >
                    <v-icon start size="16">mdi-chat-processing-outline</v-icon>
                    0
                  </v-chip>
                </div>
              </div>

              <div class="pa-5">

              <v-row>
                <v-col cols="12" md="4">
                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesPaciente.age') }}</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ calcularIdade(paciente.dataNascimento) }} {{ t('detalhesPaciente.years') }}
                    </div>
                  </div>

                  <div>
                    <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesPaciente.birthDate') }}</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ formatarData(paciente.dataNascimento) }}
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="4">
                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesPaciente.height') }}</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ paciente.altura ? `${paciente.altura} cm` : 'N/A' }}
                    </div>
                  </div>

                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesPaciente.weight') }}</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ paciente.peso ? `${paciente.peso} kg` : 'N/A' }}
                    </div>
                  </div>

                  <div>
                    <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesPacienteMedico.genderTitle') }}</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ paciente.genero || 'N/A' }}
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="4">
                  <div class="mb-4">
                    <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesPaciente.phone') }}</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ formatarTelefone(paciente.telefone) || 'N/A' }}
                    </div>
                  </div>

                  <div>
                    <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesPaciente.bloodType') }}</div>
                    <div class="text-body-1 font-weight-medium text-grey-darken-3">
                      {{ paciente.tipoSanguineo || 'N/A' }}
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
                borderLeft: '4px solid #1E88E5',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
              }"
            >
              <div
                class="pa-6 cursor-pointer d-flex align-center"
                @click="toggleModulosContratados"
              >
                <v-avatar size="60" class="elevation-2 me-4" color="blue-darken-1">
                  <v-icon size="30" color="white">mdi-package-variant</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="text-h6 font-weight-bold text-grey-darken-3">
                    {{ t('detalhesPacienteMedico.contractedModules') }}
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    {{ t('detalhesPacienteMedico.modulesAvailable', { count: 0 }) }}
                  </div>
                </div>
                <v-chip size="small" color="blue-darken-1" variant="flat" class="text-white me-2">
                  {{ t('detalhesPacienteMedico.modules', { count: 0 }) }}
                </v-chip>
                <v-icon :color="modulosContratadosExpanded ? 'blue-darken-1' : 'grey'">
                  {{ modulosContratadosExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </div>

              <v-expand-transition>
                <div v-if="modulosContratadosExpanded">
                  <v-divider />
                  <div class="pa-6 scrollable-content">
                    <div class="text-center py-8">
                      <v-icon size="64" color="grey-lighten-1" class="mb-4">
                        mdi-package-variant
                      </v-icon>
                      <p class="text-h6 text-grey-darken-1 mb-2">{{ t('detalhesPacienteMedico.noModules') }}</p>
                      <p class="text-body-2 text-grey">{{ t('detalhesPacienteMedico.noModulesDescription') }}</p>
                    </div>
                  </div>
                </div>
              </v-expand-transition>
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
                borderLeft: '4px solid #1E88E5',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
              }"
            >
              <div
                class="pa-6 cursor-pointer d-flex align-center"
                @click="toggleHistoricoMedico"
              >
                <v-avatar size="60" class="elevation-2 me-4" color="blue-darken-1">
                  <v-icon size="30" color="white">mdi-clipboard-pulse-outline</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="text-h6 font-weight-bold text-grey-darken-3">
                    {{ t('detalhesPacienteMedico.medicalHistory') }}
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    {{ consultas.length }} {{ consultas.length === 1 ? t('detalhesPacienteMedico.appointmentRegistered') : t('detalhesPacienteMedico.appointmentsRegistered') }}
                  </div>
                </div>
                <v-icon :color="historicoMedicoExpanded ? 'blue-darken-1' : 'grey'">
                  {{ historicoMedicoExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </div>

              <v-expand-transition>
                <div v-if="historicoMedicoExpanded">
                  <v-divider />
                  <v-list class="pa-0 scrollable-content">
                    <template v-if="consultas.length === 0">
                      <v-list-item class="text-center py-8">
                        <v-list-item-title class="text-grey">
                          {{ t('detalhesPacienteMedico.noMedicalHistory') }}
                        </v-list-item-title>
                      </v-list-item>
                    </template>
                    <template v-else>
                      <v-list-item
                        v-for="(item, index) in consultas"
                        :key="index"
                        class="px-6 py-3 cursor-pointer list-item-hover"
                        @click="abrirModalExame(item)"
                      >
                        <template #prepend>
                          <v-avatar size="40" color="blue-darken-1" class="me-3">
                            <v-icon color="white" size="20">mdi-stethoscope</v-icon>
                          </v-avatar>
                        </template>

                        <v-list-item-title class="font-weight-medium text-grey-darken-3 mb-1">
                          {{ item.medico?.usuario?.nome || item.fisioterapeuta?.usuario?.nome }}
                        </v-list-item-title>

                        <v-list-item-subtitle class="text-grey-darken-1">
                          {{ item.medico?.especializacao || t('detalhesPacienteMedico.specializationNotInformed') }}
                        </v-list-item-subtitle>

                        <template #append>
                          <div class="d-flex align-center ga-2">
                            <v-chip
                              v-if="item?.situacao"
                              size="small"
                              variant="flat"
                              :color="getSituacaoColor(item.situacao)"
                              class="font-weight-medium text-white"
                              style="min-width: 120px; justify-content: center;"
                            >
                              {{ traduzirStatus(item.situacao) }}
                            </v-chip>
                            <v-chip size="small" variant="outlined" class="d-none d-sm-flex">
                              {{ formatarDataLocal(item.createdAt) }}
                            </v-chip>
                          </div>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>

        <!-- Alergias -->
        <v-row class="mt-4">
          <v-col cols="12">
            <v-card
              class="expandable-card"
              elevation="4"
              rounded="xl"
              :style="{
                borderLeft: '4px solid #1E88E5',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
              }"
            >
              <div
                class="pa-6 cursor-pointer d-flex align-center"
                @click="toggleAlergias"
              >
                <v-avatar size="60" class="elevation-2 me-4" color="blue-darken-1">
                  <v-icon size="30" color="white">mdi-alert-circle-outline</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="text-h6 font-weight-bold text-grey-darken-3">
                    {{ t('detalhesPaciente.allergies') }}
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    {{ alergias.length }} {{ alergias.length === 1 ? t('detalhesPaciente.allergyRegistered') : t('detalhesPaciente.allergiesRegistered') }}
                  </div>
                </div>
                <v-icon :color="alergiasExpanded ? 'blue-darken-1' : 'grey'">
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
                          {{ t('detalhesPaciente.noAllergiesRegistered') }}
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
                          {{ alergia.titulo || t('detalhesPaciente.allergyNoTitle') }}
                        </v-list-item-title>

                        <v-list-item-subtitle class="text-grey-darken-1">
                          {{ alergia.descricao || t('detalhesPaciente.noDescription') }}
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

    <v-dialog v-model="modalCertificarAtleta" max-width="600px" class="certification-dialog" persistent>
      <v-card rounded="lg">
        <v-card-title class="bg-blue text-white pa-4">
          <v-icon class="mr-2">mdi-certificate</v-icon>
          {{ t('detalhesPacienteMedico.certificationModal.title') }}
        </v-card-title>
        <v-card-text class="pa-4">
          <v-form>
            <v-select :label="t('detalhesPacienteMedico.certificationModal.validityMonths')" v-model="opcaoMesesValidade" :items="opcoesMeses" item-title="text"
              item-value="value" variant="outlined" :class="{ 'mb-3': opcaoMesesValidade === 'outro' }" />
            <v-text-field v-if="opcaoMesesValidade === 'outro'" :label="t('detalhesPacienteMedico.certificationModal.customMonths')"
              v-model.number="mesesValidadeCustomizado" type="number" variant="outlined"
              :rules="[v => !v || (v >= 1 && v <= 12) || t('detalhesPacienteMedico.certificationModal.validationRule')]" v-maska="'##'"
              :hint="t('detalhesPacienteMedico.certificationModal.hint')" />
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-btn color="grey" variant="outlined" @click="fecharModalCertificacao">
            {{ t('detalhesPacienteMedico.certificationModal.cancel') }}
          </v-btn>
          <v-btn color="blue" variant="flat" @click="salvarCertificacao" :loading="loadingSubmit">
            {{ t('detalhesPacienteMedico.certificationModal.certify') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="modalExame" max-width="600px" rounded="lg">
      <v-card v-if="exameSelecionado">
        <v-card-title :class="exameSelecionado.tipo === 'consulta' ? 'bg-blue' : 'bg-green'" class="text-white pa-4">
          <v-icon class="mr-2">{{
            exameSelecionado.tipo === 'consulta'
              ? 'mdi-stethoscope'
              : 'mdi-pill'
          }}</v-icon>
          {{ exameSelecionado.medico?.usuario?.nome || exameSelecionado.fisioterapeuta?.usuario?.nome}}
          <span v-if="exameSelecionado.medico?.especializacao">
            - {{ exameSelecionado.medico?.especializacao }}
          </span>
        </v-card-title>

        <v-card-text class="pa-0">
          <div class="pa-4 border-b">
            <v-row>
              <v-col cols="6">
                <div class="d-flex align-center mb-2">
                  <v-icon color="blue" class="mr-2">mdi-calendar</v-icon>
                  <div>
                    <div class="text-caption text-grey">{{ t('detalhesPaciente.appointmentDate') }}</div>
                    <div class="font-weight-medium">
                      {{ formatarDataLocal(exameSelecionado.createdAt) }}
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="d-flex align-center mb-2">
                  <v-icon :color="exameSelecionado.tipo === 'consulta' ? 'blue' : 'green'
                    " class="mr-2">
                    {{
                      exameSelecionado.tipo === 'consulta'
                        ? 'mdi-stethoscope'
                        : 'mdi-pill'
                    }}
                  </v-icon>
                  <div>
                    <div class="text-caption text-grey">{{ t('detalhesPacienteMedico.appointmentDetails.type') }}</div>
                    <div class="font-weight-medium text-capitalize">
                      {{ t('detalhesPacienteMedico.appointmentDetails.appointment') }}
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>

          <div class="pa-4 border-b">
            <div class="d-flex align-start">
              <v-icon color="blue-darken-1" class="mr-2 mt-1">mdi-clipboard-pulse</v-icon>
              <div class="flex-grow-1">
                <div class="text-subtitle-2 mb-2">{{ t('detalhesPaciente.diagnosis') }}</div>
                <p class="text-body-2 mb-0" style="word-break: break-word; overflow-wrap: break-word">
                  {{ exameSelecionado.diagnostico }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="exameSelecionado.medicamentosReceitados" class="pa-4 border-b">
            <div class="d-flex align-start">
              <v-icon color="green" class="mr-2 mt-1">mdi-pill</v-icon>
              <div class="flex-grow-1">
                <div class="text-subtitle-2 mb-2">{{ t('detalhesPaciente.prescribedMedications') }}</div>
                <p class="text-body-2 mb-0" style="word-break: break-word; overflow-wrap: break-word">
                  {{ exameSelecionado.medicamentosReceitados }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="exameSelecionado.situacao" class="pa-4">
            <div class="d-flex align-start">
              <v-icon color="blue-darken-1" class="mr-2 mt-1">mdi-note-text</v-icon>
              <div class="flex-grow-1">
                <div class="text-subtitle-2 mb-2">{{ t('detalhesPaciente.situation') }}</div>
                <p class="text-body-2 mb-0" style="word-break: break-word; overflow-wrap: break-word">
                  {{ traduzirStatus(exameSelecionado.situacao) }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="exameSelecionado.situacao == 'Concluido'" class="pa-4">
            <div class="d-flex align-start">
              <div class="flex-grow-1">
                <div class="">
                  <v-btn class="text-subtitle-1" block color="blue" variant="outlined" :disabled="temLicencaAtiva || medicoId != exameSelecionado.medicoId"
                    @click="certificarAtleta">
                    <v-icon class="mr-2">mdi-certificate</v-icon>
                    {{ t('detalhesPacienteMedico.appointmentDetails.certifyAthlete') }}
                  </v-btn>
                  <v-alert v-if="temLicencaAtiva" type="warning" variant="tonal" density="compact" class="mt-2">
                    {{ t('detalhesPacienteMedico.appointmentDetails.certificateWarning') }}
                  </v-alert>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn color="blue" variant="outlined" @click="modalExame = false">
            {{ t('detalhesPacienteMedico.appointmentDetails.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { formatarDataHoraLocal, formatarDataLocal } from '@/utils/date.utils'
import alergiasService from '@/services/alergias/alergias-service'
import atletaService from '@/services/atleta/atleta-service'
import consultasService from '@/services/consultas/consultas-service'
import licencaCertificadoService from '@/services/licenca-certificado/licenca-certificado-service'
import { getMedicoId } from '@/utils/auth'
import dayjs from 'dayjs'
import { vMaska } from 'maska/vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { getErrorMessage } from '@/common/error.utils'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const router = useRouter()
const route = useRoute()

const paciente = ref(null)
const medicoId = ref(null)
const loading = ref(true)
const historicoMedicoExpanded = ref(false)
const modulosContratadosExpanded = ref(false)
const moduloSelecionado = ref(null)
const alergiasExpanded = ref(true)
const modalExame = ref(false)
const exameSelecionado = ref(null)
const consultas = ref([])
const alergias = ref([])
const loadingAlergias = ref(true)
const licenca = ref([])
const modalCertificarAtleta = ref(false)
const opcaoMesesValidade = ref(null)
const mesesValidadeCustomizado = ref(null)
const loadingSubmit = ref(false)

const opcoesMeses = [
  { text: '1 mês', value: 1 },
  { text: '3 meses', value: 3 },
  { text: '6 meses', value: 6 },
  { text: '9 meses', value: 9 },
  { text: '12 meses', value: 12 },
  { text: 'Outro', value: 'outro' }
]

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
  const date = dayjs(data)
  return locale.value === 'pt' ? date.format('DD/MM/YYYY') : date.format('MM/DD/YYYY')
}

const traduzirRole = (role) => {
  if (!role) return t('detalhesPaciente.professionalNotIdentified')
  const roleMap = {
    'atleta': t('detalhesPaciente.role.atleta'),
    'medico': t('detalhesPaciente.role.medico'),
    'fisioterapeuta': t('detalhesPaciente.role.fisioterapeuta'),
    'treinador': t('detalhesPaciente.role.treinador')
  }
  return roleMap[role.toLowerCase()] || role
}

const traduzirStatus = (status) => {
  if (!status) return ''
  const statusMap = {
    'Concluido': t('detalhesPaciente.status.Concluido'),
    'Recusado': t('detalhesPaciente.status.Recusado'),
    'Cancelada': t('detalhesPaciente.status.Cancelada'),
    'Marcado': t('detalhesPaciente.status.Marcado'),
    'Pendente': t('detalhesPaciente.status.Pendente')
  }
  return statusMap[status] || status
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

const getSituacaoColor = (situacao) => {
  if (!situacao) return 'grey'
  const situacaoLower = situacao.toLowerCase()
  if (situacaoLower.includes('concluido') || situacaoLower.includes('concluído')) {
    return 'success'
  } else if (situacaoLower.includes('pendente')) {
    return 'warning'
  } else if (situacaoLower.includes('recusado')) {
    return 'error'
  } else if (situacaoLower.includes('cancelada') || situacaoLower.includes('cancelada')) {
    return 'info'
  } else if (situacaoLower.includes('cancelada')) {
    return 'grey'
  }
  return 'blue-darken-1'
}

const getSituacaoClass = (situacao) => {
  return 'font-weight-medium'
}

const certificarAtleta = () => {
  opcaoMesesValidade.value = 1
  mesesValidadeCustomizado.value = null
  modalCertificarAtleta.value = true
}

const fecharModalCertificacao = () => {
  modalCertificarAtleta.value = false
  opcaoMesesValidade.value = null
  mesesValidadeCustomizado.value = null
}

const salvarCertificacao = async () => {
  if (!opcaoMesesValidade.value) {
    alert(t('detalhesPacienteMedico.certificationModal.validationRule'))
    return
  }

  let mesesValidade = 0
  if (opcaoMesesValidade.value === 'outro') {
    const meses = Number(mesesValidadeCustomizado.value)
    if (!mesesValidadeCustomizado.value || meses < 1) {
      alert(t('detalhesPacienteMedico.certificationModal.validationRule'))
      return
    }
    if (meses > 12) {
      alert(t('detalhesPacienteMedico.certificationModal.validationRule'))
      return
    }
    mesesValidade = meses
  } else {
    mesesValidade = opcaoMesesValidade.value
  }
  try {
    loadingSubmit.value = true
    await licencaCertificadoService.postLicencaCertificado({
      atletaId: paciente.value.id,
      medicoId: getMedicoId(),
      validade: dayjs().add(mesesValidade, 'month').toISOString(),
      consultaId: exameSelecionado.value.id,
      ativo: true
    }).then((resp) => {
      if (resp.success) {
        toast.success(t('detalhesPacienteMedico.appointmentDetails.certifyAthlete'))
        fecharModalCertificacao()
        loadingSubmit.value = false
        buscarLicencaPorAtletaId(route.params.id || route.query.id)
      }
    })

  } catch (error) {
    toast.error(getErrorMessage(error, t('detalhesPacienteMedico.certificationModal.validationRule')))
    loadingSubmit.value = false
  }
}

const voltarParaLista = () => {
  router.back()
}

const toggleHistoricoMedico = () => {
  historicoMedicoExpanded.value = !historicoMedicoExpanded.value
}

const toggleModulosContratados = () => {
  modulosContratadosExpanded.value = !modulosContratadosExpanded.value
}

const toggleAlergias = () => {
  alergiasExpanded.value = !alergiasExpanded.value
}

const abrirModalExame = (item) => {
  console.log('Consulta selecionada:', item)
  exameSelecionado.value = item
  modalExame.value = true
}

const toggleFavorito = (item) => {
  item.favorito = !item.favorito
}

const findAllConsultas = async (id) => {
  try {
    const response = await consultasService.getConsultasByAtletaId(id)
    let consultasData = response && response.data ? response.data : response

    consultas.value = consultasData.filter(consulta => {
      return consulta.situacao === 'Concluido'
    })
  } catch (error) {
    if (error.response?.status === 404) {
      consultas.value = []
    } else {
      console.error('Erro ao buscar consultas:', error)
      consultas.value = []
    }
  }
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

const buscarLicencaPorAtletaId = async (id) => {
  try {
    const response = await licencaCertificadoService.getByAtletaId(id)

    if (response && response.success) {
      licenca.value = response.data?.at(-1)
    }
  }
  catch (error) {
    toast.error(getErrorMessage(error, 'Erro desconhecido'))
    loading.value = false
  }
}

const temLicencaAtiva = computed(() => {
  if (!licenca.value) {
    return false
  }

  // Verifica se a licença está ativa
  if (licenca.value.ativo !== true) {
    return false
  }

  // Verifica se a data de validade ainda não expirou
  if (licenca.value.validade) {
    const dataValidade = dayjs(licenca.value.validade)
    const hoje = dayjs()
    return dataValidade.isAfter(hoje)
  }

  return true
})

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
  medicoId.value = getMedicoId()
  if (pacienteId) {
    buscarPaciente(pacienteId)
    findAllConsultas(pacienteId)
    findAllAlergias(pacienteId)
    buscarLicencaPorAtletaId(pacienteId)
  } else {
    console.error('ID do paciente não encontrado na rota')
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

.info-item {
  transition: all 0.2s ease;
}

.list-item-hover {
  transition: all 0.3s ease;
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

:deep(.certification-dialog .v-overlay__scrim) {
  background-color: rgba(0, 0, 0, 0.5) !important;
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
