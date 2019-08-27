<template>
  <div id="joining">
    <h3>Home Network</h3>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <select class="form-control" v-model="homeSSID">
          <option v-for="ap in localNetworks" v-bind:key="ap.ssid">{{ap.ssid}}</option>
        </select>
      </div>
    </div>
    <input type="password" placeholder="Password" class="form-control" v-model="homePassword">

    <h3>IoT Device</h3>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <select class="form-control" v-model="iotSSID">
          <option v-for="ap in localNetworks" v-bind:key="ap.ssid">{{ap.ssid}}</option>
        </select>
      </div>
    </div>
    <input type="password" placeholder="Password" class="form-control" v-model="iotPassword">

    <div id="buttons">
      <button type="button" class="btn btn-outline-light" @click="joinDevice()">Join Device</button>
      <button type="button" class="btn btn-outline-light" @click="scanWifi()">Scan Wifi</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Joining',
    data () {
      return {
        homeSSID: '',
        homePassword: '',
        iotSSID: '',
        iotPassword: ''
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
#joining {
  padding: 0px 10px 10px 10px;
}

#buttons {
  padding-top: 10px;
}
</style>
