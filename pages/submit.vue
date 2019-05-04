<template>
  <div class="grey lighten-5">
    <v-container grid-list-lg fill-height>
      <v-layout justify-center fill-height>
        <v-flex xs12 text-xs-center>
          <v-layout
            v-if="step < 6"
            row
            class="justify-space-between align-center"
          >
            <v-chip
              :small="step != 1"
              :disabled="step != 1"
              :color="step === 1 ? '' : 'grey lighten-3'"
            >
              <v-avatar
                :color="step === 1 ? 'primary white--text' : 'grey white--text'"
              >
                <v-icon v-if="step > 1">mdi-check</v-icon>
                <span v-else>1</span>
              </v-avatar>
              <span>Getting Started</span>
            </v-chip>

            <v-divider />

            <v-chip
              :small="step != 2"
              :disabled="step != 2"
              :color="step === 2 ? '' : 'grey lighten-3'"
            >
              <v-avatar
                :color="step === 2 ? 'primary white--text' : 'grey white--text'"
              >
                <v-icon v-if="step > 2">mdi-check</v-icon>
                <span v-else>2</span>
              </v-avatar>
              <span>Vendor Information</span>
            </v-chip>
            <v-divider />

            <v-chip
              :small="step != 3"
              :disabled="step != 3"
              :color="step === 3 ? '' : 'grey lighten-3'"
            >
              <v-avatar
                :color="step === 3 ? 'primary white--text' : 'grey white--text'"
              >
                3
              </v-avatar>
              <span>Notice Information</span>
            </v-chip>
            <v-divider />

            <v-chip
              :small="step != 4"
              :disabled="step != 4"
              :color="step === 4 ? '' : 'grey lighten-3'"
            >
              <v-avatar
                :color="step === 4 ? 'primary white--text' : 'grey white--text'"
              >
                4
              </v-avatar>
              <span>Attach Files</span>
            </v-chip>
            <v-divider />

            <v-chip
              :small="step != 5"
              :disabled="step != 5"
              :color="step === 5 ? '' : 'grey lighten-3'"
            >
              <v-avatar
                :color="step === 5 ? 'primary white--text' : 'grey white--text'"
              >
                5
              </v-avatar>
              <span>Verify Submission</span>
            </v-chip>
          </v-layout>
          <v-stepper
            v-model="step"
            alt-labels
            class="grey lighten-5 elevation-0"
          >
            <v-stepper-items>
              <v-stepper-content class="pt-0" step="1">
                <v-container grid-list-lg fluid class="my-0">
                  <v-layout row wrap justify-center>
                    <v-flex xs8 class="text-xs-left">
                      <h1>
                        Welcome to the MDE Procurement Submission portal.
                      </h1>
                      <br />
                      <p>
                        Follow the steps on your screen and you will be able to
                        successfully submit your response.
                      </p>
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
                                  DUNS numbers are 9 digit numbers required to
                                  do business with the federal government.
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
                                  that vendor submission documents are readable
                                  by MDE.
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
                          <h3 v-text="solicitation[0].solicitationTitle" />
                        </v-card-title>
                        <v-card-text class="py-1">
                          <p v-text="solicitation[0].solicitationText" />
                        </v-card-text>
                      </v-card>

                      <v-divider class="my-4" />

                      <h4>Enter your DUNS or Business ID to continue:</h4>
                      <v-text-field
                        v-model="vendorId"
                        color="secondary"
                        counter
                        outline
                        validate-on-blur
                        type="tel"
                        maxlength="9"
                        :rules="[rules.required, rules.vendorId]"
                        label="Enter a valid DUNS number (9 digits) or Business ID (6 or 7 digits)"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-stepper-content>
              <v-stepper-content step="2" class="elevation-0 pt-0">
                <v-container grid-list-lg fluid class="my-0">
                  <v-layout row justify-center>
                    <v-flex xs8>
                      <v-card color="primary" flat dark class="mb-4">
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

              <v-stepper-content step="3" class="elevation-0 pt-0">
                <v-container grid-list-lg fluid class="my-0">
                  <v-layout row justify-center>
                    <v-flex xs8>
                      <v-card color="primary" flat dark class="mb-4">
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
                        v-model="notificationTitle"
                        outline
                        label="Notification Title"
                        :rules="[
                          () => !!notificationTitle || 'This field is required'
                        ]"
                      />
                      <v-textarea
                        v-model="notificationText"
                        outline
                        label="Notification Text"
                        :rules="[
                          () => !!notificationText || 'First name is required'
                        ]"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-stepper-content>

              <v-stepper-content step="4" class="elevation-0 pt-0">
                <v-container grid-list-lg fluid class="my-0">
                  <v-layout row justify-center>
                    <v-flex xs12 sm8>
                      <v-card color="primary" flat dark class="mb-4">
                        <v-card-text class="pa-2">
                          <v-list class="primary" three-line>
                            <v-list-tile>
                              <v-list-tile-avatar
                                ><v-icon large
                                  >mdi-information</v-icon
                                ></v-list-tile-avatar
                              >
                              <v-list-tile-content>
                                <p>
                                  Upload any required/supporting documentation
                                  needed for your response below. Only PDF files
                                  are supported.
                                  <a
                                    href="https://support.office.com/en-us/article/save-or-convert-to-pdf-or-xps-d85416c5-7d77-4fd6-a216-6f4bf7c7c110#ID0EAADAAA=Office_2010_and_Newer_Versions"
                                    target="_blank"
                                    class="white--text font-weight-bold"
                                    >Click here</a
                                  >
                                  to learn how to convert a Microsoft Office
                                  document to PDF format.
                                </p>
                              </v-list-tile-content>
                            </v-list-tile>
                          </v-list>
                        </v-card-text>
                      </v-card>
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
                          class="text--white"
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
              </v-stepper-content>

              <v-stepper-content step="5" class="elevation-0 pt-0">
                <v-container grid-list-lg fluid class="my-0">
                  <v-layout row justify-center>
                    <v-flex xs12 sm8>
                      <v-card color="primary" flat dark class="mb-4">
                        <v-card-text>
                          <v-list class="primary" two-line>
                            <v-list-tile>
                              <v-list-tile-avatar
                                ><v-icon large
                                  >mdi-information</v-icon
                                ></v-list-tile-avatar
                              >
                              <v-list-tile-content
                                >Use this screen to verify the information you
                                intend to submit to MDE.
                              </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                              <v-list-tile-avatar
                                ><v-icon large color="warning"
                                  >mdi-alert-octagon</v-icon
                                ></v-list-tile-avatar
                              >
                              <v-list-tile-content>
                                <span>
                                  Your response
                                  <span class="warning black--text"
                                    >WILL NOT BE SUBMITTED</span
                                  >
                                  until your data is verified and you click the
                                  "Submit Response" button.
                                </span>
                              </v-list-tile-content>
                            </v-list-tile>
                          </v-list>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row justify-center>
                    <v-flex xs4>
                      <v-subheader>Entered information:</v-subheader>
                      <v-list two-line class="transparent">
                        <v-list-tile>
                          <v-list-tile-avatar>
                            <v-icon>mdi-barcode</v-icon>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-sub-title
                              >Solicitation Title:</v-list-tile-sub-title
                            >
                            <v-list-tile-title>{{
                              notificationTitle
                            }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-avatar>
                            <v-icon>mdi-domain</v-icon>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-sub-title
                              >Company/DBA/Vendor Name</v-list-tile-sub-title
                            >
                            <v-list-tile-title>{{
                              vendorName
                            }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-avatar>
                            <v-icon>mdi-account</v-icon>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-sub-title
                              >Contact Name:</v-list-tile-sub-title
                            >
                            <v-list-tile-title
                              >{{ contactFirstName }}
                              {{ contactLastName }}</v-list-tile-title
                            >
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-avatar>
                            <v-icon>mdi-email</v-icon>
                          </v-list-tile-avatar>
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
                          <v-list-tile-avatar>
                            <v-icon>mdi-phone</v-icon>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-sub-title
                              >Contact Phone:</v-list-tile-sub-title
                            >
                            <v-list-tile-title>{{
                              formatPhoneNumber
                            }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                    <v-flex xs4>
                      <v-subheader>Attached Files:</v-subheader>
                      <v-list class="transparent" light>
                        <v-list-tile v-for="(file, x) in files" :key="x">
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
                    </v-flex>
                  </v-layout>
                  <v-layout justify-center>
                    <v-flex shrink>
                      <v-checkbox
                        v-model="verified"
                        label="I have verified my response information."
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-stepper-content>

              <v-stepper-content step="6" class="elevation-0 pt-0">
                <v-container grid-list-lg fluid class="my-0">
                  <v-layout row justify-center>
                    <v-flex xs12 sm8>
                      <div ref="capture">
                        <v-card light>
                          <v-card-title class="success white--text"
                            ><v-icon large dark class="mr-3">mdi-check</v-icon>
                            <h3>
                              Your submission was successfully received!
                            </h3></v-card-title
                          >
                          <v-card-text>
                            <v-layout row justify-center>
                              <v-flex xs6>
                                <v-subheader
                                  >Submission Information:</v-subheader
                                >
                                <v-list two-line class="transparent">
                                  <v-list-tile>
                                    <v-list-tile-avatar>
                                      <v-icon color="success"
                                        >mdi-fingerprint</v-icon
                                      >
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                      <v-list-tile-sub-title
                                        >Response ID:</v-list-tile-sub-title
                                      >
                                      <v-list-tile-title
                                        >123456789</v-list-tile-title
                                      >
                                    </v-list-tile-content>
                                  </v-list-tile>
                                  <v-list-tile>
                                    <v-list-tile-avatar>
                                      <v-icon color="success"
                                        >mdi-barcode</v-icon
                                      >
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                      <v-list-tile-sub-title
                                        >Solicitation
                                        Title:</v-list-tile-sub-title
                                      >
                                      <v-list-tile-title>{{
                                        notificationTitle
                                      }}</v-list-tile-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
                                  <v-list-tile>
                                    <v-list-tile-avatar>
                                      <v-icon color="success"
                                        >mdi-domain</v-icon
                                      >
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                      <v-list-tile-sub-title
                                        >Company/DBA/Vendor
                                        Name</v-list-tile-sub-title
                                      >
                                      <v-list-tile-title>{{
                                        vendorName
                                      }}</v-list-tile-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
                                  <v-list-tile>
                                    <v-list-tile-avatar>
                                      <v-icon color="success"
                                        >mdi-account</v-icon
                                      >
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                      <v-list-tile-sub-title
                                        >Contact Name:</v-list-tile-sub-title
                                      >
                                      <v-list-tile-title
                                        >{{ contactFirstName }}
                                        {{ contactLastName }}</v-list-tile-title
                                      >
                                    </v-list-tile-content>
                                  </v-list-tile>
                                  <v-list-tile>
                                    <v-list-tile-avatar>
                                      <v-icon color="success">mdi-email</v-icon>
                                    </v-list-tile-avatar>
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
                                    <v-list-tile-avatar>
                                      <v-icon color="success">mdi-phone</v-icon>
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                      <v-list-tile-sub-title
                                        >Contact Phone:</v-list-tile-sub-title
                                      >
                                      <v-list-tile-title>{{
                                        formatPhoneNumber
                                      }}</v-list-tile-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
                                </v-list>
                              </v-flex>
                              <v-flex xs6>
                                <v-subheader>Attached Files:</v-subheader>
                                <v-list two-line class="transparent" light>
                                  <v-list-tile
                                    v-for="(file, x) in files"
                                    :key="x"
                                  >
                                    <v-list-tile-avatar>
                                      <v-icon color="green">mdi-check</v-icon>
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
                              </v-flex>
                            </v-layout>
                          </v-card-text>
                        </v-card>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
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
        <v-btn
          v-if="step === 6"
          depressed
          color="success"
          large
          round
          @click="print"
          >Print verification</v-btn
        >
        <v-btn v-if="step === 5" depressed color="success" round @click="submit"
          >Submit response<v-icon>mdi-send</v-icon></v-btn
        >
        <v-btn
          v-if="step < 5"
          depressed
          round
          large
          :disabled="
            (step === 1 &&
              vendorId.length !== 6 &&
              vendorId.length !== 7 &&
              vendorId.length !== 9) ||
              (step === 4 && files.length === 0) ||
              (step === 5 && !verified)
          "
          :class="step === 5 ? 'success' : 'primary'"
          @click="step++"
          >{{ buttonText
          }}<v-icon right>{{
            step === 5 ? 'mdi-cloud-upload' : 'mdi-chevron-right'
          }}</v-icon></v-btn
        >
        <v-btn v-if="step == 6" color="green" dark depressed>
          Back to Procurement
        </v-btn>
        <v-spacer />
      </v-toolbar>
    </v-footer>
    <v-dialog v-model="clearFilesDialog" width="400">
      <v-card width="400" dark color="error">
        <v-card-title class="justify-space-between"
          ><h2 class="font-weight-regular">Clear all files?</h2></v-card-title
        >
        <v-card-actions class="justify-space-between">
          <v-btn light depressed @click="clearFilesDialog = false"
            >Cancel</v-btn
          >
          <v-btn outline color="white" @click="clearFiles"
            >Clear all files</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import html2canvas from 'html2canvas'

export default {
  layout: 'response',
  data() {
    return {
      step: 1,
      verified: false,
      vendorName: '',
      contactFirstName: '',
      fileDeleteDialog: false,
      fileToDelete: null,
      vendorId: '',
      fileDialog: false,
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
      clearFilesDialog: false,
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
    formatPhoneNumber() {
      const phoneNumber = this.contactPhone.match(/^(\d{3})(\d{3})(\d{4})$/)
      if (phoneNumber)
        return (
          '(' + phoneNumber[1] + ') ' + phoneNumber[2] + '-' + phoneNumber[3]
        )
      return 0
    },
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
  created() {
    if (this.solicitation.length === 0) return this.$nuxt.$router.push('/')
  },
  mounted() {
    this.notificationTitle = this.solicitation[0].solicitationTitle
    this.notificationText = this.solicitation[0].solicitationText
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
.v-tooltip__content {
  opacity: 1;
}
</style>
