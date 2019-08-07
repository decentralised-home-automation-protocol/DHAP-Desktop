<template>
  <div id="content">
    <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
      <div v-for="element in myArray" :key="element.id"><p>{{element}}</p></div>
    </draggable>
    <PacketSender></PacketSender>
    <DisplayGenerator></DisplayGenerator>
  </div>
</template>

<script>
  import DisplayGenerator from './LandingPage/DisplayGenerator'
  import PacketSender from './LandingPage/PacketSender'
  import draggable from 'vuedraggable'

  export default {
    name: 'landing-page',
    data: function () {
      return {
        myArray: ['test1', 'test2', 'test3']
      }
    },
    components: { DisplayGenerator, PacketSender, draggable }
  }
</script>

<style>
  #content {
    padding: 60px 80px;
  }

  h3, h2, h1, p {
    color: white;
  }
</style>
