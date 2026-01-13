import apiClient from '../api-service';
import { getToken } from '@/utils/auth'

class treinoService {
  private async handleRequest<T>(request: Promise<{ data: T }>, errorMessage: string): Promise<T> {
    try {
      const { data } = await request;
      return data;
    } catch (error: any) {
      console.error(`${errorMessage}: ${error.message}`, error);
      throw error;
    }
  }

  async createTreino(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/treino', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao criar treino'
    )
  }

  async getTreinosByTreinador(treinadorId: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/treino/findByTreinadorId/${treinadorId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao buscar treinos'
    )
  }

  async getTreinosByFisioterapeuta(fisioterapeutaId: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/treino/findByFisioterapeutaId/${fisioterapeutaId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao buscar treinos'
    )
  }

  async getTreinosByAtleta(atletaId: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/treino/findByAtletaId/${atletaId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao buscar treinos'
    )
  }

  async getTreinoById(treinoId: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/treino/${treinoId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao buscar treino'
    )
  }
}

export default new treinoService();
