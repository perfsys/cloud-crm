<template>
  <div>
    <!--<md-button class="md-fab md-primary md-fab-top-right" @click="showDialog = true">-->
    <md-button class="md-primary md-icon-button md-raised" @click="showDialog = true">
      <md-icon>add</md-icon>
    </md-button>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Create New Contact</md-dialog-title>

      <form novalidate @submit="onSubmit">
        <md-dialog-content>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="group_id">Group</label>
                <md-select v-model="form.group_id" name="group_id" id="group_id">

                  <md-option   v-for="group in groups" :value="group.id" :key="group.id">{{ group.name }}</md-option>

                </md-select>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="name">Name</label>
                <md-input name="name" id="name" autocomplete="name" v-model="form.name"/>
                <!--<span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>-->
                <!--<span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>-->
              </md-field>
            </div>
          </div>

          <!--<md-progress-bar md-mode="indeterminate" v-if="sending" />-->
          <!--:disabled="sending"-->

          <!--<md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>-->

        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">Close</md-button>
          <md-button class="md-primary" type="submit">Save</md-button>
        </md-dialog-actions>

      </form>
    </md-dialog>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'contacts-form',
  data () {
    return {
      showDialog: false,
      form: {
        group_id: null,
        name: null
      },
      errors: []
    }
  },
  computed:
    mapGetters({
      groups: 'groupsAll',
      sources: 'sourcesAll',
      types: 'typesAll',
      countries: 'countriesAll',
    }),

  created() {
    this.$store.dispatch('countriesGetAll')
    this.$store.dispatch('groupsGetAll')
    this.$store.dispatch('sourcesGetAll')
    this.$store.dispatch('typesGetAll')
  },

  methods: {

    onSubmit (evt) {
      evt.preventDefault()

      const _self = this

      this.$store.dispatch('contactsSaveOne', this.form)
        .then(() => {
          _self.reset()
          _self.showDialog = false
        })
    },
    reset () {
      // this.form.name = ''
      // this.form.discount = null
      // this.form.description = null
    }

  }
}
</script>
