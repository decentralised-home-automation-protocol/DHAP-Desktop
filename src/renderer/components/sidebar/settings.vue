<template>
  <div id="settings">
    <button type="button" class="btn btn-outline-light" @click="resetState()">Reset</button>
    <button type="button" class="btn btn-outline-light" @click="debugDiscovery()">Add dummies</button>
  </div>
</template>

<script>
  export default {
    name: 'settings',
    methods: {
      resetState () {
        this.$store.dispatch('resetState')
      },
      debugDiscovery () {
        this.$store.dispatch('debugDiscovery')
      }
    }
  }
</script>

<style>
#settings {
  padding: 10px;
}
</style>
