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
          <label for="first-name">First Name</label>
          <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="first_name"/>
        </md-field>
      </div>

      <div class="md-layout-item md-small-size-100">
        <md-field>
          <label for="last-name">Last Name</label>
          <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="last_name"/>
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
      first_name: null,
      last_name: null,
      type_id: null
    }
  },
  computed:
      mapGetters({
        groups: 'groupsAll',
        sources: 'sourcesAll',
        types: 'typesAll',
        countries: 'countriesAll'
      }),
  created () {
    this.$store.dispatch('countriesGetAll')
    this.$store.dispatch('groupsGetAll')
    this.$store.dispatch('sourcesGetAll')
    this.$store.dispatch('typesGetAll')
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
    first_name () {
      this.sendBack()
    },
    last_name () {
      this.sendBack()
    },
    type_id () {
      this.sendBack()
    }
  },
  methods: {
    sendBack: function () {
      this.$emit('input', {
        group_id: this.group_id,
        name: this.name,
        source_id: this.source_id,
        first_name: this.first_name,
        last_name: this.last_name,
        type_id: this.type_id
      })
    }

  }
}
</script>

<style scoped>

</style>
