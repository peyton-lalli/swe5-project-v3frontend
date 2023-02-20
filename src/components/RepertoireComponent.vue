<template>
  <v-container fluid class="repertoireComponent">
    <v-card class="repertoireItemGradient fullBorderCurve">
      <v-card-text class="pt-0">
        <v-row justify="center" class="pl-5 mt-0">
          <v-col cols="1" align-self="center">
            <v-avatar class="bg-darkBlue">
              <font-awesome-icon icon="fa-solid fa-user" class="text-white" />
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <v-card-title class="pb-0 font-weight-bold">
              {{ songs.at(0).name }}
            </v-card-title>
            <v-card-subtitle class="text-darkBlue font-weight-bold pb-2">
              {{ songs.at(0).person }}
            </v-card-subtitle>
          </v-col>
          <v-col cols="1" align-self="center" class="pl-0">
            <v-btn variant="plain" size="x-large" class="pl-0">
              <font-awesome-icon icon="fa-solid fa-video" class="text-white" />
            </v-btn>
          </v-col>
          <v-col cols="1" align-self="center" class="pl-0">
            <v-btn variant="plain" size="x-large" class="pl-0">
              <font-awesome-icon
                icon="fa-solid fa-calendar"
                class="text-white" />
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: "EventComponent",
    components: {},
    data() {
      return {
        songs: [
          {
            name: "Bird Upon The Tree",
            person: "Blitzstein, Marc",
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
  .v-btn {
    opacity: 100%;
  }
</style>
