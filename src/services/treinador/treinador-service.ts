import apiClient from '../api-service'

class treinadorService {
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

  createTreinador(data: any): Promise<any> {
  const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.post('/treinador', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao criar treinador'
    )
  }

  getTreinadorById(id: string): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/treinador/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao obter treinador por ID'
    )
  }

  updateTreinador(id: string, data: any): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.patch(`/treinador/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao atualizar treinador'
    )
  }

  gerarCodigoConvite(): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.post('/treinador/gerar-codigo-convite', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao gerar código de convite'
    )
  }
}

export default new treinadorService()
