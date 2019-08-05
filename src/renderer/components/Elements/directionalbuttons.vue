<template>
  <div>
    <button>{{topLabel}}</button>
    <button>{{rightLabel}}</button>
    <button>{{bottomLabel}}</button>
    <button>{{leftLabel}}</button>
    <button>{{centreLabel}}</button>
    <h2>{{label}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'directionalbuttons',
    props: {
      values: String
    },
    data: function () {
      return {
        label: '',
        topLabel: '',
        rightLabel: '',
        bottomLabel: '',
        leftLabel: '',
        centreLabel: ''
      }
    },
    mounted () {
      var dispSettings = this.values.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }
      this.topLabel = dispSettings[1]
      this.rightLabel = dispSettings[2]
      this.bottomLabel = dispSettings[3]
      this.leftLabel = dispSettings[4]
      this.centreLabel = dispSettings[5]
    }
  }
</script>

<style>
</style>
