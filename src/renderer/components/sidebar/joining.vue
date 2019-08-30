<template>
  <div id="joining">
    <p>Home Network</p>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <select class="form-control" v-model="homeSSID">
          <option v-for="ap in localNetworks" v-bind:key="ap.ssid">{{ap.ssid}}</option>
        </select>
      </div>
    </div>
    <input type="password" placeholder="Password" class="form-control" v-model="homePassword">

    <p>IoT Device</p>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <select class="form-control" v-model="iotSSID">
          <option v-for="ap in localNetworks" v-bind:key="ap.ssid">{{ap.ssid}}</option>
        </select>
      </div>
    </div>
    <input type="password" placeholder="Password" class="form-control" v-model="iotPassword">

    <div id="buttons">
      <button type="button" class="btn btn-outline-light" :disabled="joiningInProgress" @click="joinDevice()">Join Device</button>
      <button type="button" class="btn btn-outline-light" @click="scanWifi()">Scan Wifi</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'joining',
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
      },
      joiningInProgress () {
        return this.$store.getters.joiningInProgress()
      }
    }
  }
</script>

<style>
#joining {
  padding: 0px 10px 10px 10px;
}

#joining p {
  margin: 0px;
  font-size: 1.3em
}

#buttons {
  padding-top: 10px;
}
</style>
