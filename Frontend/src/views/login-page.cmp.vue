<template>
  <section class="main-container">
    <section v-if="!isUserLogged">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input
          class="sign-input"
          type="text"
          placeholder="User Name"
          v-model="credentials.username"
        />
        <input
          class="sign-input"
          type="password"
          placeholder="Password"
          v-model="credentials.password"
        />
        <button
          native-type="submit"
          class="logout-btn"
          size="medium "
          type="primary"
          plain
        >
          Login
        </button>
      </form>
    </section>
    <div v-else @click="logout" class="logout main-container">
      Your Loged In. Press <span>Log Out</span> to enter from a diffrent account
    </div>
  </section>
</template>



<script>
export default {
  data() {
    return {
      loggedinUser: this.$store.getters.loggedinUser,
      credentials: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        const user = JSON.parse(JSON.stringify(this.credentials));
        const loggedInUser = await this.$store.dispatch({
          type: "login",
          user,
        });
        this.ToggleSignup();
        this.handleEntrance(loggedInUser);
      } catch (err) {
        alert("username/password incorrect");
      }
    },
    async logout() {
      try {
        const user = this.$store.getters.loggedinUser;
        await this.$store.dispatch({ type: "logout", user });
        this.loggedinUser = null;
        this.ToggleSignup();
      } catch (err) {
        console.log(err);
      }
    },
    handleEntrance(user) {
      this.loggedinUser = user;
      this.$router.push(`/app`);
    },
    ToggleSignup() {
      this.isSignup = !this.isSignup;
    },
  },
  computed: {
    isUserLogged() {
      return this.$store.getters.isUserLogged;
    },
  },
};
</script>