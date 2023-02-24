<template>
  <v-container fluid class="menuBarGrid">
    <v-card class="menuBarPane rounded-s-0 rounded-e-lg mainBlur">
      <v-img
        alt="OC Logo"
        class="shrink mx-3 mt-4 mb-15"
        contain
        src="/OC_LOGO_BLUE.svg"
        transition="scale-transition"
        width="40"
      />
      <!-- Home Page -->
      <v-btn elevation="0" class="mt-16 mb-3">
        <v-icon size="xx-large">
          <font-awesome-icon
            icon="fa-solid fa-house-chimney"
            class="text-darkBlue"
          />
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- Events -->
      <v-btn elevation="0" class="mt-5">
        <v-icon size="xx-large">
          <font-awesome-icon
            icon="fa-solid fa-calendar"
            class="text-darkBlue"
          />
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- Repertoire -->
      <v-btn elevation="0" class="mt-5">
        <v-icon size="xx-large">
          <font-awesome-icon icon="fa-solid fa-music" class="text-darkBlue" />
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- Comments -->
      <v-btn elevation="0" class="mt-5 mb-16">
        <v-icon size="xx-large">
          <font-awesome-icon
            icon="fa-solid fa-comments"
            class="text-darkBlue"
          />
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- Settings -->
      <v-btn elevation="0" class="mt-16">
        <v-icon size="xx-large">
          <font-awesome-icon icon="fa-solid fa-gear" class="text-darkBlue" />
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- Logout -->
      <v-btn elevation="0" class="mt-5">
        <v-icon size="xx-large">
          <font-awesome-icon
            icon="fa-solid fa-right-from-bracket"
            class="text-darkBlue fa-flip-horizontal"
          />
        </v-icon>
      </v-btn>
    </v-card>
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
  grid-template-rows: minmax(auto, 1fr);
  grid-template-areas: "menuBarPane";
  grid-gap: 1.5rem;
  padding-left: 0;
  padding-right: 0;
}
.menuBarPane {
  grid-area: menuBarPane;
}
</style>
