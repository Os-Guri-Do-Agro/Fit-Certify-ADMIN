import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'
import { getToken } from '@/utils/auth'

class documentosService {
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

  buscarDocumentoByAtleta(atletaId: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/atleta/exames/${atletaId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }),
      'Failed to get documentos by atleta ID'
    )
  }

  baixarDocumento(exameId: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/atleta/exames/download/${exameId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }),
      'Failed to download documento'
    )
  }

  adicionarDocumento(atletaId: string, formData: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post(`/atleta/exames/${atletaId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }),
      'Failed to add documento'
    )
  }


}

export default new documentosService()
