import store from '../store'
import axios from 'axios'
const state = {
  UsersError: null,
  message: null,
  users: [],
  roles: [],
  bime: [],
  selectedRole: null
}
const mutations = {
  UNSET_USER_ERROR: state => {
    state.UsersError = null
  },
  SET_USER_ERROR (state, error) {
    state.UsersError = error
  },
  SET_USERS (state, users) {
    state.users = users
  },
  SET_ROLES (state, roles) {
    state.roles = roles
  },
  SET_BIME (state, bime) {
    state.bime = bime
  },
  SET_STORE_USER_STATE (state, userResult) {
    state.message = userResult
  }
}
const actions = {
  getUsers () {
    return new Promise((resolve, reject) => {
      axios.get(store.state.baseUrl + '/admin/users/index?token=' + sessionStorage.getItem('token'))
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  getRoles () {
    return new Promise((resolve, reject) => {
      axios.get(store.state.baseUrl + '/admin/roles/index?token=' + sessionStorage.getItem('token'))
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  getBime () {
    return new Promise((resolve, reject) => {
      axios.get(store.state.baseUrl + '/admin/bime/index?token=' + sessionStorage.getItem('token'))
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  getUser ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get(store.state.baseUrl + '/admin/users/' + id + '?token=' + sessionStorage.getItem('token'))
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
  allUsers: state => {
    return state.users
  },
  allRoles: state => {
    return state.roles
  },
  allBime: state => {
    return state.bime
  },
  selectedRole: state => {
    return state.selectedRole
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
