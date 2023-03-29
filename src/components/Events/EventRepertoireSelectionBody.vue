<template>
  <v-card>
    <v-card-title>Select Song</v-card-title>
    <v-card-text
      ><v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details></v-text-field
    ></v-card-text>
  </v-card>
</template>

<script>
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "EventRepertoireSelectionBody",
    data() {
      return {};
    },
    computed: {
      ...mapStores(useUserStore),
    },

    methods: {},
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
