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
        <v-col>
          <v-card
            class="repertoireItemGradient fullBorderCurve mainblur ml-3 mr-3 pl-4 pr-4 mb-2">
            <v-row>
              <v-col cols="1" align-self="center">
                <v-avatar class="bg-darkBlue">
                  <v-img :src="user.picture"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="7" align-self="center">
                <v-card-title class="pb-0 font-weight-bold">
                  {{ user.lName }}, {{ user.fName }} -
                  {{ user.role.toUpperCase() }}
                </v-card-title>
                <v-card-subtitle class="text-darkBlue font-weight-medium pb-2">
                  {{ user.email }}
                </v-card-subtitle>
              </v-col>
              <v-col
                cols="4"
                align-self="center"
                class="text-right pr-7 pl-7"
                v-if="user.role != 'student'">
                <v-row>
                  <v-col>
                    <v-btn
                      elevation="0"
                      size="small"
                      rounded="pill"
                      class="buttonWhite text-mediumBlue font-weight-bold">
                      Edit
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      elevation="0"
                      size="small"
                      rounded="pill"
                      class="buttonWhite text-mediumBlue font-weight-bold">
                      Disable
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="4"
                align-self="center"
                class="text-right pr-7 pl-7"
                v-if="user.role == 'student'">
                <v-btn
                  elevation="0"
                  size="small"
                  rounded="pill"
                  class="buttonWhite text-mediumBlue font-weight-bold">
                  Edit
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "EditUsers",
    components: {},
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
      this.users = await this.userStore.getAllUsers();
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
