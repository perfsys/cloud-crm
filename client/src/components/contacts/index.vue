<template>

  <contacts-table>
    <contacts-form  v-bind:gr_id="group_id" slot="form"></contacts-form>
  </contacts-table>

</template>

<script>

import table from './table.vue'
import form from './form.vue'

export default {
  name: 'contacts-index',
  props: ['group_id'],
  components: {
    'contacts-table': table,
    'contacts-form': form
  },
  created () {
    if (!this.group_id) {
      this.$store.commit('setCurrentGroup', null)
    }
  }
}
</script>

<style scoped>

</style>
