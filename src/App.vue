<template>
  <div id="app">
    <homenavbar v-if="isTabbarShow"></homenavbar>
    <keep-alive v-if="$route.meta.keepAlive">
          <router-view></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import homenavbar from './components/homenavbar.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.component('homenavbar', homenavbar)
Vue.use(ElementUI)
export default {
  computed: {
    ...mapState(['isTabbarShow'])
  }
}

</script>

<style lang="scss">
*{
    margin: 0;
    padding: 0;
}
html{
  height: 100%;
}
li{
  list-style: none;
}
</style>
