<template>
  <!-- <v-dialog width="auto"> -->
  <v-card>
    <v-card-title color="darkBlue">Add to Repertoire </v-card-title>
    <v-card-subtitle> Instrument </v-card-subtitle>
    <v-card-text>
      <v-select
        label="Instrument"
        :items="['Voice', 'Piano', 'Trumpet']"
        variant="solo"></v-select>
    </v-card-text>
    <v-card-subtitle> Piece Title </v-card-subtitle>
    <v-card-text>
      <v-text-field label="Piece Title" variant="solo" color="mediumBlue">
      </v-text-field>
    </v-card-text>
    <v-card-subtitle> Composer </v-card-subtitle>
    <v-card-text>
      <v-select
        label="Start typing for suggestions"
        :items="['Beethoven', 'Bach', 'Tchaikovsky']"
        variant="solo"></v-select>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-text>
      <v-checkbox label="Foreign Piece"></v-checkbox>
    </v-card-text>
    <v-card-subtitle> Translation </v-card-subtitle>
    <v-card-text>
      <v-text-field label="Translation" variant="solo" color="mediumBlue">
      </v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="darkBlue">Add</v-btn>
      <v-btn @click="closeDialog()" color="red">Cancel</v-btn>
    </v-card-actions>
  </v-card>
  <!-- </v-dialog> -->
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
    methods: {
      closeDialog() {
        this.$emit("closeCourseDialogEvent", false);
      },
    },
  };
</script>
