<template>
<div>

  <div class="md-layout md-gutter">
    <div class="md-layout-item md-small-size-85 md-medium-size-65">
      <md-field>
        <label for="label">Labels</label>
        <md-select v-model="labels" name="labels" id="labels" multiple >
          <md-option v-for="item in allInGroup"  :key="item.name_normalized" :value="item.name_normalized">{{item.name}}</md-option>

        </md-select>
        <md-tooltip md-direction="bottom" v-if="tooltipNoLabel11">No Labels yet</md-tooltip>
      </md-field>
    </div>

    <div class="md-layout-item md-small-size-15">
     <md-button class="md-primary md-icon-button " @click="showAddLabel = !showAddLabel">
      <md-icon>add</md-icon>
    </md-button>
    </div>
  </div>

  <div class="md-layout md-gutter md-alignment-center-space-between">
    <div class="md-layout-item md-size-100" v-if="showAddLabel">
     <labels-all v-model="addedLabel"></labels-all>
    </div>
  </div>
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
      addedLabel: null,

      showAddLabel: false,
      tooltipNoLabel11: false
    }
  },

  components: {
    'labels-all': labels_all
  },

  created () {
    this.$store.dispatch('groupsGetAll')
  },

  computed: {
    ...mapGetters({
      allInGroup: 'labelsByGroupId',
      labelByName: 'labelByName'
    })
  },

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
      this.tooltipNoLabel11 = !this.allInGroup || this.allInGroup.length === 0
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
      if (this.addedLabel && this.labelByName(this.addedLabel)) {
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
