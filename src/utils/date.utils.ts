import dayjs from 'dayjs'

/**
 * Formata uma data ISO para o formato DD/MM/YYYY HH:mm
 * Remove o offset do final da string antes de formatar
 * @param dataISO - String de data no formato ISO (ex: "2024-01-15T10:30:00-03:00")
 * @returns String formatada como "DD/MM/YYYY HH:mm" ou string vazia se dataISO for inválido
 */
export function formatarDataHoraLocal(dataISO: string | null | undefined): string {
  if (!dataISO) return ""

  // Remove o offset do final da string (ex: "-03:00" ou "+00:00")
  const semOffset = dataISO.replace(/([+-]\d{2}:\d{2})$/, "")

  // Formata para data e hora locais
  return dayjs(semOffset).format("DD/MM/YYYY HH:mm")
}

/**
 * Formata uma data ISO para o formato HH:mm (apenas horário)
 * Remove o offset do final da string antes de formatar
 * @param dataISO - String de data no formato ISO (ex: "2024-01-15T10:30:00-03:00")
 * @returns String formatada como "HH:mm" ou string vazia se dataISO for inválido
 */
export function formatarHorarioLocal(dataISO: string | null | undefined): string {
  if (!dataISO) return ""

  // Remove o offset do final da string (ex: "-03:00" ou "+00:00")
  const semOffset = dataISO.replace(/([+-]\d{2}:\d{2})$/, "")

  return dayjs(semOffset).format("HH:mm")
}

/**
 * Formata uma data ISO para o formato DD/MM/YYYY (apenas data)
 * Remove o offset do final da string antes de formatar
 * @param dataISO - String de data no formato ISO (ex: "2024-01-15T10:30:00-03:00")
 * @returns String formatada como "DD/MM/YYYY" ou string vazia se dataISO for inválido
 */
export function formatarDataLocal(dataISO: string | null | undefined): string {
  if (!dataISO) return ""

  // Remove o offset do final da string (ex: "-03:00")
  const semOffset = dataISO.replace(/([+-]\d{2}:\d{2})$/, "")

  // Retorna a data formatada como DD/MM/YYYY
  return dayjs(semOffset).format("DD/MM/YYYY")
}

/**
 * Formata uma data/hora para o formato DD/MM/YYYY [às] HH:mm
 * @param dataHora - String de data/hora
 * @returns String formatada como "DD/MM/YYYY às HH:mm" ou string vazia se dataHora for inválido
 */
export function formatarDataHora(dataHora: string | null | undefined): string {
  if (!dataHora) return ""
  return dayjs(dataHora).format('DD/MM/YYYY [às] HH:mm')
}

/**
 * Formata uma data para o formato DD/MM/YYYY
 * Valida se a data é válida antes de formatar
 * @param data - String de data
 * @returns String formatada como "DD/MM/YYYY" ou "--" se data for inválido
 */
export function formatarData(data: string | null | undefined): string {
  if (!data) return "--"
  return dayjs(data).isValid() ? dayjs(data).format('DD/MM/YYYY') : '--'
}

/**
 * Formata um horário extraindo apenas a parte do horário de uma string ISO
 * @param horario - String de horário no formato ISO ou similar
 * @returns String formatada como "HH:mm" ou string vazia se horario for inválido
 */
export function formatarHorario(horario: string | null | undefined): string {
  if (!horario) return ""
  const hora = horario.substring(11, 16)
  return hora.replace(/^0/, '')
}

/**
 * Formata uma data ISO para o formato DD/MM/YYYY - HH:mm
 * Remove o offset do final da string antes de formatar
 * @param dataISO - String de data no formato ISO (ex: "2024-01-15T10:30:00-03:00")
 * @returns String formatada como "DD/MM/YYYY - HH:mm" ou string vazia se dataISO for inválido
 */
export function formatarDataHoraComTraco(dataISO: string | null | undefined): string {
  if (!dataISO) return ""

  // Remove o offset do final da string (ex: "-03:00" ou "+00:00")
  const semOffset = dataISO.replace(/([+-]\d{2}:\d{2})$/, "")

  // Formata para data e hora locais com traço
  return dayjs(semOffset).format("DD/MM/YYYY - HH:mm")
}

