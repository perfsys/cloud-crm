<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-110">

        <md-field>
          <label for="facebook_link1">Facebook</label>
          <md-input name="facebook_link1" id="facebook_link1" autocomplete="facebook_link1"
                    v-model="facebook_link1"/>
        </md-field>
      </div>
    </div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-110">
        <md-field>
          <label for="twitter_link1">Twitter</label>
          <md-input name="twitter_link1" id="twitter_link1" autocomplete="twitter_link1"
                    v-model="twitter_link1"/>
        </md-field>
      </div>
    </div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-110">
        <md-field>
          <label for="linkedin_link1">LinkedIn</label>
          <md-input name="linkedin_link1" id="linkedin_link1" autocomplete="linkedin_link1"
                    v-model="linkedin_link1"/>
        </md-field>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'links-element',
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      facebook_link2: this.value.facebook_link,
      twitter_link2: this.value.twitter_link,
      linkedin_link2: this.value.linkedin_link
    }
  },

  computed: {

    facebook_link1: {
      get: function () {
        return this.getFacebookLink1()
      },
      set: function (newValue) {
        this.facebook_link2 = newValue
        this.sendBack()
      }
    },

    twitter_link1: {
      get: function () {
        return this.getTwitterLink1()
      },
      set: function (newValue) {
        this.twitter_link2 = newValue
        this.sendBack()
      }
    },

    linkedin_link1: {
      get: function () {
        return this.getLinkedinLink1()
      },
      set: function (newValue) {
        this.linkedin_link2 = newValue
        this.sendBack()
      }
    }

  },

  methods: {

    getFacebookLink1: function () {
      this.facebook_link2 = this.value.facebook_link
      return this.value.facebook_link
    },

    getTwitterLink1: function () {
      this.twitter_link2 = this.value.twitter_link
      return this.value.twitter_link
    },

    getLinkedinLink1: function () {
      this.linkedin_link2 = this.value.linkedin_link
      return this.value.linkedin_link
    },

    sendBack: function () {
      this.$emit('input', {
        facebook_link: this.facebook_link2,
        twitter_link: this.twitter_link2,
        linkedin_link: this.linkedin_link2
      })
    }

  }
}
</script>

<style scoped>

</style>
