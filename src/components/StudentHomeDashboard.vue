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
            <v-col cols="12" :sm="12" :md="12" :lg="12" :xl="6">
              <EventComponent />
            </v-col>
            <v-col cols="12" :sm="12" :md="12" :lg="12" :xl="6">
              <EventComponent />
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
        toggleText: "Upcoming",
        createDialog: false,
      };
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
