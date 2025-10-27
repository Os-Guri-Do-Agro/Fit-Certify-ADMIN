<template>
  <div class="pa-4">
    <VCard image="../../../assets/banner-admin-cmed.png" class="mb-8 personacard " elevation="3">
      <v-row class=" pa-6">
        <!-- <-->
        <v-col>
          <h2 class="text-h4 font-weight-bold text-white mb-2">
            Cupons de Desconto <br>
            Ofereça Descontos Exclusivos
          </h2>

          <p class="text-h6 text-white mb-4 opacity-90">
            Crie cupons personalizados para seus pacientes
          </p>
          <div class="stats-inline">
            <div class="stat-item">
              <span class="stat-number">{{ stats.total }}</span>
              <span class="stat-label">Cupons</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">{{ stats.used }}</span>
              <span class="stat-label">Utilizados</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">10%</span>
              <span class="stat-label">Desconto</span>
            </div>
          </div>
        </v-col>
        <v-col class=" d-flex justify-end">
          <VBtn color="#00B5E8" variant="flat" elevation="10" size="large" @click="showCreateDialog = true"
            :disabled="cupons.length > 0">
            <VIcon icon="mdi-ticket-percent" class="mr-2" />
            Gerar Cupom
          </VBtn>
        </v-col>
      </v-row>
    </VCard>

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
import { getUserID } from '@/utils/auth'
import cupomService from '@/services/cupom/cupom-service';

const showCreateDialog = ref(false);
const showDetailsDialog = ref(false);
const selectedCupom = ref(null);
const creating = ref(false);
const formRef = ref(null);

onMounted(async () => {
  await getMyCupom()
})

const getMyCupom = async () => {
  const response = await cupomService.getCupomByResponsavelID(getUserID())
  cupons.value = response.data ? [response.data] : []
}

const newCupom = {
  codigo: 'MEDADMIN',
  limiteMaximoDeUso: 10,
  validade: dayjs('2026-12-31').toISOString(),
  porcentagem: 10,
  responsavelID: getUserID()
};

const cupons = ref([]);


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
    toast.success('Cupom criado com sucesso! Compartilhe com seus pacientes.', {
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


.stats-inline {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: white;
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .stats-inline {
    gap: 15px;
  }

  .stat-number {
    font-size: 20px;
  }
}
</style>
