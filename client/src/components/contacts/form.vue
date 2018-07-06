<template>
  <div>
    <!--<md-button class="md-fab md-primary md-fab-top-right" @click="showDialog = true">-->
    <md-button class="md-primary md-icon-button md-raised" @click="showDialog = true">
      <md-icon>add</md-icon>
    </md-button>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Create New {{organization_name}} Coupon Type</md-dialog-title>

      <form novalidate @submit="onSubmit">
        <md-dialog-content>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="name">Name</label>
                <md-input name="first-name" id="name" autocomplete="name" v-model="form.name"/>
                <!--<span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>-->
                <!--<span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>-->
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="discount">Discount</label>
                <md-input type="number" name="discount" id="discount" autocomplete="discount" v-model="form.discount"/>
                <!--<span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>-->
                <!--<span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>-->
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="description">Description</label>
                <md-input v-model="form.description" name="description" id="description"></md-input>
                <!--<span class="md-error" v-if="!$v.form.email.required">The email is required</span>-->
                <!--<span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>-->
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
export default {
  name: 'coupon-templates-form',
  props: ['organization_name'],
  data () {
    return {
      showDialog: false,
      form: {
        name: '',
        discount: null,
        description: null
      },
      errors: []
    }
  },
  methods: {

    onSubmit (evt) {
      evt.preventDefault()

      const _self = this

      this.$store.dispatch('couponSave', this.form)
        .then(() => {
          _self.reset()
          _self.showDialog = false
        })
    },
    reset () {
      this.form.name = ''
      this.form.discount = null
      this.form.description = null
    }

  }
}
</script>
