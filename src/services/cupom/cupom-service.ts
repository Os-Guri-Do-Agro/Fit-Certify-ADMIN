import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'
// import { CategoryEntity, CreateCategoryDto, UpdateCategoryDto } from '@/common/types/category'

class CupomService {
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

  validarCupom(codigo: string): Promise<any> {
    return this.handleRequest(
      apiClient.get(`/cupom/validar-cupom?codigo=${codigo}`),
      'Failed to fetch all categories'
    )
  }

  updateCupom(id: string): Promise<any> {
    return this.handleRequest(
      apiClient.patch(`/cupom/updateQuantidadeUsada/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      }),
      'Failed to update cupom'
    )
  }


}

export default new CupomService()
