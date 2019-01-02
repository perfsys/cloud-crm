<template>
  <md-card>
    <md-card-header>
      <p class="md-title">{{company.company_name}}</p>
    </md-card-header>

    <md-content>
      <md-list class="md-double-line">
        <md-subheader>General info</md-subheader>
        <md-list-item v-if="company.company_name">
          <div class="md-list-item-text">
            <p>Company title</p>
            <p>{{company.company_name}}</p>
          </div>
        </md-list-item>
        <md-list-item v-if="company.extendedTitle">
          <div class="md-list-item-text">
            <p>Full title</p>
            <p>{{company.extendedTitle}}</p>
          </div>
        </md-list-item>
        <md-list-item v-if="company.address1 || company.address2">
          <div class="md-list-item-text">
            <p>Address</p>
            <p v-if="company.address1">{{company.address1}}</p>
            <p v-if="company.address2">{{company.address2}}</p>
          </div>
        </md-list-item>

        <md-subheader v-if="company.contacts.CEO || company.contacts.CTO">Representativess</md-subheader>
        <md-list-item v-if="company.contacts.CEO">
          <div class="md-list-item-text" >
            <p>CEO</p>
            <p>{{company.contacts.CEO}}</p>
          </div>
        </md-list-item>
        <md-list-item v-if="company.contacts.CTO">
          <div class="md-list-item-text">
            <p>CTO</p>
            <p>{{company.contacts.CTO}}</p>
          </div>
        </md-list-item>

        <md-subheader v-if="company.socials.facebook || company.socials.linkedIn">Social media</md-subheader>
        <md-list-item v-if="company.socials.facebook">
          <div class="md-list-item-text" >
            <p>Facebook</p>
            <p>{{company.socials.facebook}}</p>
          </div>
        </md-list-item>
        <md-list-item v-if="company.socials.linkedIn">
          <div class="md-list-item-text" >
            <p>LinkedIn</p>
            <p>{{company.socials.linkedIn}}</p>
          </div>
        </md-list-item>
      </md-list>
    </md-content>
  </md-card>
</template>

<script>
export default {
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
      }
    }
  },
  created: function () {
    this.refresh()
  },
  methods: {
    refresh: function () {
      let _self = this
      let companyId = this.companyId
      this.$store.dispatch('getCompanyInfo', companyId)
        .then(function (data) {
          Object.assign(_self.company, data)
        })
    }
  }
}
</script>
