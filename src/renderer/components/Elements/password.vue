<template>
  <div>
    <h2>password</h2>
    <input type="password">
    <button>Submit</button>
  </div>
</template>

<script>
  export default {
    name: 'password',
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
