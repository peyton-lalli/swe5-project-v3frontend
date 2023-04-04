<template>
  <v-card>
    <v-card-title class="font-weight-bold text-darkBlue">
      <v-row>
        <v-col class="text-h5 font-weight-bold"
          >Edit {{ userData.fName }} {{ userData.lName }}
        </v-col>
        <v-col class="text-right">
          <v-btn elevation="0" @click="closeEditSingleUserDialog()">
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
    <v-card-subtitle>
      Role
      <v-select
        v-model="roles"
        bg-color="lightBlue"
        class="text-blue"
        :items="['Student', 'Faculty', 'Accompanist', 'Admin']"
        variant="solo"
        multiple>
      </v-select>
    </v-card-subtitle>
    <v-card-subtitle v-if="userData.roleId === 1">
      Level
      <v-text-field></v-text-field>
      Semester
      <v-text-field></v-text-field>
    </v-card-subtitle>
    <v-card-text class="text-center">
      <v-btn
        rounded="pill"
        class="buttonGradient text-white mr-3"
        @click="closeSendEmailDialog()">
        Send
      </v-btn>
      <v-btn
        rounded="pill"
        color="#DA9B9B"
        class="text-white mr-3"
        @click="closeSendEmailDialog()">
        Cancel
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        roles: [],
      };
    },
    methods: {
      closeEditSingleUserDialog() {
        this.$emit("closeEditSingleUserDialogEvent");
      },
      getRoleFromNumber(role) {
        if (role === 1) {
          return "Student";
        } else if (role === 2) {
          return "Faculty";
        } else if (role === 3) {
          return "Admin";
        }
      },
    },
    created: {
      setRoles() {
        console.log("Setting Roles");
        if (this.userData.roleId === 1) {
          this.roles.push("Student");
        } else if (this.userData.roleId === 2) {
          this.roles.push("Faculty");
        } else if (this.userData.roleId === 3) {
          this.roles.push("Admin");
        }
      },
    },
    props: {
      userData: {},
    },
  };
</script>
