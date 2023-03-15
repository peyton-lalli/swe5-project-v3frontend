<template>
  <v-container fluid class="eventComponent">
    <v-card class="rounded-lg mainblur">
      <v-card-title class="font-weight-bold text-darkBlue">
        <v-row>
          <v-col class="text-h5 font-weight-bold">
            {{ eventData.title }} Signup</v-col
          >
          <v-col class="text-right">
            <v-btn elevation="0" @click="closeDialog()">
              <v-icon>
                <font-awesome-icon
                  icon="a-solid fa-circle-xmark"
                  class="text-lightBlue">
                </font-awesome-icon>
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-subtitle class="font-weight-bold text-darkBlue">
        {{ formatDate(eventData.date) }}
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <v-card-subtitle class="font-weight-bold text-darkGray">
                  Private Instructor
                </v-card-subtitle>
                <v-row justify="center" class="pl-1 mt-0 mb-1">
                  <v-col cols="2" align-self="center">
                    <v-avatar class="bg-darkBlue">
                      <v-img
                        :src="
                          this.userStore.userRoleInfo.instructor.picture
                        "></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="9">
                    <v-card-title class="text-darkBlue font-weight-bold pb-2">
                      {{ this.userStore.userRoleInfo.instructor.name }}
                    </v-card-title>
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <v-card-subtitle class="font-weight-bold text-darkGray">
                  Accompanist
                </v-card-subtitle>
                <v-row justify="center" class="pl-1 mt-0 mb-1">
                  <v-col cols="2" align-self="center">
                    <v-avatar class="bg-darkBlue">
                      <v-img></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="9">
                    <v-card-title class="text-darkBlue font-weight-bold pb-2">
                      Peyton Lalli
                    </v-card-title>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card-subtitle class="font-weight-bold text-darkGray">
                  Voice Part
                </v-card-subtitle>
                <v-card-subtitle
                  class="font-weight-bold text-darkBlue mt-5 mb-1">
                  Soprano
                </v-card-subtitle>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-card-subtitle class="font-weight-bold text-darkGray pl-1">
              Timeslot Selection
            </v-card-subtitle>
            <v-row class="pt-3">
              <v-card-text v-for="slotsList in getTimeSlots(eventData.times)">
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
                  >{{ timeSlot.time }}</v-btn
                >
              </v-card-text>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-subtitle class="font-weight-bold text-darkGray">
              Musical Selection
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-select
                    bg-color="lightBlue"
                    class="text-blue"
                    placeholder="Search"
                    item-title="name"
                    item-value="id"
                    variant="solo"
                    text="darkBlue"></v-select>
                </v-col>
                <v-col cols="2"> or </v-col>
                <v-col cols="4">
                  <v-btn
                    elevation="0"
                    rounded="pill"
                    class="buttonGradient text-white font-weight-bold">
                    Add New
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card class="eventsGradient rounded-lg mainBlur">
                    <v-card-title class="font-weight-bold text-white pl-5 pb-0">
                      Selected
                    </v-card-title>
                    <v-card-text>
                      <v-card
                        class="rounded-lg mt-4 lighterBlur"
                        v-for="piece in this.userStore.userRoleInfo.repertoire"
                        @click="setSelectedPiece(piece)"
                        :class="
                          this.selectedPiece.id === piece.id
                            ? 'bg-lightBlue'
                            : 'bg-white'
                        ">
                        <v-card-text class="pt-0">
                          <v-row justify="center" class="pl-1 mt-0">
                            <v-col cols="1" align-self="center">
                              <v-avatar class="bg-darkBlue">
                                <!-- Need to get composer API working to get image -->
                                <v-img></v-img>
                              </v-avatar>
                            </v-col>
                            <v-col cols="11">
                              <v-row>
                                <v-col>
                                  <v-card-subtitle
                                    class="mt-2 ml-1 font-weight-bold">
                                    {{ piece.name }}
                                  </v-card-subtitle>
                                  <v-card-subtitle
                                    class="text-darkBlue font-weight-bold pb-2 ml-1">
                                    {{ piece.composer.name }}
                                  </v-card-subtitle>
                                </v-col>
                              </v-row>
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
          <v-col>
            <v-row>
              <v-col>
                <v-card
                  class="eventsGradient fullBorderCurve mainblur"></v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-center">
        <v-btn
          rounded="pill"
          class="buttonGradient text-white mr-3"
          @click="createSignup()">
          Signup
        </v-btn>
        <v-btn
          rounded="pill"
          color="#DA9B9B"
          class="text-white mr-3"
          @click="closeDialog()">
          Cancel
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import EventSignUpDataService from "../../services/eventsignup.js";
  import EventSongsDataService from "../../services/eventsongs.js";
  import { mapStores } from "pinia";
  export default {
    name: "EventItemEdit",
    data() {
      return {
        selectedTimeslot: {},
        // Hard coded for now, needs work!
        selectedPiece: {},
      };
    },
    props: {
      eventData: {},
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    mounted() {
      // Set default selected piece
      this.selectedPiece = this.userStore.userRoleInfo.repertoire[0];
    },
    methods: {
      // Given all of the time sections for an event, return a 2d array of timeslots
      getTimeSlots(times) {
        let counter = 1;
        let totalSlots = [];

        for (let time of times) {
          let slots = [];
          let intervalMillis = time.interval * 60 * 1000;

          let startTime = new Date(time.startTime);
          let endTime = new Date(time.endTime);

          while (startTime < endTime) {
            let mins = (startTime.getMinutes() + "0").slice(0, 2);
            slots.push({
              id: counter,
              time: startTime.getHours() + ":" + mins,
            });
            startTime.setTime(startTime.getTime() + intervalMillis);
            counter++;
          }

          totalSlots.push(slots);
        }

        return totalSlots;
      },
      formatDate(date) {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        return new Date(date).toLocaleDateString("us-EN", options);
      },
      /* This takes a date and time string and changes to a Date */
      getDates(dateTime) {
        return new Date(dateTime);
      },
      setSelectedPiece(piece) {
        this.selectedPiece = piece;
      },
      setSelectedTimeslot(timeslot) {
        this.selectedTimeslot = timeslot;
      },
      closeDialog() {
        this.$emit("closeEventDialogEvent", false);
      },
      async createSignup() {
        let data = {
          timeslot: this.selectedTimeslot.time,
          eventId: this.eventData.id,
          studentinfoId: this.userStore.userRoleInfo.id,
        };

        await this.eventsStore.createSignupForEvent(data, this.selectedPiece);
        // await this.createEventSong();
        this.$emit("regenerateSignups");
        this.closeDialog();
      },
      async findSingupId() {
        let eventId = 0;
        await EventSignUpDataService.getEventId(this.eventData.id)
          .then((response) => {
            eventId = response.data.EventSignUp.filter((es) => {
              return es.studentinfoId === this.userStore.userRoleInfo.id;
            });
            eventId = eventId[0].id;
          })
          .catch((e) => {
            console.log(e);
          });

        return eventId;
      },
      async checkForPriorSignup() {
        let oldSignups = 0;
        await EventSignUpDataService.getEventId(this.eventData.id)
          .then((response) => {
            oldSignups = response.data.EventSignUp.filter((es) => {
              return es.studentinfoId === this.userStore.userRoleInfo.id;
            });
          })
          .catch((e) => {
            console.log(e);
          });

        console.log(oldSignups);

        if (oldSignups.length >= 1) {
          return true;
        }

        return false;
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
