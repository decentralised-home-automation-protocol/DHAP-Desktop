<template>
  <div>
      <h3>IP Address: </h3><input type="text" name="ipInput" v-model="ipaddress"><br>
      <h3>Data: </h3><input type="text" v-model="packetdata"><br><br>
      <button @click="sendPacket(ipaddress, packetdata)">Send Packet</button>
  </div>
</template>

<script>
  import { EventBus } from '../event-bus.js'
  // import { server } from './NetworkManager'

  export default {
    name: 'landing-page',
    data: function () {
      return {
        packetdata: '200',
        ipaddress: '192.168.1.108'
      }
    },
    methods: {
      sendPacket (ipaddress, packetdata) {
        // console.log('Sending: ' + packetdata)
        // server.send(packetdata, 8888, ipaddress)
        const fs = require('fs')
  
        fs.readFile('src\\renderer\\components\\TV.xml', (err, data) => {
          if (err) throw err
          EventBus.$emit('New-UI-XML', data.toString())
        })
      }
    }
  }
</script>

<style>
</style>
