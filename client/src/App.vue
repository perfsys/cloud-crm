<template>

  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-dense md-primary">

        <div class="md-toolbar-row">

          <div class="md-toolbar-section-start">

            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">Cloud CRM</span>

          </div>

        </div>

        <router-view name="top"></router-view>

      </md-app-toolbar>

      <md-app-drawer  :md-active.sync="menuVisible" md-permanent="clipped">
        <!--<md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>-->
        <navigation-left></navigation-left>
      </md-app-drawer>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>

</template>

<script>
import navigation_left from '@/components/navigation/left'

export default {
  name: 'App',
  data () {
    return {
      menuVisible: false
    }
  },
  components: {
    'navigation-left': navigation_left
  }
}
</script>

<style scoped>
  .md-app {

    /*iphone 6/7/8  */
    min-height: 667px;

    /*max-height: 400px;*/
    /*border: 1px solid rgba(#000, .12);*/
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>
