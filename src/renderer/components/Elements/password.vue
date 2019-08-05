<template>
  <div>
    <h2>{{label}}</h2>
    <input type="password">
    <button>{{buttonLabel}}</button>
  </div>
</template>

<script>
  export default {
    name: 'password',
    props: {
      values: String
    },
    data: function () {
      return {
        label: '',
        buttonLabel: ''
      }
    },
    mounted () {
      var dispSettings = this.values.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }

      this.buttonLabel = dispSettings[1]
    }
  }
</script>

<style>
</style>
