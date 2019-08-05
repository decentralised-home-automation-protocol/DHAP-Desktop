<template>
  <div>
    <h2>{{label}}</h2>
    <p>{{value}}</p>
    <button @click="decrement()">-</button>
    <button @click="increment()">+</button>
  </div>
</template>

<script>
  export default {
    name: 'stepper',
    props: {
      values: String
    },
    data: function () {
      return {
        label: '',
        value: 0,
        max: 100,
        min: 0
      }
    },
    methods: {
      increment () {
        if (this.value < this.max) {
          this.value++
        }
      },
      decrement () {
        if (this.value > this.min) {
          this.value--
        }
      }
    },
    mounted () {
      var dispSettings = this.values.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }
      this.min = dispSettings[1]
      this.max = dispSettings[2]
    }
  }
</script>

<style>
</style>
