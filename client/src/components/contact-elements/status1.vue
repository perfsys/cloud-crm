<template>
  <div>

    <div class="md-layout md-gutter md-alignment-center-space-between">
      <div class="md-layout-item md-small-size-85 md-medium-size-65">

        <md-field  v-if="!showStatusesDropDown">
          <label for="status">No Statuses Yet</label>
        </md-field>

        <md-field  v-if="showStatusesDropDown">
          <label for="status">Status</label>
          <md-select v-model="status_id" name="status_id" id="status_id" >

            <md-option   v-for="item in allInGroup"  :key="item.id" :value="item.id">

               {{item.name}}

            </md-option>

          </md-select>
        </md-field>
      </div>

      <div class="md-layout-item md-small-size-15">
        <md-button class="md-primary md-icon-button " @click="showAddStatuses">
          <md-icon v-if="expandMore">expand_more</md-icon>
          <md-icon v-if="!expandMore">expand_less</md-icon>
        </md-button>
      </div>
    </div>

    <div class="md-layout md-gutter md-alignment-center-space-between">
      <div class="md-layout-item md-size-100" v-if="showStatuses">
        <statuses_all v-model="addedStatus"></statuses_all>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import statuses_all from './statuses-all'

export default {
  name: 'status-element',
  props:
    ['value'],

  data () {
    return {
      status_id: null,

      addedStatus: null,

      showStatuses: false,

      expandMore: true
    }
  },

  components: {
    'statuses_all': statuses_all
  },

  created () {
    this.$store.dispatch('groupsGetAll')
  },

  computed: {
    ...mapGetters({
      allInGroup: 'statusesByGroupId',
      statusByName: 'statusByName'
    }),

    showStatusesDropDown: function () {
      return this.allInGroup && this.allInGroup.length > 0
    }
  },

  watch: {
    status_id () {
      this.sendBack()
    },

    value () {
      this.status_id = this.value
    },

    addedStatus () {
      this.doAddedStatusCurrent()
    },

    allInGroup () {
      this.doAddedStatusCurrent()
    }
  },

  methods: {

    sendBack: function () {
      this.$emit('input', this.status_id)
    },

    resetAddedStatus: function () {
      this.addedStatus = null
      this.showAddStatuses()
    },

    doAddedStatusCurrent: function () {
      if (this.addedStatus && this.statusByName(this.addedStatus)) {
        this.status_id = this.statusByName(this.addedStatus).id
        this.resetAddedStatus()
      }
    },

    showAddStatuses: function () {
      this.showStatuses = !this.showStatuses
      this.expandMore = !this.expandMore
    }

  }
}
</script>

<style scoped>

</style>
