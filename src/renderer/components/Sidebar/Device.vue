<template>
<div id="device">
    <span id="deviceName">
      <span v-if="device.name">{{device.name}}</span>
      <span v-else>{{device.remoteIP}}</span>
    </span>
  <span id="deviceToggle">
    <button v-if="device.active" type="button" class="btn btn-outline-danger" @click="deactivate(device.id)">
      <i class="fas fa-times"></i>
    </button>
    <button v-else type="button" class="btn btn-outline-success" @click="getUI(device.remoteIP, device.id)">
      <i class="fas fa-chevron-right"></i>
    </button>
  </span>
</div>
</template>

<script>
export default {
  name: 'Device',
  props: {
    device: Object
  },
  methods: {
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
#device {
  padding-top: 15px;
  padding-bottom: 15px;
  color: whitesmoke;
  margin-right: 0px;
}
#device:hover {
  background: #363636;
}

#deviceName {
  padding-left: 30px;
}

#deviceToggle {
  padding-right: 10px;
  float: right;
  height: 100%;
}
</style>