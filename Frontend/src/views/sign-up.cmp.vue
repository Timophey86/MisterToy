<template>
  <section class="main-container">
      <div v-if="isUserLogged" class="logout main-container"><span>Log Out</span> to Sign Up</div>
        <form  v-else @submit.prevent="signup">
                <input class="sign-input" type="text" placeholder="Your fullname" v-model="signupCredentials.fullname" />
                <input class="sign-input" type="text" placeholder="Your username" v-model="signupCredentials.username" />
                <input class="sign-input" type="password" placeholder="Choose Password"  v-model="signupCredentials.password" />
            <button native-type="submit" class="logout-btn" size="medium " type="primary" plain >Sign Up</button>
        </form>
    </section>
</template>



<script>
export default {
  data() {
        return {
            loggedinUser: this.$store.getters.loggedinUser,
            signupCredentials: {
                username: '',
                password: '',
                fullname: ''
            },

        }
    },
    methods: {
        async logout() {
            try{
                const user = this.$store.getters.loggedinUser
                await this.$store.dispatch({type:"logout", user })
                this.loggedinUser = null
                this.ToggleSignup()

            }
            catch(err){
                console.log(err)
            }
        },
       async signup() {
            const user = JSON.parse(JSON.stringify(this.signupCredentials))
            try{
                const loggedInUser =  await this.$store.dispatch({ type: "signup", user });
                 this.ToggleSignup()
                this.handleEntrance(loggedInUser)
            }
             catch(err){
                 alert('username/password incorrect')
            }
        },
        handleEntrance(user) {
            this.loggedinUser = user
            this.$router.push(`/toy/`);
        },
        ToggleSignup(){
            this.isSignup = !this.isSignup;
        }
    },
    computed:{
        isUserLogged(){
            return this.$store.getters.isUserLogged
        }
    }
}
</script>