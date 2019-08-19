<template>
  <div id="content">
    <DisplayGenerator></DisplayGenerator>
  </div>
</template>

<script>
  import DisplayGenerator from './LandingPage/DisplayGenerator'

  export default {
    name: 'landing-page',
    components: { DisplayGenerator }
  }
</script>

<style>
  #content {
    padding: 40px;
    width: 100%;
  }

  h4, h3, h2, h1, p {
    color: white;
  }
</style>
