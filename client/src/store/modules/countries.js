import api from '../../api/countries'

// initial state
const state = {
  all: []
}

// getters
const getters = {

  countriesAll: state => state.all

}

// actions
const actions = {

  countriesGetAll ({commit}) {
    api.getAll()
      .then(countries => commit('setCountries', countries))
  }

}

// mutations
const mutations = {

  setCountries (state, countries) {
    state.all = countries
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
