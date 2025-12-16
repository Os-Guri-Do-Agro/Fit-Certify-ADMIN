import apiClient from '../api-service'
import { getToken } from '@/utils/auth'

class alergiaService {
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

  async getAlergiaAtletaId(id: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/alergia-atleta/findByAtletaId/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to get alergias by atleta ID'
    )
  }
}

export default new alergiaService()
