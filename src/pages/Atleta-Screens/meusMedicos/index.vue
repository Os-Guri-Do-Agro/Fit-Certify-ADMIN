<template>
  <v-container class="py-10">
    <div class="header-section">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <v-icon size="40" color="white">mdi-doctor</v-icon>
        </div>
        <h1 class="header-title">{{ $t('meusMedicos.title') }}</h1>
        <p class="header-subtitle">{{ $t('meusMedicos.subtitle') }}</p>
      </div>
    </div>

    <v-row justify="center" class="mb-10 mt-8">
      <v-btn-toggle v-model="filtro" rounded="pill" group mandatory class="filter-toggle">
        <v-btn value="lista" variant="flat" class="px-8 text-body-1 font-weight-medium filter-btn" :class="{ 'active-filter': filtro === 'lista' }">
          {{ $t('meusMedicos.myDoctors') }}
        </v-btn>
        <v-btn value="meu" variant="outlined" class="px-8 text-body-1 font-weight-medium filter-btn"
          @click="router.push('/Atleta-Screens/medicos')">
          {{ $t('meusMedicos.searchNewDoctors') }}
        </v-btn>
      </v-btn-toggle>
    </v-row>

    <v-row align="start" justify="center">
      <v-col cols="12" md="10">
        <div v-if="loading">
          <v-skeleton-loader v-for="n in 3" :key="n" class="mb-6 pa-5" type="list-item-avatar-three-line" elevation="2"
            rounded="xl" height="140" />
        </div>

        <div v-else>
          <v-card v-for="(medico, index) in medico" :key="index" class="mb-6 pa-5" elevation="2"
            rounded="xl">
            <v-row align="center">
              <v-col cols="auto" class="text-center">
                <v-avatar size="90" color="grey-lighten-3">
                  <v-img v-if="medico?.avatarUrl" :src="medico?.avatarUrl" cover></v-img>
                  <v-icon v-else size="50" color="grey-darken-1">mdi-account</v-icon>
                </v-avatar>
                <div class="mt-2">
                  <v-btn icon size="small" variant="text">
                    <v-icon size="22" color="black">mdi-instagram</v-icon>
                  </v-btn>
                  <v-btn icon size="small" variant="text">
                    <v-icon size="22" color="black">mdi-whatsapp</v-icon>
                  </v-btn>
                </div>
              </v-col>

              <v-col>
                <div class="text-subtitle-1 font-weight-bold" style="color: black">
                  {{ medico?.usuario?.nome }}
                </div>
                <div class="text-body-2" style="color: black">
                  {{ medico?.especializacao }}
                </div>
                <div class="text-body-2" style="color: black">
                  CRM: {{ medico.crm }}
                </div>

                <v-row align="center" class="mt-3">
                  <v-col cols="auto">
                    <v-btn variant="flat" class="px-8 text-body-2 gradient-btn" rounded
                      @click="detalhesMedico(medico.id)">
                      {{ $t('meusMedicos.moreDetails') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>

          <!-- Paginação -->
          <v-row v-if="!loading && totalPages > 1" justify="center" class="mt-4">
            <v-pagination v-model="page" :length="totalPages" active-color="green" total-visible="4" size="small"
              @update:model-value="mudarPagina" />
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import medicoService from '@/services/medico/medico-service'
import atletaService from '@/services/atleta/atleta-service'
import userService from '@/services/user/user-service'
import { getPayload } from '@/utils/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const filtro = ref('lista')
const page = ref(1)
const pageSize = ref(10)
const totalPages = ref(0)
const loading = ref(true)
const medico = ref([])
const usuario = ref(null)

const buscarUsuario = async () => {
  try {
    const payload = getPayload()
    if (payload?.user?.id) {
      const response = await userService.userById(payload.user.id)
      usuario.value = response
    }
  } catch (error) {
    console.error('erro ao buscar usuário', error)
  }
}

const buscarmeusMedico = async () => {
  try {
    loading.value = true
    const response = await atletaService.findMedicosComConsultasPagined(
      page.value,
      pageSize.value
    )
    medico.value = response.data.itens
    totalPages.value = response.data.totalPages

  } catch (error) {
    console.error('erro ao buscar médicos', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  buscarUsuario()
  buscarmeusMedico()
})

const mudarPagina = (novaPagina) => {
  page.value = novaPagina
  buscarmeusMedico()
}

function detalhesMedico(id) {
  const url = router.resolve({
    name: '/Atleta-Screens/medicoDetalhes/',
    query: { id },
  }).href
  window.open(url, '_blank')
}
</script>

<style scoped>
.header-section {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  padding: 48px 24px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
}

.header-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.header-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.header-subtitle {
  font-size: 1.1rem;
  color: white;
  opacity: 0.95;
  margin: 0;
}

.filter-toggle {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 50px;
}

.filter-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-btn.active-filter {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  color: white !important;
}

.gradient-btn {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  color: white !important;
}
</style>
