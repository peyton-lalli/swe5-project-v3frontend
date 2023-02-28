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
                class="buttonGradient text-white font-weight-bold">
                Upcoming
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6" v-for="event in eventSignups">
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
              <v-dialog v-model="createDialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    @click="createDialog = true"
                    elevation="0"
                    size="small"
                    rounded="pill"
                    class="buttonGradient mr-3 text-white font-weight-bold">
                    Add New
                  </v-btn>
                </template>
                <RepertoireCreate
                  @closeCourseDialogEvent="
                    closeCreateDialog
                  "></RepertoireCreate>
              </v-dialog>
              <v-btn
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonGradient text-white font-weight-bold">
                View All
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <RepertoireComponent />
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
  import EventComponent from "../components/EventComponent.vue";
  import RepertoireComponent from "../components/RepertoireComponent.vue";
  import CritiqueComponent from "../components/CritiqueComponent.vue";
  import RepertoireCreate from "../components/RepertoireCreate.vue";
  import { useEventsStore } from "../stores/EventsStore.js";
  import { useStudentInfoStore } from "../stores/StudentInfoStore.js";
  import EventSignUpDataService from "../services/eventsignup.js";
  import { mapStores } from "pinia";
  export default {
    name: "StudentHomeDashboard",
    components: {
      EventComponent,
      RepertoireComponent,
      CritiqueComponent,
      RepertoireCreate,
    },
    data() {
      return {
        createDialog: false,
        eventSignups: [],
      };
    },
    computed: {
      ...mapStores(useEventsStore, useStudentInfoStore),
    },
    async mounted() {
      await this.generateEventSignupsForStudent();
    },
    methods: {
      closeCreateDialog(val) {
        this.createDialog = val;
      },
      async generateEventSignupsForStudent() {
        let eventSignups = [];
        let events = this.eventsStore.events;
        for (let i = 0; i < events.length; i++) {
          await EventSignUpDataService.getEventId(events[i].id)
            .then((response) => {
              let signUp = response.data.EventSignUp.find(
                (es) =>
                  es.studentinfoId === this.studentInfoStore.studentInfo.id
              );
              if (signUp) eventSignups.push(signUp);
            })
            .catch((e) => {
              console.log(e);
            });
        }
        console.log("AHHHH" + eventSignups);
        this.eventSignups = eventSignups;
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
