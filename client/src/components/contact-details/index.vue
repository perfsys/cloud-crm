<template>

  <md-card>
    <md-card-header>
      <div class="md-title">{{contact.first_name}} {{contact.last_name}} ({{contact.name}})</div>
    </md-card-header>

    <md-card-content>
      <div class="md-layout">
        <div class="md-layout-item md-small-size-100">
          <md-list class="md-double-line">
            <md-subheader>General</md-subheader>

            <md-list-item>
              <div class="md-list-item-text">
                <span>{{contact.group_name}}</span>
                <span>Group</span>
              </div>

            </md-list-item>

            <md-list-item>
              <div class="md-list-item-text">
                <span>{{contact.name}}</span>
                <span>Name</span>
              </div>

            </md-list-item>

            <md-list-item>
              <div class="md-list-item-text">
                <span>{{contact.source_name}}</span>
                <span>Source</span>
              </div>

            </md-list-item>

            <md-list-item>
              <div class="md-list-item-text">
                <span>{{contact.type_name}}</span>
                <span>Type</span>
              </div>

            </md-list-item>

            <md-divider></md-divider>
            <md-subheader>Links</md-subheader>

            <md-list-item>
              <div class="md-list-item-text">
                <span>{{contact.facebook_link}}</span>
                <span>Facebook</span>
              </div>
            </md-list-item>

            <md-list-item>
              <div class="md-list-item-text">
                <span>{{contact.twitter_link}}</span>
                <span>Twitter</span>
              </div>
            </md-list-item>

            <md-list-item>
              <div class="md-list-item-text">
                <span>{{contact.linkedin_link}}</span>
                <span>LinkedIn</span>
              </div>
            </md-list-item>

          </md-list>
        </div>
        <div class="md-layout-item md-small-size-100">

          <md-list class="md-double-line">
            <md-subheader>Company</md-subheader>

            <md-list-item>
              <div class="md-list-item-text">
                <span>{{contact.company_name}}</span>
                <span>Name</span>
              </div>
            </md-list-item>

            <md-list-item>
              <div class="md-list-item-text">
                <span>{{contact.company_www}}</span>
                <span>Website</span>
              </div>
            </md-list-item>

            <md-list-item>
              <div class="md-list-item-text">
                <span>{{contact.position}}</span>
                <span>Position</span>
              </div>
            </md-list-item>

            <md-list-item>
              <div class="md-list-item-text">
                <span>{{contact.country}} {{contact.country_code}}</span>
                <span>Country</span>
              </div>

            </md-list-item>

          </md-list>
        </div>
      </div>
    </md-card-content>
  </md-card>

</template>

<script>
import api from '../../api/contacts'

export default {
  name: 'contact-details-index',
  props: ['group', 'name'],
  data () {
    return {
      contact: {
        group_id: null,
        group_name: null,
        name: null,
        first_name: null,
        last_name: null,

        source_id: null,
        source_name: null,
        country_code: null,
        country: null,
        type_id: null,
        type_name: null,

        company_name: null,
        company_www: null,
        position: null,
        facebook_link: null,
        twitter_link: null,
        linkedin_link: null
      }
    }
  },
  created () {
    api.getOne(this.group, this.name)
      .then(data => {
        this.contact.group_id = data.group_id
        this.contact.group_name = data.group_name
        this.contact.name = data.name
        this.contact.first_name = data.first_name
        this.contact.last_name = data.last_name

        this.contact.source_name = data.source_name
        this.contact.type_name = data.type_name

        this.contact.country = data.country
        this.contact.country_code = data.country_code

        this.contact.company_name = data.company_name
        this.contact.company_www = data.company_www

        this.contact.facebook_link = data.facebook_link
        this.contact.twitter_link = data.twitter_link
        this.contact.linkedin_link = data.linkedin_link
      })
  },
  methods: {}
}
</script>

<style scoped>

</style>
