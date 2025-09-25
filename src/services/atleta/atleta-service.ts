import apiClient from '../api-service'

class atletaService {
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

  async getAtletaById(id: string): Promise<any> {
   const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/atleta/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to get all Doencas '
    )
  }
  async getAllAtletas(): Promise<any> {
   const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.get(`/atleta`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to get all Doencas '
    )
  }

   async editAtletaByProfile(data: FormData): Promise<any> {
    const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.patch(`/atleta/updateProfile`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to update atleta profile'
    )
  }

  async deleteAtleta(id:string){
   const token = sessionStorage.getItem('token')
    return this.handleRequest(
      apiClient.delete(`atleta/inativar-atleta/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      'Failed to delete account'
    )
  }
}


export default new atletaService()
