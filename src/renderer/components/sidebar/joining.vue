<template>
  <div id="joining">
          <button type="button" class="btn btn-outline-light" @click="scanWifi()">Scan Wifi</button>

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

    <div id="join">
      <span id="joinButton">
        <button type="button" class="btn btn-outline-light" :disabled="joiningInProgress" @click="joinDevice()">Join Device</button>
      </span>
      <span id="joiningInProgress">
        <spinner v-if="joiningInProgress"></spinner>
      </span>
    </div>
  </div>
</template>

<script>
  import spinner from './spinner'
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
    components: {
      spinner
    },
    methods: {
      joinDevice () {
        this.$store.dispatch('joinNewDevice', {homeSSID: this.homeSSID, homePassword: this.homePassword, iotSSID: this.iotSSID, iotPassword: this.iotPassword})
      },
      scanWifi () {
        this.$store.dispatch('scanNetwork')
      }
    },
    mounted: function () {
      this.$store.dispatch('scanNetwork')
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

#join {
  padding-top: 10px;
}

#joinButton {
  display: table-cell;
  vertical-align: middle
}

#joiningInProgress {
  padding-left: 30px;
  display: table-cell;
  vertical-align: middle
}
</style>
