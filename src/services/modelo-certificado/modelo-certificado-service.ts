import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'
import { getToken } from '@/utils/auth'

class ModeloCertificadoService {
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

    getAll(): Promise<any> {
        const token = getToken()
        return this.handleRequest(
            apiClient.get(`/modelo-certificado`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }),

            'Failed to get modelo certificado'
        )
    }

   downloadTemplate(id: string): Promise<any> {
    const token = getToken()
    return apiClient.post(
        `/certificado/baixar-certificado?modeloCertificadoId=${id}`,
        {},
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            responseType: 'blob',
        }
    )
}
}

export default new ModeloCertificadoService()
