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
  }

}
