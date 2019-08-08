<template>
  <div>
    <grid-layout
      :layout.sync="layout"
      :row-height="30"
      :colNum="25"
    >

    <div v-for="(device, index) in devices" :key="device.id" >
      <div v-if="device.active">
        <grid-item :x="layout[index].x" :y="layout[index].y" :w="layout[index].w" :h="layout[index].h" :i="layout[index].i" style="border: 1px solid red;">
          <component v-for="element in device.ui" :key="element.id" v-bind:is="element.type" v-bind:values="element.displaySettings"></component>
        </grid-item>
      </div>
    </div>
    </grid-layout>
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
  import '../XmlParser'
  import VueGridLayout from 'vue-grid-layout'

  export default {
    name: 'DisplayGenerator',
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
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem
    },
    computed: {
      devices () {
        return this.$store.state.devices
      },
      layout () {
        return this.$store.state.layout
      }
    }
  }
</script>

<style>
#devUI {
  width: 500px;
}
</style>
