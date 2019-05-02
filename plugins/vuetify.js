import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

// import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#0b3c5d', // colors.lightBlue.darken4,
    accent: colors.deepPurple.lighten1,
    secondary: '#438496', // colors.teal.darken1, #438496
    info: '#328cc1', // colors.lightBlue.base,
    warning: '#d9b310', // colors.amber.darken2,
    error: '#c0392b', //  '#f53240', // b82601 colors.red.darken1,
    success: '#27ae60' //  '#3cc47c' // colors.green.darken2
  }
})
