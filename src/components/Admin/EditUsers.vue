<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold">Edit Users</v-col>
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeEditUsersDialog()">
            <v-icon>
              <font-awesome-icon
                icon="a-solid fa-circle-xmark"
                class="text-lightBlue">
              </font-awesome-icon>
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-text-field
          class="ml-6 mr-6"
          autofocus
          v-model="input"
          append-icon="mdi-magnify"
          placeholder="Search"
          single-line
          hide-details></v-text-field>
      </v-row>
      <v-row v-for="user in this.filteredList()">
        <AdminUserComponent :userData="user" />
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
