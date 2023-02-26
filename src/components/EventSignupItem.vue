<template>
  <v-container>
    <v-card class="lighterBlur eventsSignupItemGradient rounded-lg pa-0">
      <v-row class="pa-4" no-gutters align="center">
        <v-col cols="auto">
          <v-card-title class="font-weight-bold text-white pb-0 pt-0 pl-0">
            {{ eventData.type }}
          </v-card-title>
          <v-card-subtitle class="font-weight-semi-bold text-darkBlue pl-0">
            {{ eventData.date }}
          </v-card-subtitle>
          <v-card-subtitle class="font-weight-semi-bold text-darkBlue pl-0">
            {{ createTimesInfoString() }}
          </v-card-subtitle>
          <v-card-subtitle class="font-weight-medium text-mediumBlue pl-0">
            {{ eventData.location }}
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
                {{ eventData.timeslots.filled }} /
                {{ eventData.timeslots.total }} Timeslots Filled
              </v-btn>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col justify="center">
              <v-dialog v-model="signUpDialog" persistent max-width="1000px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    elevation="0"
                    size="small"
                    rounded="pill"
                    class="buttonGradient text-white font-weight-bold text-capitalize"
                    @click="signUpDialog = true"
                    v-bind="attrs"
                    v-on="on">
                    Signup
                  </v-btn>
                </template>
                <EventItem @closeEventDialogEvent="closeEventDialog">
                </EventItem>
              </v-dialog>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
  import EventItem from "./EventItem.vue";
  export default {
    name: "EventSignupItem",
    components: {
      EventItem,
    },
    data() {
      return {
        signUpDialog: false,
        eventData: {
          type: "Vocal Jury",
          date: "04/22/2023",
          times: [
            { startTime: "9:00am", endTime: "12:00pm" },
            { startTime: "1:00pm", endTime: "3:00pm" },
          ],
          location: "Adams Recital Hall",
          timeslots: { total: 25, filled: 14 },
        },
      };
    },
    methods: {
      createTimesInfoString() {
        let timesString = "";
        for (let i = 0; i < this.eventData.times.length; i++) {
          timesString +=
            this.eventData.times[i].startTime +
            " - " +
            this.eventData.times[i].endTime;
          if (i + 1 < this.eventData.times.length) {
            timesString += " & ";
          }
        }

        return timesString;
      },
      closeEventDialog(val) {
        this.signUpDialog = val;
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
