<template>
  <v-container fluid class="repertoireComponent">
    <v-card elevation="0" class="repertoireItemGradient fullBorderCurve">
      <v-card-text class="pt-0">
        <v-row justify="center" class="pl-5 mt-0">
          <v-col cols="1" align-self="center">
            <v-avatar class="bg-darkBlue">
              <!-- Need to get composer API working to get this image -->
              <v-img :src="sentPiece.composer.picture"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="9" class="pt-0 pb-0">
            <v-card-title class="pb-0 font-weight-bold text-h9">
              {{ sentPiece.name }}
            </v-card-title>
            <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
              {{ sentPiece.composer.name }}
            </v-card-subtitle>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: "Repertoire Component",
    components: {},
    props: {
      sentPiece: {},
    },
    data() {
      return {};
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
