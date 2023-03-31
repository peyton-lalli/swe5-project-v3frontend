<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold">{{ eventData.type }}</v-col>
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeViewSignUpsDialog()">
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
    <v-row>
      <v-col>
        <v-card-subtitle class="font-weight-bold text-darkBlue">
          {{ formatDate(eventData.date) }}
        </v-card-subtitle>
        <v-card-subtitle class="font-weight-bold text-darkBlue">
          {{ createTimesInfoString(eventData) }}
        </v-card-subtitle>
      </v-col>
    </v-row>
    <v-row>
      <v-card-title class="font-weight-bold text-darkGray ml-3">
        Students Attending
      </v-card-title>
    </v-row>
    <v-row>
      <v-card-text>
        <v-card
          class="repertoireItemGradient fullBorderCurve mainblur ml-3 mr-3 pl-4 pr-4 mb-2"
          v-for="signUp in eventData.signups">
          <v-row>
            <v-col cols="1" align-self="center">
              <v-avatar class="bg-darkBlue">
                <font-awesome-icon icon="fa-solid fa-user" class="text-white" />
              </v-avatar>
            </v-col>
            <v-col cols="3" align-self="center">
              <v-card-title class="pb-0 font-weight-bold">
                student.fName
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
                student.level
              </v-card-subtitle>
            </v-col>
            <v-col cols="2" align-self="center">
              <v-btn
                elevation="0"
                size="small"
                rounded="pill"
                width="85"
                class="buttonWhite text-mediumBlue font-weight-bold">
                student.type
              </v-btn>
            </v-col>
            <v-col cols="2" align-self="center">
              <v-btn
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonGradient text-white font-weight-bold">
                student.time
              </v-btn>
            </v-col>
            <v-col cols="4" align-self="center" class="text-right">
              <v-btn
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonWhite text-mediumBlue font-weight-bold">
                Edit
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
    </v-row>
  </v-card>
</template>

<script>
  import CritiqueFacultyComponent from "./CritiqueFacultyComponent.vue";
  import { useUserStore } from "../../stores/UserStore.js";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "CritiqueListComponent",
    components: {
      CritiqueFacultyComponent,
    },
    props: {
      eventData: {},
    },
    data() {
      return {};
    },
    methods: {
      printVal(val) {
        console.log(val);
        console.log("I Printed");
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
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
  };
</script>
