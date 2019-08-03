<template>
  <div>
    <h2>title</h2>
    <button>buttontoggle</button>
  </div>
</template>

<script>
  export default {
    name: 'buttontoggle',
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
