import {HTTP} from '../libs/http-common'

export default {

  getAllByContact (group, name) {
    return new Promise((resolve, reject) => {
      HTTP.get(`/contacts/group/${group}/name/${name}/updates`)
        .then(response => resolve(response.data), reject)
    })
  },

  getOneByContact (item) {
    return new Promise((resolve, reject) => {
      HTTP.get(`/contacts/group/${item.group}/name/${item.name}/updates/${item.id}`)
        .then(response => resolve(response.data), reject)
    })
  },

  saveOneByContact (group, name, text) {
    return new Promise((resolve, reject) => {
      HTTP.post(`/contacts/group/${group}/name/${name}/updates`, {
        text: text
      }).then(response => resolve(response.data), reject)
    })
  },

  editOneByContact (update) {
    return new Promise((resolve, reject) => {
      HTTP.put(`/contacts/group/${update.group}/name/${update.name}/updates/${update.id}`, {
        text: update.text
      }).then(response => resolve(response.data), reject)
    })
  },

  deleteOneByContact (item) {
    return HTTP.delete(`/contacts/group/${item.group}/name/${item.name}/updates/${item.id}`)
  }

}
