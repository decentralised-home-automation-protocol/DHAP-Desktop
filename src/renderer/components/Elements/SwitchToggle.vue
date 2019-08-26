<template>
  <div class="element">
    <p>{{label}}</p>
    <label class="switch" @click="toggle()">
      <input type="checkbox" disabled v-model="value">
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'switchtoggle',
    props: {
      device: Object,
      displaySettings: String,
      id: String,
      state: false
    },
    data: function () {
      return {
        label: ''
      }
    },
    mounted () {
      if (this.displaySettings !== '~') {
        this.label = this.displaySettings
      }
    },
    methods: {
      toggle () {
        if (this.value) {
          this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: 'false'})
        } else {
          this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: 'true'})
        }
      }
    },
    computed: {
      value () {
        return this.state === 'true'
      }
    }
  }
</script>

<style scoped>
.element {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
}

label {
  margin-bottom: 0;
}

p {
  margin: 0;
}

  .switch {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 17px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 17px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
