<template>
  <div>
    <md-radio v-model="type_id" value="COLD">Cold</md-radio>
    <md-radio v-model="type_id" value="WARM">Warm</md-radio>
    <md-radio v-model="type_id" value="HOT">Hot</md-radio>
  </div>
</template>

<script>
export default {
  name: 'type-element',
  props:
    ['value'],

  data () {
    return {
      type_id: this.value
    }
  },

  watch: {
    type_id () {
      this.sendBack()
    },

    value () {
      this.type_id = this.value
    }
  },

  methods: {
    sendBack: function () {
      this.$emit('input', this.type_id)
    }
  }
}
</script>

<style scoped>

</style>
