import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import adminUsers from './modules/adminUsers'
import cityHospital from './modules/cityHospital'
import dialogConfirm from './modules/dialogConfirm'

Vue.use(Vuex, axios)
const baseUrl = 'http://127.0.0.1:8000/api/v1'

export default new Vuex.Store({
  state: {
    baseUrl: 'http://127.0.0.1:8000/api/v1',
    role: null,
    globalErrorVar: null,
    me: [],
    loading: false,

    confirmDialogMessage: null,
    showConfirmDialog: false,
    confirmDialogTitle: null,
    confirmUserId: null
  },

  mutations: {
    SET_LOADING: state => {
      state.loading = true
    },
    UNSET_LOADING: state => {
      state.loading = false
    },
    UNSET_ERROR: state => {
      state.globalErrorVar = null
    },
    SET_ERROR (state, error) {
      this.state.globalErrorVar = error
    },
    SET_TOKEN (state, token) {
      sessionStorage.setItem('token', token)
      const payload = sessionStorage.getItem('token').split('.')[1]
      let parsedPayload = JSON.parse(atob(payload))
      state.role = parsedPayload.role
      router.push('/')
    },
    SET_ME (state, me) {
      state.me = me
      state.role = me.role_id
    },
    SET_DIALOG (state, payload) {
      if (payload === 'hide') {
        state.showConfirmDialog = false
        state.confirmDialogMessage = null
        state.confirmDialogTitle = null
        state.confirmUserId = null
      } else {
        state.showConfirmDialog = true
        state.confirmDialogMessage = payload.message
        state.confirmDialogTitle = payload.title
        state.confirmUserId = payload.id
      }
    }
  },

  actions: {
    getMe ({ commit }) {
      commit('SET_LOADING')
      commit('UNSET_ERROR')
      axios
        .get(baseUrl + '/user/me?token=' + sessionStorage.getItem('token'))
        .then(data => {
          commit('UNSET_LOADING')
          if (data.data.status === 'ok') {
            let me = data.data
            commit('SET_ME', me.data)
          }
        })
        .catch(error => {
          commit('UNSET_LOADING')
          console.log(error)
        })
    },
    login ({ commit }, loginFD) {
      commit('SET_LOADING')
      commit('UNSET_ERROR')
      axios
        .post(baseUrl + '/user/login', loginFD)
        .then(data => {
          commit('UNSET_LOADING')
          let token = data.data['access_token']
          commit('SET_TOKEN', token)
          this.dispatch('getMe')
        })
        .catch(error => {
          console.log(error)
          commit('UNSET_LOADING')
          let errorMessage
          if (!error.response) {
            errorMessage = 'خطا در برقراری ارتباط با سرور'
          } else if (error.response.status === 401) {
            errorMessage = 'نام کاربری یا کلمه عبور نادرست است'
          } else if (error.response.status === 400) {
            errorMessage = 'نام کاربری و کلمه عبور الزامی است'
          } else {
            errorMessage = 'خطا در برقراری ارتباط'
          }
          commit('SET_ERROR', errorMessage)
        })
    },

    logout ({ commit }) {
      commit('SET_LOADING')
      commit('UNSET_ERROR')
      axios
        .get(baseUrl + '/user/logout?token=' + sessionStorage.getItem('token'))
        .then(data => {
          commit('UNSET_LOADING')
          if (data) {
            sessionStorage.removeItem('token')
            router.push('/login')
          } else {
            sessionStorage.removeItem('token')
            router.push('/login')
          }
        })
        .catch(() => {
          commit('UNSET_LOADING')
          sessionStorage.removeItem('token')
          router.push('/login')
        })
    },
    decode () {
      const payload = sessionStorage.getItem('token').split('.')[1]
      let parsedPayload = JSON.parse(atob(payload))
      this.state.role = parsedPayload.role
    },
    show_dialog ({ commit }, payload) {
      commit('SET_DIALOG', payload)
    },
    hide_dialog ({ commit }) {
      commit('SET_DIALOG', 'hide')
    }
  },
  modules: {
    adminUsers: adminUsers,
    cityHospital: cityHospital
  }
})
