<template>
  <div>
    <div id="Title" @click="clickHandler">
      <span id="Heading">{{heading}}</span>
      <span id="Toggle"><i v-if="isOpen" class="fas fa-angle-down"></i> <i v-else class="fas fa-angle-left"></i></span>
    </div>

    <div v-if="isOpen">
      <span v-if="component === 'Device'">
        <component v-for="device in devicesByRoom" :key="device.deviceMac" v-bind:is="component" :device="device"></component>
      </span>
      <span v-else>
        <component v-bind:is="component"></component>
      </span>
    </div>
  </div>
</template>

<script>
  import Joining from './Joining'
  import PacketSender from './PacketSender'
  import Device from './Device'

  export default {
    name: 'Dropdown',
    components: {
      PacketSender,
      Joining,
      Device
    },
    props: {
      heading: '',
      component: ''
    },
    data () {
      return {
        isOpen: false
      }
    },
    computed: {
      devicesByRoom () {
        return this.$store.getters.devicesByRoom(this.heading)
      }
    },
    methods: {
      clickHandler (event) {
        this.isOpen = !this.isOpen
      }
    }
  }
</script>

<style>
#Title {
  padding-top: 10px;
  padding-bottom: 10px;

  font-size: 1.1em;
  display: block;
  text-decoration: none;
  color: whitesmoke;
  border-top: 1px solid #616161;
}

#Title:hover {
  background: #616161;
}

#Heading {
  padding-left: 10px;
}

#Toggle {
  float: right;
  padding-right: 20px;
}
</style>
