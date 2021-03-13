import { userService } from '../services/userService.js';


export const userStore = {
    state: {
        loggedInUser:null,
        isUserLogged:false

    },
    getters: {
        loggedinUser(state){
            return state.loggedInUser;
        },
        isAdmin(state){
            return state.loggedInUser.isAdmin
        },
        isUserLogged(state){
            return state.isUserLogged;
        }
      },
 
    mutations: {
        login(state, {loggedInUser}){
            state.loggedInUser = loggedInUser
            state.isUserLogged = true;
        },

        logout(state){
            state.loggedInUser = null;
            state.isUserLogged = false;

        }
     
    },
    actions: {
       async login({ commit }, { user }) {
           try{
               const loggedInUser =  await userService.login(user)
               commit({type: 'login', loggedInUser}) 
               return loggedInUser  
            }
            catch(err){
                console.log('from Store: Cannot login ', err);
                throw new Error('Cannot login ');
            }
  
    
  },
    async signup({ commit }, { user }){
        try{
            const loggedInUser =  await userService.signup(user)
            commit({type: 'login', loggedInUser})
            return loggedInUser  
        }
        catch(err){
            console.log('from Store: Cannot signup ', err);
            throw new Error('Cannot signup ');
           }
  },

  async logout ({commit} , {user}){
      try{
          await userService.logout(user)
          commit({type: 'logout'})
      }
      catch(err){ 
        throw err
      }
  }
}
}