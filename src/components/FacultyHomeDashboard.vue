<template>
  <v-container fluid class="facultyHomeMainGrid">
    <v-container fluid class="eventsStudPane facultyHomeLeftGrid noPadMarg">
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
              >
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
      <v-card class="studentsPane mainBlur rounded-lg">
        <v-card-title class="font-weight-bold text-darkBlue">
          <v-row>
            <v-col> Students </v-col>
            <v-col class="text-right">
              <v-btn
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonGradient mr-3 text-white font-weight-bold"
              >
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
    </v-container>
  </v-container>
</template>

<script>
import EventComponent from "./EventComponent.vue";
import StudentComponent from "./StudentComponent.vue";
export default {
  name: "StudentHomeDashboard",
  components: {
    EventComponent,
    StudentComponent,
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
  grid-template-columns: 3fr 2fr;
  grid-template-rows: auto;
  grid-template-areas: "eventsStudPane";
  grid-gap: 1.5rem;
  padding-left: 0;
}
.facultyHomeLeftGrid {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "eventsPane"
    "studentsPane";
  grid-gap: 1.5rem;
}

.eventsStudPane {
  grid-area: eventsStudPane;
}

.eventsPane {
  grid-area: eventsPane;
}

.studentsPane {
  grid-area: studentsPane;
}
</style>
