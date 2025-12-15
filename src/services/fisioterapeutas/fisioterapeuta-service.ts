import apiClient from '../api-service'

class fisioterapeutaService {
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

    createFisioterapeuta(formData: FormData): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.post('/fisioterapeuta', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }),
      'Failed to create fisioterapeuta'
    )
  }

  getFisioterapeutaById(id: string): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/fisioterapeuta/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }),
      'Failed to get fisioterapeuta by ID'
    )
  }

  updateFisioterapeuta(id: string, formData: FormData): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.patch(`/fisioterapeuta/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }),
      'Failed to update fisioterapeuta'
    )
  }

  gerarCodigoConvite(): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.post('/fisioterapeuta/gerar-codigo-convite', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Erro ao gerar código de convite'
    )
  }


}

export default new fisioterapeutaService()
