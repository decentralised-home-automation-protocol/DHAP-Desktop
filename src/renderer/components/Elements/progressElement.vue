<template>
  <div>
    <h2>{{label}}</h2>
    <progress :value="value" max="100"></progress>
  </div>
</template>

<script>
  export default {
    name: 'progressElement',
    props: {
      device: Object,
      displaySettings: String,
      id: String,
      state: Number
    },
    data: function () {
      return {
        label: ''
      }
    },
    mounted () {
      var dispSettings = this.displaySettings.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }
    },
    computed: {
      value () {
        return this.state === 'true'
      }
    }
  }
</script>

<style>
</style>
