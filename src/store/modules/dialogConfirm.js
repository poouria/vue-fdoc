const state = {
  confirmDialogMessage: null,
  showConfirmDialog: false,
  confirmDialogTitle: null
}
const mutations = {
  SET_DIALOG (state, payload) {
    state.showConfirmDialog = true
    state.confirmDialogMessage = payload.message
    state.confirmDialogTitle = payload.title
  }
}
const actions = {
  show_dialog ({ commit }, payload) {
    commit('SET_DIALOG', payload)
  },

}

export default {
  state,
  mutations,
  actions
}
