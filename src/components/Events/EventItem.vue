<template>
  <v-container fluid class="eventComponent">
    <v-card class="rounded-lg mainblur">
      <v-card-title class="font-weight-bold text-darkBlue">
        <v-row>
          <v-col class="text-h5 font-weight-bold">
            {{ eventData.title }} Request</v-col
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
        {{ date }}
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
                      <v-img></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="9">
                    <v-card-title class="text-darkBlue font-weight-bold pb-2">
                      Nathan Lalli
                    </v-card-title>
                  </v-col>
                </v-row>
                <v-card-subtitle class="font-weight-bold text-darkGray">
                  Voice Part
                </v-card-subtitle>
                <v-card-subtitle
                  class="font-weight-bold text-darkBlue mt-5 mb-1">
                  Soprano
                </v-card-subtitle>
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
          </v-col>
          <v-col>
            <v-card-subtitle class="font-weight-bold text-darkGray pl-1">
              Timeslot Selection
            </v-card-subtitle>
            <v-row class="pt-3" v-for="time in eventData.times">
              <v-card-text
                v-for="time in getTimeSlots(
                  time.startTime,
                  time.endTime,
                  time.interval
                )"
                :key="index">
                <v-btn
                  elevation="0"
                  rounded="lg"
                  size="x-small"
                  class="buttonGradient text-white font-weight-bold"
                  >{{ time }}</v-btn
                >
              </v-card-text>
            </v-row>
            <!-- <v-row>
              <v-card-text
                v-for="(time, index) in getTimeSlots(
                  getDates(times[1].start_time),
                  getDates(times[1].end_time),
                  times[1].interval
                )"
                :key="index">
                <v-btn
                  elevation="0"
                  rounded="lg"
                  size="x-small"
                  class="buttonGradient text-white font-weight-bold"
                  >{{ time }}</v-btn
                >
              </v-card-text>
            </v-row> -->
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
                    :items="['Bird Upon a Tree', 'Souvenir', 'Cherry Valley']"
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
                  <v-card class="eventsGradient rounded-lg mainblur">
                    <v-card-title class="font-weight-bold text-white pl-5">
                      Selected
                    </v-card-title>
                    <v-card-text>
                      <v-card class="rounded-lg">
                        <v-card-text class="pt-0">
                          <v-row justify="center" class="pl-1 mt-0">
                            <v-col cols="1" align-self="center">
                              <v-avatar class="bg-darkBlue">
                                <v-avatar class="bg-darkBlue">
                                  <v-img
                                    src="https://www.mtishows.com/sites/default/files/profile/marcblitzstein.jpg?download=1"></v-img>
                                </v-avatar>
                              </v-avatar>
                            </v-col>
                            <v-col cols="11">
                              <v-card-subtitle
                                class="mt-2 ml-1 font-weight-bold">
                                {{
                                  this.userStore.userRoleInfo.repertoire[0].name
                                }}
                              </v-card-subtitle>
                              <v-card-subtitle
                                class="text-darkBlue font-weight-bold pb-2 ml-1">
                                <!-- {{
                                  // Not working yet, so hard coded
                                  getComposerName(
                                    this.userStore.userRoleInfo.repertoire[0]
                                  )

                                }} -->
                                Marc Blitzstein
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
          <v-col>
            <!-- <v-row>
              <v-col>
                <v-card-subtitle class="font-weight-bold text-darkGray pl-1">
                  Additional Musical Selection
                </v-card-subtitle>
              </v-col>
              <v-col class="text-right">
                <v-btn
                  elevation="0"
                  rounded="pill"
                  size="x-small"
                  class="buttonGradient text-white font-weight-bold">
                  Add to repertoire
                </v-btn>
              </v-col>
            </v-row> -->
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
        selectedTimeslot: new Date(this.eventData.date + "09:10:00"),
        // Hard coded for now, needs work!
        selectedPieceId: 1,
      };
    },
    props: {
      eventData: {},
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    mounted() {},
    methods: {
      /* This returns time slots in x intervals between two times */
      getTimeSlots(startTime, endTime, interval) {
        startTime = new Date(startTime);
        endTime = new Date(endTime);
        var slots = [];

        var intervalMillis = interval * 60 * 1000;

        while (startTime < endTime) {
          var mins = (startTime.getMinutes() + "0").slice(0, 2);
          slots.push(startTime.getHours() + ":" + mins);
          startTime.setTime(startTime.getTime() + intervalMillis);
        }
        return slots;
      },
      /* This takes a date and time string and changes to a Date */
      getDates(dateTime) {
        return new Date(dateTime);
      },
      //Not yet working
      // async getComposerName(piece) {
      //   await this.studentRepertoireStore.getComposerName(piece.composerId);
      // },
      closeDialog() {
        this.$emit("closeEventDialogEvent", false);
      },
      async createSignup() {
        let data = {
          timeslot: this.selectedTimeslot,
          eventId: this.eventData.id,
          studentinfoId: this.userStore.userRoleInfo.id,
        };

        await this.eventsStore.createSignupForEvent(data);
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
      async createEventSong() {
        let data = {
          pieceId: this.selectedPieceId,
          eventsignupId: await this.findSingupId(),
        };

        await EventSongsDataService.create(data).catch((e) => {
          console.log(e);
        });
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
