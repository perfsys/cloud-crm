<template>
  <form>
    <md-card>

      <md-card-header>
        <p class="md-title">{{company.company_name}}</p>
      </md-card-header>

      <md-card-content>
      <div class="md-layout">
      <div class="md-layout-item">
        <md-field>
          <label for="extendedTitle">Extended title</label>
          <md-input name="extendedTitle" v-model="company.extendedTitle"/>
        </md-field>
        <md-field>
          <label for="websiteUrl">Home url</label>
          <md-input name="websiteURL" v-model="company.websiteUrl"/>
        </md-field>

        <md-steppers md-vertical>
          <md-step md-label="Address">
            <md-card-content>
              <md-field>
                <label for="address1">Line 1</label>
                <md-input name="address1" v-model="company.address1"/>
              </md-field>
              <md-field>
                <label for="address2">Line 2</label>
                <md-input name="address2" v-model="company.address2"/>
              </md-field>
            </md-card-content>
          </md-step>

          <md-step md-label="Social networks">
            <md-card-content>
              <md-field>
                <label for="companyFacebook">Facebook</label>
                <md-input name="companyFacebook" v-model="company.socials.facebook"/>
              </md-field>
              <md-field>
                <label for="companyLinkedIn">LinkedIn</label>
                <md-input name="companyLinkedIn" v-model="company.socials.linkedIn"/>
              </md-field>
            </md-card-content>
          </md-step>

          <md-step md-label="Representativess">
            <md-card-content>
              <md-field>
                <label for="companyCEO">CEO</label>
                <md-input name="companyCEO" v-model="company.contacts.CEO"/>
              </md-field>
              <md-field>
                <label for="companyCTO">CTO</label>
                <md-input name="companyCTO" v-model="company.contacts.CTO"/>
              </md-field>
            </md-card-content>
          </md-step>
        </md-steppers>
        </div>
        <div class="md-layout"></div>
        </div>
      </md-card-content>
    </md-card>

    <md-dialog-actions>
      <md-button class="md-primary" @click="onCancel">Cancel</md-button>
      <md-button class="md-primary" @click.stop="onSave">Save</md-button>
    </md-dialog-actions>

    <md-dialog-alert
      :md-active.sync="sccDialog"
      md-content="Company card was updated"
      md-confirm-text="Close"
    />
    <md-dialog-alert
      :md-active.sync="errDialog"
      md-content="Unable to update company card"
      md-confirm-text="Close"
    />
  </form>
</template>

<script>
import api from '../../api/companies'
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
      },
      sccDialog: false,
      errDialog: false
    }
  },
  created: function () {
    this.refresh()
  },
  methods: {
    refresh: function () {
      let _self = this
      api.getCompanyInfo(this.companyId)
        .then(function (data) {
          Object.assign(_self.company, data)
        })
    },
    onSave: function () {
      let _self = this
      this.$store.dispatch('updateCompanyInfo', this.company)
        .then(function (data) {
          _self.sccDialog = true
          _self.refresh()
        }, function () {
          _self.errDialog = true
          _self.refresh()
        })
    },
    onCancel: function () {
      this.$router.go(-1)
    }
  }
}
</script>
