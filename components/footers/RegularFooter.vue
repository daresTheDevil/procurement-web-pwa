<template>
  <v-footer height="auto" color="primary">
    <v-layout justify-center row wrap>
      <v-btn v-for="link in links" :key="link" color="white" flat round>
        {{ link }}
      </v-btn>
      <v-flex py-3 text-xs-center white--text xs12 class="primary lighten-1">
        <v-container>
          <v-layout row wrap class="align-center justify-space-between">
            <v-flex shrink class="text-xs-center">
              <v-btn dark icon><v-icon>mdi-twitter</v-icon></v-btn>
              <v-btn dark icon><v-icon>mdi-facebook</v-icon></v-btn>
              <v-btn dark icon><v-icon>mdi-youtube</v-icon></v-btn>

              <h1 class="subheading">info@mdek12.org</h1>
              <h1 class="subheading">(601) 359-3513</h1>
            </v-flex>
            <v-flex shrink class="text-xs-right">
              <img src="/images/mde-logo-light.svg" height="75" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us']
  })
}
</script>

<style></style>
