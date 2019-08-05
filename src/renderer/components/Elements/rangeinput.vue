<template>
  <div>
    <h2>{{label}}</h2>
    <input type="number" v-model="value">
    <input type="range" :min="min" :max="max" v-model="value">
    <button>{{buttonLabel}}</button>
  </div>
</template>

<script>
  export default {
    name: 'rangeinput',
    props: {
      values: String
    },
    data: function () {
      return {
        label: '',
        buttonLabel: '',
        min: 0,
        max: 100,
        value: 0
      }
    },
    mounted () {
      var dispSettings = this.values.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }
      this.buttonLabel = dispSettings[1]
      this.min = dispSettings[2]
      this.max = dispSettings[3]
    }
  }
</script>

<style>
</style>
