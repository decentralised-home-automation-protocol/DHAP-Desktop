<template>
  <div id="wrapper">
    <Sidebar></Sidebar>
    <div id="content">
      <PacketSender></PacketSender>
      <DisplayGenerator></DisplayGenerator>
    </div>
  </div>
</template>

<script>
  import DisplayGenerator from './LandingPage/DisplayGenerator'
  import PacketSender from './LandingPage/PacketSender'
  import Sidebar from './LandingPage/Sidebar'

  export default {
    name: 'landing-page',
    components: { DisplayGenerator, PacketSender, Sidebar }
  }
</script>

<style>
  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    align-items: stretch;
    display: flex;
    width: 100%;
  }

  #content {
    padding: 60px 80px;
  }

  #sidebar {
      min-width: 250px;
      max-width: 250px;
      min-height: 100vh;
  }

  #sidebar.active {
      margin-left: -250px;
  }

  a, a:hover, a:focus {
      color: #fff;
      text-decoration: none;
      transition: all 0.3s;
  }

  #sidebar {
      background: #323538;
      color: #fff;
      transition: all 0.3s;
  }

  #sidebar .sidebar-header {
      padding: 20px;
      background: #323538;
  }

  #sidebar ul.components {
      padding: 20px 0;
      border-bottom: 1px solid #545a5f;
      border-top: 1px solid #545a5f;
  }

  #sidebar ul li a {
      padding: 10px;
      font-size: 1.1em;
      display: block;
      text-decoration: none;
  }
  #sidebar ul li a:hover {
      color: #ffffff;
      background: #43474b;
  }

  #sidebar ul li.active > a, a[aria-expanded="true"] {
      color: #fff;
      background: #43474b;
  }
</style>
