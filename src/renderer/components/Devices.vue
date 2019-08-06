<template>
  <div id="content">
    <button class="btn btn-outline-info" @click="discovery()">Discover Devices</button>
    <div id="iotCards" v-for="device in devices" :key="device.id">
      <IoTDevice v-bind:mac="device"></IoTDevice>
    </div>
  </div>
</template>

<script>
  import { EventBus } from './event-bus.js'
  import { server } from './NetworkManager'
  import IoTDevice from './Devices/IoTDevice'

  export default {
    name: 'devices',
    components: { IoTDevice },
    data: function () {
      return {
        devices: []
      }
    },
    methods: {
      discovery () {
        console.log('Starting discovery')
        server.send('300', 8888, '192.168.1.255')
      }
    },
    mounted () {
      EventBus.$on('Device-Discovered', device => {
        if (!this.devices.includes(device)) {
          this.devices.push(device)
        }
      })
    }
  }
</script>

<style>
  #iotCards {
    padding-top: 30px;
    align-items:stretch;
  }

  #content {
    padding: 60px 80px;
    align-items:stretch;
  }
</style>
