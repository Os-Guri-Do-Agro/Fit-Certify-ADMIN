import apiClient from '../api-service'

class medicoService {
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

  async getMedicoById(id: string): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/medico/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      'Failed to get all Doencas '
    )
  }

  async getAllMedicos(): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/medico`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      'Failed to get all Doencas '
    )
  }

  async getMedicoFindAllPagined(page = 1, pageSize = 5): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/medico/findAllpagined`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, pageSize },
      }),
      'Falha ao buscar médicos paginados'
    )
  }
}

export default new medicoService()
