import { defineStore } from "pinia";
import Utils from "@/config/utils";

const user = Utils.getStore("user");

export const useLoginStore = defineStore("login", {
  state: () => {
    return {
      loginUser: user,
    };
  },
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser;
    },
  },
  actions: {
    setLoginUser(state, user) {
      state.loginUser = user;
      Utils.setStore("user", user);
    },
  },
});
