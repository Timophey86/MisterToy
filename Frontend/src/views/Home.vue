<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
   <h2 class="welcome-header">Welcome to the Toy Store</h2>
   <div class="welcome-login main-container ">Please <span @click="moveToLogin">Login</span> to continue.</div>
   <div class="welcome-signup main-container ">If you don't have an accout you can <span @click="moveToSignUp">Sign Up</span> here.</div>
   <div class="img">
   <img src="../assets/jerry-wang-LXIH6QHz6ko-unsplash.jpg" alt="">
   </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    moveToLogin() {
      this.$router.push(`/login`);
    },
    moveToSignUp() {
      this.$router.push(`/signup`);
    }
  }
}
</script>
