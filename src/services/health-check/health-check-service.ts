import apiClient from '../api-service'
import type { PreRaceHealthCheckData, PreRaceHealthCheckResponse } from '@/Interfaces/pre-race-health-check.interface'

const BASE_PATH = '/health-check'

const healthCheckService = {
  submitPreRaceCheck: async (data: PreRaceHealthCheckData): Promise<PreRaceHealthCheckResponse> => {
    const response = await apiClient.post(`${BASE_PATH}/pre-race`, data)
    return response.data
  },

  getAtletaHealthChecks: async (atletaId: number): Promise<PreRaceHealthCheckData[]> => {
    const response = await apiClient.get(`${BASE_PATH}/atleta/${atletaId}`)
    return response.data
  },

  getHealthCheckById: async (checkId: number): Promise<PreRaceHealthCheckData> => {
    const response = await apiClient.get(`${BASE_PATH}/${checkId}`)
    return response.data
  },

  getEventHealthChecks: async (eventoId: number): Promise<PreRaceHealthCheckData[]> => {
    const response = await apiClient.get(`${BASE_PATH}/evento/${eventoId}`)
    return response.data
  },
}

export default healthCheckService
