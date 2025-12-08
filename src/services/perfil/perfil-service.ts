import apiClient from '../api-service'

class perfilService {
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

  getPerfis(): Promise<any> {
    return this.handleRequest(
      apiClient.get('/perfil'),
      'Failed to get perfis'
    )
  }
}

export default new perfilService()
