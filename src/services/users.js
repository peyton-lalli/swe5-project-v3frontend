import http from "./http-common";
class UsersDataService {
  create(data) {
    return http.post("/performance-t3/users", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/users/${id}`, data);
  }
  getAll() {
    return http.get("/performance-t3/users");
  }
  getEmail(id) {
    return http.get(`/performance-t3/users/email/${id}`);
  }
  getRole(id) {
    return http.get(`/performance-t3/users/role/${id}`);
  }
  getFirstName(id) {
    return http.get(`/performance-t3/users/first-name/${id}`);
  }
  getLastName(id) {
    return http.get(`/performance-t3/users/last-name/${id}`);
  }
  delete(id) {
    return http.delete(`/performance-t3/users/${id}`);
  }
}
export default new UsersDataService();
