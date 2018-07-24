<template>
  <md-list>

    <md-subheader>Contacts</md-subheader>

    <md-list-item to="/contacts">
      <md-icon>chevron_right</md-icon>
      <span class="md-list-item-text">All Contacts</span>
    </md-list-item>

    <md-list-item md-expand :md-expanded.sync="expandGroups">

      <md-icon>chevron_right</md-icon>
      <span class="md-list-item-text">Groups</span>
      <md-list slot="md-expand">
            <div v-for="group in groups">
            <md-list-item @click="onClick(group)">
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
      groups: 'groupsAll',
    }),

  created () {
    this.$store.dispatch('groupsGetAll')
  },

  methods: {
    onClick (group) {
      this.$router.push({
          name: 'contacts-group',
          params: {group: group.id}
        }
      )
    }
  }

  }
</script>

<style scoped>

</style>
