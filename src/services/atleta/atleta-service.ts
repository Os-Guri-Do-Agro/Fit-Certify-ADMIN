import apiClient from '../api-service'

class atletaService {
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

  async getAtletaById(id: string): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/atleta/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      'Failed to get all Doencas '
    )
  }
  async getAllAtletas(): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/atleta`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      'Failed to get all Doencas '
    )
  }

  async editAtletaByProfile(data: FormData): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.patch(`/atleta/updateProfile`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }),
      'Failed to update atleta profile'
    )
  }
  async findMedicosComConsultasPagined(page = 1, pageSize = 5): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/atleta/findMedicosComConsultasPagined`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, pageSize },
      }),
      'Falha ao buscar médicos paginados'
    )
  }

  async deleteAtleta(id: string) {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.delete(`atleta/inativar-atleta/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      'Failed to delete account'
    )
  }

  async getMedicosComConsulta(
    page?: number,
    pageSize?: number,
    nome?: string
  ): Promise<any> {
    const token = sessionStorage.getItem('token')
    const params: Record<string, any> = {}

    if (page !== undefined) params.page = page
    if (pageSize !== undefined) params.pageSize = pageSize
    if (nome) params.nome = nome

    return this.handleRequest(
      apiClient.get(`/atleta/findMedicosComConsultasPagined`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      'Failed to get all Doencas '
    )
  }

  async getConsultasByAtletaIdAndMedicoId(atletaId: string, medicoId: string): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/atleta/findConsultasByMedicoAtleta`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { atletaId: atletaId, medicoId: medicoId },
      }),
      'Failed to get consultas by atleta ID and medico ID'
    )
  }

  async getAllInfos(atletaId: string): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/atleta/getAllInfos/${atletaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to get all infos'
    )
  }
}

export default new atletaService()
