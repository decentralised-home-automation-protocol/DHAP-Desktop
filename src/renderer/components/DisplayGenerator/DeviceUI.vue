<template>
  <div id="deviceUI">
    <component v-for="element in device.ui" :key="element.id" v-bind:is="element.type"
      v-bind:device="device" 
      v-bind:displaySettings="element.displaySettings" 
      v-bind:state="element.state" 
      v-bind:id="element.id">
    </component>
  </div>
</template>

<script>
  import switchtoggle from '../Elements/switchtoggle'
  import buttontoggle from '../Elements/buttontoggle'
  import stepper from '../Elements/stepper'
  import buttongroup from '../Elements/buttongroup'
  import directionalbuttons from '../Elements/directionalbuttons'
  import password from '../Elements/password'
  import progressElement from '../Elements/progressElement'
  import rangeinput from '../Elements/rangeinput'
  import scheduler from '../Elements/scheduler'
  import selection from '../Elements/selection'
  import status from '../Elements/status'
  import textinput from '../Elements/textinput'
  import VueGridLayout from 'vue-grid-layout'

  export default {
    name: 'DeviceUI',
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
      progressElement,
      scheduler,
      selection,
      status,
      textinput,
      GridItem: VueGridLayout.GridItem
    }
  }
</script>

<style>
#deviceUI {
  border-radius: 20px;
  border: 1px solid #9E9E9E;
  width: 100%;
  height: 100%;
  padding: 10px;
  text-align: center;
  background: #424242;
}
</style>
