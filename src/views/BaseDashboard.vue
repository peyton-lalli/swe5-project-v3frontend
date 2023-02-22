<template>
  <v-container fluid class="baseDashboardGrid pl-0">
    <MenuSidebar class="menuBarPane"></MenuSidebar>
    <UserSidebar class="userSidebarPane"></UserSidebar>
    <StudentHomeDashboard class="dashboardSlot"></StudentHomeDashboard>
  </v-container>
</template>

<script>
  import MenuSidebar from "../components/MenuSidebar.vue";
  import UserSidebar from "../components/UserSidebar.vue";
  import StudentHomeDashboard from "../components/StudentHomeDashboard.vue";
  export default {
    name: "BaseDashboard",
    components: { MenuSidebar, UserSidebar, StudentHomeDashboard },
    data() {},
  };
</script>

<style scoped>
  .baseDashboardGrid {
    /* padding: 15px !important; */
    display: grid;
    grid-template-columns: 0.5fr 2fr 8fr;
    grid-template-rows: minmax(auto, 1fr);
    grid-template-areas: "menuBarPane userSidebarPane dashboardSlot";
    grid-gap: 1.5rem;
  }

  .menuBarPane {
    grid-area: menuBarPane;
  }

  .userSidebarPane {
    grid-area: userSidebarPane;
  }

  .dashboardSlot {
    grid-area: dashboardSlot;
  }
</style>
