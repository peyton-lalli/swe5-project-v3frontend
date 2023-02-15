<template>
  <v-row class="fill-height">
    <v-col cols="12">
      <v-card class="">
        <v-card-title>
          {{ userName.toUpperCase() }}
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="12"> </v-col>
  </v-row>
</template>

<script>
  // import NotificationItem from "./NotificationItem.vue";
  export default {
    name: "UserSidebar",
    components: {},
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
