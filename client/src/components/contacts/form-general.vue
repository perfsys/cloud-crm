<template>

  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <group_el v-model="group_id"/>
      </div>
      <div class="md-layout-item md-small-size-100">
        <md-field>
          <label for="name">Name</label>
          <md-input name="name" id="name" autocomplete="name" v-model="name" />
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
        <source_el v-model="source_id"/>
      </div>

      <div class="md-layout-item md-small-size-100">
        <type_el v-model="type_id"/>
      </div>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100" v-if="showLabels">
        <labels_el v-model="labels"/>
      </div>

      <div class="md-layout-item md-small-size-100" >
        <status_el v-model="status_id" v-if="showStatuses"/>
      </div>
    </div>

  </div>
</template>

<script>
import group_el from '@/components/contact-elements/group.vue'
import source_el from '@/components/contact-elements/source.vue'
import status_el from '@/components/contact-elements/status1.vue'
import type_el from '@/components/contact-elements/type.vue'
import labels_el from '@/components/contact-elements/labels.vue'

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
      status_id: 'NEW',
      labels: null,

      showLabels: true,
      showStatuses: true
    }
  },

  components: {
    'group_el': group_el,
    'source_el': source_el,
    'status_el': status_el,
    'type_el': type_el,
    'labels_el': labels_el
  },

  created () {
    this.group_id = this.value.group_id
    if (!this.$route.params.group) {
      this.showLabels = false
      this.showStatuses = false
    }
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
    },
    labels () {
      this.sendBack()
    }
  },
  methods: {
    sendBack: function () {
      this.$emit('input', {
        group_id: this.group_id,
        name: this.name.trim(),
        source_id: this.source_id,
        company_name: this.company_name.trim(),
        position: this.position,
        type_id: this.type_id,
        status_id: this.status_id,
        labels: this.labels
      })
    }

  }
}
</script>

<style scoped>

</style>
