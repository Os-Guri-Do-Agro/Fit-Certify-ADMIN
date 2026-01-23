export interface PreRaceHealthCheckData {
  // Sintomas Cardiovasculares e Respiratórios
  sintomasCardiovasculares: boolean | null
  tonturaDesmaiо: boolean | null
  
  // Condições Gerais de Saúde
  febreCalafrios: boolean | null
  vomitoNausea: boolean | null
  alertaMental: boolean | null
  
  // Sono e Recuperação
  horasSono: number | null
  
  // Medicamentos e Suplementos
  suplementoEstimulante: boolean | null
  antiInflamatorioAnalgesico: boolean | null
  
  // Condições Físicas e Ambientais
  viagemAltitude: boolean | null
  dorArticularMuscular: boolean | null
  
  // Metadados
  dataPreenchimento?: string
  atletaId?: number
  eventoId?: number
}

export interface PreRaceHealthCheckResponse {
  success: boolean
  message: string
  data?: PreRaceHealthCheckData
  riskScore?: number
}
