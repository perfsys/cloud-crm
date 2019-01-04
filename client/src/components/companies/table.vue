<template>
  <md-table md-card v-model="companiesList" @md-selected="onSelect">
    <md-table-toolbar>
      <h1 class="md-title" @click.stop="refresh()">All companies</h1>
      <p></p>
    </md-table-toolbar>

    <md-table-row slot="md-table-row" slot-scope="{item}" md-selectable="single">
      <md-table-cell md-label="Company name">{{item.company_name}}</md-table-cell>
      <md-table-cell>
        <md-button class="md-icon-button md-accent" @click.stop="onEdit(item)">
          <md-icon>edit</md-icon>
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {}
  },
  created () {
    this.refresh()
  },
  methods: {
    refresh () {
      this.$store.dispatch('getCompaniesList')
    },
    onSelect (company) {
      this.$router.push({
        name: 'company-details',
        params: {companyId: company.company_normalized}
      })
    },
    onEdit (company) {
      this.$router.push({
        name: 'company-edit',
        params: {companyId: company.company_normalized}
      })
    }
  },
  computed: {
    ...mapGetters({
      companiesList: 'allCompanies'
    })
  }
}
</script>
