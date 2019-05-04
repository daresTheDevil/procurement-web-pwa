<template>
  <v-app light class="grey lighten-3">
    <v-navigation-drawer v-model="drawer" floating fixed width="250" app>
      <v-toolbar color="primary" dark>
        <v-spacer />
        <img src="/images/mde-logo-light.svg" height="50" />
        <v-spacer />
      </v-toolbar>
      <v-subheader>Office of Procurement</v-subheader>
      <v-list class="pt-0">
        <v-list-tile
          v-for="(item, k) in items"
          :key="k"
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
    <v-toolbar color="primary" fixed dark app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-btn :disabled="!disabledMessage" icon>
        <v-badge v-model="disabledMessage" left overlap color="error">
          <span slot="badge">2</span>
          <v-icon medium>mdi-bell-alert</v-icon>
        </v-badge>
      </v-btn>
      <v-btn :disabled="!disabledMessage" icon>
        <v-badge v-model="disabledMessage" left overlap color="red darken-1">
          <span slot="badge">2</span>
          <v-icon medium>mdi-email-open</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon @click="disabledMessage = !disabledMessage">
        <v-icon>mdi-car-brake-alert</v-icon>
      </v-btn>
      <v-spacer />

      <v-menu offset-y left>
        <v-btn
          v-if="$vuetify.breakpoint.smAndUp"
          slot="activator"
          round
          outline
          class="text-none font-weight-regular"
        >
          <v-icon left>mdi-account</v-icon>
          {{ user.email }}
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
        <v-btn v-else slot="activator" dark icon color="light-blue darken-4">
          <v-icon>mdi-settings</v-icon>
        </v-btn>
        <v-list two-line>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon>mdi-account</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>My Account</v-list-tile-title>
              <v-list-tile-sub-title
                >See and verify your personal information</v-list-tile-sub-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon>mdi-settings</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>My Settings</v-list-tile-title>
              <v-list-tile-sub-title
                >Adjust your settings</v-list-tile-sub-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-btn block round depressed dark color="red" @click="logout"
              >Logout</v-btn
            >
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <v-snackbar v-model="showSnack" color="success" top :timeout="2000">
      <h3>Succesfully logged in!</h3>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  middleware: 'authenticated',
  data() {
    return {
      drawer: true,
      mini: true,
      currentTime: '',
      showSnack: false,
      disabledMessage: false,
      items: [
        {
          icon: 'mdi-monitor-dashboard',
          title: 'Dashboard',
          to: '/procurement/dashboard'
        },
        {
          icon: 'mdi-cube-send',
          title: 'Responses',
          to: '/procurement/responses'
        },
        {
          icon: 'mdi-cube-scan',
          title: 'Notices',
          to: '/procurement/notices'
        }
        // { icon: 'mdi-file-document-edit-outline', title: 'Signature Sheets', to: '/procurement/signature' },
        // { icon: 'mdi-format-color-fill', title: 'Look & feel', to: '/procurement/lookandfeel' }
      ],
      title: 'Vuetify.js'
    }
  },

  computed: {
    ...mapGetters({ isAuthenticated: 'isAuthenticated' }),
    ...mapState({ user: state => state.user })
  },
  mounted() {
    this.showSnack = true
  },
  methods: {
    logout() {
      this.$router.replace('/auth/logout')
    },
    time() {
      this.currentTime = new Date().toLocaleTimeString()
    }
  }
}
</script>
