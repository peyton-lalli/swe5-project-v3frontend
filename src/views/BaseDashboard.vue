<template>
  <v-container fluid class="baseDashboardGrid pl-0">
    <MenuSidebar class="menuBarPane"></MenuSidebar>
    <UserSidebar class="userSidebarPane"></UserSidebar>
    <!-- <StudentHomeDashboard
      v-if="userRole === 'student'"
      class="dashboardSlot"></StudentHomeDashboard> -->
    <FacultyHomeDashboard
      v-if="userRole === 'faculty'"
      class="dashboardSlot"></FacultyHomeDashboard>
    <EventsDashboard
      v-if="userRole === 'student'"
      class="dashboardSlot"></EventsDashboard>
  </v-container>
</template>

<script>
  import MenuSidebar from "../components/MenuSidebar.vue";
  import UserSidebar from "../components/UserSidebar.vue";
  import StudentHomeDashboard from "../components/StudentHomeDashboard.vue";
  import FacultyHomeDashboard from "../components/FacultyHomeDashboard.vue";
  import EventsDashboard from "../components/EventsDashboard.vue";
  import { useLoginStore } from "../stores/LoginStore.js";
  import { mapStores } from "pinia";

  export default {
    name: "BaseDashboard",
    components: {
      MenuSidebar,
      UserSidebar,
      StudentHomeDashboard,
      FacultyHomeDashboard,
      EventsDashboard,
    },
    data() {
      return {
        userRole: "",
      };
    },
    computed: {
      ...mapStores(useLoginStore),
    },
    mounted() {
      this.retrieveInfo();
    },
    methods: {
      retrieveInfo() {
        this.userRole = this.loginStore.loginUser.role;
        console.log(this.userRole);
      },
    },
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
