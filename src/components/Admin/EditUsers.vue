<template>
  <v-card class="fullBorderCurve pa-4">
    <v-card-title class="font-weight-bold text-darkBlue mb-6">
      <v-row>
        <v-col cols="auto" class="pa-0 pt-1">
          <v-avatar class="pr-0">
            <v-icon>
              <font-awesome-icon
                icon="fa-solid fa-user"
                class="text-darkBlue" />
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="auto" class="text-h5 font-weight-bold pa-0">
          <v-card-title class="font-weight-bold text-h5 pl-2">
            Edit Users
          </v-card-title>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-title>
    <v-card-text class="pa-2 pt-0">
      <v-row class="pb-2">
        <v-col class="px-4">
          <v-text-field
            autofocus
            v-model="input"
            append-icon="mdi-magnify"
            placeholder="Search"
            single-line
            hide-details></v-text-field>
        </v-col>
      </v-row>
      <v-row v-for="user in this.filteredList()">
        <v-col class="pb-2">
          <AdminUserComponent :userData="user" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import AdminUserComponent from "./AdminUserComponent.vue";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  import { ref } from "vue";
  export default {
    name: "EditUsers",
    components: {
      AdminUserComponent,
    },
    data() {
      return {
        users: [],
        input: ref(""),
      };
    },
    methods: {
      filteredList() {
        return this.users.filter(
          (user) =>
            user.fName.toLowerCase().includes(this.input.toLowerCase()) ||
            user.lName.toLowerCase().includes(this.input.toLowerCase())
        );
      },
      closeEditUsersDialog() {
        this.$emit("closeEditUsersDialogEvent");
      },
    },
    computed: {
      ...mapStores(useUserStore),
    },
    async mounted() {
      this.users = this.userStore.userRoleInfo.users;
      this.users.sort(function (a, b) {
        // Extract the last name from the "last_name" column of each result
        var lastNameA = a.lName.toUpperCase();
        var lastNameB = b.lName.toUpperCase();

        // Compare the last names alphabetically
        if (lastNameA < lastNameB) {
          return -1;
        }
        if (lastNameA > lastNameB) {
          return 1;
        }

        // If the last names are equal, sort by first name instead
        var firstNameA = a.fName.toUpperCase();
        var firstNameB = b.fName.toUpperCase();
        if (firstNameA < firstNameB) {
          return -1;
        }
        if (firstNameA > firstNameB) {
          return 1;
        }

        // If the first names are also equal, return 0 (no sorting needed)
        return 0;
      });
    },
  };
</script>

<style></style>
