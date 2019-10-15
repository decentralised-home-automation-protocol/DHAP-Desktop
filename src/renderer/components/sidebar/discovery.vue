<template>
  <div id="discovery">
    <div id="discoveryStart">
      <span id="discoveryButton">
      <button type="button" class="btn btn-outline-light" :disabled="discoveryInProgress" @click="discovery()">Discover Devices</button>
      </span>
      <span id="discoveryInProgress">
        <spinner v-if="discoveryInProgress"></spinner>
      </span>
    </div>
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

#discoveryStart {
  padding-top: 10px;
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
