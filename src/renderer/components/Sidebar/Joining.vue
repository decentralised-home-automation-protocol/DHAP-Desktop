<template>
  <div>
    <button type="button" class="btn btn-outline-light" @click="scanWifi()">Scan Wifi</button>
    <h2>Home Network</h2>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <select class="form-control" v-model="homeSSID">
          <option v-for="ap in localNetworks" v-bind:key="ap.ssid">{{ap.ssid}}</option>
        </select>
      </div>
    </div>
    <input type="password" placeholder="Password" class="form-control" v-model="homePassword">

    <h2>IoT Device</h2>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <select class="form-control" v-model="iotSSID">
          <option v-for="ap in localNetworks" v-bind:key="ap.ssid">{{ap.ssid}}</option>
        </select>
      </div>
    </div>
    <input type="password" placeholder="Password" class="form-control" v-model="iotPassword">

    <button type="button" class="btn btn-outline-light" @click="joinDevice()">Join Device</button>
  </div>
</template>

<script>
  export default {
    name: 'Joining',
    data () {
      return {
        homeSSID: 'TP-LINK_AE045A',
        homePassword: '0358721743',
        iotSSID: 'ESPsoftAP_01',
        iotPassword: 'passforap'
      }
    },
    methods: {
      joinDevice () {
        this.$store.dispatch('joinNewDevice', {homeSSID: this.homeSSID, homePassword: this.homePassword, iotSSID: this.iotSSID, iotPassword: this.iotPassword})
      },
      scanWifi () {
        this.$store.dispatch('scanNetwork')
      }
    },
    computed: {
      localNetworks () {
        var networks = this.$store.getters.getNetworks(this)
        return networks.filter(function (value, index, arr) {
          return value.ssid !== ''
        })
      }
    }
  }
</script>

<style>
</style>
