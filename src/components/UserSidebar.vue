<template>
  <v-container fluid class="sidebarGrid">
    <v-card class="userProfilePane mainBlur rounded-lg">
      <v-card-title class="pt-4">
        <v-avatar size="56" class="bg-darkBlue">
          <font-awesome-icon icon="fa-solid fa-user" class="text-white" />
        </v-avatar>
      </v-card-title>
      <v-card-title class="font-weight-black text-darkGray">
        {{ userName.toUpperCase() }}
      </v-card-title>
      <v-card-subtitle class="font-weight-bold text-darkBlue">
        {{ userMajor }} Major
      </v-card-subtitle>
      <v-card-subtitle class="font-weight-medium text-mediumBlue">
        {{ userClassification }}
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-progress-linear
              rounded
              v-model="userVocalLevel"
              color="darkBlue"
              height="10"></v-progress-linear>
          </v-col>
          <v-col cols="12">
            <v-progress-linear
              rounded
              v-model="userSemesters"
              color="darkBlue"
              height="10"></v-progress-linear>
          </v-col>
          <v-col cols="12">
            <v-card class="mainBlur bottomRightBorderDeepCurve">
              <v-row justify="center" class="pl-5 pt-t pb-0">
                <v-col cols="2" align-self="center">
                  <v-avatar class="bg-darkBlue">
                    <font-awesome-icon
                      icon="fa-solid fa-user"
                      class="text-white" />
                  </v-avatar>
                </v-col>
                <v-col cols="10" align-self="center">
                  <v-card-title class="pb-0 font-weight-bold">
                    Private Instructor
                  </v-card-title>
                  <v-card-subtitle class="text-darkBlue font-weight-bold pb-2">
                    <!-- This will eventually be a store call passing the userInstuctor value -->
                    Jane Doe
                  </v-card-subtitle>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card
      class="notificationGradient mainBlur notificationsPane rounded-lg overflow-auto">
      <v-card-title class="text-white font-weight-black">
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
  export default {
    name: "UserSidebar",
    components: { NotificationItem },
    data() {
      return {
        userId: 2,
        userName: "John Doe",
        userMajor: "Vocal Music",
        userClassification: "Senior",
        userVocalLevel: 60,
        userSemesters: 80,
        userInstructor: 1,
      };
    },
  };
</script>

<style scoped>
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }

  .scroll {
    overflow-y: scroll !important;
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
