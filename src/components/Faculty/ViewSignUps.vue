<template>
  <v-card class="fullBorderCurve pa-4">
    <v-card-title class="font-weight-bold text-darkBlue mb-6">
      <v-row>
        <v-col cols="auto" class="pa-0 pt-1">
          <v-avatar class="pr-0">
            <v-icon>
              <font-awesome-icon
                icon="fa-solid fa-calendar"
                class="text-darkBlue" />
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="auto" class="text-h5 font-weight-bold pa-0">
          <v-card-title class="font-weight-bold text-h5 pl-2">
            {{ eventData.title }} Signups
          </v-card-title>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-title>
    <v-card-text class="pa-0 px-2">
      <v-row class="pa-0">
        <v-col class="pa-0">
          <v-card-subtitle class="font-weight-bold text-mediumBlue py-0">
            {{ formatDate(eventData.date) }}
          </v-card-subtitle>
          <v-card-subtitle class="font-weight-bold text-mediumBlue py-0">
            {{ createTimesInfoString(eventData) }}
          </v-card-subtitle>
        </v-col>
      </v-row>
      <v-row>
        <v-card-title class="font-weight-bold text-darkGray pb-0">
          Students Attending
        </v-card-title>
      </v-row>
      <v-row>
        <v-col>
          <v-card
            class="repertoireItemGradient mainCardBorder pl-4 pr-4 mb-2"
            v-for="signup in eventData.signups">
            <v-row>
              <v-col cols="1" align-self="center">
                <v-avatar class="bg-darkBlue">
                  <v-img
                    :src="
                      this.userStore.userRoleInfo.users.filter(
                        (u) => u.studentId === signup.studentId
                      )[0].picture
                    "></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="3" align-self="center">
                <v-card-title class="pb-0 font-weight-bold">
                  {{
                    this.userStore.userRoleInfo.users.filter(
                      (u) => u.studentId === signup.studentId
                    )[0].fName
                  }}
                  {{
                    this.userStore.userRoleInfo.users.filter(
                      (u) => u.studentId === signup.studentId
                    )[0].lName
                  }}
                </v-card-title>
                <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
                  Level:
                  {{
                    this.userStore.userRoleInfo.users.filter(
                      (u) => u.studentId === signup.studentId
                    )[0].classification
                  }}
                </v-card-subtitle>
              </v-col>
              <v-col cols="3" align-self="center">
                <v-btn
                  elevation="0"
                  size="small"
                  rounded="pill"
                  class="buttonWhite text-mediumBlue font-weight-bold text-none">
                  {{
                    this.userStore.userRoleInfo.users.filter(
                      (u) => u.studentId === signup.studentId
                    )[0].major
                  }}
                </v-btn>
              </v-col>
              <v-col cols="2" align-self="center">
                <v-btn
                  elevation="0"
                  size="small"
                  rounded="pill"
                  class="buttonGradient text-white font-weight-bold">
                  {{ get12HourTimeStringFromString(signup.timeslot) }}
                </v-btn>
              </v-col>
              <v-col cols="3" align-self="center" class="text-right">
                <v-btn
                  elevation="0"
                  size="small"
                  rounded="pill"
                  class="buttonWhite text-mediumBlue font-weight-bold text-none"
                  @click="signUpDialog = true">
                  Edit
                </v-btn>
                <v-dialog v-model="signUpDialog" persistent max-width="1000px">
                  <EventSignupDialogBody
                    @closeEventDialogEvent="closeEventSignupDialog"
                    @regenerateSignups="regenerateSignups()"
                    :sent-signup-data="signup"
                    :sent-signup-event-data="this.eventData"
                    :sentBool="true">
                  </EventSignupDialogBody>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import CritiqueFacultyComponent from "./CritiqueFacultyComponent.vue";
  import EventSignupDialogBody from "../Admin/AdminEventSignupDialogBody.vue";
  import { DateTimeMixin } from "../../mixins/DateTimeMixin.js";

  import { useUserStore } from "../../stores/UserStore.js";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "CritiqueListComponent",
    components: {
      CritiqueFacultyComponent,
      EventSignupDialogBody,
    },
    props: {
      eventData: {},
    },
    data() {
      return {
        signUpDialog: false,
      };
    },
    mixins: [DateTimeMixin],
    methods: {
      printSignup(signup) {
        console.log(signup);
      },
      closeViewSignUpsDialog() {
        this.$emit("closeViewSignUpsDialogEvent", false);
      },
      /* This returns time slots in x intervals between two times */
      getTimeSlots(startDate, endDate, interval, place) {
        var slots = [];
        var isMade = true;
        if (this.slotsCount.length < place + 1) {
          this.slotsCount.push(0);
          isMade = false;
        }

        var intervalMillis = interval * 60 * 1000;

        while (startDate < endDate) {
          var mins = (startDate.getMinutes() + "0").slice(0, 2);
          slots.push(startDate.getHours() + ":" + mins);
          startDate.setTime(startDate.getTime() + intervalMillis);
          if (!isMade) {
            this.slotsCount[place]++;
          }
        }
        console.log("Place " + place + ": " + this.slotsCount[place]);
        return slots;
      },
      /* This takes a date and time string and changes to a Date */
      getDates(dateTime) {
        return new Date(dateTime);
      },
      getTime(dateTime) {
        var dateTimeParse = [];
        dateTimeParse = dateTime.split(" ");
        return dateTimeParse[1];
      },
      formatDate(date) {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        return new Date(date).toLocaleDateString("us-EN", options);
      },
      createTimesInfoString(event) {
        let timesString = "";
        for (let i = 0; i < event.times.length; i++) {
          timesString +=
            this.get12HourTimeString(new Date(event.times[i].startTime)) +
            " - " +
            this.get12HourTimeString(new Date(event.times[i].endTime));
          if (i + 1 < event.times.length) {
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
      closeEventSignupDialog(val) {
        this.signUpDialog = val;
      },
      regenerateSignups() {
        console.log("regenerateSignups");
        // this.$emit("regenerateSignups");
        // this.regenerateEventData();
        // this.isEdit = this.hasPriorSignup ? true : false;
      },
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
  };
</script>
