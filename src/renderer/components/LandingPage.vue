<template>
  <div id="wrapper">
    <main>
      IP Address: <input type="text" name="ipInput" v-model="ipaddress"><br>
      Data: <input type="text" v-model="packetdata"><br>
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
        packetdata: '200',
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
    console.log(`server got: message from ${rinfo.address}:${rinfo.port}`)
    handleIncomingPacket(msg)
  })

  server.on('listening', () => {
    const address = server.address()
    console.log(`server listening ${address.address}:${address.port}`)
  })

  server.bind(8888)

  function handleIncomingPacket (packetData) {
    var responseType = packetData.toString().substring(0, 3)
    switch (responseType) {
      case '110':
        // Joining: Acknowledge credentials
        break
      case '120':
        // Joining: Joined network Successfully
        break
      case '130':
        // Joining: Failed to join network
        break
      case '210':
        // Display: UI Recieved
        console.log('UI Recieved')
        EventBus.$emit('New-UI-XML', packetData)
        break
      case '310':
        // Discovery: Discovery Response
        console.log('Discovery Response')
        break
      case '510':
        // Status: Request Response
        break
      case '530':
        // Status: Lease Expired
        break
      case '540':
        // Status: Status Update
        break
      default:
        // Unknown Packet Type
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
