import apiClient from '../api-service'
import { getToken } from '@/utils/auth'

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
    const token = getToken()
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
    const token = getToken()
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
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/medico/findAllpagined`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, pageSize },
      }),
      'Falha ao buscar médicos paginados'
    )
  }

  async getMetricsById(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/medico/getMetricsByMedicoId?data=${data}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to get all metrics by day '
    )
  }

  async getMonthlyMetricsById(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/medico/getMonthlyMetricsByMedicoId?data=${data}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to get all metrics by day '
    )
  }

  async createMedico(formData: FormData): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/medico', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      }),
      'Failed to create medico'
    )
  }

  async editMedicoByProfile(data: FormData): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.patch(`/medico/updateProfile`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }),
      'Failed to update atleta profile'
    )
  }

  async updateMedico(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.patch(`/medico/atualizar-perfil-publico/`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }),
      'Failed to update medico'
    )
  }

   async validarCrm(validateCrmDto: any): Promise<any> {
     const token = getToken()
     return this.handleRequest(
       apiClient.post('/medico/validar-crm', validateCrmDto, {
         headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
         },
      }),
       'Failed to validate CRM'
     )
   }

   async consultarCrm(consultarCrmDto: any): Promise<any> {
     const token = getToken()
     return this.handleRequest(
       apiClient.post('/medico/consultar-crm', consultarCrmDto, {
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
         },
       }),
       'Failed to consult CRM'
     )
   }
}

export default new medicoService()
