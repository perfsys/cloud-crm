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
  },

  updatesEditOne ({state, commit, dispatch, rootState}, item) {
    return new Promise((resolve, reject) => {
      if (rootState.route.params.group && rootState.route.params.name) {
        item.group = rootState.route.params.group
        item.name = rootState.route.params.name
        api.editOneByContact(item)
          .then(() => {
            dispatch('updatesGetOneByContact', item)
            resolve()
          }, reject)
      }
    })
  },

  updatesGetOneByContact ({state, commit, rootState}, item) {
    api.getOneByContact(item)
      .then(update => commit('setOneUpdate', update))
  }
}

// mutations
const mutations = {

  setUpdates (state, updates) {
    state.all = updates
  },

  setOneUpdate (state, update) {
    const index = state.all.findIndex(item => item.id === update.id)
    state.all[index].text = update.text
    state.all[index].update_dt = update.update_dt
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
