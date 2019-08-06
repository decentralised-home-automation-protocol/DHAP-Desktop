<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <Sidebar></Sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar'

  export default {
    name: 'my-project',
    components: { Sidebar }
  }
</script>

<style>
  #app {
    background: rgb(30, 30, 30);
    align-items: stretch;
    display: flex;
    width: 100%;
  }
</style>
