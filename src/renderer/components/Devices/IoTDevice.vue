<template>
  <div id="deviceWrapper" class="card">
    <div class="card-body">
      <h5 class="card-title">{{mac}}</h5>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'iotdevice',
    props: {
      mac: String
    }
  }
</script>

<style>
  #deviceWrapper h5 {
    color: black;
  }
</style>
