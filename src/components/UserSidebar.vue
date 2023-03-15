<template>
  <v-container fluid class="sidebarGrid">
    <v-card class="userProfilePane mainBlur rounded-lg pa-3">
      <v-card-title class="pt-4">
        <v-avatar size="68" class="bg-darkBlue">
          <v-img :src="userPicture"></v-img>
        </v-avatar>
      </v-card-title>
      <v-card-title class="text-h5 fontWeightBlackOverride text-darkGray pb-0">
        {{ userName.toUpperCase() }}
      </v-card-title>
      <v-card-subtitle class="font-weight-medium text-darkBlue">
        {{ userTitleOrMajor }}
      </v-card-subtitle>
      <v-card-subtitle
        v-if="userRole === 'student'"
        class="font-weight-medium text-mediumBlue">
        {{ userClassification }}
      </v-card-subtitle>
      <v-card-text v-if="userRole === 'student'">
        <v-row>
          <v-col cols="12">
            <v-card-subtitle class="text-darkBlue pl-0">
              {{ "Vocal Level " + userLevel }}
            </v-card-subtitle>
            <v-progress-linear
              rounded
              v-model="userLevelPercent"
              color="darkBlue"
              height="10"></v-progress-linear>
          </v-col>
          <v-col cols="12">
            <v-card elevation="0" class="rounded-lg privateInstructorGradient">
              <v-row justify="center" class="pl-5 pt-t pb-0">
                <v-col cols="2" align-self="center">
                  <v-avatar class="bg-darkBlue">
                    <v-img :src="userInstructor.picture"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="10" align-self="center">
                  <v-card-title class="pb-0 font-weight-semi-bold text-h6">
                    {{ userInstructor.title }}
                  </v-card-title>
                  <v-card-subtitle
                    class="text-darkBlue font-weight-bold pb-2 font-weight-bold">
                    {{ userInstructor.name }}
                  </v-card-subtitle>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card
      class="notificationGradient mainBlur notificationsPane rounded-lg overflow-auto pa-3">
      <v-card-title class="text-white font-weight-bold text-h5 pb-4">
        Notifications
      </v-card-title>
      <v-card-text class="pb-0">
        <NotificationItem></NotificationItem>
      </v-card-text>
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
        userId: 2,
        userPicture: "",
        userRole: "",
        userName: "John Doe",
        userTitleOrMajor: "",
        userClassification: "Senior",
        userLevel: 0,
        userLevelPercent: 0,
        userSemestersPercent: 0,
        userSemesters: 8,
        userInstructor: {},
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
        this.userRole = this.userStore.userInfo.role;
        this.userName = this.userStore.getFullName;
        this.userPicture = this.userStore.userInfo.picture;

        if (this.userRole === "student") {
          this.userTitleOrMajor = this.userStore.userRoleInfo.major;
          this.useClassification = this.userStore.userRoleInfo.classification;
          this.userSemesters = this.userStore.userRoleInfo.semesters;
          this.userLevel = this.userStore.userRoleInfo.level;
          this.userInstructor = this.userStore.userRoleInfo.instructor;
          this.setUserLevelPercent(this.userLevel);
          this.setSemestersPercent(this.userSemesters);
        } else if (this.userRole === "faculty") {
          this.userTitleOrMajor = this.userStore.userRoleInfo.title;
        }
      },
      setUserLevelPercent(level) {
        this.userLevelPercent = level * 10;
      },
      setSemestersPercent(semesters) {
        this.userSemestersPercent = semesters * 10;
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
