import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMedicosSalvosStore = defineStore('medicosSalvos', () => {
  const medicosSalvos = ref([])

  const adicionarMedico = (medico) => {
    const existe = medicosSalvos.value.find(m => m.id === medico.id)
    if (!existe) {
      medicosSalvos.value.push(medico)
    }
  }

  const removerMedico = (medicoId) => {
    const index = medicosSalvos.value.findIndex(m => m.id === medicoId)
    if (index > -1) {
      medicosSalvos.value.splice(index, 1)
    }
  }

  const isMedicoSalvo = (medicoId) => {
    return medicosSalvos.value.some(m => m.id === medicoId)
  }

  return {
    medicosSalvos,
    adicionarMedico,
    removerMedico,
    isMedicoSalvo
  }
})