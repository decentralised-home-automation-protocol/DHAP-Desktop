<template>
  <div id="PacketSender">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">IP</span>
      </div>
      <input class="form-control" type="text" name="ipInput" placeholder="192.168.1.100" v-model="ipaddress">
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Data</span>
      </div>
      <input class="form-control" type="text" placeholder="300" v-model="packetdata">
      <div class="input-group-append">
        <button class="btn btn-outline-info" @click="sendPacket(ipaddress, packetdata)">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { server } from '@/network-manager'

  export default {
    name: 'packet-sender',
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
#PacketSender {
  padding: 10px 10px 0px 10px;
}
</style>
