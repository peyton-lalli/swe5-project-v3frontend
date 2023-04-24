<template>
  <v-container fluid class="menuBarGrid">
    <v-card class="menuBarPane menuBarBorder">
      <v-img
        alt="OC Logo"
        class="shrink mx-3 mt-4 mb-15"
        style="width: 70%; margin: auto"
        contain
        :src="logoUrl"
        transition="scale-transition"
        width="40" />
      <!-- Home Page -->
      <v-tooltip text="Home Dashboard">
        <template v-slot:activator="{ props }">
          <v-btn
            elevation="0"
            class="mt-16 mb-3"
            style="width: 90%; margin: auto"
            @click="routePage('dashboard')"
            v-bind="props">
            <v-icon size="xx-large">
              <font-awesome-icon
                icon="fa-solid fa-house-chimney"
                class="text-darkBlue" />
            </v-icon>
          </v-btn>
        </template>
      </v-tooltip>
      <v-spacer></v-spacer>
      <!-- Events -->
      <v-tooltip text="Events">
        <template v-slot:activator="{ props }">
          <v-btn
            elevation="0"
            class="mt-5"
            style="width: 90%; margin: auto"
            @click="routePage('events')"
            v-bind="props">
            <v-icon size="xx-large">
              <font-awesome-icon
                icon="fa-solid fa-calendar"
                class="text-darkBlue" />
            </v-icon>
          </v-btn>
        </template>
      </v-tooltip>
      <v-spacer></v-spacer>
      <!-- Repertoire -->
      <v-tooltip text="Repertoire">
        <template v-slot:activator="{ props }">
          <v-btn
            elevation="0"
            class="mt-5"
            style="width: 90%; margin: auto"
            v-bind="props">
            <v-icon size="xx-large">
              <font-awesome-icon
                icon="fa-solid fa-compact-disc"
                class="text-darkBlue" />
            </v-icon>
          </v-btn>
        </template>
      </v-tooltip>
      <v-spacer></v-spacer>
      <!-- Critiques -->
      <v-tooltip text="Critiques">
        <template v-slot:activator="{ props }">
          <v-btn
            elevation="0"
            class="mt-5 mb-16"
            style="width: 90%; margin: auto"
            v-bind="props">
            <v-icon size="xx-large">
              <font-awesome-icon
                icon="fa-solid fa-square-pen"
                class="text-darkBlue" />
            </v-icon>
          </v-btn>
        </template>
      </v-tooltip>
      <v-spacer></v-spacer>
      <!-- Settings -->
      <v-tooltip text="Settings">
        <template v-slot:activator="{ props }">
          <v-btn
            @click="createDialog = true"
            elevation="0"
            class="mt-16"
            style="width: 90%; margin: auto"
            v-bind="props">
            <v-icon size="xx-large">
              <font-awesome-icon
                icon="fa-solid fa-gear"
                class="text-darkBlue" />
            </v-icon>
          </v-btn>
        </template>
      </v-tooltip>
      <v-dialog v-model="createDialog" persistent max-width="600px">
        <ProfileSettings
          @closeCourseDialogEvent="closeCreateDialog"></ProfileSettings>
      </v-dialog>
      <v-spacer></v-spacer>
      <!-- Logout -->
      <v-tooltip text="Logout">
        <template v-slot:activator="{ props }">
          <v-btn
            elevation="0"
            class="mt-5"
            style="width: 90%; margin: auto"
            @click="logout()"
            v-bind="props">
            <v-icon size="xx-large">
              <font-awesome-icon
                icon="fa-solid fa-right-from-bracket"
                class="text-darkBlue fa-flip-horizontal" />
            </v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-card>
  </v-container>
</template>

<script>
  import ocLogo from "../assets/OC_LOGO_BLUE_GRADIENT.svg";
  import ProfileSettings from "./ProfileSettings.vue";
  import { mapStores } from "pinia";
  import { useEventsStore } from "../stores/EventsStore.js";
  import { useUserStore } from "../stores/UserStore.js";
  export default {
    name: "MenuSidebar",
    components: {
      ProfileSettings,
      ocLogo,
    },
    data() {
      return {
        menuItems: [],
        createDialog: false,
        logoUrl: "",
      };
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    async created() {
      this.logoUrl = ocLogo;
    },
    methods: {
      closeCreateDialog(val) {
        this.createDialog = val;
      },
      logout() {
        this.userStore.clearLoginUser();
        this.$router.push({
          name: "loginPage",
        });
      },
      routePage(page) {
        this.$router.push({ path: page });
      },
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
