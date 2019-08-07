<template>
  <div>
    <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
      <div v-for="(ui, uiIndex) in xmlElements" :key="ui.id">
        <div class="card bg-dark">
          <div class="card-body">
            <component v-for="(element, index) in ui" :key="element.id" v-bind:is="element" v-bind:values="elementDisplaySettings[uiIndex][index]"></component>
          </div>
        </div>
      </div>  
    </draggable>
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
  import draggable from 'vuedraggable'

  export default {
    name: 'DisplayGenerator',
    components: { switchtoggle, buttontoggle, stepper, rangeinput, buttongroup, directionalbuttons, password, progressElement, scheduler, selection, status, textinput, draggable },
    data: function () {
      return {
        xmlElements: [],
        elementDisplaySettings: []
      }
    },
    mounted () {
      EventBus.$on('New-XML-Elements', (elements, dispSettings) => {
        this.xmlElements.push(elements)
        this.elementDisplaySettings.push(dispSettings)
      })
    }
  }
</script>

<style>
</style>
