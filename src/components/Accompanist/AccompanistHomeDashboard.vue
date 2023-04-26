<template>
  <v-container fluid class="accompanistHomeMainGrid">
    <v-card class="studentsPane mainCardBorder pa-4">
      <v-card-title class="font-weight-bold text-darkBlue">
        <v-row>
          <v-col cols="auto" class="pa-0 pt-1">
            <v-avatar class="pr-0">
              <v-icon>
                <font-awesome-icon
                  icon="fa-solid fa-user"
                  class="text-darkBlue" />
              </v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="4" class="text-h5 font-weight-bold pa-0">
            <v-card-title class="font-weight-bold text-h5 pl-2"
              >Your Students</v-card-title
            >
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4" class="text-right pa-0">
            <v-btn
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonGradient mr-3 text-white font-weight-bold text-none">
              View All
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="mt-8">
        <v-row v-for="student in this.userStore.userRoleInfo.students">
          <StudentComponent :student="student" />
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="eventsPane mainCardBorder pa-4">
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
      <v-row>
        <v-col
          v-for="event in availabileEvents"
          cols="6"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="12">
          <v-card-text class="pt-4">
            <EventAvailabilityComponent :eventData="event" />
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
  import EventAvailabilityComponent from "../Events/EventAvailabilityComponent.vue";
  import StudentComponent from "../StudentComponent.vue";
  import AttentionComponent from "../AttentionComponent.vue";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { useUserStore } from "../../stores/UserStore.js";

  import { mapStores } from "pinia";
  export default {
    name: "AccompanistHomeDashboard",
    components: {
      EventAvailabilityComponent,
      StudentComponent,
      AttentionComponent,
    },
    data() {
      return {
        toggleText: "Upcoming",
        availabileEvents: [],
      };
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    mounted() {
      this.availabileEvents = this.eventsStore.getAvailabileEventsForUser();
    },
    methods: {
      changeText() {
        if (this.toggleText == "Upcoming") {
          this.toggleText = "Past";
        } else {
          this.toggleText = "Upcoming";
        }
      },
    },
  };
</script>

<style scoped>
  .noPadMarg {
    padding: 0 !important;
    margin: 0 !important;
  }
  .accompanistHomeMainGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(auto, 1fr), minmax(auto, 1fr);
    grid-template-areas:
      "studentsPane eventsPane"
      "studentsPane eventsPane";
    grid-gap: 1.5rem;
    padding-left: 0;
  }

  .eventsPane {
    grid-area: eventsPane;
  }

  .studentsPane {
    grid-area: studentsPane;
  }
</style>
