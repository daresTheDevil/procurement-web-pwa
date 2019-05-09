<template>
  <div>
    <v-container fluid class="pb-0">
      <h1 class="display-1">Dashboard</h1>
      <!--
      <h1
        class="subheadding"
        v-for="(item, x) in $nuxt.$route.name.split('-')"
        :key="x"
      >
        {{ item }}
      </h1>
      <v-subheader>{{ $nuxt.$route.name.split('-')[0] }}</v-subheader>
      <v-subheader>{{ $nuxt.$route.name }}</v-subheader>
      <v-subheader>{{ $nuxt.$route.path }}</v-subheader> -->
    </v-container>
    <v-container grid-list-lg fluid>
      <v-layout row wrap>
        <v-flex xs12 md5>
          <v-card>
            <v-toolbar card dark dense color="primary">
              <v-chip dark color="primary"
                ><v-avatar color="info" /><span>Current Date</span></v-chip
              >
              <v-chip dark color="primary"
                ><v-avatar color="warning" class="black--text">3</v-avatar
                ><span>Closing</span></v-chip
              >
            </v-toolbar>
            <v-date-picker
              ref="picker"
              v-model="date"
              :picker-date.sync="pickerDate"
              :events="closingSolicitations"
              show-current
              color="info"
              class="elevation-0"
              no-title
              full-width
            />
          </v-card>
        </v-flex>
        <!-- <v-flex xs12 md7>
        <v-toolbar card dark color="primary">
          <v-btn icon @click="$refs.calendar.prev()">
            <v-icon large dark>mdi-chevron-left</v-icon>
          </v-btn>
          <span class="title">{{ currentMonth }}</span>
          <v-btn flat icon @click="$refs.calendar.next()">
            <v-icon large dark>mdi-chevron-right</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card height="600">
          <v-calendar
            ref="calendar"
            :weekdays="weekdays"
            :value="currentMonth"
            v-model="start"
            height="550"
            type="month"
            color="primary"
          >
            <template slot="day" slot-scope="{ date }">
              <template v-for="(event, i) in solicitationsMap[date]">
                <v-menu :key="i" full-width offset-y>
                  <div
                    v-ripple
                    v-if="!event.time"
                    slot="activator"
                    class="my-event primary"
                    v-html="event.solicitationTitle"
                  />
                  <v-card max-width="400" color="white" min-width="350px" flat>
                    <v-card-title>
                      <span class="subheading" v-html="event.solicitationTitle"/>
                    </v-card-title>
                    <V-card-text class="py-1 caption">
                      <span v-html="event.solicitationText"/>
                    </V-card-text>
                    <v-card-actions>
                      <v-btn flat color="secondary">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </template>
            </template>
          </v-calendar>
        </v-card>
      </v-flex> -->

        <v-flex xs12 md7>
          <v-card>
            <v-toolbar card dense dark color="primary">
              <v-toolbar-title
                ><h4 class="font-weight-light">
                  Notices closing in {{ currentMonth }}
                </h4></v-toolbar-title
              >
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider />

            <v-data-table
              :items="currentSolicitations"
              :headers="headers"
              :expand="expand"
              item-key="_id"
            >
              <template v-slot:items="props">
                <tr @click="props.expanded = !props.expanded">
                  <td>{{ props.item.closeDate }}</td>
                  <td>{{ props.item.noticeTitle }}</td>
                  <td>{{ props.item.mdeContactEmail }}</td>
                </tr>
              </template>
              <template slot="expand" slot-scope="props">
                <v-card flat color="light-blue lighten-5">
                  <v-card-text v-text="props.item.noticeText" />
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
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      open: false,
      headers: [
        {
          text: 'Close Date',
          align: 'left',
          value: 'closeDate',
          sortable: false
        },

        {
          text: 'Title',
          align: 'left',
          value: 'solicitationTitle',
          sortable: false
        },

        {
          text: 'Email',
          align: 'left',
          value: 'solicitationEmail',
          sortable: false
        }
      ],
      notifications: [
        {
          iconColor: 'success',
          icon: 'notifications',
          title: 'Admin',
          text: 'New invoice received'
        },
        {
          iconColor: 'primary',
          icon: 'format_quote',
          title: 'Feedback',
          text: 'New feedback from Kat'
        },
        {
          iconColor: 'error',
          icon: 'warning',
          title: 'Error',
          text: 'Site not responding'
        },
        {
          iconColor: 'warning',
          icon: 'alarm',
          title: 'Timeout',
          text: 'Check connection'
        }
      ],
      date: new Date().toISOString().substr(0, 10),
      pickerDate: null
    }
  },
  layout: 'procurement',
  computed: {
    ...mapGetters({ solicitations: 'getSolicitations' }),
    currentSolicitations() {
      return this.solicitations.filter(item =>
        this.$moment(item.closeDate).isSame(
          this.$moment(this.pickerDate, 'YYYY MM'),
          'month'
        )
      )
    },
    currentMonth() {
      return this.$moment(this.pickerDate, 'YYYY-MM').format('MMMM YYYY')
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('callSolicitations')
  },
  mounted() {
    this.start = this.$moment().format('YYYY-MM-DD')
  },
  methods: {
    closingSolicitations(date) {
      const currentMonthSolicitations = this.solicitations
        .filter(item =>
          this.$moment(item.closeDate).isSame(this.$moment(date), 'day')
        )
        .map(value => value.closeDate)
      if (currentMonthSolicitations.includes(date)) {
        if (this.$moment(date).isBefore(this.$moment())) return ['error']
        else return ['warning']
      }
      return false
    },
    create() {
      this.tasks.push({
        done: false,
        text: this.task
      })

      this.task = null
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>
