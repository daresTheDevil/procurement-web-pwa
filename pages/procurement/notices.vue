<template>
  <div>
    <v-container fluid class="pb-0">
      <h1 class="display-1">Solicitations</h1>
    </v-container>
    <v-container grid-list-lg fluid class="pb-0">
      <v-layout row>
        <v-flex>
          <v-dialog v-model="deleteDialog" max-width="400">
            <v-card color="error" dark>
              <v-card-text>
                <h1 class="body-1">
                  Are you sure you want to delete this notice?
                </h1>
              </v-card-text>
              <v-card-actions>
                <v-btn dark outline @click="deleteDialog = false">Cancel</v-btn>
                <v-btn light @click="deleteItem()">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card color="white" height="100%">
              <v-toolbar prominent extended dark color="primary">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                <v-layout slot="extension" class="justify-center">
                  <v-list class="transparent">
                    <v-list-tile
                      :class="step === 1 ? 'primary lighten-1' : 'transparent'"
                    >
                      <v-list-tile-avatar
                        size="36"
                        :color="step > 1 ? 'success' : 'info'"
                        class="white--text font-weight-bold"
                        ><v-icon v-if="step > 1">mdi-check</v-icon
                        ><span v-else>1</span></v-list-tile-avatar
                      >
                      <v-list-tile-content>
                        <v-list-tile-sub-title class="caption">
                          Step One
                        </v-list-tile-sub-title>
                        <v-list-tile-title class="subheading font-weight-bold">
                          Contact Information
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                  <v-list class="transparent">
                    <v-list-tile
                      :class="step === 2 ? 'primary lighten-1' : 'transparent'"
                    >
                      <v-list-tile-avatar
                        size="36"
                        :color="step > 2 ? 'success' : 'info'"
                        class="white--text font-weight-bold"
                        ><v-icon v-if="step > 2">mdi-check</v-icon
                        ><span v-else>2</span></v-list-tile-avatar
                      >
                      <v-list-tile-content>
                        <v-list-tile-sub-title class="caption">
                          Step Two
                        </v-list-tile-sub-title>
                        <v-list-tile-title class="subheading font-weight-bold">
                          Notification Information
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                  <v-list class="transparent">
                    <v-list-tile
                      :class="step === 3 ? 'primary lighten-1' : 'transparent'"
                    >
                      <v-list-tile-avatar
                        size="36"
                        :color="step > 3 ? 'success' : 'info'"
                        class="white--text font-weight-bold"
                        ><v-icon v-if="step > 3">mdi-check</v-icon
                        ><span v-else>3</span></v-list-tile-avatar
                      >
                      <v-list-tile-content>
                        <v-list-tile-sub-title class="caption">
                          Step Three
                        </v-list-tile-sub-title>
                        <v-list-tile-title class="subheading font-weight-bold">
                          Upload Files
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                  <v-list class="transparent">
                    <v-list-tile
                      :class="step === 4 ? 'primary lighten-1' : 'transparent'"
                    >
                      <v-list-tile-avatar
                        size="36"
                        color="info"
                        class="white--text font-weight-bold"
                        >4</v-list-tile-avatar
                      >
                      <v-list-tile-content>
                        <v-list-tile-sub-title class="caption">
                          Step Four
                        </v-list-tile-sub-title>
                        <v-list-tile-title class="subheading font-weight-bold">
                          Notification Verification
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-layout>
              </v-toolbar>

              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-card-text>
                    <v-container fill-height>
                      <v-layout fill-height row justify-center align-center>
                        <v-flex xs8>
                          <h1>Contact Information</h1>
                          <br />
                          <v-text-field
                            v-model="editedItem.mdeContactFirstName"
                            outline
                            label="MDE Contact First Name"
                          />
                          <v-text-field
                            v-model="editedItem.mdeContactLastName"
                            outline
                            label=" MDE Contact Last Name"
                          />
                          <v-text-field
                            v-model="editedItem.mdeContactEmail"
                            outline
                            label="MDE Contact Email"
                          />
                          <v-text-field
                            v-model="editedItem.mdeContactPhone"
                            outline
                            label="MDE Contact Phone"
                            type="tel"
                            mask="phone"
                          />
                          <v-select
                            v-model="editedItem.programOffice"
                            outline
                            label="Select program office"
                            :items="programOffices"
                          />
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                </v-window-item>
                <v-window-item :value="2">
                  <v-card-text>
                    <v-container fill-height>
                      <v-layout fill-height row justify-center align-center>
                        <v-flex xs8>
                          <h1>Notification Information</h1>
                          <br />
                          <v-text-field
                            v-model="editedItem.noticeTitle"
                            outline
                            label="Notice Title"
                          />
                          <v-textarea
                            v-model="editedItem.noticeText"
                            outline
                            label="Notice Summary"
                          />
                          <v-select
                            v-model="editedItem.requestType"
                            outline
                            label="Request Type"
                            :items="['RFA', 'RFP', 'IFB']"
                          />
                          <v-select
                            v-model="editedItem.noticeType"
                            outline
                            label="Notice Type"
                            :items="['Contract', 'Grant']"
                          />
                          <v-text-field outline label="Notice ID" />
                          <v-layout row>
                            <v-flex class="mr-1">
                              <v-menu
                                ref="openDateMenu"
                                v-model="openDateMenu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="editedItem.openDate"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="editedItem.openDate"
                                    outline
                                    label="Select notice open date"
                                    append-icon="event"
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="editedItem.openDate"
                                  no-title
                                  scrollable
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    flat
                                    color="primary"
                                    @click="openDateMenu = false"
                                    >Cancel</v-btn
                                  >
                                  <v-btn
                                    flat
                                    color="primary"
                                    @click="
                                      $refs.openDateMenu.save(
                                        editedItem.openDate
                                      )
                                    "
                                    >OK</v-btn
                                  >
                                </v-date-picker>
                              </v-menu>
                            </v-flex>
                            <v-flex class="ml-1">
                              <v-menu
                                ref="closeDateMenu"
                                v-model="closeDateMenu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="editedItem.closeDate"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="editedItem.closeDate"
                                    outline
                                    label="Select notice close date"
                                    append-icon="event"
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="editedItem.closeDate"
                                  no-title
                                  scrollable
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    flat
                                    color="primary"
                                    @click="closeDateMenu = false"
                                    >Cancel</v-btn
                                  >
                                  <v-btn
                                    flat
                                    color="primary"
                                    @click="
                                      $refs.closeDateMenu.save(
                                        editedItem.closeDate
                                      )
                                    "
                                    >OK</v-btn
                                  >
                                </v-date-picker>
                              </v-menu>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                </v-window-item>
                <v-window-item :value="3">
                  <v-card-text>
                    <v-container fill-height>
                      <v-layout fill-height row justify-center align-center>
                        <v-flex xs8>
                          <h1>Upload Files</h1>
                          <br />
                          <v-card
                            dark
                            :color="dragging ? 'success' : 'info'"
                            hover
                            class="mx-5"
                            :class="dragging ? 'elevation-10' : 'elevation-0'"
                          >
                            <!-- @drop.stop.prevent="handleDragDropUpload"
                        @dragenter.stop.prevent="dragging = true"
                        @dragover.stop.prevent="dragging = true"
                        @dragleave.stop.prevent="dragging = false"
                        @click="addFiles" -->
                            <v-card-text
                              class="text--white text-xs-center"
                              style="border-style: dashed border-color: coral; border-width: 7px;"
                            >
                              <v-icon size="64">mdi-cloud-upload</v-icon>
                              <h2>
                                Click or drag and drop files here
                              </h2>
                            </v-card-text>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                </v-window-item>
                <v-window-item :value="4">
                  <v-card-text>
                    <v-container fill-height grid-list-md>
                      <v-layout fill-height row justify-center align-center>
                        <v-flex xs8>
                          <h1>Verify Information</h1>
                          <br />
                          <v-container fluid class="py-0">
                            <v-layout row wrap>
                              <v-flex xs6>
                                <v-card>
                                  <v-toolbar dense card light>
                                    <h3>MDE Contact Information:</h3>
                                  </v-toolbar>
                                  <v-divider />
                                  <v-card-text>
                                    <v-list subheader>
                                      <v-list-tile>
                                        <v-list-tile-content>
                                          <v-list-tile-sub-title
                                            >MDE Program
                                            Office:</v-list-tile-sub-title
                                          >
                                          <v-list-tile-title>{{
                                            editedItem.programOffice
                                          }}</v-list-tile-title>
                                        </v-list-tile-content>
                                      </v-list-tile>
                                      <v-list-tile>
                                        <v-list-tile-content>
                                          <v-list-tile-sub-title
                                            >MDE Contact
                                            Name:</v-list-tile-sub-title
                                          >
                                          <v-list-tile-title
                                            >{{
                                              editedItem.mdeContactFirstName
                                            }}
                                            {{
                                              editedItem.mdeContactLastName
                                            }}</v-list-tile-title
                                          >
                                        </v-list-tile-content>
                                      </v-list-tile>
                                      <v-list-tile>
                                        <v-list-tile-content>
                                          <v-list-tile-sub-title
                                            >Vendor Contact
                                            Email:</v-list-tile-sub-title
                                          >
                                          <v-list-tile-title
                                            >{{ editedItem.mdeContactEmail }}
                                          </v-list-tile-title>
                                        </v-list-tile-content>
                                      </v-list-tile>
                                      <v-list-tile>
                                        <v-list-tile-content>
                                          <v-list-tile-sub-title
                                            >MDE Contact
                                            Phone:</v-list-tile-sub-title
                                          >
                                          <v-list-tile-title
                                            >{{ editedItem.mdeContactPhone }}
                                          </v-list-tile-title>
                                        </v-list-tile-content>
                                      </v-list-tile>
                                    </v-list>
                                  </v-card-text>
                                </v-card>
                              </v-flex>

                              <v-flex xs6>
                                <v-card>
                                  <v-toolbar card light dense>
                                    <h3>
                                      {{ editedItem.noticeType }} Information:
                                    </h3>
                                  </v-toolbar>
                                  <v-divider />
                                  <v-card-text>
                                    <v-list subheader>
                                      <v-list-tile>
                                        <v-list-tile-content>
                                          <v-list-tile-sub-title
                                            >Title:</v-list-tile-sub-title
                                          >
                                          <v-list-tile-title>{{
                                            editedItem.noticeTitle
                                          }}</v-list-tile-title>
                                        </v-list-tile-content>
                                      </v-list-tile>
                                      <v-list-tile>
                                        <v-list-tile-content>
                                          <v-list-tile-sub-title
                                            >Text:</v-list-tile-sub-title
                                          >
                                          <v-list-tile-title>{{
                                            editedItem.noticeText
                                          }}</v-list-tile-title>
                                        </v-list-tile-content>
                                      </v-list-tile>
                                      <v-list-tile>
                                        <v-list-tile-content>
                                          <v-list-tile-sub-title
                                            >Open Date:</v-list-tile-sub-title
                                          >
                                          <v-list-tile-title>{{
                                            editedItem.openDate
                                          }}</v-list-tile-title>
                                        </v-list-tile-content>
                                      </v-list-tile>
                                      <v-list-tile>
                                        <v-list-tile-content>
                                          <v-list-tile-sub-title
                                            >Close Date:</v-list-tile-sub-title
                                          >
                                          <v-list-tile-title>{{
                                            editedItem.closeDate
                                          }}</v-list-tile-title>
                                        </v-list-tile-content>
                                      </v-list-tile>
                                    </v-list>
                                  </v-card-text>
                                </v-card>
                              </v-flex>

                              <v-flex xs6>
                                <v-card>
                                  <v-toolbar card light dense>
                                    <h3>Attached Files:</h3>
                                  </v-toolbar>
                                  <v-divider />
                                  <v-card-text>
                                    <v-list subheader>
                                      <v-list-tile
                                        v-for="file in files"
                                        :key="file.filename"
                                      >
                                        <v-list-tile-content>
                                          <v-list-tile-sub-title
                                            >Title:</v-list-tile-sub-title
                                          >
                                          <v-list-tile-title class="caption">{{
                                            file.name
                                          }}</v-list-tile-title>
                                        </v-list-tile-content>
                                      </v-list-tile>
                                    </v-list>
                                  </v-card-text>
                                </v-card>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                </v-window-item>
              </v-window>
            </v-card>
            <v-footer light height="auto" absolute>
              <v-layout justify-center>
                <v-btn color="error" flat large round @click="step--"
                  ><v-icon left>mdi-chevron-left</v-icon>Back</v-btn
                >
                <v-btn
                  v-if="step < 4"
                  class="primary"
                  flat
                  large
                  round
                  @click="step++"
                  >{{ buttonText
                  }}<v-icon right>{{
                    step === 4 ? 'mdi-cloud-upload' : 'mdi-chevron-right'
                  }}</v-icon></v-btn
                >
                <v-btn
                  v-if="step === 4"
                  class="primary"
                  flat
                  large
                  round
                  @click="save"
                  >{{ buttonText
                  }}<v-icon right>{{
                    step === 4 ? 'mdi-cloud-upload' : 'mdi-chevron-right'
                  }}</v-icon></v-btn
                >
              </v-layout>
            </v-footer>
          </v-dialog>

          <v-card>
            <v-toolbar card light>
              <v-btn-toggle v-model="filter" class="transparent mr-2">
                <v-btn :value="0" large flat>
                  <v-avatar
                    size="24"
                    class="mr-2 white--text"
                    color="primary"
                    dark
                    >{{ solicitations.length }}</v-avatar
                  >
                  All
                </v-btn>
                <v-btn :value="1" large flat>
                  <v-avatar
                    size="24"
                    class="mr-2 white--text"
                    color="secondary"
                    dark
                    >{{ openSolicitations.length }}</v-avatar
                  >
                  Open
                </v-btn>
                <v-btn :value="2" large flat>
                  <v-avatar
                    size="24"
                    class="mr-2 white--text"
                    color="error"
                    dark
                    >{{ closedSolicitations.length }}</v-avatar
                  >
                  Closed
                </v-btn>
              </v-btn-toggle>
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
              <v-spacer />
              <v-btn color="primary" @click="addItem">Add new</v-btn>
            </v-toolbar>
            <v-data-table
              :items="filteredSolicitations"
              :search="search"
              :headers="headers"
              item-key="_id"
            >
              <template v-slot:headers="props">
                <tr class="primary">
                  <th
                    v-for="header in props.headers"
                    :key="header.text"
                    class="white--text text-xs-left"
                  >
                    {{ header.text }}
                  </th>
                </tr>
              </template>
              <template v-slot:items="props">
                <tr>
                  <td width="200">{{ props.item._id }}</td>
                  <td>
                    {{ props.item.noticeTitle }}
                  </td>
                  <td width="200">
                    <v-chip small>{{ props.item.requestType }}</v-chip
                    ><v-chip small>{{ props.item.noticeType }}</v-chip>
                  </td>
                  <!-- <td>{{ props.item.solicitationType }}</td> -->
                  <td width="250">
                    {{ props.item.mdeContactFirstName }}
                    {{ props.item.mdeContactLastName }}<br />{{
                      props.item.mdeContactEmail
                    }}
                  </td>
                  <!-- <td>{{ props.item.mdeContactEmail }}</td> -->
                  <td width="100" class="text-xs-center">
                    {{ new Date(props.item.openDate).toLocaleDateString() }}
                  </td>
                  <td
                    width="100"
                    :class="
                      $moment(props.item.closeDate).isBefore($moment())
                        ? 'red--text red lighten-5 font-weight-bold'
                        : ''
                    "
                    class="text-xs-center"
                  >
                    {{ new Date(props.item.closeDate).toLocaleDateString() }}
                  </td>
                  <td
                    width="50"
                    class="text-xs-right justify-between-around align-center layout"
                  >
                    <v-menu offset-y left bottom>
                      <v-btn slot="activator" icon>
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                      <v-list class="py-0">
                        <v-list-tile @click="editItem(props.item)">
                          <v-list-tile-avatar
                            ><v-icon>mdi-pencil</v-icon></v-list-tile-avatar
                          >
                          <v-list-tile-content>
                            <v-list-tile-title class="subheading"
                              >Edit</v-list-tile-title
                            >
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile @click="handleFileDelete(props.item)">
                          <v-list-tile-avatar
                            ><v-icon>mdi-delete</v-icon></v-list-tile-avatar
                          >
                          <v-list-tile-title class="subheading"
                            >Delete</v-list-tile-title
                          >
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </td>
                  <!--   <v-btn flat icon color="grey" @click="editItem(props.item)">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn flat icon color="grey">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </td>
                <td class="justify-space-between align-center layout">
                  <v-btn small icon>
                    <v-icon
                      color="amber darken-2"
                      @click="editItem(props.item)"
                    >
                      edit
                    </v-icon>
                  </v-btn>
                  <v-dialog v-model="fileDialog" max-width="400">
                    <v-icon slot="activator" color="red">delete</v-icon>
                    <v-card color="error" dark>
                      <v-card-text>
                        <h1 class="body-1">Are you sure you want to delete</h1>
                        <h1 class="body-2">
                          {{ props.item.noticeTitle }}
                        </h1>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn light @click="deleteItem(props.item)"
                          >Delete</v-btn
                        >
                        <v-btn dark outline @click="fileDialog = false"
                          >Cancel</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </td> -->
                </tr>
              </template>
              <v-alert
                v-slot:no-results
                :value="true"
                color="error"
                icon="warning"
              >
                Your search for "{{ search }}" found no results.
              </v-alert>
              <template v-slot:expand="props">
                <v-card flat color="light-blue lighten-5">
                  <v-card-text v-text="props.item.noticeText" />
                </v-card>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
      <v-snackbar v-model="snackbar" multi-line top :color="snackColor">{{
        snackMessage
      }}</v-snackbar>
    </v-container>
  </div>
</template>

<script>
import feathers from '@/plugins/feathers'
import { mapGetters } from 'vuex'
import axios from 'axios'
// import SolicitationInput from '@/components/SolicitationInput.vue'

export default {
  components: {
    // SolicitationInput
  },
  data() {
    return {
      agreement: false,
      testModel: '',
      step: 1,
      snackbar: false,
      results: [],
      snackColor: '',
      snackMessage: '',
      filter: 0,
      bio:
        'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts',
      email: undefined,
      form: false,
      isLoading: false,
      password: undefined,
      phone: undefined,
      rules: {
        email: v => (v || '').match(/@/) || 'Please enter a valid email',
        length: len => v =>
          (v || '').length >= len ||
          `Invalid character length, required ${len}`,
        password: v =>
          (v || '').match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
          ) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
        required: v => !!v || 'This field is required'
      },
      search: '',
      deleteDialog: false,
      dialog: false,
      editedIndex: -1,
      programOffices: [
        { text: 'OTSS', value: 1 },
        { text: 'CTE', value: 2 },
        { text: 'SPED', value: 3 }
      ],
      mdeOffices: ['OTSS', 'CTE', 'SPED'],
      defaultItem: {
        noticeTitle: '',
        noticeType: '',
        mdeContactFirstName: '',
        mdeContactLastName: '',
        mdeContactEmail: '',
        programOffice: '',
        mdeContactPhone: '',
        requestType: '',
        noticeText: '',
        openDate: '',
        closeDate: ''
      },
      editedItem: {
        mdeContactFirstName: '',
        mdeContactLastName: '',
        mdeContactPhone: '',
        mdeContactEmail: '',
        programOffice: '',
        noticeTitle: '',
        noticeText: '',
        noticeType: '',
        requestType: '',
        openDate: '',
        closeDate: ''
      },
      expand: false,
      requestTypes: [
        {
          type: 'IFB',
          description: 'Vendor submissions awarded by lowest bid.'
        },
        {
          type: 'RFA',
          description:
            'Vendor submissions of experience and qualifications and awarded based on weighted criteria.'
        },
        {
          type: 'RFP',
          description:
            'Vendor submits ability and deliverables awarded based on weighted criteria.'
        },
        {
          type: 'RFQ',
          description:
            'Vendor submits qualitifications and ability to perform awarded based on weighted criteria.  '
        }
      ],
      priceThresholds: [
        { text: '< $5,000.00', value: 1 },
        { text: '$5,000.01 to $50,000.00', value: 2 },
        { text: '$50,000.01 to $75,000.01', value: 3 }
      ],
      thresholdSelected: '',
      solicitationTypes: ['Contract', 'Grant'],
      solicitationType: '',
      dragging: false,
      solicitationName: '',
      openDateMenu: false,
      closeDateMenu: false,
      fileToDelete: '',
      openDate: '',
      closeDate: '',
      programOffice: '',
      noticeTitle: '',
      noticeText: '',
      mdeContactFirstName: '',
      mdeContactLastName: '',
      mdeContactPhone: '',
      mdeContactEmail: '',
      noticeType: '',

      menu: false,
      closeMenu: false,
      headers: [
        {
          text: 'Solicitation ID',
          align: 'left',
          value: '_id'
        },
        {
          text: 'Title',
          align: 'left',
          value: 'noticeTitle'
        },
        {
          text: 'Request Type',
          align: 'left',
          value: 'requestType'
        },
        // {
        //   text: 'Type',
        //   align: 'left',
        //   value: 'solicitationType'
        // },
        {
          text: 'Contact',
          align: 'left',
          value: 'solicitationName'
        },
        // {
        //   text: 'Email',
        //   align: 'left',
        //   value: 'mdeContactEmail'
        // },
        {
          text: 'Open Date',
          align: 'center',
          value: 'openDate'
        },
        {
          text: 'Close Date',
          align: 'center',
          value: 'closeDate'
        },
        {
          text: 'Action',
          align: 'right',
          value: ''
        }
      ]
    }
  },
  layout: 'procurement',
  computed: {
    formattedOpenDate() {
      return this.editedItem.openDate
        ? this.$moment(this.editedItem.openDate).format('dddd, MMMM Do YYYY')
        : ''
      // return new Date(this.openDate).toLocaleTimeString()
    },
    formattedCloseDate() {
      return this.editedItem.closeDate
        ? this.$moment(this.editedItem.closeDate).format('dddd, MMMM Do YYYY')
        : ''
      // return new Date(this.openDate).toLocaleTimeString()
    },
    ...mapGetters({ solicitations: 'getSolicitations' }),
    filteredSolicitations() {
      if (this.filter === 0) return this.results
      else if (this.filter === 1) return this.openSolicitations
      else return this.closedSolicitations
    },
    openSolicitations() {
      return this.results.filter(item =>
        this.$moment(item.closeDate).isAfter(this.$moment())
      )
    },
    closedSolicitations() {
      return this.results.filter(item =>
        this.$moment(item.closeDate).isBefore(this.$moment())
      )
    },
    requestType() {
      if (this.thresholdSelected === 1)
        return [
          { text: '< $5,000.00', value: 1 },
          { text: '$5,000.01 to $50,000.00', value: 2 },
          { text: '$50,000.01 to $75,000.01', value: 3 }
        ]
      else if (this.thresholdSelected === 2)
        return [
          { text: '< $5,000.00', value: 1 },
          { text: '$5,000.01 to $50,000.00', value: 2 }
        ]
      return [{ text: '< $5,000.00', value: 1 }]
    },
    formTitle() {
      return this.editedIndex === -1 ? 'Add New Notice' : 'Editing Notice'
    },
    stepTitle() {
      switch (this.step) {
        case 1:
          return 'MDE Program Office Contact'
        case 2:
          return 'Solicitation Information'
        case 3:
          return 'Solicitation Details'
        default:
          return 'Account created'
      }
    },

    buttonText() {
      if (this.step === 4) return 'Save notification'
      return 'next'
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
          item.noticeTitle.toLowerCase().indexOf(this.search.toLowerCase()) >
            -1 ||
          item._id.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          item.noticeText.toLowerCase().indexOf(this.search.toLowerCase()) >
            -1 ||
          item.mdeContactEmail
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1
      )
    },
    submit() {
      const formData = new FormData()

      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i]
        formData.append('uri', file)
      }

      formData.append('uri')
      formData.append(Object.assign({}, this.editedItem))

      // formData.append('vendorName', this.vendorName)
      // formData.append('contactFirstName', this.contactFirstName)
      // formData.append('contactLastName', this.contactLastName)
      // formData.append('contactEmail', this.contactEmail)
      // formData.append('contactPhone', this.contactPhone)
      // formData.append('noticeTitle', this.noticeTitle)
      // formData.append('noticeText', this.noticeText)

      axios
        .post(
          'http://0.0.0.0:3030/submissions',
          // 'https://mde-procurement-api.azurewebsites.net/submissions',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
            // onUploadProgress: function(progressEvent) {
            //   this.uploadPercentage = parseInt(
            //     Math.round((progressEvent.loaded * 100) / progressEvent.total)
            //   );
            // }.bind(this)
          }
        )
        .then(response => {
          // eslint-disable-next-line no-console
          console.log('response files', response.data.files)
          this.uploadedFiles = response.data.files
          this.uploadId = response.data._id
          this.submissionTime = response.data.createdAt
          this.formResponse = response.data
          // this.step = 6
        })
        .catch(function() {
          this.loading = false
        })
    },
    editItem(item) {
      this.editedIndex = this.solicitations.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    addItem() {
      this.dialog = true
    },
    handleFileDelete(file) {
      this.deleteDialog = true
      this.fileToDelete = file._id
    },
    deleteItem() {
      return feathers
        .service('solicitations')
        .remove(this.fileToDelete)
        .then(message => {
          this.fetchSolicitations()
          this.deleteDialog = false
        })
    },
    save() {
      if (this.editedIndex > -1) {
        this.updateSolicitation()
      } else this.addSolicitation()
    },
    updateSolicitation() {
      const editedItem = this.editedItem
      return feathers
        .service('solicitations')
        .update(editedItem._id, {
          noticeTitle: editedItem.noticeTitle,
          mdeContactFirstName: editedItem.mdeContactFirstName,
          mdeContactLastName: editedItem.mdeContactLastName,
          mdeContactPhone: editedItem.mdeContactPhone,
          mdeContactEmail: editedItem.mdeContactEmail,
          requestType: editedItem.requestType,
          noticeType: editedItem.noticeType,
          noticeText: editedItem.noticeText,
          openDate: editedItem.openDate,
          closeDate: editedItem.closeDate,
          programOffice: editedItem.programOffice
        })
        .then(response => {
          this.showSnack(
            'success',
            response.noticeTitle + ' updated successfully!'
          )
          this.fetchSolicitations()
          this.clearInput()
          this.dialog = false
        })
    },
    addSolicitation() {
      const editedItem = this.editedItem
      return feathers
        .service('solicitations')
        .create({
          noticeTitle: editedItem.noticeTitle,
          mdeContactFirstName: editedItem.mdeContactFirstName,
          mdeContactLastName: editedItem.mdeContactLastName,
          mdeContactPhone: editedItem.mdeContactPhone,
          mdeContactEmail: editedItem.mdeContactEmail,
          requestType: editedItem.requestType,
          noticeType: editedItem.noticeType,
          noticeText: editedItem.noticeText,
          programOffice: editedItem.programOffice,
          openDate: editedItem.openDate,
          closeDate: editedItem.closeDate
        })
        .then(response => {
          this.showSnack(
            'success',
            response.noticeTitle + ' created successfully!'
          )
          this.fetchSolicitations()
          this.clearInput()
          this.dialog = false
        })
    },
    fetchSolicitations() {
      this.$store.dispatch('callSolicitations')
      this.results = this.solicitations
      this.step = 1
    },
    showSnack(color, message) {
      this.snackColor = color
      this.snackMessage = message
      this.snackbar = true
    },
    clearInput() {
      this.editedItem.noticeTitle = ''
      this.editedItem.mdeContactFirstName = ''
      this.editedItem.mdeContactLastName = ''
      this.editedItem.mdeContactPhone = ''
      this.editedItem.mdeContactEmail = ''
      this.editedItem.requestType = ''
      this.editedItem.noticeType = ''
      this.editedItem.programOffice = ''
      this.editedItem.noticeText = ''
      this.editedItem.openDate = ''
      this.editedItem.closeDate = ''
      this.noticeTitle = ''
      this.mdeContactFirstName = ''
      this.mdeContactLastName = ''
      this.mdeContactPhone = ''
      this.mdeContactEmail = ''
      this.requestType = ''
      this.noticeType = ''
      this.noticeText = ''
      this.openDate = ''
      this.closeDate = ''
      // this.noticeTitle = '',
      // this.solicitationType = '',
      // this.requestType = '',
      // this.solicitationName = '',
      // this.mdeContactEmail = '',
      // this.mdeContactPhone = '',
      // this.noticeText = '',
      // this.openDate = '',
      // this.closeDate = '',
      // this.editedItem.noticeTitle = '',
      // this.editedItem.solicitationType = '',
      // this.editedItem.requestType = '',
      // this.editedItem.solicitationName = '',
      // this.editedItem.mdeContactEmail = '',
      // this.editedItem.mdeContactPhone = '',
      // this.editedItem.noticeText = '',
      // this.editedItem.openDate = '',
      // this.editedItem.closeDate = ''
    }
  }
}
</script>

<style></style>
