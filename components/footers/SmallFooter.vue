<template>
  <v-footer height="auto" color="primary">
    <v-layout justify-center row wrap>
      <v-btn v-for="link in links" :key="link" color="white" flat round>
        {{ link }}
      </v-btn>
      <v-flex py-3 text-xs-center white--text xs12 class="primary lighten-1">
        &copy;2019 — <strong>Mississippi Department of Education</strong>
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
