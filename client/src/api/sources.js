import {HTTP} from '../libs/http-common'

export default {

  /**
   * Get all sources
   *
   * @returns {Promise<any>}
   */
  getAll () {
    return new Promise((resolve, reject) => {
      HTTP.get('/sources')
        .then(response => resolve(response.data), reject)
    })
  }

}
