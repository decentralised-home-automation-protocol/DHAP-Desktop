<template>
  <div class="element horizontalElement">
    <p id="label">{{label}}</p>
    <button class="btn btn-primary" @click="buttonClicked()">{{buttonLabel}}</button>
  </div>
</template>

<script>
  export default {
    name: 'buttontoggle',
    props: {
      device: Object,
      displaySettings: String,
      id: String,
      state: false
    },
    data: function () {
      return {
        label: '',
        positiveLabel: '',
        negativeLabel: ''
      }
    },
    mounted () {
      var dispSettings = this.displaySettings.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }
      this.positiveLabel = dispSettings[1]
      this.negativeLabel = dispSettings[2]
    },
    methods: {
      buttonClicked () {
        if (this.value) {
          this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: 'false'})
        } else {
          this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: 'true'})
        }
      }
    },
    computed: {
      buttonLabel: function () {
        if (this.value) {
          return this.positiveLabel
        } else {
          return this.negativeLabel
        }
      },
      value () {
        return this.state === 'true'
      }
    }
  }
</script>

<style>
</style>
