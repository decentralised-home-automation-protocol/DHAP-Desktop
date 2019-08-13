<template>
  <div>
    <div id="room" @click="clickHandler">
      <span id="roomName">{{roomName}}</span>
      <span id="roomToggle"><i v-if="isOpen" class="fas fa-angle-down"></i> <i v-else class="fas fa-angle-left"></i></span>
    </div>
    <div v-if="isOpen">
      <Device v-for="device in devicesByRoom" :key="device.deviceMac" :device="device"></Device>
    </div>
  </div>
</template>

<script>
import Device from './Device'

export default {
  name: 'Room',
  components: {
    Device
  },
  props: {
    roomName: String
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    devicesByRoom () {
      return this.$store.getters.devicesByRoom(this.roomName)
    }
  },
  methods: {
    clickHandler (event) {
      this.isOpen = !this.isOpen
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

#room {
  padding-top: 10px;
  padding-bottom: 10px;

  font-size: 1.1em;
  display: block;
  text-decoration: none;
  color: whitesmoke;
  border-top: 1px solid #616161;
}

#room:hover {
  background: #616161;
}

#roomName {
  padding-left: 10px;
}

#roomToggle {
  float: right;
  padding-right: 20px;
}
</style>