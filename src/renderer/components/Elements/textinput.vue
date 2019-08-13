<template>
  <div>
    <div class="input-group mb-3">
      <div class="input-group-prepend" v-if="label">
        <span class="input-group-text" id="basic-addon1">{{label}}</span>
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
    computed: {
      currentValue () {
        return this.state
      },
      synced () {
        return this.currentValue === this.value
      }
    }
  }
</script>

<style>
</style>
