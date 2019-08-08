<template>
  <div id="content">
    <PacketSender></PacketSender>    
    <DisplayGenerator></DisplayGenerator>
  </div>
</template>

<script>
  import DisplayGenerator from './LandingPage/DisplayGenerator'
  import PacketSender from './LandingPage/PacketSender'

  export default {
    name: 'landing-page',
    components: { DisplayGenerator, PacketSender }
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
