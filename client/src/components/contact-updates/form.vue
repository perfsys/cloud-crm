<template>
  <div>

    <form novalidate class="md-layout" @submit="onSubmit">
      <div class="md-layout md-gutter md-alignment-center-right">

        <md-field>
          <label>Add updates</label>
          <md-textarea v-model="update" required></md-textarea>
        </md-field>

        <md-field>
          <label>Upload file</label>
          <md-file v-model="fileName"  @change="onFileUpload($event.target.files[0])"/>
        </md-field>

        <md-card-actions>
          <md-button class="md-accent" @click="reset()">Clear</md-button>
          <md-button class="md-primary" type="submit">Save</md-button>
        </md-card-actions>

      </div>

      <md-dialog-alert
      :md-active.sync="failedSnackbar"
      :md-content="failedSnackbarReason"
      md-confirm-text="Close"/>

    </form>

    <div>
      <md-progress-bar md-mode="indeterminate" v-if="showProgressBar"></md-progress-bar>
    </div>

  </div>
</template>

<script>

import AWS from 'aws-sdk'
import randomstring from 'randomstring'
import mime from 'mime-types'

AWS.config.region = process.env.REGION // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.IDENTITY_POOL_ID
})

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: process.env.S3_UPDATES_DATA_BUCKET}
})

export default {
  name: 'contact-updates-form',

  data () {
    return {
      update: null,
      failedSnackbar: false,
      failedSnackbarReason: 'Failed to create a update',
      fileName: null,
      file: null,
      showProgressBar: false
    }
  },

  methods: {

    onFileUpload (evt) {
      this.file = evt
    },

    onSubmit (evt) {
      evt.preventDefault()

      if (this.fileName && this.file) {
        this.createAttachmentUpdate()
      }
      if (this.update) {
        this.createTextUpdate()
      }
    },

    createTextUpdate () {
      const _self = this

      let item = {}
      item.type = 'TEXT'
      item.text = this.update

      this.$store.dispatch('updatesSaveOne', item)
        .then(() => {
          _self.reset()
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            this.failedSnackbarReason = err.response.data.error
          }
          _self.failedSnackbar = true
        })
    },

    reset () {
      this.update = null
    },

    resetFile () {
      this.file = null
      this.fileName = null
    },

    createAttachmentUpdate () {
      const _self = this

      const key = randomstring.generate({
        length: 12,
        charset: 'alphabetic'
      })
      const fileName = this.fileName
      const mimeType = mime.contentType(fileName.toString())
      const params = {
        Key: key,
        Body: this.file,
        ContentType: mimeType,
        Metadata: {
          fileName
        }
      }

      this.showProgressBar = true
      const uploadToS3 = () => {
        return new Promise((resolve, reject) => {
          s3.upload(params, (err, data) => {
            _self.showProgressBar = false
            if (err) {
              reject(err)
            } else {
              resolve(data)
            }
          })
        })
      }

      uploadToS3()
        .then(data => {
          let item = {}
          item.type = 'FILE'
          item.location = data.Location
          item.fileName = fileName
          item.mimeType = mimeType
          item.key = key
          this.$store.dispatch('fileSaveOne', item)

          _self.resetFile()
        })
    }
  }
}
</script>
<style scoped>
  .md-field {
    margin-right: 16px;
    margin-left: 16px;
  }
  .md-progress-bar {
    margin: 24px;
  }
  .md-toolbar {
    colour: #000000
  }
</style>
