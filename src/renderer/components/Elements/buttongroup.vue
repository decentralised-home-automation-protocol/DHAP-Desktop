<template>
  <div>
    <h2>{{label}}</h2>
    <div class="btn-group" role="group" aria-label="Basic example" >
      <button v-for="button in buttons" v-bind:key="button.id" type="button" class="btn btn-primary btn-lg">{{button}}</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'buttongroup',
    props: {
      displaySettings: String
    },
    data: function () {
      return {
        label: '',
        buttons: []
      }
    },
    mounted () {
      var dispSettings = this.displaySettings.split(',')
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
