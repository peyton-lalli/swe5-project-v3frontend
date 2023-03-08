<template>
  <v-container fluid class="menuBarGrid">
    <v-card class="menuBarPane rounded-s-0 rounded-e-lg mainBlur">
      <v-img
        alt="OC Logo"
        class="shrink mx-3 mt-4 mb-15"
        style="width: 70%; margin: auto"
        contain
        :src="logoUrl"
        transition="scale-transition"
        width="40" />
      <!-- Home Page -->
      <v-btn
        elevation="0"
        class="mt-16 mb-3"
        style="width: 90%; margin: auto"
        @click="eventsStore.hideEventsPage">
        <v-icon size="xx-large">
          <font-awesome-icon
            icon="fa-solid fa-house-chimney"
            class="text-darkBlue" />
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- Events -->
      <v-btn
        elevation="0"
        class="mt-5"
        style="width: 90%; margin: auto"
        @click="eventsStore.showEventsPage">
        <v-icon size="xx-large">
          <font-awesome-icon
            icon="fa-solid fa-calendar"
            class="text-darkBlue" />
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- Repertoire -->
      <v-btn elevation="0" class="mt-5" style="width: 90%; margin: auto">
        <v-icon size="xx-large">
          <font-awesome-icon icon="fa-solid fa-music" class="text-darkBlue" />
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- Comments -->
      <v-btn elevation="0" class="mt-5 mb-16" style="width: 90%; margin: auto">
        <v-icon size="xx-large">
          <font-awesome-icon
            icon="fa-solid fa-comments"
            class="text-darkBlue" />
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- Settings -->
      <v-btn
        @click="createDialog = true"
        elevation="0"
        class="mt-16"
        style="width: 90%; margin: auto">
        <v-icon size="xx-large">
          <font-awesome-icon icon="fa-solid fa-gear" class="text-darkBlue" />
        </v-icon>
      </v-btn>
      <v-dialog v-model="createDialog" persistent max-width="600px">
        <ProfileSettings
          @closeCourseDialogEvent="closeCreateDialog"></ProfileSettings>
      </v-dialog>
      <v-spacer></v-spacer>
      <!-- Logout -->
      <v-btn
        elevation="0"
        class="mt-5"
        style="width: 90%; margin: auto"
        @click="logout()">
        <v-icon size="xx-large">
          <font-awesome-icon
            icon="fa-solid fa-right-from-bracket"
            class="text-darkBlue fa-flip-horizontal" />
        </v-icon>
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
  import ocLogo from "/OC_LOGO_BLUE.svg";
  import ProfileSettings from "./ProfileSettings.vue";
  import { useEventsStore } from "../stores/EventsStore.js";
  import { mapStores } from "pinia";
  import { useLoginStore } from "../stores/LoginStore.js";
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
      ...mapStores(useEventsStore, useLoginStore, useUserStore),
    },
    async created() {
      this.logoUrl = ocLogo;
    },
    methods: {
      closeCreateDialog(val) {
        this.createDialog = val;
      },
      logout() {
        // this.loginStore.setLoginUser(null);
        this.userStore.clearLoginUser();
        location.reload();
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
