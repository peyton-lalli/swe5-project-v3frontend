<template>
  <v-container fluid class="facultyDashboardGrid pl-0">
    <MenuSidebar class="menuBarPane"></MenuSidebar>
    <FacultySidebar class="facultySidebarPane"></FacultySidebar>
    <FacultyHomeDashboard class="dashboardSlot"></FacultyHomeDashboard>
  </v-container>
</template>

<script>
import MenuSidebar from "../components/MenuSidebar.vue";
import FacultySidebar from "../components/FacultySidebar.vue";
import FacultyHomeDashboard from "../components/FacultyHomeDashboard.vue";

export default {
  name: "FacultyDashboard",
  components: { MenuSidebar, FacultySidebar, FacultyHomeDashboard },
  data() {},
  mounted() {
    //this.testing();
  },
  methods: {
    //testing() {},
  },
};
</script>

<style scoped>
.facultyDashboardGrid {
  /* padding: 15px !important; */
  display: grid;
  grid-template-columns: 0.5fr 2fr 8fr;
  grid-template-rows: 1fr;
  grid-template-areas: "menuBarPane userSidebarPane dashboardSlot";
  grid-gap: 1.5rem;
}

.menuBarPane {
  grid-area: menuBarPane;
}

.facultySidebarPane {
  grid-area: userSidebarPane;
}

.dashboardSlot {
  grid-area: dashboardSlot;
}
</style>
