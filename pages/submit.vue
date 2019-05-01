<template>
  <div>
    <v-container grid-list-lg>
      <v-layout justify-center>
        <v-flex xs12 text-xs-center>
          <v-stepper
            v-model="step"
            alt-labels
            class="grey lighten-5 elevation-0"
          >
            <v-stepper-header class="elevation-0">
              <v-stepper-step :complete="step > 1" step="1"
                >Getting Started</v-stepper-step
              >
              <v-divider />

              <v-stepper-step :complete="step > 2" step="2"
                >Vendor Information</v-stepper-step
              >
              <v-divider />
              <v-stepper-step :complete="step > 3" step="3"
                >Notice Information</v-stepper-step
              >
              <v-divider />

              <v-stepper-step :complete="step > 4" step="4"
                >Attach Files</v-stepper-step
              >

              <v-divider />

              <v-stepper-step :complete="step > 5" step="5"
                >Verify Submission</v-stepper-step
              >
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-container grid-list-lg fluid class="my-0">
                  <v-layout row justify-center>
                    <v-flex xs8>
                      <v-card color="secondary" flat dark class="mb-4">
                        <v-container grid-list-md class="py-2">
                          <v-layout row align-center>
                            <v-flex shrink>
                              <v-icon large>mdi-school</v-icon>
                            </v-flex>
                            <v-flex class="text-xs-left">
                              Welcome to the MDE Procurement Submission portal.
                              Follow the steps on your screen and you will be
                              able to successfully submit.
                            </v-flex>
                          </v-layout>
                        </v-container>
                        <v-divider class="my-3" />
                        <v-container grid-list-md class="py-2">
                          <v-layout row align-start>
                            <v-flex shrink>
                              <v-icon large>mdi-format-list-checks</v-icon>
                            </v-flex>
                            <v-flex class="text-xs-left">
                              <h3>
                                Things you'll need to complete your response:
                              </h3>
                              <v-list dark dense class="transparent">
                                <v-list-tile>
                                  <v-list-tile-avatar>
                                    <v-icon medium>mdi-barcode</v-icon>
                                  </v-list-tile-avatar>
                                  <v-list-tile-content>
                                    <v-list-tile-title class="subheading">
                                      <span
                                        >Your
                                        <v-menu open-on-hover offset-y right>
                                          <div
                                            slot="activator"
                                            class="primary--text"
                                          >
                                            DUNS number
                                          </div>
                                          <v-card
                                            flat
                                            width="300"
                                            color="primary"
                                            dark
                                          >
                                            <v-card-text
                                              >DUNS numbers are 9 digit numbers
                                              required to do business with the
                                              federal government.</v-card-text
                                            >
                                            <v-card-actions>
                                              <v-btn light>Learn More</v-btn>
                                            </v-card-actions>
                                          </v-card> </v-menu
                                        >or
                                        <v-menu open-on-hover offset-y top>
                                          <div
                                            slot="activator"
                                            class="accent--text"
                                          >
                                            Business ID
                                          </div>
                                          <v-card
                                            width="300"
                                            color="accent"
                                            dark
                                          >
                                            <v-card-text
                                              >Business IDs are 6 or 7 digit
                                              numbers assigned to businesses
                                              registered with the
                                              MSoS.</v-card-text
                                            >
                                            <v-card-actions>
                                              <v-btn light>Learn more</v-btn>
                                            </v-card-actions>
                                          </v-card>
                                        </v-menu>
                                      </span>
                                    </v-list-tile-title>
                                  </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                  <v-list-tile-avatar>
                                    <v-icon medium>mdi-account</v-icon>
                                  </v-list-tile-avatar>
                                  <v-list-tile-content>
                                    <v-list-tile-title class="subheading"
                                      >Vendor contact name, phone and
                                      Email</v-list-tile-title
                                    >
                                  </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                  <v-list-tile-avatar>
                                    <v-icon medium>mdi-file-pdf</v-icon>
                                  </v-list-tile-avatar>
                                  <v-list-tile-content>
                                    <v-list-tile-title class="subheading"
                                      >Your response and any supporting
                                      documents in PDF format</v-list-tile-title
                                    >
                                  </v-list-tile-content>
                                </v-list-tile>
                              </v-list>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card>
                      <v-card light class="elevation-5">
                        <v-card-title class="pb-2 justify-space-between">
                          <span
                            :class="
                              solicitation.solicitationType === 'Contract'
                                ? 'teal--text'
                                : 'deep-orange--text'
                            "
                            class="title font-weight-regular"
                            >{{ solicitation[0].requestType }} -
                            {{ solicitation[0].solicitationType }}</span
                          >
                          <v-icon
                            :color="
                              solicitation[0].solicitationType === 'Contract'
                                ? 'teal'
                                : 'deep-orange'
                            "
                            left
                            >{{
                              solicitation[0].solicitationType === 'Contract'
                                ? 'mdi-account-multiple-check'
                                : 'mdi-certificate'
                            }}</v-icon
                          >
                        </v-card-title>
                        <v-card-text class="py-1">
                          <h1
                            class="subheading"
                            v-text="solicitation[0].solicitationTitle"
                          />
                        </v-card-text>
                        <v-divider />
                        <v-card-text>
                          <p v-text="solicitation[0].solicitationText" />
                        </v-card-text>
                        <v-divider />
                        <v-card-actions class="justify-space-around">
                          <v-list class="transparent pa-1 text-xs-center">
                            <v-list-tile-sub-title
                              >Open Date:</v-list-tile-sub-title
                            >
                            <v-list-tile-title
                              v-text="
                                new Date(
                                  solicitation[0].openDate
                                ).toLocaleDateString()
                              "
                            />
                          </v-list>

                          <v-list class="transparent pa-1 text-xs-center">
                            <v-list-tile-sub-title
                              >Close Date:</v-list-tile-sub-title
                            >
                            <v-list-tile-title
                              >{{
                                new Date(
                                  solicitation[0].closeDate
                                ).toLocaleDateString()
                              }}
                              <span class="red--text"
                                >({{
                                  $moment(solicitation[0].closeDate).fromNow()
                                }})</span
                              >
                            </v-list-tile-title>
                          </v-list>
                        </v-card-actions>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-stepper-content>
              <v-stepper-content step="2" class="elevation-0 pt-0">
                <v-container grid-list-lg fluid class="my-0">
                  <v-layout row justify-center>
                    <v-flex xs8>
                      <v-card color="secondary" flat dark class="mb-4">
                        <v-container grid-list-md class="py-2">
                          <v-layout row align-center>
                            <v-flex shrink>
                              <v-icon large>mdi-alert-decagram</v-icon>
                            </v-flex>
                            <v-flex class="text-xs-left">
                              Enter your company information here. Pay
                              particular attention that your Email address is
                              correct as this is MDE's primary contact method
                              for submission related information and updates.
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card>

                      <v-text-field
                        v-model="vendorName"
                        outline
                        label="Vendor/Company/DBA Name"
                        :rules="[
                          () => !!vendorName || 'This field is required'
                        ]"
                      />
                      <v-text-field
                        v-model="contactFirstName"
                        outline
                        label="Contact First Name"
                        :rules="[
                          () => !!contactFirstName || 'First name is required'
                        ]"
                      />
                      <v-text-field
                        v-model="contactLastName"
                        outline
                        :rules="[
                          () => !!contactLastName || 'Last name is required'
                        ]"
                        label="Contact Last Name"
                      />
                      <v-text-field
                        v-model="contactEmail"
                        outline
                        label="Contact Email"
                        :rules="[() => !!contactEmail || 'Email is required']"
                      />
                      <v-text-field
                        v-model="contactPhone"
                        outline
                        label="Contact phone number"
                        mask="phone"
                        :rules="[
                          () => !!contactPhone || 'Phone number is required'
                        ]"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
          <v-card light class="grey lighten-5" flat>
            <!-- <v-card-title>
              <span class="display-1 grey--text text--darken-3">{{
                currentTitle
              }}</span>
              <v-spacer />
              <v-avatar
                :class="
                  step === 1
                    ? 'primary white--text'
                    : 'grey lighten-2 primary--text text--lighten-1'
                "
                class="mx-1"
                size="24"
                >1</v-avatar
              >
              <v-avatar
                :class="
                  step === 2
                    ? 'primary white--text'
                    : 'grey lighten-2 primary--text text--lighten-1'
                "
                class="mx-1"
                size="24"
                >2</v-avatar
              >
              <v-avatar
                :class="
                  step === 3
                    ? 'primary white--text'
                    : 'grey lighten-2 primary--text text--lighten-1'
                "
                class="mx-1"
                size="24"
                >3</v-avatar
              >
              <v-avatar
                :class="
                  step === 4
                    ? 'primary white--text'
                    : 'grey lighten-2 primary--text text--lighten-1'
                "
                class="mx-1"
                size="24"
                >4</v-avatar
              >
              <v-avatar
                :class="
                  step === 5
                    ? 'primary white--text'
                    : 'grey lighten-2 primary--text text--lighten-1'
                "
                class="mx-1"
                size="24"
                >5</v-avatar
              >
              <v-avatar
                :class="
                  step === 6
                    ? 'primary white--text'
                    : 'grey lighten-2 primary--text text--lighten-1'
                "
                class="mx-1"
                size="24"
                >6</v-avatar
              >
            </v-card-title> -->

            <v-window v-model="step" class="grow">
              <v-window-item :value="1">
                <v-container grid-list-lg fluid class="my-0">
                  <v-layout column>
                    <v-flex xs8>
                      <v-sheet
                        class="pa-2 primary white--text text-xs-left subheading"
                      >
                        Things you'll need to complete your submission:</v-sheet
                      >
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-window-item>

              <v-window-item :value="2">
                <v-container grid-list-lg fluid class="my-0">
                  <v-card color="secondary" flat dark class="mb-4">
                    <v-container grid-list-md class="py-2">
                      <v-layout row align-center>
                        <v-flex shrink>
                          <v-icon large>mdi-alert-decagram</v-icon>
                        </v-flex>
                        <v-flex class="text-xs-left">
                          Enter your company information here. Pay particular
                          attention that your Email address is correct as this
                          is MDE's primary contact method for submission related
                          information and updates.
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>

                  <v-text-field
                    v-model="vendorName"
                    outline
                    label="Vendor/Company/DBA Name"
                    :rules="[() => !!vendorName || 'This field is required']"
                  />
                  <v-text-field
                    v-model="contactFirstName"
                    outline
                    label="Contact First Name"
                    :rules="[
                      () => !!contactFirstName || 'First name is required'
                    ]"
                  />
                  <v-text-field
                    v-model="contactLastName"
                    outline
                    :rules="[
                      () => !!contactLastName || 'Last name is required'
                    ]"
                    label="Contact Last Name"
                  />
                  <v-text-field
                    v-model="contactEmail"
                    outline
                    label="Contact Email"
                    :rules="[() => !!contactEmail || 'Email is required']"
                  />
                  <v-text-field
                    v-model="contactPhone"
                    outline
                    label="Contact phone number"
                    mask="phone"
                    :rules="[
                      () => !!contactPhone || 'Phone number is required'
                    ]"
                  />
                </v-container>
              </v-window-item>

              <v-window-item :value="3">
                <v-container grid-list-lg fluid class="my-0">
                  <v-card color="secondary" dark flat class="mb-3">
                    <v-container grid-list-md class="py-2">
                      <v-layout row align-center>
                        <v-flex shrink>
                          <v-icon large>mdi-alert-decagram</v-icon>
                        </v-flex>
                        <v-flex class="text-xs-left">
                          If you selected a solicitation from the home page,
                          verify that the information below matches the
                          solicitation for which you wish to respond.
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                  <v-text-field
                    v-model="notificationTitle"
                    hint="Required *"
                    box
                    label="Notification Title"
                  />
                  <v-textarea
                    v-model="notificationText"
                    hint="Required *"
                    box
                    label="Notification Text"
                  />
                </v-container>
              </v-window-item>

              <v-window-item :value="4">
                <v-container grid-list-lg fluid class="my-0">
                  <v-card color="secondary" flat dark class="mb-3">
                    <v-container grid-list-md class="py-2">
                      <v-layout row align-center>
                        <v-flex shrink>
                          <v-icon large>mdi-alert-decagram</v-icon>
                        </v-flex>
                        <v-flex class="text-xs-left">
                          Upload any required/supporting documentation needed
                          for your response below. Only PDF files are supported.
                          <a
                            href="https://support.office.com/en-us/article/save-or-convert-to-pdf-or-xps-d85416c5-7d77-4fd6-a216-6f4bf7c7c110#ID0EAADAAA=Office_2010_and_Newer_Versions"
                            target="_blank"
                            class="white--text font-weight-bold"
                            >Click here</a
                          >
                          to learn how to convert a Microsoft Office document to
                          PDF format.
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                  <v-card
                    dark
                    width="400"
                    hover
                    color="primary"
                    class="mx-auto"
                    :class="
                      dragging
                        ? 'primary lighten-1 lighten-4 elevation-8'
                        : 'primary elevation-0'
                    "
                    flat
                    @drop.stop.prevent="handleDragDropUpload"
                    @dragenter.stop.prevent="dragging = true"
                    @dragover.stop.prevent="dragging = true"
                    @dragleave.stop.prevent="dragging = false"
                    @click="addFiles"
                  >
                    <v-card-text>
                      <v-icon size="64">mdi-cloud-upload</v-icon>
                      <h1 class="title">
                        Click or drag and drop files here
                      </h1>
                    </v-card-text>
                  </v-card>
                  <!-- mobile file list -->
                  <v-slide-x-transition>
                    <v-list
                      v-if="files.length > 0 && $vuetify.breakpoint.smAndDown"
                      two-line
                      class="pt-0"
                      color="transparent"
                    >
                      <template v-for="(file, i, index) in files">
                        <v-dialog :key="i" v-model="fileDialog" max-width="400">
                          <v-card color="error" dark>
                            <v-card-text>
                              <h1 class="body-1">
                                Are you sure you want to delete
                              </h1>
                              <h1 class="body-2">{{ file.name }}</h1>
                            </v-card-text>
                            <v-card-actions>
                              <v-btn light @click="removeFile(file)"
                                >Delete</v-btn
                              >
                              <v-btn dark box @click="fileDialog = false"
                                >Cancel</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-dialog>

                        <v-list-tile
                          :key="file.name"
                          class="transparent"
                          avatar
                          ripple
                          @click.stop="fileDialog = true"
                        >
                          <v-list-tile-content>
                            <v-list-tile-sub-title
                              >Filename:</v-list-tile-sub-title
                            >
                            <v-list-tile-title>{{
                              file.name
                            }}</v-list-tile-title>
                          </v-list-tile-content>

                          <v-list-tile-action>
                            <v-icon color="error">mdi-delete</v-icon>
                          </v-list-tile-action>
                        </v-list-tile>
                        <v-divider
                          v-if="index + 1 < files.length"
                          :key="index"
                        />
                      </template>
                    </v-list>
                  </v-slide-x-transition>
                  <!-- end mobile file list -->
                  <v-slide-y-transition>
                    <template
                      v-if="files.length > 0 && $vuetify.breakpoint.smAndUp"
                    >
                      <v-data-table
                        :items="files"
                        :headers="headers"
                        class="elevation-0"
                        item-key="name"
                        light
                        hide-actions
                      >
                        <template slot="items" slot-scope="props">
                          <td class="text-xs-left">{{ props.item.name }}</td>
                          <td class="text-xs-right">{{ props.item.size }}</td>
                          <td class="text-xs-right">
                            <v-btn
                              icon
                              dark
                              small
                              color="error"
                              @click="props.expanded = !props.expanded"
                            >
                              <v-icon dark small>mdi-delete</v-icon>
                            </v-btn>
                          </td>
                        </template>
                        <template slot="expand" slot-scope="props">
                          <v-card color="error" dark flat>
                            <v-card-text class="body-1">
                              Are you sure you want to remove
                              <span class="font-weight-bold"
                                >{{ props.item.name }}?</span
                              >
                            </v-card-text>
                            <v-card-actions>
                              <v-btn
                                depressed
                                color="white"
                                light
                                @click="removeFile(props.item)"
                                >Delete</v-btn
                              >
                              <v-btn
                                small
                                box
                                color="white"
                                @click="props.expanded = !props.expanded"
                                >cancel</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </template>
                        <template slot="footer">
                          <td />
                          <td>Number of files: {{ files.length }}</td>
                          <td>
                            <v-btn small color="error" @click="clearFiles()"
                              >Clear files</v-btn
                            >
                          </td>
                        </template>
                      </v-data-table>
                    </template>
                  </v-slide-y-transition>
                </v-container>
              </v-window-item>

              <v-window-item :value="5">
                <v-container grid-list-lg fluid class="my-0">
                  <v-card color="secondary" dark class="mb-3">
                    <v-container grid-list-md class="py-2">
                      <v-layout row align-center>
                        <v-flex shrink>
                          <v-icon large>mdi-alert-decagram</v-icon>
                        </v-flex>
                        <v-flex class="text-xs-left">
                          Use this screen to verify the information being sent
                          to MDE. Verify all required files are attached and all
                          fields are correct.
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                  <v-layout row>
                    <v-flex xs6 class="text-xs-left">
                      <v-subheader>Response information:</v-subheader>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-sub-title
                              >Vendor/DBA Name:</v-list-tile-sub-title
                            >
                            <v-list-tile-title>{{
                              vendorName
                            }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-sub-title
                              >Vendor Contact:</v-list-tile-sub-title
                            >
                            <v-list-tile-title>{{
                              contactFirstName + ' ' + contactLastName
                            }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-sub-title
                              >Contact Email:</v-list-tile-sub-title
                            >
                            <v-list-tile-title>{{
                              contactEmail
                            }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-sub-title
                              >Contact Phone:</v-list-tile-sub-title
                            >
                            <v-list-tile-title>{{
                              contactPhone
                            }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                    <v-flex xs6>
                      <v-subheader>Supporting documents:</v-subheader>
                      <v-list dense subheader>
                        <v-list-tile v-for="(file, f) in files" :key="f">
                          <v-list-tile-avatar
                            ><v-icon>mdi-file-pdf</v-icon></v-list-tile-avatar
                          >
                          <v-list-tile-content>{{
                            file.name
                          }}</v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                  </v-layout>
                  <div class="text-xs-center">
                    <v-checkbox
                      v-model="verified"
                      class="mx-auto"
                      label="By selecting this checkbox I verify that my submission information is correct"
                    />
                  </div>
                </v-container>
              </v-window-item>

              <v-window-item :value="6">
                <v-container grid-list-lg fluid class="my-0">
                  <v-card color="secondary" dark flat class="mb-3">
                    <v-container grid-list-md class="py-2">
                      <v-layout row align-center>
                        <v-flex shrink>
                          <v-icon large>mdi-check</v-icon>
                        </v-flex>
                        <v-flex class="text-xs-left">
                          Your submission was successful!
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                  <v-layout row>
                    <v-flex xs6 class="text-xs-left">
                      <v-subheader>Response received:</v-subheader>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-sub-title
                              >Submission ID:</v-list-tile-sub-title
                            >
                            <v-list-tile-title>{{
                              uploadId
                            }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-sub-title
                              >Received on:</v-list-tile-sub-title
                            >
                            <v-list-tile-title>{{
                              new Date(submissionTime).toLocaleString()
                            }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
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
                              >Vendor Contact:</v-list-tile-sub-title
                            >
                            <v-list-tile-title>{{
                              formResponse.contactFirstName +
                                ' ' +
                                formResponse.contactLastName
                            }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-sub-title
                              >Contact Email:</v-list-tile-sub-title
                            >
                            <v-list-tile-title>{{
                              formResponse.contactEmail
                            }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-sub-title
                              >Contact Phone:</v-list-tile-sub-title
                            >
                            <v-list-tile-title>{{
                              formResponse.contactPhone
                            }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                    <v-flex xs6>
                      <v-subheader>Files received:</v-subheader>
                      <v-list dense subheader>
                        <v-list-tile
                          v-for="(file, f) in uploadedFiles"
                          :key="f"
                        >
                          <v-list-tile-avatar
                            ><v-icon>mdi-file-pdf</v-icon></v-list-tile-avatar
                          >
                          <v-list-tile-content>{{
                            file.name
                          }}</v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-window-item>
            </v-window>

            <!-- <v-card-actions>
              <v-btn round :disabled="step === 1" flat @click="step--">
                Back
              </v-btn>
              <v-spacer />
              <v-btn
                color="primary"
                round
                depressed
                :disabled="step === 5 && !verified"
                @click="step++"
              >
                {{ buttonText }}
                <v-icon v-if="step === 5" right>mdi-send</v-icon>
              </v-btn>
            </v-card-actions> -->
          </v-card>
        </v-flex>
      </v-layout>
      <input
        ref="files"
        type="file"
        name="uri"
        class="hidden"
        multiple
        @change="onFilesAdded"
      />
    </v-container>
    <v-footer app height="auto">
      <v-toolbar flat light color="grey lighten-5">
        <v-spacer />
        <v-btn
          v-if="step < 6"
          :disabled="step == 1"
          round
          large
          flat
          color="error"
          @click="step--"
        >
          <v-icon left>mdi-chevron-left</v-icon>
          Back
        </v-btn>
        <v-spacer />
        <v-btn depressed round large class="primary" @click="step++"
          >{{ buttonText }}<v-icon right>mdi-chevron-right</v-icon></v-btn
        >

        <v-btn
          v-if="step == 5"
          :disabled="!verified"
          class="green white--text"
          light
          depressed
        >
          Submit
          <v-icon right>fa-cloud-upload-alt</v-icon>
        </v-btn>
        <v-btn v-if="step == 6" color="green" dark depressed>
          Back to Procurement
        </v-btn>
        <v-spacer />
      </v-toolbar>
    </v-footer>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import html2canvas from 'html2canvas'

export default {
  data() {
    return {
      step: 1,
      verified: false,
      vendorName: '',
      contactFirstName: '',
      contactLastName: '',
      contactPhone: '',
      contactEmail: '',
      dragging: false,
      files: [],
      formResponse: [],
      headers: [
        // headers for data table
        { text: 'Filename', sortable: false, value: 'name', width: '200px' },
        { text: 'Size', sortable: false, value: 'size', align: 'right' },
        { text: 'Delete', sortable: false, value: 'delete', align: 'right' }
      ],
      mobileHeaders: [
        // headers for data table
        { text: 'Filename', sortable: false, value: 'name' },
        { text: 'Delete', sortable: false, value: 'delete', align: 'right' }
      ],
      notificationTitle: '',
      notificationText: '',
      submissionTime: '',
      uploadedFiles: [],
      uploadId: ''
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('callSolicitation')
  },
  computed: {
    ...mapGetters({ solicitation: 'getSolicitation' }),
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'Getting Started'
        case 2:
          return 'Vendor Information'
        case 3:
          return 'Solicitation Information'
        case 4:
          return 'Supporting Documents'
        default:
          return 'Account created'
      }
    },
    buttonText() {
      switch (this.step) {
        case 1:
          return 'Enter vendor information'
        case 2:
          return 'Enter solicitation information'
        case 3:
          return 'Upload supporting documents'
        case 4:
          return 'Verify submission information'
        default:
          return 'Submit response'
      }
    }
  },
  methods: {
    addFiles() {
      // called when file upload is clicked
      this.$refs.files.click()
    },
    clearFiles() {
      this.files = []
      this.validInfo = false
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
    print() {
      this.step++

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
    reset() {
      this.files = []
      this.step = 1
      this.vendorName = ''
      this.contactFirstName = ''
      this.contactLastName = ''
      this.contactEmail = ''
      this.contactPhone = ''
      this.noticeTitle = ''
      this.noticeText = ''
      this.files = []
      this.verification = false
    },
    submissionFinished() {
      this.vendorName = ''
      this.contactFirstName = ''
      this.contactLastName = ''
      this.contactEmail = ''
      this.contactPhone = ''
      this.noticeTitle = ''
      this.noticeText = ''
      this.files = []
      this.verification = false
      this.$nuxt.$router.push('/')
    },
    submit() {
      const formData = new FormData()

      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i]
        formData.append('uri', file)
      }

      formData.append('vendorName', this.vendorName)
      formData.append('contactFirstName', this.contactFirstName)
      formData.append('contactLastName', this.contactLastName)
      formData.append('contactEmail', this.contactEmail)
      formData.append('contactPhone', this.contactPhone)
      formData.append('noticeTitle', this.noticeTitle)
      formData.append('noticeText', this.noticeText)

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
          this.uploadedFiles = response.data.files
          this.uploadId = response.data._id
          this.submissionTime = response.data.createdAt
          this.formResponse = response.data
          this.step = 6
        })
        .catch(function() {
          this.loading = false
        })
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
