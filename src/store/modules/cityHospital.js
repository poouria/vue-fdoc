import store from '../store'
import axios from 'axios'
const state = {
  CHError: null,
  CHmessage: null,
  CHcities: [],
  CHhospitals: []
}
const mutations = {
  UNSET_CH_ERROR: state => {
    state.CHError = null
  },
  SET_CH_ERROR (state, error) {
    state.CHError = error
  },
  SET_CITIES (state, cities) {
    state.CHcities = cities
  },
  SET_HOSPITALS (state, hospitals) {
    state.CHhospitals = hospitals
  },
  SET_STORE_CH_STATE (state, CHResult) {
    state.CHmessage = CHResult
  }
}
const actions = {
  getCities () {
    return new Promise((resolve, reject) => {
      axios.get(store.state.baseUrl + '/admin/cities/index?token=' + sessionStorage.getItem('token'))
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  getHospitals () {
    return new Promise((resolve, reject) => {
      axios.get(store.state.baseUrl + '/admin/hospitals/index?token=' + sessionStorage.getItem('token'))
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  storeUser ({ commit }, fd) {
    return new Promise((resolve, reject) => {
      axios.post(store.state.baseUrl + '/admin/users/store?token=' + sessionStorage.getItem('token'), fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  updateUser ({ commit }, fd) {
    return new Promise((resolve, reject) => {
      axios.post(store.state.baseUrl + '/admin/users/' + fd.get('id') + '/update?token=' + sessionStorage.getItem('token'), fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  }
}
const getters = {
  allCities: state => {
    return state.CHcities
  },
  allHospitals: state => {
    return state.CHhospitals
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
