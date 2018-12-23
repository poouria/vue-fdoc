import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex, axios)
const baseUrl = 'http://127.0.0.1:8000/api/v1'

export default new Vuex.Store({
  state: {
    role: null,
    loginErrorMessage: null,
    me: [],
    loading: false
  },

  mutations: {
    SET_ME (state, me) {
      state.me = me
      this.state.loading = false
    },
    SET_ROLE (state, role) {
      state.role = role
      this.state.loading = false
      router.push('/')
    }
  },

  actions: {
    getMe ({ commit }) {
      this.state.loading = true
      this.state.loginErrorMessage = null

      axios
        .get(baseUrl + '/user/me?token=' + sessionStorage.getItem('token'))
        .then(data => {
          if (data.data.status === 'ok') {
            let me = data.data
            commit('SET_ME', me.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    login ({ commit }, credential) {
      this.state.loading = true
      this.state.loginErrorMessage = null
      axios
        .post(baseUrl + '/user/login', credential)
        .then(data => {
          let token = data.data['access_token']
          sessionStorage.setItem('token', token)
          this.dispatch('getRole', token)
        })
        .catch(error => {
          this.state.loading = false
          if (!error.response) {
            this.state.loginErrorMessage = 'خطا در برقراری ارتباط با سرور'
          } else if (error.response.status === 401) {
            this.state.loginErrorMessage = 'نام کاربری یا کلمه عبور نا درست است'
          } else if (error.response.status === 400) {
            this.state.loginErrorMessage = 'نام کاربری و کلمه عبور الزامی است'
          } else {
            this.state.loginErrorMessage = 'خطا در برقراری ارتباط'
          }
        })
    },

    getRole ({ commit }, token) {
      this.state.loading = true
      this.state.loginErrorMessage = null
      axios
        .get(baseUrl + '/user/me?token=' + token)
        .then(data => {
          let me = data.data
          if (me.status === 'ok') {
            let role = me.data.role_id
            commit('SET_ROLE', role)
          } else {
            sessionStorage.removeItem('token')
            router.push('/login')
          }
        })
        .catch(() => {
          sessionStorage.removeItem('token')
          router.push('/login')
        })
    },

    logout () {
      this.state.loading = true
      this.state.loginErrorMessage = null
      axios
        .get(baseUrl + '/user/logout?token=' + sessionStorage.getItem('token'))
        .then(data => {
          if (data) {
            sessionStorage.removeItem('token')
            router.push('/login')
          } else {
            sessionStorage.removeItem('token')
            router.push('/login')
          }
        })
        .catch(() => {
          sessionStorage.removeItem('token')
          router.push('/login')
        })
    }
  }
})
