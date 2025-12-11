import { getRole } from './auth'

export const getProfileRoute = () => {
  const role = getRole()

  switch (role) {
    case 'medico':
      return '/Medico-Screens/perfilMedico'
    case 'atleta':
      return '/Atleta-Screens/perfilAtleta'
      case 'fisioterapeuta':
        return '/Fisioterapeuta-Screens/perfilFisioterapeuta'
    default:
      return '/Perfil'
  }
}

export const getEditProfileRoute = () => {
  const role = getRole()

  switch (role) {
    case 'medico':
      return '/Medico-Screens/editarPerfilMedico'
    case 'atleta':
      return '/Atleta-Screens/editarPerfilAtleta'
    default:
      return '/editarPerfil'
  }
}
