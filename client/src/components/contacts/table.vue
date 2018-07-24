<template>

  <md-table v-model="contacts" md-card @md-selected="onSelect" md-sort="name" md-sort-order="asc">

    <md-table-toolbar>
      <h1 class="md-title">All Contacts</h1>
      <slot name="form"></slot>
    </md-table-toolbar>

    <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
      <md-table-cell md-label="Group" md-sort-by="group_name" >{{ item.group_name }}</md-table-cell>
      <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
      <md-table-cell md-label="Company" md-sort-by="company_name">{{ item.company_name }}</md-table-cell>
      <md-table-cell md-label="Position" md-sort-by="position">{{ item.position }}</md-table-cell>
      <md-table-cell md-label="Created" md-sort-by="create_dt">{{ item.create_dt | fromISO}}</md-table-cell>
      <md-table-cell md-label="Type" md-sort-by="type_name">{{ item.type_name }}</md-table-cell>
      <md-table-cell md-label="Status" md-sort-by="status_name">{{ item.status_name}}</md-table-cell>
      <md-table-cell md-label="Source" md-sort-by="source_name" >{{ item.source_name }}</md-table-cell>

      <md-table-cell>
        <md-button class="md-icon-button md-accent" @click.stop="onEdit(item)">
          <md-icon>edit</md-icon>
        </md-button>
      </md-table-cell>

      <md-table-cell>
        <md-button class="md-icon-button md-accent" @click.stop="contactsDeleteOne(item)">
          <md-icon>delete</md-icon>
        </md-button>
      </md-table-cell>
    </md-table-row>

  </md-table>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import dateMixin from '@/mixins/FormattersDateMixin'

export default {
  name: 'contacts-table',
  mixins: [dateMixin],
  props: ['group_id'],

  computed:
      mapGetters({
        contacts: 'contactsAll'
      }),

  created () {
    if (this.group_id) {
      this.$store.dispatch('contactsGetAllInGroup', this.group_id)
    } else {
    // Get Contacts on Created
      this.$store.dispatch('contactsGetAll')
    }
  },

  methods: {

    ...mapActions([
      'contactsDeleteOne'
    ]),

    onSelect (contact) {
      this.$router.push({
        name: 'contact-details',
        params: {group: contact.group_id, name: contact.name}
      }
      )
    },

    onEdit (contact) {
      this.$router.push({
        name: 'contact-update',
        params: {group: contact.group_id, name: contact.name}
      }
      )
    }
  }

}
</script>
