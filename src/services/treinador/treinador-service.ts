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
}

export default new treinadorService()
