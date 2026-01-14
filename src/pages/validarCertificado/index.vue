<template>
  <v-container class="d-flex align-center justify-center" :class="containerClass">
    <v-row justify="center" class="w-100 ma-0">
      <v-col cols="12" sm="12" md="11" lg="9" xl="8" class="pa-2 pa-sm-4">
        <v-card
          class="pa-4 pa-sm-6"
          elevation="3"
          rounded="xl"
          :style="{
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
          }"
        >
          <!-- Loading State -->
          <div v-if="loading" class="text-center py-6 py-sm-8">
            <v-progress-circular
              indeterminate
              color="light-blue-accent-3"
              :size="display.mobile ? 48 : 64"
            />
            <p class="text-body-2 text-sm-body-1 mt-4 text-grey px-2">
              {{ t('validarCertificado.loading') }}
            </p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-6 py-sm-8">
            <v-icon :size="display.mobile ? 60 : 80" color="error">mdi-alert-circle</v-icon>
            <h2 class="text-h6 text-sm-h5 font-weight-bold mt-3 mt-sm-4 mb-2 px-2" style="color: #f44336">
              {{ t('validarCertificado.errorTitle') }}
            </h2>
            <p class="text-body-2 text-sm-body-1 text-grey mb-4 px-2">
              {{ error }}
            </p>
            <v-btn
              color="light-blue-accent-3"
              variant="flat"
              rounded="lg"
              size="small"
              class="mt-2 p-20"
              @click="$router.push('/')"
            >
              {{ t('validarCertificado.backToHome') }}
            </v-btn>
          </div>

          <!-- Success State -->
          <div v-else-if="licenca">
            <!-- Status Icon -->
            <div class="text-center mb-4 mb-sm-6">
              <v-icon
                :size="display.mobile ? 80 : 120"
                :color="isValido ? 'success' : 'error'"
                class="mb-2 mb-sm-4"
              >
                {{ isValido ? 'mdi-check-circle' : 'mdi-close-circle' }}
              </v-icon>
              <h2
                class="text-h6 text-sm-h5 text-md-h4 font-weight-bold mb-2 px-2"
                :style="{ color: isValido ? '#42A5F5' : '#f44336' }"
              >
                {{ isValido ? t('validarCertificado.validCertificate') : t('validarCertificado.invalidCertificate') }}
              </h2>
              <p class="text-body-2 text-sm-body-1 text-grey px-2">
                {{ t('validarCertificado.certificateInfo') }}
              </p>
            </div>

            <v-card
              variant="outlined"
              class="pa-3 pa-sm-4 mb-4"
              rounded="lg"
              style="background-color: rgba(0, 198, 254, 0.05); border-color: rgba(0, 198, 254, 0.2) !important;"
            >
              <div class="d-flex flex-wrap gap-4 gap-sm-6">
                <div class="flex-grow-1" style="min-width: 150px">
                  <div class="d-flex align-center mb-2">
                    <v-icon size="18" color="light-blue-accent-3" class="mr-2">mdi-upload</v-icon>
                    <span class="text-caption text-grey-darken-1 font-weight-medium">
                      {{ t('validarCertificado.uploadDate') }}
                    </span>
                  </div>
                  <div class="text-body-2 text-sm-body-1 font-weight-bold">
                    {{ formatarData(licenca.createdAt) || '--' }}
                  </div>
                </div>
                <v-divider vertical class="mx-2 d-none d-sm-flex" />
                <div class="flex-grow-1" style="min-width: 150px">
                  <div class="d-flex align-center mb-2">
                    <v-icon size="18" color="light-blue-accent-3" class="mr-2">mdi-calendar-check</v-icon>
                    <span class="text-caption text-grey-darken-1 font-weight-medium">
                      {{ t('validarCertificado.validityDate') }}
                    </span>
                  </div>
                  <div
                    class="text-body-2 text-sm-body-1 font-weight-bold"
                    :style="{ color: isValido ? '#42A5F5' : '#f44336' }"
                  >
                    {{ formatarData(licenca.validade) || '--' }}
                  </div>
                </div>
              </div>
            </v-card>

            <v-card
              v-if="atleta"
              variant="outlined"
              class="mb-4"
              rounded="lg"
              style="border-left: 4px solid #42A5F5; border-color: rgba(0, 198, 254, 0.2) !important;"
            >
              <v-card-title class="pa-3 pa-sm-4 pb-2">
                <div class="d-flex align-center">
                  <v-icon :size="display.mobile ? 20 : 24" color="light-blue-accent-3" class="mr-2">mdi-account</v-icon>
                  <span class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold" style="color: #42A5F5">
                    {{ t('validarCertificado.athlete') }}
                  </span>
                </div>
              </v-card-title>
              <v-card-text class="pa-3 pa-sm-4 pt-2">
                <v-row dense>
                  <v-col cols="12" sm="6" md="6">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">
                        {{ t('validarCertificado.name') }}
                      </div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ atleta?.usuario?.nome || '--' }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" v-if="atleta?.usuario?.email">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">
                        {{ t('validarCertificado.email') }}
                      </div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium" style="word-break: break-all; white-space: normal;">
                        {{ atleta.usuario.email }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="atleta?.dataNascimento">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">
                        {{ t('validarCertificado.birthDate') }}
                      </div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ formatarData(atleta.dataNascimento) }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="atleta?.dataNascimento">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">
                        {{ t('validarCertificado.age') }}
                      </div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ calcularIdade(atleta.dataNascimento) }} {{ t('validarCertificado.years') }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="atleta?.telefone">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">
                        {{ t('validarCertificado.phone') }}
                      </div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ atleta.telefone }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card
              v-if="medico"
              variant="outlined"
              class="mb-4"
              rounded="lg"
              style="border-left: 4px solid #42A5F5; border-color: rgba(0, 198, 254, 0.2) !important;"
            >
              <v-card-title class="pa-3 pa-sm-4 pb-2">
                <div class="d-flex align-center">
                  <v-icon :size="display.mobile ? 20 : 24" color="light-blue-accent-3" class="mr-2">mdi-doctor</v-icon>
                  <span class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold" style="color: #42A5F5">
                    {{ t('validarCertificado.doctor') }}
                  </span>
                </div>
              </v-card-title>
              <v-card-text class="pa-3 pa-sm-4 pt-2">
                <v-row dense>
                  <v-col cols="12" sm="6" md="4">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">
                        {{ t('validarCertificado.name') }}
                      </div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ medico?.usuario?.nome || medico?.nome || '--' }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="medico?.crm">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">
                        {{ t('validarCertificado.crm') }}
                      </div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ medico.crm }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="medico?.especializacao">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">
                        {{ t('validarCertificado.specialization') }}
                      </div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ medico.especializacao }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" sm="6" md="4" v-if="medico?.especializacao">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">
                        {{ t('validarCertificado.phone') }}
                      </div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ medico.telefone }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Botão Voltar -->
            <div class="text-center">
              <v-btn
                color="light-blue-accent-3"
                variant="flat"
                rounded="lg"
                size="small"
                class="mt-2"
                block
                @click="$router.push('/')"
              >
                {{ t('validarCertificado.backToHome') }}
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/pt-br'
import licencaCertificadoService from '@/services/licenca-certificado/licenca-certificado-service'
import atletaService from '@/services/atleta/atleta-service'
import medicoService from '@/services/medico/medico-service'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

dayjs.extend(utc)
dayjs.extend(timezone)

const route = useRoute()
const display = useDisplay()
const loading = ref(true)
const licenca = ref(null)
const error = ref(null)
const atleta = ref(null)
const medico = ref(null)

const containerClass = computed(() => {
  return display.mobile ? 'px-2 py-4' : 'px-4 py-8'
})

const getUserTimezone = () => {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return timeZone
  } catch (e) {
    try {
      return dayjs.tz.guess()
    } catch (e2) {
      return 'America/Sao_Paulo'
    }
  }
}

const temTimezone = (dataString) => {
  if (typeof dataString !== 'string') return false
  return dataString.includes('Z') ||
         dataString.match(/[+-]\d{2}:\d{2}$/) !== null ||
         dataString.match(/[+-]\d{4}$/) !== null
}

const isValido = computed(() => {
  if (!licenca.value) return false

  if (licenca.value.ativo !== true) {
    return false
  }

  if (licenca.value.validade) {
    try {
      const userTimezone = getUserTimezone()
      const dataValidadeString = licenca.value.validade.toString()
      let dataValidade

      // Se a data tem timezone explícito, dayjs já detecta automaticamente
      if (temTimezone(dataValidadeString)) {
        dataValidade = dayjs(licenca.value.validade)
      } else {
        // Se não tem timezone, assume UTC (padrão de APIs REST)
        dataValidade = dayjs.utc(licenca.value.validade)
      }

      // Se não é válida, tenta parse normal como fallback
      if (!dataValidade.isValid()) {
        dataValidade = dayjs(licenca.value.validade)
      }

      // Converte para o timezone do dispositivo do usuário
      if (dataValidade.isValid()) {
        const dataValidadeUsuario = dataValidade.tz(userTimezone)
        const agoraUsuario = dayjs().tz(userTimezone)
        return dataValidadeUsuario.isAfter(agoraUsuario)
      }
    } catch (e) {
      console.error('Erro ao validar data:', e)
      // Fallback: validação simples sem timezone
      return dayjs(licenca.value.validade).isAfter(dayjs())
    }
  }

  return false
})

const formatarData = (data) => {
  if (!data) return '--'
  try {
    const userTimezone = getUserTimezone()
    const dataString = data.toString()
    let dataParsed

    if (temTimezone(dataString)) {
      dataParsed = dayjs(data)
    } else {
      dataParsed = dayjs.utc(data)
    }

    if (!dataParsed.isValid()) {
      dataParsed = dayjs(data)
    }

    if (dataParsed.isValid()) {
      const formato = locale.value === 'pt' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'
      return dataParsed.tz(userTimezone).format(formato)
    }

    return '--'
  } catch (e) {
    console.error('Erro ao formatar data:', e)
    const formato = locale.value === 'pt' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'
    return dayjs(data).isValid() ? dayjs(data).format(formato) : '--'
  }
}

const calcularIdade = (dataNascimento) => {
  if (!dataNascimento) return '--'
  try {
    const userTimezone = getUserTimezone()
    const hoje = dayjs().tz(userTimezone)
    // Para calcular idade, usamos apenas a data (sem hora), então não precisa converter timezone
    const nascimento = dayjs(dataNascimento)

    if (!nascimento.isValid()) return '--'

    let idade = hoje.diff(nascimento, 'year')
    const mes = hoje.diff(nascimento, 'month') % 12
    if (mes < 0 || (mes === 0 && hoje.date() < nascimento.date())) {
      idade--
    }
    return idade
  } catch (e) {
    console.error('Erro ao calcular idade:', e)
    // Fallback: cálculo simples sem timezone
    const hoje = dayjs()
    const nascimento = dayjs(dataNascimento)
    let idade = hoje.diff(nascimento, 'year')
    const mes = hoje.diff(nascimento, 'month') % 12
    if (mes < 0 || (mes === 0 && hoje.date() < nascimento.date())) {
      idade--
    }
    return idade
  }
}

const buscarAtleta = async (atletaId) => {
  try {
    if (!atletaId) return
    const response = await atletaService.getAtletaById(atletaId)
    atleta.value = response.data || response
  } catch (error) {
    console.error('Erro ao buscar atleta:', error)
    atleta.value = null
  }
}

const buscarMedico = async (medicoId) => {
  try {
    if (!medicoId) return
    const response = await medicoService.getMedicoById(medicoId)
    medico.value = response.data || response
  } catch (error) {
    console.error('Erro ao buscar médico:', error)
    medico.value = null
  }
}

const buscarLicenca = async () => {
  try {
    loading.value = true
    error.value = null

    const licencaId = route.query.id || route.params.id

    if (!licencaId) {
      error.value = t('validarCertificado.errorIdNotProvided')
      return
    }

    const response = await licencaCertificadoService.getLicencaCertificadoById(licencaId)

    licenca.value = response.data || response

    if (licenca.value) {
      if (licenca.value.atletaId) {
        await buscarAtleta(licenca.value.atletaId)
      }

      if (licenca.value.medicoId) {
        await buscarMedico(licenca.value.medicoId)
      }
    }
  } catch (err) {
    error.value = err.response?.data?.message || t('validarCertificado.errorLoadingInfo')
    licenca.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  buscarLicenca()
})
</script>

<style scoped>
.gap-4 {
  gap: 16px;
}

.w-100 {
  width: 100%;
}

.info-field {
  padding: 8px 0;
}

@media (max-width: 599px) {
  .v-container {
    min-height: calc(100vh - 56px) !important;
  }
}

@media (min-width: 600px) {
  .v-container {
    min-height: calc(100vh - 64px) !important;
  }
}
</style>


