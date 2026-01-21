import apiClient from '../api-service'
import { getToken } from '@/utils/auth'

class treinadorService {
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

  createTreinador(data: any): Promise<any> {
  const token = getToken()
    return this.handleRequest(
      apiClient.post('/treinador', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao criar treinador'
    )
  }

  createTreinadorLogado(data: any): Promise<any> {
    const token = getToken()
      return this.handleRequest(
        apiClient.post('/treinador/create-treinador-multiPerfil', data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }),
        'Erro ao criar treinador'
      )
    }

  getTreinadorById(id: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/treinador/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao obter treinador por ID'
    )
  }

  updateTreinador(id: string, data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.patch(`/treinador/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao atualizar treinador'
    )
  }

  solicitarConexao(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/solicitacao-conexao/enviar', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao solicitar conexão'
    )
  }

  // getConexoesPagined(page: number, pageSize: number): Promise<any> {
  //   const token = getToken()
  //   return this.handleRequest(
  //     apiClient.get(`/treinador/conexoes/findAllpagined`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //       params: { page, pageSize },
  //     }),
  //     'Falha ao buscar fisioterapeutas paginados'
  //   )
  // }

  gerarCodigoConvite(): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/treinador/gerar-codigo-convite', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao gerar código de convite'
    )
  }

  async desativarTreinador(id: string, motivo: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.delete(`/treinador/inativar-treinador/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: { motivo }
      }),
      'Erro ao inativar treinador'
    )
  }

  async ativarContaTreinador(id: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.put(`/treinador/reativar-treinador/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }),
      'Erro ao reativar conta do treinador'
    )
  }
}

export default new treinadorService()
