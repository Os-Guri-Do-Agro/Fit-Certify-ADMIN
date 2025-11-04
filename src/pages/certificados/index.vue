<template>
  <v-container class="py-8">
    <!-- Header com título e barra de busca -->
    <v-row class="mb-6">
      <v-col cols="12">
        <div class="certificate-header mb-4">
          <h1 class="text-h4 text-md-h3 font-weight-bold mb-4" style="color: #00c6fe">
            Acesse seus certificados gerados aqui
          </h1>
          <v-text-field
            v-model="searchQuery"
            placeholder="Buscar..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            rounded="lg"
            density="comfortable"
            hide-details
            class="search-field"
            style="max-width: 600px"
          />
        </div>
      </v-col>
    </v-row>

    <!-- Loading State -->
    <div v-if="loading">
      <v-row>
        <v-col cols="12">
          <v-card class="pa-6" elevation="2" rounded="xl">
            <v-skeleton-loader type="card" height="200" />
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="12">
          <v-card class="pa-6" elevation="2" rounded="xl">
            <v-skeleton-loader type="card" height="300" />
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Estado vazio quando não há certificado -->

    <!-- Content -->
    <div v-else>
      <v-row>
        <!-- Seção de Status do Certificado -->
        <v-col cols="12">
          <v-card
            class="pa-6 certificate-status-card"
            elevation="2"
            rounded="xl"
            :style="{
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
            }"
          >
            <v-row align="start" no-gutters>
              <v-col>
                <div class="d-flex align-center mb-4">
                  <v-icon
                    size="32"
                    :color="certificadoValidoEAtivo ? 'light-blue-accent-3' : 'error'"
                    class="certificate-icon mr-3"
                  >
                    mdi-certificate
                  </v-icon>
                  <h2
                    class="text-h6 font-weight-bold mb-0"
                    :style="{ color: certificadoValidoEAtivo ? '#00c6fe' : '#f44336' }"
                  >
                    {{ certificadoValidoEAtivo ? 'Seu Certificado está Ativo' : 'Certificado Inativo ou Expirado' }}
                  </h2>
                </div>
                
                    <v-card
                      variant="outlined"
                      class="mb-4 pa-4"
                      rounded="lg"
                      style="background-color: rgba(0, 198, 254, 0.05); border-color: rgba(0, 198, 254, 0.2) !important;"
                    >
                      <div class="d-flex flex-wrap gap-6">
                        <div class="info-item">
                          <div class="d-flex align-center mb-2">
                            <v-icon size="18" color="light-blue-accent-3" class="mr-2">mdi-upload</v-icon>
                            <span class="text-caption text-grey-darken-1 font-weight-medium">
                              Data de Upload
                            </span>
                          </div>
                          <div class="text-body-1 font-weight-bold">
                            {{ formatarData(certificado?.createdAt) || '--' }}
                          </div>
                        </div>
                        <v-divider vertical class="mx-2" />
                        <div class="info-item">
                          <div class="d-flex align-center mb-2">
                            <v-icon size="18" color="light-blue-accent-3" class="mr-2">mdi-calendar-check</v-icon>
                            <span class="text-caption text-grey-darken-1 font-weight-medium">
                              Validade
                            </span>
                          </div>
                          <div class="text-body-1 font-weight-bold" :style="{ color: certificadoValido ? '#00c6fe' : '#f44336' }">
                            {{ formatarData(certificado?.validade) || '--' }}
                          </div>
                        </div>
                      </div>
                    </v-card>
                    
                    <v-card
                      variant="outlined"
                      class="mb-4"
                      rounded="lg"
                      style="border-left: 4px solid #00c6fe; border-color: rgba(0, 198, 254, 0.2) !important;"
                    >
                      <v-card-title class="pa-4 pb-2">
                        <div class="d-flex align-center">
                          <v-icon size="24" color="light-blue-accent-3" class="mr-2">mdi-account</v-icon>
                          <span class="text-subtitle-1 font-weight-bold" style="color: #00c6fe">
                            Atleta
                          </span>
                        </div>
                      </v-card-title>
                      <v-card-text class="pa-4 pt-2">
                        <v-row dense>
                          <v-col cols="12" sm="6" md="4">
                            <div class="info-field">
                              <div class="text-caption text-grey-darken-1 mb-1">
                                Nome
                              </div>
                              <div class="text-body-2 font-weight-medium">
                                {{ atleta?.usuario?.nome || '--' }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="4" v-if="atleta?.usuario?.email">
                            <div class="info-field">
                              <div class="text-caption text-grey-darken-1 mb-1">
                                Email
                              </div>
                              <div class="text-body-2 font-weight-medium text-truncate">
                                {{ atleta.usuario.email }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="4" v-if="atleta?.dataNascimento">
                            <div class="info-field">
                              <div class="text-caption text-grey-darken-1 mb-1">
                                Data de Nascimento
                              </div>
                              <div class="text-body-2 font-weight-medium">
                                {{ formatarData(atleta.dataNascimento) }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="4" v-if="atleta?.dataNascimento">
                            <div class="info-field">
                              <div class="text-caption text-grey-darken-1 mb-1">
                                Idade
                              </div>
                              <div class="text-body-2 font-weight-medium">
                                {{ calcularIdade(atleta.dataNascimento) }} anos
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="4" v-if="atleta?.telefone">
                            <div class="info-field">
                              <div class="text-caption text-grey-darken-1 mb-1">
                                Telefone
                              </div>
                              <div class="text-body-2 font-weight-medium">
                                {{ atleta.telefone }}
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                    
                    <v-card
                      variant="outlined"
                      class="mb-2"
                      rounded="lg"
                      style="border-left: 4px solid #00c6fe; border-color: rgba(0, 198, 254, 0.2) !important;"
                    >
                      <v-card-title class="pa-4 pb-2">
                        <div class="d-flex align-center">
                          <v-icon size="24" color="light-blue-accent-3" class="mr-2">mdi-doctor</v-icon>
                          <span class="text-subtitle-1 font-weight-bold" style="color: #00c6fe">
                            Médico
                          </span>
                        </div>
                      </v-card-title>
                      <v-card-text class="pa-4 pt-2">
                        <v-row dense>
                          <v-col cols="12" sm="6" md="4">
                            <div class="info-field">
                              <div class="text-caption text-grey-darken-1 mb-1">
                                Nome
                              </div>
                              <div class="text-body-2 font-weight-medium">
                                {{ medico?.usuario?.nome || medico?.nome || '--' }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="4" v-if="medico?.crm">
                            <div class="info-field">
                              <div class="text-caption text-grey-darken-1 mb-1">
                                CRM
                              </div>
                              <div class="text-body-2 font-weight-medium">
                                {{ medico.crm }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" md="4" v-if="medico?.especializacao">
                            <div class="info-field">
                              <div class="text-caption text-grey-darken-1 mb-1">
                                Especialização
                              </div>
                              <div class="text-body-2 font-weight-medium">
                                {{ medico.especializacao }}
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12" sm="6" md="4" v-if="medico?.especializacao">
                            <div class="info-field">
                              <div class="text-caption text-grey-darken-1 mb-1">
                                Telefone
                              </div>
                              <div class="text-body-2 text-sm-body-1 font-weight-medium">
                                {{ medico.telefone }}
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                    
                    <div class="mt-4">
                      <v-btn
                        color="light-blue-accent-3"
                        variant="flat"
                        rounded="lg"
                        size="large"
                        block
                        class="elevation-2"
                        :disabled="!certificadoValidoEAtivo || !certificado?.id"
                        @click="showQRDialog = true"
                      >
                        <v-icon size="24" class="mr-2">mdi-qrcode</v-icon>
                        Ver QR Code
                      </v-btn>
                    </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- Seção de Templates -->
      <v-row class="mt-6">
        <v-col cols="12">
          <v-card
            class="pa-6 templates-card"
            elevation="2"
            rounded="xl"
            style="background-color: #f0f9ff"
          >
            <h3
              class="text-h6 font-weight-bold mb-4"
              style="color: #00c6fe"
            >
              Templates gerados para provas parceiras
            </h3>

            <div v-if="templatesFiltrados.length === 0 || !certificado || !certificadoValidoEAtivo" class="text-center py-8">
              <v-icon size="48" color="grey-lighten-2">mdi-file-document-outline</v-icon>
              <p class="text-body-2 mt-4 text-grey">
                {{ !certificadoValidoEAtivo ? 'Certificado inativo ou expirado' : 'Nenhum template encontrado' }}
              </p>
            </div>

            <v-list v-else class="bg-transparent">
              <v-list-item
                v-for="(template, index) in templatesFiltrados"
                :key="index"
                class="px-0 py-2 template-item"
              >
                <template v-slot:prepend>
                  <v-icon color="light-blue-accent-3" class="mr-3">
                    mdi-file-document
                  </v-icon>
                </template>

                <v-list-item-title
                  class="font-weight-medium"
                  style="color: #00c6fe"
                >
                  {{ template.nome || 'Nome prova parceira' }}
                </v-list-item-title>

                <template v-slot:append>
                  <v-btn
                    color="light-blue-accent-3"
                    variant="flat"
                    size="small"
                    rounded="lg"
                    :loading="downloadingTemplateId === template.id"
                    :disabled="downloadingTemplateId === template.id"
                    @click="baixarTemplate(template)"
                  >
                    Download
                  </v-btn>
                </template>

                <v-divider v-if="index < templatesFiltrados.length - 1" class="mt-2" />
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      
    </div>

    <!-- Dialog para QR Code -->
    <v-dialog v-model="showQRDialog" max-width="500" rounded="lg">
      <v-card class="pa-6 text-center">
        <v-card-title class="d-flex align-center justify-center mb-4">
          <v-icon color="light-blue-accent-3" size="32" class="mr-2">
            mdi-qrcode
          </v-icon>
          <span class="text-h5 font-weight-bold" style="color: #00c6fe">
            QR Code do Certificado
          </span>
        </v-card-title>

        <v-card-text>
          <div v-if="qrCodeUrl && certificado?.id" class="qr-code-container mb-4">
            <v-img
              :src="qrCodeUrl"
              alt="QR Code"
              max-width="300"
              class="mx-auto"
              rounded="lg"
            />
          </div>
          <div v-else class="qr-code-placeholder mb-4">
            <v-icon size="120" color="grey-lighten-2">mdi-qrcode</v-icon>
            <p class="text-body-2 text-grey mt-2">
              QR Code não disponível
            </p>
          </div>
          <p class="text-body-2 text-grey mb-4">
            Escaneie este código para verificar a autenticidade do certificado.
          </p>
          
          <!-- Botão de redirecionamento -->
          <v-btn
            v-if="certificado?.id"
            color="light-blue-accent-3"
            variant="flat"
            rounded="lg"
            block
            class="mb-2"
            @click="irParaValidacao"
          >
            <v-icon class="mr-2">mdi-shield-check</v-icon>
            Validar Certificado
          </v-btn>
        </v-card-text>

        <v-card-actions class="justify-center pa-4">
          <v-btn
            color="grey"
            variant="outlined"
            rounded="lg"
            @click="showQRDialog = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import licencaCertificadoService from '@/services/licenca-certificado/licenca-certificado-service'
import modeloCertificadoService from '@/services/modelo-certificado/modelo-certificado-service'
import atletaService from '@/services/atleta/atleta-service'
import medicoService from '@/services/medico/medico-service'
import { getAtletaId } from '@/utils/auth'

const router = useRouter()

dayjs.locale('pt-br')

const loading = ref(true)
const certificado = ref(null)
const searchQuery = ref('')
const showQRDialog = ref(false)
const modelosCertificado = ref([])
const downloadingTemplateId = ref(null)
const atleta = ref(null)
const medico = ref(null)

const templatesFiltrados = computed(() => {
  if (!searchQuery.value) return modelosCertificado.value

  const query = searchQuery.value.toLowerCase()
  return modelosCertificado.value.filter(
    (template) => template.nome?.toLowerCase().includes(query)
  )
})

const certificadoValido = computed(() => {
  if (!certificado.value?.validade) return false
  const dataValidade = dayjs(certificado.value.validade)
  return dataValidade.isAfter(dayjs())
})

const certificadoAtivo = computed(() => {
  return certificado.value?.ativo === true
})

const certificadoValidoEAtivo = computed(() => {
  return certificadoValido.value && certificadoAtivo.value
})

const qrCodeUrl = computed(() => {
  if (!certificado.value?.id) return null
  
  // Gera a URL de validação do certificado
  const baseUrl = window.location.origin
  const validationUrl = `${baseUrl}/validarCertificado?id=${certificado.value.id}`
  
  // Usa API pública para gerar QR Code
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(validationUrl)}`
})

const formatarData = (data) => {
  if (!data) return '--'
  return dayjs(data).format('DD/MM/YYYY')
}

const calcularIdade = (dataNascimento) => {
  if (!dataNascimento) return '--'
  const hoje = dayjs()
  const nascimento = dayjs(dataNascimento)
  let idade = hoje.diff(nascimento, 'year')
  const mes = hoje.diff(nascimento, 'month') % 12
  if (mes < 0 || (mes === 0 && hoje.date() < nascimento.date())) {
    idade--
  }
  return idade
}

const buscarModelosCertificado = async () => {
  try {
    const response = await modeloCertificadoService.getAll()
    modelosCertificado.value = response.data || response || []
  } catch (error) {
    modelosCertificado.value = []
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

const buscarCertificado = async () => {
  try {
    loading.value = true
    const atletaId = getAtletaId()

    if (!atletaId) {
      loading.value = false
      return
    }

    const response = await licencaCertificadoService.getByAtletaId(atletaId)
    
    certificado.value = response.data?.at(-1)
    
    // Busca informações do atleta e médico após carregar o certificado
    if (certificado.value) {
      // Busca informações do atleta
      await buscarAtleta(certificado.value.atletaId || atletaId)
      
      // Busca informações do médico se houver medicoId no certificado
      if (certificado.value.medicoId) {
        await buscarMedico(certificado.value.medicoId)
      }
    }
  } catch (error) {
    certificado.value = null
  } finally {
    loading.value = false
  }
}

// Função para converter base64 em Blob
const base64ToBlob = (base64, mimeType = 'application/pdf') => {
  const base64Data = base64.includes(',') ? base64.split(',')[1] : base64
  
  const byteCharacters = atob(base64Data)
  const byteNumbers = new Array(byteCharacters.length)
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mimeType })
}

const baixarTemplate = async (template) => {
  try {
    if (!template?.id) {
      return
    }

    downloadingTemplateId.value = template.id
    
    const response = await modeloCertificadoService.downloadTemplate(template.id)
    
    const base64String = response.data?.data || response.data?.base64 || response.data || response
    
    if (!base64String) {
      return
    }

    const blob = base64ToBlob(base64String)
    
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url

    let filename = template.nome || 'template-certificado.pdf'
    
    if (!filename.toLowerCase().endsWith('.pdf')) {
      filename += '.pdf'
    }

    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()

    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
  } finally {
    downloadingTemplateId.value = null
  }
}

const irParaValidacao = () => {
  if (certificado.value?.id) {
    showQRDialog.value = false
    router.push({
      path: '/validarCertificado',
      query: { id: certificado.value.id }
    })
  }
}

onMounted(async () => {
  try {
    loading.value = true
    await Promise.all([
      buscarCertificado(),
      buscarModelosCertificado()
    ])
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.certificate-header {
  margin-bottom: 2rem;
}

.search-field {
  background-color: white;
}

.certificate-status-card {
  min-height: 200px;
}

.certificate-icon {
  opacity: 0.95;
}

.templates-card {
  min-height: 200px;
}

.template-item {
  transition: background-color 0.2s ease;
}

.template-item:hover {
  background-color: rgba(0, 198, 254, 0.05);
  border-radius: 8px;
}

.qr-code-container {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
}

.qr-code-placeholder {
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 12px;
}

.gap-4 {
  gap: 16px;
}

.info-item {
  flex: 1;
  min-width: 150px;
}

.info-field {
  padding: 8px 0;
}
</style>
