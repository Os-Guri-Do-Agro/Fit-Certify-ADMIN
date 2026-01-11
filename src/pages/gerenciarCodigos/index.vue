<template>
  <v-container fluid class="pa-4 pa-md-8" style="background: #f8f9fa; min-height: 100vh;">
    <!-- Header -->
    <v-row class="mb-6">
      <v-col cols="12" class="d-flex flex-column flex-md-row justify-space-between align-start align-md-center ga-4">
        <div class="d-flex align-center ga-3">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #1E88E5 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 198, 254, 0.4);">
            <v-icon color="white" size="24">mdi-qrcode</v-icon>
          </div>
          <h1 class="text-h5 text-md-h4 font-weight-bold" style="color: #2c3e50; letter-spacing: -0.5px;">{{ $t('gerenciarCodigos.title') }}</h1>
        </div>
        <v-btn color="#1E88E5" variant="outlined" @click="$router.push('/solicitacoesConexoes')" rounded="lg" class="text-none" style="border-width: 2px;">
          <v-icon start>mdi-link-variant</v-icon>
          {{ $t('gerenciarCodigos.viewConnectionsButton') }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- Card Seu Código -->
    <v-card class="mb-6 elevation-2" style="border-radius: 16px;">
      <v-card-text class="pa-6">
        <div class="d-flex align-center ga-3 mb-4">
          <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #1E88E5 0%, #0099cc 100%); display: flex; align-items: center; justify-content: center;">
            <v-icon color="white" size="20">mdi-ticket-confirmation</v-icon>
          </div>
          <h2 class="text-h6 font-weight-bold" style="color: #2c3e50;">{{ $t('gerenciarCodigos.yourCode.title') }}</h2>
        </div>
        <p class="text-body-2 mb-4" style="color: #64748b;">{{ $t('gerenciarCodigos.yourCode.description') }}</p>

        <div v-if="codigoConvite" class="text-center py-6">
          <div style="border: 2px dashed #1E88E5; border-radius: 16px; padding: 24px; background: #e6faff;">
            <p class="text-caption mb-2" style="color: #64748b;">{{ $t('gerenciarCodigos.yourCode.yourCodeLabel') }}</p>
            <h1 class="text-h3 font-weight-bold" style="color: #1E88E5; letter-spacing: 4px;">{{ codigoConvite }}</h1>
          </div>
          <v-btn color="#1E88E5" variant="elevated" block rounded="lg" class="text-none mt-4" @click="compartilharCodigo" style="box-shadow: 0 4px 12px rgba(0, 198, 254, 0.3);">
            <v-icon start>mdi-share-variant</v-icon>
            {{ $t('gerenciarCodigos.yourCode.shareButton') }}
          </v-btn>
        </div>

        <div v-else class="text-center py-6">
          <v-icon size="80" color="#cbd5e1">mdi-qrcode-scan</v-icon>
          <p class="text-body-1 mt-4 mb-6" style="color: #64748b;">{{ $t('gerenciarCodigos.yourCode.noCode') }}</p>
          <v-btn color="#1E88E5" variant="elevated" rounded="lg" class="text-none" @click="gerarCodigo" :loading="loadingGerar" style="box-shadow: 0 4px 12px rgba(0, 198, 254, 0.3);">
            <v-icon start>mdi-plus</v-icon>
            {{ $t('gerenciarCodigos.yourCode.generateButton') }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Card Conectar com Profissional -->
    <v-card class="elevation-2" style="border-radius: 16px;">
      <v-card-text class="pa-6">
        <div class="d-flex align-center ga-3 mb-4">
          <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #88ce0d 0%, #6ba80a 100%); display: flex; align-items: center; justify-content: center;">
            <v-icon color="white" size="20">mdi-account-plus</v-icon>
          </div>
          <h2 class="text-h6 font-weight-bold" style="color: #2c3e50;">{{ $t('gerenciarCodigos.connectProfessional.title') }}</h2>
        </div>
        <p class="text-body-2 mb-4" style="color: #64748b;">{{ $t('gerenciarCodigos.connectProfessional.description') }}</p>

        <!-- Toggle Tipo (apenas para atletas) -->
        <div v-if="userRole === 'atleta'" class="mb-4">
          <p class="text-body-2 mb-2 font-weight-medium" style="color: #2c3e50;">{{ $t('gerenciarCodigos.connectProfessional.professionalType') }}</p>
          <v-btn-toggle v-model="destinatarioTipo" mandatory color="#1E88E5" rounded="lg" class="w-100" style="border: 2px solid #e6faff;">
            <v-btn value="fisioterapeuta" class="flex-grow-1 text-none">
              <v-icon start>mdi-heart-pulse</v-icon>
              {{ $t('gerenciarCodigos.connectProfessional.physiotherapist') }}
            </v-btn>
            <v-btn value="treinador" class="flex-grow-1 text-none">
              <v-icon start>mdi-dumbbell</v-icon>
              {{ $t('gerenciarCodigos.connectProfessional.coach') }}
            </v-btn>
          </v-btn-toggle>
        </div>

        <!-- Input + Botão -->
        <div class="d-flex ga-2">
          <v-text-field
            v-model="codigoInserir"
            :label="$t('gerenciarCodigos.connectProfessional.inputLabel')"
            variant="outlined"
            rounded="lg"
            bg-color="white"
            class="custom-field flex-grow-1"
            :disabled="loadingInserir"
            @keyup.enter="inserirCodigo"
          ></v-text-field>
          <v-btn
            color="#88ce0d"
            variant="elevated"
            rounded="lg"
            @click="inserirCodigo"
            :loading="loadingInserir"
            :disabled="!codigoInserir.trim()"
            style="height: 56px; min-width: 120px; box-shadow: 0 4px 12px rgba(136, 206, 13, 0.3);"
            class="text-none text-white"
          >
            <v-icon color="#fff" start>mdi-send</v-icon>
            {{ $t('gerenciarCodigos.connectProfessional.sendButton') }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import atletaService from '@/services/atleta/atleta-service'
import treinadorService from '@/services/treinador/treinador-service'
import fisioterapeutaService from '@/services/fisioterapeutas/fisioterapeuta-service'
import { getPayload } from '@/utils/auth'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const codigoConvite = ref('')
const codigoInserir = ref('')
const destinatarioTipo = ref<'fisioterapeuta' | 'treinador'>('fisioterapeuta')
const loadingGerar = ref(false)
const loadingInserir = ref(false)
const userRole = computed(() => getPayload()?.role)

const buscarCodigoExistente = async () => {
  try {
    const payload = getPayload()
    switch (payload?.role) {
      case 'atleta':
        const atletaResponse = await atletaService.getAtletaById(payload?.user?.atletaId)
        if (atletaResponse?.data?.codigoConvite) {
          codigoConvite.value = atletaResponse?.data?.codigoConvite
        }
        break
      case 'fisioterapeuta':
        const fisioterapeutaResponse = await fisioterapeutaService.getFisioterapeutaById(payload?.user?.fisioterapeutaId)
        if (fisioterapeutaResponse?.data?.codigoConvite) {
          codigoConvite.value = fisioterapeutaResponse?.data?.codigoConvite
        }
        break
      case 'treinador':
        const treinadorResponse = await treinadorService.getTreinadorById(payload?.user?.treinadorId)
        if (treinadorResponse?.data?.codigoConvite) {
          codigoConvite.value = treinadorResponse?.data?.codigoConvite
        }
        break
    }

  } catch (error) {
    console.error('Erro ao buscar código existente:', error)
  }
}

const gerarCodigo = async () => {
  loadingGerar.value = true
  try {
    const payload = getPayload()
    let response

    switch (payload?.role) {
      case 'atleta':
        response = await atletaService.gerarCodigoConvite()
        break
      case 'fisioterapeuta':
        response = await fisioterapeutaService.gerarCodigoConvite()
        break
      case 'treinador':
        response = await treinadorService.gerarCodigoConvite()
        break
      default:
        throw new Error('Role não identificada')
    }

    codigoConvite.value = response.data.codigoConvite
    toast.success(t('gerenciarCodigos.toasts.successGenerate'), { autoClose: 2500 })
  } catch (error: any) {
    toast.error(error.response?.data?.message || t('gerenciarCodigos.toasts.errorGenerate'), { autoClose: 3000 })
  } finally {
    loadingGerar.value = false
  }
}

const compartilharCodigo = async () => {
  const mensagem = t('gerenciarCodigos.shareMessage', { code: codigoConvite.value })

  try {
    if (navigator.share) {
      await navigator.share({
        title: t('gerenciarCodigos.shareTitle'),
        text: mensagem
      })
      toast.success(t('gerenciarCodigos.toasts.successShare'), { autoClose: 2500 })
    } else {
      await navigator.clipboard.writeText(mensagem)
      toast.success(t('gerenciarCodigos.toasts.successCopy'), { autoClose: 2500 })
    }
  } catch (error) {
    // Silencioso - usuário pode ter cancelado o compartilhamento
  }
}

const inserirCodigo = async () => {
  if (!codigoInserir.value.trim()) {
    toast.warning(t('gerenciarCodigos.toasts.warningInvalidCode'), { autoClose: 2500 })
    return
  }

  loadingInserir.value = true
  try {
    const payload = getPayload()
    const data = {
      codigoConvite: codigoInserir.value.trim(),
      destinatarioTipo: payload?.role === 'atleta' ? destinatarioTipo.value : 'atleta'
    }

    switch (payload?.role) {
      case 'atleta':
        await atletaService.solicitarConexao(data)
        break
      case 'fisioterapeuta':
        await fisioterapeutaService.solicitarConexao(data)
        break
      case 'treinador':
        await treinadorService.solicitarConexao(data)
        break
      default:
        throw new Error('Role não identificada')
    }

    toast.success(t('gerenciarCodigos.toasts.successRequest'), { autoClose: 2500 })
    codigoInserir.value = ''
  } catch (error: any) {
    const message = error.response?.data?.message || t('gerenciarCodigos.toasts.errorRequest')
    toast.error(message, { autoClose: 3000 })
  } finally {
    loadingInserir.value = false
  }
}

onMounted(() => {
  buscarCodigoExistente()
})
</script>

<style scoped>
.ga-2 {
  gap: 8px;
}

.ga-3 {
  gap: 12px;
}

.ga-4 {
  gap: 16px;
}

:deep(.custom-field .v-field) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

:deep(.custom-field .v-field:hover) {
  border-color: #1E88E5;
}

:deep(.custom-field .v-field--focused) {
  border-color: #1E88E5;
  box-shadow: 0 4px 12px rgba(0, 198, 254, 0.2);
}

:deep(.v-btn-toggle) {
  width: 100%;
}

:deep(.v-btn-toggle .v-btn) {
  border: none !important;
}
</style>
