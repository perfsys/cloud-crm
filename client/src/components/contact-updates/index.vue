<template>
<div>
  <div class="md-title">Updates</div>

  <contact-updates-table>
    <contact-updates-add-form slot="form"></contact-updates-add-form>
  </contact-updates-table>
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
  }
}
</script>

<style scoped>

</style>
