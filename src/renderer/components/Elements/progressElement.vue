<template>
  <div>
    <h2>{{label}}</h2>
    <progress value="35" max="100"></progress>
  </div>
</template>

<script>
  export default {
    name: 'progressElement',
    props: {
      values: String
    },
    data: function () {
      return {
        label: ''
      }
    },
    mounted () {
      var dispSettings = this.values.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }
    }
  }
</script>

<style>
</style>
