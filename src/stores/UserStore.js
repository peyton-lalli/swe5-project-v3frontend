import { defineStore } from "pinia";
import StudentInfoDataService from "../services/studentinfo.js";
import PiecesDataService from "../services/pieces.js";
import ComposersDataService from "../services/composers.js";
import InstructorDataService from "../services/instructors.js";
import UsersDataService from "../services/users.js";

export const useUserStore = defineStore("user", {
  state: () => ({ userInfo: "", userRoleInfo: "" }),
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
      this.userInfo = "";
      this.userRoleInfo = "";
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

      // Load composer data in for each piece in the student's repertoire
      await ComposersDataService.getAll()
        .then((response) => {
          for (let piece in this.userRoleInfo.repertoire) {
            this.userRoleInfo.repertoire[piece] = {
              ...this.userRoleInfo.repertoire[piece],
              ...{
                composer: response.data.Composers.filter(
                  (c) => c.id === this.userRoleInfo.repertoire[piece].composerId
                )[0],
              },
            };
          }
        })
        .catch((e) => {
          console.log(e);
        });

      // Load Student instructor into the store, appending the userRoleInfo
      await InstructorDataService.getInstructorByInstructorId(
        this.userRoleInfo.instructorId
      )
        .then((response) => {
          let ins = [];
          for (let instructor of response.data.Instructors) {
            ins.push(instructor);
          }
          this.userRoleInfo = {
            ...this.userRoleInfo,
            ...{ instructors: ins },
          };
        })
        .catch((e) => {
          console.log(e);
        });

      for (let [i, instructor] of this.userRoleInfo.instructors.entries()) {
        await UsersDataService.getSingle(instructor.userId)
          .then((response) => {
            const user = response.data.Users[0];
            this.userRoleInfo.instructors[i] = {
              ...this.userRoleInfo.instructors[i],
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
      }
      // Load Student instructor's userInfo into the store, appending userRoleInfo.instructor
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
            // Needs to be updated to get all the student info like a student user would have
            //@ethanimooney: add this
            ...{ students: response.data.StudentInfo },
          };
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // Post update to the DB, then update store
    // This needs to be used carefully, it's not really safe to use yet
    // @ethanimooney: Fix?
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
    async getAllStudents() {
      await UsersDataService.getAll()
        .then((response) => {
          return response.data.Users.filter((user) => user.role === "student");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getAllFaculty() {
      await UsersDataService.getAll()
        .then((response) => {
          return response.data.Users.filter((user) => user.role === "faculty");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getAllAdmin() {
      let admins = [];
      await UsersDataService.getAll()
        .then((response) => {
          admins = response.data.Users.filter((user) => user.role === "admin");
        })
        .catch((e) => {
          console.log(e);
        });

      return admins;
    },
  },
});
