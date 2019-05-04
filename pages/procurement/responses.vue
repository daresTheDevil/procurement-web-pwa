<template>
  <div>
    <v-container fluid class="pb-0">
      <h1 class="display-1">Responses</h1>
    </v-container>
    <v-container grid-list-md fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-toolbar card light>
              <v-btn-toggle v-model="filter" mandatory class="transparent mr-2">
                <v-btn value="1" large flat>
                  All
                  <v-avatar
                    size="24"
                    class="ml-2 white--text"
                    color="primary"
                    dark
                    >{{ submissions.length }}</v-avatar
                  >
                </v-btn>
                <v-btn flat value="2" large>
                  Open
                  <v-avatar
                    size="24"
                    class="ml-2 white--text"
                    color="secondary"
                    dark
                    >{{ submissions.length }}</v-avatar
                  >
                </v-btn>
                <v-btn flat value="3" large>
                  Closed
                  <v-avatar
                    size="24"
                    class="ml-2 white--text"
                    color="error"
                    dark
                    >{{ submissions.length }}</v-avatar
                  >
                </v-btn>
              </v-btn-toggle>
              <v-text-field
                v-model="search"
                solo
                background-color="grey lighten-2"
                prepend-inner-icon="mdi-database-search"
                flat
                hide-details
                placeholder="Filter submissions"
                class="mx-2"
                @input="searchSubmissions"
              />
              <v-spacer />
            </v-toolbar>

            <v-data-table
              :headers="headers"
              :items="filteredResponses"
              :search="search"
              item-key="_id"
            >
              <template v-slot:headers="props">
                <tr class="primary">
                  <th
                    v-for="header in props.headers"
                    :key="header.text"
                    :class="header.align"
                    class="white--text"
                  >
                    {{ header.text }}
                  </th>
                </tr>
              </template>
              <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                  <td>{{ props.item._id }}</td>
                  <td class="text-xs-left">{{ props.item.contactEmail }}</td>
                  <td class="text-xs-left">{{ props.item.vendorName }}</td>
                  <td class="text-xs-left">{{ props.item.noticeTitle }}</td>
                  <td class="text-xs-right">
                    {{ new Date(props.item.createdAt).toLocaleString() }}
                  </td>
                </tr>
              </template>
              <template slot="no-data">
                <v-alert :value="true" color="error" icon="warning"
                  >Sorry, nothing to display here :(</v-alert
                >
              </template>
              <template slot="expand" slot-scope="props">
                <v-card color="grey lighten-2" flat>
                  <v-container grid-list-md>
                    <v-layout row wrap justify-center>
                      <v-flex
                        v-for="(file, i) in props.item.files"
                        :key="i"
                        shrink
                      >
                        <v-card light hover>
                          <v-list-tile
                            :href="
                              'http://localhost:3030/files/' + file.directName
                            "
                            target="_blank"
                          >
                            <v-list-tile-avatar>
                              <v-icon>attachment</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-sub-title>{{
                              file.name
                            }}</v-list-tile-sub-title>
                          </v-list-tile>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      dates: ['2018-09-15', '2018-09-20'],
      menu: false,
      filter: 1,
      search: '',
      results: [],
      headers: [
        { text: 'ID', align: 'text-xs-left', sortable: false, value: '_id' },
        { text: 'Contact Email', align: 'text-xs-left', value: 'contactEmail' },
        {
          text: 'Company/DBA Name',
          align: 'text-xs-left',
          value: 'vendorName'
        },
        {
          text: 'Soliticitation Title',
          align: 'text-xs-left',
          value: 'noticeTitle'
        },
        { text: 'Received', align: 'text-xs-right', value: 'createdAt' }
      ]
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('getSubmissions')
  },
  middleware: 'authenticated',
  layout: 'procurement',
  computed: {
    ...mapGetters({ isAuthenticated: 'isAuthenticated' }),
    ...mapGetters({ submissions: 'submissions' }),
    ...mapState('auth', { user: state => state.user }),
    filteredSolicitations() {
      if (this.filter === 2)
        return this.results.filter(item =>
          this.$moment(item.closeDate).isAfter(this.$moment())
        )
      else if (this.filter === 3)
        return this.results.filter(item =>
          this.$moment(item.closeDate).isBefore(this.$moment())
        )
      return this.results
    },
    filteredResponses() {
      if (this.filter === 2) return this.currentReponses
      if (this.filter === 3) return this.archivedResponses
      return this.allResponses
    },
    allResponses() {
      return this.submissions
    },
    currentResponses() {
      return this.solicitations.filter(item =>
        this.$moment(item.closeDate).isAfter(this.$moment())
      )
    },
    archivedResponses() {
      return this.solicitations.filter(item =>
        this.$moment(item.closeDate).isBefore(this.$moment())
      )
    }
  },
  created() {
    this.results = this.submissions
  },
  methods: {
    searchSubmissions() {
      this.results = this.submissions.filter(
        item =>
          item.noticeTitle.toLowerCase().indexOf(this.search.toLowerCase()) >
            -1 ||
          item._id.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          item.contactEmail.toLowerCase().indexOf(this.search.toLowerCase()) >
            -1
      )
    },
    fetchSubmissions() {
      this.$store.dispatch('getSubmissions')
    }
  }
}
</script>
