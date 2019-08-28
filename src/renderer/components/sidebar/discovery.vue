<template>
  <div id="discovery">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <select class="form-control" v-model="networkInterface" @change="getBroadcast($event)">
          <option v-for="netInter in interfaceNames" v-bind:key="netInter.id">{{netInter}}</option>
        </select>
      </div>
    </div>
    <input type="text" placeholder="Broadcast address" class="form-control" v-model="broadcastAddress">

    <div id= "discover">          
      <button type="button" class="btn btn-outline-light" @click="discovery()">Discover Devices</button>
      <button type="button" class="btn btn-outline-light" @click="debugDiscovery()">Debug</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'discovery',
    data () {
      return {
        interfaces: [],
        networkInterface: '',
        broadcastAddress: ''
      }
    },
    methods: {
      discovery () {
        this.$store.dispatch('startDiscovery')
      },
      debugDiscovery () {
        this.$store.dispatch('debugDiscovery')
      },
      getBroadcast (event) {
        this.broadcastAddress = this.calculateBroadcast(this.interfaces[event.target.value])
      },
      calculateBroadcast (networkInterface) {
        var ip = require('ip')

        for (var j = 0; j < networkInterface.length; j++) {
          var inter = networkInterface[j]
          if (inter.family === 'IPv4') {
            var subnet = ip.subnet(inter.address, inter.netmask)
            this.$store.dispatch('setBroadcastAddress', subnet.broadcastAddress)
            return subnet.broadcastAddress
          }
        }
      }
    },
    computed: {
      interfaceNames () {
        return Object.keys(this.interfaces)
      }
    },
    mounted: function () {
      var os = require('os')
      this.interfaces = os.networkInterfaces()
      var names = Object.keys(this.interfaces)

      for (var i = 0; i < names.length; i++) {
        var val = this.interfaces[names[i]]
        for (var j = 0; j < val.length; j++) {
          var inter = val[j]
          if (inter.family === 'IPv4' && !inter.internal) {
            this.networkInterface = names[i]
            this.broadcastAddress = this.calculateBroadcast(this.interfaces[this.networkInterface])
          }
        }
      }
    }
  }
</script>

<style>
#discovery {
  padding: 0px 10px 10px 10px;
}

#discover {
  text-align: center;
}
</style>
