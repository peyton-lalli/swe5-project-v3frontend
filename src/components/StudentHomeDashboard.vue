<template>
  <v-container fluid class="studentHomeMainGrid">
    <v-container fluid class="eventsRepPane studentHomeLeftGrid noPadMarg">
      <v-card class="eventsPane mainBlur rounded-lg">
        <v-card-title class="font-weight-bold text-darkBlue">
          <v-row>
            <v-col> Your Events </v-col>
            <v-col class="text-right">
              <v-btn
                size="small"
                rounded="pill"
                class="buttonGradient text-white">
                Upcoming
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <EventComponent />
            </v-col>
            <v-col cols="6">
              <EventComponent />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="repertoirePane mainBlur rounded-lg">
        <v-card-title class="font-weight-bold text-darkBlue">
          <v-row>
            <v-col> Repertoire </v-col>
            <v-col class="text-right">
              <v-btn
                size="small"
                rounded="pill"
                class="buttonGradient mr-3 text-white">
                Add New
              </v-btn>
              <v-btn
                size="small"
                rounded="pill"
                class="buttonGradient text-white">
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
      <v-card-title class="font-weight-bold text-darkBlue">
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
  export default {
    name: "StudentHomeDashboard",
    components: {
      EventComponent,
      RepertoireComponent,
      CritiqueComponent,
    },
    data() {},
  };
</script>

<style scoped>
  .noPadMarg {
    padding: 0 !important;
    margin: 0 !important;
  }

  .studentHomeMainGrid {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: auto;
    grid-template-areas: "eventsRepPane critiquesPane";
    grid-gap: 1.5rem;
    padding-left: 0;
  }
  .studentHomeLeftGrid {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr;
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
