import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'
import { getToken } from '../../utils/auth';

class NotificacoesService {
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

  buscarNotificacoes(page: number, pageSize: number): Promise<any> {
    return this.handleRequest(
      apiClient.get(`/notificacao/minhas/paginado?page=${page}&pageSize=${pageSize}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
      }),
      'Erro ao buscar notificações'
    )
  }


  marcarComoLida(ids: string[]): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.patch(`/notificacao/marcar-lida`, { ids }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }),
      'Erro ao marcar notificação como lida'
    )
  }
}


export default new NotificacoesService()
