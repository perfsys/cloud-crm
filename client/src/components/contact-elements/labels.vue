<template>
<div>

  <md-field>
    <label for="label">Labels</label>
    <md-select v-model="labels" name="labels" id="labels" multiple >
      <md-option v-for="item in allInGroup"  :key="item.name_normalized" :value="item.name_normalized">{{item.name}}</md-option>

    </md-select>
  </md-field>
  <labels-all></labels-all>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import labels_all from './labels-all'

export default {
  name: 'labels-element',
  props:
    ['value'],

  data () {
    return {
      labels: (this.value) ? this.value : []
    }
  },

  components: {
    'labels-all': labels_all
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
