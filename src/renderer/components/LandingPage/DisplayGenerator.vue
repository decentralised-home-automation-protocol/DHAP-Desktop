<template>
  <div>
    <grid-layout
      :layout.sync="layout"
      :row-height="30"
      :colNum="25"
    >

    <grid-item v-for="(item, uiIndex) in layout"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="item.i"
                :key="item.i" style="border: 1px solid red;">
          <component v-for="(element, index) in xmlElements[uiIndex]" :key="element.id" v-bind:is="element" v-bind:values="elementDisplaySettings[uiIndex][index]"></component>
    </grid-item>
    </grid-layout>
  </div>
</template>

<script>
  // import { EventBus } from '../event-bus.js'
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
    data: function () {
      return {
        xmlElements: [],
        elementDisplaySettings: [],
        layout: []
      }
    },
    mounted () {
      // EventBus.$on('New-XML-Elements', (elements, dispSettings) => {
      //   this.xmlElements.push(elements)
      //   this.elementDisplaySettings.push(dispSettings)
      //   this.layout.push({'x': 0, 'y': 0, 'w': 5, 'h': 22, 'i': this.layout.length})
      // })
    }
  }
</script>

<style>
#devUI {
  width: 500px;
}
</style>
