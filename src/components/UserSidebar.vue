<template>
  <v-container fluid class="sidebarGrid">
    <v-card class="userProfilePane mainCardBorder pa-3">
      <v-card-title class="pt-4">
        <v-avatar size="68" class="bg-darkBlue">
          <v-img :src="this.userStore.userInfo.picture"></v-img>
        </v-avatar>
      </v-card-title>
      <v-card-title class="text-h5 fontWeightBlackOverride text-darkGray pb-0">
        {{ this.userStore.getFullName.toUpperCase() }}
      </v-card-title>
      <v-card-subtitle class="font-weight-medium text-darkBlue">
        {{ userTitleOrMajor }}
      </v-card-subtitle>
      <v-card-subtitle
        v-if="isStudent"
        class="font-weight-medium text-mediumBlue">
        {{ this.userStore.userRoleInfo.classification }}
      </v-card-subtitle>
      <v-card-text v-if="isStudent">
        <v-row>
          <v-col cols="12">
            <v-card-subtitle
              v-if="this.userStore.userRoleInfo.level < 4"
              class="text-mediumBlue font-weight-semi-bold pl-0">
              {{ "Vocal Level " }}
            </v-card-subtitle>
            <v-row>
              <v-col cols="10">
                <v-progress-linear
                  color="white"
                  rounded
                  v-model="userLevelPercent"
                  :height="this.userStore.userRoleInfo.level < 4 ? 15 : 25">
                  <v-card-text
                    v-if="this.userStore.userRoleInfo.level >= 4"
                    class="text-left font-weight-bold text-white"
                    >Vocal Level
                  </v-card-text>
                </v-progress-linear>
              </v-col>
              <v-col cols="2" class="font-weight-bold text-mediumBlue">
                {{ this.userStore.userRoleInfo.level }}/8</v-col
              >
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-card elevation="0" class="rounded-lg privateInstructorGradient">
              <v-row justify="center" class="pl-5 pt-t pb-0">
                <v-col cols="2" align-self="center">
                  <v-avatar class="bg-darkBlue">
                    <v-img
                      :src="
                        this.userStore.userRoleInfo.instructors[0].picture
                      "></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="10" align-self="center">
                  <v-card-title class="pb-0 font-weight-semi-bold text-h6">
                    {{ this.userStore.userRoleInfo.instructors[0].title }}
                  </v-card-title>
                  <v-card-subtitle
                    class="text-darkBlue font-weight-bold pb-2 font-weight-bold">
                    {{ this.userStore.userRoleInfo.instructors[0].name }}
                  </v-card-subtitle>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card
      class="notificationGradient mainCardBorder notificationsPane overflow-auto pa-3">
      <v-card-title class="text-white font-weight-bold text-h5 pb-4">
        Notifications
      </v-card-title>
      <v-card-text class="pb-0"> </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import NotificationItem from "./NotificationItem.vue";
  import { useUserStore } from "../stores/UserStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "UserSidebar",
    components: { NotificationItem },
    data() {
      return {
        isStudent: false,
        isFaculty: false,
        isAdmin: false,
        isAccomapnist: false,
        userTitleOrMajor: "",
      };
    },
    computed: {
      ...mapStores(useUserStore),
    },
    mounted() {
      this.retrieveInfo();
    },
    methods: {
      retrieveInfo() {
        if (this.userStore.userInfo.roles.default.roleId === 1) {
          this.isStudent = true;
          this.userTitleOrMajor = this.userStore.userRoleInfo.major;
          this.setUserLevelPercent(this.userStore.userRoleInfo.level);
        } else if (this.userStore.userInfo.roles.default.roleId === 2) {
          this.isFaculty = true;
          this.userTitleOrMajor = this.userStore.userRoleInfo.title;
        } else if (this.userStore.userInfo.roles.default.roleId === 3) {
          this.isAdmin = true;
          this.userTitleOrMajor = "Administrator";
        } else if (this.userStore.userInfo.roles.default.roleId === 4) {
          this.isAccomapnist = true;
          this.userTitleOrMajor = "Accompanist";
        }
      },
      setUserLevelPercent(level) {
        this.userLevelPercent = level * 12.5;
      },
    },
  };
</script>

<style scoped>
  * {
    font-family: Inter, sans-serif !important;
  }
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }

  .scroll {
    overflow-y: scroll !important;
  }

  .fontWeightBlackOverride {
    font-weight: 900 !important;
  }

  .sidebarGrid {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto minmax(auto, 3fr);
    grid-template-areas:
      "userProfilePane"
      "notificationsPane";
    grid-gap: 1.5rem;
    padding-left: 0;
    padding-right: 0;
  }
  .userProfilePane {
    grid-area: userProfilePane;
  }

  .notificationsPane {
    grid-area: notificationsPane;
  }
</style>
