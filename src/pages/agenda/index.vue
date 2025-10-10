<template>
  <v-container fluid class="pa-4">
    <h1>Integração por whatsapp ou email ou
Colocar agenda de em vez de Análise
icone exclusivo quando marca pelo fit
medico pode criar itens e colocar pacientes quando quiser.
Campos para agendar consulta.</h1>
    <v-row class="mb-4" align="center" justify="space-between">
      <v-col cols="auto">
        <h2 class="text-h4 font-weight-bold">Agenda</h2>
      </v-col>
      <v-col cols="auto">
        <v-btn-toggle v-model="mesAtual" color="blue" rounded="lg">
          <v-btn @click="mudarMes(-1)" icon="mdi-chevron-left"></v-btn>
          <v-btn disabled class="px-6">{{ nomeDoMes }}</v-btn>
          <v-btn @click="mudarMes(1)" icon="mdi-chevron-right"></v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-card rounded="lg" variant="outlined" color="blue" class="calendar-container">
      <v-card-title class="bg-blue text-white pa-3">
        <v-icon class="mr-2">mdi-calendar-month</v-icon>
        {{ nomeDoMes }} {{ anoAtual }}
      </v-card-title>

      <v-card-text class="pa-0">
        <!-- Cabeçalho dos dias da semana -->
        <v-row no-gutters class="weekdays-header">
          <v-col v-for="dia in diasSemana" :key="dia" class="text-center pa-2 font-weight-bold">
            {{ dia }}
          </v-col>
        </v-row>

        <!-- Grid do calendário -->
        <div class="calendar-grid">
          <div
            v-for="dia in diasDoMes"
            :key="dia.data"
            class="calendar-day"
            :class="{
              'today': dia.isToday,
              'other-month': !dia.isCurrentMonth,
              'selected': dia.data === dataSelecionada,
              'has-todo': todos[dia.data]
            }"
            @click="selecionarDia(dia)"
          >
            <div class="day-number">{{ dia.numero }}</div>
            <div v-if="todos[dia.data]" class="todo-indicator"></div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Modal TODO -->
    <v-dialog v-model="showTodoModal" max-width="500">
      <v-card>
        <v-card-title class="bg-blue text-white">
          <v-icon class="mr-2">mdi-format-list-checks</v-icon>
          TODO - {{ formatDate(dataSelecionada) }}
        </v-card-title>
        <v-card-text class="pa-4">
          <v-textarea
            v-model="todoText"
            placeholder="Escreva o que precisa fazer..."
            variant="outlined"
            rows="8"
            no-resize
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="showTodoModal = false">Cancelar</v-btn>
          <v-btn color="blue" variant="flat" @click="salvarTodo">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

const hoje = new Date()
const mesAtual = ref(hoje.getMonth())
const anoAtual = ref(hoje.getFullYear())
const dataSelecionada = ref('')
const todoText = ref('')
const todos = ref({})
const showTodoModal = ref(false)

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const nomeDoMes = computed(() => {
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  return meses[mesAtual.value]
})

const diasDoMes = computed(() => {
  const primeiroDia = new Date(anoAtual.value, mesAtual.value, 1)
  const ultimoDia = new Date(anoAtual.value, mesAtual.value + 1, 0)
  const diasAnteriores = primeiroDia.getDay()
  const dias = []

  // Dias do mês anterior
  for (let i = diasAnteriores - 1; i >= 0; i--) {
    const data = new Date(anoAtual.value, mesAtual.value, -i)
    dias.push({
      numero: data.getDate(),
      data: data.toISOString().substr(0, 10),
      isCurrentMonth: false,
      isToday: false
    })
  }

  // Dias do mês atual
  for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
    const data = new Date(anoAtual.value, mesAtual.value, dia)
    const dataString = data.toISOString().substr(0, 10)
    const isToday = dataString === hoje.toISOString().substr(0, 10)

    dias.push({
      numero: dia,
      data: dataString,
      isCurrentMonth: true,
      isToday
    })
  }

  // Dias do próximo mês para completar a grade
  const diasRestantes = 42 - dias.length
  for (let dia = 1; dia <= diasRestantes; dia++) {
    const data = new Date(anoAtual.value, mesAtual.value + 1, dia)
    dias.push({
      numero: dia,
      data: data.toISOString().substr(0, 10),
      isCurrentMonth: false,
      isToday: false
    })
  }

  return dias
})

const mudarMes = (direcao) => {
  mesAtual.value += direcao
  if (mesAtual.value > 11) {
    mesAtual.value = 0
    anoAtual.value++
  } else if (mesAtual.value < 0) {
    mesAtual.value = 11
    anoAtual.value--
  }
}

const selecionarDia = (dia) => {
  if (!dia.isCurrentMonth) return
  dataSelecionada.value = dia.data
  todoText.value = todos.value[dia.data] || ''
  showTodoModal.value = true
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

const salvarTodo = () => {
  if (todoText.value.trim()) {
    todos.value[dataSelecionada.value] = todoText.value
  } else {
    delete todos.value[dataSelecionada.value]
  }
  showTodoModal.value = false
}
</script>

<style scoped>
.calendar-container {
  min-height: 80vh;
}

.weekdays-header {
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #e0e0e0;
}

.calendar-day {
  background-color: white;
  min-height: 120px;
  padding: 8px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
}

.calendar-day:hover {
  background-color: #e3f2fd;
}

.calendar-day.today {
  background-color: #bbdefb;
}

.calendar-day.selected {
  background-color: #2196f3;
  color: white;
}

.calendar-day.other-month {
  background-color: #fafafa;
  color: #bdbdbd;
  cursor: not-allowed;
}

.calendar-day.has-todo {
  border-left: 4px solid #ff5722;
}

.day-number {
  font-weight: bold;
  font-size: 16px;
}

.todo-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  background-color: #ff5722;
  border-radius: 50%;
}
</style>
