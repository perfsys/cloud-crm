import {HTTP} from '../libs/http-common'

export default {

  /**
   * Get all groups
   *
   * @returns {Promise<any>}
   */
  getAll () {
    return new Promise((resolve, reject) => {
      HTTP.get('/groups')
        .then(response => resolve(response.data), reject)
    })
  },

  labelAddOne (item, groupId) {
    return new Promise((resolve, reject) => {
      HTTP.post(`/groups/${groupId}/labels`, {
        name: item
      })
        .then(response => resolve(response.data), reject)
    })
  },

  statusAddOne (item, groupId) {
    return new Promise((resolve, reject) => {
      HTTP.post(`/groups/${groupId}/statuses`, {
        name: item
      })
        .then(response => resolve(response.data), reject)
    })
  }

}
