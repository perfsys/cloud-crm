import api from '../../api/locations'

// initial state
const state = {
  all: []
}

// getters
const getters = {

  locationsAll: state => state.all

}

// actions
const actions = {

  locationsGetAll ({commit}) {
    api.getAll()
      .then(locations => commit('setLocations', locations))
  }

}

// mutations
const mutations = {

  setLocations (state, locations) {
    state.all = locations
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
