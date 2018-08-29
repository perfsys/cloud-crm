import api from '../../api/updates'

// initial state
const state = {
  all: []
}

// getters
const getters = {

  updatesAll: state => state.all

}

// actions
const actions = {

  updatesGetAllByContact ({state, commit, rootState}) {
    if (rootState.route.params.group && rootState.route.params.name) {
      api.getAllByContact(rootState.route.params.group, rootState.route.params.name)
        .then(updates => commit('setUpdates', updates))
    }
  },

  updatesSaveOne ({state, commit, dispatch, rootState}, item) {
    return new Promise((resolve, reject) => {
      if (rootState.route.params.group && rootState.route.params.name) {
        api.saveOneByContact(rootState.route.params.group, rootState.route.params.name, item)
          .then(() => {
            dispatch('updatesGetAllByContact')
            resolve()
          }, reject)
      }
    })
  },

  updatesDeleteOne ({state, commit, dispatch, rootState}, item) {
    return new Promise((resolve, reject) => {
      if (rootState.route.params.group && rootState.route.params.name && item.id) {
        item.group = rootState.route.params.group
        item.name = rootState.route.params.name
        api.deleteOneByContact(item)
          .then(() => {
            dispatch('updatesGetAllByContact')
            resolve()
          }, reject)
      }
    })
  }

}

// mutations
const mutations = {

  setUpdates (state, updates) {
    state.all = updates
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
