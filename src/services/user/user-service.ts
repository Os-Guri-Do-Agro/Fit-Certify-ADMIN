import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'
import { getToken } from '@/utils/auth'

class UserService {
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

  validarExisteEmail(email: string): Promise<any> {
    return this.handleRequest(
      apiClient.get(`/user/validarExisteEmail?email=${email}`, {}),
      'ERROR - 404'
    )
  }

  userById(id: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      'ERROR - 404'
    )
  }

  mudarIdioma(idioma: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.patch('/user/idioma', { idioma }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      'ERROR - 404'
    )
  }

}

export default new UserService()
