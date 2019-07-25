import {HTTP} from '../libs/http-common'

export default {

  /**
   * Get all locations
   *
   * @returns {Promise<any>}
   */
  getAll () {
    return new Promise((resolve, reject) => {
      HTTP.get('/locations')
        .then(response => resolve(response.data), reject)
    })
  }

}
