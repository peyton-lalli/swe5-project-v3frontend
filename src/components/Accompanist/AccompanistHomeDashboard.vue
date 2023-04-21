<template>
  <v-container fluid class="accompanistHomeMainGrid">
    <v-card class="studentsPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-darkBlue">
        <v-row>
          <v-col> Students </v-col>
          <v-col class="text-right">
            <v-btn
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonGradient mr-3 text-white font-weight-bold">
              View All
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <StudentComponent />
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="eventsPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-darkBlue">
        <v-row>
          <v-col> Your Events </v-col>
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
      <v-card-text>
        <v-row>
          <v-col cols="6"> </v-col>
          <v-col cols="6"> </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import EventComponent from "../Events/EventComponent.vue";
  import StudentComponent from "../StudentComponent.vue";
  import AttentionComponent from "../AttentionComponent.vue";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "AccompanistHomeDashboard",
    components: {
      EventComponent,
      StudentComponent,
      AttentionComponent,
    },
    data() {
      return {
        toggleText: "Upcoming",
      };
    },
    computed: {
      ...mapStores(useEventsStore),
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
