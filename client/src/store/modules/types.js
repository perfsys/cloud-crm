import api from '../../api/types'

// initial state
const state = {
  all: []
}

// getters
const getters = {

  typesAll: state => state.all

}

// actions
const actions = {

  typesGetAll ({commit}) {
    api.getAll()
      .then(types => commit('setTypes', types))
  }

}

// mutations
const mutations = {

  setTypes (state, types) {
    state.all = types
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
