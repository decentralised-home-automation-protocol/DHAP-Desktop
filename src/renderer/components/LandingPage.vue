<template>
  <div id="wrapper">
    <main>
      IP Address: <input type="text" name="ipInput" v-model="ipaddress" value="192.168.1.102"><br>
      Data: <input type="text" v-model="packetdata" value="300"><br>
      <button @click="sendPacket(ipaddress, packetdata)">Send Packet</button>
      <XmlParser></XmlParser>
    </main>
  </div>
</template>

<script>
  import XmlParser from './LandingPage/XmlParser'
  import { EventBus } from './event-bus.js'

  const dgram = require('dgram')
  const server = dgram.createSocket('udp4')

  export default {
    name: 'landing-page',
    components: { XmlParser },
    data: function () {
      return {
        packetdata: '300',
        ipaddress: '192.168.1.108',
        xml: '',
        clickCount: 0
      }
    },
    methods: {
      sendPacket (ipaddress, packetdata) {
        console.log('Sending:s ' + packetdata)
        server.send(packetdata, 8888, ipaddress)
      }
    }
  }

  server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`)
    server.close()
  })

  server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
    EventBus.$emit('New-Packet-Data', msg)
  })

  server.on('listening', () => {
    const address = server.address()
    console.log(`server listening ${address.address}:${address.port}`)
  })

  server.bind(8888)
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
