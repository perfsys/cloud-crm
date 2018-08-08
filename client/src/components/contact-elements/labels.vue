<template>
<div>

  <md-field>
    <md-select v-model="labels" name="labels" id="labels" multiple >
      <md-option v-for="item in allInGroup"  :key="item.name_normalized" :value="item.name_normalized">{{item.name}}</md-option>

    </md-select>
  </md-field>

</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'labels-element',
  props:
    ['value'],

  data () {
    return {
      labels: (this.value) ? this.value : []
    }
  },

  created () {
    this.$store.dispatch('groupsGetAll')
  },

  computed:
    mapGetters({
      allInGroup: 'labelsByGroupId'
    }),

  watch: {
    labels () {
      this.sendBack()
    },

    value () {
      this.labels = (this.value) ? this.value : []
    }

  },

  methods: {

    sendBack: function () {
      this.$emit('input', this.labels)
    }
  }
}
</script>

<style scoped>

</style>
