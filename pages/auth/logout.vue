<template>
  <div id="logout">
    <v-snackbar v-model="showSnack" color="success" top>
      Successfully logged out...
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSnack: false
    }
  },
  mounted() {
    this.$store.dispatch('logout').then(() => {
      this.showSnack = true
      this.$router.replace('/')
    })
  }
}
</script>
