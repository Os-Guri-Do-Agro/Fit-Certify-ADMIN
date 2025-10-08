<template>
  <v-container class="pa-0 h-100" fluid>
    <!-- Header do médico -->
    <v-card flat class="pa-0" tile>
      <v-sheet color="blue" class="pa-6 position-relative" rounded="0">
        <!-- Estrelas e chats no canto superior direito -->
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
          <!-- Foto -->
          <v-col cols="auto">
            <v-avatar size="120">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Dr. João Pedro Lopes"
              />
            </v-avatar>
          </v-col>

          <!-- Informações -->
          <v-col>
            <div class="text-h5 font-weight-bold white--text">
              Dr. João Pedro Lopes
            </div>
            <div class="subtitle-1 white--text">Cirurgião Cardiovascular</div>

            <v-row class="mt-4" dense>
              <v-col cols="auto">
                <v-chip
                  color="blue-lighten-2"
                  small
                  style="border: 2px solid white; color: white !important"
                >
                  <v-icon left color="white" class="mr-1">mdi-medal</v-icon> 15
                  anos experiência
                </v-chip>
              </v-col>
              <v-col cols="auto">
                <v-chip
                  color="blue-lighten-2"
                  small
                  style="border: 2px solid white; color: white !important"
                >
                  <v-icon left color="white" class="mr-1">mdi-calendar</v-icon>
                  Seg-Sex / 9:00AM - 5:00PM
                </v-chip>
              </v-col>
            </v-row>

            <!-- Botão Marcar Consulta -->
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

    <!-- Conteúdo -->
    <v-container class="mt-6">
      <v-row>
        <v-col cols="12" md="8" offset-md="2">
          <v-card class="bg-transparent" flat>
            <!-- Foco -->
            <v-card color="grey-lighten-4" class="pa-4 mb-4" tile>
              <strong>Foco:</strong> Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Alias voluptates dolores aperiam veritatis
              pariatur! Aliquam quos ab modi consequatur esse! Libero nostrum
              quibusdam distinctio provident temporibus vero rem atque iste.
            </v-card>

            <!-- Perfil -->
            <div class="text-h6 font-weight-bold mb-2">Perfil</div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Odit, omnis
              aspernatur sit deserunt architecto quis ad harum facere nesciunt!
              Consequatur dignissimos necessitatibus eligendi cupiditate! Magnam
              ipsum molestias rem rerum provident.
            </p>

            <!-- Carreira -->
            <div class="text-h6 font-weight-bold mt-4 mb-2">Carreira</div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Ab pariatur
              modi blanditiis officia sequi qui officiis quod. Ratione porro
              minus, reprehenderit cum officiis quod iure tenetur sunt omnis
              ipsa deleniti.
            </p>

            <!-- Destaques -->
            <div class="text-h6 font-weight-bold mt-4 mb-2">Destaques</div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem,
              ipsum dolor sit amet consectetur adipisicing elit. Animi ullam
              explicabo temporibus, placeat odit non veritatis. Eveniet tempora
              vitae hic eos dignissimos laboriosam ea sed animi molestiae, quas
              enim harum!
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import medicoService from '@/services/medico/medico-service'
import { useRouter, useRoute } from 'vue-router'

// const router = useRouter()
const route = useRoute()

const medico = ref(null)

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
  }
}

onMounted(async () => {
  console.log(route.query?.id)
  const medicoId =  route.query?.id

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
