import apiClient from '../../api-service'
import { getToken } from '@/utils/auth'

class pacientesService {
  private async handleRequest<T>(
    request: Promise<{ data: T }>,
    errorMessage: string
  ): Promise<T> {

    try {
      const { data } = await request
      return data
    } catch (error: any) {
      console.error(`${errorMessage}: ${error.message}`, error)
      throw error
    }
  }

  async getAtletasByMedico(
    page?: number,
    pageSize?: number,
    nome?: string,
  ): Promise<any> {
    const token = getToken()
    const params: Record<string, any> = {}

    if (page !== undefined) params.page = page
    if (pageSize !== undefined) params.pageSize = pageSize
    if (nome) params.nome = nome

    return this.handleRequest(
      apiClient.get(`/medico/findPacientesPagined`, {
        params,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to get all Doencas '
    )
  }

  async getAtletasByFisio(
    page?: number,
    pageSize?: number,
    nome?: string,
  ): Promise<any> {
    const token = getToken()
    const params: Record<string, any> = {}

    if (page !== undefined) params.page = page
    if (pageSize !== undefined) params.pageSize = pageSize
    if (nome) params.nome = nome

    return this.handleRequest(
      apiClient.get(`/fisioterapeuta/findPacientesPagined`, {
        params,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to get all Doencas'
    )
  }

 async getAtletasAtendidosByMedico(
    page?: number,
    pageSize?: number,
    nome?: string,
  ): Promise<any> {
    const token = getToken()
    const params: Record<string, any> = {}

    if (page !== undefined) params.page = page
    if (pageSize !== undefined) params.pageSize = pageSize
    if (nome) params.nome = nome

    return this.handleRequest(
      apiClient.get(`/medico/findConsultasPacientesConcluidosPagined`, {
        params,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to get all Doencas '
    )
  }

}


export default new pacientesService()
