<template>
  <div id="device">
    <span id="deviceTrash">
      <button type="button" class="btn btn-outline-danger" @click="removeDevice(device)">
        <i class="fas fa-trash-alt"></i>
      </button>
    </span>
    <span id="deviceName">
      <span id="deviceName2" v-if="device.name">{{device.name}}</span>
      <span id="deviceName2" v-else>{{device.remoteIP}}</span>
    </span>
    <span id="deviceToggle" v-if="device.statusBit" >
      <button v-if="device.active" type="button" class="btn btn-outline-danger" @click="deactivate(device.id)">
        <i class="fas fa-times"></i>
      </button>
      <button v-else type="button" class="btn btn-outline-success" @click="getUI(device.remoteIP, device.id)">
        <i class="fas fa-chevron-right"></i>
      </button>
    </span>
    <span id="deviceToggle" v-else>
      <button type="button" class="btn btn-outline-warning">
        <i class="fas fa-exclamation-triangle"></i>
      </button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'device',
  props: {
    device: Object
  },
  methods: {
    getUI (ip, mac) {
      this.$store.dispatch('getUI', { data: '200', ip })
    },
    deactivate (id) {
      this.$store.dispatch('deactivateDevice', id)
    },
    removeDevice (device) {
      this.$store.dispatch('removeDevice', device)
    }
  }
}
</script>

<style>
#device {
  padding: 10px 0px 10px 0px;
  display: flex;
  color: whitesmoke;
  justify-content: space-between;
}
#device:hover {
  background: #363636;
}

#deviceName {
  display: flex;
}

#deviceName2 {
  margin: auto; /* Important */ 
  text-align: center; 
}
</style>