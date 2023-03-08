<template>
  <v-container fluid class="baseDashboardGrid pl-0">
    <MenuSidebar class="menuBarPane"></MenuSidebar>
    <UserSidebar class="userSidebarPane"></UserSidebar>
    <StudentHomeDashboard
      v-if="
        userDashboard === 'StudentDashboard' &&
        eventsStore.getEventsPageStatus === false
      "
      class="dashboardSlot"></StudentHomeDashboard>
    <FacultyHomeDashboard
      v-if="
        userDashboard === 'FacultyDashboard' &&
        eventsStore.getEventsPageStatus === false
      "
      class="dashboardSlot"></FacultyHomeDashboard>
    <AdminHomeDashboard
      v-if="
        userDashboard === 'AdminDashboard' &&
        eventsStore.getEventsPageStatus === false
      "
      class="dashboardSlot"></AdminHomeDashboard>

    <!-- Leaving commented out for now, until we figure out how to do it right. -->
    <!-- To view, just un comment it, and comment the StudentHomeDashboard out (also have a student role) -->
    <EventsDashboard
      v-if="eventsStore.getEventsPageStatus"
      class="dashboardSlot"></EventsDashboard>
  </v-container>
</template>

<script>
  import MenuSidebar from "../components/MenuSidebar.vue";
  import UserSidebar from "../components/UserSidebar.vue";
  import StudentHomeDashboard from "../components/StudentHomeDashboard.vue";
  import FacultyHomeDashboard from "../components/FacultyHomeDashboard.vue";
  import AdminHomeDashboard from "../components/AdminHomeDashbaord.vue";
  import EventsDashboard from "../components/EventsDashboard.vue";
  import { useEventsStore } from "../stores/EventsStore.js";
  import { useUserStore } from "../stores/UserStore.js";
  import { mapStores } from "pinia";

  export default {
    name: "BaseDashboard",
    components: {
      MenuSidebar,
      UserSidebar,
      StudentHomeDashboard,
      FacultyHomeDashboard,
      AdminHomeDashboard,
      EventsDashboard,
    },
    data() {
      return {
        userRole: "",
        userDashboard: "",
      };
    },
    computed: {
      ...mapStores(useEventsStore, useUserStore),
    },
    async mounted() {
      this.retrieveInfo();
      // await this.eventsStore.setEvents();
      this.setUserDashboard();
    },
    methods: {
      async retrieveInfo() {
        this.userRole = this.userStore.userInfo.role;
      },
      setUserDashboard() {
        if (this.userRole === "student") {
          this.userDashboard = "StudentDashboard";
        } else if (this.userRole === "faculty") {
          this.userDashboard = "FacultyDashboard";
        } else if (this.userRole === "admin") {
          this.userDashboard = "AdminDashboard";
        }
      },
    },
  };
</script>

<style scoped>
  .baseDashboardGrid {
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
