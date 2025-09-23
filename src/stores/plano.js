import { defineStore } from 'pinia'

export const usePlanoStore = defineStore('plano', {
  state: () => ({
    planoSelecionado: null
  }),

  actions: {
    setPlanoSelecionado(plano) {
      this.planoSelecionado = plano
    },

    clearPlano() {
      this.planoSelecionado = null
    }
  },

  getters: {
    getPlanoSelecionado: (state) => state.planoSelecionado
  }
})