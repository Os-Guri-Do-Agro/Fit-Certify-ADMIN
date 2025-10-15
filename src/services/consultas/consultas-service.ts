import apiClient from '../api-service'

class consultasService {
  private async handleRequest<T>(
    request: Promise<{ data: T }>,
    errorMessage: string
  ): Promise<T> {
    try {
      const { data } = await request
      return data
    } catch (error: any) {
      console.error(`${errorMessage}: ${error.message}`, error)
      throw error
    }
  }

  async getConsultasByAtletaId(id: string): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/consulta/findByAtletaId/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to get consultas by atleta ID'
    )
  }

  async postConsulta(data: {
    medicoId: string
    atletaId: string
    diagnostico: string
    medicamentosReceitados: string
    situacao: string
  }): Promise<any> {
    const token = sessionStorage.getItem('token')
    if (!token) throw new Error('Usuário não autenticado')

    return this.handleRequest(
      apiClient.post('/consulta', data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Falha ao criar consulta'
    )
  }


  async findHorariosDisponiveis(data: { medicoId: string, data: string }): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.post('/consulta/findHorariosDisponiveis', data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to get horarios disponiveis'
    )
  }
  async findConsultasByDayForMedico(data:
     { dataInicio: string, dataFim: string }): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.post('/consulta/findConsultasByMedico', data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to get horarios disponiveis'
    )
  }

}

export default new consultasService()
