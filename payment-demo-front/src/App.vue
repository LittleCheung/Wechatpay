<template>
  <div id="app">
    <!-- 公共头 -->
    <AppHeader />
    <!-- /公共头 -->

    <router-view />

    <!-- 公共底 -->
    <AppFooter />
    <!-- /公共底 -->

  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

import './assets/css/reset.css'
import './assets/css/theme.css'
import './assets/css/global.css'

export default {
  name: 'App',
  components: {
    AppHeader, AppFooter
  }
}
</script>