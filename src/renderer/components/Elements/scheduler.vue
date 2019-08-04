<template>
  <div>
    <h2>scheduler</h2>
    <select>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
    <button>12:00AM</button>
    <button>Submit</button>
  </div>
</template>

<script>
  export default {
    name: 'scheduler',
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
