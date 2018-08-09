<template>
<div>
  <md-button class="md-primary md-icon-button md-raised" @click="showAddLabel = !showAddLabel">
    <md-icon>add</md-icon>
  </md-button>

  <div v-if="showAddLabel">
    <div class="md-layout-item md-small-size-100">
      <md-field>
        <label for="label">Add Label</label>
        <md-input name="label" id="label" autocomplete="label" v-model="label"/>
      </md-field>
    </div>

      <md-button  class="md-primary md-icon-button md-raised" @click="saveLabel()">
        <md-icon>save</md-icon>
      </md-button>
    </div>

    <md-dialog-alert
      :md-active.sync="successSnackbar"
      md-content="Label was added"
      md-confirm-text="Close"/>

    <md-dialog-alert
      :md-active.sync="failedSnackbar"
      :md-content="failedSnackbarReason"
      md-confirm-text="Close"/>

</div>
</template>

<script>

export default {
  name: 'labels-element',

  data () {
    return {
      label: null,

      showAddLabel: false,
      successSnackbar: false,
      failedSnackbar: false,
      failedSnackbarReason: 'Failed to add a label'

    }
  },

  methods: {

    saveLabel () {
      const _self = this

      this.$store.dispatch('labelAddOne', this.label)
        .then(() => {
          // _self.reset()
          _self.showDialog = true
          _self.successSnackbar = true
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
