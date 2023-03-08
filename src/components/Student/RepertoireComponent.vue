<template>
  <v-container fluid class="repertoireComponent">
    <v-card elevation="0" class="repertoireItemGradient fullBorderCurve">
      <v-card-text class="pt-0">
        <v-row justify="center" class="pl-5 mt-0">
          <v-col cols="1" align-self="center">
            <v-avatar class="bg-darkBlue">
              <v-img
                src="https://www.mtishows.com/sites/default/files/profile/marcblitzstein.jpg?download=1"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="9" class="pt-0 pb-0">
            <v-card-title class="pb-0 font-weight-bold text-h9">
              {{ songs.at(0).name }}
            </v-card-title>
            <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
              {{ songs.at(0).person }}
            </v-card-subtitle>
          </v-col>
          <v-col cols="1" align-self="center" class="pl-0">
            <!-- <v-icon size="x-large">
              <font-awesome-icon icon="fa-solid fa-video" class="text-white" />
            </v-icon> -->
          </v-col>
          <v-col cols="1" align-self="center" class="pl-0">
            <!-- <v-icon size="x-large">
              <font-awesome-icon
                icon="fa-solid fa-calendar"
                class="text-white" />
            </v-icon> -->
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: "Repertoire Component",
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
