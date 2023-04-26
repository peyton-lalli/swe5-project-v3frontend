<template>
  <v-card class="fullBorderCurve pa-4">
    <v-card-title class="font-weight-bold text-darkBlue mb-6">
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
        <v-col cols="auto" class="text-h5 font-weight-bold pa-0">
          <v-card-title class="font-weight-bold text-h5 pl-2">
            View All Events
          </v-card-title>
        </v-col>
        <v-spacer></v-spacer>
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
