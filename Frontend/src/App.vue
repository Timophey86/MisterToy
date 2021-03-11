<template>
  <div id="app">
    <app-header/>
    <router-view/>
  </div>
</template>


<script>

import appHeader from './components/app-header.cmp.vue'

export default {
  name: 'Main',
  components: {
    appHeader
  }
}
</script>