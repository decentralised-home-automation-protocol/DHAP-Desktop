<template>
  <div id="wrapper">
    <main>
      IP Address: <input type="text" name="ipInput" v-model="ipaddress"><br>
      Data: <input type="text" v-model="packetdata"><br>
      <button @click="sendPacket(ipaddress, packetdata)">Send Packet</button>
      <DisplayGenerator></DisplayGenerator>
    </main>
  </div>
</template>

<script>
  import DisplayGenerator from './LandingPage/DisplayGenerator'
  import { server } from './NetworkManager'

  export default {
    name: 'landing-page',
    components: { DisplayGenerator },
    data: function () {
      return {
        packetdata: '200',
        ipaddress: '192.168.1.108'
      }
    },
    methods: {
      sendPacket (ipaddress, packetdata) {
        console.log('Sending: ' + packetdata)
        server.send(packetdata, 8888, ipaddress)
      }
    }
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
