<template>
  <v-app light class="grey lighten-5">
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

      <div v-if="$vuetify.breakpoint.smAndUp">
        <h1
          style="font-size: 1.8rem; line-height: 1.8rem;"
          class="font-weight-regular"
        >
          The Mississippi Department of Education
        </h1>
        <h1
          style="font-size: 1.3rem; line-height: 1.3rem;"
          class="font-weight-light"
        >
          Office of Procurement
        </h1>
      </div>
      <v-spacer />
      <v-toolbar-side-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click="drawer = !drawer"
      />
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
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
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
