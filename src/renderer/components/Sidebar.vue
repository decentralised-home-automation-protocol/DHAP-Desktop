<template>
  <nav id="sidebar" >
    <link href="https://fonts.googleapis.com/css?family=Cinzel+Decorative&display=swap" rel="stylesheet">
    <div class="sidebar-header">
      <h4>Decentralised</h4>
      <h4>Home</h4>
      <h4>Automation</h4>
      <h4>Protocol</h4>
    </div>

    <ul class="list-unstyled components">
      <li id="discover">          
          <button type="button" class="btn btn-outline-light" @click="discovery()">Discover Devices</button>
      </li>
      <li v-for="device in devices" :key="device.deviceMac" id="device"> 
        <div class="container-fluid">
          <div class="row">       
            <div class="col-9">
              <div v-if="device.name">{{device.name}}</div>
              <div v-else>{{device.remoteIP}}</div>
            </div>
            <div class="col-2">
              <div v-if="device.active">
                <button type="button" class="btn btn-outline-light" @click="deactivate(device.id)">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div v-else>
                <button type="button" class="btn btn-outline-light" @click="getUI(device.remoteIP, device.id)">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
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
        this.$store.dispatch('startDiscovery')
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

  #sidebar ul.components {
    border-top: 1px solid #9E9E9E;
    border-bottom: 1px solid #616161;
  }

  #sidebar ul li {
    padding: 10px;
    font-size: 1.1em;
    display: block;
    text-decoration: none;
    color: whitesmoke
  }

  #sidebar ul li:hover {
    background: #616161;
  }

  #device {
    border-top: 1px solid #616161;
    display: inline;
  }

  #elements {
    margin: 0px;
  }

  #discover {
    text-align: center;
  }
</style>
