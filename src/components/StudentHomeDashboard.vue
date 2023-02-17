<template>
  <v-container fluid class="studentHomeMainGrid">
    <v-container fluid class="eventsRepPane studentHomeLeftGrid noPadMarg">
      <v-card class="eventsPane mainBlur rounded-lg"> </v-card>
      <v-card class="repertoirePane mainBlur rounded-lg"> </v-card>
    </v-container>
    <v-card class="critiquesPane mainBlur rounded-lg"> </v-card>
  </v-container>
</template>

<script>
  export default {
    name: "StudentHomeDashboard",
    components: {},
    data() {},
  };
</script>

<style scoped>
  .noPadMarg {
    padding: 0 !important;
    margin: 0 !important;
  }

  .studentHomeMainGrid {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: auto;
    grid-template-areas: "eventsRepPane critiquesPane";
    grid-gap: 1.5rem;
    padding-left: 0;
  }
  .studentHomeLeftGrid {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "eventsPane"
      "repertoirePane";
    grid-gap: 1.5rem;
  }

  .eventsRepPane {
    grid-area: eventsRepPane;
  }

  .critiquesPane {
    grid-area: critiquesPane;
  }

  .eventsPane {
    grid-area: eventsPane;
  }

  .repertoirePane {
    grid-area: repertoirePane;
  }
</style>
