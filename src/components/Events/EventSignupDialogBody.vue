<template>
  <v-container fluid>
    <v-card class="rounded-lg mainBlur">
      <v-card-title class="font-weight-bold text-darkBlue ml-4 mt-4">
        <v-row>
          <v-col class="text-h5 font-weight-bold pb-0 mb-2">
            {{ signupData.title }} Signup</v-col
          >
        </v-row>
      </v-card-title>
      <v-card-subtitle class="font-weight-bold text-mediumBlue pt-0 ml-4">
        {{ formatDate(signupData.date) }}
      </v-card-subtitle>
      <v-card-subtitle class="font-weight-bold text-mediumBlue ml-4">
        {{ timesInfoString }}
      </v-card-subtitle>
      <v-card-text class="pb-0">
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <v-card-subtitle class="font-weight-bold text-darkGray pb-2">
                  Private Instructor
                </v-card-subtitle>
                <v-select
                  class="lighterBlur font-weight-semi-bold text-darkBlue ml-4"
                  v-model="selectedInstructor"
                  :items="this.userStore.userRoleInfo.instructors"
                  item-title="name"
                  item-value="id"
                  return-object>
                </v-select>
              </v-col>
              <v-col>
                <v-card-subtitle class="font-weight-bold text-darkGray pb-2">
                  Accompanist
                </v-card-subtitle>
                <v-select
                  class="lighterBlur font-weight-semi-bold text-darkBlue ml-4"
                  v-model="selectedInstructor"
                  :items="this.userStore.userRoleInfo.instructors"
                  item-title="name"
                  item-value="id">
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <!-- Not supported in database yet, so hardcoded for now, but doesn't effect anything -->
                <v-card-subtitle class="font-weight-bold text-darkGray">
                  Voice Part
                </v-card-subtitle>
                <v-card-subtitle
                  class="font-weight-bold text-darkBlue mt-5 mb-1">
                  Soprano
                </v-card-subtitle>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="">
                <v-card-subtitle class="font-weight-bold text-darkGray">
                  Musical Selection
                </v-card-subtitle>
                <v-card-text class="">
                  <v-row>
                    <v-col cols="auto">
                      <v-btn
                        elevation="0"
                        rounded="lg"
                        class="text-none searchGradient text-white font-weight-bold"
                        @click="eventRepertoireSelection = true">
                        Search your repertoire
                        <template v-slot:append>
                          <v-icon
                            size="sm"
                            class="font-weight-semi-bold pl-4 pr-4"
                            ><font-awesome-icon
                              icon="fa-solid fa-magnifying-glass"
                              class="text-darkBlue"
                          /></v-icon>
                        </template>
                      </v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="auto">
                      <v-btn
                        elevation="0"
                        rounded="lg"
                        class="text-none buttonGradient text-white font-weight-bold">
                        Add new
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pb-0">
                      <v-card class="eventsGradient rounded-lg mainBlur">
                        <v-card-title
                          class="font-weight-bold text-white pl-5 pb-0">
                          Selected
                        </v-card-title>
                        <v-card-text class="pb-2">
                          <v-card
                            v-if="Object.keys(selectedPiece).length != 0"
                            class="bg-white rounded-lg lighterBlur my-2">
                            <v-card-text>
                              <v-row>
                                <v-col cols="1">
                                  <v-avatar class="bg-lightBlue">
                                    <!-- Need to get composer API working to get image -->
                                    <v-img></v-img>
                                  </v-avatar>
                                </v-col>
                                <v-col cols="11" class="">
                                  <v-card-subtitle
                                    class="font-weight-bold text-darkGray">
                                    {{ selectedPiece.name }}
                                  </v-card-subtitle>
                                  <v-card-subtitle
                                    class="font-weight-bold text-darkBlue">
                                    {{ selectedPiece.composer.name }}
                                  </v-card-subtitle>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <!-- ***It's currently possible to signup without selecting a timeslot -->
            <!-- @ethanimooney: Add error checking and handling -->
            <v-card-subtitle class="font-weight-bold text-darkGray pl-1">
              Timeslot Selection
            </v-card-subtitle>
            <v-row class="pt-3">
              <v-card-text v-for="slotsList in timeslots">
                <v-btn
                  v-for="timeSlot in slotsList"
                  @click="setSelectedTimeslot(timeSlot)"
                  :class="
                    selectedTimeslot.id === timeSlot.id
                      ? 'bg-darkGray'
                      : 'buttonGradient'
                  "
                  elevation="0"
                  rounded="lg"
                  size="x-small"
                  class="text-white font-weight-bold mr-2"
                  >{{
                    parseInt(timeSlot.time.substring(0, 2)) > 12
                      ? parseInt(timeSlot.time.substring(0, 2)) -
                        12 +
                        timeSlot.time.substring(2, timeSlot.time.length - 3)
                      : parseInt(timeSlot.time.substring(0, 2)) < 10
                      ? timeSlot.time.substring(1, timeSlot.time.length - 3)
                      : timeSlot.time.substring(0, timeSlot.time.length - 3)
                  }}</v-btn
                >
              </v-card-text>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="mr-2 mb-2 pt-0 pr-4">
        <v-btn
          rounded="lg"
          elevation="0"
          class="text-none buttonCancel ml-auto mr-3 text-white font-weight-bold"
          @click="closeDialog()">
          Cancel
        </v-btn>
        <v-btn
          rounded="lg"
          elevation="0"
          class="text-none buttonGradient text-white font-weight-bold"
          @click="createOrEditSignup()">
          {{ isEdit ? "Save" : "Signup" }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="eventRepertoireSelection" max-width="600px">
      <EventRepertoireSelectionBody
        :sent-selected-piece="selectedPiece"
        @setSelectedPiece="setSelectedPiece"
        @closeEventRepertoireSelection="
          eventRepertoireSelection = false
        "></EventRepertoireSelectionBody>
    </v-dialog>
  </v-container>
</template>

<script>
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import EventRepertoireSelectionBody from "./EventRepertoireSelectionBody.vue";
  import { mapStores } from "pinia";
  export default {
    name: "EventSignupDialogBody",
    data() {
      return {
        isEdit: this.sentBool,
        timeslots: this.signupData.timeslots,
        timesInfoString: this.signupData.timesInfoString,
        selectedTimeslot: {},
        selectedPiece: this.signupData.selectedPiece,
        selectedInstructor: {},
        eventRepertoireSelection: false,
      };
    },
    components: {
      EventRepertoireSelectionBody,
    },
    props: {
      signupData: {},
      sentBool: false,
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    watch: {
      sentBool(newBool) {
        this.isEdit = newBool;
      },
    },
    mounted() {
      // Set default selected piece
      Object.keys(this.signupData.selectedInstructor).length === 0
        ? (this.selectedInstructor = this.userStore.userRoleInfo.instructors[0])
        : (this.selectedInstructor = this.signupData.selectedInstructor);

      for (let time of this.timeslots) {
        for (let ts of time) {
          if (ts.time === this.signupData.selectedTimeslot) {
            this.selectedTimeslot = ts;
            console.log(this.selectedTimeslot);
            break;
          }
        }
      }
    },
    methods: {
      setSelectedPiece(piece) {
        if (this.isEdit) {
          let pieceId = piece.id;
          delete piece.id;
          this.selectedPiece = {
            ...{ id: this.selectedPiece.id },
            ...piece,
            ...{ pieceId: pieceId },
          };
        } else {
          this.selectedPiece = piece;
        }
        this.eventRepertoireSelection = false;
      },
      setSelectedTimeslot(timeslot) {
        this.selectedTimeslot = timeslot;
      },
      closeDialog() {
        this.$emit("closeEventDialogEvent", false);
      },
      formatDate(date) {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        return new Date(date).toLocaleDateString("us-EN", options);
      },
      async createOrEditSignup() {
        if (Object.keys(this.selectedTimeslot).length === 0) {
          alert("No Timeslot Selected");
        } else if (Object.keys(this.selectedPiece).length === 0) {
          alert("No Musical Selection Made");
        } else {
          if (this.isEdit) {
            let data = {
              id: this.signupData.id,
              timeslot: this.selectedTimeslot.time,
              eventId: this.signupData.eventId,
              studentinfoId: this.userStore.userRoleInfo.id,
            };
            await this.eventsStore.updateSignupForEvent(
              data,
              this.selectedPiece
            );
          } else {
            let data = {
              timeslot: this.selectedTimeslot.time,
              eventId: this.signupData.eventId,
              studentinfoId: this.userStore.userRoleInfo.id,
            };
            await this.eventsStore.createSignupForEvent(
              data,
              this.selectedPiece
            );
          }

          this.$emit("regenerateSignups");
          this.closeDialog();
        }
      },
    },
  };
</script>

<style scoped>
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }
  .v-text-field {
    border-radius: 100px;
  }
</style>
