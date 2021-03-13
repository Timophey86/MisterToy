import {httpService} from './http.service.js'


export const userService = {
    login,
    signup,
    logout,
} 

function login(credentials) {
    console.log(credentials)
    return httpService.post('auth/login',credentials)
  }
  
  function signup(signupCredentials){
    console.log(signupCredentials   )
    return httpService.post('auth/signup',signupCredentials)

  }

  function logout(){
      console.log('user logout')
      return httpService.post('auth/logout')
  }
