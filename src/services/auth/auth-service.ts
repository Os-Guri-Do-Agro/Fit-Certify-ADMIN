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

  loginComPerfil(data: any): Promise<any> {
    return this.handleRequest(
      apiClient.post('/auth/login/select-profile', data),
      'Erro no login com perfil'
    )
  }

  enviarCodigo(email: string): Promise<any> {
    return this.handleRequest(
      apiClient.post(`/auth/enviar-codigo-email?email=${email}&isAdmin=true&isCmAdmin=false&isMobile=false`),
      'Erro ao enviar email de redefinição de senha'
    )
  }

  validarCodigoEmail(data: { token: string, codigo: string }): Promise<any> {
    return this.handleRequest(
      apiClient.post(`/auth/validar-codigo-email`, data, {
      }),
      'ERROR - 404'
    )
  }

  validarToken(token: string): Promise<any> {
    return this.handleRequest(
      apiClient.post(`/auth/validar-token?token=${token}`, {
      }),
      'ERROR - 404'
    )
  }

  forgotPassword(data: { token: string, codigo: string, senhaNova: string }): Promise<any> {
    return this.handleRequest(
      apiClient.post(`/auth/forgot-password`, data, {
      }),
      'ERROR - 404'
    )
  }

  forgotPassWordLogado(data: any): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.post(`/auth/forgot-password-logado`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }),
      'ERROR - 404'
    )
  }

}


export default new AuthService()
