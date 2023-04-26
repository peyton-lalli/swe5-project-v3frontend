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
            Edit {{ userData.fName }} {{ userData.lName }}
          </v-card-title>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-title>
    <v-card-text
      v-if="!this.isStudent && this.roles.includes('Student')"
      class="pa-0">
      <v-card-text
        class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
        Role
      </v-card-text>
      <v-select
        v-model="roles"
        class="lighterBlur"
        :items="roleItems"
        return-object
        multiple>
      </v-select>

      <v-card-text
        class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
        Level
      </v-card-text>
      <v-text-field v-model="this.level"></v-text-field>

      <v-card-text
        class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
        Semester
      </v-card-text>
      <v-text-field v-model="this.semester"></v-text-field>

      <v-card-text
        class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
        Major
      </v-card-text>
      <v-text-field v-model="this.major"></v-text-field>
    </v-card-text>

    <v-card-text
      v-if="this.isStudent && this.roles.includes('Student')"
      class="pa-2 pt-0">
      <v-card-text
        class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1 pt-0">
        Level
      </v-card-text>
      <v-text-field v-model="this.level"></v-text-field>

      <v-card-text
        class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
        Semester
      </v-card-text>
      <v-text-field v-model="this.semester"></v-text-field>

      <v-card-text
        class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
        Major
      </v-card-text>
      <v-text-field v-model="this.major"></v-text-field>

      <v-card-text
        class="text-body-2 font-weight-semi-bold text-mediumBlue pl-0 pb-1">
        Classification
      </v-card-text>
      <v-select
        v-model="classification"
        class="text-darkGray"
        :items="classificationTypes"
        return-object>
      </v-select>
    </v-card-text>
    <v-card-actions class="ml-auto pa-0 pr-1">
      <v-btn
        elevation="0"
        class="text-none buttonCancel ml-auto text-white font-weight-bold buttonBorder"
        @click="closeEditSingleUserDialog()">
        Cancel
      </v-btn>
      <v-btn
        elevation="0"
        class="text-none buttonGradient ml-3 text-white font-weight-bold buttonBorder"
        @click="closeAndSaveEditSingleUserDialog()">
        Save
      </v-btn>
    </v-card-actions>
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
