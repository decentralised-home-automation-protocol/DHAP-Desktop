<template>
  <div class="element">
    <div class="input-group mb-3 input-group-sm">
      <div class="input-group-prepend" v-if="label">
        <span class="input-group-text" id="inputGroup-sizing-sm">{{label}}</span>
      </div>
      <p class="form-control">{{value}}</p>
      <div class="input-group-append">
        <button class="btn btn-outline-primary" @click="decrement()">-</button>
        <button class="btn btn-outline-primary" @click="increment()">+</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'stepper',
    props: {
      device: Object,
      displaySettings: String,
      id: String,
      state: 0
    },
    data: function () {
      return {
        label: '',
        max: 100,
        min: 0
      }
    },
    methods: {
      increment () {
        console.log(this.value)
        if (this.value < this.max) {
          this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: this.value + 1})
        }
      },
      decrement () {
        console.log(this.value)
        if (this.value > this.min) {
          this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: this.value - 1})
        }
      }
    },
    mounted () {
      var dispSettings = this.displaySettings.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }
      this.min = dispSettings[1]
      this.max = dispSettings[2]
    },
    computed: {
      value () {
        if (isNaN(this.state) || this.state == null) {
          return 0
        } else {
          return parseInt(this.state)
        }
      }
    }
  }
</script>

<style>
</style>
