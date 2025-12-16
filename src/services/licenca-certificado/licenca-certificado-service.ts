import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'
import { getToken } from '@/utils/auth'

class LicencaCertificadoService {
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

    postLicencaCertificado(data: any): Promise<any> {
        const token = getToken()
        return this.handleRequest(
            apiClient.post(`/licenca-certificado`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }),
            'Failed to create licenca certificado'
        )
    }

    getLicencaCertificadoById(id: string): Promise<any> {
        const token = getToken()
        return this.handleRequest(
            apiClient.get(`/licenca-certificado/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }),
            'Failed to get licenca certificado'
        )
    }

    getByAtletaId(atletaId: string): Promise<any> {
        const token = getToken()
        return this.handleRequest(
            apiClient.get(`/licenca-certificado/findByAtletaId/${atletaId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }),

            'Failed to get licenca certificado by atleta ID'
        )
    }
}

export default new LicencaCertificadoService()
