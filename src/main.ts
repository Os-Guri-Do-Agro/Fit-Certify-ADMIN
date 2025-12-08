/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
// Components
import { createPinia } from 'pinia'
import App from './App.vue'
// Composables
import { createApp } from 'vue'
import 'vue3-toastify/dist/index.css';
// Styles
import 'unfonts.css'
const pinia = createPinia()
const app = createApp(App)

// Suprimir erros de extensões do navegador
window.addEventListener('error', (e) => {
  if (e.message.includes('message channel closed')) {
    e.preventDefault()
  }
})

registerPlugins(app)
app.use(pinia)
app.mount('#app')
