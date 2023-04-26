<template>
  <v-container fluid class="eventComponent pa-0">
    <v-card elevation="0" class="eventsGradient rounded-lg">
      <v-card class="ma-3 rounded-lg lighterBlur">
        <v-card-title class="font-weight-bold text-h5 text-darkGray pb-0">
          <v-row>
            <v-col>
              {{ eventData.title }}
            </v-col>
            <v-col class="text-right">
              <!-- <v-btn
                elevation="0"
                rounded="pill"
                size="small"
                class="buttonGradient text-white font-weight-bold"
                @click="editDialog = true">
                Edit
              </v-btn>
              <v-dialog v-model="editDialog" persistent max-width="1000px">
                <EventSignupDialogBody
                  @closeEventDialogEvent="closeEventDialog">
                </EventSignupDialogBody>
              </v-dialog> -->
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-subtitle class="font-weight-semi-bold text-darkBlue pt-0">
          {{ formatDate(new Date(eventData.date)) }}
        </v-card-subtitle>
        <v-card-subtitle class="font-weight-semi-bold text-darkBlue pt-0">
          {{ createTimesInfoString(eventData.times) }}
        </v-card-subtitle>

        <v-card-text>
          <v-card-subtitle
            class="font-weight-semi-bold text-darkBlue pt-0 pl-0 pb-4 text-h6">
            Availability
          </v-card-subtitle>
          <v-row v-for="availability in eventData.availabilities" class="pt-0">
            <v-col class="font-weight-semi-bold text-mediumBlue pt-0 pb-2">
              {{ get12HourTimeStringFromString(availability.starttime) }}
              -
              {{ get12HourTimeStringFromString(availability.endtime) }}
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
  import EventSignupDialogBody from "./EventSignupDialogBody.vue";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  import { DateTimeMixin } from "../../mixins/DateTimeMixin.js";

  export default {
    name: "EventAvailabilityComponent",
    components: {
      EventSignupDialogBody,
    },
    data() {
      return {
        editDialog: false,
      };
    },
    mixins: [DateTimeMixin],
    props: {
      eventData: {},
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    methods: {
      closeEventDialog(val) {
        this.editDialog = val;
      },
    },
  };
</script>

<style scoped>
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }
</style>
