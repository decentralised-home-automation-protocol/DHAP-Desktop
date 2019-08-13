<template>
  <div>
    <button class="btn btn-primary">{{topLabel}}</button>
    <button class="btn btn-primary">{{rightLabel}}</button>
    <button class="btn btn-primary">{{bottomLabel}}</button>
    <button class="btn btn-primary">{{leftLabel}}</button>
    <button class="btn btn-primary" v-if="centreLabel">{{centreLabel}}</button>
    <h2>{{label}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'directionalbuttons',
    props: {
      displaySettings: String
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
      var dispSettings = this.displaySettings.split(',')
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
