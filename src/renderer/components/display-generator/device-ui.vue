<template>
  <div id="window">
    <div id="header">
      <button id="lock" type="button" class="btn btn-outline-light" @click="toggleLock(device.id)">
        <i v-if="isDeviceStatic(device.id)" class="fas fa-lock"></i>
        <i v-else class="fas fa-lock-open"></i>
      </button>
      <p id="DeviceName">{{device.name}}</p>
      <button id="close" type="button" class="btn btn-outline-danger" @click="deactivate(device.id)">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div id="deviceUI">
      <component v-for="element in device.ui" :key="element.id" v-bind:is="element.type"
        v-bind:device="device" 
        v-bind:displaySettings="element.displaySettings" 
        v-bind:state="element.state" 
        v-bind:id="element.id">
      </component>
    </div>
  </div>
</template>

<script>
  import switchtoggle from '../Elements/switchtoggle'
  import buttontoggle from '../Elements/buttontoggle'
  import stepper from '../Elements/stepper'
  import buttongroup from '../Elements/buttongroup'
  import directionalbuttons from '../Elements/directionalbuttons'
  import password from '../Elements/password'
  import progresselement from '../Elements/progresselement'
  import rangeinput from '../Elements/rangeinput'
  import scheduler from '../Elements/scheduler'
  import selection from '../Elements/selection'
  import status from '../Elements/status'
  import textinput from '../Elements/textinput'
  import VueGridLayout from 'vue-grid-layout'
  import { mapGetters } from 'vuex'

  export default {
    name: 'device-ui',
    props: {
      device: Object,
      layout: Object
    },
    components: {
      switchtoggle,
      buttontoggle,
      stepper,
      rangeinput,
      buttongroup,
      directionalbuttons,
      password,
      progresselement,
      scheduler,
      selection,
      status,
      textinput,
      GridItem: VueGridLayout.GridItem
    },
    methods: {
      deactivate (id) {
        this.$store.dispatch('deactivateDevice', id)
      },
      toggleLock (id) {
        this.$store.dispatch('toggleDeviceLock', id)
      }
    },
    computed: {
      ...mapGetters([
        'isDeviceStatic'
      ])
    }
  }
</script>

<style>
#window {
  border: 1px solid #9E9E9E;  
  background: #424242;
  width: 100%;
  height: 100%;
}

#header {
  border-bottom: 1px solid #9E9E9E;  
  background: #363636;
  display: flex;
  justify-content: space-between;
}

#DeviceName {
  font-size: 1.3em;
  text-decoration: none;
  color: whitesmoke;
  margin: 0px;
}

#deviceUI {
  border-radius: 2px;
  padding: 0px 10px 10px 10px;
  text-align: center;
}
</style>
