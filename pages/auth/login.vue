<template>
  <v-container fill-height fluid class="primary">
    <v-layout row fill-height align-center justify-center>
      <v-flex xs3>
        <v-card class="elevation-20">
          <v-card-text class="text-xs-center justify-space-between">
            <img src="/images/mde-logo-dark.svg" height="75" />
            <h1 class="font-weight-regular">Log in to your account</h1>
          </v-card-text>
          <v-card-text class="pb-0">
            <v-text-field
              v-model="email"
              outline
              label="Email"
              append-icon="mdi-account"
            />
            <v-text-field
              v-model="password"
              outline
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            />
            <v-btn block large depressed color="accent" @click="login"
              ><v-icon left medium>mdi-school</v-icon>Log in</v-btn
            >
          </v-card-text>
          <v-card-title class="justify-center py-1">
            <v-divider /><span class="mx-2">OR</span><v-divider />
          </v-card-title>
          <v-card-text class="pt-0">
            <v-btn
              block
              dark
              depressed
              color="deep-orange darken-1"
              @click="login"
              ><v-icon medium left>mdi-gmail</v-icon>Connect with Google</v-btn
            >
            <v-btn
              block
              dark
              depressed
              color="light-blue darken-1"
              @click="login"
              ><v-icon medium left>mdi-office</v-icon>Connect with 0365</v-btn
            >
          </v-card-text>
        </v-card>
        <h3 class="font-weight-regular mt-3 white--text">
          Don't have an account?
          <a class="white--text font-weight-black">Sign Up</a>
        </h3>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="snackBar"
      :color="snackBarColor"
      bottom
      :timeout="2000"
    >
      {{ snackBarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: 'user@mdek12.org',
      password: 'rock-wizardry-airplane',
      showPassword: false
    }
  },
  methods: {
    login() {
      this.$nuxt.$emit('SHOW_SNACK', {
        color: 'secondary',
        text: 'Logging in...'
      })
      this.$store
        .dispatch('login', { email: this.email, password: this.password })
        .then(() => {
          this.$router.replace('/procurement/dashboard')
        })
        .catch(error => {
          this.$toast.error(error, {
            theme: 'bubble',
            position: 'top-center'
          })
          this.email = this.password = ''
        })
    },
    showSnack(color, text) {
      this.snackBarMessage = text
      this.snackBarColor = color
      this.snackBar = true
    }
  }
}
</script>

<style></style>
