<template>
  <div>
    <h2>{{label}}</h2>
    <div v-for="button in buttons" v-bind:key="button.id">
      <button>{{button}}</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'buttongroup',
    props: {
      values: String
    },
    data: function () {
      return {
        label: '',
        buttons: []
      }
    },
    mounted () {
      var dispSettings = this.values.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }

      for (var i = 1; i < dispSettings.length; i++) {
        this.buttons.push(dispSettings[i])
      }
    }
  }
</script>

<style>
</style>
