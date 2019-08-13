<template>
  <div>
    <button class="btn btn-primary" @click="pressed(0)">{{topLabel}}</button>
    <button class="btn btn-primary" @click="pressed(1)">{{rightLabel}}</button>
    <button class="btn btn-primary" @click="pressed(2)">{{bottomLabel}}</button>
    <button class="btn btn-primary" @click="pressed(3)">{{leftLabel}}</button>
    <button class="btn btn-primary" @click="pressed(4)" v-if="centreLabel">{{centreLabel}}</button>
    <h2>{{label}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'directionalbuttons',
    props: {
      device: Object,
      displaySettings: String,
      id: String,
      state: Number
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
    },
    methods: {
      pressed (buttonNum) {
        this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: buttonNum})
      }
    }
  }
</script>

<style>
</style>
