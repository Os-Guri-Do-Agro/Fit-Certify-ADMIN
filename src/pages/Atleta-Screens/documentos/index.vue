<template>
  <v-container class="py-10">
    <div class="header-section">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <v-icon size="40" color="white">mdi-file-document-multiple</v-icon>
        </div>
        <div>
          <h1 class="header-title">{{ $t('documentos.title') }}</h1>
          <p class="header-subtitle">{{ $t('documentos.subtitle') }}</p>
        </div>
      </div>
    </div>

    <v-row justify="center" class="mb-6 mt-8">
      <v-col cols="12" class="d-flex justify-center">
        <v-btn
          size="large"
          rounded="xl"
          prepend-icon="mdi-plus"
          class="text-none font-weight-medium btn-gradient"
          @click="abrirModalAdicionar"
        >
          {{ $t('documentos.addDocument') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div v-if="loading">
          <v-row>
            <v-col v-for="n in 6" :key="n" cols="12" md="6" lg="4">
              <v-card elevation="2" rounded="lg" height="180">
                <v-skeleton-loader type="article" />
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div v-else>
          <v-row>
            <v-col
              v-for="doc in documentos"
              :key="doc.id"
              cols="12"
              md="6"
              lg="4"
            >
              <v-card
                class="documento-card"
                elevation="2"
                rounded="lg"
                @click="abrirDetalhes(doc)"
              >
                <v-card-text class="pa-6">
                  <div class="d-flex align-center mb-4">
                    <v-avatar size="56" :color="getIconColor(doc.tipo)" variant="tonal" class="me-3">
                      <v-icon size="32" :color="getIconColor(doc.tipo)">{{ getIconByTipo(doc.tipo) }}</v-icon>
                    </v-avatar>
                    <div class="flex-grow-1">
                      <div class="text-subtitle-1 font-weight-bold text-grey-darken-4">
                        {{ doc.nome }}
                      </div>
                    </div>
                  </div>

                  <v-divider class="mb-4" />

                  <div class="info-section">
                    <div class="info-item">
                      <v-icon size="18" color="primary" class="me-2">mdi-calendar</v-icon>
                      <span class="text-body-2 text-grey-darken-2">{{ formatarData(doc.dataUpload) }}</span>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <div v-if="documentos.length === 0" class="text-center py-16">
            <v-icon size="80" color="grey-lighten-2">mdi-file-document-outline</v-icon>
            <p class="text-h6 mt-4 text-grey">{{ $t('documentos.noDocumentsEmpty') }}</p>
            <p class="text-body-2 text-grey-darken-1 mt-2">{{ $t('documentos.noDocumentsEmptyDescription') }}</p>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Modal Adicionar -->
    <v-dialog v-model="modalAdicionar" max-width="600" persistent>
      <v-card rounded="lg">
        <v-card-title class="pa-6 text-h5 font-weight-bold">
          {{ $t('documentos.addModal.title') }}
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-form ref="formRef">
            <v-file-input
              v-model="novoDocumento.arquivo"
              :label="$t('documentos.addModal.file')"
              variant="outlined"
              rounded="lg"
              prepend-icon=""
              prepend-inner-icon="mdi-paperclip"
              :rules="[
                v => !!v || $t('documentos.addModal.fileRequired'),
                v => !v || !v[0] || v[0].size <= 10485760 || 'Arquivo deve ter no máximo 10MB'
              ]"
              accept=".pdf,.jpg,.jpeg,.png"
              show-size
            />
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-6">
          <v-spacer />
          <v-btn
            color="grey"
            variant="outlined"
            rounded="lg"
            class="text-none px-6"
            @click="fecharModalAdicionar"
          >
            {{ $t('documentos.addModal.cancel') }}
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            rounded="lg"
            class="text-none font-weight-medium px-6"
            :loading="salvando"
            @click="adicionarDocumento"
          >
            {{ $t('documentos.addModal.add') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Detalhes -->
    <v-dialog v-model="modalDetalhes" max-width="600" persistent>
      <v-card v-if="documentoSelecionado" rounded="lg">
        <v-card-title class="pa-6">
          <div class="d-flex align-center">
            <v-avatar size="48" :color="getIconColor(documentoSelecionado.tipo)" variant="tonal" class="me-3">
              <v-icon :color="getIconColor(documentoSelecionado.tipo)">{{ getIconByTipo(documentoSelecionado.tipo) }}</v-icon>
            </v-avatar>
            <div>
              <div class="text-h6 font-weight-bold">{{ documentoSelecionado.nome }}</div>
            </div>
          </div>
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <div class="detalhes-info">
            <div class="info-row">
              <span class="info-label">{{ $t('documentos.detailsModal.uploadDate') }}</span>
              <span class="info-value">{{ formatarData(documentoSelecionado.dataUpload) }}</span>
            </div>
          </div>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-6">
          <!-- <v-btn
            color="error"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-delete"
            class="text-none"
            @click="confirmarExclusao"
          >
            {{ $t('documentos.detailsModal.delete') }}
          </v-btn> -->
          <v-spacer />
          <v-btn
            color="primary"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-download"
            class="text-none"
            :loading="baixando"
            @click="downloadDocumento"
          >
            {{ $t('documentos.detailsModal.download') }}
          </v-btn>
          <v-btn
            color="grey"
            variant="flat"
            rounded="lg"
            class="text-none"
            @click="fecharDetalhes"
           >
            {{ $t('documentos.detailsModal.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Confirmação Exclusão -->
    <v-dialog v-model="modalConfirmacao" max-width="450" persistent>
      <v-card rounded="lg">
        <v-card-text class="text-center pa-8">
          <v-avatar size="80" color="error" variant="tonal" class="mb-4">
            <v-icon size="48" color="error">mdi-alert-circle-outline</v-icon>
          </v-avatar>
          <h3 class="text-h5 font-weight-bold text-grey-darken-4 mb-3">{{ $t('documentos.deleteModal.title') }}</h3>
          <p class="text-body-1 text-grey-darken-1 mb-6">{{ $t('documentos.deleteModal.message') }}</p>
          <div class="d-flex gap-3 justify-center">
            <v-btn
              color="grey"
              variant="outlined"
              rounded="lg"
              class="text-none px-6"
              @click="modalConfirmacao = false"
            >
              {{ $t('documentos.deleteModal.cancel') }}
            </v-btn>
            <v-btn
              color="error"
              variant="flat"
              rounded="lg"
              class="text-none font-weight-medium px-6"
              :loading="excluindo"
              @click="excluirDocumento"
            >
              {{ $t('documentos.deleteModal.confirm') }}
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { IDocumento } from '@/Interfaces/documento-interface'
import { toast } from 'vue3-toastify'
import documentosService from '@/services/documentos/documentos-service'
import { getAtletaId } from '@/utils/auth'

const loading = ref(true)
const modalAdicionar = ref(false)
const modalDetalhes = ref(false)
const modalConfirmacao = ref(false)
const salvando = ref(false)
const excluindo = ref(false)
const baixando = ref(false)
const documentoSelecionado = ref<IDocumento | null>(null)
const formRef = ref()

const documentos = ref<any[]>([])

const novoDocumento = ref<{
  arquivo: File | null}>({
  arquivo: null
})

const buscarDocumentos = async() => {
  loading.value = true
  try {
    const response = await documentosService.buscarDocumentoByAtleta(getAtletaId())
    documentos.value = response.data.map((doc: any) => ({
      id: doc.id,
      nome: doc.nomeImagem.split('_')[0],
      tipo: getTipoFromContentType(doc.contentType),
      dataUpload: new Date(doc.createdAt),
      createdBy: doc.createdBy
    }))
  } catch (error) {
    console.error('Erro ao buscar documentos:', error)
    toast.error(t('documentos.toasts.loadError'))
  } finally {
    loading.value = false
  }
}

const adicionarDocumento = async () => {
  if (!novoDocumento.value.arquivo) {
    toast.error('Arquivo é obrigatório')
    return
  }

  salvando.value = true
  try {
    const formData = new FormData()
    formData.append('exame', novoDocumento.value.arquivo)

    await documentosService.adicionarDocumento(getAtletaId(), formData)
    toast.success(t('documentos.toasts.addSuccess'))
    fecharModalAdicionar()
    await buscarDocumentos()
  } catch (error) {
    console.error('Erro ao adicionar documento:', error)
    toast.error(t('documentos.toasts.addError'))
  } finally {
    salvando.value = false
  }
}

const downloadDocumento = async () => {
  baixando.value = true
  try {
    const response = await documentosService.baixarDocumento(documentoSelecionado.value?.id)
    const { base64, contentType, nomeImagem } = response.data
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: contentType })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = nomeImagem.split('_')[0]
    link.click()
    window.URL.revokeObjectURL(url)
    toast.success(t('documentos.toasts.downloadSuccess'))
  } catch (error) {
    console.error('Erro ao baixar documento:', error)
    toast.error(t('documentos.toasts.downloadError'))
  } finally {
    baixando.value = false
  }
}


import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const tiposDocumento = computed(() => [
  { label: t('documentos.types.exame'), value: 'exame' },
  { label: t('documentos.types.atestado'), value: 'atestado' },
  { label: t('documentos.types.receita'), value: 'receita' },
  { label: t('documentos.types.pdf'), value: 'pdf' }
])

const getIconByTipo = (tipo: string) => {
  const icons: Record<string, string> = {
    pdf: 'mdi-file-pdf-box'
  }
  return icons[tipo] || 'mdi-file'
}

const getIconColor = (tipo: string) => {
  const colors: Record<string, string> = {
    exame: '#42A5F5',
    atestado: '#66BB6A',
    receita: '#FFA726',
    pdf: '#EF5350'
  }
  return colors[tipo] || 'grey'
}

const getTipoFromContentType = (contentType: string) => {
  if (contentType.includes('pdf')) return 'pdf'
  if (contentType.includes('image')) return 'exame'
  return 'pdf'
}

const getTipoLabel = (tipo: string) => {
  return t(`documentos.types.${tipo}`) || tipo
}

const formatarData = (data: Date) => {
  const localeMap: Record<string, string> = {
    pt: 'pt-BR',
    en: 'en-US'
  }
  return new Date(data).toLocaleDateString(localeMap[locale.value] || 'pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const formatarTamanho = (bytes: number) => {
  if (!bytes || bytes === 0) return '-'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(1) + ' MB'
}

const abrirModalAdicionar = () => {
  modalAdicionar.value = true
}

const fecharModalAdicionar = () => {
  modalAdicionar.value = false
  novoDocumento.value = {arquivo: null }
  formRef.value?.reset()
}

const abrirDetalhes = (doc: IDocumento) => {
  documentoSelecionado.value = doc
  modalDetalhes.value = true
}

const fecharDetalhes = () => {
  modalDetalhes.value = false
  documentoSelecionado.value = null
}

const confirmarExclusao = () => {
  modalDetalhes.value = false
  modalConfirmacao.value = true
}

const excluirDocumento = () => {
  excluindo.value = true
  setTimeout(() => {
    documentos.value = documentos.value.filter(d => d.id !== documentoSelecionado.value?.id)
    toast.success(t('documentos.toasts.deleteSuccess'))
    modalConfirmacao.value = false
    documentoSelecionado.value = null
    excluindo.value = false
  }, 1000)
}

const baixarDocumento = () => {
  toast.info(t('documentos.toasts.downloadStarted'))
}

onMounted(() => {
  buscarDocumentos()
})
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
  align-items: center;
  justify-content: center;
  gap: 16px;
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
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.documento-card {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.documento-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12) !important;
}

.info-section {
  background: rgba(66, 165, 245, 0.04);
  padding: 12px;
  border-radius: 8px;
}

.info-item {
  display: flex;
  align-items: center;
}

.detalhes-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
}

.info-label {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);
}

.info-value {
  color: rgba(0, 0, 0, 0.87);
}

.gap-3 {
  gap: 12px;
}

.btn-gradient {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  color: white !important;
  box-shadow: 0 4px 12px rgba(66, 165, 245, 0.3);
}

.btn-gradient:hover {
  box-shadow: 0 6px 16px rgba(66, 165, 245, 0.4);
}
</style>
