<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <Sidebar></Sidebar>
    <DisplayGenerator></DisplayGenerator>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar/Sidebar'
  import DisplayGenerator from './components/DisplayGenerator/DisplayGenerator'

  export default {
    name: 'my-project',
    components: { Sidebar, DisplayGenerator }
  }
</script>

<style>
  #app {
    background: #212121;
    align-items: stretch;
    display: flex;
    width: 100%;
  }

  h4, h3, h2, h1, p {
    color: white;
  }
</style>
