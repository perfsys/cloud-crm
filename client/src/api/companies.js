import {HTTP} from '../libs/http-common'

export default {
  getCompaniesList: function () {
    return new Promise(function (resolve, reject) {
      HTTP.get('/companies')
        .then(function (response) {
          resolve(response.data)
        }, reject)
    })
  },
  getCompanyInfo: function (companyId) {
    return new Promise(function (resolve, reject) {
      HTTP.get('/companies/' + companyId)
        .then(function (response) {
          resolve(response.data)
        },
        function (err) {
          reject(err)
        })
    })
  },
  updateCompanyInfo: function (companyInfo) {
    return new Promise(function (resolve, reject) {
      HTTP.put('/companies', companyInfo)
        .then(function (data) {
          resolve(data)
        }, function (err) {
          reject(err)
        })
    })
  }
}
