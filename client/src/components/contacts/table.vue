<template>

  <md-table v-model="contacts" md-card>

    <md-table-toolbar>
      <h1 class="md-title">All Contacts</h1>
      <slot name="form"></slot>
    </md-table-toolbar>

    <md-table-row slot="md-table-row" slot-scope="{ item }">
      <md-table-cell md-label="Group">{{ item.group_name }}</md-table-cell>
      <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
      <md-table-cell md-label="Source">{{ item.source_name }}</md-table-cell>
      <md-table-cell md-label="First Name">{{ item.first_name }}</md-table-cell>
      <md-table-cell md-label="Last Name">{{ item.last_name }}</md-table-cell>
      <md-table-cell md-label="Type">{{ item.type_name }}</md-table-cell>
      <md-table-cell md-label="Company">{{ item.company_name }}</md-table-cell>

      <md-table-cell>
        <md-button class="md-icon-button md-accent" @click.stop="contactsDeleteOne(item)">
          <md-icon>delete</md-icon>
        </md-button>
      </md-table-cell>
    </md-table-row>

    </md-table>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'contacts-table',

  computed:
      mapGetters({
        contacts: 'contactsAll'
      }),

  created () {
    // Get Contacts on Created
    this.$store.dispatch('contactsGetAll')
  },

  methods: mapActions([
    'contactsDeleteOne'
  ])

}
</script>
