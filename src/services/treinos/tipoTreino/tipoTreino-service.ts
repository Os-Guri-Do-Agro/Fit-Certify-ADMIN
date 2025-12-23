import apiClient from '../../api-service';
import { getToken } from '../../../utils/auth';

class tipoTreinoService {
  private async handleRequest<T>(request: Promise<{ data: T }>, errorMessage: string): Promise<T> {
    try {
      const { data } = await request;
      return data;
    } catch (error: any) {
      console.error(`${errorMessage}: ${error.message}`, error);
      throw error;
    }
  }

  async getAllTiposTreino(): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get('/tipo-treino', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao buscar tipos de treino'
    )
  }
}

export default new tipoTreinoService();
