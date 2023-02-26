<template>
  <v-container fluid class="eventsMainGrid">
    <v-card class="openSignupsPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-h5 text-darkBlue">
        Open Event Signups
      </v-card-title>
      <v-card-text v-for="signup in openEventSignups" class="overflow-auto">
        <v-row>
          <EventSignupItem />
          <EventSignupItem />
          <EventSignupItem />
          <EventSignupItem />
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="upcomingEventsPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-darkBlue text-h5">
        Upcoming Events
      </v-card-title>
      <v-card-text>
        <v-row> </v-row>
      </v-card-text>
    </v-card>
    <v-card class="yourEventsPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-h5 text-darkBlue">
        Your Events
      </v-card-title>
      <v-card-text>
        <v-row>
          <EventComponent />
          <EventComponent />
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import EventComponent from "./EventComponent.vue";
  import EventSignupItem from "./EventSignupItem.vue";
  export default {
    name: "EventsDashboard",
    components: {
      EventComponent,
      EventSignupItem,
    },
    data() {
      return {
        createDialog: false,
        openEventSignups: [
          {
            eventType: "Vocal Jury",
            eventDate: "04/22/2023",
            eventTimes: [
              { startTime: "9:00AM", endTime: "12:00PM" },
              { startTime: "1:00pm", endTime: "3:00PM" },
            ],
            eventLocation: "Adams Recital Hall",
            eventTimeslots: { total: 25, filled: 14 },
          },
        ],
      };
    },
    methods: {
      closeCreateDialog(val) {
        this.createDialog = val;
      },
    },
  };
</script>

<style scoped>
  * {
    font-family: Inter, sans-serif !important;
  }
  .noPadMarg {
    padding: 0 !important;
    margin: 0 !important;
  }

  .eventsMainGrid {
    display: grid;
    grid-template-columns: 5fr 2fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "openSignupsPane yourEventsPane"
      "upcomingEventsPane yourEventsPane";
    grid-gap: 1.5rem;
    padding-left: 0;
  }

  .yourEventsPane {
    grid-area: yourEventsPane;
  }

  .openSignupsPane {
    grid-area: openSignupsPane;
  }

  .upcomingEventsPane {
    grid-area: upcomingEventsPane;
  }
</style>
