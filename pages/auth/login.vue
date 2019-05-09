<template>
  <v-container fill-height fluid class="primary">
    <v-layout row fill-height align-center justify-center>
      <v-flex xs12 md3>
        <v-card class="elevation-20">
          <v-btn fab top left nuxt to="/" absolute color="error"
            ><v-icon>mdi-close</v-icon></v-btn
          >
          <v-card-title class="justify-center">
            <img
              src="/images/mde-logo-dark.svg"
              height="75"
              class="text-xs-center"
            />
          </v-card-title>

          <v-tabs v-model="step" fixed-tabs centered>
            <v-tab>Log In</v-tab>
            <v-tab>Sign Up</v-tab>
          </v-tabs>
          <v-window v-model="step">
            <v-window-item :value="0">
              <v-card-text>
                <v-btn large block outline class="text-xs-left"
                  ><v-icon left>mdi-github-circle</v-icon>Log in with
                  Github</v-btn
                >
                <v-btn block large outline class="text-xs-left"
                  ><v-icon left>mdi-google</v-icon>Log in with Google</v-btn
                >
                <v-btn block large outline class="text-xs-left" @click="azure"
                  ><v-icon left>mdi-office</v-icon>Log in with O365</v-btn
                >
              </v-card-text>
              <v-card-title class="justify-center py-1">
                <v-divider class="grey" /><span class="mx-4">OR</span
                ><v-divider class="grey" />
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="email"
                  class="mb-1"
                  outline
                  hide-details
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
            </v-window-item>

            <v-window-item :value="1">
              <v-card-text>
                <v-btn large block outline class="text-xs-left"
                  ><v-icon left>mdi-github-circle</v-icon>Connect with
                  Github</v-btn
                >
                <v-btn block large outline class="text-xs-left"
                  ><v-icon left>mdi-google</v-icon>Connect with Google</v-btn
                >
                <v-btn block large outline class="text-xs-left"
                  ><v-icon left>mdi-office</v-icon>Connect with O365</v-btn
                >
              </v-card-text>
              <v-card-title class="justify-center py-1">
                <v-divider class="mx-4 grey" /><span>OR</span
                ><v-divider class="mx-4 grey" />
              </v-card-title>
              <v-card-text>
                <v-btn block round large depressed color="accent" @click="login"
                  ><v-icon left medium>mdi-account-plus</v-icon>Create a new
                  account</v-btn
                >
              </v-card-text>
            </v-window-item>
          </v-window>
        </v-card>
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
      snackBar: false,
      snackBarColor: '',
      snackBarMessage: '',
      step: 0
    }
  },
  methods: {
    azure() {
      this.showSnack('secondary', 'Logging in...')
      this.$store
        .dispatch('azure', { email: this.email, password: this.password })
        .then(() => {
          this.$router.replace('/procurement/dashboard')
        })
        .catch(error => {
          this.showSnack('error', error)
          this.email = this.password = ''
        })
    },
    login() {
      this.showSnack('secondary', 'Logging in...')
      this.$store
        .dispatch('login', { email: this.email, password: this.password })
        .then(() => {
          this.$router.replace('/procurement/dashboard')
        })
        .catch(error => {
          this.showSnack('error', error)
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
