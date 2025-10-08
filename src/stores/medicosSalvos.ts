import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

interface Medico {
  id: string | number
  favorito?: boolean
  [key: string]: any
}

export const useMedicosSalvosStore = defineStore('medicosSalvos', () => {
  const medicosSalvos = ref<Medico[]>(JSON.parse(localStorage.getItem('medicos-salvos') ?? '[]'))

  watch(medicosSalvos, (newValue) => {
    localStorage.setItem('medicos-salvos', JSON.stringify(newValue))
  }, { deep: true })

  const adicionarMedico = (medico: Medico) => {
    const existe = medicosSalvos.value.find(m => m.id === medico.id)
    if (!existe) {
      medicosSalvos.value.push({ ...medico, favorito: true })
    }
  }

  const removerMedico = (medicoId: string | number) => {
    const index = medicosSalvos.value.findIndex(m => m.id === medicoId)
    if (index > -1) {
      medicosSalvos.value.splice(index, 1)
    }
  }

  const isMedicoSalvo = (medicoId: string | number): boolean => {
    return medicosSalvos.value.some(m => m.id === medicoId)
  }

  const toggleMedicoSalvo = (medico: Medico): boolean => {
    if (isMedicoSalvo(medico.id)) {
      removerMedico(medico.id)
      return false
    } else {
      adicionarMedico(medico)
      return true
    }
  }

  return {
    medicosSalvos,
    adicionarMedico,
    removerMedico,
    isMedicoSalvo,
    toggleMedicoSalvo
  }
})