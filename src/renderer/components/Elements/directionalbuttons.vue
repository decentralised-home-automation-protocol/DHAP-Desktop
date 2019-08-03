<template>
  <div>
    <button>N</button>
    <button>S</button>
    <button>E</button>
    <button>W</button>
    <h2>directionalbuttons</h2>
  </div>
</template>

<script>
  export default {
    name: 'directionalbuttons',
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
