import api from '../../api/statuses'

// initial state
const state = {
  all: []
}

// getters
const getters = {

  statusesAll: state => state.all

}

// actions
const actions = {

  statusesGetAll ({commit}) {
    api.getAll()
      .then(statuses => commit('setStatuses', statuses))
  }

}

// mutations
const mutations = {

  setStatuses (state, statuses) {
    state.all = statuses
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
