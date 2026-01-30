import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'
import { getToken } from '@/utils/auth'

class FormularioMedicoService {
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

  responderFormulario(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/formulario-medico/responder', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }),
      'Erro ao responder formulario')
  }

  respostaByEventoId(eventoId: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/formulario-medico/respostas/evento/${eventoId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }),
      'Erro ao buscar formularios respondidos'
    )
  }

  buscarFormularios(): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get('/formulario-medico/eventos', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }),
      'Erro ao buscar formularios'
    )
  }

}

export default new FormularioMedicoService()
