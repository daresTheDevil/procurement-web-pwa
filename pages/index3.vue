<template>
  <v-container fill-height grid-list-lg class="primary" fluid>
    <v-layout row fill-height align-center justify-center>
      <v-flex xs12 md5 class="white--text">
        <h1
          class="font-weight-bold"
          :class="$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2'"
        >
          Want to do business with MDE?
        </h1>
        <p class="subheading">
          The Office of Procurement facilitates the procurement of goods and
          services necessary for the effective and efficient operation of the
          Mississippi Department of Education (MDE).
        </p>
        <p class="subheading">
          The MDE Procurement Application Portal provides a secure platform for
          vendors to respond to contract and grant opportunities.
        </p>
        <br />
        <v-btn
          :large="$vuetify.breakpoint.smAndUp"
          depressed
          round
          color="success"
          @click="dialog = true"
          >See available opportunities</v-btn
        >
        <v-btn
          :large="$vuetify.breakpoint.smAndUp"
          depressed
          round
          color="info"
          light
          to="/search"
          >See available opportunities</v-btn
        >
      </v-flex>
      <v-flex xs1 />
      <v-flex xs3>
        <img src="/images/digital-contract.svg" />
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" max-width="1000">
      <v-card light class="mb-3">
        <v-container fluid grid-list-md class="py-2">
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
        </v-container>
      </v-card>
      <v-card light color="grey lighten-1">
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
                          {{
                            new Date(item.openDate).toLocaleDateString()
                          }}</span
                        >
                      </h1>

                      <h1 class="body-1 font-weight-bold">
                        Closing Date:<span class="body-1">
                          {{
                            new Date(item.closeDate).toLocaleDateString()
                          }}</span
                        >
                      </h1>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      search: '',
      dialog: false,
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
