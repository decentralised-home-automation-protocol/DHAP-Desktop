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
      <dropdown heading="Settings" component="settings"></dropdown>
      <dropdown heading="Packet Sender" component="packet-sender"></dropdown>
      <dropdown heading="Joining" component="joining"></dropdown>
      <dropdown heading="Discovery" component="discovery"></dropdown>

      <div id="divider"></div>

      <div v-for="room in rooms" :key="room">
        <dropdown :heading="room" component="device"></dropdown>
      </div>

      <div v-for="device in devices" :key="device.id">
        <device v-if="device.room == null" :device="device"></device>
      </div>
    </div>
  </nav>
</template>

<script>
  import device from './device'
  import dropdown from './dropdown'

  export default {
    name: 'sidebar',
    components: {
      device,
      dropdown
    },
    computed: {
      rooms () {
        return this.$store.state.rooms
      },
      devices () {
        return this.$store.state.devices
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

  #divider {
    border-top: 1px solid #9E9E9E;
  }
</style>
