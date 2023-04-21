<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold">View All Events</v-col>
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeViewAllEventsDialog()">
            <v-icon>
              <font-awesome-icon
                icon="a-solid fa-circle-xmark"
                class="text-lightBlue">
              </font-awesome-icon>
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row v-for="event in this.eventsData">
        <AttentionComponent :eventData="event" />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import AttentionComponent from "../AttentionComponent.vue";
  export default {
    components: {
      AttentionComponent,
    },
    methods: {
      closeViewAllEventsDialog() {
        this.$emit("closeViewAllEventsDialogEvent");
      },
    },
    props: {
      eventsData: {},
    },
  };
</script>
