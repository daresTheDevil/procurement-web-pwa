<template>
  <div>
    <v-img
      src="/images/proc-hero.gif"
      position="top left"
      class="grey lighten-2"
    >
      <v-container grid-list-md fill-height fluid>
        <v-layout row wrap align-center fill-height>
          <v-flex xs12 md5 class="white--text" offset-md1>
            <h1
              class="font-weight-bold"
              :class="$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2'"
            >
              Want to do business with MDE?
            </h1>
            <p
              :class="$vuetify.breakpoint.smAndDown ? 'subheading' : 'title'"
              class="font-weight-light"
            >
              The Office of Procurement facilitates the procurement of goods and
              services necessary for the effective and efficient operation of
              the Mississippi Department of Education (MDE).
            </p>
            <br />
            <v-btn
              :large="$vuetify.breakpoint.smAndUp"
              depressed
              round
              color="success"
              light
              @click="$vuetify.goTo('#search')"
              >Search opportunities
              <v-icon right>mdi-chevron-double-down</v-icon></v-btn
            >
          </v-flex>
          <!-- <v-flex v-if="$vuetify.breakpoint.smAndUp" xs5>
            <img src="/images/digital-contract.svg" />
          </v-flex> -->
        </v-layout>
      </v-container>
    </v-img>

    <v-responsive min-height="1000">
      <section class="grey lighten-2">
        <v-container grid-list-lg>
          <h1
            id="search"
            :class="$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2'"
            class="text-xs-center pt-5 pb-3 font-weight-bold grey--text text--darken-4"
          >
            Open solicitations
          </h1>
          <v-toolbar color="white" class="elevation-2" light>
            <v-layout row>
              <v-flex xs2>
                <v-select
                  hide-details
                  :items="solicitationTypes"
                  solo
                  multiple
                  menu-props="overflowY"
                  light
                  background-color="grey lighten-2"
                  flat
                  label="Solicitation type"
                />
              </v-flex>
              <v-flex xs2>
                <v-select
                  :items="requestTypes"
                  hide-details
                  solo
                  light
                  background-color="grey lighten-2"
                  flat
                  label="Request type"
                />
              </v-flex>
              <v-flex>
                <v-text-field
                  v-model="search"
                  solo
                  light
                  background-color="grey lighten-2"
                  flat
                  prepend-inner-icon="mdi-database-search"
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
                <v-card-text>
                  <v-layout row>
                    <v-flex xs10>
                      <div class="mb-2">
                        <v-chip small dark color="info" label>{{
                          item.solicitationType
                        }}</v-chip>
                      </div>
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
                      <v-btn block small depressed color="primary"
                        >See details</v-btn
                      >
                      <v-btn
                        block
                        small
                        depressed
                        color="primary"
                        @click="handleSubmission(item._id)"
                        >Submit response</v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
    </v-responsive>

    <!-- <section class="grey lighten-2">
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs3>
            <v-card class="mb-2">
              <v-card-text>
                <v-text-field
                  v-model="search"
                  solo
                  background-color="grey lighten-2"
                  prepend-inner-icon="mdi-database-search"
                  flat
                  hide-details
                  placeholder="Filter solicitations"
                  class="mx-2"
                  @input="searchSolicitations"
                />
              </v-card-text>
            </v-card>
            <v-card class="mb-2">
              <v-card-title>Notice Type</v-card-title>
              <v-card-text>
                <v-checkbox hide-details label="Grant" />
                <v-checkbox hide-details label="Contract" />
                <v-checkbox hide-details label="Goods" />
                <v-checkbox hide-details label="Services" />
              </v-card-text>
            </v-card>
            <v-card>
              <v-expansion-panel>
                <v-expansion-panel-content>
                  <template v-slot:header>
                    <div>Notice Type</div>
                  </template>
                  <v-card>
                    <v-card-text class="py-1">
                      <v-checkbox hide-details label="Grant" />
                      <v-checkbox hide-details label="Contract" />
                      <v-checkbox hide-details label="Goods" />
                      <v-checkbox hide-details label="Services" />
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content v-for="(item, i) in 5" :key="i">
                  <template v-slot:header>
                    <div>Item</div>
                  </template>
                  <v-card>
                    <v-card-text
                      >Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo
                      consequat.</v-card-text
                    >
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-card>
          </v-flex>
          <v-flex xs9>
            <v-layout column>
              <v-flex v-for="(item, i) in results" :key="i">
                <v-card>
                  <v-card-title class="title">{{
                    item.solicitationTitle
                  }}</v-card-title>
                  <v-divider />
                  <v-card-text>
                    {{ item.solicitationText }}
                  </v-card-text>
                  <v-card-text>
                    <h1 class="subheading font-weight-bold">
                      Opening Date:<span class="subheading">
                        {{ item.openDate }}</span
                      >
                    </h1>

                    <h1 class="subheading font-weight-bold">
                      Closing Date:<span class="subheading">
                        {{ item.closeDate }}</span
                      >
                    </h1>
                    &nbsp;&nbsp;
                    <h1 class="subheading">{{ item.openDate }}</h1>
                    <br />
                    <h1 class="subheading font-weight-bold">
                      Closing Date:
                    </h1>
                    &nbsp;&nbsp;
                    <h1 class="subheading">{{ item.closeDate }}</h1>
                    <v-list dense>
                      <v-list-tile>
                        <h1 class="subheading font-weight-bold">
                          Opening Date:
                        </h1>
                        &nbsp;&nbsp;
                        <h1 class="subheading">{{ item.openDate }}</h1>
                      </v-list-tile>
                      <v-list-tile>
                        <h1 class="subheading font-weight-bold">
                          Closing Date:
                        </h1>
                        &nbsp;&nbsp;
                        <h1 class="subheading">{{ item.closeDate }}</h1>
                      </v-list-tile>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </section> -->
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
      solicitationsFilter: 1,
      solicitationTypes: ['Goods', 'Services', 'Contracts', 'Grants'],
      requestTypes: ['RFP', 'RFA', 'RFI', 'IFB']
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
    handleSubmission(solicitation) {
      this.$store.commit('SET_SOLICITATION', solicitation)
      this.$router.replace('/submit')
    },
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
