<template>
  <div id="discovery">
    <span id="discoveryButton">
      <button type="button" class="btn btn-outline-light btn-block" :disabled="discoveryInProgress" @click="discovery()">Discover Devices</button>
      <button type="button" class="btn btn-outline-light btn-block" :disabled="discoveryInProgress" @click="refresh()">Refresh Devices</button>
    </span>
    <span id="discoveryInProgress">
      <spinner v-if="discoveryInProgress"></spinner>
    </span>
  </div>
</template>

<script>
  import spinner from './spinner'

  export default {
    name: 'discovery',
    components: {
      spinner
    },
    methods: {
      discovery () {
        this.$store.dispatch('startDiscovery')
      },
      refresh () {
        this.$store.dispatch('refreshCensusList')
      }
    },
    computed: {
      discoveryInProgress () {
        return this.$store.getters.discoveryInProgress()
      }
    }
  }
</script>

<style>
#discovery {
  padding: 10px;
}

#discoveryButton {
  display: table-cell;
  vertical-align: middle
}

#discoveryInProgress {
  padding-left: 10px;
  display: table-cell;
  vertical-align: middle
}
</style>
