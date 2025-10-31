import atletaService from '@/services/atleta/atleta-service'

export const isTokenValid = (): boolean => {
  const token = sessionStorage.getItem('token')

  if (!token) return false

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Math.floor(Date.now() / 1000)

    return payload.exp > currentTime
  } catch (error) {
    console.error(error)
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

export const getPayload = () => {
  const token = sessionStorage.getItem('token')

  if (!token) return false

  try {
    const base64 = token.split('.')[1]
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )

    const payload = JSON.parse(jsonPayload)

    return payload
  } catch (error) {
    console.error(error)
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
