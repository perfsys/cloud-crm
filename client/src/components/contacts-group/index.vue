<template>
  <contacts v-bind:group_id="gr_id"></contacts>
</template>

<script>

import contacts from '@/components/contacts/index.vue'

export default {
  name: 'contacts-group',
  props: ['group'],
  data () {
    return {
      gr_id: null
    }
  },

  created () {
    this.gr_id = this.group
    this.$store.commit('setCurrentGroup', this.group)
    this.$store.dispatch('contactsGetAllInCurrentGroup')
  },

  components: {
    'contacts': contacts
  },

  beforeRouteUpdate (to, from, next) {
    this.$store.commit('setCurrentGroup', to.params.group)
    this.$store.dispatch('contactsGetAllInCurrentGroup')
    this.gr_id = to.params.group
    next()
  }

}
</script>
