<template>
  <v-container fluid class="studentHomeMainGrid">
    <v-container fluid class="eventsRepPane studentHomeLeftGrid noPadMarg">
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
            <v-col cols="4" class="text-h5 font-weight-bold pa-0">
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
        <v-card-text flex-grow="1" overflow="auto" class="px-0">
          <v-row v-if="this.toggleText === 'Upcoming'">
            <v-col
              cols="6"
              :sm="12"
              :md="12"
              :lg="6"
              :xl="6"
              v-for="event in this.upcomingEvents">
              <EventComponent :eventSignUpData="event" />
            </v-col>
          </v-row>
          <v-row v-if="this.toggleText === 'Past'">
            <v-col
              cols="6"
              :sm="12"
              :md="12"
              :lg="6"
              :xl="6"
              v-for="event in this.pastEvents">
              <EventComponent :eventSignUpData="event" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="repertoirePane mainCardBorder pa-4">
        <v-card-title class="font-weight-bold text-darkBlue mb-6">
          <v-row>
            <v-col cols="auto" class="pa-0 pt-1">
              <v-avatar class="pr-0">
                <v-icon>
                  <font-awesome-icon
                    icon="fa-solid fa-compact-disc"
                    class="text-darkBlue" />
                </v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="4" class="text-h5 font-weight-bold pa-0">
              <v-card-title class="font-weight-bold text-h5 pl-2"
                >Repertoire</v-card-title
              >
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="text-right pa-0">
              <v-btn
                @click="createDialog = true"
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonGradient mr-3 text-white font-weight-bold text-none">
                Add new
              </v-btn>
              <v-dialog v-model="createDialog" persistent max-width="600px">
                <RepertoireCreate
                  @closeCourseDialogEvent="
                    closeCreateDialog
                  "></RepertoireCreate>
              </v-dialog>
              <v-btn
                @click="routePage('dashboard/repertoire')"
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonGradient text-white font-weight-bold text-none">
                View all
              </v-btn>
              <v-dialog persistent v-model="viewAllRepDialog" max-width="600px">
                <StudentRepertoireViewAll></StudentRepertoireViewAll>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-text>
          <v-row
            v-for="piece in this.userStore.userRoleInfo.repertoires[0].pieces"
            class="pa-0">
            <RepertoireComponent :sentPiece="piece" />
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
    <v-card class="critiquesPane mainCardBorder pa-4">
      <v-card-title class="font-weight-bold text-darkBlue mb-4">
        <v-row>
          <v-col cols="auto" class="pa-0 pt-1">
            <v-avatar class="pr-0">
              <v-icon>
                <font-awesome-icon
                  icon="fa-solid fa-square-pen"
                  class="text-darkBlue" />
              </v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="auto" class="text-h5 font-weight-bold pa-0">
            <v-card-title class="font-weight-bold text-h5 pl-2"
              >Recent Critiques</v-card-title
            >
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row v-for="(event, i) of this.eventCritiques" :key="i">
          <CritiqueComponent :event="this.eventCritiques[i]" />
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import EventComponent from "../Events/EventComponent.vue";
  import RepertoireComponent from "./RepertoireComponent.vue";
  import CritiqueComponent from "./CritiqueComponent.vue";
  import RepertoireCreate from "./RepertoireCreate.vue";
  import StudentRepertoireViewAll from "./StudentRepertoireViewAll.vue";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "StudentHomeDashboard",
    components: {
      EventComponent,
      RepertoireComponent,
      CritiqueComponent,
      RepertoireCreate,
      StudentRepertoireViewAll,
    },
    data() {
      return {
        toggleText: "Upcoming",
        createDialog: false,
        viewAllRepDialog: this.$route.fullPath === "/dashboard/repertoire",
        eventSignups: [],
        eventCritiques: [],
        upcomingEvents: [],
        pastEvents: [],
      };
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    mounted() {
      for (let event of this.eventsStore.generateEventSignupsForUser()) {
        this.eventSignups.push(event);
        if (event.critiques) {
          if (event.critiques.length > 0) {
            this.eventCritiques.push(event);
          }
        }
      }
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
      routePage(page) {
        this.$router.push({ path: page });
      },
    },
    watch: {
      "$route.fullPath": function (newRoute) {
        this.viewAllRepDialog = newRoute === "/dashboard/repertoire";
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

  .studentHomeMainGrid {
    display: grid;
    grid-template-columns: 4fr 2fr;
    grid-template-rows: minmax(auto, 1fr);
    grid-template-areas: "eventsRepPane critiquesPane";
    grid-gap: 1.5rem;
    padding-left: 0;
  }
  .studentHomeLeftGrid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(auto, 1fr), minmax(auto, 1fr);
    grid-template-areas:
      "eventsPane"
      "repertoirePane";
    grid-gap: 1.5rem;
  }

  .eventsRepPane {
    grid-area: eventsRepPane;
  }

  .critiquesPane {
    grid-area: critiquesPane;
  }

  .eventsPane {
    grid-area: eventsPane;
  }

  .repertoirePane {
    grid-area: repertoirePane;
  }
</style>
