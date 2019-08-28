<template>
  <div class="element"> 
    <table id="buttonsTable">
      <tr>
        <th></th>
        <th><button class="btn btn-primary" @click="pressed(0)">{{topLabel}}</button></th>
        <th></th>
      </tr>
      <tr>
        <th><button class="btn btn-primary" @click="pressed(3)">{{leftLabel}}</button></th>
        <th><button class="btn btn-primary" @click="pressed(4)" v-if="centreLabel">{{centreLabel}}</button></th>
        <th><button class="btn btn-primary" @click="pressed(1)">{{rightLabel}}</button></th>
      </tr>
      <tr>
        <th></th>
        <th><button class="btn btn-primary" @click="pressed(2)">{{bottomLabel}}</button></th>
        <th></th>
      </tr>
    </table>
    <p id="label">{{label}}</p>
  </div>
</template>

<script>
  export default {
    name: 'directionalbuttons',
    props: {
      device: Object,
      displaySettings: String,
      id: String,
      state: Number
    },
    data: function () {
      return {
        label: '',
        topLabel: '',
        rightLabel: '',
        bottomLabel: '',
        leftLabel: '',
        centreLabel: ''
      }
    },
    mounted () {
      var dispSettings = this.displaySettings.split(',')
      if (dispSettings[0] !== '~') {
        this.label = dispSettings[0]
      }
      this.topLabel = dispSettings[1]
      this.rightLabel = dispSettings[2]
      this.bottomLabel = dispSettings[3]
      this.leftLabel = dispSettings[4]
      this.centreLabel = dispSettings[5]
    },
    methods: {
      pressed (buttonNum) {
        this.$store.dispatch('iotCommand', {device: this.device, id: this.id, status: buttonNum})
      }
    }
  }
</script>

<style>
#buttonsTable {
  margin-left:auto; 
  margin-right:auto;
}

#buttonsTable th {
  min-width: 40px;
  min-height: 40px;
}
</style>
