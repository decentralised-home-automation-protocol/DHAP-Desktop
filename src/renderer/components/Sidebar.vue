<template>
  <nav id="sidebar" >
    <div class="sidebar-header">
        <h3>IoT Dashboard</h3>
    </div>

    <ul class="list-unstyled components">
        <li>
            <router-link :to="{ name: 'landing-page' }" ><i class="fas fa-home"></i> Dashboard</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'devices' }"><i class="fas fa-wifi"></i> Devices</router-link>
        </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'Sidebar',
    data () {
      return { activeItem: 'about' }
    },
    methods: {
      isActive: function (menuItem) {
        return this.activeItem === menuItem
      },
      setActive: function (menuItem) {
        this.activeItem = menuItem // no need for Vue.set()
      }
    }
  }
</script>

<style>
  #sidebar {
    min-width: 250px;
    max-width: 250px;
    min-height: 100vh;
    border-right: 1px solid #545a5f;    
  }

  #sidebar {
    background: rgb(50, 50, 50);
    color: #fff;
    transition: all 0.3s;
  }

  #sidebar .sidebar-header {
    padding: 20px;
  }

  #sidebar ul.components {
    padding: 20px 0;
    border-top: 1px solid #545a5f;
  }

  #sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
    text-decoration: none;
    color: whitesmoke
  }

  #sidebar ul li a:hover {
    background: #4c545c;
  }

  nav a.router-link-exact-active {
    background: #43474b;
    border-left: 1px solid #ff0000;   
  }
</style>
