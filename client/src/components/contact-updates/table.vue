<template>
  <div>
  <slot name="form"></slot>

  <md-table v-model="allUpdates"  @md-selected="onSelect" md-fixed-header>

    <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
      <md-table-cell md-label="Created" md-sort-by="create_dt" >{{ item.create_dt }}</md-table-cell>

      <md-table-cell md-label="Message">{{ item.text }}</md-table-cell>

      <md-table-cell>
        <md-button class="md-icon-button md-accent" @click.stop="onEdit(item)">
          <md-icon>edit</md-icon>
        </md-button>
      </md-table-cell>

      <md-table-cell>
        <md-button class="md-icon-button md-accent" @click.stop="updatesDeleteOne(item)">
          <md-icon>delete</md-icon>
        </md-button>
      </md-table-cell>

    </md-table-row>

  </md-table>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import dateMixin from '@/mixins/FormattersDateMixin'

export default {
  name: 'contact-updates-table',
  mixins: [dateMixin],

  created () {
    this.$store.dispatch('updatesGetAllByContact')
  },

  computed: {

    ...mapGetters({
      allUpdates: 'updatesAll'
    })
  },

  methods: {

    ...mapActions([
      'updatesDeleteOne'
    ]),

    onEdit (update) {

    }

  }
}
</script>
