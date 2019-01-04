<template>

  <md-list>

    <md-subheader>Companies</md-subheader>
    <md-list-item to="/companies">
      <md-icon>chevron_right</md-icon>
      <span class="md-list-item-text">Companies</span>
    </md-list-item>

    <md-subheader>Contacts</md-subheader>

    <md-list-item to="/contacts">
      <md-icon>chevron_right</md-icon>
      <span class="md-list-item-text">All Contacts</span>
    </md-list-item>

    <md-list-item md-expand :md-expanded.sync="expandGroups">

      <md-icon>chevron_right</md-icon>
      <span class="md-list-item-text">Groups</span>
      <md-list slot="md-expand">
        <div v-for="group in groups" :key="group.id">
        <md-list-item :to="{ path: `/contacts/`+`${group.id}`}">
          <span class="md-list-item-text">{{group.name}}</span>
        </md-list-item>
        </div>
      </md-list>

    </md-list-item>

  </md-list>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'navigation-left',

  data () {
    return {
      expandGroups: false
    }
  },

  computed:
    mapGetters({
      groups: 'groupsAll'
    }),

  created () {
    this.$store.dispatch('groupsGetAll')
  },

  methods: {
  }
}
</script>

<style scoped>

</style>
