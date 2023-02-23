<template>
  <v-container fluid class="eventComponent">
    <v-card class="fullBorderCurve mainblur">
      <v-card-title class="font-weight-bold text-darkBlue">
        {{ title }} Change Request</v-card-title
      >
      <v-card-subtitle class="font-weight-bold text-darkBlue">
        {{ date }}
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <v-card-subtitle class="font-weight-bold text-darkGray">
                  Private Instructor
                </v-card-subtitle>
                <v-row justify="center" class="pl-1 mt-0 mb-1">
                  <v-col cols="2" align-self="center">
                    <v-avatar class="bg-darkBlue">
                      <font-awesome-icon
                        icon="fa-solid fa-user"
                        class="text-white" />
                    </v-avatar>
                  </v-col>
                  <v-col cols="9">
                    <v-card-title class="text-darkBlue font-weight-bold pb-2">
                      Jane Doe
                    </v-card-title>
                  </v-col>
                </v-row>
                <v-card-subtitle class="font-weight-bold text-darkGray">
                  Voice Part
                </v-card-subtitle>
                <v-card-subtitle
                  class="font-weight-bold text-darkBlue mt-5 mb-1">
                  Soprano
                </v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-subtitle class="font-weight-bold text-darkGray">
                  Accompanist
                </v-card-subtitle>
                <v-row justify="center" class="pl-1 mt-0 mb-1">
                  <v-col cols="2" align-self="center">
                    <v-avatar class="bg-darkBlue">
                      <font-awesome-icon
                        icon="fa-solid fa-user"
                        class="text-white" />
                    </v-avatar>
                  </v-col>
                  <v-col cols="9">
                    <v-card-title class="text-darkBlue font-weight-bold pb-2">
                      Jane Doe
                    </v-card-title>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-card-subtitle class="font-weight-bold text-darkGray">
              Timeslot Selection
            </v-card-subtitle>
            <v-card-text>
              <v-chip>Hello</v-chip>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: "EventItemEdit",
    data() {
      return {
        title: "Recital Hearing",
        date: "02/01/2023",
        time: "3:30 PM",
        place: "Adams Recital Hall",
        instructors: [
          {
            type: "Private Instructor",
            person: "Jane Doe",
          },
          {
            type: "Accompanist",
            person: "Jess Doe",
          },
        ],
        songs: [
          {
            name: "Bird Upon The Tree",
            person: "Blitzstein, Marc",
          },
        ],
        times: [
          {
            startTime: 900,
            endTime: 1200,
            interval: 10,
          },
          {
            startTime: 100,
            endTime: 300,
            interval: 10,
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
</style>
