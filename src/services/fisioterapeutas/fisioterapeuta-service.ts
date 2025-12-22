import apiClient from '../api-service';
import { getToken } from '@/utils/auth';
class fisioterapeutaService {
  private async handleRequest<T>(request: Promise<{ data: T }>, errorMessage: string): Promise<T> {
    try {
      const { data } = await request;
      return data;
    } catch (error: any) {
      console.error(`${errorMessage}: ${error.message}`, error);
      throw error;
    }
  }

  async createFisioterapeuta(formData: FormData): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/fisioterapeuta', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }),
      'Failed to create fisioterapeuta'
    )
  }

  async getFisioterapeutaById(id: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/fisioterapeuta/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }),
      'Failed to get fisioterapeuta by ID'
    )
  }

  async solicitarConexao(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/solicitacao-conexao/enviar', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }),
      'Failed to solicitar conexão'
    )
  }

  async updateFisioterapeuta(id: string, formData: FormData): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.patch(`/fisioterapeuta/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      }),
      'Failed to update fisioterapeuta'
    )
  }

  async getConexoesPagined(page: number, pageSize: number): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/fisioterapeuta/conexoes/findAllpagined`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, pageSize },
      }),
      'Falha ao buscar fisioterapeutas paginados'
    )
  }

  async gerarCodigoConvite(): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/fisioterapeuta/gerar-codigo-convite', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao gerar código de convite'
    )
  }

  async updatePerfilPublico(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.patch('/fisioterapeuta/atualizar-perfil-publico', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }),
      'Failed to update perfil publico'
    )
  }

  async updatePerfil(formData: FormData): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.patch('/fisioterapeuta/updateProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      }),
      'Failed to update fisioterapeuta'
    )
  }

  async getFisioterapeutasPagined(page: number, pageSize: number): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/fisioterapeuta/findAllPagined`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, pageSize },
      }),
      'Falha ao buscar fisioterapeutas paginados'
    )
  }

  async getFisioFindPacientesPagined(page: number, pageSize: number, nome: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/fisioterapeuta/findPacientesPagined?page=${page}&pageSize=${pageSize}&nome=${nome}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      'Falha ao buscar pacientes paginados'
    );
  }

  async getMetricsById(data: any): Promise<any> {
  const token = getToken()
    return this.handleRequest(
      apiClient.get(`/fisioterapeuta/getMetricsByFisioterapeutaId?data=${data}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      'Failed to get all metrics by day '
    );
  }


}

export default new fisioterapeutaService();
