import api from '../../api/contacts'

// initial state
const state = {
  all: []
}

// getters
const getters = {

  contactsAll: state => state.all

}

// actions
const actions = {

  contactsGetAllInCurrentGroup ({state, commit, rootState}) {
    if (rootState.groups.currentId) {
      api.getAllInGroup(rootState.groups.currentId)
        .then(contacts => commit('setContacts', contacts))
    } else {
      api.getAll()
        .then(contacts => commit('setContacts', contacts))
    }
  },

  contactsDeleteOne ({state, commit, dispatch}, item) {
    return new Promise((resolve, reject) => {
      let group = item.group_id
      let name = item.name

      if (group && name) {
        api.deleteOne(group, name)
          .then(() => dispatch('contactsGetAllInCurrentGroup'))
      }
    })
  },

  contactsSaveOne ({state, commit, dispatch}, item) {
    return new Promise((resolve, reject) => {
      api.saveOne(item)
        .then(() => {
          // refresh contacts list
          dispatch('contactsGetAllInCurrentGroup')
          // callback
          resolve()
        }, reject)
    })
  },

  contactsUpdateOne ({state, commit, dispatch}, item) {
    return new Promise((resolve, reject) => {
      api.updateOne(item)
        .then(() => {
          // refresh contacts list
          dispatch('contactsGetAllInCurrentGroup')
          // callback
          resolve()
        }, reject)
    })
  }

}

// mutations
const mutations = {

  setContacts (state, contacts) {
    state.all = contacts
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
