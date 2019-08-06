<template>
  <div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">IP Address</span>
      </div>
      <input class="form-control" type="text" name="ipInput" placeholder="192.168.1.100" v-model="ipaddress">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Data</span>
      </div>
      <input class="form-control" type="text" placeholder="300" v-model="packetdata">
      <div class="input-group-append">
        <button class="btn btn-outline-info" @click="sendPacket(ipaddress, packetdata)">Send Packet</button>
      </div>
    </div>
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
