import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
  state: () => ({ loginUser: "" }),
  persist: true,
  getters: {
    getFullName(state) {
      return state.loginUser.fName + " " + state.loginUser.lName;
    },
    getPicture(state) {
      return state.loginUser.picture;
    },
    getUserName: (state) => state.loginUser.email.split("@")[0],
  },
  actions: {
    setLoginUser(user) {
      this.loginUser = user;
    },
  },
});
