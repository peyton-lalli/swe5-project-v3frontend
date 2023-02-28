import { defineStore } from "pinia";
import StudentInfoDataService from "../services/studentinfo.js";

export const useStudentInfoStore = defineStore("studentInfo", {
  state: () => ({ studentInfo: {} }),
  persist: true,
  getters: {},
  actions: {
    async setStudentInfo(id) {
      await StudentInfoDataService.getUserId(id)
        .then((response) => {
          this.studentInfo = response.data.StudentInfo[0];
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});
