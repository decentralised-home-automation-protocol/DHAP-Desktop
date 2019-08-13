<template>
  <div>
    <div class="input-group mb-3">
      <div class="input-group-prepend" v-if="label">
        <span class="input-group-text" id="basic-addon1">{{label}}</span>
      </div>
      <input class="form-control" type="password">
      <div class="input-group-append">
        <button class="btn btn-outline-primary">{{buttonLabel}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'password',
    props: {
      displaySettings: String
    },
    data: function () {
      return {
        label: '',
        buttonLabel: ''
      }
    },
    mounted () {
      var dispSettings = this.displaySettings.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }

      this.buttonLabel = dispSettings[1]
    }
  }
</script>

<style>
</style>
