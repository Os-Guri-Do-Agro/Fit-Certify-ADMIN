<template>
  <v-container class="py-10">
    <div class="header-section">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <v-icon size="40" color="white">mdi-doctor</v-icon>
        </div>
        <h1 class="header-title">Encontre um Médico</h1>
        <p class="header-subtitle">Encontre um médico parceiro próximo a você e agende sua consulta presencial</p>
      </div>
    </div>

    <v-row justify="center" class="mb-10 mt-8">
      <v-btn-toggle v-model="filtro" rounded="pill" group mandatory class="filter-toggle">
        <v-btn value="lista" variant="flat" class="px-8 text-body-1 font-weight-medium filter-btn" :class="{ 'active-filter': filtro === 'lista' }">
          Lista completa
        </v-btn>
        <v-btn value="meu" variant="outlined" class="px-8 text-body-1 font-weight-medium filter-btn"
          @click="router.push('/Atleta-Screens/meusMedicos')">
          Já tenho meu médico
        </v-btn>
      </v-btn-toggle>
    </v-row>

    <!-- Seção de Busca por Proximidade -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="10">
        <v-card variant="text" rounded="xl">
          <v-card-text class="pa-6">
            <div class="text-center mb-4">
              <v-icon size="32" class="mb-2 gradient-icon">mdi-map-marker-radius</v-icon>
              <h3 class="text-h6 font-weight-bold mb-1">Busca por Proximidade</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">
                Digite seu CEP para encontrar médicos próximos a você
              </p>
            </div>

            <div class="d-flex justify-center">
              <v-text-field
                v-model="userCep"
                @input="cepError = ''"
                @keyup.enter="orderByDistance"
                placeholder="00000-000"
                label="Seu CEP"
                :error="!!cepError"
                :error-messages="cepError"
                variant="outlined"
                rounded="lg"
                density="comfortable"
                color="green"
                class="cep-input-centered"
                prepend-inner-icon="mdi-home-map-marker"
                style="max-width: 400px;"
              >
                <template #append-inner>
                  <v-btn
                    @click="orderByDistance"
                    :disabled="loadingDistance || !userCep.trim()"
                    :loading="loadingDistance"
                    color="green"
                    variant="flat"
                    size="small"
                    rounded="lg"
                    class="me-2"
                  >
                    <v-icon class="me-1">mdi-map-marker-distance</v-icon>
                    Buscar
                  </v-btn>
                </template>
              </v-text-field>
            </div>

            <v-expand-transition>
              <v-alert
                v-if="cepError"
                type="error"
                variant="tonal"
                class="mt-3"
                rounded="lg"
              >
                {{ cepError }}
              </v-alert>
            </v-expand-transition>

            <v-expand-transition>
              <v-alert
                v-if="isDistanceSearch && medico.length > 0"
                type="success"
                variant="tonal"
                class="mt-3"
                rounded="lg"
              >
                Encontrados {{ medico.length }} médicos próximos ordenados por distância
              </v-alert>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row align="start" justify="center" no-gutters>
      <v-col cols="12" md="7" class="pe-md-8">
        <div v-if="loading">
          <v-skeleton-loader v-for="n in 3" :key="n" class="mb-6 pa-5" type="list-item-avatar-three-line" elevation="2"
            rounded="xl" height="140" />
        </div>

        <div v-else>
          <v-card v-for="(medico, index) in medico" :key="index" class="mb-6 pa-5 position-relative" elevation="2"
            rounded="xl">
            <v-btn icon size="small" variant="flat" class="position-absolute gradient-btn"
              style="top: 16px; right: 60px" @click="buscarEnderecoPorCep(medico.cep)">
              <v-icon>mdi-map-marker</v-icon>
            </v-btn>

            <v-row align="center">
              <v-col cols="auto" class="text-center">
                <v-avatar size="90" color="grey-lighten-3">
                  <v-img v-if="medico?.usuario?.avatarUrl" :src="medico?.usuario?.avatarUrl" cover></v-img>
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
                <!-- Mostrar distância se calculada -->
                <div
                  v-if="medico.distance !== undefined && medico.distance !== null"
                  class="distance-text"
                >
                  📍 {{ medico.distance.toFixed(1) }} km de distância
                </div>

                <v-row align="center" class="mt-3">
                  <v-col cols="auto">
                    <v-btn variant="flat" class="px-8 text-body-2 gradient-btn" rounded
                      @click="detalhesMedico(medico.id)">
                      Mais Detalhes
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

      <v-col cols="12" md="5">
        <!-- Seção de Localização -->
        <v-card class="mb-4 mt-10 mt-md-0" rounded="xl" elevation="3">
          <v-card-title class="d-flex align-center pa-4">
            <v-icon class="me-2 gradient-icon">mdi-map-marker-radius</v-icon>
            <span class="text-h6">Localização</span>
          </v-card-title>

          <v-card-text class="pa-4">
            <v-text-field
              v-model="cep"
              label="CEP do consultório"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              color="green"
              :disabled="!cep && !endereco"
              append-inner-icon="mdi-map-search"
              @click:append-inner="buscarEnderecoPorCep(cep)"
              @keyup.enter="buscarEnderecoPorCep(cep)"
              class="mb-3"
            />

            <v-expand-transition>
              <v-card v-if="endereco" variant="tonal" color="green" class="mb-3">
                <v-card-text class="pa-3">
                  <div class="text-subtitle-2 font-weight-bold mb-2 d-flex align-center">
                    <v-icon size="small" class="me-2">mdi-map-marker</v-icon>
                    Endereço Encontrado:
                  </div>
                  <div class="text-body-2 mb-3">{{ endereco }}</div>
                  <v-btn
                    color="green"
                    variant="flat"
                    size="small"
                    @click="abrirGoogleMaps"
                    prepend-icon="mdi-google-maps"
                  >
                    Abrir no Google Maps
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-expand-transition>
          </v-card-text>
        </v-card>

        <!-- Seção do Mapa -->
        <v-card rounded="xl" elevation="3" class="map-container">
          <v-card-title class="d-flex align-center justify-space-between pa-4">
            <div class="d-flex align-center">
              <v-icon class="me-2 gradient-icon">mdi-map</v-icon>
              <span class="text-h6">Visualização</span>
            </div>
            <v-btn
              v-if="mapaUrl"
              icon="mdi-fullscreen"
              variant="text"
              size="small"
              @click="abrirGoogleMaps"
            />
          </v-card-title>

          <v-card-text class="pa-0">
            <div v-if="!mapaUrl" class="map-placeholder">
              <div class="text-center pa-8">
                <v-icon size="64" class="gradient-icon">mdi-map-outline</v-icon>
                <div class="text-h6 mt-4 mb-2">Mapa Interativo</div>
                <div class="text-body-2 text-medium-emphasis">
                  Clique no ícone 📍 de um médico ou digite um CEP<br>
                  para visualizar a localização no mapa
                </div>
              </div>
            </div>

            <div v-else class="map-image-container">
              <v-img
                :src="mapaUrl"
                height="400"
                cover
                class="map-image"
              >
                <template #placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="green" indeterminate />
                  </div>
                </template>
              </v-img>

              <v-btn
                class="map-expand-btn"
                icon="mdi-fullscreen"
                color="green"
                variant="flat"
                size="small"
                @click="abrirGoogleMaps"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import medicoService from '@/services/medico/medico-service'
import userService from '@/services/user/user-service'
import { getPayload } from '@/utils/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const filtro = ref('lista')
const cep = ref('')
const page = ref(1)
const pageSize = ref(3)
const totalPages = ref(0)
const loading = ref(true)
const medico = ref([])
const usuario = ref(null)
const endereco = ref('')
const mapaUrl = ref('')
const coordenadas = ref(null)
const mapKey = ref(import.meta.env.VITE_MAP_KEY)
const buscouCep = ref(false)
const kmTotal = ref(10)

// Estados para busca por distância
const userCep = ref('')
const loadingDistance = ref(false)
const cepError = ref('')
const isDistanceSearch = ref(false)

// Função de cálculo de distância (Haversine)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Função para buscar coordenadas do CEP
const getCoordsFromCEP = async (cep) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${mapKey.value}`
    );
    const data = await response.json();

    if (data.results[0]) {
      const { lat, lng } = data.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar coordenadas:', error);
    return null;
  }
};

// Função principal de ordenação por distância
const orderByDistance = async () => {
  if (!userCep.value.trim()) return;

  cepError.value = '';
  loadingDistance.value = true;

  try {
    // 1. Buscar coordenadas do CEP do usuário
    const userCoords = await getCoordsFromCEP(userCep.value);
    if (!userCoords) {
      cepError.value = 'CEP inválido ou não encontrado';
      return;
    }

    // 2. Buscar todos os médicos primeiro
    const allMedicosResponse = await medicoService.getMedicoFindAllPagined(1, 1000);
    let allMedicos = allMedicosResponse.data.itens;

    // Buscar dados do usuário para cada médico
    for (let i = 0; i < allMedicos.length; i++) {
      if (allMedicos[i].usuarioId) {
        try {
          const userResponse = await userService.userById(allMedicos[i].usuarioId);
          allMedicos[i].usuario = userResponse.data;
        } catch (error) {
          console.error('Erro ao buscar usuário do médico:', error);
        }
      }
    }

    // 3. Calcular distância para cada médico
    const medicosWithDistance = await Promise.all(
      allMedicos.map(async (medicoItem) => {
        const coords = await getCoordsFromCEP(medicoItem.cep);
        const distance = coords
          ? calculateDistance(userCoords.latitude, userCoords.longitude, coords.latitude, coords.longitude)
          : 999999;

        return { ...medicoItem, distance };
      })
    );

    // 4. Ordenar por distância e filtrar médicos com distância > 800km
    const filteredMedicos = medicosWithDistance
      .filter(medicoItem => medicoItem.distance <= 800)
      .sort((a, b) => a.distance - b.distance);

    medico.value = filteredMedicos;
    isDistanceSearch.value = true;
    pageSize.value = 20;
    page.value = 1;
    totalPages.value = Math.ceil(filteredMedicos.length / 20);

  } catch (error) {
    console.error('Erro ao ordenar por distância:', error);
    cepError.value = 'Erro ao buscar médicos por distância';
  } finally {
    loadingDistance.value = false;
  }
};

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

const buscarMedico = async () => {
  try {
    loading.value = true
    // Se não é busca por distância, usar paginação normal (3 por página)
    const currentPageSize = isDistanceSearch.value ? 20 : 3
    const response = await medicoService.getMedicoFindAllPagined(
      page.value,
      currentPageSize
    )
    medico.value = response.data.itens
    totalPages.value = response.data.totalPages

    // Buscar dados do usuário para cada médico
    for (let i = 0; i < medico.value.length; i++) {
      if (medico.value[i].usuarioId) {
        try {
          const userResponse = await userService.userById(
            medico.value[i].usuarioId
          )
          medico.value[i].usuario = userResponse.data
        } catch (error) {
          console.error('Erro ao buscar usuário do médico:', error)
        }
      }
    }
  } catch (error) {
    console.error('erro ao buscar médico', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  buscarUsuario()
  buscarMedico()

  // Mostrar modal se vier de outro site
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('showModal') === 'true') {
    showTipoContaModal.value = true
  }
})

const mudarPagina = (novaPagina) => {
  page.value = novaPagina
  buscarMedico()
}



function detalhesMedico(id) {
  const url = router.resolve({
    name: '/Atleta-Screens/medicoDetalhes/',
    query: { id },
  }).href
  window.open(url, '_blank')
}

const buscarEnderecoPorCep = async (cepValue) => {
  if (!cepValue) return
  buscouCep.value = true

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cepValue}&key=${mapKey.value}`)
    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const result = data.results[0]
      endereco.value = result.formatted_address
      coordenadas.value = result.geometry.location

      // Atualizar o campo CEP também
      cep.value = cepValue

      // Gerar URL do mapa estático
      mapaUrl.value = `https://maps.googleapis.com/maps/api/staticmap?center=${coordenadas.value.lat},${coordenadas.value.lng}&zoom=15&size=600x500&markers=color:green%7C${coordenadas.value.lat},${coordenadas.value.lng}&key=${mapKey.value}`

      console.log('Mapa atualizado:', mapaUrl.value)
    } else {
      console.log('Nenhum resultado encontrado para o CEP:', cepValue)
    }
  } catch (error) {
    console.error('Erro ao buscar endereço:', error)
  }
}

const abrirGoogleMaps = () => {
  if (coordenadas.value) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordenadas.value.lat},${coordenadas.value.lng}`
    window.open(url, '_blank')
  }
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

.gradient-icon {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-btn {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  color: white !important;
}

.cep-input-centered {
  width: 100%;
}

.cep-input-centered .v-btn {
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
}

.cep-input-centered .v-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
}

.distance-text {
  font-size: 12px;
  color: #28a745;
  margin-top: 4px;
  font-weight: 500;
}

.v-text-field--error {
  border-color: #ff4444 !important;
}

.v-btn--disabled {
  background-color: #ccc !important;
  transform: none !important;
  box-shadow: none !important;
}

.map-container {
  overflow: hidden;
}

.map-placeholder {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px dashed #dee2e6;
  border-radius: 12px;
  margin: 16px;
}

.map-image-container {
  position: relative;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
}

.map-image {
  transition: transform 0.3s ease;
}

.map-image:hover {
  transform: scale(1.02);
}

.map-expand-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
</style>
