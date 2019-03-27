<template>
  <div class="md-layout-item md-size-100">

    <div class="md-layout md-gutter md-alignment-center-right">
      <div class="md-layout-item">
        <md-card-header>
          <div class="md-subhead">Created at {{ item.create_dt  | fromISO}}</div>
          <div class="md-subhead">{{ item.file_name}} </div>
          <a class="md-primary"  v-bind:href="item.location" >{{item.location}}
          </a>
        </md-card-header>
      </div>

      <div class="md-layout-item md-size-15">
        <md-button  class="md-icon-button md-primary">
          <md-icon></md-icon>
        </md-button>

        <md-button  class="md-icon-button md-accent" @click.stop="fileDeleteOne(item)">
          <md-icon>delete</md-icon>
        </md-button>
      </div>
    </div>

    <md-card-content >

    </md-card-content>

    <md-dialog-alert
      :md-active.sync="failedSnackbar"
      :md-content="failedSnackbarReason"
      md-confirm-text="Close"/>

  </div>
</template>

<script>

import AWS from 'aws-sdk'
import dateMixin from '@/mixins/FormattersDateMixin'

AWS.config.region = 'eu-west-1' // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'eu-west-1:7a8caef5-5a51-4d67-92d7-4283210e237e'
})

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: process.env.S3_UPDATES_DATA_BUCKET}
})

export default {
  name: 'file-update',
  mixins: [dateMixin],

  props: {
    item: Object
  },

  data () {
    return {
      failedSnackbar: false,
      failedSnackbarReason: 'Failed to delete a update'
    }
  },

  created () {
  },

  methods: {
    fileDeleteOne (item) {
      const _self = this

      let params = {
        Key: item.key
      }

      const deleteFromS3 = (item) => {
        return new Promise((resolve, reject) => {
          s3.deleteObject(params, (err, data) => {
            if (err) {
              reject(err)
            } else {
              resolve(data)
            }
          })
        })
      }

      // delete update from contact
      this.$store.dispatch('updatesDeleteOne', item)
        .then(deleteFromS3)
        .catch(err => {
          if (err.response && err.response.data) {
            this.failedSnackbarReason = err.response.data.error
          }
          _self.failedSnackbar = true
        })
    }
  }
}
</script>
