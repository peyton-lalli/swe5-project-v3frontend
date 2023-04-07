import { defineStore } from "pinia";
import StudentsService from "../services/students.js";
import PiecesDataService from "../services/pieces.js";
import ComposersDataService from "../services/composers.js";
import StudentInstructorDataService from "../services/studentaccompanist.js";
import InstructorDataService from "../services/instructors.js";
import UsersDataService from "../services/users.js";
import UsersRoleDataService from "../services/userrole.js";

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
      let roles = {
        default: this.userInfo.roles[0],
        additional: this.userInfo.roles.shift(),
      };

      delete this.userInfo.roles;
      this.userInfo.roles = roles;

      await this.setUserRoleInfo();
    },
    // Clear the login user info, logging them out
    clearLoginUser() {
      this.userInfo = "";
      this.userRoleInfo = "";
    },
    // Set the userRoleInfo based on the users role
    async setUserRoleInfo() {
      let defaultRole = this.userInfo.roles.default;

      if (defaultRole.roleId === 1) {
        await this.setStudentRoleInfo();
      } else if (defaultRole.roleId === 2) {
        await this.setFacultyRoleInfo();
      } else if (defaultRole.roleId === 3) {
        await this.setAdminRoleInfo();
      }
    },
    async setStudentRoleInfo() {
      await StudentsDataService.getAllInfo(this.userInfo.userId)
        .then((response) => {
          let studentInfo = response.data[0];

          for (let [i, accompanistItem] of studentInfo.accompanists.entries()) {
            let accompanistObject = accompanistItem.accompanist;
            delete studentInfo.accompanists[i].accompanist;

            let accompanistUser = accompanistObject.user;
            let accompanistName =
              accompanistUser.fName + " " + accompanistUser.lName;

            accompanistUser = {
              ...accompanistUser,
              ...{ name: accompanistName },
            };

            delete accompanistUser.fName;
            delete accompanistUser.lName;
            delete accompanistObject.user;

            accompanistObject = {
              ...accompanistObject,
              ...accompanistUser,
            };

            delete studentInfo.accompanists[i].accompanist;

            studentInfo.accompanists[i] = {
              ...studentInfo.accompanists[i],
              ...accompanistObject,
            };
          }

          for (let [i, instructorItem] of studentInfo.instructors.entries()) {
            let instructorObject = instructorItem.instructor;
            delete studentInfo.instructors[i].instructor;

            let instructorUser = instructorObject.user;
            let instructorName =
              instructorUser.fName + " " + instructorUser.lName;

            instructorUser = {
              ...instructorUser,
              ...{ name: instructorName },
            };

            delete instructorUser.fName;
            delete instructorUser.lName;
            delete instructorObject.user;

            instructorObject = {
              ...instructorObject,
              ...instructorUser,
            };

            delete studentInfo.instructors[i].instructor;

            studentInfo.instructors[i] = {
              ...studentInfo.instructors[i],
              ...instructorObject,
            };
          }
          console.log(studentInfo);
          this.userRoleInfo = studentInfo;
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
      await StudentsDataService.getInstructorId(this.userRoleInfo.id)
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
    async setAdminRoleInfo() {
      await UsersDataService.getAll()
        .then(async (response) => {
          this.userRoleInfo = {
            ...this.userRoleInfo,
            ...{ users: response.data.Users },
          };
          for (let [i, user] of this.userRoleInfo.users.entries()) {
            await UsersRoleDataService.getRolesByUserId(user.id)
              .then(async (roleResponse) => {
                let roles = roleResponse.data.UserRoles;

                let additionalRoleData = {};
                if (roles[0].roleId === 1) {
                  await StudentsService.getAllInfo(user.id)
                    .then((response) => {
                      additionalRoleData = response.data[0];
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                } else if (roles[0].roleId === 2) {
                  await InstructorDataService.getSingle(user.id)
                    .then(async (response) => {
                      let userId = user.id;
                      additionalRoleData = response.data.Instructors[0];
                      let sId = additionalRoleData.id;
                      additionalRoleData.id = userId;
                      additionalRoleData.instructorId = sId;
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }
                this.userRoleInfo.users[i] = {
                  ...additionalRoleData,
                  ...user,
                  ...{ roles: roles },
                };
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // Post update to StudentInfo table
    async updateStudentInfo(data, id) {
      await StudentsService.update(id, data).catch((e) => {
        console.log(e);
      });
    },
    // Post update to Instructor table
    async updateFacultyInfo(data, id) {
      await InstructorDataService.update(id, data).catch((e) => {
        console.log(e);
      });
    },
    async editRole(data, id) {
      await UsersRoleDataService.update(id, data).catch((e) => {
        console.log(e);
      });
    },
    async addRole(data) {
      await UsersRoleDataService.create(data).catch((e) => {
        console.log(e);
      });
    },
    async removeRole(id) {
      await UsersRoleDataService.delete(id).catch((e) => {
        console.log(e);
      });
    },
    async createRole(data) {
      await UsersRoleDataService.create(data).catch((e) => {
        console.log(e);
      });
    },
  },
});
