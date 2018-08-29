<template>
  <div>
    <form novalidate class="md-layout" @submit="onSubmit">
      <div class="md-layout md-gutter">

      <md-field>
        <label>Add updates</label>
        <md-textarea v-model="update" required></md-textarea>
        <!--<span class="md-helper-text">Enter text</span>-->
        <!--<span class="md-error">There is an error</span>-->
      </md-field>

      <md-button class="md-primary" @click="reset()">Reset</md-button>
      <md-button class="md-primary" type="submit">Save</md-button>
      </div>

      <md-dialog-alert
      :md-active.sync="failedSnackbar"
      :md-content="failedSnackbarReason"
      md-confirm-text="Close"/>

    </form>
  </div>
</template>

<script>

export default {
  name: 'contact-updates-form',

  data () {
    return {
      update: null,

      failedSnackbar: false,
      failedSnackbarReason: 'Failed to create a update'
    }
  },

  methods: {

    onSubmit (evt) {
      evt.preventDefault()
      const _self = this

      this.$store.dispatch('updatesSaveOne', this.update)
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
    }
  }
}
</script>
