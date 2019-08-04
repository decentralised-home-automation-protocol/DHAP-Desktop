<template>
  <div>
    <div v-for="(element, index) in xmlElements" :key="element.id">
      <component v-bind:is="element" v-bind:values="elementDisplaySettings[index]"></component>
    </div>
  </div>
</template>

<script>
  import { EventBus } from '../event-bus.js'
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

  export default {
    name: 'DisplayGenerator',
    components: { switchtoggle, buttontoggle, stepper, rangeinput, buttongroup, directionalbuttons, password, progressElement, scheduler, selection, status, textinput },
    data: function () {
      return {
        xmlElements: [],
        elementDisplaySettings: []
      }
    },
    mounted () {
      EventBus.$on('New-XML-Elements', (elemets, dispSettings) => {
        this.xmlElements = elemets
        this.elementDisplaySettings = dispSettings
      })
    }
  }
</script>

<style>
</style>
