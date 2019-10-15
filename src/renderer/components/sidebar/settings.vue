<template>
  <div id="settings">
    <div class="input-group mb-3">
      <button type="button" class="btn btn-outline-light" @click="resetState()">Reset All</button>
    </div>
    <div class="input-group mb-3">
      <span id="bIP">Current broadcast IP: <br>{{currentBroadcastAddress}}</span>
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <select class="form-control" v-model="networkInterface" @change="getBroadcast($event)">
          <option v-for="netInter in interfaceNames" v-bind:key="netInter.id">{{netInter}}</option>
        </select>
      </div>
    </div>
    <div class="input-group mb-3">
      <input type="text" placeholder="Broadcast address" class="form-control" v-model="broadcastAddress">
    </div>
    <div class="input-group mb-3">
      <button type="button" class="btn btn-outline-light" @click="setBroadcastAddress()">Set broadcast address</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'settings',
    data () {
      return {
        interfaces: [],
        networkInterface: '',
        broadcastAddress: ''
      }
    },
    computed: {
      interfaceNames () {
        return Object.keys(this.interfaces)
      },
      currentBroadcastAddress () {
        return this.$store.getters.currentBroadcastAddress
      }
    },
    methods: {
      resetState () {
        this.$store.dispatch('resetState')
      },
      setBroadcastAddress () {
        this.$store.dispatch('setBroadcastAddress', this.broadcastAddress)
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
            return subnet.broadcastAddress
          }
        }
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
#settings {
  padding: 10px;
}
#bIP {
  color: white;
}
</style>
