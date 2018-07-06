import api from '../../api/sources'

// initial state
const state = {
  all: []
}

// getters
const getters = {

  sourcesAll: state => state.all

}

// actions
const actions = {

  sourcesGetAll ({commit}) {
    api.getAll()
      .then(sources => commit('setSources', sources))
  }

}

// mutations
const mutations = {

  setSources (state, sources) {
    state.all = sources
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
