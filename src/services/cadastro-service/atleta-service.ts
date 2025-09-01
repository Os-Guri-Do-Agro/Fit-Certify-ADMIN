import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'
// import type IArtigo from '@/Interfaces/artigo-interface'
// import { CategoryEntity, CreateCategoryDto, UpdateCategoryDto } from '@/common/types/category'

class AtletaService {
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

    async createAtleta(formData: FormData): Promise<any> {
        return this.handleRequest(
            apiClient.post('/atleta', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    },
            }),
            'Erro ao criar atleta'
        )
    }
}

export default new AtletaService()
