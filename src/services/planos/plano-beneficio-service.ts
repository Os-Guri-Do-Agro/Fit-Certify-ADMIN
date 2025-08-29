import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'

class PlanoService {
  private async handleRequest<T>(
    request: Promise<{ data: T }>,
    errorMessage: string
  ): Promise<T> {
    try {
      const { data } = await request
      return data
    } catch (error: any) {
      handleError(`${errorMessage}: ${error.message}`, error)
      throw error
    }
  }

  getAllPlanos(): Promise<any> {
    return this.handleRequest(
      apiClient.get('/plano', {
      }),
      'ERROR - 404'
    )
  }
}


export default new PlanoService()
