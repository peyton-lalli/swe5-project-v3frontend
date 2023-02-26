import axios from "axios";
import Utils from "../config/utils.js";
import AuthServices from "./authServices.js";
import Router from "../router";

var baseurl = "";
if (import.meta.env.DEV) {
  baseurl = "http://localhost:3023/";
} else {
  baseurl = "/performance/t3/";
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
    let user = Utils.getStore("user");
    if (user != null) {
      let token = user.token;
      let authHeader = "";
      if (token != null && token != "") authHeader = "Bearer " + token;
      headers["Authorization"] = authHeader;
    }
    return JSON.stringify(data);
  },
  transformResponse: function (data) {
    data = JSON.parse(data);
    if (data.message !== undefined && data.message.includes("Unauthorized")) {
      AuthServices.logoutUser(Utils.getStore("user"))
        .then((response) => {
          console.log(response);
          Utils.removeItem("user");
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
