import axios from "axios";
import AuthServices from "./authServices.js";
import Router from "../router";
import { useLoginStore } from "../stores/LoginStore.js";

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
    const loginStore = useLoginStore();
    ``;
    let user = loginStore.loginUser;
    if (user != null) {
      let token = user.token;
      let authHeader = "";
      if (token != null && token != "") authHeader = "Bearer " + token;
      headers["Authorization"] = authHeader;
    }
    return JSON.stringify(data);
  },
  transformResponse: function (data) {
    const loginStore = useLoginStore();
    data = JSON.parse(data);
    if (data.message !== undefined && data.message.includes("Unauthorized")) {
      AuthServices.logoutUser(loginStore.loginUser)
        .then((response) => {
          console.log(response);
          this.loginStore.clearLoginUser();
          Router.push({ name: "loginPage" });
        })
        .catch((error) => {
          console.log("error", error);
          //this is where we are getting the unexpected token error
        });
    }
    return data;
  },
});

export default apiClient;
