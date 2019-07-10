<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>Username</label>
      <input required v-model="email" type="text" placeholder="Email"/>
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>
      <hr/>
      <button class="btn-default" type="submit">Login</button>
    </form>
  </div>
</template>

<style>
  .login {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
  }
</style>

<script>
  import {AUTH_REQUEST} from 'actions/auth'

  export default {
    name: 'login',
    data () {
      return {
        email: 'jonhdoe@example.com',
        password: '12345',
      }
    },
    methods: {
      login: function () {
        const { email, password } = this
        this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
          this.$router.push('/')
        })
      }
    },
  }
</script>
