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
          {{device.remoteIP}}
          <button type="button" class="btn btn-outline-light"  @click="getUI(device.remoteIP)"><i class="fas fa-chevron-right"></i></button>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'Sidebar',
    // data: function () {
    //   return {
    //     devices: [],
    //     deviceMacs: []
    //   }
    // },
    computed: {
      devices () {
        return this.$store.state.devices
      }
    },
    methods: {
      discovery () {
        console.log('Starting discovery')
        this.$store.dispatch('sendPacket', '300')
        // server.send('300', 8888, '192.168.1.255')
      },
      getUI (ip) {
        console.log('Starting get ui')
        this.$store.dispatch('getUI', { data: '200', ip })
        // server.send('200', 8888, ip)
      }
    },
    mounted () {
      // EventBus.$on('Device-Discovered', (device, remoteIP) => {
      //   if (!this.deviceMacs.includes(device)) {
      //     this.deviceMacs.push(device)
      //     this.devices.push({deviceMac: device, deviceIP: remoteIP})
      //     console.log(remoteIP)
      //   }
      // })
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
