<template>
  <div>
    <h2>selection</h2>
    <select>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'selection',
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
