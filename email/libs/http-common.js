const axios = require('axios')

module.exports = {HTTP:
    axios.create({
      baseURL: process.env.API_BASE_URL
    })
}
