<template>
  <div class="element scheduler">
    <p id="label">{{label}}</p>
    <select @change="onChange($event)">
      <option v-for="(option, index) in options" :key="option" :value="index" :selected="isSelected(index)">{{option}}</option>
    </select>
    <button class="btn btn-primary btn-sm">{{time}}</button>
    <button class="btn btn-primary btn-sm">{{buttonLabel}}</button>
  </div>
</template>

<script>
  export default {
    name: 'scheduler',
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
        options: []
      }
    },
    mounted () {
      var dispSettings = this.displaySettings.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }
      this.buttonLabel = dispSettings[1]
      for (var i = 2; i < dispSettings.length; i++) {
        this.options.push(dispSettings[i])
      }
    },
    methods: {
      isSelected (index) {
        return index === this.selected
      },
      onChange (event) {
        const status = event.target.value + '?' + this.time
        this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: status})
      }
    },
    computed: {
      time () {
        if (this.state == null) {
          return '12:00AM'
        } else {
          const vals = this.state.toString().split('?')
          return vals[1]
        }
      },
      selected () {
        if (this.state == null) {
          return 0
        } else {
          const vals = this.state.toString().split('?')
          return parseInt(vals[0])
        }
      }
    }
  }
</script>

<style>
/* .scheduler {
  padding-top: 10px;
  padding-bottom: 10px;
} */
</style>
