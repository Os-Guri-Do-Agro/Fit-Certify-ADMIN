import apiClient from '../api-service'

class consultaService {
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
        headers: { 'Authorization': `Bearer ${token}` }
      }),
      'Failed to get consultas by atleta ID'
    )
  }
}

export default new consultaService()
