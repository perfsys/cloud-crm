<template>
  <div>
  <md-card>
    <md-card-header>
      <p class="md-title">{{company.company_name}}</p>
    </md-card-header>

    <md-content>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-list class="md-double-line">
          <md-subheader>General info</md-subheader>
          <md-list-item v-if="company.company_name">
            <div class="md-list-item-text">
              <p>{{company.company_name}}</p>
              <p>Company title</p>
            </div>
          </md-list-item>
          <md-list-item v-if="company.extendedTitle">
            <div class="md-list-item-text">
              <p>{{company.extendedTitle}}</p>
              <p>Full title</p>
            </div>
          </md-list-item>
          <md-list-item v-if="company.address1 || company.address2">
            <div class="md-list-item-text">
              <p v-if="company.address1||company.address2">{{company.address1}} {{company.address2}}</p>
              <p>Address</p>
            </div>
          </md-list-item>
        </md-list>
        </div>

        <div class="md-layout-item">
          <md-list class="md-double-line">
          <md-subheader v-if="company.contacts.CEO || company.contacts.CTO">Representativess</md-subheader>
          <md-list-item v-if="company.contacts.CEO">
            <div class="md-list-item-text" >
              <p>{{company.contacts.CEO}}</p>
              <p>CEO</p>
            </div>
          </md-list-item>
          <md-list-item v-if="company.contacts.CTO">
            <div class="md-list-item-text">
              <p>{{company.contacts.CTO}}</p>
              <p>CTO</p>
            </div>
          </md-list-item>
          </md-list>
        </div>

        <div class="md-layout-item">
          <md-list class="md-double-line">
          <md-subheader v-if="company.socials.facebook || company.socials.linkedIn">Social media</md-subheader>
          <md-list-item v-if="company.socials.facebook">
            <div class="md-list-item-text" >
              <p>{{company.socials.facebook}}</p>
              <p>Facebook</p>
            </div>
          </md-list-item>
          <md-list-item v-if="company.socials.linkedIn">
            <div class="md-list-item-text" >
              <p>{{company.socials.linkedIn}}</p>
              <p>LinkedIn</p>
            </div>
          </md-list-item>
        </md-list>
      </div>
    </div>
    </md-content>
  </md-card>
  <br/>
  <md-card>

    <md-card-header>
      <p class="md-title"> All Contacts of {{company.company_name}}</p>
    </md-card-header>

    <md-table v-model="contacts_of_company"  :md-sort.sync="currentSort" :md-sort-order.sync="currentSortOrder"  @md-selected="onSelect">

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
        <md-table-cell md-label="Group" md-sort-by="group_name" >{{ item.group_name }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Position" >{{ item.position }}</md-table-cell>
        <md-table-cell md-label="Status" >{{ item.status_name}}</md-table-cell>

      </md-table-row>

    </md-table>

  </md-card>
  </div>
</template>

<script>

import api from '../../api/contacts'
export default {
  name: 'company-details',
  props: ['companyId'],
  data: function () {
    return {
      company: {
        company_name: null,
        extendedTitle: null,
        websiteUrl: null,
        address1: null,
        address2: null,
        socials: {
          facebook: null,
          linkedIn: null
        },
        contacts: {
          CEO: null,
          CTO: null
        }
      },
      contacts_of_company: [],

      currentSort: 'name',
      currentSortOrder: 'asc',
      companyId1: null
    }
  },
  created: function () {
    this.refresh()
  },

  methods: {
    refresh: function () {
      let _self = this
      let companyId = this.companyId

      api.getAllByCompany(this.companyId)
        .then(function (data) {
          _self.contacts_of_company = data
        })

      this.$store.dispatch('getCompanyInfo', companyId)
        .then(function (data) {
          Object.assign(_self.company, data)
        })
    },

    onSelect (contact) {
      this.$router.push({
        name: 'contact-details',
        params: {group: contact.group_id, name: contact.name}
      })
    }
  }
}
</script>
