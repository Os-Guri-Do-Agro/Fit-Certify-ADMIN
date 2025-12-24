import apiClient from '../../api-service';
import { getToken } from '@/utils/auth';
class termosService {
  private async handleRequest<T>(request: Promise<{ data: T }>, errorMessage: string): Promise<T> {
    try {
      const { data } = await request;
      return data;
    } catch (error: any) {
      console.error(`${errorMessage}: ${error.message}`, error);
      throw error;
    }
  }

  getTermosByEventoId(eventoId: string): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.get(`/termo-responsabilidade/preview/evento/${eventoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      'Failed to get termos by evento id'
    );
  }

  aceitarTermos(data: any): Promise<any> {
    const token = getToken()
    return this.handleRequest(
      apiClient.post(`/termo-responsabilidade/aceitar`, data, {
        headers: {
        'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      'Failed to accept termos'
    );
  }

}

export default new termosService();
