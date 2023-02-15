<template>
  <v-app>
    <v-main>
      <!-- <StudentHomeDashboard></StudentHomeDashboard> -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  // import StudentHomeDashboard from "./views/StudentHomeDashboard.vue";

  export default {
    name: "App",
    components: {},
    data: () => ({
      //
    }),
  };
</script>
