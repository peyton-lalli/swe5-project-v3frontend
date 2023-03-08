<template>
  <v-container fluid class="eventComponent pt-2">
    <v-card class="eventsGradient fullBorderCurve mainblur">
      <v-card class="ma-3 fullBorderCurve" elevation="0">
        <v-card-title class="font-weight-bold text-black">
          <v-row>
            <v-col class="pb-0">{{ events.at(0).title }}</v-col>
          </v-row>
        </v-card-title>
        <v-card-subtitle class="font-weight-bold text-darkBlue">
          {{ events.at(0).date }}
        </v-card-subtitle>
        <v-card-subtitle class="font-weight-bold text-darkBlue pb-1">
          {{ events.at(0).time }}
        </v-card-subtitle>
      </v-card>
      <v-card-actions class="pt-0">
        <v-btn
          elevation="0"
          size="small"
          rounded="pill"
          class="buttonWhite text-mediumBlue font-weight-bold"
        >
          View Signups
        </v-btn>
        <v-btn
          elevation="0"
          size="small"
          rounded="pill"
          class="buttonWhite text-mediumBlue font-weight-bold"
        >
          Critiques
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  <v-container fluid class="eventComponent pt-2">
    <v-card class="eventsGradient fullBorderCurve mainblur">
      <v-card class="ma-3 fullBorderCurve" elevation="0">
        <v-card-title class="font-weight-bold text-black">
          <v-row>
            <v-col class="pb-0">{{ events.at(1).title }}</v-col>
          </v-row>
        </v-card-title>
        <v-card-subtitle class="font-weight-bold text-darkBlue">
          {{ events.at(1).date }}
        </v-card-subtitle>
        <v-card-subtitle class="font-weight-bold text-darkBlue pb-1">
          {{ events.at(1).time }}
        </v-card-subtitle>
      </v-card>
      <v-card-actions class="pt-0">
        <v-btn
          elevation="0"
          size="small"
          rounded="pill"
          class="buttonWhite text-mediumBlue font-weight-bold"
        >
          View Signups
        </v-btn>
        <v-btn
          elevation="0"
          size="small"
          rounded="pill"
          class="buttonWhite text-mediumBlue font-weight-bold"
        >
          Critiques
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "AttentionComponent",
  components: {},
  data() {
    return {
      events: [
        {
          title: "Vocal Jury",
          date: "04/22/2023",
          time: "1:00 PM - 5:00 PM",
        },
        {
          title: "Instrumental Jury",
          date: "04/23/2023",
          time: "9:00 AM - 12:00 PM",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Overwrites the opacity filter put on card subtitles */
.v-card-subtitle {
  opacity: 100%;
}
.outlined.v-btn {
  background: linear-gradient(white, white) padding-box,
    linear-gradient(to right, #aabed2, #ddeaf6) border-box;
  border-radius: 50em;
  border: 4px solid transparent;
}
.outlined.v-card {
  background: linear-gradient(white, white) padding-box,
    linear-gradient(to right, #aabed2, #ddeaf6) border-box;
  border-radius: 10px;
  border: 7px solid transparent;
}
</style>
