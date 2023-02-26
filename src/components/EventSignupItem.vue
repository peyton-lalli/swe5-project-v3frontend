<template>
  <v-container>
    <v-card elevation="0" class="eventsSignupItemGradient fullBorderCurve">
      <v-card-title class="font-weight-bold text-white pb-0">
        {{ eventData.type }}
      </v-card-title>
      <v-card-subtitle class="font-weight-semi-bold text-darkBlue">
        {{ eventData.date }}
      </v-card-subtitle>
      <v-card-subtitle class="font-weight-semi-bold text-darkBlue">
        {{ createTimesInfoString() }}
      </v-card-subtitle>
      <v-card-subtitle class="font-weight-medium text-mediumBlue">
        {{ eventData.location }}
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: "EventSignupItem",
    components: {},
    data() {
      return {
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
