import api from '../../api/groups'

// initial state
const state = {
  all: []
}

// getters
const getters = {

  groupsAll: state => state.all,

  groupById (state) {
    return groupId => {
      return (groupId) ? state.all.find(i => i.id === groupId) : {}
    }
  },

  routeGroupId (state, getters, rootState) {
    return rootState.route.params.group
  },

  routeGroupName (state, getters, rootState) {
    return getters.groupById(rootState.route.params.group) ? getters.groupById(rootState.route.params.group).name : []
  },

  labelsByGroupId (state, getters) {
    return getters.groupById(getters.routeGroupId) ? getters.groupById(getters.routeGroupId).labels : []
  }

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
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
