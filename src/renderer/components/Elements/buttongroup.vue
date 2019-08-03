<template>
  <div>
    <h2>buttongroup</h2>
    <div v-for="button in buttons" v-bind:key="button.id">
      <button>{{button}}</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'buttongroup',
    props: {
      values: Object
    },
    data: function () {
      return {
        buttons: [1, 2, 3]
      }
    }
  }
</script>

<style>
</style>
