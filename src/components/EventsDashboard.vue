<template>
  <v-container fluid class="eventsMainGrid">
    <v-card class="openSignupsPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-h5 text-darkBlue">
        Open Event Signups
      </v-card-title>
      <v-card-text v-for="id in openEventIds">
        <v-row>
          <EventSignupItem :eventId="id" />
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="upcomingEventsPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-darkBlue text-h5">
        Upcoming Events
      </v-card-title>
      <v-card-text v-for="event in this.eventsStore.events">
        <v-row>
          <EventUpcomingItem :eventId="event.id" />
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
              class="buttonGradient text-white font-weight-bold"
              @click="changeText()">
              {{ toggleText }}
              <v-icon size="small" v-if="toggleText == 'Upcoming'">
                <font-awesome-icon
                  icon="fa-solid fa-caret-up"
                  class="text-white" />
              </v-icon>
              <v-icon size="small" v-else>
                <font-awesome-icon
                  icon="fa-solid fa-caret-down"
                  class="text-white" />
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
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
  import EventUpcomingItem from "./EventUpcomingItem.vue";
  import { useLoginStore } from "../stores/LoginStore.js";
  import { useEventsStore } from "../stores/EventsStore.js";
  import { mapStores } from "pinia";
  import EventDataService from "../services/event.js";

  export default {
    name: "EventsDashboard",
    components: {
      EventComponent,
      EventSignupItem,
      EventUpcomingItem,
    },
    data() {
      return {
        toggleText: "Upcoming",
        createDialog: false,
        openEventIds: [],
        upcomingEventIds: [],
      };
    },
    computed: {
      ...mapStores(useLoginStore, useEventsStore),
    },
    mounted() {
      this.setEventsStore();
      this.generateOpenEventIds();
    },
    methods: {
      closeCreateDialog(val) {
        this.createDialog = val;
      },
      changeText() {
        if (this.toggleText == "Upcoming") {
          this.toggleText = "Past";
        } else {
          this.toggleText = "Upcoming";
        }
      },
      setEventsStore() {
        EventDataService.getAll()
          .then((response) => {
            this.eventsStore.setEvents(response.data.Event);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      generateOpenEventIds() {
        let ids = [];
        for (let event in this.eventsStore.events) {
          ids.push(this.eventsStore.events[event].id);
        }
        console.log(ids);
        this.openEventIds = ids;
      },
      generateUpcomingEventIds() {
        let ids = [];
        for (let event in this.eventsStore.events) {
          ids.push(this.eventsStore.events[event].id);
        }
        console.log(ids);
        this.upcomingEventIds = ids;
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
