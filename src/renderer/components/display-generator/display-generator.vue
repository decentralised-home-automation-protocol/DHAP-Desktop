<template>
  <div id="content">
    <grid-layout
      :layout.sync="layout"
      :row-height="15"
      :colNum="50"
    >
      <div v-for="device in devices" :key="device.id">
        <div v-if="device.active && layoutById(device.id)">
          <grid-item :x="layoutById(device.id).x" :y="layoutById(device.id).y" :w="layoutById(device.id).w" 
                    :h="layoutById(device.id).h" :i="layoutById(device.id).i" :static="layoutById(device.id).static"
                    :minH="device.ui.length * 2 + 6" :minW="10" 
                    :is-draggable="!layoutById(device.id).static" :is-resizable="!layoutById(device.id).static" :dragIgnoreFrom="dragIgnore">
            <deviceUI v-bind:device="device" v-bind:layout="layoutById(device.id)"></deviceUI>
          </grid-item>
        </div>
      </div>
    </grid-layout>
  </div>
</template>

<script>
  import deviceUI from './device-ui'
  import VueGridLayout from 'vue-grid-layout'
  import { mapGetters } from 'vuex'

  export default {
    name: 'display-generator',
    components: {
      deviceUI,
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem
    },
    data: function () {
      return {
        dragIgnore: 'a, button, input'
      }
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
#content {
  width: 100%;
}

.element {
  min-width: 50px;
  min-height: 30px;
  padding: 5px;
}

.horizontalElement {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

#label {
  margin: 0;
}
</style>
