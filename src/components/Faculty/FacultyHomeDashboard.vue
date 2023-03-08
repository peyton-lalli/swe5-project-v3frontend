<template>
  <v-container fluid class="facultyHomeMainGrid">
    <v-container fluid class="facultyHomeTopGrid studentAttentionPane">
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
      <v-card class="attentionPane mainBlur rounded-lg">
        <v-card-title class="font-weight-bold text-darkBlue">
          Events Requiring Your Attention
        </v-card-title>
        <v-card-text>
          <v-row>
            <AttentionComponent />
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
    <v-card class="eventsPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-darkBlue">
        <v-row>
          <v-col> Your Events </v-col>
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
          <v-col cols="6">
            <EventComponent />
          </v-col>
          <v-col cols="6">
            <EventComponent />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import EventComponent from "../Events/EventComponent.vue";
  import StudentComponent from "./StudentComponent.vue";
  import AttentionComponent from "./AttentionComponent.vue";
  export default {
    name: "FacultyHomeDashboard",
    components: {
      EventComponent,
      StudentComponent,
      AttentionComponent,
    },
    data() {},
  };
</script>

<style scoped>
  .noPadMarg {
    padding: 0 !important;
    margin: 0 !important;
  }

  .facultyHomeMainGrid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(auto, 1fr), minmax(auto, 1fr);
    grid-template-areas:
      "studentAttentionPane"
      "eventsPane";
    grid-gap: 1.5rem;
    padding-left: 0;
  }
  .facultyHomeTopGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(auto, 1fr);
    grid-template-areas: "studentsPane attentionPane";
    grid-gap: 1.5rem;
  }
  .attentionPane {
    grid-area: attentionPane;
  }
  .studentAttentionPane {
    grid-area: studentAttentionPane;
  }

  .eventsPane {
    grid-area: eventsPane;
  }

  .studentsPane {
    grid-area: studentsPane;
  }
</style>
