<template>
  <div>
    <!--<md-button class="md-fab md-primary md-fab-top-right" @click="showDialog = true">-->
    <md-button class="md-primary md-icon-button md-raised" @click="showDialog = true">
      <md-icon>add</md-icon>
    </md-button>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Create New Contact</md-dialog-title>

      <form novalidate @submit="onSubmit">
        <md-dialog-content>

          <md-tabs md-dynamic-height>
            <md-tab md-label="General">
              <general v-model="form_general"/>
            </md-tab>
            <!--<md-tab md-label="Company">-->
              <!--<company v-model="form_company"/>-->
            <!--</md-tab>-->
            <md-tab md-label="Links">
              <links v-model="form_links"/>
            </md-tab>
          </md-tabs>

          <!--<md-progress-bar md-mode="indeterminate" v-if="sending" />-->
          <!--:disabled="sending"-->

          <!--<md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>-->

        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">Close</md-button>
          <md-button class="md-primary" type="submit">Save</md-button>
        </md-dialog-actions>

        <md-dialog-alert
          :md-active.sync="successSnackbar"
          md-content="Contact was created"
          md-confirm-text="Close"/>

        <md-dialog-alert
          :md-active.sync="failedSnackbar"
          :md-content="failedSnackbarReason"
          md-confirm-text="Close"/>

      </form>
    </md-dialog>
  </div>
</template>

<script>

import links from '@/components/contacts/form-links'
import company from '@/components/contacts/form-company'
import general from '@/components/contacts/form-general'

const R = require('ramda')

export default {
  name: 'contacts-form',
  data () {
    return {

      showDialog: false,

      form_general: {},
      form_company: {},
      form_links: {},

      successSnackbar: false,
      failedSnackbar: false,
      failedSnackbarReason: 'Failed to create a contact'
    }
  },
  components: {
    links,
    company,
    general
  },

  methods: {

    onSubmit (evt) {
      evt.preventDefault()

      const _self = this

      this.$store.dispatch('contactsSaveOne', R.merge(this.form_general, this.form_company, this.form_links))
        .then(() => {
          _self.reset()
          // _self.successSnackbar = true
          _self.showDialog = false
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            this.failedSnackbarReason = err.response.data.error
          }
          _self.failedSnackbar = true
        })
    },
    reset () {
      // this.form.name = ''
      // this.form.discount = null
      // this.form.description = null
    }

  }
}
</script>
<style scoped>

</style>
