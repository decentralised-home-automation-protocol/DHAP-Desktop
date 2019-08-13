<template>
  <div>
    <div class="input-group mb-3">
      <div class="input-group-prepend" v-if="label">
        <span class="input-group-text" id="basic-addon1">{{label}}</span>
      </div>
      <input class="form-control" type="number" v-model="value">
      <div class="input-group-append">
        <button class="btn btn-outline-primary">{{buttonLabel}}</button>
      </div>
    </div>
    <input id="slider" type="range" :min="min" :max="max" v-model="value">
  </div>
</template>

<script>
  export default {
    name: 'rangeinput',
    props: {
      displaySettings: String
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
    }
  }
</script>

<style>
#slider {
  width: 100%;
}
</style>
