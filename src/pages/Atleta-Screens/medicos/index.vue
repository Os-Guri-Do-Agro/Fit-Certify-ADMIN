<template>
  <v-container class="py-10">
    <v-row justify="center" class="text-center mb-8">
      <v-col cols="12">
        <h2 class="text-h5 text-md-h4 font-weight-bold" style="color: green">
          Encontre um médico parceiro próximo a você<br />
          e agende sua consulta presencial
        </h2>
      </v-col>
    </v-row>

    <v-row justify="center" class="mb-10">
      <v-btn-toggle v-model="filtro" rounded="pill" group mandatory>
        <v-btn value="lista" color="green" variant="flat" class="px-8 text-body-1 font-weight-medium">
          Lista completa
        </v-btn>
        <v-btn value="meu" color="green" variant="outlined" class="px-8 text-body-1 font-weight-medium"
          @click="router.push('/Atleta-Screens/meusMedicos')">
          Já tenho meu médico
        </v-btn>
      </v-btn-toggle>
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
            <v-btn icon size="small" color="green" variant="flat" class="position-absolute"
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

                <v-row align="center" class="mt-3">
                  <v-col cols="auto">
                    <v-btn variant="flat" color="green" class="px-8 text-body-2" rounded
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
        <v-text-field v-model="cep" label="CEP" variant="outlined" density="comfortable" class="mb-4 mt-10 mt-md-0"
          rounded="xl" color="green" append-inner-icon="mdi-map-search" @click:append-inner="buscarEnderecoPorCep(cep)"
          @keyup.enter="buscarEnderecoPorCep(cep)"></v-text-field>

        <v-card v-if="endereco" class="mb-4 pa-4" rounded="xl">
          <div class="text-subtitle-2 font-weight-bold mb-2">Endereço:</div>
          <div class="text-body-2">{{ endereco }}</div>
          <v-btn color="green" variant="flat" size="small" class="mt-2" @click="abrirGoogleMaps">
            <v-icon start>mdi-map</v-icon>
            Ver no Google Maps
          </v-btn>
        </v-card>

        <v-img v-if="!mapaUrl" src="../../../assets/mapa.jpg" height="500" rounded="xl" cover></v-img>

        <v-img v-else :src="mapaUrl" height="500" rounded="xl" cover></v-img>
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
    const response = await medicoService.getMedicoFindAllPagined(
      page.value,
      pageSize.value
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
})

const mudarPagina = (novaPagina) => {
  page.value = novaPagina
  buscarMedico()
}

const toggleFavorito = (medico) => {
  if (medico.favorito) {
    medicosSalvosStore.removerMedico(medico.id)
    medico.favorito = false
  } else {
    medicosSalvosStore.adicionarMedico(medico)
    medico.favorito = true
  }
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

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cepValue}&key=${mapKey.value}`)
    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const result = data.results[0]
      endereco.value = result.formatted_address
      coordenadas.value = result.geometry.location

      // Gerar URL do mapa estático
      mapaUrl.value = `https://maps.googleapis.com/maps/api/staticmap?center=${coordenadas.value.lat},${coordenadas.value.lng}&zoom=15&size=600x500&markers=color:green%7C${coordenadas.value.lat},${coordenadas.value.lng}&key=${mapKey.value}`
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
