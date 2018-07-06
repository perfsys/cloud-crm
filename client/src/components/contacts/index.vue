<template>

  <contacts-table>
    <contacts-form slot="form"></contacts-form>
  </contacts-table>

</template>

<script>

import table from './table.vue'
import form from './form.vue'

export default {
  name: 'contacts-index',
  props: ['organization_name'],
  components: {
    'contacts-table': table,
    'contacts-form': form
  }
}
</script>

<style scoped>

</style>
