import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const usePacientesSalvosStore = defineStore('pacientesSalvos', () => {
  const pacientesSalvos = ref(JSON.parse(localStorage.getItem('pacientes-salvos') ?? '[]'))

  watch(pacientesSalvos, (newValue) => {
    localStorage.setItem('pacientes-salvos', JSON.stringify(newValue))
  }, { deep: true })

  const adicionarPaciente = (paciente) => {
    const existe = pacientesSalvos.value.find(p => p.id === paciente.id)
    if (!existe) {
      pacientesSalvos.value.push({ ...paciente, salvo: true })
    }
  }

  const removerPaciente = (pacienteId) => {
    const index = pacientesSalvos.value.findIndex(p => p.id === pacienteId)
    if (index > -1) {
      pacientesSalvos.value.splice(index, 1)
    }
  }

  const isPacienteSalvo = (pacienteId) => {
    return pacientesSalvos.value.some(p => p.id === pacienteId)
  }

  const togglePacienteSalvo = (paciente) => {
    if (isPacienteSalvo(paciente.id)) {
      removerPaciente(paciente.id)
      return false
    } else {
      adicionarPaciente(paciente)
      return true
    }
  }

  return {
    pacientesSalvos,
    adicionarPaciente,
    removerPaciente,
    isPacienteSalvo,
    togglePacienteSalvo
  }
})