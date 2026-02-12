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

  getEmailsAlternativos(): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get('/user/emails-alternativos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to fetch alternative emails'
    )
  }

  createEmailAlternativo(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/user/emails-alternativos', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to create alternative email'
    )
  }

  deleteEmailAlternativo(id: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.delete(`/user/emails-alternativos/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to delete alternative email'
    )
  }

  alterarSenhaEmail(data: { email?: string; senhaAtual: string; novaSenha?: string }): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.patch('/user/alterar-senha-email', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to update password or email'
    )
  }

  mudarSenhaEmailAlternativo(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.patch('/user/emails-alternativos?isMobile=true', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to update alternative email password'
    )
  }

}

export default new UserService()
