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
            <VCol cols="auto">
              <div class="text-center">
                <div class="text-h5 font-weight-bold text-white">{{ stats.total }}</div>
                <div class="text-caption text-white opacity-80">CUPONS</div>
              </div>
            </VCol>
            <VDivider vertical class="mx-3 opacity-50" />
            <VCol cols="auto">
              <div class="text-center">
                <div class="text-h5 font-weight-bold text-white">{{ stats.used }}</div>
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

    <!-- Cupons Grid -->
    <VRow>
      <VCol v-for="(cupom, index) in cupons" :key="index" cols="12" md="6" lg="4">
        <div class="ticket-container" @click="selectCupom(cupom)">
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
              • Cupons têm validade de 2 anos a partir da criação<br>
              • Desconto de 10% aplicado automaticamente no checkout<br>
              • Limite máximo de 999 usos por cupom<br>
              • Apenas 1 cupom ativo por usuário
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

    <VDialog v-model="showDetailsDialog" max-width="500">
      <VCard v-if="selectedCupom">
        <VCardTitle class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <VIcon icon="mdi-ticket" class="mr-2" color="primary" />
            {{ selectedCupom.nome }}
          </div>

        </VCardTitle>

        <VCardText>
          <div class="mb-4">
            <div class="text-h4 font-weight-bold text-center text-primary mb-2">
              {{ selectedCupom.porcentagem }}% OFF
            </div>
            <div class="text-center text-grey-600 mb-4">{{ selectedCupom.descricao }}</div>

            <div class="coupon-code-large text-center mb-4">
              <div class="text-caption text-grey-500 mb-1">Código do Cupom</div>
              <div class="code-display-large">
                <span class="font-weight-bold text-h5">{{ selectedCupom.codigo }}</span>
                <VBtn icon="mdi-content-copy" variant="text" @click="copyCoupon(selectedCupom.codigo)" />
              </div>
            </div>
          </div>

          <VDivider class="mb-4" />

          <div class="details-grid">
            <div class="detail-item">
              <VIcon icon="mdi-calendar" class="mr-2" />
              <span>Válido até: {{ formatDate(selectedCupom.validade) }}</span>
            </div>
            <div class="detail-item">
              <VIcon icon="mdi-account-group" class="mr-2" />
              <span>Usos: {{ selectedCupom.quantidadeUtilizada }}/{{ selectedCupom.limiteMaximoDeUso }}</span>
            </div>

          </div>
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn @click="showDetailsDialog = false">Fechar</VBtn>
          <VBtn color="primary" variant="outlined" @click="shareCupom(selectedCupom)">
            <VIcon icon="mdi-share" class="mr-2" />
            Compartilhar
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { ref, computed, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import { getUserID } from '@/utils/auth'
import cupomService from '@/services/cupom/cupom-service';

const router = useRouter();

const showCreateDialog = ref(false);
const showDetailsDialog = ref(false);
const selectedCupom = ref(null);
const creating = ref(false);
const formRef = ref(null);

onMounted(async () => {
  selectedMonth.value = dayjs().format('MM')
  await getMyCupom()
})

const getSelectedMonthName = () => {
  const month = monthOptions.find(m => m.value === selectedMonth.value)
  return month ? month.title : 'Mês Atual'
}

const getMyCupom = async () => {
  const response = await cupomService.getCupomByResponsavelID(getUserID())
  cupons.value = (response.data && !Array.isArray(response.data) && Object.keys(response.data).length > 0) ? [response.data] : []
}

const newCupom = {
  codigo: 'MEDADMIN',
  limiteMaximoDeUso: 999,
  validade: dayjs().add(2, 'year').toISOString(),
  porcentagem: 10,
  responsavelID: getUserID()
};

const cupons = ref([]);
const selectedMonth = ref(dayjs().format('MM'));

const monthOptions = [
  { title: 'Todos os meses', value: 'todos' },
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


const createCupom = async () => {
  if (cupons.value?.length > 0) {
    toast.error('Você já possui um cupom ativo!');
    return;
  }
  creating.value = true;
   await cupomService.createCupomByMedico(newCupom)
  setTimeout(async () => {
    creating.value = false;
    showCreateDialog.value = false;
    await getMyCupom()
    toast.success('Cupom criado com sucesso!', {
      duration: 4000
    });
  }, 1500);
};

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

const selectCupom = (cupom) => {
  selectedCupom.value = cupom;
  showDetailsDialog.value = true;
};

const copyCoupon = async (codigo) => {
  try {
    await navigator.clipboard.writeText(codigo);
    toast.success('Código copiado!');
  } catch (err) {
    toast.error('Erro ao copiar código');
  }
};


const shareCupom = (cupom) => {
  const text = `🎫 Cupom de Desconto: ${cupom.porcentagem}% OFF\nCódigo: ${cupom.codigo}\nVálido até: ${formatDate(cupom.validade)}`;

  if (navigator.share) {
    navigator.share({
      title: 'Cupom de Desconto',
      text: text
    });
  } else {
    navigator.clipboard.writeText(text);
    toast.success('Cupom copiado para compartilhar!');
  }
};

const navigateToInfo = () => {
  window.open('/cupom-info', '_blank')
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
</style>
