<template>
<div>
  <md-button class="md-primary md-icon-button md-raised" @click="showDialog = !showDialog">
    <md-icon>add</md-icon>
  </md-button>

  <md-chips v-if="showDialog" v-model="allInGroup" name="allInGroup" id="allInGroup"     md-clickable></md-chips>
</div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'labels-element',

    data () {
      debugger

      return {
        allInGroup: this.labelsByGroupId().map(item => item.name),
        showDialog: false,
        showAddButton: false,
        showHideButton: false

      }
    },

    computed: {

      // labels1: {
      //   get: function () {
      //     return this.getLabels1()
      //   },
      //   set: function (newValue) {
      //     this.labels2 = newValue
      //     this.sendBack()
      //   }
      // },
    },


    // created () {
    //   allInGroup
    // },
    // watch: {
    //   labels1 () {
    //     this.sendBack()
    //   },

    // value () {
    //   debugger
    //   this.labels1 = this.value.map(item => item.name)
    // }

    // },

    methods: {

    ...mapGetters([
        'labelsByGroupId'
      ])

      // getLabels1: function () {
      //   this.labels2 = this.value.map(item => item.name)
      //   return this.value.map(item => item.name)
      // },
      //
      // sendBack: function () {
      //   this.$emit('input', this.labels1)
      // }
    }
  }
</script>

<style scoped>

</style>
