<template>
  <v-container fluid class="eventsMainGrid">
    <v-card class="openSignupsPane mainCardBorder pa-4">
      <v-card-title class="font-weight-bold text-darkBlue mb-8">
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
          <v-col cols="6" class="text-h5 font-weight-bold pa-0">
            <v-card-title class="font-weight-bold text-h5 pl-2"
              >Open Event Signups</v-card-title
            >
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-card-title>
      <v-card-text
        v-for="event in this.eventsStore.events.filter(
          (e) => e.date >= new Date()
        )"
        class="mb-2">
        <v-row>
          <EventSignupItem
            :sent-event-data="event"
            @regenerateSignups="regenerateSignups()"
            @regenerateAvailabilties="regenerateAvailabilties()" />
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="yourEventsPane mainCardBorder pa-4">
      <v-card-title class="font-weight-bold text-darkBlue">
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
          <v-col cols="6" class="text-h5 font-weight-bold pa-0">
            <v-card-title class="font-weight-bold text-h5 pl-2"
              >Your Events</v-card-title
            >
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4" class="text-right pa-0">
            <v-btn
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonGradient text-white font-weight-bold text-none"
              @click="changeText()">
              {{ toggleText }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text
        class="pt-4 mt-4"
        v-if="
          this.userStore.userInfo.roles.default.roleId === 1 &&
          this.toggleText === 'Upcoming'
        ">
        <v-row v-for="event in this.upcomingEvents">
          <EventComponent :eventSignUpData="event" class="pb-4" />
        </v-row>
      </v-card-text>
      <v-card-text
        class="pt-4 mt-4"
        v-if="
          this.userStore.userInfo.roles.default.roleId === 1 &&
          this.toggleText === 'Past'
        ">
        <v-row v-for="event in this.pastEvents">
          <EventComponent :eventSignUpData="event" class="pb-4" />
        </v-row>
      </v-card-text>
      <v-card-text
        class="pt-4 mt-4"
        v-for="event in availabileEvents"
        v-if="
          this.userStore.userInfo.roles.default.roleId === 2 ||
          this.userStore.userInfo.roles.default.roleId === 4
        ">
        <v-row>
          <EventAvailabilityComponent
            :eventData="event"
            @regenerateAvailabilties="regenerateAvailabilties()"
            class="pb-4" />
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import EventComponent from "./EventComponent.vue";
  import EventAvailabilityComponent from "./EventAvailabilityComponent.vue";
  import EventSignupItem from "./EventSignupItem.vue";
  import { useUserStore } from "../../stores/UserStore.js";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { mapStores } from "pinia";

  export default {
    name: "EventsDashboard",
    components: {
      EventComponent,
      EventAvailabilityComponent,
      EventSignupItem,
    },
    data() {
      return {
        toggleText: "Upcoming",
        createDialog: false,
        availabileEvents: [],
        eventSignups: [],
        upcomingEvents: [],
        pastEvents: [],
      };
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    async mounted() {
      await this.eventsStore.setEvents();

      if (
        this.userStore.userInfo.roles.default.roleId === 2 ||
        this.userStore.userInfo.roles.default.roleId === 4
      ) {
        this.availabileEvents = this.eventsStore.getAvailabileEventsForUser();
      } else {
        this.eventSignups = this.eventsStore.generateEventSignupsForUser();
        for (let event of this.eventSignups) {
          let eventDate = this.eventsStore.events.filter(
            (e) => e.eventId === event.eventId
          )[0].date;
          if (eventDate > Date.now()) {
            this.upcomingEvents.push(event);
          } else {
            this.pastEvents.push(event);
          }
        }
      }
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
        this.upcomingEvents = [];
        this.pastEvents = [];
        for (let event of this.eventSignups) {
          let eventDate = this.eventsStore.events.filter(
            (e) => e.eventId === event.eventId
          )[0].date;
          if (eventDate > Date.now()) {
            this.upcomingEvents.push(event);
          } else {
            this.pastEvents.push(event);
          }
        }
      },
      regenerateAvailabilties() {
        this.availabileEvents = this.eventsStore.getAvailabileEventsForUser();
        console.log(this.availabileEvents);
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
