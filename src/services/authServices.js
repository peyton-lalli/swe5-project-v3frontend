import apiClient from "@/services/http-common";

export default {
  loginUser(user) {
    return apiClient.post("schedule-t3/login", user);
  },
  authorizeUser(code) {
    return apiClient.post("schedule-t3/authorize", code);
  },
  logoutUser(token) {
    return apiClient.post("schedule-t3/logout", token);
  },
};
