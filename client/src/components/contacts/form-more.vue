<template>
  <div>
    <div>
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

import status_el from '@/components/contact-elements/status1.vue'
import type_el from '@/components/contact-elements/type.vue'
import labels_el from '@/components/contact-elements/labels.vue'

export default {
  name: 'form-more',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      type_id: null,
      status_id: 'NEW',
      labels: null,

      showLabels: true,
      showStatuses: true
    }
  },

  components: {
    'status_el': status_el,
    'type_el': type_el,
    'labels_el': labels_el
  },

  created () {
    // this.group_id = this.value.groupId
    if (!this.$route.params.group) {
      this.showLabels = false
      this.showStatuses = false
    }
  },

  watch: {
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
