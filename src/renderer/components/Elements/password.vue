<template>
  <div>
    <div class="input-group mb-3">
      <div class="input-group-prepend" v-if="label">
        <span class="input-group-text" id="basic-addon1">{{label}}</span>
      </div>
      <input class="form-control" type="password" v-model="value">
      <div class="input-group-append">
        <button class="btn btn-outline-primary" @click="clicked()">{{buttonLabel}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'password',
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
      clicked () {
        this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: this.value})
      }
    }
  }
</script>

<style>
</style>
