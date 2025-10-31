import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'
import { getToken } from '@/utils/auth'
// import { CategoryEntity, CreateCategoryDto, UpdateCategoryDto } from '@/common/types/category'

class PagarmeService {
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

  realizarAssinatura(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post(`/pagarme/plans/subscriptions`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Falha ao realizar assinatura'
    )
  }


  async cancelAtletaSubscriptionPagarme(id: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.delete(`/pagarme/plans/subscriptions/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'ERROR - 404'
    )
  }


  async getInfoSubscription(): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/pagarme/plans/subscriptions/by-email`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'ERROR - 404'
    )
  }

}

export default new PagarmeService()
