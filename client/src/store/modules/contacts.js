import api from '../../api/contacts'

// initial state
const state = {
  all: []
}

// getters
const getters = {

  contactsAll: state => state.all,

  routeContactName (state, getters, rootState) {
    return rootState.route.params.name ? rootState.route.params.name : null
  }
}

// actions
const actions = {

  contactsGetAllInCurrentGroup ({state, commit, rootState}) {
    if (rootState.route.params.group) {
      api.getAllInGroup(rootState.route.params.group)
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
    for (let i = 0; i < contacts.length; i++) {
      for (let j = 0; j < contacts.length; j++) {
        if (contacts[i].create_dt > contacts[j].create_dt) {
          let per = contacts[i]
          contacts[i] = contacts[j]
          contacts[j] = per
        }
      }
    }
    state.all = contacts
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
