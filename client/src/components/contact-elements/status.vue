<template>
  <md-field>

    <label for="status_id">Status</label>
    <md-select v-model="status_id" name="status_id" id="status_id">

      <md-option v-for="status in statuses" :value="status.id" :key="status.id">{{ status.name }}
      </md-option>

    </md-select>
  </md-field>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'status-element',
  props:
    ['value'],

  data () {
    return {
      status_id: 'NEW'
    }
  },

  computed:
    mapGetters({
      statuses: 'statusesAll'
    }),

  created () {
    this.$store.dispatch('statusesGetAll')
  },

  watch: {
    status_id () {
      this.sendBack()
    },

    value () {
      this.status_id = this.value
    }
  },

  methods: {
    sendBack: function () {
      this.$emit('input', this.status_id)
    }
  }
}
</script>

<style scoped>

</style>
