<template>
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
    </div>
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
