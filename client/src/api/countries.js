import {HTTP} from '../libs/http-common'

export default {

  /**
   * Get all countries
   *
   * @returns {Promise<any>}
   */
  getAll () {
    return new Promise((resolve, reject) => {
      HTTP.get('/countries')
        .then(response => resolve(response.data), reject)
    })
  }

}
