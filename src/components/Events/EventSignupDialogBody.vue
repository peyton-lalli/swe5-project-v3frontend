<template>
  <v-container fluid>
    <v-card class="rounded-lg mainBlur">
      <v-card-title class="font-weight-bold text-darkBlue ml-4 mt-4">
        <v-row>
          <v-col class="text-h5 font-weight-bold pb-0 mb-2">
            {{ eventData.title }} Signup</v-col
          >
        </v-row>
      </v-card-title>
      <v-card-subtitle class="font-weight-bold text-mediumBlue pt-0 ml-4">
        {{ formatDate(eventData.date) }}
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
                  Instrument
                </v-card-subtitle>
                <v-select
                  class="lighterBlue font-weight-semi-bold text-darkBlue mx-4"
                  v-model="selectedInstrument"
                  :items="this.userStore.userRoleInfo.instruments"
                  item-value="instrumentId"
                  item-title="name"
                  return-object></v-select>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
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
                  item-value="instructorId"
                  return-object>
                </v-select>
              </v-col>
              <v-col>
                <v-card-subtitle class="font-weight-bold text-darkGray pb-2">
                  Accompanist
                </v-card-subtitle>
                <v-select
                  class="lighterBlur font-weight-semi-bold text-darkBlue ml-4"
                  v-model="selectedAccompanist"
                  :items="this.userStore.userRoleInfo.accompanists"
                  item-title="name"
                  item-value="accompanistId"
                  return-object>
                </v-select>
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
                        @click="openRepertoireSelection()">
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
                            v-for="piece in selectedPieces"
                            v-if="selectedPieces.length != 0"
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
                                    {{ isEdit ? piece.piece.name : piece.name }}
                                  </v-card-subtitle>
                                  <v-card-subtitle
                                    class="font-weight-bold text-darkBlue">
                                    {{
                                      isEdit
                                        ? piece.piece.composer.name
                                        : piece.composer.name
                                    }}
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
              <v-col>
                <v-sheet
                  rounded="lg"
                  class="overflow-y-auto lighterBlur pa-4"
                  max-height="35vh"
                  min-height="35vh">
                  <v-row
                    v-for="timeSlot in availabileTimeslots"
                    class="mx-0 px-0 pb-2 my-0">
                    <v-col class="pa-0 mx-0">
                      <v-card
                        flat
                        class="rounded-lg my-0 py-0"
                        v-if="isTimeslotAvailable(timeSlot)"
                        :class="
                          selectedTimeslot.id === timeSlot.id
                            ? 'selectedListItem'
                            : 'unSelectedListItem'
                        "
                        @click="setSelectedTimeslot(timeSlot)"
                        :key="timeSlot">
                        <v-row class="py-2">
                          <v-col class="">
                            <v-card-subtitle
                              class="font-weight-bold"
                              :class="
                                selectedTimeslot.id === timeSlot.id
                                  ? 'text-white'
                                  : 'text-darkGray'
                              ">
                              {{ get12HourTimeStringFromString(timeSlot.time) }}
                            </v-card-subtitle>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="mr-2 mb-2 pt-4 pr-2">
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
        :sent-selected-instrument="selectedInstrument"
        :sent-selected-pieces="selectedPieces"
        :is-edit="isEdit"
        @setOrAddSelectedPieces="setOrAddSelectedPieces"
        @closeEventRepertoireSelection="
          eventRepertoireSelection = false
        "></EventRepertoireSelectionBody>
    </v-dialog>
  </v-container>
</template>

<script>
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  import { DateTimeMixin } from "../../mixins/DateTimeMixin.js";
  import EventRepertoireSelectionBody from "./EventRepertoireSelectionBody.vue";

  export default {
    name: "EventSignupDialogBody",
    components: {
      EventRepertoireSelectionBody,
    },
    data() {
      return {
        signupData: JSON.parse(JSON.stringify(this.sentSignupData)),
        eventData: JSON.parse(JSON.stringify(this.sentSignupEventData)),
        isEdit: this.sentBool,
        timeslots: JSON.parse(JSON.stringify(this.sentSignupEventData))
          .timeslots,
        timesInfoString: JSON.parse(JSON.stringify(this.sentSignupEventData))
          .timesInfoString,
        selectedTimeslot: {},
        selectedPieces: JSON.parse(JSON.stringify(this.sentSignupData)).songs,
        selectedEventSongs: JSON.parse(JSON.stringify(this.sentSignupData))
          .songs,
        selectedInstructor: null,
        selectedInstructorAvailability: [],
        selectedAccompanist: null,
        selectedAccompanistAvailability: [],
        selectedInstrument: null,
        eventRepertoireSelection: false,
        instrumentRepertoireList: [],
        availabileTimeslots: [],
      };
    },
    mixins: [DateTimeMixin],
    props: {
      sentSignupData: {},
      sentSignupEventData: {},
      sentBool: false,
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    watch: {
      sentBool(newBool) {
        this.isEdit = newBool;
      },
      sentSignupData(data) {
        this.signupData = { ...data };

        this.setDefaultSelectedInstructorAndAccompanist();

        for (let ts of this.timeslots) {
          if (ts.time === this.signupData.timeslot) {
            this.selectedTimeslot = ts;
            break;
          }
        }
      },
      sentSignupEventData(data) {
        this.eventData = JSON.parse(JSON.stringify(data));
        this.timeslots = this.eventData.timeslots;
        this.timesInfoString = this.eventData.timesInfoString;
      },
      async selectedInstructor(instructor) {
        console.log(instructor);
        if (instructor) {
          this.selectedInstructorAvailability =
            await this.eventsStore.getAvailaibilityForEventByUserId(
              instructor.userId,
              this.eventData.eventId
            );
          this.generateFilteredTimeslotList();
        }
      },
      async selectedAccompanist(accompanist) {
        if (accompanist) {
          this.selectedAccompanistAvailability =
            await this.eventsStore.getAvailaibilityForEventByUserId(
              accompanist.userId,
              this.eventData.eventId
            );
          this.generateFilteredTimeslotList();
        }
      },
      selectedInstrument(data) {
        if (data) {
          this.instrumentRepertoireList =
            this.userStore.userRoleInfo.repertoires.filter(
              (r) => r.studentinstrumentId === data.studentinstrumentId
            )[0];

          this.selectedInstructor =
            this.userStore.userRoleInfo.instructors.filter(
              (i) => i.studentinstrumentId === data.studentinstrumentId
            )[0];
          this.selectedAccompanist =
            this.userStore.userRoleInfo.accompanists.filter(
              (i) => i.studentinstrumentId === data.studentinstrumentId
            )[0];
        }
      },
    },
    mounted() {
      console.log(this.timeslots);
      // Set default selected piece
      this.setDefaultSelectedInstructorAndAccompanist();

      // this.availabileTimeslots = this.timeslots;

      for (let ts of this.timeslots) {
        if (ts.time === this.signupData.timeslot) {
          this.selectedTimeslot = ts;
          break;
        }
      }
    },
    methods: {
      generateFilteredTimeslotList() {
        let interval = this.eventData.times[0].interval;
        let instructorTimes = [];
        for (let time of this.selectedInstructorAvailability) {
          let obj = {
            startTime: new Date(time.eventDate + " " + time.startTime),
            endTime: new Date(time.eventDate + " " + time.endTime),
            interval: interval,
          };
          instructorTimes.push(obj);
        }

        let accompanistTimes = [];
        for (let time of this.selectedAccompanistAvailability) {
          let obj = {
            startTime: new Date(time.eventDate + " " + time.startTime),
            endTime: new Date(time.eventDate + " " + time.endTime),
            interval: interval,
          };
          accompanistTimes.push(obj);
        }

        let times = [];

        times = instructorTimes.concat(accompanistTimes);

        let availableTimes = [];

        console.log(accompanistTimes);
        console.log(instructorTimes);

        if (instructorTimes.length === 0 && accompanistTimes.length > 0) {
          availableTimes = accompanistTimes;
          this.availabileTimeslots = this.getTimeSlotsCombined(availableTimes);
        } else if (
          accompanistTimes.length === 0 &&
          instructorTimes.length > 0
        ) {
          availableTimes = instructorTimes;
          this.availabileTimeslots = this.getTimeSlotsCombined(availableTimes);
        } else if (accompanistTimes.length > 0 && instructorTimes.length > 0) {
          for (let time of times) {
            if (
              times.filter(
                (t) =>
                  t.startTime.getTime() === time.startTime.getTime() &&
                  t.endTime.getTime() === time.endTime.getTime()
              ).length > 1
            ) {
              if (
                availableTimes.findIndex(
                  (at) =>
                    at.startTime.getTime() === time.startTime.getTime() &&
                    at.endTime.getTime() === time.endTime.getTime()
                ) === -1
              ) {
                availableTimes.push(time);
              }
            }
          }
          this.availabileTimeslots = this.getTimeSlotsCombined(availableTimes);
        } else if (
          accompanistTimes.length === 0 &&
          instructorTimes.length === 0
        ) {
          console.log("empty");
          this.availabileTimeslots = this.timeslots;
        }
      },
      isTimeslotAvailable(timeslot) {
        if (this.availabileTimeslots.length > 0) {
          let isAvailable = false;
          this.availabileTimeslots.find((ts) => ts.time === timeslot.time)
            ? (isAvailable = true)
            : (isAvailable = false);
          return isAvailable;
        }
        return true;
      },
      setOrAddSelectedPieces(pieces) {
        this.selectedPieces = pieces;
        this.eventRepertoireSelection = false;
      },
      openRepertoireSelection() {
        if (!this.selectedInstrument) {
          alert("Please Select an Instrument First.");
        } else {
          this.eventRepertoireSelection = true;
        }
      },
      setDefaultSelectedInstructorAndAccompanist() {
        if (this.signupData.instructorId != null) {
          this.signupData.instructorId
            ? (this.selectedInstructor =
                this.userStore.userRoleInfo.instructors.filter(
                  (i) => i.instructorId === this.signupData.instructorId
                )[0])
            : (this.selectedInstructor = null);

          this.selectedInstrument =
            this.userStore.userRoleInfo.instruments.filter(
              (i) =>
                i.studentinstrumentId ===
                this.selectedInstructor.studentinstrumentId
            )[0];
        }

        if (this.signupData.accompanistId != null) {
          this.signupData.accompanistId
            ? (this.selectedAccompanist =
                this.userStore.userRoleInfo.accompanists.filter(
                  (i) => i.accompanistId === this.signupData.accompanistId
                )[0])
            : (this.selectedAccompanist = null);
        }
      },
      setSelectedTimeslot(timeslot) {
        this.selectedTimeslot = timeslot;
      },
      closeDialog() {
        this.$emit("closeEventDialogEvent", false);
      },
      async createOrEditSignup() {
        if (Object.keys(this.selectedTimeslot).length === 0) {
          alert("No Timeslot Selected");
        } else if (this.selectedPieces.length === 0) {
          alert("No Musical Selection Made");
        } else {
          if (this.isEdit) {
            let data = {
              signupId: this.signupData.signupId,
              accompanistId: this.selectedAccompanist.accompanistId,
              instructorId: this.selectedInstructor.instructorId,
              timeslot: this.selectedTimeslot.time,
              eventId: this.eventData.eventId,
              studentId: this.userStore.userRoleInfo.studentId,
            };

            await this.eventsStore.updateSignupForEvent(
              data,
              this.selectedPieces
            );
          } else {
            let data = {
              accompanistId: this.selectedAccompanist.accompanistId,
              instructorId: this.selectedInstructor.instructorId,
              timeslot: this.selectedTimeslot.time,
              eventId: this.eventData.eventId,
              studentId: this.userStore.userRoleInfo.studentId,
            };
            await this.eventsStore.createSignupForEvent(
              data,
              this.selectedPieces
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
