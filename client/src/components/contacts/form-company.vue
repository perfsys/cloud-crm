<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <md-field>
          <label for="company_name">Company</label>
          <md-input name="company_name" id="company_name" autocomplete="company_name"
                    v-model="company_name"/>
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
          <label for="company_www">Company Web</label>
          <md-input name="company_www" id="company_www" autocomplete="company_www"
                    v-model="company_www"/>
        </md-field>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'form-company',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      country_code: null,
      company_name: null,
      company_www: null,
      position: null
    }
  },
  watch: {
    country_code () {
      this.sendBack()
    },
    company_name () {
      this.sendBack()
    },
    company_www () {
      this.sendBack()
    },
    position () {
      this.sendBack()
    }
  },
  methods: {
    sendBack: function () {
      this.$emit('input', {
        country_code: this.country_code,
        company_name: this.company_name,
        company_www: this.company_www,
        position: this.position
      })
    }

  }
}
</script>

<style scoped>

</style>
