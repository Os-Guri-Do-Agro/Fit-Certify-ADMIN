export interface IDocumento {
  id: string
  nome: string
  tipo: 'exame' | 'atestado' | 'receita' | 'pdf'
  dataUpload: Date
  tamanho: number
  url?: string
}
