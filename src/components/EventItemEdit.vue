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
            <v-card-subtitle class="font-weight-bold text-darkGray pl-1">
              Timeslot Selection
            </v-card-subtitle>
            <v-row class="pt-3">
              <v-card-text
                v-for="(time, index) in timesToResults(
                  times[0].start_time,
                  times[0].end_time,
                  times[0].interval
                )"
                :key="index">
                <v-btn
                  elevation="0"
                  rounded="lg"
                  size="x-small"
                  class="buttonGradient text-white font-weight-bold"
                  >{{ time }}</v-btn
                >
              </v-card-text>
            </v-row>
            <v-row>
              <v-card-text
                v-for="(time, index) in timesToResults(
                  times[1].start_time,
                  times[1].end_time,
                  times[1].interval
                )"
                :key="index">
                <v-btn
                  elevation="0"
                  rounded="lg"
                  size="x-small"
                  class="buttonGradient text-white font-weight-bold"
                  >{{ time }}</v-btn
                >
              </v-card-text>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-subtitle class="font-weight-bold text-darkGray">
              Musical Selection
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Search your repertoire"
                    variant="solo"></v-text-field>
                </v-col>
                <v-col cols="2"> or </v-col>
                <v-col cols="4">
                  <v-btn
                    elevation="0"
                    rounded="pill"
                    class="buttonGradient text-white font-weight-bold">
                    Add New
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card class="eventsGradient fullBorderCurve mainblur">
                    <v-card-title class="font-weight-bold text-white pl-5">
                      Selected
                    </v-card-title>
                    <v-card-text>
                      <v-card class="fullBorderCurve">
                        <v-card-text class="pt-0">
                          <v-row justify="center" class="pl-1 mt-0">
                            <v-col cols="1" align-self="center">
                              <v-avatar class="bg-darkBlue">
                                <font-awesome-icon
                                  icon="fa-solid fa-user"
                                  class="text-white" />
                              </v-avatar>
                            </v-col>
                            <v-col cols="11">
                              <v-card-subtitle
                                class="mt-2 ml-1 font-weight-bold">
                                {{ songs.at(0).name }}
                              </v-card-subtitle>
                              <v-card-subtitle
                                class="text-darkBlue font-weight-bold pb-2 ml-1">
                                {{ songs.at(0).person }}
                              </v-card-subtitle>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-col>
          <v-col>
            <v-row>
              <v-col>
                <v-card-subtitle class="font-weight-bold text-darkGray pl-1">
                  Additional Musical Selection
                </v-card-subtitle>
              </v-col>
              <v-col class="text-right">
                <v-btn
                  elevation="0"
                  rounded="pill"
                  size="x-small"
                  class="buttonGradient text-white font-weight-bold">
                  Add to repertoire
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card class="eventsGradient fullBorderCurve mainblur"
                  >//Addition Selections Go Here</v-card
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-center">
        <v-btn
          rounded="pill"
          class="buttonGradient text-white mr-3"
          @click="closeDialog()">
          Signup
        </v-btn>
        <v-btn
          rounded="pill"
          color="#DA9B9B"
          class="text-white mr-3"
          @click="closeDialog()">
          Cancel
        </v-btn>
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
        date: "2/1/2023",
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
            start_time: "09:00:00",
            end_time: "12:00:00",
            interval: 10,
          },
          {
            start_time: "13:00:00",
            end_time: "15:00:00",
            interval: 10,
          },
        ],
      };
    },
    computed: {},
    methods: {
      timesToResults(start_time, end_time, interval) {
        let results = [];
        console.log(start_time);
        let startTime = start_time.split(":");
        let endTime = end_time.split(":");
        while (startTime[0] != endTime[0] || startTime[1] != endTime[1]) {
          if (parseInt(startTime[0]) > 12) {
            results.push(parseInt(startTime[0]) - 12 + ":" + startTime[1]);
          } else {
            results.push(parseInt(startTime[0]) + ":" + startTime[1]);
          }
          let minute = parseInt(startTime[1]);
          minute += interval;
          startTime[1] = minute.toString();
          if (startTime[1] == "60") {
            let hour = parseInt(startTime[0]) + 1;
            startTime[0] = hour.toString();
            startTime[1] = "00";
          }
        }
        return results;
      },
      closeDialog() {
        this.$emit("closeEditDialogEvent", false);
      },
    },
  };
</script>

<style scoped>
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }
  .v-text-field {
    border-radius: 100px;
  }
</style>
