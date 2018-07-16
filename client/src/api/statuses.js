import {HTTP} from '../libs/http-common'

export default {

  /**
   * Get all sources
   *
   * @returns {Promise<any>}
   */
  getAll () {
    return new Promise((resolve, reject) => {
      HTTP.get('/statuses')
        .then(response => resolve(response.data), reject)
    })
  }

}
