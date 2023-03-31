import http from "./http-common";
class UserRoleDataService {
  create(data) {
    return http.post("/performance-t3/userrole", data);
  }
  update(id, data) {
    return http.put(`/performance-t3/userrole/${id}`, data);
  }
  getRolesByUserId(id) {
    return http.get(`/performance-t3/userrole/user/${id}`);
  }
  getAll() {
    return http.get("/performance-t3/userrole");
  }
  delete(id) {
    return http.delete(`/performance-t3/userrole/${id}`);
  }
}
export default new UserRoleDataService();
