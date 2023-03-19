<template>
  <v-container fluid class="eventsMainGrid">
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
    <v-card class="adminControlPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-darkBlue">
        Admin Controls
      </v-card-title>
      <v-card-text>
        <!-- These buttons will be constant -->
        <v-btn
          class="eventsGradient rounded-lg text-white buttonControl lighterBlur"
          block>
          Create Events
        </v-btn>
        <v-btn
          class="eventsGradient rounded-lg text-white buttonControl mt-5 lighterBlur"
          block>
          Edit Administration
        </v-btn>
        <v-btn
          class="eventsGradient rounded-lg text-white buttonControl mt-5 lighterBlur"
          block>
          Edit Faculty/Accompanists
        </v-btn>
        <v-btn
          class="eventsGradient rounded-lg text-white buttonControl mt-5 lighterBlur"
          block>
          Edit Students
        </v-btn>
        <v-btn
          class="eventsGradient rounded-lg text-white buttonControl mt-5 lighterBlur"
          block>
          Edit Instruments/Vocals
        </v-btn>
        <v-btn
          class="eventsGradient rounded-lg text-white buttonControl mt-5 lighterBlur"
          block>
          Edit Composers
        </v-btn>
        <v-btn
          class="eventsGradient rounded-lg text-white buttonControl mt-5 lighterBlur"
          block>
          Send Email
        </v-btn>
      </v-card-text>
    </v-card>
    <v-card class="eventsPane mainBlur rounded-lg">
      <v-card-title class="font-weight-bold text-darkBlue">
        <v-row>
          <v-col> Events </v-col>
          <v-col class="text-right">
            <v-btn
              elevation="0"
              size="small"
              rounded="pill"
              class="buttonGradient text-white font-weight-bold mr-2">
              Add new
            </v-btn>
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
          <AttentionComponent />
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import EventComponent from "../Events/EventComponent.vue";
  import StudentComponent from "../Faculty/StudentComponent.vue";
  import AttentionComponent from "../Faculty/AttentionComponent.vue";
  export default {
    name: "AdminHomeDashboard",
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
  .buttonControl {
    justify-content: left !important;
  }
  .eventsMainGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "studentsPane attentionPane"
      "adminControlPane eventsPane";
    grid-gap: 1.5rem;
    padding-left: 0;
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
  .adminControlPane {
    grid-area: adminControlPane;
  }
</style>
