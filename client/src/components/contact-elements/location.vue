<template>
  <md-field>
    <label for="location_id">Location</label>
    <md-select v-model="location_id" name="location_id" id="location_id">

      <md-option v-for="location in locations" :value="location.id" :key="location.id">{{ location.name }}
      </md-option>

    </md-select>
  </md-field>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'location-element',
  props:
    ['value'],

  data () {
    return {
      location_id: this.value
    }
  },
  computed:
    mapGetters({
      locations: 'locationsAll'
    }),
  created () {
    this.$store.dispatch('locationsGetAll')
  },
  watch: {
    location_id () {
      this.sendBack()
    },

    value () {
      this.location_id = this.value
    }

  },

  methods: {
    sendBack: function () {
      this.$emit('input', this.location_id)
    }
  }
}
</script>

<style scoped>

</style>
