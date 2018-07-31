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
  }
}
</script>

<style scoped>

</style>
