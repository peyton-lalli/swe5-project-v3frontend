<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <v-col>
        <v-row class="fill-height">
          <v-col cols="1" class="bg-white">
            <MenuSidebar></MenuSidebar>
          </v-col>
          <v-col cols="3" class="bg-black">
            <UserSidebar></UserSidebar>
          </v-col>
          <!-- This will eventually be a v-slot that will change based on the LoginUser's roles -->
          <!-- For now, just add whatever dashboard is being worked on and comment out the other -->
          <v-col cols="8">
            <StudentHomeDashboard></StudentHomeDashboard>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import MenuSidebar from "../components/MenuSidebar.vue";
  import UserSidebar from "../components/ UserSidebar.vue";
  import StudentHomeDashboard from "../components/StudentHomeDashboard.vue";
  export default {
    name: "BaseDashboard",
    components: { MenuSidebar, UserSidebar, StudentHomeDashboard },
    data() {},
  };
</script>

<style scoped>
  * {
    padding: 0 !important;
    margin: 0 !important;
  }
</style>
