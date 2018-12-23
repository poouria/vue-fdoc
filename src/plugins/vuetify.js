import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import fa from 'vuetify/es5/locale/fa'

Vue.use(Vuetify, {
  theme: {
    primary: '#00838F',
    secondary: '#006064',
    accent: '#C2185B',
    error: '#F50057',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50'
  },
  iconfont: 'md',
  lang: {
    locales: { fa },
    current: 'fa'
  },
  rtl: true
})
