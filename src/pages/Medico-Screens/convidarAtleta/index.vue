<template>
  <v-container class="py-6" fluid>

    <!-- Hero Header -->
    <v-row justify="center" class="mb-6">
      <v-col cols="12">
        <v-card class="hero-card" elevation="0" rounded="lg">
          <div class="hero-overlay"></div>
          <v-card-text class="pa-6 position-relative">
            <div class="d-flex align-center">
              <div class="icon-wrapper-large mr-4">
                <v-icon size="40" color="white">mdi-email-plus-outline</v-icon>
              </div>
              <div>
                <h1 class="text-h5 font-weight-bold text-white mb-1" style="letter-spacing: 0.3px;">{{ t('convidarAtleta.title') }}</h1>
                <p class="text-subtitle-1 text-white mb-0" style="opacity: 0.9;">{{ t('convidarAtleta.subtitle') }}</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Formulário (esquerda) + Listagem (direita) -->
    <v-row justify="center" class="mb-6">
      <v-col cols="12" lg="6">
        <v-card elevation="2" rounded="lg" class="main-card">
          <v-card-title class="pa-5 form-header-bg">
            <div class="d-flex align-center py-2">
              <div class="icon-wrapper mr-3">
                <v-icon color="white" size="20">mdi-account-plus-outline</v-icon>
              </div>
              <span class="text-subtitle-1 font-weight-bold text-white" style="letter-spacing:0.3px">{{ t('convidarAtleta.form.athleteData') }}</span>
            </div>
          </v-card-title>
          <v-card-text class="pa-5">
            <v-form ref="formRef" @submit.prevent="enviarConvite">
              <v-row dense>
                <v-col cols="12" md="6">
                  <v-text-field v-model="form.nome" :label="t('convidarAtleta.form.name')" variant="outlined" density="compact" prepend-inner-icon="mdi-account-outline" :rules="[v => !!v || t('convidarAtleta.validation.required')]" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="form.cpf" :label="t('convidarAtleta.form.cpf')" variant="outlined" density="compact" prepend-inner-icon="mdi-card-account-details-outline" v-maska="'###.###.###-##'" :rules="[v => !!v || t('convidarAtleta.validation.required'), v => v.replace(/\D/g, '').length === 11 || t('convidarAtleta.validation.invalidCpf')]" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="form.email" :label="t('convidarAtleta.form.email')" variant="outlined" density="compact" prepend-inner-icon="mdi-email-outline" type="email" :rules="[v => !!v || t('convidarAtleta.validation.required'), v => /.+@.+\..+/.test(v) || t('convidarAtleta.validation.invalidEmail')]" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="form.telefone" :label="t('convidarAtleta.form.phone')" variant="outlined" density="compact" prepend-inner-icon="mdi-phone-outline" v-maska="'(##) #####-####'" :rules="[v => !!v || t('convidarAtleta.validation.required'), v => v.replace(/\D/g, '').length === 11 || t('convidarAtleta.validation.invalidPhone')]" />
                </v-col>
              </v-row>

              <v-divider class="my-4" />
              <p class="dialog-section-label">{{ t('convidarAtleta.form.certificationPeriod') }}</p>

              <v-row dense>
                <v-col cols="12" md="6">
                  <v-select v-model="opcaoMesesValidade" :label="t('convidarAtleta.form.validityMonths')" :items="opcoesMeses" item-title="text" item-value="value" variant="outlined" density="compact" prepend-inner-icon="mdi-calendar-clock" :rules="[v => !!v || t('convidarAtleta.validation.required')]" />
                </v-col>
                <v-col cols="12" md="6" v-if="opcaoMesesValidade === 'outro'">
                  <v-text-field v-model.number="mesesValidadeCustomizado" :label="t('convidarAtleta.form.customMonths')" variant="outlined" density="compact" type="number" prepend-inner-icon="mdi-numeric" v-maska="'##'" :rules="[v => !!v || t('convidarAtleta.validation.required'), v => (v >= 1 && v <= 24) || t('convidarAtleta.validation.monthsRange')]" />
                </v-col>
                <v-col cols="12" v-if="dataValidade">
                  <v-alert type="info" variant="tonal" density="compact" rounded="lg">
                    <v-icon start>mdi-calendar-check</v-icon>
                    {{ t('convidarAtleta.form.validUntil') }}: <strong>{{ dataValidade }}</strong>
                  </v-alert>
                </v-col>
              </v-row>

              <v-divider class="my-4" />
              <div class="d-flex ga-3 justify-space-between">
                <v-btn variant="text" color="grey-darken-1" @click="router.back()">{{ t('convidarAtleta.buttons.cancel') }}</v-btn>
                <v-btn color="blue-darken-2" variant="flat" rounded="lg" class="px-6" type="submit" :loading="loading" prepend-icon="mdi-send">{{ t('convidarAtleta.buttons.send') }}</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6">
        <v-card elevation="2" rounded="lg" class="main-card" height="100%">
          <v-card-title class="pa-5 list-header-bg">
            <div class="d-flex align-center justify-space-between w-100">
              <div class="d-flex align-center">
                <div class="icon-wrapper mr-3">
                  <v-icon color="white" size="20">mdi-account-multiple-outline</v-icon>
                </div>
                <div>
                  <span class="text-subtitle-1 font-weight-bold text-white" style="letter-spacing:0.3px">{{ t('convidarAtleta.list.title') }}</span>
                  <div class="text-caption text-white" style="opacity:0.8;">{{ convites.length }} {{ t('convidarAtleta.list.count') }}</div>
                </div>
              </div>
              <v-btn icon="mdi-refresh" size="small" variant="flat" color="white" @click="carregarConvites" :loading="loadingList"></v-btn>
            </div>
          </v-card-title>

          <v-card-text class="pa-0">
            <div class="invited-list">
              <div v-if="loadingList" class="pa-5">
                <v-skeleton-loader v-for="n in 3" :key="n" type="list-item-avatar-two-line" class="mb-2" />
              </div>

              <template v-else-if="convites.length">
                <div v-for="(convite, i) in convites" :key="i" class="invited-item">
                  <div class="d-flex align-center">
                    <v-avatar size="42" color="#e3f0ff" class="mr-3">
                      <v-icon color="#1565c0" size="22">mdi-account</v-icon>
                    </v-avatar>
                    <div class="flex-grow-1">
                      <div class="font-weight-bold text-body-2 mb-1">{{ convite.nome }}</div>
                      <div class="text-caption text-grey">{{ convite.email }} · {{ formatarTelefone(convite.telefone) }}</div>
                    </div>
                    <div class="d-flex flex-column align-end ga-1">
                      <span class="text-caption text-grey">{{ convite.validade ? formatarData(convite.validade) : '—' }}</span>
                      <span class="text-caption text-grey">{{ formatarData(convite.createdAt) }}</span>
                    </div>
                  </div>
                </div>
              </template>

              <div v-else class="pa-8 text-center">
                <v-icon size="48" color="grey-lighten-2">mdi-email-off-outline</v-icon>
                <p class="text-body-2 text-grey mt-3 mb-0">{{ t('convidarAtleta.list.empty') }}</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Cards informativos no rodapé -->
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card elevation="2" rounded="lg" class="info-card" style="border-left: 3px solid #1E88E5;">
          <v-card-text class="pa-5">
            <div class="d-flex align-center ga-2 mb-2">
              <v-icon color="blue-darken-1" size="20">mdi-information-outline</v-icon>
              <span class="text-subtitle-2 font-weight-bold text-grey-darken-3">{{ t('convidarAtleta.infoCards.about.title') }}</span>
            </div>
            <p class="text-body-2 text-grey-darken-2 mb-0" style="line-height: 1.7;" v-html="t('convidarAtleta.infoCards.about.text')"></p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="2" rounded="lg" class="info-card" style="border-left: 3px solid #43A047;">
          <v-card-text class="pa-5">
            <div class="d-flex align-center ga-2 mb-2">
              <v-icon color="green-darken-1" size="20">mdi-certificate-outline</v-icon>
              <span class="text-subtitle-2 font-weight-bold text-grey-darken-3">{{ t('convidarAtleta.infoCards.certificate.title') }}</span>
            </div>
            <p class="text-body-2 text-grey-darken-2 mb-0" style="line-height: 1.7;">{{ t('convidarAtleta.infoCards.certificate.text') }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="2" rounded="lg" class="info-card" style="border-left: 3px solid #FB8C00;">
          <v-card-text class="pa-5">
            <div class="d-flex align-center ga-2 mb-2">
              <v-icon color="orange-darken-1" size="20">mdi-shield-alert-outline</v-icon>
              <span class="text-subtitle-2 font-weight-bold text-grey-darken-3">{{ t('convidarAtleta.infoCards.responsibility.title') }}</span>
            </div>
            <p class="text-body-2 text-grey-darken-2 mb-0" style="line-height: 1.7;" v-html="t('convidarAtleta.infoCards.responsibility.text')"></p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { vMaska } from 'maska/vue'
import { toast } from 'vue3-toastify'
import dayjs from 'dayjs'
import medicoService from '@/services/medico/medico-service'

const { t, locale } = useI18n()
const router = useRouter()

const formRef = ref(null)
const loading = ref(false)
const loadingList = ref(false)
const convites = ref([])

const form = ref({
  nome: '',
  cpf: '',
  email: '',
  telefone: '',
})

const opcaoMesesValidade = ref(null)
const mesesValidadeCustomizado = ref(null)

const opcoesMeses = [
  { text: '1 mês', value: 1 },
  { text: '3 meses', value: 3 },
  { text: '6 meses', value: 6 },
  { text: '9 meses', value: 9 },
  { text: '12 meses', value: 12 },
  { text: 'Outro', value: 'outro' },
]

const mesesEfetivos = computed(() => {
  if (opcaoMesesValidade.value === 'outro') return mesesValidadeCustomizado.value || 0
  return opcaoMesesValidade.value || 0
})

const dataValidade = computed(() => {
  if (!mesesEfetivos.value || mesesEfetivos.value < 1) return null
  const data = dayjs().add(mesesEfetivos.value, 'month')
  return locale.value === 'pt' ? data.format('DD/MM/YYYY') : data.format('MM/DD/YYYY')
})

const formatarData = (data) => {
  if (!data) return ''
  return locale.value === 'pt' ? dayjs(data).format('DD/MM/YYYY') : dayjs(data).format('MM/DD/YYYY')
}

const formatarTelefone = (tel) => {
  if (!tel) return ''
  const n = tel.replace(/\D/g, '')
  if (n.length === 11) return n.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  if (n.length === 10) return n.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  return tel
}

const carregarConvites = async () => {
  try {
    loadingList.value = true
    const resp = await medicoService.getConvitesAtletas(1, 20)
    convites.value = resp?.data?.itens ?? []
  } catch {
    convites.value = []
  } finally {
    loadingList.value = false
  }
}

const enviarConvite = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  if (opcaoMesesValidade.value === 'outro') {
    const meses = Number(mesesValidadeCustomizado.value)
    if (!meses || meses < 1 || meses > 24) {
      toast.error(t('convidarAtleta.validation.monthsRange'))
      return
    }
  }

  try {
    loading.value = true
    await medicoService.postConvidarAtleta({
      nome: form.value.nome,
      cpf: form.value.cpf.replace(/\D/g, ''),
      telefone: form.value.telefone,
      email: form.value.email,
      validade: dayjs().add(mesesEfetivos.value, 'month').toISOString(),
    })
    toast.success(t('convidarAtleta.toast.success'))
    formRef.value.reset()
    opcaoMesesValidade.value = null
    mesesValidadeCustomizado.value = null
    carregarConvites()
  } catch (error) {
    toast.error(t('convidarAtleta.toast.error'))
  } finally {
    loading.value = false
  }
}

onMounted(carregarConvites)
</script>

<style scoped>
.hero-card {
  background: linear-gradient(135deg, #1565c0, #1e88e5);
  position: relative;
  overflow: hidden;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.08);
}
.icon-wrapper-large {
  background: rgba(255,255,255,0.2);
  border-radius: 12px;
  padding: 10px;
  display: flex;
}
.icon-wrapper {
  background: rgba(255,255,255,0.2);
  border-radius: 8px;
  padding: 6px;
  display: flex;
}
.form-header-bg {
  background: linear-gradient(135deg, #1565c0, #1e88e5);
}
.list-header-bg {
  background: linear-gradient(135deg, #2e7d32, #43a047);
}
.main-card, .info-card {
  border: 1px solid #e0e0e0;
}
.invited-list {
  max-height: 420px;
  overflow-y: auto;
}
.invited-item {
  padding: 14px 20px;
  border-bottom: 1px solid #f0f0f0;
}
.invited-item:last-child {
  border-bottom: none;
}
.dialog-section-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #757575;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 8px;
}
</style>
