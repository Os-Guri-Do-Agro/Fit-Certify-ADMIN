import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'
import { getToken } from '@/utils/auth'
// import { CategoryEntity, CreateCategoryDto, UpdateCategoryDto } from '@/common/types/category'

class conviteEventoService {
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

  putAceitarConvite(data: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.put('/convite-medico-evento/aceitar', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to update convite'
    )
  }

  putRejeitarConvite(data: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.put('/convite-medico-evento/rejeitar', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to update convite'
    )
  }

  getConvitesMedico(): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get('/convite-medico-evento/meus-convites-medico', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to fetch all convites'
    )
  }

}

export default new conviteEventoService()
