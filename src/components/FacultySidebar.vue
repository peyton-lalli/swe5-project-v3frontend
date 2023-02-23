<template>
  <v-container fluid class="sidebarGrid">
    <v-card class="userProfilePane mainBlur rounded-lg">
      <v-card-title class="pt-4">
        <v-avatar size="56" class="bg-darkBlue">
          <v-img :src="loginStore.getPicture"></v-img>
        </v-avatar>
      </v-card-title>
      <v-card-title class="font-weight-black text-darkGray">
        {{ facultyName.toUpperCase() }}
        <!-- {{ loginStore.getFullName.toUpperCase() }} -->
      </v-card-title>
      <v-card-subtitle class="font-weight-bold text-darkBlue">
        {{ facultyTitle }}
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12"> </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card
      class="notificationGradient mainBlur notificationsPane rounded-lg overflow-auto"
    >
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
import InstructorsDataService from "../services/instructors.js";
import { useLoginStore } from "../stores/LoginStore.js";
import { mapStores } from "pinia";

export default {
  name: "FacultySidebar",
  components: { NotificationItem },
  data() {
    return {
      facultyName: "LOADING...",
      facultyTitle: "LOADING...",
    };
  },
  computed: {
    ...mapStores(useLoginStore, ["loginStore"]),
  },
  mounted() {
    this.retrieveInfo();
    //this.testing();
  },
  methods: {
    //testing() {},
    retrieveInfo() {
      this.facultyName = this.loginStore.getFullName;
      InstructorsDataService.getSingle(this.loginStore.loginUser.userId)
        .then((response) => {
          this.facultyTitle = response.data.Instructors[0].title;
        })
        .catch((e) => {
          console.log(e);
        });
    },
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
