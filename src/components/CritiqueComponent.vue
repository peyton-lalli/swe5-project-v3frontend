<template>
  <v-container fluid class="eventComponent">
    <v-card class="fullBorderCurve mainBlur">
      <v-card-title class="font-weight-bold text-black">
        <v-row>
          <v-col>{{ title }}</v-col>
          <v-col>
            <v-btn class="outlined" rounded="pill" size="small">{{
              type
            }}</v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-subtitle class="font-weight-medium text-mediumBlue">
        {{ date }}
      </v-card-subtitle>
      <v-card-title class="font-weight-bold text-darkBlue pt-5">
        Jurors
      </v-card-title>
      <v-card-text>
        <v-row justify="center" class="pl-5 mt-0">
          <v-col cols="1" align-self="center">
            <v-avatar class="bg-darkBlue">
              <font-awesome-icon icon="fa-solid fa-user" class="text-white" />
            </v-avatar>
          </v-col>
          <v-col cols="11">
            <v-card-title class="text-darkBlue font-weight-bold pb-2">
              {{ jurors.at(0) }}
            </v-card-title>
          </v-col>
        </v-row>
        <v-row justify="center" class="pl-5 mt-0">
          <v-col cols="1" align-self="center">
            <v-avatar class="bg-darkBlue">
              <font-awesome-icon icon="fa-solid fa-user" class="text-white" />
            </v-avatar>
          </v-col>
          <v-col cols="11">
            <v-card-title class="text-darkBlue font-weight-bold pb-2">
              {{ jurors.at(1) }}
            </v-card-title>
          </v-col>
        </v-row>
        <v-row justify="center" class="pl-5 mt-0">
          <v-col cols="1" align-self="center">
            <v-avatar class="bg-darkBlue">
              <font-awesome-icon icon="fa-solid fa-user" class="text-white" />
            </v-avatar>
          </v-col>
          <v-col cols="11">
            <v-card-title class="text-darkBlue font-weight-bold pb-2">
              {{ jurors.at(2) }}
            </v-card-title>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card class="ma-5 outlined">
        <v-card-title class="font-weight-bold text-darkBlue">
          Musical Selection
        </v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-col align-self="center">
              <v-card-title class="pb-0 font-weight-bold">
                {{ songs.at(0).name }}
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-bold">
                {{ songs.at(0).person }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col align-self="center">
              <v-card-title class="pb-0 font-weight-bold">
                {{ songs.at(0).name }}
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-bold">
                {{ songs.at(0).person }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col align-self="center">
              <v-card-title class="pb-0 font-weight-bold">
                {{ songs.at(0).name }}
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-bold">
                {{ songs.at(0).person }}
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: "CritiqueComponent",
    components: {},
    data() {
      return {
        title: "Jury Critique",
        type: "Soprano",
        date: "04/22/2023",
        jurors: ["Jane Doe", "James Doe", "Jeff Doe"],
        songs: [
          {
            name: "Bird Upon The Tree",
            person: "Blitzstein, Marc",
          },
          {
            name: "Much More",
            person: "Schmidt, Harvey",
          },
          {
            name: "Bird Upon The Tree",
            person: "Schonberg, Claude-Michel",
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
