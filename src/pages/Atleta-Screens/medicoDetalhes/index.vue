<template>
  <v-container class="pa-0 h-100" fluid>

    <div v-if="loading">
      <v-card flat class="pa-0" tile>
        <v-sheet color="blue" class="pa-6 position-relative" rounded="0">

          <div class="position-absolute" style="top: 16px; right: 16px">
            <v-skeleton-loader
              type="chip"
              width="100"
              height="auto"
              class="me-2 d-inline-block"
              color="transparent"
            ></v-skeleton-loader>
            <v-skeleton-loader
              type="chip"
              width="100"
              height="auto"
              class="d-inline-block"
              color="transparent"
            ></v-skeleton-loader>
          </div>

          <v-row align="center">
            <v-col cols="auto">
              <v-skeleton-loader
                type="avatar"
                width="120"
                height="120"
                color="transparent"
                boilerplate
              ></v-skeleton-loader>
            </v-col>
            <v-col>
              <v-skeleton-loader
                type="heading"
                width="300"
                height="32"
                class="mb-2"
                color="transparent"
              ></v-skeleton-loader>
              <v-skeleton-loader
                type="subtitle"
                width="250"
                height="20"
                class="mb-4"
                color="transparent"
              ></v-skeleton-loader>

              <div class="mt-4 mb-4">
                <v-skeleton-loader
                  type="chip"
                  width="140"
                  height="28"
                  class="me-2 d-inline-block"
                  color="transparent"
                ></v-skeleton-loader>
                <v-skeleton-loader
                  type="chip"
                  width="180"
                  height="28"
                  class="d-inline-block"
                  color="transparent"
                ></v-skeleton-loader>
              </div>

              <div class="mt-6">
                <v-skeleton-loader
                  type="button"
                  width="160"
                  height="40"
                  color="transparent"
                ></v-skeleton-loader>
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-card>
      <v-container class="mt-6">
        <v-row>
          <v-col cols="12" md="8" offset-md="2">
            <v-skeleton-loader
              type="card"
              class="mb-4"
              color="transparent"
            ></v-skeleton-loader>
            <v-skeleton-loader
              type="article"
              color="transparent"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div v-else>
      <v-card flat class="pa-0" tile>
        <v-sheet color="blue" class="pa-6 position-relative" rounded="0">

          <div class="position-absolute" style="top: 16px; right: 16px">
            <v-chip
              color="white"
              text-color="black"
              small
              class="me-2"
              style="border: 2px solid rgba(255, 255, 255, 0.9)"
            >
              <v-icon left class="mr-1">mdi-star</v-icon> 5
            </v-chip>
            <v-chip
              color="white"
              text-color="black"
              small
              style="border: 2px solid rgba(255, 255, 255, 0.9)"
            >
              <v-icon left class="mr-1">mdi-comment</v-icon> 40
            </v-chip>
          </div>

          <v-row align="center">

            <v-col cols="auto">
              <v-avatar size="120" color="white">
                <img
                  v-if="medico?.usuario?.avatarUrl"
                  :src="medico?.usuario?.avatarUrl"
                  style="object-fit: cover; width: 100%; height: 100%"
                />
                <v-icon v-else size="60" color="blue">mdi-account</v-icon>
              </v-avatar>
            </v-col>


            <v-col>
              <div class="text-h5 font-weight-bold white--text">
                {{ medico?.usuario?.nome }}
              </div>
              <div class="subtitle-1 white--text">
                {{ medico?.especializacao }}
              </div>

              <v-row class="mt-4" dense>
                <v-col cols="auto">
                  <v-chip
                    color="blue"
                    small
                    style="border: 2px solid white; color: white !important"
                  >
                    <v-icon left color="white" class="mr-1">mdi-medal</v-icon>
                    {{ medico?.experiencia }}
                    anos experiência
                  </v-chip>
                </v-col>
                <v-col cols="auto">
                  <v-chip
                    color="blue-lighten-2"
                    small
                    style="border: 2px solid white; color: white !important"
                  >
                    <v-icon left color="white" class="mr-1"
                      >mdi-calendar</v-icon
                    >
                    {{ medico?.diaFuncionamentoInicio }} -
                    {{ medico?.diaFuncionamentoFim }}

                    {{ formatarHorario(medico?.horarioInicio) }} -
                    {{ formatarHorario(medico?.horarioFim) }}
                  </v-chip>
                </v-col>
              </v-row>


              <v-row class="mt-6">
                <v-col>
                  <v-btn
                    color="white"
                    size="large"
                    class="text-blue font-weight-bold px-6 marcar-consulta-btn"
                    prepend-icon="mdi-calendar-plus"
                    rounded="lg"
                    elevation="4"
                  >
                    Marcar Consulta
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-card>


      <v-container class="mt-6">
        <v-row>
          <v-col cols="12" md="8" offset-md="2">
            <v-card class="bg-transparent" flat>

              <v-card
                color="grey-lighten-4"
                class="pa-4 mb-4"
                tile
                rounded="lg"
              >
                <strong>Foco:</strong> {{ medico?.foco }}
              </v-card>


              <div class="text-h6 font-weight-bold mb-2">Perfil</div>
              <p>
                {{ medico?.perfil }}
              </p>


              <div class="text-h6 font-weight-bold mt-4 mb-2">Carreira</div>
              <p>
                {{ medico?.carreira }}
              </p>


              <div class="text-h6 font-weight-bold mt-4 mb-2">Destaques</div>
              <p>
                {{ medico?.destaques }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import medicoService from '@/services/medico/medico-service'
import { useRouter, useRoute } from 'vue-router'

// const router = useRouter()
const route = useRoute()

const medico = ref(null)
const loading = ref(true)

const formatarHorario = (horario) => {
  if (!horario) return ''
  const hora = horario.substring(11, 16)
  return hora.replace(/^0/, '')
}

const buscarMedicoById = async (id) => {
  console.log('bateu aqui')
  console.log('id bateu aqui', id)
  try {
    console.log('Buscando médico com ID:', id)
    const response = await medicoService.getMedicoById(id)
    console.log('Response do serviço:', response)

    if (response && response.data) {
      medico.value = response.data
      console.log(medico.value)
    } else {
      medico.value = response
    }
    console.log('Médico carregado:', medico.value)
  } catch (error) {
    console.error('Erro ao buscar medicoId:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  console.log(route.query?.id)
  const medicoId = route.query?.id

  if (medicoId) {
    buscarMedicoById(medicoId)
  } else {
    console.error('ID do médico não encontrado')
  }
})
</script>

<style scoped>
.marcar-consulta-btn {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  border: 2px solid rgba(255, 255, 255, 0.9) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.3s ease !important;
}

.marcar-consulta-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2) !important;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%) !important;
}
</style>
