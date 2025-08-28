import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'
// import { CategoryEntity, CreateCategoryDto, UpdateCategoryDto } from '@/common/types/category'

interface LoginCredentials {
  email: string
  senha: string
  isMobile?: boolean
}

class AuthService {
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

  login(data: LoginCredentials): Promise<any> {
    return this.handleRequest(
      apiClient.post('/auth/login', data),
      'Erro no login'
    )
  }

}


export default new AuthService()
