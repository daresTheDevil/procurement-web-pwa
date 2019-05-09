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
                      <v-btn
                        block
                        small
                        disabled
                        round
                        depressed
                        color="primary"
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
                    <h1>
                      Welcome to the MDE Procurement Submission portal.
                    </h1>
                    <v-card color="amber" flat light class="my-3">
                      <v-container grid-list-lg class="py-2">
                        <v-layout row align-center>
                          <v-flex shrink>
                            <v-icon size="48">mdi-alert-circle-outline</v-icon>
                          </v-flex>
                          <v-flex class="text-xs-left">
                            <h2>Notice to vendors:</h2>
                            Please read the section below detailing the
                            documentation required to submit a response.
                            Although there is no time limit for submitting a
                            response, your response progress
                            <strong>IS NOT</strong> saved. If you exit the
                            response screen or close your browser, you must
                            restart your submission.
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                    <br />
                    <p>
                      Things you'll need to complete your response:
                    </p>
                    <ul>
                      <li>
                        <v-menu
                          max-width="300"
                          color="secondary"
                          dark
                          offset-y
                          top
                          left
                          nudge-top="10"
                          open-on-hover
                        >
                          <a
                            slot="activator"
                            class="mb-1 font-weight-black secondary--text"
                            target="_blank"
                            href="https://www.grants.gov/applicants/organization-registration/step-1-obtain-duns-number.html"
                          >
                            DUNS number
                          </a>
                          <v-card color="secondary">
                            <v-card-text>
                              <span class="subheading">
                                DUNS numbers are 9 digit numbers required to do
                                business with the federal government.
                              </span>
                            </v-card-text>
                          </v-card>
                        </v-menu>
                        or
                        <v-menu
                          max-width="300"
                          color="secondary"
                          dark
                          offset-y
                          top
                          right
                          nudge-top="10"
                          open-on-hover
                        >
                          <a
                            slot="activator"
                            class="mb-1 font-weight-black secondary--text"
                            target="_blank"
                            href="https://corp.sos.ms.gov/corp/portal/c/page/corpBusinessIdSearch/portal.aspx?#clear=1"
                          >
                            Business ID
                          </a>
                          <v-card color="secondary">
                            <v-card-text>
                              <span class="subheading">
                                Business IDs are 6 or 7 digit numbers numbers
                                assigned to businesses registered with the
                                Mississippi Secretary of State.
                              </span>
                            </v-card-text>
                          </v-card>
                        </v-menu>
                      </li>
                      <li>
                        Contact name, phone and Email
                      </li>
                      <li>
                        Your response and any supporting documents in
                        <v-menu
                          max-width="300"
                          color="secondary"
                          dark
                          offset-y
                          top
                          right
                          nudge-top="10"
                          open-on-hover
                        >
                          <a
                            slot="activator"
                            class="mb-1 font-weight-black secondary--text"
                            target="_blank"
                            href="https://support.office.com/en-ie/article/save-or-convert-to-pdf-or-xps-d85416c5-7d77-4fd6-a216-6f4bf7c7c110#ID0EAADAAA=Office_2010_and_Newer_Versions"
                          >
                            PDF format
                          </a>
                          <v-card color="secondary">
                            <v-card-text>
                              <span class="subheading">
                                PDF files are platform independent and ensure
                                that vendor submission documents are readable by
                                MDE.
                              </span>
                            </v-card-text>
                          </v-card>
                        </v-menu>
                      </li>
                    </ul>

                    <v-divider class="my-4" />

                    <h2>You're responding to:</h2>
                    <v-card light>
                      <v-card-title>
                        <h3 v-text="editedItem.noticeTitle" />
                      </v-card-title>
                      <v-card-text class="py-1">
                        <p v-text="editedItem.noticeText" />
                      </v-card-text>
                    </v-card>
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
                    <v-card color="primary" flat dark class="mb-4">
                      <v-container grid-list-lg class="py-2">
                        <v-layout row align-center>
                          <v-flex shrink>
                            <v-icon size="48">mdi-information</v-icon>
                          </v-flex>
                          <v-flex class="text-xs-left">
                            <h2>Vendor contact information:</h2>
                            Enter your company information here. Pay particular
                            attention that your Email address is correct as this
                            is MDE's primary contact method for submission
                            related information and updates.
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>

                    <v-text-field
                      v-model="editedItem.vendorId"
                      color="secondary"
                      counter
                      outline
                      validate-on-blur
                      type="tel"
                      maxlength="9"
                      :rules="[rules.required, rules.vendorId]"
                      label="Enter a valid DUNS number (9 digits) or Business ID (6 or 7 digits)"
                    />
                    <v-text-field
                      v-model="editedItem.vendorName"
                      outline
                      validate-on-blur
                      label="Vendor/Company/DBA Name"
                      :rules="[rules.required]"
                    />
                    <v-text-field
                      v-model="editedItem.vendorContactFirstName"
                      outline
                      validate-on-blur
                      label="Vendor Contact First Name"
                      :rules="[rules.required]"
                    />
                    <v-text-field
                      v-model="editedItem.vendorContactLastName"
                      outline
                      validate-on-blur
                      label="Vendor Contact Last Name"
                      :rules="[rules.required]"
                    />
                    <v-text-field
                      v-model="editedItem.vendorContactEmail"
                      outline
                      validate-on-blur=""
                      label="Vendor Contact Email"
                      :rules="[rules.required]"
                    />
                    <v-text-field
                      v-model="editedItem.vendorContactPhone"
                      outline
                      validate-on-blur
                      label="Vendor Contact Phone"
                      :rules="[rules.required]"
                      type="tel"
                      mask="phone"
                    />
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

                        <v-flex xs6>
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
                                        >Submitted at:</v-list-tile-sub-title
                                      >
                                      <v-list-tile-title>{{
                                        submissionTime
                                      }}</v-list-tile-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
                                  <v-list-tile>
                                    <v-list-tile-content>
                                      <v-list-tile-sub-title
                                        >Received at:</v-list-tile-sub-title
                                      >
                                      <v-list-tile-title>{{
                                        formResponse.createdAt
                                      }}</v-list-tile-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
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
            color="primary"
            depressed
            :disabled="
              (step === 2 &&
                !(
                  editedItem.vendorName &&
                  editedItem.vendorContactFirstName &&
                  editedItem.vendorContactLastName &&
                  editedItem.vendorContactEmail &&
                  editedItem.vendorContactPhone
                )) ||
                (step === 3 && files.length === 0)
            "
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
            :loading="loading"
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
      loading: false,
      selectedNotice: [],
      files: [],
      dialog: false,
      fileDeleteDialog: false,
      step: 1,
      rules: {
        required: value => !!value || 'Required.',
        duns: value => value.length === 9 || 'Not a valid DUNS number.',
        businessId: value =>
          value.length === 6 ||
          value.length === 7 ||
          'Not a valid Business ID number.',
        vendorId: value =>
          value.length === 6 ||
          value.length === 7 ||
          value.length === 9 ||
          'Not a valid DUNS or Business ID number.'
      },
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
        vendorId: '',
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
    },
    removeFile(item) {
      // called when remove file is clicked in file upload component
      const index = this.files.indexOf(item)
      this.files.splice(index, 1)
      this.fileDialog = false
    },
    handleDragDropUpload(e) {
      this.dragging = false

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
      this.submissionTime = new Date().toLocaleTimeString()
      const formData = new FormData()

      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i]
        formData.append('uri', file)
      }

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
      this.loading = true

      // formData.append('vendorName', this.vendorName)
      // formData.append('contactFirstName', this.contactFirstName)
      // formData.append('contactLastName', this.contactLastName)
      // formData.append('contactEmail', this.contactEmail)
      // formData.append('contactPhone', this.contactPhone)
      // formData.append('noticeTitle', this.noticeTitle)
      // formData.append('noticeText', this.noticeText)

      axios
        .post(
          'http://localhost:3030/submissions',
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
          this.loading = false
          // eslint-disable-next-line no-console
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
