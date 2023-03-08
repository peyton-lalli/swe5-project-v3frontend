<template>
  <v-container fluid class="studentComponent">
    <v-card
      elevation="12"
      class="fullBorderCurve mb-4"
      v-for="students in this.students">
      <v-card-text class="pt-0">
        <v-row justify="left" class="mt-0 flex-nowrap">
          <v-col cols="1" align-self="center">
            <v-avatar class="bg-darkBlue">
              <v-img :src="students.picture"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <v-card-title class="pb-0 font-weight-bold">
              {{ students.fName + " " + students.lName }}
            </v-card-title>
            <v-card-subtitle class="text-darkBlue font-weight-bold pb-0">
              Classification: {{ getCapitalize(students.classification) }}
            </v-card-subtitle>
            <v-card-subtitle class="text-darkBlue font-weight-bold pb-0">
              Level: {{ students.level }}
            </v-card-subtitle>
          </v-col>
          <v-col cols="auto pl-1" align-self="center" justify="left">
            <v-btn color="transparent" class="buttonGradient" rounded flat>
              <v-icon size="x-large">
                <font-awesome-icon
                  icon="fa-solid fa-caret-down"
                  class="text-white" /> </v-icon
            ></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import StudentInfoDataService from "../../services/studentinfo.js";
  import UserDataService from "../../services/users.js";
  import InstructorsDataService from "../../services/instructors.js";
  import { useUserStore } from "../../stores/UserStore.js";
  import { useStudentStore } from "../../stores/StudentStore.js";
  import { mapStores } from "pinia";

  export default {
    name: "StudentComponent",
    components: {},
    data() {
      return {
        students: [],
        instructorId: 0,
      };
    },
    computed: {
      ...mapStores(useStudentStore, useUserStore),
    },
    mounted() {
      this.retrieveInfo();
    },
    methods: {
      async retrieveInfo() {
        await InstructorsDataService.getSingle(
          this.userStore.userInfo.userId
        ).then((response) => {
          this.instructorId = JSON.stringify(response.data.Instructors[0].id);
        });
        this.getStudents();
      },
      async getStudents() {
        let response1 = "";
        await StudentInfoDataService.getInstructorId(this.instructorId)
          .then((response) => {
            response1 = response;
          })
          .catch((e) => {
            console.log(e);
          });
        for (let i = 0; i < response1.data.StudentInfo.length; i++) {
          await UserDataService.getSingle(response1.data.StudentInfo[i].userId)
            .then((response) => {
              let student = {
                fName: response.data.Users[0].fName,
                lName: response.data.Users[0].lName,
                classification: response1.data.StudentInfo[i].classification,
                level: response1.data.StudentInfo[i].level,
                major: response1.data.StudentInfo[i].major,
                instructorId: response1.data.StudentInfo[i].instructorId,
                picture: response.data.Users[0].picture,
                semesters: response1.data.StudentInfo[i].semesters,
              };
              this.students.push(student);
              this.studentStore.setStudent(student);
            })
            .catch((e) => {
              console.log(e);
            });
        }
        this.students.sort((a, b) => {
          const nameA = a.lName.toUpperCase(); // ignore upper and lowercase
          const nameB = b.lName.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
      },
      getCapitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
    },
  };
</script>

<style scoped>
  /* Overwrites the opacity filter put on card subtitles */
  .v-card-subtitle {
    opacity: 100%;
  }
  .v-btn {
    opacity: 100%;
  }
</style>
