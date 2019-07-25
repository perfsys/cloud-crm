<template>
  <div class="md-layout md-gutter ">

    <div class="md-layout-item md-size-100" v-for="item in allUpdates"  :key="'container'+item.id">

      <md-divider></md-divider>
      <md-divider></md-divider>

      <keep-alive>
      <component  :is="item.type+'1'" :key="item.id" v-bind:item="item">
      </component>
      </keep-alive>
      <br/>

    </div>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'
import text_update from './text-update'
import file_update from './file-update'
import gmail_update from './gmail-update'

export default {
  name: 'contact-updates-table',

  components: {
    'TEXT1': text_update,
    'FILE1': file_update,
    'GMAIL1': gmail_update
  },

  data () {
    return {
    }
  },

  created () {
    this.$store.dispatch('updatesGetAllByContact')
  },

  computed: {

    ...mapGetters({
      allUpdates: 'updatesAll'
    })
  },

  methods: {

  }
}
</script>
<style scoped>
  pre {
    text-indent: -17px;
  }
</style>
