<template>

  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <md-field>
          <label for="group_id">Group</label>
          <md-select v-model="group_id" name="group_id" id="group_id">

            <md-option v-for="group in groups" :value="group.id" :key="group.id">{{ group.name }}</md-option>

          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item md-small-size-100">
        <md-field>
          <label for="name">Name</label>
          <md-input name="name" id="name" autocomplete="name" v-model="name"/>
        </md-field>
      </div>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <md-field>
          <label for="company_name">Company Name</label>
          <md-input name="company_name" id="company_name" autocomplete="company_name" v-model="company_name"/>
        </md-field>
      </div>

      <div class="md-layout-item md-small-size-100">
        <md-field>
          <label for="position">Position</label>
          <md-input name="position" id="position" autocomplete="position" v-model="position"/>
        </md-field>
      </div>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <md-field>
          <label for="source_id">Source</label>
          <md-select v-model="source_id" name="source_id" id="source_id">

            <md-option v-for="source in sources" :value="source.id" :key="source.id">{{ source.name }}
            </md-option>

          </md-select>
        </md-field>
      </div>

      <div class="md-layout-item md-small-size-100">
        <md-field>
          <label for="status_id">Status</label>
          <md-select v-model="status_id" name="status_id" id="status_id">

            <md-option v-for="status in statuses" :value="status.id" :key="status.id">{{ status.name }}
            </md-option>

          </md-select>
        </md-field>
      </div>

    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <md-radio v-model="type_id" value="COLD">Cold</md-radio>
        <md-radio v-model="type_id" value="WARM">Warm</md-radio>
        <md-radio v-model="type_id" value="HOT">Hot</md-radio>
      </div>

    </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'form-general',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      group_id: null,
      name: null,
      source_id: null,
      company_name: null,
      position: null,
      type_id: null,
      status_id: 'NEW'
    }
  },
  computed:
      mapGetters({
        groups: 'groupsAll',
        sources: 'sourcesAll',
        types: 'typesAll',
        // countries: 'countriesAll',
        statuses: 'statusesAll'
      }),
  created () {
    // this.$store.dispatch('countriesGetAll')
    this.$store.dispatch('groupsGetAll')
    this.$store.dispatch('sourcesGetAll')
    this.$store.dispatch('typesGetAll')
    this.$store.dispatch('statusesGetAll')
  },
  watch: {
    group_id () {
      this.sendBack()
    },
    name () {
      this.sendBack()
    },
    source_id () {
      this.sendBack()
    },
    company_name () {
      this.sendBack()
    },
    position () {
      this.sendBack()
    },
    type_id () {
      this.sendBack()
    },
    status_id () {
      this.sendBack()
    }
  },
  methods: {
    sendBack: function () {
      this.$emit('input', {
        group_id: this.group_id,
        name: this.name,
        source_id: this.source_id,
        company_name: this.company_name,
        position: this.position,
        type_id: this.type_id,
        status_id: this.status_id
      })
    }

  }
}
</script>

<style scoped>

</style>
