<template>
  <v-container>
    <v-card class="lighterBlur eventsSignupItemGradient rounded-lg pa-0">
      <v-row class="pa-4" no-gutters align="center">
        <v-col cols="auto">
          <v-card-title class="font-weight-bold text-white pb-0 pt-0 pl-0">
            {{ eventData.type }}
          </v-card-title>
          <v-card-subtitle class="font-weight-semi-bold text-darkBlue pl-0">
            {{ eventData.date }}
          </v-card-subtitle>
          <v-card-subtitle class="font-weight-semi-bold text-darkBlue pl-0">
            {{ timesInfoString }}
          </v-card-subtitle>
          <v-card-subtitle class="font-weight-medium text-mediumBlue pl-0">
            {{ eventData.location }}
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
                {{ eventData.timeslots.filled }} /
                {{ eventData.timeslots.total }} Timeslots Filled
              </v-btn>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col justify="center">
              <v-btn
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonGradient text-white font-weight-bold text-capitalize">
                Remind Me
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
  import EventItem from "./EventItem.vue";
  import { useEventsStore } from "../stores/EventsStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "EventUpcomingItem",
    components: {
      EventItem,
    },
    data() {
      return {
        signUpDialog: false,
        eventData: {
          id: 1,
          type: "",
          date: "",
          times: [],
          location: "Adams Recital Hall",
          timeslots: { total: 25, filled: 14 },
        },
        timesInfoString: "",
      };
    },
    computed: {
      ...mapStores(useEventsStore),
    },
    mounted() {
      this.retrieveInfo();
    },
    props: {
      eventId: 1,
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
      closeEventDialog(val) {
        this.signUpDialog = val;
      },
      retrieveInfo() {
        const event = this.eventsStore.getEventForId(this.eventId);
        this.eventData.id = event.id;
        this.eventData.type = event.type;
        this.eventData.date = this.formatDate(event.date);
        this.eventData.times = event.times;
        this.timesInfoString = this.createTimesInfoString();
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
