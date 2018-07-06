<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <md-field>
          <label for="facebook_link">Facebook</label>
          <md-input name="facebook_link" id="facebook_link" autocomplete="facebook_link"
                    v-model="facebook_link"/>
        </md-field>
      </div>
    </div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <md-field>
          <label for="twitter_link">Twitter</label>
          <md-input name="twitter_link" id="twitter_link" autocomplete="twitter_link"
                    v-model="twitter_link"/>
        </md-field>
      </div>
    </div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <md-field>
          <label for="linkedin_link">LinkedIn</label>
          <md-input name="linkedin_link" id="linkedin_link" autocomplete="linkedin_link"
                    v-model="linkedin_link"/>
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
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
      facebook_link: null,
      twitter_link: null,
      linkedin_link: null
    }
  },
  watch: {
    facebook_link () {
      this.sendBack()
    },
    twitter_link () {
      this.sendBack()
    },
    linkedin_link () {
      this.sendBack()
    }
  },
  methods: {
    sendBack: function () {
      this.$emit('input', {
        facebook_link: this.facebook_link,
        twitter_link: this.twitter_link,
        linkedin_link: this.linkedin_link
      })
    }

  }
}
</script>

<style scoped>

</style>
