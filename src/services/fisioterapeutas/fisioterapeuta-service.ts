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

  async createFisioterapeutaLogado(formData: FormData): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/fisioterapeuta/create-fisioterapeuta-multiPerfil', formData, {
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

  // async getConexoesPagined(page: number, pageSize: number): Promise<any> {
  //   const token = getToken()
  //   return this.handleRequest(
  //     apiClient.get(`/fisioterapeuta/conexoes/findAllpagined`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //       params: { page, pageSize },
  //     }),
  //     'Falha ao buscar fisioterapeutas paginados'
  //   )
  // }

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

  // async getFisioterapeutasPagined(page: number, pageSize: number): Promise<any> {
  //   const token = getToken()
  //   return this.handleRequest(
  //     apiClient.get(`/fisioterapeuta/findAllPagined`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //       params: { page, pageSize },
  //     }),
  //     'Falha ao buscar fisioterapeutas paginados'
  //   )
  // }

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

  async getMonthlyMetricsById(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/fisioterapeuta/getMonthlyMetricsByFisioterapeutaId?data=${data}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to get monthly metrics'
    )
  }

  async getAllFisioterapeutas(): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/fisioterapeuta`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      'Failed to get all fisioterapeutas'
    )
  }

  async validarCrefito(validateCrefitoDto: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/fisioterapeuta/validar-crefito', validateCrefitoDto, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }),
      'Failed to validate CREFITO'
    )
  }

  async consultarCrefito(consultarCrefitoDto: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/fisioterapeuta/consultar-crefito', consultarCrefitoDto, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }),
      'Failed to consult CREFITO'
    )
  }

  async findConsultasByFisioterapeuta(dataInicio: string, dataFim: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post(`/consulta/findConsultasByMedico`,
        { dataInicio, dataFim },
        { headers: { Authorization: `Bearer ${token}` } }
      ),
      'Failed to get consultas by fisioterapeuta'
    )
  }

  async getConsultasPendentesByFisioterapeuta(): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/consulta/findConsultasPendentesFisioterapeuta`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to get consultas pendentes'
    )
  }

  async aceitarOrRejeitarConsultaById(id: string, data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.patch(`/consulta/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to update consulta'
    )
  }

  async findHorariosDisponiveis(requestData: { fisioterapeutaId: string, data: string }): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/consulta/findHorariosDisponiveis', {
        medicoId: '',
        fisioterapeutaId: requestData.fisioterapeutaId,
        data: requestData.data
      }, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to get horarios disponiveis'
    )
  }

  async findConsultasByDayForFisioterapeuta(data: { dataInicio: string, dataFim: string }): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/consulta/findConsultasByMedico', data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to get consultas by day'
    )
  }

  async createConsultaByFisioterapeuta(data: {
    fisioterapeutaId: string
    atletaId?: string
    diagnostico: string
    medicamentosReceitados: string
    situacao: string
    nomePacienteExterno?: string
    consultaExterna: boolean
    dataConsulta: string
  }): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/consulta/fisioterapeuta', data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to create consulta'
    )
  }

  async desativarFisio(id: string, motivo: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.delete(`/fisioterapeuta/inativar-fisioterapeuta/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: { motivo }
      }),
      'Erro ao inativar fisioterapeuta'
    )
  }

  async ativarContaFisioterapeuta(id: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.put(`/fisioterapeuta/reativar-fisioterapeuta/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }),
      'Erro ao reativar conta do fisioterapeuta'
    )
  }
}

export default new fisioterapeutaService();
