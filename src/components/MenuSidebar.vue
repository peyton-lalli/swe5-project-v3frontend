<template>
  <v-card fluid class="menuBarGrid bg-white my-4 menuBarBorder">
    <v-container class="iconArea pa-0 mt-2 px-2">
      <v-img
        alt="OC Logo"
        class="shrink mx-3 mt-4 mb-15"
        style="width: 70%; margin: auto"
        contain
        :src="logoUrl"
        transition="scale-transition"
        width="40"
        @click="routePage('dashboard')" />
    </v-container>

    <v-container class="mainNavArea pa-0 text-center">
      <!-- Home Page -->
      <v-row class="pb-12">
        <v-col>
          <v-tooltip text="Home Dashboard">
            <template v-slot:activator="{ props }">
              <v-icon
                size="xx-large"
                @click="routePage('/dashboard')"
                v-bind="props">
                <font-awesome-icon
                  icon="fa-solid fa-house-chimney"
                  :class="
                    this.$route.fullPath === '/dashboard'
                      ? 'text-darkBlue'
                      : 'text-mediumBlue'
                  " />
              </v-icon>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>

      <v-spacer></v-spacer>
      <!-- Events -->
      <v-row class="pb-12">
        <v-col>
          <v-tooltip text="Events">
            <template v-slot:activator="{ props }">
              <v-icon
                size="xx-large"
                @click="routePage('events')"
                v-bind="props">
                <font-awesome-icon
                  icon="fa-solid fa-calendar"
                  :class="
                    this.$route.fullPath === '/events'
                      ? 'text-darkBlue'
                      : 'text-mediumBlue'
                  " />
              </v-icon>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>

      <v-spacer></v-spacer>
      <!-- Repertoire -->
      <v-row
        class="pb-12"
        v-if="this.userStore.userInfo.roles.default.roleId === 1">
        <v-col>
          <v-tooltip text="Repertoire">
            <template v-slot:activator="{ props }">
              <v-icon
                size="xx-large"
                @click="routePage('dashboard/repertoire')"
                v-bind="props">
                <font-awesome-icon
                  icon="fa-solid fa-compact-disc"
                  :class="
                    this.$route.fullPath === '/dashboard/repertoire'
                      ? 'text-darkBlue'
                      : 'text-mediumBlue'
                  " />
              </v-icon>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>

      <v-spacer></v-spacer>
      <!-- Critiques -->
      <v-row v-if="this.userStore.userInfo.roles.default.roleId === 1">
        <v-col>
          <v-tooltip text="Critiques">
            <template v-slot:activator="{ props }">
              <v-icon
                size="xx-large"
                @click="routePage('/dashboard')"
                v-bind="props">
                <font-awesome-icon
                  icon="fa-solid fa-square-pen"
                  :class="
                    this.$route.fullPath === '/critiques'
                      ? 'text-darkBlue'
                      : 'text-mediumBlue'
                  " />
              </v-icon>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>

      <v-spacer></v-spacer>
    </v-container>

    <v-container class="bottomNavArea pa-0 text-center">
      <v-row class="pb-6 mt-12">
        <v-col>
          <v-tooltip text="Settings">
            <template v-slot:activator="{ props }">
              <v-icon
                size="xx-large"
                @click="this.$router.push(this.$route.fullPath + '/settings')"
                v-bind="props">
                <font-awesome-icon
                  icon="fa-solid fa-gear"
                  :class="
                    this.$route.fullPath.includes('/settings')
                      ? 'text-darkBlue'
                      : 'text-mediumBlue'
                  " />
              </v-icon>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>

      <v-dialog v-model="settingsDialog" persistent max-width="600px">
        <ProfileSettings></ProfileSettings>
      </v-dialog>

      <v-spacer></v-spacer>

      <!-- Logout -->
      <v-row>
        <v-col>
          <v-tooltip text="Logout">
            <template v-slot:activator="{ props }">
              <v-icon size="xx-large" @click="logout()" v-bind="props">
                <font-awesome-icon
                  icon="fa-solid fa-right-from-bracket"
                  class="text-mediumBlue fa-flip-horizontal" />
              </v-icon>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
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
        settingsDialog: this.$route.fullPath.includes("/settings"),
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

    watch: {
      "$route.fullPath": function (newRoute) {
        this.settingsDialog = newRoute.includes("/settings");
      },
    },
  };
</script>

<style scoped>
  .menuBarGrid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 4fr 1fr;
    grid-template-areas: "iconArea" "mainNavArea" "bottomNavArea";
    grid-gap: 1.5rem;
  }
  .menuBarPane {
    grid-area: menuBarPane;
  }

  .iconArea {
    grid-area: iconArea;
  }

  .mainNavArea {
    grid-area: mainNavArea;
  }

  .bottomNavArea {
    grid-area: bottomNavArea;
  }
</style>
