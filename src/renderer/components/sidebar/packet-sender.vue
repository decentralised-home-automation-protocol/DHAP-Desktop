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
        <select class="form-control" @change="getPacketType($event)">
          <option v-for="type in packetTypes" v-bind:key="type[1]">{{type[0]}}</option>
        </select>
      </div>
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">{{packetTypes[selectedPacketIndex][1]}}</span>
      </div>
      <input class="form-control" type="text" :placeholder=packetTypes[selectedPacketIndex][2] v-model="packetData">
    </div>
    <div class="input-group mb-3">
      <button class="btn btn-outline-info btn-block" @click="sendPacket(ipaddress, packetData)">Send</button>
    </div>
  </div>
</template>

<script>
  import { server } from '@/network-manager'

  export default {
    name: 'packet-sender',
    data: function () {
      return {
        selectedPacketIndex: 0,
        packetData: '',
        ipaddress: '255.255.255.255',
        packetTypes: [
          ['Send Credentials', '100|', 'ssid,password'],
          ['Discovery Request', '300|', 'mac,statusbit,visibilitybit,headerVersion'],
          ['Header Request', '320|', 'N/A'],
          ['UI request', '200|', 'N/A'],
          ['IoT Command', '400|', 'groupID-elementID=elementStatus'],
          ['Lease Request', '500|', 'duration,interval,response'],
          ['Leave Lease', '510|', 'N/A'],
          ['Change Name', '600|', 'name'],
          ['Change Location', '610|', 'location'],
          ['Other', '', 'data']
        ]
      }
    },
    methods: {
      sendPacket (ipaddress, packetdata) {
        console.log('Sending: ' + this.packetTypes[this.selectedPacketIndex][1] + packetdata)
        server.send(this.packetTypes[this.selectedPacketIndex][1] + packetdata, 8888, ipaddress)
      },
      getPacketType (type) {
        this.selectedPacketIndex = type.target.selectedIndex
      }
    }
  }
</script>

<style>
#PacketSender {
  padding: 10px 10px 0px 10px;
}

#packetFormat {
  color: whitesmoke;
}
</style>
