<template>
  <div>
    <input type="text" v-model="xml">
    <div v-for="elements in xmlElements" :key="elements.id">
      <component v-bind:is="elements"></component>
    </div>
  </div>
</template>

<script>
  import { EventBus } from '../event-bus.js'
  import switchtoggle from '../Elements/switchtoggle'

  export default {
    name: 'XmlParser',
    components: { switchtoggle },
    data: function () {
      return {
        xml: '',
        xmlElements: ['switchtoggle', 'switchtoggle']
      }
    },
    mounted () {
      EventBus.$on('New-Packet-Data', message => {
        console.log(`Emit Recieved ${message}`)
        this.xml = message.toString().substr(4)
      })
    }
  }

  var parseString = require('xml2js').parseString
  var xml = '<?xml version="1.0" encoding="UTF-8"?><device><group id="0" permission="RR"><name>TV</name><room>Living Room</room></group><group id="1" permission="WR" frame="false" orientation="horizontal"><gui_element id="1"><type>switchtoggle</type><disp_settings>On/Off</disp_settings><status_location>1</status_location><comment>Turn TV On or Off</comment></gui_element></group></device>'
  parseString(xml, function (err, result) {
    if (err) {
      console.dir(err)
    } else {
      console.dir(result)
    }
  })
</script>

<style>
</style>
