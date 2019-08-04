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
      values: ''
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
