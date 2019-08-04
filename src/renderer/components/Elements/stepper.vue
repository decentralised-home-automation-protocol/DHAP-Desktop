<template>
  <div>
    <h2>stepper</h2>
    <p>{{number}}</p>
    <button @click="decrement()">-</button>
    <button @click="increment()">+</button>
  </div>
</template>

<script>
  export default {
    name: 'stepper',
    props: {
      values: ''
    },
    data: function () {
      return {
        number: 0
      }
    },
    methods: {
      increment () {
        this.number++
      },
      decrement () {
        this.number--
      }
    }
  }
</script>

<style>
</style>
