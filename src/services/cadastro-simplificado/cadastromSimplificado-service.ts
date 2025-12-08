import apiClient from '../api-service'

class cadastroSimplificadoService {
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

  createCdastroSimples(data: any): Promise<any> {
    return this.handleRequest(
      apiClient.post('/cadastro-simplificado', data),
      'Failed to create cadastroSimples'
    )
  }

}

export default new cadastroSimplificadoService()
