import {HTTP} from '../libs/http-common'

export default {

  getAllByContact (group, name) {
    return new Promise((resolve, reject) => {
      HTTP.get(`/contacts/group/${group}/name/${name}/updates`)
        .then(response => resolve(response.data), reject)
    })
  },

  getOneByContact (group, name, id) {
    return new Promise((resolve, reject) => {
      HTTP.get(`/contacts/${group}/${name}/updates/${id}`)
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

  editOneByContact (group, name, update) {
    return new Promise((resolve, reject) => {
      HTTP.put(`/contacts/group/${group}/name/${name}/updates/${update.id}`, {
        text: update.text
      }).then(response => resolve(response.data), reject)
    })
  },

  deleteOneByContact (item) {
    return HTTP.delete(`/contacts/group/${item.group}/name/${item.name}/updates/${item.id}`)
  }

}
