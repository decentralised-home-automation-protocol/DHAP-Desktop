<template>
  <div id="content">
    <PacketSender></PacketSender>    
    <DisplayGenerator style="border: 1px solid red;"></DisplayGenerator>
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
    width: 100%;
  }

  h3, h2, h1, p {
    color: white;
  }
</style>
