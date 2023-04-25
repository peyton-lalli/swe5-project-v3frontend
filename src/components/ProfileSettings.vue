<template>
  <v-card class="fullBorderCurve pa-4">
    <v-card-title class="font-weight-bold text-darkBlue mb-6">
      <v-row>
        <v-col cols="auto" class="pa-0 pt-1">
          <v-avatar class="pr-0">
            <v-icon>
              <font-awesome-icon
                icon="fa-solid fa-gear"
                class="text-darkBlue" />
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="auto" class="text-h5 font-weight-bold pa-0">
          <v-card-title class="font-weight-bold text-h5 pl-2"
            >Settings</v-card-title
          >
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-title>
    <v-card-text class="mx-auto">
      <v-avatar class="bg-darkBlue" size="148">
        <v-img :src="userPictureLink"></v-img>
      </v-avatar>
    </v-card-text>

    <v-card-title
      class="mx-auto font-weight-black text-darkGray text-h4 text-uppercase">
      {{ userName }}
    </v-card-title>

    <v-card-subtitle class="mx-auto text-mediumBlue">
      {{ userEmail }}</v-card-subtitle
    >

    <v-card-text v-if="userRole === 1" class="px-1">
      <v-card-subtitle class="pl-0 pb-1 font-weight-semi-bold text-mediumBlue">
        Major
      </v-card-subtitle>
      <v-text-field
        class="mb-4 font-weight-semi-bold text-darkGray"
        v-model="userMajor"></v-text-field>

      <v-card-subtitle class="pl-0 pb-1 font-weight-semi-bold text-mediumBlue">
        Classification
      </v-card-subtitle>
      <v-select
        class="mb-4 font-weight-semi-bold text-darkGray"
        v-model="userClassification"
        :items="[
          'Freshman',
          'Sophomore',
          'Junior',
          'Senior',
          'Graduate',
        ]"></v-select>

      <v-card-subtitle class="pl-0 pb-1 font-weight-semi-bold text-mediumBlue">
        Semesters
      </v-card-subtitle>

      <v-text-field
        type="number"
        v-model="userSemesters"
        class="font-weight-semi-bold text-darkGray"></v-text-field>
    </v-card-text>

    <v-card-text v-if="userRole === 2 || userRole === 3">
      <v-card-subtitle class="pl-0 pb-1 font-weight-semi-bold text-mediumBlue">
        Title
      </v-card-subtitle>
      <v-text-field
        clear-icon="font-weight-semi-bold text-darkGray"
        v-model="userTitle"></v-text-field>
    </v-card-text>

    <v-card-actions class="px-1 pb-0">
      <v-btn
        rounded="lg"
        elevation="0"
        class="text-none buttonCancel ml-auto mr-3 text-white font-weight-bold"
        @click="closeDialog()">
        Cancel
      </v-btn>
      <v-btn
        rounded="lg"
        elevation="0"
        class="text-none buttonGradient text-white font-weight-bold"
        @click="saveUserInfo()">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
  .noDropShadow {
    box-shadow: none !important;
  }
</style>

<script>
  import { mapStores } from "pinia";
  import { useUserStore } from "../stores/UserStore.js";

  export default {
    name: "ProfileSettings",
    components: {},
    data() {
      return {
        userRole: "",
        userPictureLink: "",
        userName: "",
        userEmail: "",
        userMajor: "",
        userTitle: "",
        userClassification: "",
        userSemesters: null,
      };
    },
    computed: {
      ...mapStores(useUserStore),
    },
    mounted() {
      this.retrieveInfo();
    },
    methods: {
      retrieveInfo() {
        this.userRole = this.userStore.userInfo.roles.default.roleId;
        this.userName = this.userStore.getFullName;
        this.userEmail = this.userStore.userInfo.email;
        this.userPictureLink = this.userStore.userInfo.picture;

        if (this.userRole === 1) {
          this.userMajor = this.userStore.userRoleInfo.major;
          this.userClassification = this.userStore.userRoleInfo.classification;
          this.userSemesters = this.userStore.userRoleInfo.semesters;
        } else if (this.userRole === 2) {
          this.userTitle = this.userStore.userRoleInfo.title;
        }
      },
      closeDialog() {
        let mainPage = this.$route.fullPath.split("/")[1];
        this.$router.push({ path: "/" + mainPage });
      },
      saveUserInfo() {
        if (this.userStore.userInfo.roles.default.roleId === 1) {
          let user = {
            major: this.userMajor,
            classification: this.userClassification,
            semesters: this.userSemesters,
          };
          this.userStore.updateUserInfo(
            user,
            this.userStore.userRoleInfo.studentId
          );
        }
        this.closeDialog();
      },
    },
  };
</script>

<style scoped>
  * {
    font-family: Inter, sans-serif !important;
  }
  .v-card-subtitle {
    opacity: 100%;
  }
</style>
