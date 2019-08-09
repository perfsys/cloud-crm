import api from '../../api/sources'

// initial state
const state = {
  all: [],
  default: null
}

// getters
const getters = {

  sourcesAll: state => state.all,
  sourceDefault: state => state.default

}

// actions
const actions = {

  sourcesGetAll ({commit}) {
    api.getAll()
      .then(result => {
        commit('setSources', result.sources)
        commit('setDefault', result.default)
      })
  }
}

// mutations
const mutations = {

  setSources (state, sources) {
    state.all = sources
  },
  setDefault (state, defaultSource) {
    state.default = defaultSource
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
