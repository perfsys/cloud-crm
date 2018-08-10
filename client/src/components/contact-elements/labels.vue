<template>
<div>

  <md-field>
    <label for="label">Labels</label>
    <md-select v-model="labels" name="labels" id="labels" multiple >
      <md-option v-for="item in allInGroup"  :key="item.name_normalized" :value="item.name_normalized">{{item.name}}</md-option>

    </md-select>
  </md-field>
  <labels-all v-model="addedLabel" ></labels-all>
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
      labels: (this.value) ? this.value : [],
      addedLabel: null
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
      allInGroup: 'labelsByGroupId',
      labelByName: 'labelByName'
    }),

  watch: {
    labels () {
      this.sendBack()
    },

    value () {
      this.labels = (this.value) ? this.value : []
    },

    addedLabel () {
      this.addAddedLabelToLabels()
    },

    allInGroup () {
      this.addAddedLabelToLabels()
    }
  },

  methods: {

    sendBack: function () {
      this.$emit('input', this.labels)
    },

    resetAddedLabel: function () {
      this.addedLabel = null
    },

    addAddedLabelToLabels: function () {
      if(this.addedLabel && this.labelByName(this.addedLabel)) {
        const addedLabelNnameNormalized = this.labelByName(this.addedLabel).name_normalized
        this.labels.push(addedLabelNnameNormalized)
        this.resetAddedLabel()
      }
    }
  }
}
</script>

<style scoped>

</style>
