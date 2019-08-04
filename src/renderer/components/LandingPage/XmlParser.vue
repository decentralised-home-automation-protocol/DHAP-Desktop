<template>
  <div>
    <input type="text" v-model="xml">
    <div v-for="elements in xmlElements" :key="elements.id">
      <component v-bind:is="elements" v-bind:values="props"></component>
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

  export default {
    name: 'XmlParser',
    components: { switchtoggle, buttontoggle, stepper, rangeinput, buttongroup, directionalbuttons, password, progressElement, scheduler, selection, status, textinput },
    data: function () {
      return {
        // xmlElements: ['switchtoggle', 'buttontoggle', 'stepper', 'rangeinput', 'buttongroup', 'directionalbuttons', 'password', 'progressElement', 'scheduler', 'selection', 'status', 'textinput'],
        xmlElements: [],
        elementDisplaySettings: [],
        props: {
          argument: 'prop1'
        }
      }
    },
    mounted () {
      EventBus.$on('New-UI-XML', message => {
        parseXML(message.toString().substr(4))
      })
      EventBus.$on('New-XML-Elements', (elemets, dispSettings) => {
        this.xmlElements = elemets
        this.elementDisplaySettings = dispSettings
      })
    }
  }

  function parseXML (xml) {
    var parseString = require('xml2js').parseString
    parseString(xml, function (err, result) {
      if (err) {
        console.dir(err)
      } else {
        getXMLElements(result)
      }
    })
  }

  function getXMLElements (xml) {
    var elements = []
    var displaySettings = []

    for (var groupNum = 1; groupNum < xml.device.group.length; groupNum++) {
      var group = xml.device.group[groupNum]
      for (var elementNum = 0; elementNum < group.gui_element.length; elementNum++) {
        var element = group.gui_element[elementNum]
        elements.push(element.type[0].toString())
        displaySettings.push(element.disp_settings[0].toString())
      }
    }
    EventBus.$emit('New-XML-Elements', elements, displaySettings)
  }
</script>

<style>
</style>
