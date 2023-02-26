<template>
  <v-card>
    <v-row>
      <v-col><v-card-title class="text-darkBlue font-weight-bold">Profile Settings</v-card-title></v-col>
      <v-col class="text-right">
        <v-btn elevation="0" @click="closeDialog()">
        <v-icon>
          <font-awesome-icon
            icon="a-solid fa-circle-xmark"
            class="text-lightBlue">
          </font-awesome-icon>
        </v-icon>
      </v-btn>
      </v-col>
    </v-row>
      <v-card-text class="mx-auto">
        <v-avatar class="bg-darkBlue" size="148">
          <v-img :src="userPictureLink"></v-img>
        </v-avatar>
      </v-card-text>
        <v-card-title class="mx-auto font-weight-bold">{{ userName.toUpperCase() }}</v-card-title>
        <v-card-title class=" mx-auto text-lightBlue"> {{ userEmail }}</v-card-title>
      <v-card-text v-if="userRole === 'student'">
        <v-select
          bg-color="lightBlue"
          class="text-blue"
          :placeholder="userTitleOrMajor"
          :items="['Vocal Music', 'Computer Science', 'Psychology']"
          variant="solo"
          text="darkBlue"
        ></v-select>
      </v-card-text>
      <v-card-text v-if="userRole === 'faculty' || userRole === 'admin'">
        <v-text-field>
          <!-- sdvksndv,-->
        </v-text-field>
      </v-card-text>
      <v-card-text v-if="userRole === 'student'">
        <v-select
          bg-color="lightBlue"
          class="text-blue"    
          :placeholder="userClassification"
          :items="['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate']"
          variant="solo"
          text="darkBlue"
        ></v-select>
      </v-card-text>
      <v-card-text v-if="userRole === 'student'">  
        <v-select
          bg-color="lightBlue"
          class="text-blue"    
          placeholder="Semesters Studied"
          :items="['1', '2', '3', '4', '5', '6', '7', '8']"
          variant="solo"
          text="darkBlue"
        ></v-select>
      </v-card-text>
      <v-card-actions class="mx-auto font-weight-bold">
          <v-btn color="darkBlue">Save</v-btn>
          <v-btn @click="closeDialog()" color="red">Cancel</v-btn>
      </v-card-actions>
      </v-card>
</template>

<style scoped>
  .noDropShadow {
    box-shadow: none !important;  
  }
</style>

<script>
  import InstructorsDataService from "../services/instructors.js";
  import StudentInfoDataService from "../services/studentinfo.js";
  import { useLoginStore } from "../stores/LoginStore.js";
  import { mapStores } from "pinia";
  
  export default {
    name: "EventComponent",
    components: {},
    data() {
      return {
        userRole: "",
        userPictureLink: "",
        userName: "Delta Roman",
        userEmail: "delta.roman@oc.edu",
        userTitleOrMajor: "",
        userClassification: "Senior",
        userSemesters: 8,
      };
    },
    computed: {
      ...mapStores(useLoginStore),
    },
    mounted() {
      this.retrieveInfo();
    },
    methods: {
      retrieveInfo() {
        this.userRole = this.loginStore.loginUser.role;
        this.userName = this.loginStore.getFullName;
        this.userEmail = this.loginStore.loginUser.email;
        this.userPictureLink = this.loginStore.loginUser.picture;
        if (this.userRole === "student") {
          StudentInfoDataService.getUserId(this.loginStore.loginUser.userId)
            .then((response) => {
              console.log(response.data);
              this.userTitleOrMajor = response.data.StudentInfo[0].major;
              // this.userSemesters = response.data.StudentInfo [0].semesters;
              //this.userClassification = 
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
      closeDialog() {
        this.$emit("closeCourseDialogEvent", false);
      },
    },
  };
</script>