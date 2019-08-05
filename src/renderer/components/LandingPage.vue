<template>
  <div id="wrapper">
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
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

</style>
