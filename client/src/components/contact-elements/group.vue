<template>
    <md-field>
      <label for="group_id">Group</label>

      <md-select v-model="group_id" name="group_id" id="group_id"  :disabled="groupDisabled">
        <md-option v-for="group in groups" :value="group.id" :key="group.id">{{ group.name }}</md-option>

      </md-select>

    </md-field>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'groups-element',
  props:
    ['value'],

  data () {
    return {
      group_id: this.value,
      groupDisabled: true
    }
  },
  computed:
    mapGetters({
      groups: 'groupsAll'
    }),
  created () {
    this.$store.dispatch('groupsGetAll')

    if (!this.$route.params.group) {
      this.groupDisabled = false
    }
  },
  watch: {
    group_id () {
      this.sendBack()
    }
  },

  methods: {
    sendBack: function () {
      this.$emit('input', this.group_id)
    }
  }
}
</script>

<style scoped>

</style>
