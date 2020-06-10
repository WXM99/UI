<template>
  <div id="app">
    <router-view style="min-height: 100%; min-width:100%; position: absolute" />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    min-height: 100%;
  }
</style>
