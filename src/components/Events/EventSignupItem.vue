<template>
  <v-container>
    <v-card class="lighterBlur eventsSignupItemGradient rounded-lg pa-0">
      <v-row class="pa-4" no-gutters align="center">
        <v-col cols="auto">
          <v-card-title class="font-weight-bold text-white pb-0 pt-0 pl-0">
            {{ eventData.type }}
          </v-card-title>
          <v-card-subtitle class="font-weight-semi-bold text-darkBlue pl-0">
            {{ formatDate(eventData.date) }}
          </v-card-subtitle>
          <v-card-subtitle class="font-weight-semi-bold text-darkBlue pl-0">
            {{ timesInfoString }}
          </v-card-subtitle>
        </v-col>
        <v-spacer></v-spacer>
        <v-col justify="center" align="end" cols="auto">
          <v-row align="center" justify="center">
            <v-col justify="center">
              <v-btn
                disabled
                elevation="0"
                size="small"
                rounded="pill"
                class="bg-white text-darkBlue font-weight-bold">
                {{ eventData.signups.length }} /
                {{ getTotalTimeslots() }} Timeslots Filled
              </v-btn>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col justify="center">
              <v-btn
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonGradient text-white font-weight-bold text-capitalize"
                @click="
                  this.userStore.userInfo.role === 'student'
                    ? hasPriorSignup
                      ? (editDialog = true)
                      : (signUpDialog = true)
                    : (availabilityDialog = true)
                ">
                {{
                  this.userStore.userInfo.role === "student"
                    ? hasPriorSignup
                      ? "Edit"
                      : "Signup"
                    : "Add Availability"
                }}
              </v-btn>
              <v-dialog v-model="signUpDialog" persistent max-width="1000px">
                <EventItem
                  @closeEventDialogEvent="closeEventDialog"
                  @regenerateSignups="regenerateSignups()"
                  :eventData="eventData"
                  :timesInfoString="timesInfoString"
                  :timeslots="timeslots">
                </EventItem>
              </v-dialog>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
  import EventItem from "./EventItem.vue";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  import EventSignUpDataService from "../../services/eventsignup.js";
  export default {
    name: "EventSignupItem",
    components: {
      EventItem,
    },
    data() {
      return {
        signUpDialog: false,
        hasPriorSignup: false,
        // Needs to be implemented
        availabilityDialog: false,
        timesInfoString: "",
        // Creation of timeslots needs to probably just be moved to the eventsStore
        // TODO @ethanimooney: Do this
        timeslots: [],
      };
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    async mounted() {
      this.timesInfoString = this.createTimesInfoString();
      this.checkForPriorSignup();
      this.timeslots = this.getTimeSlots(this.eventData.times);
    },
    props: {
      eventData: {},
    },
    methods: {
      createTimesInfoString() {
        let timesString = "";
        for (let i = 0; i < this.eventData.times.length; i++) {
          timesString +=
            this.get12HourTimeString(
              new Date(this.eventData.times[i].startTime)
            ) +
            " - " +
            this.get12HourTimeString(new Date(this.eventData.times[i].endTime));
          if (i + 1 < this.eventData.times.length) {
            timesString += " & ";
          }
        }

        return timesString;
      },
      get12HourTimeString(t) {
        let hours = t.getHours();
        let suffix = hours >= 12 ? "PM" : "AM";
        hours = ((hours + 11) % 12) + 1;
        let minutes = t.getMinutes() === 0 ? "00" : t.getMinutes();
        return hours + ":" + minutes + suffix;
      },
      formatDate(date) {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        return new Date(date).toLocaleDateString("us-EN", options);
      },
      checkForPriorSignup() {
        this.hasPriorSignup = this.eventsStore.hasUserSignedUpForEvent(
          this.eventData.id
        );
      },
      regenerateSignups() {
        this.$emit("regenerateSignups");
        this.checkForPriorSignup();
      },
      async closeEventDialog(val) {
        this.signUpDialog = val;
        await this.getPriorSignup();
      },
      async getPriorSignup() {
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

        if (oldSignups.length >= 1) {
          this.hasPriorSignup = true;
        } else {
          this.hasPriorSignup = false;
        }
      },
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
      getTotalTimeslots() {
        let total = 0;
        for (let time of this.timeslots) {
          total += time.length;
        }

        return total;
      },
    },
  };
</script>

<style scoped>
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }
  .v-btn {
    opacity: 100%;
  }
</style>
