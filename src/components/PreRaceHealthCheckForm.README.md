# Formulário de Check-in de Saúde Pré-Prova

## Visão Geral

Sistema de check-in de saúde para atletas responderem poucas horas antes da corrida, complementando o atestado médico anual. Identifica riscos agudos de saúde não captados por avaliações médicas anteriores.

## Estrutura de Arquivos

```
src/
├── components/
│   └── PreRaceHealthCheckForm.vue          # Componente principal do formulário
├── pages/
│   └── Atleta-Screens/
│       └── checkInSaude/
│           └── index.vue                    # Página do check-in
├── services/
│   └── health-check/
│       └── health-check-service.ts          # Service para API
└── Interfaces/
    └── pre-race-health-check.interface.ts   # Tipagem TypeScript
```

## Componentes

### PreRaceHealthCheckForm.vue

Componente principal que contém todo o formulário de check-in.

**Props:**
- `eventoId` (opcional): ID do evento para vincular o check-in

**Características:**
- Todos os campos são opcionais
- 5 seções organizadas por categoria
- Design responsivo
- Validação não bloqueante
- Preparado para cálculo de score de risco futuro

### Seções do Formulário

1. **Sintomas Cardiovasculares e Respiratórios**
   - Dor/pressão no peito, palpitações, falta de ar (48h)
   - Tontura, escurecimento visual, desmaio (2 dias)

2. **Condições Gerais de Saúde**
   - Febre ou calafrios (24h)
   - Vômito ou náusea persistente (12h)
   - Estado mental alerta

3. **Sono e Recuperação**
   - Horas de sono na última noite

4. **Medicamentos e Suplementos**
   - Termogênicos/pré-treino/estimulantes (12h)
   - Anti-inflamatórios/analgésicos (6h)

5. **Condições Físicas e Ambientais**
   - Viagem longa/mudança de altitude (1 semana)
   - Dor articular/muscular que altere corrida

## Interface de Dados

```typescript
interface PreRaceHealthCheckData {
  sintomasCardiovasculares: boolean | null
  tonturaDesmai\u043e: boolean | null
  febreCalafrios: boolean | null
  vomitoNausea: boolean | null
  alertaMental: boolean | null
  horasSono: number | null
  suplementoEstimulante: boolean | null
  antiInflamatorioAnalgesico: boolean | null
  viagemAltitude: boolean | null
  dorArticularMuscular: boolean | null
  dataPreenchimento?: string
  atletaId?: number
  eventoId?: number
}
```

## Service API

### Endpoints Disponíveis

```typescript
// Enviar check-in
healthCheckService.submitPreRaceCheck(data)

// Buscar check-ins do atleta
healthCheckService.getAtletaHealthChecks(atletaId)

// Buscar check-in específico
healthCheckService.getHealthCheckById(checkId)

// Buscar check-ins de um evento
healthCheckService.getEventHealthChecks(eventoId)
```

## Uso

### Como Componente

```vue
<template>
  <PreRaceHealthCheckForm :eventoId="123" />
</template>

<script setup>
import PreRaceHealthCheckForm from '@/components/PreRaceHealthCheckForm.vue'
</script>
```

### Como Página

Acesse: `/atleta/check-in-saude?eventoId=123`

## Integração com Backend

O service está preparado para integração. Configure o endpoint no backend:

**POST** `/health-check/pre-race`

**Body:**
```json
{
  "sintomasCardiovasculares": true,
  "tonturaDesmai\u043e": false,
  "febreCalafrios": false,
  "vomitoNausea": false,
  "alertaMental": true,
  "horasSono": 7.5,
  "suplementoEstimulante": false,
  "antiInflamatorioAnalgesico": true,
  "viagemAltitude": false,
  "dorArticularMuscular": false,
  "dataPreenchimento": "2024-01-15T10:30:00.000Z",
  "atletaId": 456,
  "eventoId": 123
}
```

## Futuras Implementações

### Score de Risco

O formulário está preparado para receber um score de risco calculado pelo backend:

```typescript
interface PreRaceHealthCheckResponse {
  success: boolean
  message: string
  data?: PreRaceHealthCheckData
  riskScore?: number  // 0-100
}
```

### Lógica Condicional

Campos preparados para exibição condicional baseada em respostas anteriores. Exemplo:

```vue
<v-col v-if="formData.dorArticularMuscular === true" cols="12">
  <v-textarea
    v-model="formData.descricaoDor"
    label="Descreva a dor"
    variant="outlined"
  />
</v-col>
```

### Alertas Médicos

Sistema preparado para exibir alertas baseados em respostas críticas:

```typescript
const checkCriticalResponses = () => {
  if (formData.value.sintomasCardiovasculares === true) {
    // Exibir alerta para equipe médica
  }
}
```

## Padrão de Design

- Cores: Gradiente azul (#42A5F5 → #1E88E5)
- Ícones: Material Design Icons (mdi)
- Campos: Arredondados (rounded="lg")
- Cards: Elevação 4, bordas arredondadas
- Espaçamento: Sistema de grid responsivo
- Tipografia: Hierarquia clara com pesos variados

## Acessibilidade

- Labels descritivos
- Contraste adequado
- Navegação por teclado
- Feedback visual em interações
- Mensagens de erro claras

## Responsividade

- Mobile-first
- Breakpoints: xs, sm, md, lg, xl
- Grid adaptativo
- Botões empilhados em mobile
- Campos full-width em telas pequenas
