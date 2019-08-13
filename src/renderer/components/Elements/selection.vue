<template>
  <div>
    <h2>{{label}}</h2>
    <select>
      <option v-for="option in options" :key="option">{{option}}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'selection',
    props: {
      displaySettings: String
    },
    data: function () {
      return {
        label: '',
        options: []
      }
    },
    mounted () {
      var dispSettings = this.displaySettings.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }

      for (var i = 1; i < dispSettings.length; i++) {
        this.options.push(dispSettings[i])
      }
    }
  }
</script>

<style>
</style>
