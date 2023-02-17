<template>
  <v-container fluid class="menuBarGrid">
    <v-card class="menuBarPane rounded-s-0 rounded-e-lg mainBlur"></v-card>
  </v-container>
</template>

<script>
  export default {
    name: "MenuSidebar",
    components: {},
    data() {
      return {
        menuItems: [],
      };
    },
  };
</script>

<style scoped>
  .menuBarGrid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "menuBarPane";
    grid-gap: 1.5rem;
    padding-left: 0;
    padding-right: 0;
  }

  .menuBarPane {
    grid-area: menuBarPane;
  }
</style>
