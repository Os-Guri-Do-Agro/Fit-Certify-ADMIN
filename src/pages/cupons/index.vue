<template>
  <div class="pa-4">
    <VCard image="../../assets/banner-admin-cmed.png" class="mb-8 personacard" elevation="3">
      <VRow class="pa-6">
        <VCol>
          <VChip color="white" variant="elevated" class="mb-3" size="small">
            <VIcon icon="mdi-ticket-percent" size="16" class="mr-1" />
            Sistema de Cupons
          </VChip>

          <h2 class="text-h4 font-weight-bold text-white mb-2">
            Cupons de Desconto
          </h2>
          <p class="text-body-1 text-white mb-4 opacity-90">
            Ofereça descontos exclusivos para seus pacientes
          </p>

          <VRow class="mt-4">
            <VDivider vertical class="mx-3 opacity-50" />
            <VCol cols="auto">
              <div class="text-center">
                <div class="text-h5 font-weight-bold text-white">{{ cupomMetricas?.resumo?.totalUsos || '0' }}</div>
                <div class="text-caption text-white opacity-80">UTILIZADOS</div>
              </div>
            </VCol>
            <VDivider vertical class="mx-3 opacity-50" />
            <VCol cols="auto">
              <div class="text-center">
                <div class="text-h5 font-weight-bold text-white">10%</div>
                <div class="text-caption text-white opacity-80">DESCONTO</div>
              </div>
            </VCol>
          </VRow>
        </VCol>

        <VCol cols="auto" class="d-flex align-center">
          <VBtn
            color="white"
            density="compact"
            rounded="xl"
            variant="elevated"
            size="large"
            @click="showCreateDialog = true"
            :disabled="cupons.length > 0"
            prepend-icon="mdi-ticket"
          >
            {{ cupons.length > 0 ? 'Cupom Criado' : 'Gerar Cupom' }}
          </VBtn>
        </VCol>
      </VRow>
    </VCard>

    <!-- Filtros -->
    <div class="filter-section mb-6">
      <VRow align="center" justify="space-between">
        <VCol cols="auto">
          <div class="d-flex align-center">
            <VAvatar size="32" color="primary" class="mr-3">
              <VIcon icon="mdi-filter-variant" color="white" size="18" />
            </VAvatar>
            <div>
              <div class="text-h6 font-weight-bold">Resumo: {{ getSelectedMonthName() }}</div>
              <div class="text-caption text-grey-600">Visualização por período</div>
            </div>
          </div>
        </VCol>
        <VCol cols="auto">
          <VCard class="filter-card" elevation="2" rounded="lg">
            <VCardText class="pa-3">
              <VSelect
                v-model="selectedMonth"
                :items="monthOptions"
                label="Período"
                variant="solo"
                density="compact"
                hide-details
                style="min-width: 220px;"
                prepend-inner-icon="mdi-calendar-month"
                color="primary"
                bg-color="grey-lighten-5"
              />
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </div>

    <!-- Cupons e Ganhos -->
    <VRow>
      <!-- Cupons Grid -->
      <VCol cols="12" sm="12" md="4">
        <VRow>
          <!-- Skeleton Loading -->
          <VCol v-if="dataLoading" cols="12">
            <VSkeletonLoader type="card" height="200" />
          </VCol>
          
          <!-- Cupons -->
          <VCol v-else v-for="(cupom, index) in cupons" :key="index" cols="12">
            <div class="ticket-container">
              <div class="ticket" :class="getTicketClass(isValidCupom(cupom))">
                <!-- Ticket Header -->
                <div class="ticket-header">
                  <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                      <VIcon icon="mdi-brightness-percent" size="24" class="mr-2" />
                      <span class="font-weight-bold ">{{ cupom.porcentagem }}% OFF</span>
                    </div>

                  </div>
                </div>

                <!-- Ticket Body -->
                <div class="ticket-body">
                  <div class="text-body-2 text-grey-600 mb-3">{{ cupom.descricao }}</div>

                  <div class="coupon-code">
                    <div class="text-caption text-grey-500 mb-1">Código do Cupom</div>
                    <div class="code-display">
                      <span class="font-weight-bold text-h6">{{ cupom.codigo }}</span>
                      <VBtn icon="mdi-content-copy" size="x-small" variant="text" @click.stop="copyCoupon(cupom.codigo)" />
                    </div>
                  </div>
                </div>

                <!-- Ticket Footer -->
                <div class="ticket-footer">
                  <div class="d-flex align-center justify-space-between">
                    <div class="text-caption">
                      <VIcon icon="mdi-calendar" size="16" class="mr-1" />
                      Válido até {{ formatDate(cupom.validade) }}
                    </div>
                    <div class="text-caption">
                      <VIcon icon="mdi-account-group" size="16" class="mr-1" />
                      {{ cupom.quantidadeUtilizada }}/{{ cupom.limiteMaximoDeUso }} usos
                    </div>
                  </div>
                </div>

                <!-- Ticket Perforations -->
                <div class="perforation perforation-left"></div>
                <div class="perforation perforation-right"></div>
              </div>
            </div>
          </VCol>
        </VRow>
      </VCol>

      <!-- Seção de Ganhos -->
      <VCol cols="12" sm="12" md="8" class="d-flex">
        <VCard class="earnings-card flex-grow-1" elevation="3">
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-cash" class="mr-2" color="success" />
            Saldo total
          </VCardTitle>
          <VCardText class="d-flex flex-column justify-center flex-grow-1">
            <!-- Skeleton Loading -->
            <div v-if="dataLoading" class="d-flex justify-space-between align-center">
              <div>
                <VSkeletonLoader type="heading" width="150" class="mb-2" />
                <VSkeletonLoader type="text" width="200" />
              </div>
              <VSkeletonLoader type="button" width="150" height="40" />
            </div>
            
            <!-- Content -->
            <div v-else class="d-flex justify-space-between align-center">
              <div>
                <div class="text-h3 font-weight-bold text-success mb-2">
                  R$ {{ saldo?.totalAcumulado || '0,00' }}
                </div>
                <div class="text-grey-600">
                  Valor disponível para resgate
                </div>
              </div>
              <VBtn 
                color="success" 
                size="large" 
                variant="elevated"
                @click="solicitarResgate"
                :disabled="(cupomMetricas?.resumo?.totalGanhos || 0) <= 10"
              >
                <VIcon icon="mdi-bank-transfer" class="mr-2" />
                Solicitar Resgate
              </VBtn>
            </div>
            <div class="mt-5 d-flex flex-column ga-2">
              <v-chip :color="minhasSolicitacoes?.length > 0 ? 'orange' : 'success'" variant="tonal" style="max-width: 100%;">
                <v-icon icon="mdi-information" class="mr-2" ></v-icon>
                {{ minhasSolicitacoes?.length > 0 ? 'Você tem uma solicitação de resgate pendente, espera a conclusão antes de uma nova solicitação.' : 'Seu saldo está disponível para resgate, realize uma solicitação de resgate para retirá-lo' }}
              </v-chip>
              <v-chip color="blue-lighten-2" variant="tonal" style="max-width: 100%;">
                <v-icon icon="mdi-information" class="mr-2"></v-icon>
                Seu saldo será acumulado ao mês atual caso não seja resgatado.
              </v-chip>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Informações Importantes -->
    <VCard class="mt-6" elevation="2" color="info" variant="tonal">
      <VCardText>
        <VRow align="center">
          <VCol>
            <div class="d-flex align-center mb-3">
              <VIcon icon="mdi-information" size="24" class="mr-3" color="info" />
              <div class="text-h6 font-weight-bold">Informações Importantes</div>
            </div>
            <div class="text-body-2 mb-3">
              • Este cupom é válido apenas para consultas presenciais. Não pode ser combinado com outras promoções...

            </div>
          </VCol>
          <VCol cols="auto">
            <VBtn 
              color="info" 
              variant="outlined" 
              @click="navigateToInfo"
              prepend-icon="mdi-arrow-right"
            >
              Ver Mais
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <!-- Create Cupom Dialog -->
    <VDialog v-model="showCreateDialog" max-width="500">
      <VCard class="text-center pa-6">
        <div class="mb-6">
          <VIcon icon="mdi-ticket-confirmation" size="80" color="primary" class="mb-4" />
          <h2 class="text-h5 font-weight-bold mb-2">
            {{ cupons?.length > 0 ? 'Cupom Já Criado!' : 'Gerar Cupom de Desconto' }}
          </h2>
          <p class="text-body-1 text-grey-600">
            {{ cupons?.length > 0
              ? 'Você já possui um cupom ativo. Apenas 1 cupom por médico é permitido.'
              : 'Será gerado automaticamente um cupom de 10% de desconto válido até 31/12/2026.'
            }}
          </p>
        </div>

        <VAlert v-if="cupons?.length === 0" type="info" class="mb-6 text-left">
          <strong>Detalhes do cupom:</strong><br>
          • Desconto: 10%<br>
          • Limite: 10 usos<br>
          • Validade: 31/12/2026
        </VAlert>

        <VAlert v-else type="warning" class="mb-6">
          Para criar um novo cupom, entre em contato com o suporte.
        </VAlert>

        <div class="d-flex gap-3 justify-space-between">
          <VBtn variant="outlined" @click="showCreateDialog = false">
            Cancelar
          </VBtn>
          <VBtn color="primary" @click="createCupom" :loading="creating" :disabled="cupons?.length > 0" size="large">
            {{ cupons?.length > 0 ? 'Cupom Já Existe' : 'Gerar Cupom' }}
          </VBtn>
        </div>
      </VCard>
    </VDialog>



    <!-- Dialog de Resgate -->
    <VDialog v-model="showResgateDialog" max-width="800" scrollable>
      <VCard class="bg-blue-lighten-5" rounded="xl">
        <VCardTitle class="text-center pa-6 bg-success text-white">
          <VIcon icon="mdi-bank-transfer" size="64" color="white" class="mb-4" />
          <h2 class="text-h4 font-weight-bold mb-2">
            Solicitar Resgate
          </h2>
          <p class="text-body-1">Transfira seu saldo para sua conta PIX</p>
        </VCardTitle>

        <VCardText class="pa-6">
          <VRow>
            <VCol cols="12">
              <VCard  class="mb-6 bg-white" elevation="4">
                <VCardText class="text-center pa-6">
                  <VIcon icon="mdi-wallet" size="32" :color="minhasSolicitacoes?.length > 0 ? 'grey' : 'success'" class="mb-3" />
                  <div class="text-h3 font-weight-bold mb-3" :class="minhasSolicitacoes?.length > 0 ? 'text-grey-500' : 'text-success'">
                     R$ {{ saldoFormatado }} 
                  </div>
                  <div class="text-body-1 font-weight-medium text-success" :class="minhasSolicitacoes?.length > 0 ? 'text-orange-darken-1' : 'text-grey-700'">
                    {{ minhasSolicitacoes?.length > 0 ? 'Existe uma solicitação de resgate pendente' : 'Saldo disponível para resgate' }}
                  </div>
                </VCardText>
              </VCard>
            </VCol>
            
            <VCol cols="12" v-if="minhasSolicitacoes?.length > 0">
              <VCard variant="outlined" color="orange" class="mb-6 bg-orange-lighten-5" elevation="2">
                <VCardText class="pa-4">
                  <div class="d-flex align-center mb-3">
                    <VIcon icon="mdi-clock-outline" color="orange-darken-2" size="20" class="mr-2" />
                    <div class="text-subtitle-1 font-weight-bold text-orange-darken-2">Resgate Pendente</div>
                  </div>
                  <div class="text-body-2 mb-2"><strong>Chave PIX:</strong> {{ minhasSolicitacoes[0].chavePix }}</div>
                  <div class="text-body-2 mb-2"><strong>Valor:</strong> R$ {{ minhasSolicitacoes[0].valorTotal?.toFixed(2).replace('.', ',') }}</div>
                  <div class="text-body-2"><strong>Status:</strong> 
                    <VChip size="small" color="orange" variant="tonal" class="ml-2">{{ minhasSolicitacoes[0].status }}</VChip>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
            
            <VCol cols="12">
              <div class="mb-6">
                <div class="text-h6 font-weight-bold mb-2">Dados para Transferência</div>
                <div class="text-caption text-grey-600 mb-4">
                  CPF, CNPJ, e-mail, telefone ou chave aleatória
                </div>
                <VTextField
                  v-model="chavePixDigitada"
                  label="Chave PIX"
                  placeholder="Digite sua chave PIX"
                  variant="outlined"
                  prepend-inner-icon="mdi-key"
                  :rules="[
                    v => !!v || 'Chave PIX é obrigatória',
                    v => validarChavePix(v) || 'Chave PIX inválida'
                  ]"
                  required
                  @input="chavePixDigitada = aplicarMascara($event.target.value)"
                  :disabled="minhasSolicitacoes?.length > 0"
                />
              </div>
            </VCol>
          </VRow>

          <VAlert type="info" variant="tonal" class="mb-6" border="start">
            <template v-slot:prepend>
              <VIcon icon="mdi-information" />
            </template>
            <div class="text-body-2">
              <strong>Informações importantes:</strong><br>
              • O valor será transferido em até 30 dias úteis<br>
              • Valor mínimo para resgate: R$ 10,00<br>
              • Verifique se a chave PIX está correta antes de confirmar
            </div>
          </VAlert>
        </VCardText>

        <VCardActions class="d-flex flex-column-reverse pa-6">
          <VBtn 
            variant="outlined" 
            size="large" 
            class="w-100" 
            @click="showResgateDialog = false" 
            :disabled="processandoResgate"
          >
            Cancelar
          </VBtn>
          <VBtn 
            color="white"
            size="large"
            class="w-100 mb-3 bg-success text-white"
            @click="resgatarSaldo" 
            :loading="processandoResgate" 
            :disabled="!chavePixDigitada || !validarChavePix(chavePixDigitada) || minhasSolicitacoes?.length > 0"
          >
            <VIcon icon="mdi-send" color="white" class="mr-2" />
            Confirmar Resgate
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { ref, computed, onMounted, watch, watchEffect } from 'vue';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import { getUserID } from '@/utils/auth'
import cupomService from '@/services/cupom/cupom-service';

const router = useRouter();

const showCreateDialog = ref(false);
const showResgateDialog = ref(false);
const chavePixDigitada = ref('');
const processandoResgate = ref(false);
const creating = ref(false);
const formRef = ref(null);
const loading = ref(false)
const dataLoading = ref(true)
const meuCupom = ref(null)
const cupomMetricas = ref(null)
const metricasFinanceiras = ref(null)
const selectedMonth = ref(dayjs().format('MM'))
const saldo = ref(0)
const minhasSolicitacoes = ref()
const saldoBruto = computed(() => saldo.value?.totalAcumulado || 0)
const saldoPendendete = computed(() => minhasSolicitacoes.value?.[0]?.valorTotal || 0)
const saldoAtual = computed(() => saldoBruto.value - saldoPendendete.value)

const saldoFormatado = computed(() => {
  const valor = !minhasSolicitacoes.value ? saldo.value?.totalAcumulado : saldoAtual.value || 0
  return Number(valor).toFixed(2).replace('.', ',')
})



onMounted(async () => {
  await Promise.all([
    getMyCupom(),
    saldoDisponivel(),
    buscarMetricasFinanceiras(),
    verMinhasSolicitacoes()
  ])
})

watch([selectedMonth, () => meuCupom.value?.id], async () => {
  if (meuCupom.value?.id) {
    await buscarCupomMetricas()
  }
}, { immediate: true })

const buscarMetricasFinanceiras = async () => {
  try {
    const userId = getUserID()
    const response = await cupomService.metricasFinanceiras(userId)
    metricasFinanceiras.value = response.data
  } catch (error) {
    console.error('Erro ao buscar métricas do cupom:', error)
  }
}

const verMinhasSolicitacoes = async () => {
  try {
    const response = await cupomService.getSolicitacoesResgate()
    minhasSolicitacoes.value = response.data 
  } catch (error) {
    console.error('Erro ao buscar métricas do cupom:', error)
  }
}

const resgatarSaldo = async () => {
  processandoResgate.value = true
  try {
    const chavePix = chavePixDigitada.value
    const valorSolicitado = saldo?.totalAcumulado
    await cupomService.postResgate(chavePix, valorSolicitado)
    toast.success('Solicitação de resgate enviada com sucesso!')
    showResgateDialog.value = false
    chavePixDigitada.value = ''
    await verMinhasSolicitacoes()
  } catch (error) {
    console.error('Erro ao resgatar saldo:', error)
    toast.error('Erro ao processar resgate')
  } finally {
    processandoResgate.value = false
  }
}

const saldoDisponivel = async () => {
  try {
    const response = await cupomService.getSaldo()
    saldo.value = response.data 
  } catch (error) {
    console.error('Erro ao buscar métricas do cupom:', error)
  }
}

const buscarCupomMetricas = async () => {
  if (meuCupom.value?.id) {
    try {
      const cupomId = meuCupom.value.id
      const mes = parseInt(selectedMonth.value)
      const response = await cupomService.cupomMetricas(cupomId, mes)
      cupomMetricas.value = response.data
    } catch (error) {
      console.error('Erro ao buscar métricas do cupom:', error)
    }
  }
}

const getSelectedMonthName = () => {
  const month = monthOptions.find(m => m.value === selectedMonth.value)
  return month ? month.title : 'Mês Atual'
}

const getMyCupom = async () => {
  dataLoading.value = true
  try {
    const response = await cupomService.getCupomByResponsavelID(getUserID())
    meuCupom.value = response.data && response.data.id ? response.data : null
    cupons.value = meuCupom.value ? [meuCupom.value] : []
  } catch (error) {
    console.error('Erro ao carregar cupom:', error)
    cupons.value = []
  } finally {
    dataLoading.value = false
  }
}

const newCupom = {
  codigo: 'MEDADMIN',
  limiteMaximoDeUso: 999,
  validade: dayjs().add(2, 'year').toISOString(),
  porcentagem: 10,
  responsavelID: getUserID()
};

const cupons = ref([]);

const monthOptions = [
  { title: 'Janeiro', value: '01' },
  { title: 'Fevereiro', value: '02' },
  { title: 'Março', value: '03' },
  { title: 'Abril', value: '04' },
  { title: 'Maio', value: '05' },
  { title: 'Junho', value: '06' },
  { title: 'Julho', value: '07' },
  { title: 'Agosto', value: '08' },
  { title: 'Setembro', value: '09' },
  { title: 'Outubro', value: '10' },
  { title: 'Novembro', value: '11' },
  { title: 'Dezembro', value: '12' }
];


const aplicarMascara = (valor) => {
  const numeros = valor.replace(/\D/g, '');
  
  // Se contém @ é email
  if (valor.includes('@')) {
    return valor;
  }
  
  // Se tem 14 dígitos é CNPJ
  if (numeros.length === 14) {
    return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  
  // Se tem 11 dígitos, verifica se é celular (começa com 1) ou CPF
  if (numeros.length === 11) {
    // Se começa com 1 é celular: (11) 91907-2667
    if (numeros.startsWith('1')) {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    // Senão é CPF: 000.000.000-00
    return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  
  // Se tem 10 dígitos é celular fixo: (11) 9190-7266
  if (numeros.length === 10) {
    return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return valor;
};

const validarChavePix = (chave) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const chaveAleatoria = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
  
  const numeros = chave.replace(/\D/g, '');

  // Email
  if (chave.includes('@')) {
    return emailRegex.test(chave);
  }
  
  // Chave aleatória
  if (chaveAleatoria.test(chave)) {
    return true;
  }
  
  // CPF (11 dígitos)
  if (numeros.length === 11) {
    return true;
  }
  
  // CNPJ (14 dígitos)
  if (numeros.length === 14) {
    return true;
  }
  
  // Telefone (10 ou 11 dígitos)
  if (numeros.length === 10) {
    return true;
  }

  return false;
};

const createCupom = async () => {
  if (cupons.value?.length > 0) {
    toast.error('Você já possui um cupom ativo!')
    return
  }
  loading.value = true
  try {
    await cupomService.createCupomByMedico(newCupom)
    await getMyCupom()
    toast.success('Cupom criado com sucesso!')
  } catch (error) {
    toast.error('Erro ao gerar cupom')
  } finally {
    loading.value = false
    showCreateDialog.value = false
  }
}

const isValidCupom = (cupom) => {
  const hoje = new Date();
  const validade = new Date(cupom.validade);
  return validade >= hoje && cupom.quantidadeUtilizada < cupom.limiteMaximoDeUso;
};

const getTicketClass = (isValid) => {
  return {
    'ticket-active': isValid,
    'ticket-expired': !isValid
  };
};

const stats = computed(() => ({
  total: cupons.value?.length || 0,
  active: cupons.value?.filter(c => isValidCupom(c)).length || 0,
  used: cupons.value?.reduce((sum, c) => sum + c.quantidadeUtilizada, 0) || 0,
  expired: cupons.value?.filter(c => !isValidCupom(c)).length || 0
}));



const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR');
};



const copyCoupon = async (codigo) => {
  try {
    await navigator.clipboard.writeText(codigo);
    toast.success('Código copiado!');
  } catch (err) {
    toast.error('Erro ao copiar código');
  }
};




const navigateToInfo = () => {
  window.open('/cupom-info', '_blank')
};

const solicitarResgate = () => {
  showResgateDialog.value = true;
};

const confirmarResgate = async () => {
  processandoResgate.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success('Solicitação de resgate enviada com sucesso!');
    showResgateDialog.value = false;
    chavePixDigitada.value = '';
    await buscarCupomMetricas();
  } catch (error) {
    toast.error('Erro ao processar resgate');
  } finally {
    processandoResgate.value = false;
  }
};
</script>

<style scoped>
.ticket-container {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.ticket-container:hover {
  transform: translateY(-4px);
}

.ticket {
  background: #2c3e50;
  border-radius: 8px;
  padding: 20px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #34495e;
}

.ticket-active {
  background: #27ae60;
  border-color: #2ecc71;
}

.ticket-expired {
  background: #e74c3c;
  border-color: #c0392b;
  opacity: 0.8;
}

.ticket-used {
  background: #f39c12;
  border-color: #e67e22;
}

.ticket-header {
  margin-bottom: 16px;
}

.ticket-body {
  margin-bottom: 16px;
}

.ticket-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 12px;
}

.coupon-code {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.code-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.code-display-large {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.coupon-code-large {
  background: #34495e;
  border-radius: 8px;
  padding: 16px;
  color: white;
  border: 1px solid #2c3e50;
}

.perforation {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #ecf0f1;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}

.perforation-left {
  left: -8px;
}

.perforation-right {
  right: -8px;
}

.details-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  padding: 8px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 6px;
}


.personacard {
  background-size: cover;
  background-position: center;
  position: relative;
}

.personacard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  border-radius: inherit;
}

.filter-section {
  padding: 16px 0;
}

.filter-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.filter-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.earnings-card {
  background: linear-gradient(135deg, #f8fff8 0%, #ffffff 100%);
  border: 1px solid rgba(76, 175, 80, 0.2);
  transition: all 0.3s ease;
}

.earnings-card:hover {
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.15);
}

.btn-cancelar {
  background-color: #27ae5f86;
  color: #fff;
}
</style>
