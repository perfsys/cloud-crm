import api from '../../api/companies'

const state = {
  all: []
}

const getters = {
  allCompanies: function () {
    return state.all
  }
}

const actions = {
  getCompaniesList: function ({commit}) {
    api.getCompaniesList()
      .then(function (companiesArr) {
        commit('setCompaniesList', companiesArr)
      })
  },
  getCompanyInfo: function ({commit}, companyId) {
    return new Promise(function (resolve, reject) {
      api.getCompanyInfo(companyId)
        .then(function (data) {
          resolve(data)
        }, function (err) {
          reject(err)
        })
    })
  },
  updateCompanyInfo: function ({commit}, companyInfo) {
    return new Promise(function (resolve, reject) {
      api.updateCompanyInfo(companyInfo)
        .then(function (data) {
          resolve(data)
        }, function (err) {
          reject(err)
        })
    })
  }
}

const mutations = {
  setCompaniesList (state, companiesArr) {
    state.all = companiesArr
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
