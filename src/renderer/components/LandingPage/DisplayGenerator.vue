<template>
  <div>
    <grid-layout
      :layout.sync="layout"
      :row-height="30"
      :colNum="25"
    >

    <div v-for="device in devices" :key="device.id">
      <div v-if="device.active && layoutById(device.id)">
        <grid-item :x="layoutById(device.id).x" :y="layoutById(device.id).y" :w="layoutById(device.id).w" :h="layoutById(device.id).h" :i="layoutById(device.id).i">
          <DeviceUI v-bind:device="device" v-bind:layout="layoutById(device.id)"></DeviceUI>
        </grid-item>
      </div>
    </div>

    </grid-layout>
  </div>
</template>

<script>
  import DeviceUI from './DeviceUI'
  import VueGridLayout from 'vue-grid-layout'
  import { mapGetters } from 'vuex'

  export default {
    name: 'DisplayGenerator',
    components: {
      DeviceUI,
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem
    },
    computed: {
      ...mapGetters([
        'layoutById'
      ]),
      devices () {
        return this.$store.state.devices
      },
      layout () {
        return this.$store.state.layout
      }
    }
  }
</script>

<style>
</style>
