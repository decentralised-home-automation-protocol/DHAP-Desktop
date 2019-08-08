<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <Sidebar></Sidebar>
    <LandingPage></LandingPage>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar'
  import LandingPage from './components/LandingPage'

  export default {
    name: 'my-project',
    components: { Sidebar, LandingPage }
  }
</script>

<style>
  #app {
    background: #212121;
    align-items: stretch;
    display: flex;
    width: 100%;
  }
</style>
