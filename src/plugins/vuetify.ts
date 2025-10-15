/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
// @ts-ignore
import 'vuetify/styles'
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { VCalendar } from 'vuetify/labs/VCalendar'
// Composables
import { createVuetify } from 'vuetify'
import { pt } from 'vuetify/locale'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: 'pt',
    messages: { pt },
  },
  components: {
    VFileUpload,
     VCalendar,
  },

  theme: {
    defaultTheme: 'system',
  },
})
