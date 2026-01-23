/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {
  getRole,
  isTokenValid,
  atletaTemPlano,
  getStatusMedicoCRM
} from '@/utils/auth'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import { toast } from 'vue3-toastify'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // PASSO 1: Definir rotas públicas (não precisam de autenticação)
  const publicRoutes = [
    '/login',
    '/select-profile',
    '/register',
    '/registers',
    '/register-medico',
    '/esqueceuSenha',
    '/politicaPrivacidade',
    '/detalhesExclusaoConta',
    '/validarCertificado',
    '/thank-you',
  ]
  
  const isPublicRoute = publicRoutes.includes(to.path) || to.path.startsWith('/detalhesAtleta') || to.path.startsWith('/pagamento') || to.path.startsWith('/pagamentoRealizado')
  
  // PASSO 2: Se é rota pública, permitir acesso SEM verificações
  if (isPublicRoute) {
    return next()
  }
  
  // PASSO 3: Verificar se tem token válido
  const isAuthenticated = isTokenValid()

  // PASSO 4: Se não tem token válido, redirecionar para login
  if (!isAuthenticated) {
    return next('/login')
  }

  // PASSO 5: Usuário está autenticado, verificar permissões
  const role = getRole()
  
  // PASSO 5.1: Bloquear admin
  if (role === 'admin') {
    toast.error('Este painel é exclusivo para médicos e atletas')
    sessionStorage.removeItem('token')
    return next('/login')
  }

  // PASSO 5.2: Verificar médico sem CRM validado
  if (role === 'medico' && getStatusMedicoCRM() === false) {
    toast.error('Médico aguardando validação do CRM', { autoClose: 5000 })
    sessionStorage.removeItem('token')
    return next('/login')
  }

  // PASSO 5.3: Verificar atleta sem plano
  if (role === 'atleta' && !atletaTemPlano() && to.path !== '/registerPlanos') {
    return next('/registerPlanos')
  }
  
  // PASSO 6: Tudo OK, permitir acesso
  next()
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
