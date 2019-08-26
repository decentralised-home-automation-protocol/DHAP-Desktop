<template>
  <div class="element">
    <p id="label">{{label}}</p>
    <div class="btn-group" role="group" aria-label="Basic example" >
      <button v-for="(button,index) in buttons" v-bind:key="button.id" type="button" class="btn btn-primary" @click="clicked(index)">{{button}}</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'buttongroup',
    props: {
      device: Object,
      displaySettings: String,
      id: String,
      state: Number
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
    },
    methods: {
      clicked (index) {
        this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: index})
      }
    }
  }
</script>

<style>
</style>
