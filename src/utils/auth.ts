import atletaService from '@/services/atleta/atleta-service'
const decodeJwtPayload = (base64Url: string): any => {
  try {
    // Substitui caracteres URL-safe do base64
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    
    // Adiciona padding se necessário
    while (base64.length % 4) {
      base64 += '='
    }

    // Valida se contém apenas caracteres base64 válidos
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/
    if (!base64Regex.test(base64)) {
      throw new Error('Base64 contém caracteres inválidos')
    }

    // Decodifica o base64
    const decoded = atob(base64)
    
    // Tenta parsear diretamente (método mais simples)
    try {
      return JSON.parse(decoded)
    } catch {
      // Se falhar, tenta com decodeURIComponent
      const jsonPayload = decodeURIComponent(
        decoded
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    }
  } catch (error) {
    console.error('Erro ao decodificar payload JWT:', error)
    throw error
  }
}

export const isTokenValid = (): boolean => {
  const token = sessionStorage.getItem('token')

  if (!token || typeof token !== 'string') return false

  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return false
    }

    const base64 = parts[1]
    if (!base64) {
      return false
    }

    const payload = decodeJwtPayload(base64)
    const currentTime = Math.floor(Date.now() / 1000)

    return payload.exp > currentTime
  } catch (error) {
    console.error('Erro ao validar token:', error)
    return false
  }
}

export const logout = (): void => {
  sessionStorage.removeItem('token')
  window.location.href = '/login'
}

export const checkAuthAndRedirect = () => {
  if (!isTokenValid()) {
    logout()
    return '/login'
  }
  return true
}

export const getPayloadFromToken = (token: string) => {
  try {
    if (!token || typeof token !== 'string') {
      console.error('Token inválido ou não fornecido')
      return false
    }

    const parts = token.split('.')
    if (parts.length !== 3) {
      console.error('Token JWT inválido: deve ter 3 partes separadas por ponto')
      return false
    }

    const base64 = parts[1]
    if (!base64) {
      console.error('Payload do token não encontrado')
      return false
    }

    const payload = decodeJwtPayload(base64)
    return payload
  } catch (error) {
    console.error('Erro ao decodificar token:', error)
    return false
  }
}

export const getPayload = () => {
  const token = sessionStorage.getItem('token')

  if (!token) return false

  try {
    if (typeof token !== 'string') {
      console.error('Token inválido')
      return false
    }

    const parts = token.split('.')
    if (parts.length !== 3) {
      console.error('Token JWT inválido: deve ter 3 partes separadas por ponto')
      return false
    }

    const base64 = parts[1]
    if (!base64) {
      console.error('Payload do token não encontrado')
      return false
    }

    const payload = decodeJwtPayload(base64)
    return payload
  } catch (error) {
    console.error('Erro ao decodificar token:', error)
    return false
  }
}

export const atletaTemPlano = () => {
  const payload = getPayload()
  return payload?.role == 'atleta' && payload?.user?.atleta?.planoId
}



export const medicoLogin = () => {
  const payload = getPayload()
  return payload?.role == 'medico'
}

export const getStatusMedicoCRM = () => {
  const payload = getPayload()
  if(payload?.role == 'medico') {
    return payload?.user?.medico?.ativo
  }
}

export const getMedicoId = () => {
  const payload = getPayload()
  return payload?.role === 'medico' ? payload?.user?.medicoId : null
}
export const getAtletaId = () => {
  const payload = getPayload()
  return payload?.role === 'atleta' ? payload?.user?.atletaId : null
}

export const getRole = () => {
  const payload = getPayload()
  return payload?.role
}

export const isMedico = () => {
  return getRole() === 'medico'
}

export const isAtleta = () => {
  return getRole() === 'atleta'
}
export const getUserID = () => {
  const payload = getPayload()
  return payload?.userId
}

export const updateUserPlan = async (planoId: string) => {
  try {
    const userData = getPayload()
    if (userData) {
      const updatedUserData = {
        ...userData,
        user: {
          ...userData.user,
          [userData.role]: {
            ...userData.user[userData.role],
            planoId: planoId,
          },
        },
      }

      // Update token in sessionStorage with new plan data
      const token = sessionStorage.getItem('token')
      if (token) {
        const [header, , signature] = token.split('.')
        const newPayload = btoa(JSON.stringify(updatedUserData))
        const newToken = `${header}.${newPayload}.${signature}`
        sessionStorage.setItem('token', newToken)
      }
    }
  } catch (error) {
    console.error('Erro ao atualizar plano:', error)
  }
}

export const refreshUserData = async () => {
  try {
    const userData = getPayload()
    if (userData?.user?.atleta?.id) {
      // TODO: Implement atletaService.getAtletaById call
      const response = await atletaService.getAtletaById(
        userData.user.atleta.id
      )
      if (response.success && response.data.planoId) {
        await updateUserPlan(response.data.planoId)
      }
    }
  } catch (error) {
    console.error('Erro ao atualizar dados do usuário:', error)
  }
}

export const getToken = () => {
  return sessionStorage.getItem('token')
}
