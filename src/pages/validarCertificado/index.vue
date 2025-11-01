<template>
  <v-container class="d-flex align-center justify-center" :class="containerClass">
    <v-row justify="center" class="w-100 ma-0">
      <v-col cols="12" sm="10" md="8" lg="6" class="pa-2 pa-sm-4">
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
              Carregando informações do certificado...
            </p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-6 py-sm-8">
            <v-icon :size="display.mobile ? 60 : 80" color="error">mdi-alert-circle</v-icon>
            <h2 class="text-h6 text-sm-h5 font-weight-bold mt-3 mt-sm-4 mb-2 px-2" style="color: #f44336">
              Erro ao validar certificado
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
              Voltar ao início
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
                :style="{ color: isValido ? '#00c6fe' : '#f44336' }"
              >
                {{ isValido ? 'Certificado Válido' : 'Certificado Inválido' }}
              </h2>
              <p class="text-body-2 text-sm-body-1 text-grey px-2">
                Informações do certificado
              </p>
            </div>

            <!-- Informações da Licença -->
            <v-card
              variant="outlined"
              class="pa-3 pa-sm-4 mb-4"
              rounded="lg"
            >
              <v-row>
                <v-col cols="12" class="pb-2 pb-sm-3">
                  <div class="d-flex align-center justify-space-between">
                    <div class="flex-grow-1">
                      <div class="text-caption text-grey-darken-1 mb-1">
                        Data de Upload
                      </div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ formatarData(licenca.createdAt) || '--' }}
                      </div>
                    </div>
                    <v-icon color="light-blue-accent-3" :size="display.mobile ? 20 : 24" class="ml-2">mdi-upload</v-icon>
                  </div>
                </v-col>

                <v-divider class="my-2" />

                <v-col cols="12" class="pb-2 pb-sm-3">
                  <div class="d-flex align-center justify-space-between">
                    <div class="flex-grow-1">
                      <div class="text-caption text-grey-darken-1 mb-1">
                        Data de Validade
                      </div>
                      <div
                        class="text-body-2 text-sm-body-1 font-weight-medium"
                        :style="{ color: isValido ? '#00c6fe' : '#f44336' }"
                      >
                        {{ formatarData(licenca.validade) || '--' }}
                      </div>
                    </div>
                    <v-icon :color="isValido ? 'success' : 'error'" :size="display.mobile ? 20 : 24" class="ml-2">
                      mdi-calendar-check
                    </v-icon>
                  </div>
                </v-col>

                <v-divider class="my-2" />

                <v-col cols="12">
                  <div class="d-flex align-center justify-space-between">
                    <div class="flex-grow-1">
                      <div class="text-caption text-grey-darken-1 mb-1">
                        Status
                      </div>
                      <div
                        class="text-body-2 text-sm-body-1 font-weight-medium"
                        :style="{ color: isValido ? '#00c6fe' : '#f44336' }"
                      >
                        {{ isValido ? 'Ativo' : 'Inativo ou Expirado' }}
                      </div>
                    </div>
                    <v-icon :color="isValido ? 'success' : 'error'" :size="display.mobile ? 20 : 24" class="ml-2">
                      {{ isValido ? 'mdi-check-circle' : 'mdi-close-circle' }}
                    </v-icon>
                  </div>
                </v-col>
              </v-row>
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
                Voltar ao início
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
import 'dayjs/locale/pt-br'
import licencaCertificadoService from '@/services/licenca-certificado/licenca-certificado-service'

const route = useRoute()
const display = useDisplay()
const loading = ref(true)
const licenca = ref(null)
const error = ref(null)

const containerClass = computed(() => {
  return display.mobile ? 'px-2 py-4' : 'px-4 py-8'
})

const isValido = computed(() => {
  if (!licenca.value) return false
  
  if (licenca.value.ativo !== true) {
    return false
  }
  
  if (licenca.value.validade) {
    const dataValidade = dayjs(licenca.value.validade)
    return dataValidade.isAfter(dayjs())
  }
  
  return false
})

const formatarData = (data) => {
  if (!data) return '--'
  return dayjs(data).format('DD/MM/YYYY')
}

const buscarLicenca = async () => {
  try {
    loading.value = true
    error.value = null
    
    const licencaId = route.query.id || route.params.id
    
    if (!licencaId) {
      error.value = 'ID da licença não fornecido'
      return
    }

    const response = await licencaCertificadoService.getLicencaCertificadoById(licencaId)
    
    licenca.value = response.data || response
  } catch (err) {
    error.value = err.response?.data?.message || 'Não foi possível carregar as informações do certificado'
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

