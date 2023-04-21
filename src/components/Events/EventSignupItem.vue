<template>
  <v-container>
    <v-card class="lighterBlur eventsSignupItemGradient rounded-lg pa-0">
      <v-row class="pa-4" no-gutters align="center">
        <v-col cols="auto">
          <v-card-title class="font-weight-bold text-white pb-0 pt-0 pl-0">
            {{ eventData.title }}
          </v-card-title>
          <v-card-subtitle class="font-weight-semi-bold text-darkBlue pl-0">
            {{ formatDate(eventData.date) }}
          </v-card-subtitle>
          <v-card-subtitle class="font-weight-semi-bold text-darkBlue pl-0">
            {{ timesInfoString }}
          </v-card-subtitle>
        </v-col>
        <v-spacer></v-spacer>
        <v-col justify="center" align="end" cols="auto">
          <v-row align="center" justify="center">
            <v-col justify="center">
              <v-btn
                disabled
                elevation="0"
                size="small"
                rounded="pill"
                class="bg-white text-darkBlue font-weight-bold">
                {{ eventData.signups ? eventData.signups.length : 0 }} /
                {{ getTotalTimeslots() }} Timeslots Filled
              </v-btn>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col justify="center">
              <v-btn
                elevation="0"
                size="small"
                rounded="pill"
                class="buttonGradient text-white font-weight-bold text-capitalize"
                @click="
                  this.userStore.userInfo.roles.default.roleId === 1
                    ? openEventSignupDialog()
                    : openEventAvailabilityDialog()
                ">
                {{
                  this.userStore.userInfo.roles.default.roleId === 1
                    ? hasPriorSignup
                      ? "Edit"
                      : "Signup"
                    : "Add Availability"
                }}
              </v-btn>
              <v-dialog v-model="signUpDialog" persistent max-width="1000px">
                <EventSignupDialogBody
                  @closeEventDialogEvent="closeEventSignupDialog"
                  @regenerateSignups="regenerateSignups()"
                  :sent-signup-data="signupData"
                  :sent-signup-event-data="signupEventData"
                  :sentBool="isEdit">
                </EventSignupDialogBody>
              </v-dialog>
              <v-dialog
                v-model="availabilityDialog"
                persistent
                max-width="600px">
                <EventAvailabilityDialogBody
                  @closeEventDialogEvent="closeEventAvailabilityDialog"
                  @regenerateSignups="regenerateSignups()"
                  :sent-event-data="availabilityEventData"
                  :sent-availability-data="availabilityData"
                  :sentBool="isEdit">
                </EventAvailabilityDialogBody>
              </v-dialog>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
  import EventSignupDialogBody from "./EventSignupDialogBody.vue";
  import EventAvailabilityDialogBody from "./EventAvailabilityDialogBody.vue";
  import { useEventsStore } from "../../stores/EventsStore.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  import { DateTimeMixin } from "../../mixins/DateTimeMixin.js";
  export default {
    name: "EventSignupItem",
    components: {
      EventSignupDialogBody,
      EventAvailabilityDialogBody,
    },
    data() {
      return {
        eventData: JSON.parse(JSON.stringify(this.sentEventData)),
        signUpDialog: false,
        signupData: {},
        signupEventData: {},
        hasPriorSignup: false,
        priorSignup: {},
        availabilityDialog: false,
        availabilityEventData: {},
        availabilityData: [],
        timesInfoString: "",
        timeslots: JSON.parse(JSON.stringify(this.sentEventData)).timeslots,
        isEdit: this.hasPriorSignup ? true : false,
      };
    },
    mixins: [DateTimeMixin],
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    mounted() {
      this.timesInfoString = this.createTimesInfoString(this.eventData.times);
      this.eventData.signups ? this.checkForPriorSignup() : null;
      this.isEdit = this.hasPriorSignup ? true : false;
    },
    props: {
      sentEventData: {},
    },
    watch: {
      sentEventData(data) {
        this.eventData = JSON.parse(JSON.stringify(data));
        this.timesInfoString = this.createTimesInfoString(this.eventData.times);
        this.eventData.signups ? this.checkForPriorSignup() : null;
        this.isEdit = this.hasPriorSignup ? true : false;
      },
    },
    methods: {
      regenerateEventData() {
        this.eventData = this.eventsStore.events.filter(
          (e) => e.eventId === this.eventData.eventId
        )[0];
        this.eventData.signups ? this.checkForPriorSignup() : null;
      },
      checkForPriorSignup() {
        this.priorSignup = this.eventData.signups.filter(
          (es) => es.studentId === this.userStore.userRoleInfo.studentId
        )[0];

        this.priorSignup
          ? (this.hasPriorSignup = true)
          : (this.hasPriorSignup = false);
      },
      regenerateSignups() {
        this.$emit("regenerateSignups");
        this.regenerateEventData();
        this.isEdit = this.hasPriorSignup ? true : false;
      },
      closeEventSignupDialog(val) {
        this.signUpDialog = val;
      },

      closeEventAvailabilityDialog(val) {
        this.availabilityDialog = val;
      },
      getTotalTimeslots() {
        let total = 0;
        for (let time of this.timeslots) {
          total += time.length;
        }

        return total;
      },
      openEventSignupDialog() {
        if (!this.hasPriorSignup) {
          this.signupData = {
            signupId: 0,
            eventId: 0,
            accompanistId: null,
            instructorId: null,
            ensembleId: 0,
            studentId: 0,
            timeslot: "",
            eventSignupCreatedAt: "",
            eventSignupUpdatedAt: "",
            songs: [],
            jurors: [],
          };
        } else {
          this.signupData = { ...this.priorSignup };
        }

        this.signupEventData = { ...this.eventData };
        this.signupEventData.timeslots = this.combineTimeslotsArrays(
          this.signupEventData.timeslots
        );
        delete this.signupEventData.signups;
        this.signupEventData.timesInfoString = this.timesInfoString;

        this.signUpDialog = true;
      },
      async openEventAvailabilityDialog() {
        this.availabilityEventData = {
          ...this.eventData,
          ...{ timesInfoString: this.timesInfoString },
        };
        this.availabilityEventData.timeslots = this.combineTimeslotsArrays(
          this.availabilityEventData.timeslots
        );
        delete this.availabilityEventData.signups;
        this.availabilityData =
          this.userStore.getCurrentInstructorAvailabilityForEventId(
            this.eventData.eventId
          );

        if (this.availabilityData.length > 0) {
          this.isEdit = true;
        }

        this.availabilityDialog = true;
      },
    },
  };
</script>

<style scoped>
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }
  .v-btn {
    opacity: 100%;
  }
</style>
