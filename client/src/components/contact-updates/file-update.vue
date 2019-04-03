<template>
  <div class="md-layout-item md-size-100">

    <div class="md-layout md-gutter md-alignment-center-right">
      <div class="md-layout-item">
        <md-card-header>
          <div class="md-subhead">Created at {{ item.create_dt  | fromISO}}</div>
          <div class="md-subhead">Content Type: {{ item.mime_type}} </div>
          <a class="md-primary"  v-bind:href="item.location"  v-bind:target="blank">{{item.file_name}}
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

AWS.config.region = process.env.REGION // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.IDENTITY_POOL_ID
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
      failedSnackbarReason: 'Failed to delete a update',
      blank: '_blank'
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
