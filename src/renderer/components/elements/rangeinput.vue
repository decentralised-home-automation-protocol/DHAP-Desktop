<template>
  <div class="element">
    <div class="input-group mb-3 input-group-sm">
      <div class="input-group-prepend" v-if="label">
        <span class="input-group-text" id="inputGroup-sizing-sm">{{label}}</span>
      </div>
      <input class="form-control" type="number" v-model="value">
      <div class="input-group-append">
        <button v-if="synced" class="btn btn-outline-success" @click="submit()">{{buttonLabel}}</button>
        <button v-else class="btn btn-outline-danger" @click="submit()">{{buttonLabel}}</button>
      </div>
    </div>
    <input id="slider" type="range" :min="min" :max="max" v-model="value">
  </div>
</template>

<script>
  export default {
    name: 'rangeinput',
    props: {
      device: Object,
      displaySettings: String,
      id: String,
      state: 0
    },
    data: function () {
      return {
        label: '',
        buttonLabel: '',
        min: 0,
        max: 100,
        value: 0
      }
    },
    mounted () {
      var dispSettings = this.displaySettings.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }
      this.buttonLabel = dispSettings[1]
      this.min = dispSettings[2]
      this.value = dispSettings[2]
      this.max = dispSettings[3]
    },
    methods: {
      submit () {
        this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: this.value})
      }
    },
    computed: {
      currentValue () {
        if (isNaN(this.state) || this.state == null) {
          return 0
        } else {
          return parseInt(this.state)
        }
      },
      synced () {
        return this.currentValue === parseInt(this.value)
      }
    }
  }
</script>

<style>
#slider {
  width: 100%;
}
</style>
