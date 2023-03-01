import { defineStore } from "pinia";
import StudentInfoDataService from "../services/studentinfo.js";

export const useStudentInfoStore = defineStore("studentInfo", {
  state: () => ({
    studentInfo: {},
    pic: "",
    pic2: "https://lh3.googleusercontent.com/a-/ACB-R5Sa9fPE5Dl7ABni0_wZG9VbJYJDyFgmB0QP=s32",
    pic3: "https://lh3.googleusercontent.com/a-/ACB-R5TUBKVZpzxYeU99Ng1NloBeNOhfz87Qys8TiA=s32",
  }),
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
    setPic(pic) {
      this.pic = pic;
    },
  },
});
