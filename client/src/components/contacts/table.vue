<template>
  <md-table v-model="contacts"  @md-selected="onSelect" :md-sort.sync="currentSort" :md-sort-order.sync="currentSortOrder" :md-sort-fn="customSort">
    <dev></dev> <!-- Don't remove the line!. It's hook to show  md-table-toolbar -->
    <md-table-toolbar>
      <h1 class="md-title" v-show="!allContacts">All Contacts in {{groupName}}</h1>
      <h1 class="md-title" v-show="!allContacts"></h1>
      <h1 class="md-title" v-show="allContacts">All Contacts</h1>
      <slot name="form"></slot>
    </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
      <md-table-cell md-label="#" md-sort-by="number">{{ item.number }}</md-table-cell>
      <md-table-cell md-label="Group" md-sort-by="group_name"  v-if="allContacts">{{ item.group_name }}</md-table-cell>
      <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
      <md-table-cell md-label="Company" md-sort-by="company_name">{{ item.company_name }}</md-table-cell>
      <md-table-cell md-label="Position" md-sort-by="position">{{ item.position }}</md-table-cell>
      <md-table-cell md-label="Created" md-sort-by="create_dt">{{ item.create_dt | fromISO}}</md-table-cell>
      <md-table-cell md-label="Type" md-sort-by="type_name">{{ item.type_name }}</md-table-cell>
      <md-table-cell md-label="Status" md-sort-by="status_name">{{ item.status_name}}</md-table-cell>
      <md-table-cell md-label="Source" md-sort-by="source_name" >{{ item.source_name }}</md-table-cell>
      <md-table-cell>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-25 md-medium-size-30  md-large-size-30  md-small-size-30">
            <md-button class="md-icon-button md-primary" @click.stop=""  v-show="item.facebook_link">
              <a v-bind:href = item.facebook_link  target="blank"  >
                 <i class="fa fa-facebook fa-lg"></i>
              </a>
            </md-button>
          </div>
          <div class="md-layout-item md-size-25  md-medium-size-30 md-large-size-30  md-small-size-30">
            <md-button class="md-icon-button md-primary fa-lg" @click.stop="" v-show="item.twitter_link">
              <a v-bind:href = item.twitter_link  target="blank">
                 <i class="fa fa-twitter fa-lg" aria-hidden="true"></i>
              </a>
            </md-button>
          </div>
          <div class="md-layout-item md-size-25  md-medium-size-30 md-large-size-30  md-small-size-30">
            <md-button class="md-icon-button md-primary" @click.stop="" v-show="item.linkedin_link">
              <a v-bind:href = item.linkedin_link  target="blank">
                 <i class="fa fa-linkedin  fa-lg" aria-hidden="true"></i>
              </a>
            </md-button>
          </div>
        </div>

      </md-table-cell>

      <md-table-cell>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-25  md-medium-size-50">
            <md-button class="md-icon-button md-accent" @click.stop="onEdit(item)">
              <md-icon>edit</md-icon>
            </md-button>
          </div>
          <div class="md-layout-item md-size-25 md-medium-size-50">
            <md-button class="md-icon-button md-accent" @click.stop="contactsDeleteOne(item)">
              <md-icon>delete</md-icon>
            </md-button>
          </div>
        </div>
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
  data () {
    return {
      allContacts: true,
      currentSort: 'create_dt',
      currentSortOrder: 'desc'
    }
  },

  computed: {
    groupName () {
      return this.refreshByGroup()
    },

    ...mapGetters({
      contacts: 'contactsAll'
    })
  },

  created () {
    this.refresh()
  },

  methods: {

    ...mapActions([
      'contactsDeleteOne'
    ]),

    ...mapGetters([
      'routeGroupId', 'routeGroupName'
    ]),

    refresh () {
      this.$store.dispatch('contactsGetAllInCurrentGroup')
    },

    refreshByGroup () {
      this.refresh()
      if (this.routeGroupId()) {
        this.allContacts = false
        return this.routeGroupName()
      } else {
        this.allContacts = true
        return null
      }
    },

    onSelect (contact) {
      this.$router.push({
        name: 'contact-details',
        params: {group: contact.group_id, name: contact.name}
      })
    },

    onEdit (contact) {
      this.$router.push({
        name: 'contact-update',
        params: {group: contact.group_id, name: contact.name}
      })
    },

    customSort (value) {
      const toString = v => {
        if (!v) {
          return ''
        }
        return String(v)
      }

      return value.sort((a, b) => {
        const sortBy = this.currentSort
        if (this.currentSortOrder === 'desc') {
          return this.currentSort === 'number' ? b[sortBy] - a[sortBy] : toString(b[sortBy]).localeCompare(toString(a[sortBy]))
        }
        return this.currentSort === 'number' ? a[sortBy] - b[sortBy] : toString(a[sortBy]).localeCompare(toString(b[sortBy]))
      })
    }
  }
}
</script>
