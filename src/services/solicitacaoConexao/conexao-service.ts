import apiClient from '../api-service';
import { getToken } from '@/utils/auth'

class conexoesService {
  private async handleRequest<T>(request: Promise<{ data: T }>, errorMessage: string): Promise<T> {
    try {
      const { data } = await request;
      return data;
    } catch (error: any) {
      console.error(`${errorMessage}: ${error.message}`, error);
      throw error;
    }
  }

  async getSolicitacoesConexaoPagined(page: number, pageSize: number, situacao: string, perfil: string): Promise<any> {
        const token = getToken()
        return this.handleRequest(
        apiClient.get(`/solicitacao-conexao/conexoes`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, pageSize, situacao, perfil },
        }),
        'Falha ao buscar solicitações de conexão paginados'
      )
    }

    async getSolicitacoesConexaoPendentes(): Promise<any> {
      const token = getToken()
      return this.handleRequest(
      apiClient.get(`/solicitacao-conexao/pendentes`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Falha ao buscar solicitações de conexão paginados'
    )
  }

    async aceitarSolicitacaoConexao(data: any): Promise<any> {
      const token = getToken()
      return this.handleRequest(
        apiClient.post(`/solicitacao-conexao/aceitar`, data, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        'Falha ao aceitar solicitação de conexão'
      )
    }

    async recusarSolicitacaoConexao(data: any): Promise<any> {
      const token = getToken()
      return this.handleRequest(
        apiClient.post(`/solicitacao-conexao/rejeitar`, data, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        'Falha ao recusar solicitação de conexão'
      )
    }

    async getAllSolicitacoesEnviadas(): Promise<any> {
      const token = getToken()
     return this.handleRequest(
        apiClient.get(`/solicitacao-conexao/enviadas`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        'Falha ao buscar solicitações de conexão enviadas'
      )
    }

    async apagarConexao(id: string): Promise<any> {
      const token = getToken()
      return this.handleRequest(
        apiClient.delete(`/solicitacao-conexao/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        'Falha ao apagar conexão'
      )
    }

}

export default new conexoesService();
