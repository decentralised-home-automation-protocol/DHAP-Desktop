<template>
  <div>
    <h2>{{label}}</h2>
    <input type="text">
    <button>{{buttonLabel}}</button>
  </div>
</template>

<script>
  export default {
    name: 'textinput',
    props: {
      values: String
    },
    data: function () {
      return {
        label: '',
        buttonLabel: ''
      }
    },
    mounted () {
      var dispSettings = this.values.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }
      this.buttonLabel = dispSettings[1]
    }
  }
</script>

<style>
</style>
