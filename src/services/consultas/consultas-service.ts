import apiClient from '../api-service'
import { getToken } from '@/utils/auth'

class consultasService {
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

  async getConsultasByAtletaId(id: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/consulta/findByAtletaId/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to get consultas by atleta ID'
    )
  }

  async findConsultasByMedico(dataInicio: string, dataFim: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post(`/consulta/findConsultasByMedico`,
        { dataInicio, dataFim },
        { headers: { Authorization: `Bearer ${token}` } }
      ),
      'Failed to get consultas by doctor'
    )
  }



  async getConsultasPendentesByMedico(): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/consulta/findConsultasPendentes`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to get consultas by atleta ID'
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
      'Failed to update atleta profile'
    )
  }

  async postConsulta(data: {
    medicoId: string
    fisioterapeutaId: string,
    atletaId: string
    diagnostico: string
    medicamentosReceitados: string
    situacao: string
  }): Promise<any> {
    const token = getToken()
    if (!token) throw new Error('Usuário não autenticado')

    return this.handleRequest(
      apiClient.post('/consulta', data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Falha ao criar consulta'
    )
  }


  async findHorariosDisponiveis(data: { medicoId: string, fisioterapeutaId: string,  data: string }): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/consulta/findHorariosDisponiveis', data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to get horarios disponiveis'
    )
  }
  async findConsultasByDayForMedico(data:
    { dataInicio: string, dataFim: string }): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/consulta/findConsultasByMedico', data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to get horarios disponiveis'
    )
  }

  async createConsultaByMedico(data: {
    medicoId: string
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
      apiClient.post('/consulta', data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to create consulta'
    )
  }

  async createConsultaByAtleta(data: {
    medicoId: string
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
      apiClient.post('/consulta', data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to create consulta'
    )
  }

  async getConsultaByAtletaId(atletaId: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/consulta/findByAtletaId/${atletaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      'Failed to get consulta by atleta ID'
    )
  }
}

export default new consultasService()
