import {HTTP} from '../libs/http-common'

export default {

  /**
   * Get all types
   *
   * @returns {Promise<any>}
   */
  getAll () {
    return new Promise((resolve, reject) => {
      HTTP.get('/types')
        .then(response => resolve(response.data), reject)
    })
  }

}
