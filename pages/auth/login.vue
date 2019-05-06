<template>
  <v-container fill-height fluid class="primary">
    <v-layout row fill-height align-center justify-center>
      <v-flex xs3>
        <v-window v-model="step">
          <v-window-item :value="1">
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
                <v-btn block round large depressed color="accent" @click="login"
                  ><v-icon left medium>mdi-school</v-icon>Log in</v-btn
                >
              </v-card-text>
              <v-card-title class="justify-center py-1">
                <v-divider class="mx-4 grey" /><span>OR</span
                ><v-divider class="mx-4 grey" />
              </v-card-title>
              <v-card-text class="pt-0">
                <v-btn
                  block
                  dark
                  round
                  depressed
                  color="deep-orange darken-1"
                  @click="login"
                  ><v-icon medium left>mdi-gmail</v-icon>Connect with
                  Google</v-btn
                >
                <v-btn
                  block
                  dark
                  round
                  depressed
                  color="light-blue darken-1"
                  @click="login"
                  ><v-icon medium left>mdi-office</v-icon>Connect with
                  0365</v-btn
                >
              </v-card-text>
            </v-card>
            <h3 class="font-weight-regular mt-3 white--text">
              Don't have an account?
              <a class="white--text font-weight-black" @click="step = 2"
                >Sign Up</a
              >
            </h3>
          </v-window-item>

          <v-window-item :value="2">
            <v-card class="elevation-20">
              <v-card-text class="text-xs-center justify-space-between">
                <img src="/images/mde-logo-dark.svg" height="75" />
                <h1 class="font-weight-regular">Sign up</h1>
              </v-card-text>
              <v-card-text class="pb-0">
                <v-text-field
                  v-model="createEmail"
                  outline
                  label="Email"
                  append-icon="mdi-account"
                />
                <v-text-field
                  v-model="createPassword"
                  outline
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                />
                <v-text-field
                  v-model="verifyPassword"
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
                  round
                  depressed
                  color="deep-orange darken-1"
                  @click="login"
                  ><v-icon medium left>mdi-gmail</v-icon>Connect with
                  Google</v-btn
                >
                <v-btn
                  block
                  dark
                  round
                  depressed
                  color="light-blue darken-1"
                  @click="login"
                  ><v-icon medium left>mdi-office</v-icon>Connect with
                  0365</v-btn
                >
              </v-card-text>
            </v-card>
            <h3 class="font-weight-regular mt-3 white--text">
              Already have an account?
              <a class="white--text font-weight-black" @click="step = 1"
                >Sign in...</a
              >
            </h3>
          </v-window-item>
        </v-window>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="snackBar" :color="snackBarColor" top :timeout="8000">
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
      createEmail: '',
      createPassword: '',
      verifyPassword: '',
      showPassword: false,
      snackSnack: false,
      snackBarColor: '',
      snackBarMessage: '',
      step: 1
    }
  },
  methods: {
    login() {
      this.showSnack('secondary', 'Logging in...')
      this.$store
        .dispatch('login', { email: this.email, password: this.password })
        .then(() => {
          this.$router.replace('/procurement/dashboard')
        })
        .catch(error => {
          this.showSnack('error', error.message)
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
