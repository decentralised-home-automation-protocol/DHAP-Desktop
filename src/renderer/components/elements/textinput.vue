<template>
  <div class="element">
    <div class="input-group mb-3 input-group-sm">
      <div class="input-group-prepend" v-if="label">
        <span class="input-group-text" id="inputGroup-sizing-sm">{{label}}</span>
      </div>
      <input class="form-control" type="text" v-model="value">
      <div class="input-group-append">
        <button v-if="synced" class="btn btn-outline-success" @click="submit()">{{buttonLabel}}</button>
        <button v-else class="btn btn-outline-danger" @click="submit()">{{buttonLabel}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'textinput',
    props: {
      device: Object,
      displaySettings: String,
      id: String,
      state: String
    },
    data: function () {
      return {
        label: '',
        buttonLabel: '',
        value: ''
      }
    },
    mounted () {
      var dispSettings = this.displaySettings.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }
      this.buttonLabel = dispSettings[1]
    },
    methods: {
      submit () {
        this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: this.value})
      }
    },
    watch: {
      state: function (val) {
        this.value = val
      }
    },
    computed: {
      synced () {
        if (this.state == null) {
          return false
        } else {
          return this.state === this.value
        }
      }
    }
  }
</script>

<style>
</style>
