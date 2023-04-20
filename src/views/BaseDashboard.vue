<template>
  <v-container fluid class="baseDashboardGrid pl-0">
    <MenuSidebar class="menuBarPane"></MenuSidebar>
    <UserSidebar class="userSidebarPane"></UserSidebar>
    <StudentHomeDashboard
      v-if="
        userDashboard === 'StudentDashboard' &&
        this.$route.fullPath != '/events'
      "
      class="dashboardSlot"></StudentHomeDashboard>
    <FacultyHomeDashboard
      v-if="
        userDashboard === 'FacultyDashboard' &&
        this.$route.fullPath != '/events'
      "
      class="dashboardSlot"></FacultyHomeDashboard>
    <AccompanistHomeDashboard
      v-if="
        userDashboard === 'AccompanistDashboard' &&
        this.$route.fullPath != '/events'
      "
      class="dashboardSlot"></AccompanistHomeDashboard>
    <AdminHomeDashboard
      v-if="
        userDashboard === 'AdminDashboard' && this.$route.fullPath != '/events'
      "
      class="dashboardSlot"></AdminHomeDashboard>

    <EventsDashboard
      v-if="this.$route.fullPath === '/events'"
      class="dashboardSlot"></EventsDashboard>
  </v-container>
</template>

<script>
  import MenuSidebar from "../components/MenuSidebar.vue";
  import UserSidebar from "../components/UserSidebar.vue";
  import StudentHomeDashboard from "../components/Student/StudentHomeDashboard.vue";
  import FacultyHomeDashboard from "../components/Faculty/FacultyHomeDashboard.vue";
  import AccompanistHomeDashboard from "../components/Accompanist/AccompanistHomeDashboard.vue";
  import AdminHomeDashboard from "../components/Admin/AdminHomeDashbaord.vue";
  import EventsDashboard from "../components/Events/EventsDashboard.vue";
  import { useUserStore } from "../stores/UserStore.js";
  import { mapStores } from "pinia";

  export default {
    name: "BaseDashboard",
    components: {
      MenuSidebar,
      UserSidebar,
      StudentHomeDashboard,
      FacultyHomeDashboard,
      AccompanistHomeDashboard,
      AdminHomeDashboard,
      EventsDashboard,
    },
    data() {
      return {
        userDefaultRole: "",
        userDashboard: "",
      };
    },
    computed: {
      ...mapStores(useUserStore),
    },
    async mounted() {
      this.retrieveInfo();
      this.setUserDashboard();
    },
    methods: {
      async retrieveInfo() {
        this.userDefaultRole = this.userStore.userInfo.roles.default;
      },
      setUserDashboard() {
        if (this.userDefaultRole.roleId === 1) {
          this.userDashboard = "StudentDashboard";
        } else if (this.userDefaultRole.roleId === 2) {
          this.userDashboard = "FacultyDashboard";
        } else if (this.userDefaultRole.roleId === 3) {
          this.userDashboard = "AdminDashboard";
        } else if (this.userDefaultRole.roleId === 4) {
          this.userDashboard = "AccompanistDashboard";
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
