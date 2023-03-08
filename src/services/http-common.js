import axios from "axios";
import AuthServices from "./authServices.js";
import Router from "../router";
import { useUserStore } from "../stores/UserStore.js";

var baseurl = "";
if (import.meta.env.DEV) {
  baseurl = "http://localhost:3023/";
} else {
  baseurl = "/";
}

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    crossDomain: true,
  },
  transformRequest: (data, headers) => {
    const userStore = useUserStore();
    let user = userStore.userInfo;
    if (user != null) {
      let token = user.token;
      let authHeader = "";
      if (token != null && token != "") authHeader = "Bearer " + token;
      headers["Authorization"] = authHeader;
    }
    return JSON.stringify(data);
  },
  transformResponse: function (data) {
    const userStore = useUserStore();
    data = JSON.parse(data);
    if (data.message !== undefined && data.message.includes("Unauthorized")) {
      AuthServices.logoutUser(userStore.userInfo)
        .then((response) => {
          console.log(response);
          this.userStore.clearLoginUser();
          Router.push({ name: "loginPage" });
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    return data;
  },
});

export default apiClient;
