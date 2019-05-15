<template>
<div class="md-layout-item md-size-100">
  <div class="md-layout md-gutter md-alignment-center-right">
  <div class="md-layout-item">
  <md-card-header>
  <div class="md-subhead">Created at {{ item.create_dt  | fromISO}}</div>
  <div class="md-subhead">Type: Gmail</div>

  </md-card-header>
</div>

<div class="md-layout-item md-size-15">
  <md-button  class="md-icon-button md-primary">
    <md-icon></md-icon>
  </md-button>

  <md-button  class="md-icon-button md-accent" @click.stop="updatesDeleteOne(item)">
  <md-icon>delete</md-icon>
  </md-button>
  </div>
  </div>

  <md-card-content>
  <span v-html="getHtml(item.text )"></span>
  </md-card-content>
</div>
</template>

<script>
import {mapActions} from 'vuex'

import dateMixin from '@/mixins/FormattersDateMixin'

const showdown = require('showdown')
const converter = new showdown.Converter({simpleLineBreaks: true})

export default {
  name: 'text-update',
  mixins: [dateMixin],

  props: {
    item: Object
  },

  data () {
    return {
    }
  },

  created () {
  },

  methods: {
    ...mapActions([
      'updatesDeleteOne'
    ]),

    getHtml (text) {
      return converter.makeHtml(text)
    }
  }
}

</script>
