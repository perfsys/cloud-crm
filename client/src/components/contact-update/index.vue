<template>
  <div>
    <md-card >
      <md-card-header>
        <div class="md-title">{{contact.group_name}}  {{contact.name}}</div>
      </md-card-header>

      <md-card-content class="md-scrollbar " >

        <md-list class="md-double-line">
          <md-list-item>
            <div class="md-list-item-text">
              <span>{{contact.create_dt | fromISO}}</span>
              <span>Created</span>
            </div>
          </md-list-item>

          <md-list-item>
            <div class="md-list-item-text">
              <span>{{contact.update_dt | fromISO}}</span>
              <span>Last updated</span>
            </div>
          </md-list-item>

        </md-list>

        <form novalidate @submit.prevent="onSubmit" >

          <div class="md-layout">
            <div class="md-layout-item">
              <status_el v-model="contact.status_id"/>
              <type_el v-model="contact.type_id"/>

              <md-steppers md-vertical>

                <md-step id="first" md-label="Person">

                    <div class="md-layout-item md-small-size-100">
                      <md-field>
                      <label for="first_name">First Name</label>
                      <md-input name="first_name" id="first_name" autocomplete="first_name" v-model="contact.first_name"/>
                      </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100">
                    <md-field>
                    <label for="last_name">Last Name</label>
                    <md-input name="last_name" id="last_name" autocomplete="last_name" v-model="contact.last_name"/>
                    </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100">
                    <md-field>
                    <label for="position">Position</label>
                    <md-input name="position" id="position" autocomplete="position" v-model="contact.position"/>
                    </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100">
                      <source_el v-model="contact.source_id"/>
                    </div>

                </md-step>

                <md-step id="second" md-label="Company">

                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="company_name">Company Name</label>
                      <md-input name="company_name" id="company_name" autocomplete="company_name" v-model="contact.company_name"/>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100">
                      <md-field>
                        <label for="company_www">Company www</label>
                        <md-input name="company_www" id="company_www" autocomplete="company_www" v-model="contact.company_www"/>
                      </md-field>
                    </div>

                  <country_el v-model="contact.country_code"/>

                </md-step>

                <md-step id="third" md-label="Links">
                  <links_el v-model="links" />
                </md-step>

                <md-step id="fourth" md-label="Connect">

                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="email">Email</label>
                        <md-input name="email" id="email" type="email" autocomplete="email" v-model="contact.email"/>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="phone_number">Phone</label>
                      <md-input name="phone_number" id="phone_number" type="tel" autocomplete="phone" v-model="contact.phone_number"/>
                    </md-field>
                  </div>

                </md-step>

              </md-steppers>

              <labels_el v-model="contact.labels"/>

          </div>
            <div class="md-layout-item"></div>
          </div>

          <md-dialog-actions>
            <md-button class="md-primary" @click="onClose">Close</md-button>
            <md-button class="md-primary" type="submit">Save</md-button>
          </md-dialog-actions>

          <md-dialog-alert
            :md-active.sync="successSnackbar"
            md-content="Contact was updated"
            md-confirm-text="Close"/>

          <md-dialog-alert
            :md-active.sync="failedSnackbar"
            :md-content="failedSnackbarReason"
            md-confirm-text="Close"/>

        </form>
      </md-card-content>

    </md-card>

  </div>
</template>

<script>

import api from '../../api/contacts'
import dateMixin from '@/mixins/FormattersDateMixin'
import source_el from '@/components/contact-elements/source.vue'
import status_el from '@/components/contact-elements/status1.vue'
import type_el from '@/components/contact-elements/type.vue'
import country_el from '@/components/contact-elements/country.vue'
import links_el from '@/components/contact-elements/links.vue'
import labels_el from '@/components/contact-elements/labels.vue'

const R = require('ramda')

export default {
  name: 'contact-update',
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

        position: null,
        company_name: null,
        company_www: null,

        source_id: null,
        country_code: null,
        type_id: null,
        status_id: null,

        labels: null,

        email: null,
        phone_number: null

      },

      links: {
        facebook_link: null,
        twitter_link: null,
        linkedin_link: null
      },

      successSnackbar: false,
      failedSnackbar: false,
      failedSnackbarReason: 'Failed to create a contact'
    }
  },

  components: {
    'source_el': source_el,
    'status_el': status_el,
    'type_el': type_el,
    'country_el': country_el,
    'links_el': links_el,
    'labels_el': labels_el
  },

  created () {
    this.refresh()
  },

  methods: {

    refresh () {
      let _self = this
      if (this.group && this.name) {
        api.getOne(this.group, this.name)
          .then(data => {
            _self.contact.group_id = data.group_id
            _self.contact.group_name = data.group_name
            _self.contact.name = data.name

            _self.contact.first_name = data.first_name
            _self.contact.last_name = data.last_name

            _self.contact.position = data.position
            _self.contact.type_id = data.type_id
            _self.contact.source_id = data.source_id
            _self.contact.status_id = data.status_id
            _self.contact.create_dt = data.create_dt
            _self.contact.update_dt = data.update_dt

            _self.contact.country_code = data.country_code

            _self.contact.company_name = data.company_name
            _self.contact.company_www = data.company_www

            _self.contact.labels = data.labels

            _self.contact.email = data.email
            _self.contact.phone_number = data.phone_number

            _self.links.facebook_link = data.facebook_link
            _self.links.twitter_link = data.twitter_link
            _self.links.linkedin_link = data.linkedin_link
          })
      }
    },

    onSubmit (evt) {
      const _self = this

      this.$store.dispatch('contactsUpdateOne', R.merge(this.contact, this.links))
        .then(() => {
          // _self.reset()
          _self.successSnackbar = true
          _self.refresh()
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            this.failedSnackbarReason = err.response.data.error
          }
          _self.failedSnackbar = true
        })
    },

    onClose () {
      this.$router.go(-1)
    },
    reset () {
    }

  }
}
</script>
<style scoped>

</style>
