<template>
  <div>
    <h2>rangeinput</h2>
    <input type="number" v-model="value">
    <input type="range" min="1" max="100" v-model="value">
    <button>Submit</button>
  </div>
</template>

<script>
  export default {
    name: 'rangeinput',
    props: {
      values: Object
    },
    data: function () {
      return {
        value: 12
      }
    }
  }
</script>

<style>
</style>
