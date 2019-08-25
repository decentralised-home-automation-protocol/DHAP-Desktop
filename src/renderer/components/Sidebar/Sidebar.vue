<template>
  <nav id="sidebar" >
    <link href="https://fonts.googleapis.com/css?family=Cinzel+Decorative&display=swap" rel="stylesheet">
    <div class="sidebar-header">
      <h4>Decentralised</h4>
      <h4>Home</h4>
      <h4>Automation</h4>
      <h4>Protocol</h4>
    </div>
    
    <div id="list">
      <Dropdown heading="Joining" component="Joining"></Dropdown>
      <Dropdown heading="Packet Sender" component="PacketSender"></Dropdown>

      <div id="discover">          
        <button type="button" class="btn btn-outline-light" @click="discovery()">Discover Devices</button>
        <button type="button" class="btn btn-outline-light" @click="debugDiscovery()">Debug</button>
      </div>

      <div v-for="room in rooms" :key="room">
        <Dropdown :heading="room" component="Device"></Dropdown>
      </div>

      <div v-for="device in devices" :key="device.id">
        <Device v-if="device.room == null" :device="device"></Device>
      </div>
    </div>
  </nav>
</template>

<script>
  import Device from './Device'
  import Dropdown from './Dropdown'

  export default {
    name: 'Sidebar',
    components: {
      Device,
      Dropdown
    },
    computed: {
      rooms () {
        return this.$store.state.rooms
      },
      devices () {
        return this.$store.state.devices
      }
    },
    methods: {
      discovery () {
        this.$store.dispatch('startDiscovery')
      },
      debugDiscovery () {
        this.$store.dispatch('debugDiscovery')
      }
    }
  }
</script>

<style>
  #sidebar {
    min-width: 230px;
    max-width: 230px;
    min-height: 100vh;
    border-right: 1px solid #9E9E9E;    
  }

  #sidebar {
    background: #424242;
    transition: all 0.3s;
  }

  #sidebar .sidebar-header {
    padding: 10px;
  }

  #sidebar .sidebar-header h4 {
    margin: 0px;
    font-family: 'Cinzel Decorative', cursive;
  }

  #sidebar .sidebar-header h4::first-letter {
    font-size: 150%;
  }

  #list {
    border-top: 1px solid #9E9E9E;
    border-bottom: 1px solid #616161;
  }

  #discover {
    text-align: center;
    padding: 10px;
  }
</style>
