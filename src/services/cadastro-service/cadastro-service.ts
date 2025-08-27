import { handleError } from '@/common/error.utils'
import apiClient from '../api-service'
// import type IArtigo from '@/Interfaces/artigo-interface'
// import { CategoryEntity, CreateCategoryDto, UpdateCategoryDto } from '@/common/types/category'

class CadastroService {
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

  getAllDoencas(): Promise<any> {
    return this.handleRequest(
      apiClient.get('/doenca'),
      'ERROR - 404'
    )
  }

  getAllSintomas(): Promise<any> {
    return this.handleRequest(
      apiClient.get('/sintoma'),
      'ERROR - 404'
    )
  }
}

export default new CadastroService()