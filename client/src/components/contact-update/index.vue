<template>
  <div>


    <md-card >
      <md-card-header>
        <div class="md-title">Edit contact</div>
        <div class="md-title">{{contact.group_name}}  {{contact.name}}</div>
      </md-card-header>

      <md-card-content class="md-scrollbar">
        <div class="md-title">Created: {{contact.create_dt | fromISO}}</div>
        <div class="md-title">Last updated: {{contact.update_dt | fromISO}}</div>


        <form novalidate @submit="onSubmit" >

          <md-field>
            <label for="status_id">Status</label>
            <md-select v-model="contact.status_id" name="status_id" id="status_id">

              <md-option v-for="status in statuses" :value="status.id" :key="status.id">{{ status.name }}
              </md-option>

            </md-select>
          </md-field>

          <div class="md-layout-item md-small-size-100">
            <md-radio v-model="contact.type_id" value="COLD">Cold</md-radio>
            <md-radio v-model="contact.type_id" value="WARM">Warm</md-radio>
            <md-radio v-model="contact.type_id" value="HOT">Hot</md-radio>
          </div>

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
                <md-field>
                  <label for="source_id">Source</label>
                  <md-select v-model="contact.source_id" name="source_id" id="source_id">
                    <md-option v-for="source in sources" :value="source.id" :key="source.id">{{ source.name }}
                    </md-option>
                  </md-select>
                </md-field>
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

                <md-field>
                  <label for="country">Country</label>
                  <md-select v-model="contact.country_code" name="country" id="country">

                    <md-option v-for="country in countries" :value="country.abbreviation" :key="country.abbreviation">{{ country.country }}
                    </md-option>

                  </md-select>
                </md-field>

            </md-step>
            <md-step id="third" md-label="Links">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="facebook_link">Facebook Link</label>
                    <md-input name="facebook_link" id="facebook_link" autocomplete="facebook_link" v-model="contact.facebook_link"/>
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="twitter_link">Twitter Link</label>
                    <md-input name="twitter_link" id="twitter_link" autocomplete="twitter_link" v-model="contact.twitter_link"/>
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="linkedin_link">Linkedin Link</label>
                    <md-input name="linkedin_link" id="linkedin_link" autocomplete="linkedin_link" v-model="contact.linkedin_link"/>
                  </md-field>
                </div>

            </md-step>
          </md-steppers>


        <md-dialog-actions>
          <md-button class="md-primary" @click="onClose">Close</md-button>
          <md-button class="md-primary" type="submit">Save</md-button>
        </md-dialog-actions>

        <md-dialog-alert
          :md-active.sync="successSnackbar"
          md-content="Contact was created"
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
  import {mapGetters} from 'vuex'
  import dateMixin from '@/mixins/FormattersDateMixin'

  const R = require('ramda')

  export default {
    name: 'contacts-form',
    props: ['group', 'name'],
    mixins: [dateMixin],
    data () {
      return {

        contact:{
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

          facebook_link: null,
          twitter_link: null,
          linkedin_link: null

        },

        successSnackbar: false,
        failedSnackbar: false,
        failedSnackbarReason: 'Failed to create a contact'
      }
    },

    computed:
      mapGetters({
        groups: 'groupsAll',
        sources: 'sourcesAll',
        types: 'typesAll',
        countries: 'countriesAll',
        statuses: 'statusesAll'
      }),

    created () {
      this.$store.dispatch('countriesGetAll')
      this.$store.dispatch('groupsGetAll')
      this.$store.dispatch('sourcesGetAll')
      this.$store.dispatch('typesGetAll')
      this.$store.dispatch('statusesGetAll')
      this.refresh()
    },

    methods: {

      refresh(){
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

              _self.contact.facebook_link = data.facebook_link
              _self.contact.twitter_link = data.twitter_link
              _self.contact.linkedin_link = data.linkedin_link
            })
        }
      },

      onSubmit (evt) {
        evt.preventDefault()

        const _self = this

        this.$store.dispatch('contactsUpdateOne', this.contact)
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

      onClose (){
        this.$router.go(-1)
      },
      reset () {
      }

    }
  }
</script>
<style scoped>

</style>
