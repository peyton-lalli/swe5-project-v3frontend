<template>
  <v-container fluid class="sidebarGrid">
    <v-card class="userProfilePane mainBlur rounded-lg pa-3">
      <v-card-title class="pt-4">
        <v-avatar size="68" class="bg-darkBlue">
          <v-img :src="userPicture"></v-img>
        </v-avatar>
      </v-card-title>
      <v-card-title class="text-h5 fontWeightBlackOverride text-darkGray pb-0">
        {{ userName.toUpperCase() }}
      </v-card-title>
      <v-card-subtitle class="font-weight-medium text-darkBlue">
        {{ userTitleOrMajor }}
      </v-card-subtitle>
      <v-card-subtitle
        v-if="userRole === 'student'"
        class="font-weight-medium text-mediumBlue">
        {{ userClassification }}
      </v-card-subtitle>
      <v-card-text v-if="userRole === 'student'">
        <v-row>
          <v-col cols="12">
            <v-progress-linear
              rounded
              v-model="userLevelPercent"
              color="darkBlue"
              height="10"></v-progress-linear>
          </v-col>
          <v-col cols="12">
            <v-progress-linear
              rounded
              v-model="userSemestersPercent"
              color="darkBlue"
              height="10"></v-progress-linear>
          </v-col>
          <v-col cols="12">
            <v-card elevation="0" class="rounded-lg privateInstructorGradient">
              <v-row justify="center" class="pl-5 pt-t pb-0">
                <v-col cols="2" align-self="center">
                  <v-avatar class="bg-darkBlue">
                    <v-img :src="userInstructor.picture"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="10" align-self="center">
                  <v-card-title class="pb-0 font-weight-semi-bold text-h6">
                    {{ userInstructor.title }}
                  </v-card-title>
                  <v-card-subtitle class="text-darkBlue font-weight-bold pb-2">
                    <!-- This will eventually be a store call passing the userInstuctor value -->
                    {{ userInstructor.name }}
                  </v-card-subtitle>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card
      class="notificationGradient mainBlur notificationsPane rounded-lg overflow-auto pa-3">
      <v-card-title class="text-white font-weight-bold text-h5 pb-4">
        Notifications
      </v-card-title>
      <v-card-text class="pb-0">
        <NotificationItem></NotificationItem>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import NotificationItem from "./NotificationItem.vue";
  import InstructorsDataService from "../services/instructors.js";
  import StudentInfoDataService from "../services/studentinfo.js";
  import UsersDataService from "../services/users.js";
  //Remove later!
  import { useStudentInfoStore } from "../stores/StudentInfoStore.js";
  import { useLoginStore } from "../stores/LoginStore.js";
  import { mapStores } from "pinia";
  export default {
    name: "UserSidebar",
    components: { NotificationItem },
    data() {
      return {
        userId: 2,
        userPicture: "",
        userRole: "",
        userName: "John Doe",
        userTitleOrMajor: "",
        userClassification: "Senior",
        userLevel: 0,
        userLevelPercent: 0,
        userSemestersPercent: 0,
        userSemesters: 8,
        userInstructor: {
          id: 0,
          picture: "",
          name: "",
          title: "",
        },
      };
    },
    computed: {
      ...mapStores(useLoginStore, useStudentInfoStore),
    },
    mounted() {
      this.retrieveInfo();
    },
    methods: {
      retrieveInfo() {
        this.userRole = this.loginStore.loginUser.role;
        this.userName = this.loginStore.getFullName;
        this.userPicture = this.loginStore.getPicture;
        if (this.userRole === "student") {
          StudentInfoDataService.getUserId(this.loginStore.loginUser.userId)
            .then((response) => {
              const student = response.data.StudentInfo[0];
              console.log(student);
              this.userTitleOrMajor = student.major + " Major";
              this.userClassification = student.classification;
              this.userSemesters = student.semesters;
              this.userLevel = student.level;
              this.setUserLevelPercent(this.userLevel);
              this.setSemestersPercent(this.userSemesters);
              this.getInstructorData(student.instructorId);
            })
            .catch((e) => {
              console.log(e);
            });
        } else if (this.userRole === "faculty") {
          InstructorsDataService.getSingle(this.loginStore.loginUser.userId)
            .then((response) => {
              this.userTitleOrMajor = response.data.Instructors[0].title;
            })
            .catch((e) => {
              console.log(e);
            });
        }
      },
      setUserLevelPercent(level) {
        this.userLevelPercent = level * 10;
      },
      setSemestersPercent(semesters) {
        this.userSemestersPercent = semesters * 10;
      },
      getInstructorData(instructorId) {
        InstructorsDataService.getInstructorByInstructorId(instructorId)
          .then((response) => {
            const instructor = response.data.Instructors[0];
            this.userInstructor.title = instructor.title;
            UsersDataService.getSingle(instructor.userId).then((response) => {
              const user = response.data.Users[0];
              this.userInstructor.name = user.fName + " " + user.lName;
              this.userInstructor.picture = user.picture;
              //Remove Later!!
              this.studentInfoStore.setPic(user.picture);
              this.userInstructor.id = user.id;
            });
          })
          .catch((e) => {
            console.log(e);
          });
      },
    },
  };
</script>

<style scoped>
  * {
    font-family: Inter, sans-serif !important;
  }
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }

  .scroll {
    overflow-y: scroll !important;
  }

  .fontWeightBlackOverride {
    font-weight: 900 !important;
  }

  .sidebarGrid {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto minmax(auto, 3fr);
    grid-template-areas:
      "userProfilePane"
      "notificationsPane";
    grid-gap: 1.5rem;
    padding-left: 0;
    padding-right: 0;
  }
  .userProfilePane {
    grid-area: userProfilePane;
  }

  .notificationsPane {
    grid-area: notificationsPane;
  }
</style>
