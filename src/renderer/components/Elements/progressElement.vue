<template>
  <div>
    <h2>progress</h2>
    <progress value="22" max="100"></progress>
  </div>
</template>

<script>
  export default {
    name: 'progressElement',
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
