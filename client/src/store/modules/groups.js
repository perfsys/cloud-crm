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
  },

  labelsNamesByIds (state, getters) {
    return ids => {
      return ids ? getters.labelsByGroupId.filter(item => ids.includes(item.name_normalized)).map(item => item.name) : []
    }
  }

}

// actions
const actions = {

  groupsGetAll ({commit}) {
    api.getAll()
      .then(groups => commit('setGroups', groups))
  },

  labelAddOne ({getters, dispatch}, item) {
    return new Promise((resolve, reject) => {
      api.labelAddOne(item, getters.routeGroupId)
        .then(() => {
          dispatch('groupsGetAll')
          resolve()
        }, reject)
    })
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
