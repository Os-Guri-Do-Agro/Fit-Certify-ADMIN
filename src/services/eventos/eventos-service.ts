import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'
import { getToken } from '@/utils/auth'

class EventoService {
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

  findAllEventosPagined(page: number, pageSize: number, tipoEventoId: string, localidade: string, mes: string, titulo: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/evento/findAllPagined`, {
        params: {
          page,
          pageSize,
          tipoEventoId,
          localidade,
          mes,
          titulo
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }

    }),
      'Failed to get eventos'
    )
  }

  getByEventoId(id: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/evento/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }),
      'Failed to get evento'
    )
  }

  getByEventoAtletaId(eventoId: string, atletaId: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/evento/${eventoId}/${atletaId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }),
      'Failed to get evento'
    )
  }

  getAllTipoEventos(): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/evento/tipo-evento`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }),
      'Failed to get tipo eventos'
    )
  }

  getTipoEventoById(id: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/tipo-evento/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }),
      'Failed to get tipo evento'
    )
  }

  getByData(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/evento/getByData/${data}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      'Erro ao buscar eventos paginados'
    );
  }

}

export default new EventoService()
