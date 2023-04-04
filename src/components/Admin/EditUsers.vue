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
      <v-row v-for="user in users">
        <AdminUserComponent :userData="user" />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import EditSingleUser from "./EditSingleUser.vue";
  import AdminUserComponent from "./AdminUserComponent.vue";
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "EditUsers",
    components: {
      EditSingleUser,
      AdminUserComponent,
    },
    data() {
      return {
        users: [],
      };
    },
    methods: {
      closeEditUsersDialog() {
        this.$emit("closeEditUsersDialogEvent");
      },
    },
    computed: {
      ...mapStores(useUserStore),
    },
    async mounted() {
      this.users = this.userStore.userRoleInfo.users;
      console.log(this.users[0]);
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
