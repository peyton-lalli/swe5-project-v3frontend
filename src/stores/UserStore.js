import { defineStore } from "pinia";
import StudentInfoDataService from "../services/studentinfo.js";
import PiecesDataService from "../services/pieces.js";
import InstructorDataService from "../services/instructors.js";
import UsersDataService from "../services/users.js";

export const useUserStore = defineStore("user", {
  state: () => ({ userInfo: {}, userRoleInfo: {} }),
  persist: true,
  getters: {
    getFullName(state) {
      return state.userInfo.fName + " " + state.userInfo.lName;
    },
    getPicture(state) {
      return state.userInfo.picture;
    },
    getUserName: (state) => state.userInfo.email.split("@")[0],
  },
  actions: {
    // Set the login user, and load their specific role info
    async setUser(user) {
      this.userInfo = user;
      await this.setUserRoleInfo();
    },
    // Clear the login user info, logging them out
    clearLoginUser() {
      this.userInfo = null;
      this.userRoleInfo = null;
    },
    // Set the userRoleInfo based on the users role
    async setUserRoleInfo() {
      let role = this.userInfo.role;

      if (role === "student") {
        await this.setStudentRoleInfo();
      } else if (role === "faculty") {
        await this.setFacultyRoleInfo();
      } else if (role === "admin") {
      }
    },
    async setStudentRoleInfo() {
      // Load StudentInfo into the store
      await StudentInfoDataService.getUserId(this.userInfo.userId)
        .then((response) => {
          this.userRoleInfo = response.data.StudentInfo[0];
        })
        .catch((e) => {
          console.log(e);
        });

      // Load Stuent Repertoire into the store, appending the userRoleInfo
      await PiecesDataService.getRepertoire(this.userRoleInfo.repertoireId)
        .then((response) => {
          this.userRoleInfo = {
            ...this.userRoleInfo,
            ...{ repertoire: response.data.Pieces },
          };
        })
        .catch((e) => {
          console.log(e);
        });
      // Load Student instructor into the store, appending the userRoleInfo
      await InstructorDataService.getInstructorByInstructorId(
        this.userRoleInfo.instructorId
      )
        .then((response) => {
          this.userRoleInfo = {
            ...this.userRoleInfo,
            ...{ instructor: response.data.Instructors[0] },
          };
        })
        .catch((e) => {
          console.log(e);
        });

      await UsersDataService.getSingle(this.userRoleInfo.instructor.userId)
        .then((response) => {
          const user = response.data.Users[0];
          this.userRoleInfo.instructor = {
            ...this.userRoleInfo.instructor,
            ...{
              name: user.fName + " " + user.lName,
              picture: user.picture,
              userId: user.id,
            },
          };
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async setFacultyRoleInfo() {
      // Load Instructor info into the store
      await InstructorDataService.getSingle(this.userInfo.userId)
        .then((response) => {
          this.userRoleInfo = response.data.Instructors[0];
        })
        .catch((e) => {
          console.log(e);
        });

      // Load Instructor students into the store, appending the userRoleInfo
      await StudentInfoDataService.getInstructorId(this.userRoleInfo.id)
        .then((response) => {
          this.userRoleInfo = {
            ...this.userRoleInfo,
            ...{ students: response.data.StudentInfo },
          };
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // Post update to the DB, then update store
    async updateUserInfo(data, role) {
      if (role === "student") {
        await this.updateStudentInfo(data);
      } else if (role === "faculty") {
        await updateFacultyInfo(data);
      } else if (role === "admin") {
      }
      this.userRoleInfo = data;
    },
    // Post update to StudentInfo table
    async updateStudentInfo(data) {
      await StudentInfoDataService.update(this.userInfo.userId, data).catch(
        (e) => {
          console.log(e);
        }
      );
    },
    // Post update to Instructor table
    async updateFacultyInfo(data) {
      await InstructorDataService.update(this.userInfo.userId, data).catch(
        (e) => {
          console.log(e);
        }
      );
    },
  },
});
