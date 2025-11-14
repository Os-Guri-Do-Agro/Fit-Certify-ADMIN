import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'
// import { CategoryEntity, CreateCategoryDto, UpdateCategoryDto } from '@/common/types/category'

class CupomService {
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

  validarCupom(codigo: string): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(

      apiClient.get(`/cupom/validar-cupom?codigo=${codigo}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to fetch all categories'
    )
  }
  getCupomByResponsavelID(responsavelID: string): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/cupom/byResponsavel/${responsavelID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to fetch all categories'
    )
  }

  updateCupom(id: string, planoId: string, usuarioId: string): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.patch(`/cupom/updateQuantidadeUsada/${id}?planoId=${planoId}&usuarioId=${usuarioId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to update cupom'
    )
  }

  createCupomByMedico(data: any): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.post(`/cupom/createCupomByMedicoOrInfluence`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }),
      'Failed to update cupom'
    )
  }

  async cupomMetricas(cupomId: string, mes: number): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/cupom/metricas/${cupomId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          mes: mes
        }
      }),
      'Failed to fetch all categories'
    )
  }

  async metricasFinanceiras(usuarioParceiroId: string): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/cupom/metricas-financeiras/${usuarioParceiroId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to fetch all categories'
    )
  }

  async getSaldo(): Promise<any>{
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/cupom/saldo`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to fetch all categories'
    )
  }

  postResgate(chavePix: string, valorSolicitado: number): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.post(`/cupom/solicitar-resgate`, { chavePix, valorSolicitado }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to fetch all categories'
    )
  }

  getSolicitacoesResgate(): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/cupom/solicitacoes/ver-pedidos`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to fetch all categories'
    )
  }

}

export default new CupomService()
