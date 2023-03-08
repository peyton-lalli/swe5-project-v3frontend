<template>
  <v-container fluid class="eventComponent">
    <v-card class="fullBorderCurve mainBlur">
      <v-card-title class="font-weight-bold text-black">
        <v-row>
          <v-col>{{ title }}</v-col>
          <v-col>
            <v-btn class="outlined" rounded="pill" size="small" elevation="0">{{
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
      <v-card-text class="pl-0">
        <v-row justify="center" class="pl-5 mt-0">
          <v-col cols="1" align-self="center">
            <v-avatar class="bg-darkBlue">
              <v-img></v-img>
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
              <v-img></v-img>
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
              <v-img></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="11">
            <v-card-title class="text-darkBlue font-weight-bold pb-2">
              {{ jurors.at(2) }}
            </v-card-title>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card class="ma-5 outlined" elevation="0">
        <v-card-title class="font-weight-bold text-darkBlue">
          Musical Selection
        </v-card-title>
        <v-card-text class="pl-0">
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
                {{ songs.at(1).name }}
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-bold">
                {{ songs.at(1).person }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col align-self="center">
              <v-card-title class="pb-0 font-weight-bold">
                {{ songs.at(2).name }}
              </v-card-title>
              <v-card-subtitle class="text-darkBlue font-weight-bold">
                {{ songs.at(2).person }}
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
  import { mapStores } from "pinia";
  export default {
    name: "CritiqueComponent",
    components: {},
    data() {
      return {
        title: "Jury Critique",
        type: "Soprano",
        date: "04/22/2023",
        jurors: ["Nathan Lalli", "Peyton Powell", "Logan Demaray"],
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
            name: "In My Life",
            person: "Schonberg, Claude-Michel",
          },
        ],
      };
    },
    computed: {
      ...mapStores(),
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
