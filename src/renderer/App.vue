<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <sidebar></sidebar>
    <display-generator></display-generator>
  </div>
</template>

<script>
  import sidebar from './components/sidebar/sidebar'
  import displayGenerator from './components/display-generator/display-generator'

  export default {
    name: 'DHAP',
    components: { sidebar, displayGenerator }
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
