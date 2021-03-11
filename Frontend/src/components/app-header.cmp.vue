<template>
   <div id="app-header">
     <div  class="app-header main-container">
       <div class="logo">ToyStore</div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/app">App</router-link>
      <router-link to="/user">User</router-link>
    </div>
    </div>
    </div>
</template>


<script>
export default {
  name: 'App-Header',
}
</script>