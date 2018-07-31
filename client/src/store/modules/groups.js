import api from '../../api/groups'

// initial state
const state = {
  all: [],
  currentId: null
}

// getters
const getters = {

  groupsAll: state => state.all,

  groupById (state) {
    return groupId => {
      return (groupId) ? state.all.find(i => i.id === groupId) : {}
    }
  },

  groupCurrentId: state => state.currentId

}

// actions
const actions = {

  groupsGetAll ({commit}) {
    api.getAll()
      .then(groups => commit('setGroups', groups))
  }

}

// mutations
const mutations = {

  setGroups (state, groups) {
    state.all = groups
  },

  setCurrentGroup (state, group) {
    state.currentId = group
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
