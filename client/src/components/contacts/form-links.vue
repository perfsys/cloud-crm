<template>
  <links_el v-model="links"/>
</template>

<script>

import links_el from '@/components/contact-elements/links.vue'

export default {
  name: 'form-links',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      links: {
        facebook_link: null,
        twitter_link: null,
        linkedin_link: null
      }
    }
  },

  components: {
    'links_el': links_el
  },

  watch: {
    links () {
      this.sendBack()
    }
  },

  methods: {
    sendBack: function () {
      this.$emit('input', {
        facebook_link: this.links.facebook_link,
        twitter_link: this.links.twitter_link,
        linkedin_link: this.links.linkedin_link
      })
    }
  }
}
</script>

<style scoped>

</style>
