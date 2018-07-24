<template>
  <contacts v-bind:group_id="group"></contacts>
</template>

<script>

  import contacts from '@/components/contacts/index.vue'

  export default {
    name: 'contacts-group',
    props: ['group'],

    components:{
      'contacts' : contacts
    },

    beforeRouteUpdate (to, from, next) {
      this.$store.dispatch('contactsGetAllInGroup', to.params.group)
      next()
    }

  }
</script>
