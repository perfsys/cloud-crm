import {HTTP} from '../libs/http-common'

export default {

  getAllByContact (group, name) {
    return new Promise((resolve, reject) => {
      HTTP.get(`/contacts/${group}/${name}/updates`)
        .then(response => resolve(response.data), reject)
    })
  },

  getOneByContact (item) {
    return new Promise((resolve, reject) => {
      HTTP.get(`/contacts/${item.group}/${item.name}/updates/${item.id}`)
        .then(response => resolve(response.data), reject)
    })
  },

  saveOneByContact (group, name, item) {
    return new Promise((resolve, reject) => {
      HTTP.post(`/contacts/${group}/${name}/updates`, {
        text: item.text,
        type: item.type
      }).then(response => resolve(response.data), reject)
    })
  },

  saveFileByContact (group, name, item) {
    return new Promise((resolve, reject) => {
      HTTP.post(`/contacts/${group}/${name}/updates`, {
        key: item.key,
        file_name: item.fileName,
        location: item.location,
        type: item.type,
        mime_type: item.mimeType
      }).then(response => resolve(response.data), reject)
    })
  },

  editOneByContact (update) {
    return new Promise((resolve, reject) => {
      HTTP.put(`/contacts/${update.group}/${update.name}/updates/${update.id}`, {
        text: update.text
      }).then(response => resolve(response.data), reject)
    })
  },

  deleteOneByContact (item) {
    return new Promise((resolve, reject) => {
      return HTTP.delete(`/contacts/${item.group}/${item.name}/updates/${item.id}`)
        .then(response => resolve(response.data), reject)
    })
  }
}
