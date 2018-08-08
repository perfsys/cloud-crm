<template>
<div>
  <md-button class="md-primary md-icon-button md-raised" @click="showDialog = !showDialog">
    <md-icon>add</md-icon>
  </md-button>

  <md-chips v-if="showDialog" v-model="allInGroup" name="allInGroup" id="allInGroup"     md-clickable></md-chips>
</div>
</template>

<script>

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
  }
}
</script>

<style scoped>

</style>
