import { defineStore } from "pinia";
import StudentsDataService from "../services/students.js";
import StudentInstructorDataService from "../services/studentinstructor.js";
import InstructorDataService from "../services/instructors.js";
import UsersDataService from "../services/users.js";
import UsersRoleDataService from "../services/userrole.js";
import PieceDataService from "../services/pieces.js";
import ComposerDataService from "../services/composers.js";
import AvailabilityDataService from "../services/availability.js";
import InstrumentDataService from "../services/instruments.js";

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

          for (let [i, instrument] of studentInfo.instruments.entries()) {
            let instrumentObject = instrument.instrument;
            let sInstrumentObject = instrument;
            delete sInstrumentObject.instrument;

            studentInfo.instruments[i] = {
              ...sInstrumentObject,
              ...instrumentObject,
            };
          }

          for (let [i, repertoire] of studentInfo.repertoires.entries()) {
            let repertoireObject = repertoire.repertoire;
            delete studentInfo.repertoires[0].repertoire;

            studentInfo.repertoires[0] = {
              ...studentInfo.repertoires[0],
              ...repertoireObject,
            };
          }

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
      await InstructorDataService.getAllInfo(this.userInfo.userId)
        .then((response) => {
          let instructorInfo = response.data[0];
          console.log(instructorInfo);

          let availabilities = instructorInfo.user.availabilities;
          delete instructorInfo.user;

          let students = [];

          for (let sI of instructorInfo.studentinstructors) {
            sI.student = {
              ...sI.student,
              ...{ studentInstructorId: sI.studentInstructorId },
            };
            students.push(sI.student);
          }

          delete instructorInfo.studentinstructors;

          instructorInfo = {
            ...instructorInfo,
            ...{ availabilities: availabilities },
            ...{ students: students },
          };

          this.userRoleInfo = instructorInfo;
          console.log(this.userRoleInfo);
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
                  await StudentsDataService.getAllInfo(user.id)
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
    getCurrentInstructorAvailabilityForEventId(eventId) {
      return this.userRoleInfo.availabilities.filter(
        (a) => a.eventId === eventId
      );
    },
    async createAvailabilitiesForEvent(availabilities) {
      for (let [i, a] of availabilities.entries()) {
        availabilities[i].userId = this.userInfo.userId;
      }

      for (let a of availabilities) {
        await AvailabilityDataService.create(a)
          .then((response) => {
            let availabilityId = response.data.id;
            a.availabilityId = availabilityId;
            this.userRoleInfo.availabilities.push(a);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    async updateAvailabilitiesForEvent(
      newAvailabilities,
      removedAvailabilities
    ) {
      await this.createAvailabilitiesForEvent(newAvailabilities);

      for (let a of removedAvailabilities) {
        await AvailabilityDataService.delete(a.availabilityId)
          .then(() => {
            this.userRoleInfo.availabilities.splice(
              this.userRoleInfo.availabilities.findIndex(
                (av) => av.availabilityId === a.availabilityId
              ),
              1
            );
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    // Post update to StudentInfo table
    async updateStudentInfo(data, id) {
      await StudentsDataService.update(id, data).catch((e) => {
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
    async getComposerInfo(id) {
      let composer = {};
      await ComposerDataService.getId(id)
        .then((response) => {
          composer = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
      return composer;
    },
    async createPiece(data) {
      let pieceInfo = [];
      await PieceDataService.create(data)
        .then((response) => {
          pieceInfo = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
      delete pieceInfo.composerId;
      let tempId = pieceInfo.id;
      delete pieceInfo.id;
      delete pieceInfo.repertoireId;
      pieceInfo.pieceId = tempId;
      let composerInfo = await this.getComposerInfo(data.composerId);
      let composerItem = {
        composerId: data.composerId,
        name: composerInfo.Composers[0].name,
        birthyear: composerInfo.Composers[0].birthyear,
        deathyear: composerInfo.Composers[0].deathyear,
        createdAt: composerInfo.Composers[0].createdAt,
        updatedAt: composerInfo.Composers[0].updatedAt,
      };
      pieceInfo.composer = {
        ...composerItem,
      };
      this.userRoleInfo.repertoires
        .filter(
          (repertoire) => repertoire.repertoireId === data.repertoireId
        )[0]
        .pieces.push(pieceInfo);
    },
    async createIntrument(instrumentData) {
      let instrumentObject = {};
      await InstrumentDataService.create(instrumentData)
        .then((response) => {
          instrumentObject = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
      return instrumentObject;
    },
    async createComposer(composerData) {
      let composerObject = {};
      await ComposerDataService.create(composerData)
        .then((response) => {
          composerObject = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
      return composerObject;
    },
  },
});
