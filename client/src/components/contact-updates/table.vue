<template>
  <!--<div class="md-layout md-gutter">-->

  <md-table v-model="allUpdates">

    <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">

      <md-card>

        <div class="md-layout md-gutter md-alignment-center-right">
          <div class="md-layout-item">
            <md-card-header>
             <div class="md-subhead">Created at {{ item.create_dt  | fromISO}}</div>
             <div class="md-subhead" v-if="item.update_dt">Last updated at  {{ item.update_dt  | fromISO}}</div>
            </md-card-header>

          </div>

          <div class="md-layout-item md-size-15">

            <md-button  class="md-icon-button md-primary" @click.stop="onEdit(item)">
              <md-icon>edit</md-icon>
            </md-button>

            <md-button  class="md-icon-button md-accent" @click.stop="updatesDeleteOne(item)">
              <md-icon>delete</md-icon>
            </md-button>

          </div>
        </div>

       <md-card-content v-if="item.id !== editedItemId">
         <pre>  {{ item.text }} </pre>
       </md-card-content>

        <md-card-content v-if="item.id === editedItemId">
          <form novalidate class="md-layout" @submit="onEditSubmit">

              <md-field>
                <md-textarea v-model="newUpdate" required></md-textarea>
              </md-field>

              <md-button class="md-accent" @click="cancel">Cancel</md-button>
              <md-button class="md-primary" type="submit">Save</md-button>

            <md-dialog-alert
              :md-active.sync="failedSnackbar"
              :md-content="failedSnackbarReason"
              md-confirm-text="Close"/>

          </form>

        </md-card-content>

      </md-card>
      <br/>

    </md-table-row>

  </md-table>
  <!--</div>-->
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import dateMixin from '@/mixins/FormattersDateMixin'

export default {
  name: 'contact-updates-table',
  mixins: [dateMixin],

  data () {
    return {
      newUpdate: null,
      editedItemId: null,
      failedSnackbar: false,
      failedSnackbarReason: 'Failed to edit a update'
    }
  },

  created () {
    this.$store.dispatch('updatesGetAllByContact')
  },

  computed: {

    ...mapGetters({
      allUpdates: 'updatesAll'
    })
  },

  methods: {

    ...mapActions([
      'updatesDeleteOne'
    ]),

    onEdit (update) {
      this.editedItemId = update.id
      this.newUpdate = update.text
    },

    cancel () {
      this.editedItemId = null
      this.newUpdate = null
    },

    onEditSubmit (evt) {
      evt.preventDefault()
      const _self = this

      let item = {}
      item.id = this.editedItemId
      item.text = this.newUpdate

      this.$store.dispatch('updatesEditOne', item)
        .then(() => {
          _self.cancel()
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            this.failedSnackbarReason = err.response.data.error
          }
          _self.failedSnackbar = true
        })
    }

  }
}
</script>
