<template>
  <div class="element scheduler">
    <p id="label">{{label}}</p>
    <select @change="onChange($event)">
      <option v-for="(option, index) in options" :key="option" :value="index" :selected=selected>{{option}}</option>
    </select>
    <input type="time" v-model="changeTime">
    <button v-if="synced" class="btn btn-outline-success" @click="submit()">{{buttonLabel}}</button>
    <button v-else class="btn btn-outline-danger" @click="submit()">{{buttonLabel}}</button>
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
        options: [],
        changeTime: '12:00',
        selected: 0
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
        const status = event.target.value + '!' + this.changeTime
        this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: status})
      },
      submit () {
        const vals = this.state.toString().split('!')
        const status = vals[0] + '!' + this.changeTime
        this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: status})
      }
    },
    watch: {
      state: function (val) {
        const newState = val.toString().split('!')
        this.changeTime = newState[1]
      }
    },
    computed: {
      synced () {
        if (this.state == null || this.state === '') {
          return false
        } else {
          const vals = this.state.toString().split('!')
          return vals[1] === this.changeTime
        }
      }
    }
  }
</script>

<style>
</style>
