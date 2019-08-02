<template>
  <div>
    <input type="text" v-model="xml"></input>
  </div>
</template>

<script>
  import { EventBus } from '../event-bus.js'

  export default {
    name: 'XmlParser',
    data: function () {
      return {
        xml: ''
      }
    },
    mounted () {
      EventBus.$on('New-Packet-Data', message => {
        console.log(`Emit Recieved ${message}`)
        this.xml = message
      })
    }
  }
</script>

<style>
</style>
