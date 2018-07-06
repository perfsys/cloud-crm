<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://perfsys.com"
          target="_blank"
        >
          About Us
        </a>
      </li>
      <li>
        <a
          href="https://facebook.com/perfsys"
          target="_blank"
        >
          Facebook
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/perfsysnet"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
    </ul>
    <!--<h2>Other Projects</h2>-->
    <!--<ul>-->
      <!--<li>-->
        <!--<a-->
          <!--href="http://router.vuejs.org/"-->
          <!--target="_blank"-->
        <!--&gt;-->
          <!--vue-router-->
        <!--</a>-->
      <!--</li>-->
    <!--</ul>-->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Cloud CRM App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
