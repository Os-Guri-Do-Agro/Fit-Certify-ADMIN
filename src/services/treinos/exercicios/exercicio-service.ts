import apiClient from '../../api-service';
import { getToken } from '../../../utils/auth';

class exercicioService {
  private async handleRequest<T>(request: Promise<{ data: T }>, errorMessage: string): Promise<T> {
    try {
      const { data } = await request;
      return data;
    } catch (error: any) {
      console.error(`${errorMessage}: ${error.message}`, error);
      throw error;
    }
  }

  async createExercicio(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post('/exercicio', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao criar exercício'
    )
  }

  async getAllExercicios(): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get('/exercicio', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao buscar exercícios'
    )
  }

  async getExerciciosPagined(page: number, pageSize: number): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/exercicio/findAllPagined?page=${page}&size=${pageSize}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao buscar exercícios'
    )
  }

  async getExerciciosByTreinoId(treinoId: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/exercicio/findByTipoTreinoId/${treinoId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao buscar exercícios'
    )
  }

}

export default new exercicioService();
