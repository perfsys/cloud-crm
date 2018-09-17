<template>
<div>
  <md-card>
    <md-card-header>
      <div class="md-title">{{contact.group_name}}  {{contact.name}}</div>
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
                <span>{{contact.create_dt | fromISO}}</span>
                <span>Created</span>
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

            <md-list-item>
              <div class="md-list-item-text">
                <span>{{contact.status_name}}</span>
                <span>Status</span>
              </div>

            </md-list-item>

            <md-list-item>

              <div>
                <md-chip v-for="item in labels_names"  :key="item" :value="item">{{item}}</md-chip>
                <div class="md-list-item-text">
                  <span></span>
                  <span>Labels</span>
                </div>
              </div>

            </md-list-item>

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
                <span>Company Name</span>
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
                <span>{{contact.country_name}} {{contact.country_code}}</span>
                <span>Country</span>
              </div>

            </md-list-item>

            <md-list-item>
              <div class="md-list-item-text">
                <span>{{contact.email}}</span>
                <span>Email</span>
              </div>
            </md-list-item>

            <md-list-item>
              <div class="md-list-item-text">
                <span>{{contact.phone_number}}</span>
                <span>Phone</span>
              </div>
            </md-list-item>

          </md-list>
        </div>
      </div>
    </md-card-content>

    <md-card-actions>
      <md-button class="md-primary" @click="onClose">Close</md-button>
      <md-button class="md-accent" @click="deleteOne">Delete</md-button>
      <md-button class="md-primary" @click="editOne">Edit</md-button>
    </md-card-actions>

  </md-card>
  <br/>
  <contact-updates/>
</div>
</template>

<script>
import api from '../../api/contacts'
import {mapActions} from 'vuex'
import dateMixin from '@/mixins/FormattersDateMixin'

import contact_updates from '@/components/contact-updates/index.vue'

export default {
  name: 'contact-details-index',
  props: ['group', 'name'],
  mixins: [dateMixin],

  data () {
    return {
      contact: {
        group_id: null,
        group_name: null,
        name: null,
        first_name: null,
        last_name: null,
        create_dt: null,

        source_id: null,
        source_name: null,
        country_code: null,
        country: null,
        type_id: null,
        type_name: null,
        status_id: null,
        status_name: null,
        labels: null,

        company_name: null,
        company_www: null,
        position: null,
        facebook_link: null,
        twitter_link: null,
        linkedin_link: null,

        email: null,
        phone_number: null
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
        this.contact.create_dt = data.create_dt

        this.contact.source_name = data.source_name
        this.contact.type_name = data.type_name

        this.contact.country_name = data.country_name
        this.contact.country_code = data.country_code

        this.contact.company_name = data.company_name
        this.contact.company_www = data.company_www
        this.contact.position = data.position
        this.contact.status_name = data.status_name
        this.contact.labels = data.labels

        this.contact.facebook_link = data.facebook_link
        this.contact.twitter_link = data.twitter_link
        this.contact.linkedin_link = data.linkedin_link

        this.contact.email = data.email
        this.contact.phone_number = data.phone_number
      })
  },

  components: {
    'contact-updates': contact_updates
  },

  computed: {
    labels_names () {
      return this.$store.getters.labelsNamesByIds(this.contact.labels)
    }
  },

  methods: {

    ...mapActions([
      'contactsDeleteOne'
    ]),

    deleteOne (event) {
      this.contactsDeleteOne(this.contact)
        .then(() => {
          this.$router.push({
            name: 'contacts'
          })
        })
    },
    editOne (event) {
      this.$router.push({
        name: 'contact-update'
      })
    },
    onClose () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
