<template>
  <div>
    <h2>textinput</h2>
    <input type="text">
    <button>Submit</button>
  </div>
</template>

<script>
  export default {
    name: 'textinput',
    props: {
      values: Object
    },
    data: function () {
      return {
        state: ''
      }
    }
  }
</script>

<style>
</style>
