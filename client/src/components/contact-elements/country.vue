<template>
  <md-field>
    <label for="country">Country</label>
    <md-select v-model="country_code" name="country" id="country">

      <md-option v-for="country in countries" :value="country.abbreviation" :key="country.abbreviation">{{ country.country }}
      </md-option>

    </md-select>
  </md-field>

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'country-element',
  props:
    ['value'],

  data () {
    return {
      country_code: null
    }
  },

  computed:
    mapGetters({
      countries: 'countriesAll'
    }),

  created () {
    this.$store.dispatch('countriesGetAll')
  },

  watch: {
    country_code () {
      this.sendBack()
    },
    value () {
      this.country_code = this.value
    }
  },

  methods: {
    sendBack: function () {
      this.$emit('input', this.country_code)
    }
  }
}
</script>

<style scoped>

</style>
