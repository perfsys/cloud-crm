<template>
<div>

  <md-card>
    <md-card-header>
      <div class="md-title">Create update</div>
    </md-card-header>
    <md-card-content>
      <contact-updates-add-form></contact-updates-add-form>
    </md-card-content>
  </md-card>
  <br/>

  <md-card>
    <md-card-header>
      <div class="md-title">{{contact_name}} Update</div>
    </md-card-header>
    <md-card-content>
      <contact-updates-table></contact-updates-table>
    </md-card-content>
  </md-card>

</div>
</template>

<script>

import table from './table.vue'
import form from './form.vue'

export default {
  name: 'contact-updates',

  components: {
    'contact-updates-table': table,
    'contact-updates-add-form': form
  },

  computed: {
    contact_name () {
      return this.$store.getters.routeContactName
    }
  }
}
</script>

<style scoped>

</style>
