import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'
import { getToken } from '../../utils/auth';

class StripeService {
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

  stripeCheckout(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post(`/stripe/checkout`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }),
      'ERROR - 404'
    )
  }
}


export default new StripeService()
