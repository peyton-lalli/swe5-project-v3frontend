<template>
  <v-container fluid class="eventsMainGrid">
    <v-card class="openSignupsPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-h5 text-darkBlue">
        Open Event Signups
      </v-card-title>
      <v-card-text v-for="event in this.eventsStore.events">
        <v-row>
          <EventSignupItem
            :sent-event-data="event"
            @regenerateSignups="regenerateSignups()" />
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
            <!-- Toggle does not work yet, similar issue to on EventsDashboard with upcoming and current -->
            <!-- @ethanimooney: Resolve -->
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
      <v-card-text class="px-8 pt-4" v-for="event in eventSignups">
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
  import { useUserStore } from "../../stores/UserStore.js";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { mapStores } from "pinia";

  export default {
    name: "EventsDashboard",
    components: {
      EventComponent,
      EventSignupItem,
    },
    data() {
      return {
        toggleText: "Upcoming",
        createDialog: false,
        eventSignups: [],
      };
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    mounted() {
      this.eventSignups = this.eventsStore.generateEventSignupsForUser();
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
      regenerateSignups() {
        this.eventSignups = this.eventsStore.generateEventSignupsForUser();
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
    grid-template-columns: 5fr 3fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "openSignupsPane yourEventsPane"
      "openSignupsPane yourEventsPane";
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
