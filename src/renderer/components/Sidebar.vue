<template>
  <nav id="sidebar" >
    <div class="sidebar-header">
      <h3>Decentralised Home Automation</h3>
    </div>

    <ul class="list-unstyled components">
      <li>          
          <button type="button" class="btn btn-outline-light" @click="discovery()">Discover Devices</button>
      </li>
      <li v-for="device in devices" :key="device.deviceMac" id="device">
          <i class="fas fa-eye" v-if="device.active" @click="deactivate(device.id)"></i>
          {{device.remoteIP}}
          <button type="button" class="btn btn-outline-light"  @click="getUI(device.remoteIP, device.id)"><i class="fas fa-chevron-right"></i></button>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'Sidebar',
    computed: {
      devices () {
        return this.$store.state.devices
      }
    },
    methods: {
      discovery () {
        this.$store.dispatch('sendPacket', '300')
      },
      getUI (ip, mac) {
        this.$store.dispatch('getUI', { data: '200', ip })
      },
      deactivate (id) {
        this.$store.dispatch('deactivateDevice', id)
      }
    }
  }
</script>

<style>
  #sidebar {
    min-width: 250px;
    max-width: 250px;
    min-height: 100vh;
    border-right: 1px solid #545a5f;    
  }

  #sidebar {
    background: rgb(50, 50, 50);
    transition: all 0.3s;
  }

  #sidebar .sidebar-header {
    padding: 20px;
  }

  #sidebar ul.components {
    border-top: 1px solid #545a5f;
  }

  #sidebar ul li {
    padding: 10px;
    font-size: 1.1em;
    display: block;
    text-decoration: none;
    color: whitesmoke
  }

  #sidebar ul li:hover {
    background: #4c545c;
  }

  #device {
    background: #3b4147;
    text-align: right;
  }
</style>
