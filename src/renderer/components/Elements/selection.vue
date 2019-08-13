<template>
  <div>
    <h2>{{label}}</h2>
    <select @change="onChange($event)">
      <option v-for="(option, index) in options" :key="option" :value="index" :selected="isSelected(index)">{{option}}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'selection',
    props: {
      device: Object,
      displaySettings: String,
      id: String,
      state: Number
    },
    data: function () {
      return {
        label: '',
        options: []
      }
    },
    mounted () {
      var dispSettings = this.displaySettings.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }

      for (var i = 1; i < dispSettings.length; i++) {
        this.options.push(dispSettings[i])
      }
    },
    methods: {
      isSelected (index) {
        return index === this.selected
      },
      onChange (event) {
        this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: parseInt(event.target.value)})
      }
    },
    computed: {
      selected () {
        if (isNaN(this.state) || this.state == null) {
          return 0
        } else {
          return parseInt(this.state)
        }
      }
    }
  }
</script>

<style>
</style>
