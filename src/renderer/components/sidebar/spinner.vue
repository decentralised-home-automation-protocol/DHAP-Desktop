<template>
  <div class="spring-spinner">
    <div class="spring-spinner-part top">
      <div class="spring-spinner-rotator"></div>
    </div>
    <div class="spring-spinner-part bottom">
      <div class="spring-spinner-rotator"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'spinner'
  }
</script>

<style>
.spring-spinner, .spring-spinner * {
  box-sizing: border-box;
}

.spring-spinner {
  height: 30px;
  width: 30px;
}

.spring-spinner .spring-spinner-part {
  overflow: hidden;
  height: calc(30px / 2);
  width: 30px;
}

.spring-spinner  .spring-spinner-part.bottom {
    transform: rotate(180deg) scale(-1, 1);
  }

.spring-spinner .spring-spinner-rotator {
  width: 30px;
  height: 30px;
  border: calc(30px / 7) solid transparent;
  border-right-color: #ff1d5e;
  border-top-color: #ff1d5e;
  border-radius: 50%;
  box-sizing: border-box;
  animation: spring-spinner-animation 3s ease-in-out infinite;
  transform: rotate(-200deg);
}

@keyframes spring-spinner-animation {
  0% {
    border-width: calc(30px / 7);
  }
  25% {
    border-width: calc(30px / 23.33);
  }
  50% {
    transform: rotate(115deg);
    border-width: calc(30px / 7);
  }
  75% {
    border-width: calc(30px / 23.33);
  }
  100% {
    border-width: calc(30px / 7);
  }
}
</style>
