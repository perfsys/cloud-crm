<template>
  <companies-table></companies-table>
</template>

<script>
import table from './table.vue'
export default {
  name: 'companies-index',
  props: {
    default: 1174
  },
  components: {
    'companies-table': table
  }
}
</script>
