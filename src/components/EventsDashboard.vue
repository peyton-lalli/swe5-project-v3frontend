<template>
  <v-container fluid class="eventsMainGrid">
    <v-card class="openSignupsPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-h5 text-darkBlue">
        Open Event Signups
      </v-card-title>
      <v-card-text v-for="event in openEvents">
        <v-row>
          <EventSignupItem
            :eventData="event"
            @regenerateSignups="regenerateSignups()" />
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="upcomingEventsPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-darkBlue text-h5">
        Upcoming Events
      </v-card-title>
      <v-card-text v-for="id in upcomingEventIds">
        <v-row>
          <!-- <EventUpcomingItem :eventId="id" /> -->
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="yourEventsPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-h5 text-darkBlue">
        <v-row>
          <v-col cols="auto" class="text-h5 font-weight-bold">
            Your Events
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonGradient text-white font-weight-bold">
              Upcoming
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text v-for="event in eventSignups">
        <v-row>
          <EventComponent :eventSignUpData="event" />
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import EventComponent from "./EventComponent.vue";
  import EventSignupItem from "./EventSignupItem.vue";
  import EventUpcomingItem from "./EventUpcomingItem.vue";
  import { useUserStore } from "../stores/UserStore.js";
  import { useEventsStore } from "../stores/EventsStore.js";
  import { mapStores } from "pinia";

  export default {
    name: "EventsDashboard",
    components: {
      EventComponent,
      EventSignupItem,
      EventUpcomingItem,
    },
    data() {
      return {
        createDialog: false,
        openEvents: [],
        upcomingEventIds: [],
        eventSignups: [],
      };
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    mounted() {
      this.eventSignups = this.eventsStore.generateEventSignupsForUser();

      this.generateOpenEventsList();
      this.generateUpcomingEventIds();
    },
    methods: {
      closeCreateDialog(val) {
        this.createDialog = val;
      },
      generateOpenEventsList() {
        let events = [this.eventsStore.events[0], this.eventsStore.events[1]];
        this.openEvents = events;
      },
      generateUpcomingEventIds() {
        let ids = [3, 4];
        this.upcomingEventIds = ids;
      },
      regenerateSignups() {
        console.log("CAUGHT BY ED");
        console.log(this.eventsStore.events);
        this.eventSignups = this.eventsStore.generateEventSignupsForUser();
        console.log(this.eventSignups);
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
