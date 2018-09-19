<template>
  <div class="md-layout md-gutter md-alignment-center-right">
    <div class="md-layout-item md-small-size-85 md-medium-size-65">
      <md-field>
        <label for="status">Add Status</label>
        <md-input name="status" id="status" autocomplete="status" v-model="status"/>
      </md-field>
    </div>

    <div class="md-layout-item md-small-size-15">

      <md-button  class="md-primary md-icon-button" @click="saveStatus()">
        <md-icon>save</md-icon>
      </md-button>
    </div>

    <md-dialog-alert
      :md-active.sync="failedSnackbar"
      :md-content="failedSnackbarReason"
      md-confirm-text="Close"/>

  </div>
</template>

<script>

export default {
  name: 'statuses-all-element',

  props:
    ['value'],

  data () {
    return {
      status: null,

      failedSnackbar: false,
      failedSnackbarReason: 'Failed to add a status'

    }
  },

  watch: {
    value () {
      this.status = this.value
    }
  },

  methods: {
    sendBack: function () {
      this.$emit('input', this.status)
    },

    saveStatus () {
      const _self = this
      this.$store.dispatch('statusAddOne', this.status)
        .then(() => {
          _self.sendBack()
          _self.refresh()
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            this.failedSnackbarReason = err.response.data.error
          }
          _self.showDialog = true
          _self.failedSnackbar = true
        })
    },

    refresh () {
      this.status = null
    }
  }
}
</script>

<style scoped>

</style>
