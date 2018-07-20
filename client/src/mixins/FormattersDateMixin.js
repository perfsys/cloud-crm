import moment from 'moment'

export default {


  filters: {
    fromISO: function (value) {
      if(value) {
        return moment(value).format("L LTS")
      }
    },



  }
}
