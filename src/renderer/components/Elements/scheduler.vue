<template>
  <div>
    <h2>{{label}}</h2>
    <select>
      <option v-for="option in options" :key="option">{{option}}</option>
    </select>
    <button class="btn btn-primary">{{time}}</button>
    <button class="btn btn-primary">{{buttonLabel}}</button>
  </div>
</template>

<script>
  export default {
    name: 'scheduler',
    props: {
      device: Object,
      displaySettings: String,
      id: String,
      state: String
    },
    data: function () {
      return {
        label: '',
        buttonLabel: '',
        options: [],
        time: '12:00AM'
      }
    },
    mounted () {
      var dispSettings = this.displaySettings.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }
      this.buttonLabel = dispSettings[1]
      for (var i = 2; i < dispSettings.length; i++) {
        this.options.push(dispSettings[i])
      }
    }
  }
</script>

<style>
</style>
