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
  import EventsDashboard from "../components/EventsDashboard.vue";
  import { useLoginStore } from "../stores/LoginStore.js";
  import { useEventsStore } from "../stores/EventsStore.js";
  import { useStudentRepertoireStore } from "../stores/StudentRepertoireStore.js";
  import { useStudentInfoStore } from "../stores/StudentInfoStore.js";
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
        userDashboard: "",
      };
    },
    computed: {
      ...mapStores(
        useLoginStore,
        useEventsStore,
        useStudentRepertoireStore,
        useStudentInfoStore
      ),
    },
    mounted() {
      this.retrieveInfo();
      this.setUserDashboard();
    },
    methods: {
      async retrieveInfo() {
        this.userRole = this.loginStore.loginUser.role;
        await this.studentInfoStore.setStudentInfo(
          this.loginStore.loginUser.userId
        );
        await this.studentRepertoireStore.setRepertoire(
          this.studentInfoStore.studentInfo.id
        );
      },
      setUserDashboard() {
        if (this.userRole === "student") {
          this.userDashboard = "StudentDashboard";
        } else if (this.userRole === "faculty") {
          this.userDashboard = "FacultyDashboard";
        }
        // else if(this.userRole === 'admin') {
        //   this.userDashboard = 'AdminDashboard';
        // }
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
