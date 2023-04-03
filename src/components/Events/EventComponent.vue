<template>
  <v-container fluid class="eventComponent">
    <v-card elevation="0" class="eventsGradient mainblur rounded-lg">
      <v-card elevation="0" class="ma-3 rounded-lg lighterBlur">
        <v-card-title class="font-weight-bold text-h6 text-darkGray pb-0">
          <v-row>
            <v-col>
              {{ eventData.type }}
            </v-col>
            <v-col class="text-right">
              <v-btn
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
              </v-dialog>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-subtitle class="font-weight-semi-bold text-darkBlue pt-0">
          {{ formatDate(new Date(eventData.date)) }}
        </v-card-subtitle>
        <v-card-subtitle class="font-weight-semi-bold text-darkBlue pt-0">
          {{
            parseInt(eventSignUpData.timeslot.substring(0, 2)) > 12
              ? parseInt(eventSignUpData.timeslot.substring(0, 2)) -
                12 +
                eventSignUpData.timeslot.substring(
                  2,
                  eventSignUpData.timeslot.length - 3
                ) +
                " PM"
              : parseInt(eventSignUpData.timeslot.substring(0, 2)) < 10
              ? eventSignUpData.timeslot.substring(
                  1,
                  eventSignUpData.timeslot.length - 3
                ) + " AM"
              : eventSignUpData.timeslot.substring(
                  0,
                  eventSignUpData.timeslot.length - 3
                ) + " AM"
          }}
        </v-card-subtitle>

        <v-row justify="center" class="pl-5">
          <v-col cols="2" align-self="center">
            <v-avatar class="bg-darkBlue">
              <v-img
                :src="
                  this.userStore.userRoleInfo.instructors[0].picture
                "></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="10" align-self="center">
            <v-card-title class="pb-0 font-weight-bold">
              Private Instructor
            </v-card-title>
            <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
              {{ this.userStore.userRoleInfo.instructors[0].name }}
            </v-card-subtitle>
          </v-col>
        </v-row>
        <v-row justify="center" class="pl-5 mt-0 mb-1">
          <v-col cols="2" align-self="center">
            <v-avatar class="bg-darkBlue">
              <v-img></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="10" align-self="center">
            <!-- Not yet supported in database so hardcoded for now, doesn't effect anything -->
            <v-card-title class="pb-0 font-weight-bold">
              Accompanist
            </v-card-title>
            <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
              Peyton Lalli
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>
      <v-card-subtitle class="ml-2 text-h6 text-white font-weight-bold">
        Musical Selection
      </v-card-subtitle>
      <v-card-text class="pt-0">
        <v-row justify="center" class="pl-5 mt-0">
          <v-col cols="2" align-self="center">
            <v-avatar class="bg-darkBlue">
              <!-- Need to get composer API working to get image -->
              <v-img></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="10" align-self="center">
            <v-row v-for="song in eventSignUpData.songs">
              <v-col>
                <v-card-title class="pb-0 font-weight-bold">
                  {{ song.name }}
                </v-card-title>
                <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
                  {{ song.composer.name }}
                </v-card-subtitle>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import EventSignupDialogBody from "./EventSignupDialogBody.vue";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "EventComponent",
    components: {
      EventSignupDialogBody,
    },
    data() {
      return {
        editDialog: false,
        eventData: [],
      };
    },
    props: {
      eventSignUpData: {},
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    mounted() {
      this.setEventData();
    },
    methods: {
      closeEventDialog(val) {
        this.editDialog = val;
      },
      setEventData() {
        this.eventData = this.eventsStore.findEventForId(
          this.eventSignUpData.eventId
        );
      },
      formatDate(date) {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        return new Date(date).toLocaleDateString("us-EN", options);
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
