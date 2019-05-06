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
            <h1 style="font-size: 3rem;">Want to do business with MDE?</h1>
            <h2 class="font-weight-regular">
              The Office of Procurement facilitates the procurement of goods and
              services necessary for the effective and efficient operation of
              the Mississippi Department of Education (MDE).
            </h2>
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
              <!-- <v-flex shrink class="py-0">
                <v-tabs v-model="filter" height="64">
                  <v-tabs-slider height="10" color="primary" />
                  <v-tab value="all">
                    <v-avatar
                      size="24"
                      class="mr-2 white--text"
                      color="secondary"
                      dark
                      >{{ results.length }}</v-avatar
                    >
                    All
                  </v-tab>
                  <v-tab value="contracts">
                    <v-avatar
                      size="24"
                      class="mr-2 white--text"
                      color="accent"
                      dark
                      >{{ contractsCount }}</v-avatar
                    >
                    Contracts
                  </v-tab>
                  <v-tab value="grants">
                    <v-avatar
                      size="24"
                      class="mr-2 white--text"
                      color="info"
                      dark
                      >{{ grantsCount }}</v-avatar
                    >
                    Grants
                  </v-tab>
                </v-tabs>
              </v-flex> -->
              <v-flex shrink>
                <v-btn-toggle
                  v-model="filter"
                  mandatory
                  class="transparent mr-2"
                >
                  <v-btn value="all" large flat>
                    <v-avatar
                      size="24"
                      class="mr-2 white--text"
                      color="primary"
                      dark
                      >{{ results.length }}</v-avatar
                    >
                    All
                  </v-btn>
                  <v-btn flat value="contracts" large>
                    <v-avatar
                      size="24"
                      class="mr-2 white--text"
                      color="secondary"
                      dark
                      >{{ contractsCount }}</v-avatar
                    >
                    Contracts
                  </v-btn>
                  <v-btn flat value="grants" large>
                    <v-avatar
                      size="24"
                      class="mr-2 white--text"
                      color="error"
                      dark
                      >{{ grantsCount }}</v-avatar
                    >
                    Grants
                  </v-btn>
                </v-btn-toggle>
              </v-flex>
              <!-- <v-select
                  v-model="filter"
                  hide-details
                  :items="solicitationTypes"
                  solo
                  menu-props="overflowY"
                  light
                  background-color="grey lighten-2"
                  flat
                  label="Solicitation type"
                />
                -->

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

          <v-layout row justify-center>
            <v-flex xs6>
              <v-card
                v-if="results.length === 0"
                color="error"
                flat
                dark
                class="mb-3"
              >
                <v-container grid-list-md class="py-2">
                  <v-layout row align-center>
                    <v-flex shrink>
                      <v-icon large>mdi-alert-decagram</v-icon>
                    </v-flex>
                    <v-flex class="text-xs-left">
                      No open solicitations match your search results.
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout column>
            <v-flex v-for="item in filteredSolicitations" :key="item.openDate">
              <v-card>
                <v-card-text>
                  <v-layout row>
                    <v-flex xs10>
                      <div class="mb-2">
                        <v-chip small dark color="info">{{
                          item.noticeType
                        }}</v-chip>
                      </div>
                      <h1 class="title">{{ item.noticeTitle }}</h1>
                      <v-divider class="my-2" />
                      {{ item.noticeText }}
                    </v-flex>
                    <v-flex xs2>
                      <h1 class="body-1 font-weight-bold">
                        Notice Type:<span class="body-1">
                          {{ item.requestType }}</span
                        >
                      </h1>
                      <h1 class="body-1 font-weight-bold">
                        Solicitation Type:<span class="body-1">
                          {{ item.noticeType }}</span
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
                      <v-btn block small round depressed color="primary"
                        >See details</v-btn
                      >
                      <v-btn
                        block
                        round
                        small
                        depressed
                        color="primary"
                        @click="editItem(item)"
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
                    item.noticeTitle
                  }}</v-card-title>
                  <v-divider />
                  <v-card-text>
                    {{ item.noticeText }}
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
          <v-toolbar-title>Creating Response:</v-toolbar-title>
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
                    Getting Started
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
                    Vendor Contact Information
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
                    Attach Supporting Documents
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
                    Verify Response Information
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
                    <h1>Getting started</h1>
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
                    <h1>Vendor Contact Information</h1>
                    <br />
                    <v-text-field
                      v-model="editedItem.vendorName"
                      outline
                      label="Vendor/Company/DBA Name"
                    />
                    <v-text-field
                      v-model="editedItem.vendorContactFirstName"
                      outline
                      label="Vendor Contact First Name"
                    />
                    <v-text-field
                      v-model="editedItem.vendorContactLastName"
                      outline
                      label="Vendor Contact Last Name"
                    />
                    <v-text-field
                      v-model="editedItem.vendorContactEmail"
                      outline
                      label="Vendor Contact Email"
                    />
                    <v-text-field
                      v-model="editedItem.vendorContactPhone"
                      outline
                      label="Vendor Contact Phone"
                      type="tel"
                      mask="phone"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-window-item>
          <!-- <v-window-item :value="2">
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
                                $refs.openDateMenu.save(editedItem.openDate)
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
                                $refs.closeDateMenu.save(editedItem.closeDate)
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
          </v-window-item> -->
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
                      @drop.stop.prevent="handleDragDropUpload"
                      @dragenter.stop.prevent="dragging = true"
                      @dragover.stop.prevent="dragging = true"
                      @dragleave.stop.prevent="dragging = false"
                      @click="addFiles"
                    >
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
                    <v-slide-y-transition>
                      <v-card
                        v-if="files.length > 0"
                        color="info"
                        class="mx-5"
                        flat
                      >
                        <v-card-text>
                          <v-list
                            v-for="(file, x) in files"
                            :key="x"
                            dense
                            light
                          >
                            <v-list-tile>
                              <v-list-tile-content>
                                <v-list-tile-sub-title
                                  >Filename:</v-list-tile-sub-title
                                >
                                <v-list-tile-title>{{
                                  file.name
                                }}</v-list-tile-title>
                              </v-list-tile-content>

                              <v-list-tile-action>
                                <v-icon
                                  color="error"
                                  @click="handleFileDelete(file)"
                                  >mdi-delete</v-icon
                                >
                              </v-list-tile-action>
                            </v-list-tile>
                          </v-list>
                        </v-card-text>
                      </v-card>
                    </v-slide-y-transition>
                    <v-dialog v-model="fileDeleteDialog" width="400">
                      <v-card color="error" dark>
                        <v-card-title><h2>Delete File?</h2></v-card-title>
                        <v-card-actions class="justify-space-between">
                          <v-btn
                            light
                            color="white"
                            depressed
                            @click="fileDeleteDialog = false"
                            >Cancel</v-btn
                          >
                          <v-btn color="white" outline @click="deleteFile"
                            >Delete it</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
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
                            <v-toolbar dense light card>
                              <h3>Vendor Contact Information:</h3>
                            </v-toolbar>
                            <v-divider />
                            <v-card-text>
                              <v-list subheader>
                                <v-list-tile>
                                  <v-list-tile-content>
                                    <v-list-tile-sub-title
                                      >Vendor/DBA Name:</v-list-tile-sub-title
                                    >
                                    <v-list-tile-title>{{
                                      editedItem.vendorName
                                    }}</v-list-tile-title>
                                  </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                  <v-list-tile-content>
                                    <v-list-tile-sub-title
                                      >Vendor Contact
                                      Name:</v-list-tile-sub-title
                                    >
                                    <v-list-tile-title
                                      >{{ editedItem.vendorContactFirstName }}
                                      {{
                                        editedItem.vendorContactLastName
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
                                      >{{ editedItem.vendorContactEmail }}
                                    </v-list-tile-title>
                                  </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                  <v-list-tile-content>
                                    <v-list-tile-sub-title
                                      >Vendor Contact
                                      Phone:</v-list-tile-sub-title
                                    >
                                    <v-list-tile-title
                                      >{{ editedItem.vendorContactPhone }}
                                    </v-list-tile-title>
                                  </v-list-tile-content>
                                </v-list-tile>
                              </v-list>
                            </v-card-text>
                          </v-card>
                        </v-flex>
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
                                      >MDE Contact Name:</v-list-tile-sub-title
                                    >
                                    <v-list-tile-title
                                      >{{ editedItem.mdeContactFirstName }}
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
                                      >MDE Contact Phone:</v-list-tile-sub-title
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

                        <v-flex xs12>
                          <v-card>
                            <v-toolbar card light dense>
                              <h3>{{ editedItem.noticeType }} Information:</h3>
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
                      </v-layout>
                    </v-container>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="5">
            <v-card-text>
              <v-container fill-height grid-list-md>
                <v-layout fill-height row justify-center align-center>
                  <v-flex xs8>
                    <div ref="capture">
                      <h1>Submission received!</h1>
                      <br />
                      <v-container fluid class="py-0">
                        <v-layout row wrap>
                          <v-flex xs6>
                            <v-card>
                              <v-toolbar dense light card>
                                <h3>Vendor Information Received:</h3>
                              </v-toolbar>
                              <v-divider />
                              <v-card-text>
                                <v-list subheader>
                                  <v-list-tile>
                                    <v-list-tile-content>
                                      <v-list-tile-sub-title
                                        >Vendor/DBA Name:</v-list-tile-sub-title
                                      >
                                      <v-list-tile-title>{{
                                        formResponse.vendorName
                                      }}</v-list-tile-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
                                  <v-list-tile>
                                    <v-list-tile-content>
                                      <v-list-tile-sub-title
                                        >Vendor Contact
                                        Name:</v-list-tile-sub-title
                                      >
                                      <v-list-tile-title
                                        >{{
                                          formResponse.vendorContactFirstName
                                        }}
                                        {{
                                          formResponse.vendorContactLastName
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
                                        >{{ formResponse.vendorContactEmail }}
                                      </v-list-tile-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
                                  <v-list-tile>
                                    <v-list-tile-content>
                                      <v-list-tile-sub-title
                                        >Vendor Contact
                                        Phone:</v-list-tile-sub-title
                                      >
                                      <v-list-tile-title
                                        >{{ formResponse.vendorContactPhone }}
                                      </v-list-tile-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
                                </v-list>
                              </v-card-text>
                            </v-card>
                          </v-flex>
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
                                        formResponse.programOffice
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
                                        >{{ formResponse.mdeContactFirstName }}
                                        {{
                                          formResponse.mdeContactLastName
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
                                        >{{ formResponse.mdeContactEmail }}
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
                                        >{{ formResponse.mdeContactPhone }}
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
                                  {{ formResponse.noticeType }} Information:
                                </h3>
                              </v-toolbar>
                              <v-divider />
                              <v-card-text>
                                <v-list subheader>
                                  <v-list-tile>
                                    <v-list-tile-content>
                                      <v-list-tile-sub-title
                                        >Submission ID:</v-list-tile-sub-title
                                      >
                                      <v-list-tile-title>{{
                                        formResponse._id
                                      }}</v-list-tile-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
                                  <v-list-tile>
                                    <v-list-tile-content>
                                      <v-list-tile-sub-title
                                        >Title:</v-list-tile-sub-title
                                      >
                                      <v-list-tile-title>{{
                                        formResponse.noticeTitle
                                      }}</v-list-tile-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
                                  <v-list-tile>
                                    <v-list-tile-content>
                                      <v-list-tile-sub-title
                                        >Open Date:</v-list-tile-sub-title
                                      >
                                      <v-list-tile-title>{{
                                        formResponse.openDate
                                      }}</v-list-tile-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
                                  <v-list-tile>
                                    <v-list-tile-content>
                                      <v-list-tile-sub-title
                                        >Close Date:</v-list-tile-sub-title
                                      >
                                      <v-list-tile-title>{{
                                        formResponse.closeDate
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
                                <h3>
                                  Files received:
                                </h3>
                              </v-toolbar>
                              <v-divider />
                              <v-card-text>
                                <v-list subheader>
                                  <v-list-tile
                                    v-for="(file, x) in files"
                                    :key="x"
                                  >
                                    <v-list-tile-avatar>
                                      <v-icon>mdi-check</v-icon>
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                      <v-list-tile-sub-title
                                        >Filename:</v-list-tile-sub-title
                                      >
                                      <v-list-tile-title>{{
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
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-window-item>
        </v-window>
      </v-card>
      <v-footer light height="auto" absolute>
        <v-layout justify-center>
          <v-btn v-if="step < 5" color="error" flat large round @click="step--"
            ><v-icon left>mdi-chevron-left</v-icon>Back</v-btn
          >
          <v-btn
            v-if="step === 5"
            color="error"
            flat
            large
            round
            @click="dialog = false"
            ><v-icon left>mdi-close</v-icon>Close</v-btn
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
            @click="submit"
            >{{ buttonText
            }}<v-icon right>{{
              step === 4 ? 'mdi-cloud-upload' : 'mdi-chevron-right'
            }}</v-icon></v-btn
          >
          <v-btn
            v-if="step === 5"
            class="primary"
            flat
            large
            round
            @click="print"
            >{{ buttonText }}<v-icon right>mdi-printer</v-icon></v-btn
          >
        </v-layout>
      </v-footer>
    </v-dialog>
    <input
      ref="files"
      type="file"
      name="uri"
      class="hidden"
      multiple
      @change="onFilesAdded"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import html2canvas from 'html2canvas'

export default {
  components: {},
  data() {
    return {
      search: '',
      results: [],
      files: [],
      dialog: false,
      fileDeleteDialog: false,
      step: 1,
      dragging: false,
      uploadedFiles: [],
      uploadId: '',
      submissionTime: '',
      formResponse: [],
      filter: 'all',
      editedItem: {
        mdeContactFirstName: '',
        mdeContactLastName: '',
        mdeContactPhone: '',
        mdeContactEmail: '',
        vendorName: '',
        vendorContactFirstName: '',
        vendorContactLastName: '',
        vendorContactPhone: '',
        vendorContactEmail: '',
        programOffice: '',
        noticeTitle: '',
        noticeText: '',
        noticeType: '',
        requestType: '',
        openDate: '',
        closeDate: ''
      },
      solicitationsFilter: 1,
      solicitationTypes: [
        { text: 'All', value: 'all' },
        { text: 'Contracts', value: 'contracts' },
        { text: 'Grants', value: 'grants' }
      ],
      requestTypes: ['RFP', 'RFA', 'RFI', 'IFB']
    }
  },
  computed: {
    ...mapGetters({ solicitations: 'getSolicitations' }),
    goodsCount() {
      return this.results.filter(item => item.noticeType === 'Goods').length
    },
    servicesCount() {
      return this.results.filter(item => item.noticeType === 'Services').length
    },
    grantsCount() {
      return this.results.filter(item => item.noticeType === 'Contract').length
    },
    contractsCount() {
      return this.results.filter(item => item.noticeType === 'Grant').length
    },
    closingCount() {
      return this.results.filter(item =>
        this.$moment(item.closeDate).isBetween(
          this.$moment(),
          this.$moment().endOf('month')
        )
      ).length
    },
    buttonText() {
      if (this.step === 4) return 'Submit response to MDE'
      if (this.step === 5) return 'Print verification'
      return 'next'
    },
    filteredSolicitations() {
      if (this.filter === 'contracts')
        return this.results.filter(item => item.noticeType === 'Contract')
      else if (this.filter === 'grants')
        return this.results.filter(item => item.noticeType === 'Grant')
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
    fileSize(size) {
      const modifiedSize = size / 1024 / 1024
      return modifiedSize.toPrecision(2)
    },
    addFiles() {
      // called when file upload is clicked
      this.$refs.files.click()
    },
    clearFiles() {
      this.files = []
      // this.validInfo = false
    },
    handleFileDelete(file) {
      this.fileDeleteDialog = true
      this.deleteIndex = this.files.indexOf(file)
    },
    deleteFile() {
      this.files.splice(this.deleteIndex, 1)
      this.fileDeleteDialog = false
      this.deleteIndex = null
    },
    print() {
      html2canvas(this.$refs.capture)
        .then(canvas => {
          this.printFile = canvas.toDataURL()
          window.open(this.printFile)
        })
        .catch(error => {
          alert(error)
        })
        .then(this.$router.replace('/'))
      // this.$router.replace("/")
      // this.printSnackbar = true
    },
    removeFile(item) {
      // called when remove file is clicked in file upload component
      const index = this.files.indexOf(item)
      this.files.splice(index, 1)
      this.fileDialog = false
    },
    handleDragDropUpload(e) {
      this.dragging = false // set dropzone state to ready

      const droppedFiles = e.dataTransfer.files
      for (let i = 0; i < droppedFiles.length; i++) {
        this.files.push(droppedFiles[i])
      }
    },
    onFilesAdded() {
      const uploadedFiles = this.$refs.files.files

      // add files to array
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i]
        this.files.push(file)
      }
    },
    submit() {
      const formData = new FormData()

      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i]
        formData.append('uri', file)
      }

      // formData.append('uri')
      // formData.append(Object.assign({}, this.editedItem))

      formData.append(
        'mdeContactFirstName',
        this.editedItem.mdeContactFirstName
      )
      formData.append('mdeContactLastName', this.editedItem.mdeContactLastName)
      formData.append('mdeContactPhone', this.editedItem.mdeContactPhone)
      formData.append('mdeContactEmail', this.editedItem.mdeContactEmail)
      formData.append('vendorName', this.editedItem.vendorName)
      // eslint-disable-next-line prettier/prettier
      formData.append('vendorContactFirstName', this.editedItem.vendorContactFirstName)
      // eslint-disable-next-line prettier/prettier
      formData.append('vendorContactLastName', this.editedItem.vendorContactLastName)
      formData.append('vendorContactPhone', this.editedItem.vendorContactPhone)
      formData.append('vendorContactEmail', this.editedItem.vendorContactEmail)
      formData.append('programOffice', this.editedItem.programOffice)
      formData.append('noticeTitle', this.editedItem.noticeTitle)
      formData.append('noticeText', this.editedItem.noticeText)
      formData.append('noticeType', this.editedItem.noticeType)
      formData.append('requestType', this.editedItem.requestType)
      formData.append('openDate', this.editedItem.openDate)
      formData.append('closeDate', this.editedItem.closeDate)

      // formData.append('vendorName', this.vendorName)
      // formData.append('contactFirstName', this.contactFirstName)
      // formData.append('contactLastName', this.contactLastName)
      // formData.append('contactEmail', this.contactEmail)
      // formData.append('contactPhone', this.contactPhone)
      // formData.append('noticeTitle', this.noticeTitle)
      // formData.append('noticeText', this.noticeText)

      axios
        .post(
          'https://c65b7304.ngrok.io/submissions',
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
          this.step = 5
        })
        .catch(function() {
          this.loading = false
        })
    },
    editItem(item) {
      // this.editedIndex = this.solicitations.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    handleSubmission(solicitation) {
      this.selectedNotice = solicitation
      this.dialog = true
      // this.$store.commit('SET_SOLICITATION', solicitation)
      // this.$router.replace('/submit')
    },
    searchSolicitations() {
      this.results = this.notices.filter(
        item =>
          item.noticeTitle.toLowerCase().indexOf(this.search.toLowerCase()) >
            -1 ||
          item.noticeText.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      )
    }
  }
}
</script>

<style>
input[type='file'] {
  position: absolute;
  top: -500px;
}
</style>
