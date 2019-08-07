<template>
  <div>
    <div class="input-group mb-3 input-group-lg">
      <div class="input-group-prepend" v-if="label">
        <span class="input-group-text" id="inputGroup-sizing-lg">{{label}}</span>
      </div>
      <p class="form-control">{{value}}</p>
      <div class="input-group-append">
        <button class="btn btn-outline-primary" @click="decrement()">-</button>
        <button class="btn btn-outline-primary" @click="increment()">+</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'stepper',
    props: {
      values: String
    },
    data: function () {
      return {
        label: '',
        value: 0,
        max: 100,
        min: 0
      }
    },
    methods: {
      increment () {
        if (this.value < this.max) {
          this.value++
        }
      },
      decrement () {
        if (this.value > this.min) {
          this.value--
        }
      }
    },
    mounted () {
      var dispSettings = this.values.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }
      this.min = dispSettings[1]
      this.max = dispSettings[2]
    }
  }
</script>

<style>
</style>
