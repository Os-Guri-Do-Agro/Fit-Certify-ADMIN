import { getRole } from './auth'

export const getProfileRoute = (): string => {
  const role = getRole()

  switch (role) {
    case 'medico':
      return '/Medico-Screens/perfilMedico'
    case 'atleta':
      return '/Atleta-Screens/perfilAtleta'
    case 'fisioterapeuta':
      return '/Fisioterapeuta-Screens/perfilFisioterapeuta'
    case 'treinador':
      return '/Treinador-Screens/editarPerfilTreinador'
    default:
      return '/login'
  }
}

export const getListaConexaoRoute = (): string => {
  const role = getRole()

  switch (role) {
    case 'medico':
      return '/Medico-Screens/conexoes'
    case 'atleta':
      return '/Atleta-Screens/conexoes'
    case 'fisioterapeuta':
      return '/Fisioterapeuta-Screens/conexoes'
    case 'treinador':
      return '/Treinador-Screens/conexoes'
    default:
      return '/login'
  }
}

export const getEditProfileRoute = (): string => {
  const role = getRole()

  switch (role) {
    case 'medico':
      return '/Medico-Screens/editarPerfilMedico'
    case 'atleta':
      return '/Atleta-Screens/editarPerfilAtleta'
    case 'fisioterapeuta':
      return '/Fisioterapeuta-Screens/editarPerfilFisioterapeuta'
    case 'treinador':
      return '/Treinador-Screens/editarPerfilTreinador'
    default:
      return '/login'
  }
}
