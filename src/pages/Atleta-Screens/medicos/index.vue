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
        <v-btn value="meu" color="green" variant="outlined" class="px-8 text-body-1 font-weight-medium">
          Já tenho meu médico
        </v-btn>
      </v-btn-toggle>
    </v-row>

    <v-row align="start" justify="center" no-gutters>
      <v-col cols="12" md="7" class="pe-md-8">
        <v-card v-for="(medico, index) in medico" :key="index" class="mb-6 pa-5 position-relative" variant="outlined"
          color="green" rounded="xl">
          <v-btn icon size="small" color="green" variant="flat" class="position-absolute"
            style="top: 16px; right: 60px">
            <v-icon>mdi-map-marker</v-icon>
          </v-btn>
          <v-btn icon size="small" :color="medico.favorito ? 'amber-darken-1' : 'green'"
            :variant="medico.favorito ? 'flat' : 'outlined'" class="position-absolute" style="top: 16px; right: 16px"
            @click="toggleFavorito(medico)">
            <v-icon :color="medico.favorito ? 'white' : 'green'">
              {{ medico.favorito ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}
            </v-icon>
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
                CRM {{ medico.crm }}
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

        <v-row justify="center" class="mt-4">
          <v-pagination v-model="pagina" :length="4" active-color="green" total-visible="4" size="small" />
        </v-row>
      </v-col>

      <v-col cols="12" md="5">
        <v-text-field v-model="cep" label="CEP" variant="outlined" density="comfortable" class="mb-4 mt-10 mt-md-0"
          rounded="xl" color="green"></v-text-field>

        <v-img src="../../../assets/mapa.jpg" height="500" rounded="xl" cover></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import medicoService from '@/services/medico/medico-service'
import { useRouter } from 'vue-router'

const router = useRouter()

const filtro = ref('lista')
const cep = ref('')

const medico = ref([
  {
    nome: '',
    especializacao: '',
    crm: '',
    avatarUrl: '',
  },
])

const buscarMedico = async () => {
  try {
    const response = await medicoService.getAllMedicos()
    medico.value = response.data
    console.log('RESULTADO RESPONSE:', response.data)
  } catch (error) {
    console.error('erro ao buscar médico', error)
  }
}

onMounted(() => {
  buscarMedico()
})

const toggleFavorito = (medico) => {
  medico.favorito = !medico.favorito
}

function detalhesMedico(id) {
  const url = router.resolve({ name: '/Atleta-Screens/medicoDetalhes/', query: { id } }).href
  window.open(url, '_blank')
}
</script>
