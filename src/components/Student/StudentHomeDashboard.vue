<template>
  <v-container fluid class="studentHomeMainGrid">
    <v-container fluid class="eventsRepPane studentHomeLeftGrid noPadMarg">
      <v-card class="eventsPane mainBlur rounded-lg">
        <v-card-title class="font-weight-bold text-darkBlue">
          <v-row>
            <v-col class="text-h5 font-weight-bold"> Your Events </v-col>
            <v-col class="text-right">
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
        <v-card-text flex-grow="1" overflow="auto">
          <v-row>
            <v-col
              cols="6"
              :sm="12"
              :md="12"
              :lg="6"
              :xl="6"
              v-for="event in eventSignups">
              <EventComponent :eventSignUpData="event" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="repertoirePane mainBlur rounded-lg">
        <v-card-title class="font-weight-bold text-darkBlue">
          <v-row>
            <v-col class="text-h5 font-weight-bold"> Repertoire </v-col>
            <v-col class="text-right">
              <v-btn
                @click="createDialog = true"
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonGradient mr-3 text-white font-weight-bold">
                Add New
              </v-btn>
              <v-dialog v-model="createDialog" persistent max-width="600px">
                <RepertoireCreate
                  @closeCourseDialogEvent="
                    closeCreateDialog
                  "></RepertoireCreate>
              </v-dialog>
              <v-btn
                @click="viewAllRepDialog = true"
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonGradient text-white font-weight-bold">
                View All
              </v-btn>
              <v-dialog v-model="viewAllRepDialog" persistent max-width="600px">
                <StudentRepertoireViewAll
                  @closeRepViewAllEvent="
                    this.viewAllRepDialog = false
                  "></StudentRepertoireViewAll>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row v-for="piece in this.userStore.userRoleInfo.repertoire.pieces">
            <RepertoireComponent :sentPiece="piece" />
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
    <v-card class="critiquesPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-h5 text-darkBlue">
        Recent Critiques
      </v-card-title>
      <v-card-text>
        <v-row>
          <CritiqueComponent />
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
        viewAllRepDialog: false,
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
