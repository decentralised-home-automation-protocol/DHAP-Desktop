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
      displaySettings: String
    },
    data: function () {
      return {
        label: '',
        value: ''
      }
    },
    mounted () {
      var dispSettings = this.displaySettings.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }
    }
  }
</script>

<style>
</style>
