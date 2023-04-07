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
        :items="roleItems"
        variant="solo"
        return-object
        multiple>
      </v-select>
    </v-card-subtitle>

    <v-card-subtitle v-if="!this.isStudent && this.roles.includes('Student')">
      Level
      <v-text-field v-model="this.level"></v-text-field>
      Semester
      <v-text-field v-model="this.semester"></v-text-field>
      Major
      <v-text-field v-model="this.major"></v-text-field>
    </v-card-subtitle>
    <v-card-subtitle v-if="this.isStudent && this.roles.includes('Student')">
      Level
      <v-text-field v-model="this.level"></v-text-field>
      Semester
      <v-text-field v-model="this.semester"></v-text-field>
      Major
      <v-text-field v-model="this.major"></v-text-field>
      Classification
      <v-select
        v-model="classification"
        bg-color="lightBlue"
        class="text-blue"
        :items="classificationTypes"
        variant="solo"
        return-object>
      </v-select>
    </v-card-subtitle>
    <v-card-text class="text-center">
      <v-btn
        rounded="pill"
        class="buttonGradient text-white mr-3"
        @click="closeAndSaveEditSingleUserDialog()">
        Save
      </v-btn>
      <v-btn
        rounded="pill"
        color="#DA9B9B"
        class="text-white mr-3"
        @click="closeEditSingleUserDialog()">
        Cancel
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  import { useUserStore } from "../../stores/UserStore.js";
  import { mapStores } from "pinia";
  export default {
    data() {
      return {
        roles: [],
        startingRoles: [],
        roleItems: ["Student", "Faculty", "Admin", "Accompanist"],
        classificationTypes: [
          "Freshman",
          "Sophomore",
          "Junior",
          "Senior",
          "Graduate",
        ],
        level: "",
        semester: "",
        major: "",
        classification: "",
        isStudent: false,
      };
    },
    created() {
      this.setRoles();
      this.setVariables();
    },
    methods: {
      closeAndSaveEditSingleUserDialog() {
        if (
          this.userData.level !== this.level ||
          this.userData.semesters !== this.semester ||
          this.userData.major !== this.major
        ) {
          if (this.roles.includes("Student")) {
            let studentData = {
              level: this.level,
              major: this.major,
              semesters: this.semester,
              updatedAt: new Date(),
              classification: this.classification,
            };
            this.userStore.updateUserInfo(
              studentData,
              "Student",
              this.userData.studentId
            );
          }
        }
        if (this.startingRoles !== this.roles) {
          for (let role of this.userData.roles) {
            this.userStore.removeRole(role.id);
          }
          for (let role of this.roles) {
            if (role === "Student") {
              this.userStore.createRole({
                roleId: 1,
                userId: this.userData.id,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            } else if (role === "Faculty") {
              this.userStore.createRole({
                roleId: 2,
                userId: this.userData.id,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            } else if (role === "Admin") {
              this.userStore.createRole({
                roleId: 3,
                userId: this.userData.id,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            } else if (role === "Accompanist") {
              this.userStore.createRole({
                roleId: 4,
                userId: this.userData.id,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            }
          }
        }
        this.$emit("closeEditSingleUserDialogEvent");
      },
      closeEditSingleUserDialog() {
        this.$emit("closeEditSingleUserDialogEvent");
      },
      setRoles() {
        for (let role of this.userData.roles) {
          if (role.roleId === 1) {
            this.roles.push(this.roleItems[0]);
            this.startingRoles.push(this.roleItems[0]);
            this.isStudent = true;
          }
          if (role.roleId === 2) {
            this.roles.push(this.roleItems[1]);
            this.startingRoles.push(this.roleItems[1]);
          }
          if (role.roleId === 3) {
            this.roles.push(this.roleItems[2]);
            this.startingRoles.push(this.roleItems[2]);
          }
          if (role.roleId === 4) {
            this.roles.push(this.roleItems[3]);
            this.startingRoles.push(this.roleItems[3]);
          }
        }
      },
      setVariables() {
        this.level = this.userData.level;
        this.semester = this.userData.semesters;
        this.major = this.userData.major;
        this.classification = this.userData.classification;
      },
    },
    computed: {
      ...mapStores(useUserStore),
    },
    props: {
      userData: {},
    },
  };
</script>
