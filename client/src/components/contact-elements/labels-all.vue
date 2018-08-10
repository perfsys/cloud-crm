<template>
<div>
  <div class="md-layout">
    <div class="md-layout-item md-small-size-100">
      <md-field>
        <label for="label">Add Label</label>
        <md-input name="label" id="label" autocomplete="label" v-model="label"/>
      </md-field>
    </div>

      <div class="md-layout-item md-small-size-110">

      <md-button  class="md-primary md-icon-button" @click="saveLabel()">
          <md-icon>save</md-icon>
        </md-button>
      </div>
    </div>

    <md-dialog-alert
      :md-active.sync="failedSnackbar"
      :md-content="failedSnackbarReason"
      md-confirm-text="Close"/>

</div>
</template>

<script>

export default {
  name: 'labels-all-element',

  props:
    ['value'],

  data () {
    return {
      label: null,

      failedSnackbar: false,
      failedSnackbarReason: 'Failed to add a label'

    }
  },

  watch: {
    value () {
      this.label = this.value
    }
  },

  methods: {
    sendBack: function () {
      this.$emit('input', this.label)
    },

    saveLabel () {
      const _self = this
      this.$store.dispatch('labelAddOne', this.label)
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
      this.label = null
    }
  }
}
</script>

<style scoped>

</style>
