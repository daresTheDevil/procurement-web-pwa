<template>
  <div>
    <v-container grid-list-md class="py-2">
      <v-toolbar light>
        <v-layout row>
          <v-flex xs2>
            <v-select
              hide-details
              solo-inverted
              flat
              label="Solicitation type"
            />
          </v-flex>
          <v-flex xs2>
            <v-select hide-details solo-inverted flat label="Request type" />
          </v-flex>
          <v-flex>
            <v-text-field
              v-model="search"
              solo
              background-color="grey lighten-2"
              prepend-inner-icon="mdi-database-search"
              flat
              hide-details
              placeholder="Search solicitations"
              class="mx-2"
              @input="searchSolicitations"
            />
          </v-flex>
          <v-flex xs2>
            <v-select hide-details solo-inverted flat label="Sort by" />
          </v-flex>
        </v-layout>
      </v-toolbar>
    </v-container>
    <v-container grid-list-lg>
      <v-layout column>
        <v-flex v-for="item in results" :key="item.openDate">
          <v-card>
            <v-card-title class="pb-0">
              <v-chip small dark color="pink" label>{{
                item.solicitationType
              }}</v-chip>
              <v-chip small dark color="accent" label>{{
                item.requestType
              }}</v-chip>
            </v-card-title>
            <v-card-text class="pt-1">
              <v-layout row>
                <v-flex xs10>
                  <h1 class="title">{{ item.solicitationTitle }}</h1>
                  <v-divider class="my-2" />
                  {{ item.solicitationText }}
                </v-flex>
                <v-flex xs2>
                  <h1 class="body-1 font-weight-bold">
                    Notice Type:<span class="body-1">
                      {{ item.requestType }}</span
                    >
                  </h1>
                  <h1 class="body-1 font-weight-bold">
                    Solicitation Type:<span class="body-1">
                      {{ item.solicitationType }}</span
                    >
                  </h1>
                  <h1 class="body-1 font-weight-bold">
                    Opening Date:<span class="body-1">
                      {{ new Date(item.openDate).toLocaleDateString() }}</span
                    >
                  </h1>

                  <h1 class="body-1 font-weight-bold">
                    Closing Date:<span class="body-1">
                      {{ new Date(item.closeDate).toLocaleDateString() }}</span
                    >
                  </h1>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      search: '',
      results: [],
      solicitationsFilter: 1
    }
  },
  computed: {
    ...mapGetters({ solicitations: 'getSolicitations' }),
    goodsCount() {
      return this.results.filter(item => item.solicitationType === 'Goods')
        .length
    },
    servicesCount() {
      return this.results.filter(item => item.solicitationType === 'Services')
        .length
    },
    resultsCount() {
      return this.results.length
    },
    closingCount() {
      return this.results.filter(item =>
        this.$moment(item.closeDate).isBetween(
          this.$moment(),
          this.$moment().endOf('month')
        )
      ).length
    },
    filteredSolicitations() {
      if (this.solicitationsFilter === 2)
        return this.results.filter(item => item.solicitationType === 'Goods')
      else if (this.solicitationsFilter === 3)
        return this.results.filter(item => item.solicitationType === 'Services')
      else if (this.solicitationsFilter === 4)
        return this.results.filter(item =>
          this.$moment(item.closeDate).isBetween(
            this.$moment(),
            this.$moment().endOf('month')
          )
        )
      return this.results
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('callSolicitations')
  },
  created() {
    this.results = this.solicitations
  },
  methods: {
    searchSolicitations() {
      this.results = this.solicitations.filter(
        item =>
          item.solicitationTitle
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1 ||
          item.solicitationText
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1
      )
    }
  }
}
</script>
