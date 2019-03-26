<template>
  <div class="md-layout-item md-size-100">

    <div class="md-layout md-gutter md-alignment-center-right">
      <div class="md-layout-item">
        <md-card-header>
          <div class="md-subhead">Created at {{ item.create_dt  | fromISO}}</div>
          <div class="md-subhead">{{ item.file_name}} </div>
          <a class="md-primary"  v-bind:href="item.location" >{{item.location}}
          </a>
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

    <md-card-content >

    </md-card-content>

  </div>
</template>

<script>

import dateMixin from '@/mixins/FormattersDateMixin'

export default {
  name: 'file-update',
  mixins: [dateMixin],

  props: {
    item: Object
  },

  created () {
  }
}
</script>
