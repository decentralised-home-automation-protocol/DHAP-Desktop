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
  #wrapper {
    background: rgb(30, 30, 30);
    align-items: stretch;
    display: flex;
    width: 100%;
  }

  #content {
    padding: 60px 80px;
  }

  h3, h2, h1, p {
    color: white;
  }
</style>
