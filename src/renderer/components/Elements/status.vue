<template>
  <div>
    <h2>{{label}}</h2>  
    <h2>{{value}}</h2>  
  </div>
</template>

<script>
  export default {
    name: 'status',
    props: {
      device: Object,
      displaySettings: String,
      id: String,
      state: false
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
        return this.state
      }
    }
  }
</script>

<style>
</style>
