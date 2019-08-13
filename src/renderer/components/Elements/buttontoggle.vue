<template>
  <div>
    <h2>{{label}}</h2>
    <button class="btn btn-primary" @click="buttonClicked()">{{buttonLabel}}</button>
  </div>
</template>

<script>
  export default {
    name: 'buttontoggle',
    props: {
      displaySettings: String
    },
    data: function () {
      return {
        label: '',
        state: false,
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
        this.state = !this.state
      }
    },
    computed: {
      buttonLabel: function () {
        if (this.state) {
          return this.positiveLabel
        } else {
          return this.negativeLabel
        }
      }
    }
  }
</script>

<style>
</style>
