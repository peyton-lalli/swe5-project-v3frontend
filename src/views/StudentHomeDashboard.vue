<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <v-col>
        <v-row class="fill-height">
          <v-col cols="1" class="bg-white"></v-col>
          <v-col cols="3" class="bg-black">
            <UserSidebar></UserSidebar>
          </v-col>
          <v-col cols="8">
            <v-row class="fill-height">
              <v-col cols="8" class="bg-yellow">
                <v-row class="fill-height">
                  <v-col cols="12" class="bg-blue"> </v-col>
                  <v-col cols="12" class="bg-purple"> </v-col>
                </v-row>
              </v-col>
              <v-col cols="4" class="bg-red"> </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // import NotificationItem from "./NotificationItem.vue";
  import UserSidebar from "../components/ UserSidebar.vue";
  export default {
    name: "StudentHomeDashboard",
    components: { UserSidebar },
    data() {},
  };
</script>

<style scoped>
  * {
    padding: 0 !important;
    margin: 0 !important;
  }
</style>
