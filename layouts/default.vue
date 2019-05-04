<template>
  <v-app light class="grey lighten-2">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar flat color="primary" dark>
      <img src="/images/mde-logo-light.svg" height="55" class="mb-1" />
      <v-divider vertical inset class="mx-3" />

      <v-layout v-if="$vuetify.breakpoint.smAndUp" align-center>
        <div>
          <h2>The Mississippi Department of Education</h2>
          <h3 class="font-weight-regular" style="line-height: 1rem;">
            Office of Procurement
          </h3>
        </div>
      </v-layout>
      <v-spacer />
      <v-btn round outline tag="a" href="/auth/login">Login</v-btn>
      <v-toolbar-side-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click="drawer = !drawer"
      />
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <v-snackbar v-model="showSnack" :color="snackColor" top :timeout="2000">
      <h3>{{ snackMessage }}</h3>
    </v-snackbar>
  </v-app>
</template>

<script>
// import SmallFooter from '@/components/footers/SmallFooter.vue'
// import RegularFooter from '@/components/footers/RegularFooter.vue'

export default {
  components: {
    // SmallFooter
    // RegularFooter
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      snackMessage: '',
      snackColor: '',
      showSnack: false,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  created() {
    // $on method will receive the updated count value from the sender component
    this.$nuxt.$on('SHOW_SNACK', data => {
      this.snackMessage = data.text
      this.snackColor = data.color
      this.showSnack = true
    })
  },
  beforeDestroy() {
    // $off method will turned off the event listner
    this.$nuxt.$off('SHOW_SNACK')
  }
}
</script>
