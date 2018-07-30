<template>
    <md-field>
      <label for="source_id">Source</label>
      <md-select v-model="source_id" name="source_id" id="source_id">

        <md-option v-for="source in sources" :value="source.id" :key="source.id">{{ source.name }}
        </md-option>

      </md-select>
    </md-field>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'source-element',
  props:
    ['value'],

  data () {
    return {
      source_id: this.value
    }
  },
  computed:
    mapGetters({
      sources: 'sourcesAll'
    }),
  created () {
    this.$store.dispatch('sourcesGetAll')
  },
  watch: {
    source_id () {
      this.sendBack()
    },

    value () {
      this.source_id = this.value
    }

  },

  methods: {
    sendBack: function () {
      this.$emit('input', this.source_id)
    }
  }
}
</script>

<style scoped>

</style>
